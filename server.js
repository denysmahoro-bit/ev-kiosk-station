const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const DATA_FILE = path.join(__dirname, 'data', 'storage.json');
const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB || 'sela_volts';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_SECRET = process.env.AUTH_SECRET;
const AUTH_COOKIE = 'sela_volts_auth';
const TOKEN_TTL = 8 * 60 * 60 * 1000;

let mongoClient;
let mongoDb;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function authIsConfigured() {
  return Boolean(ADMIN_USERNAME && ADMIN_PASSWORD && AUTH_SECRET);
}

function createAuthToken() {
  return createToken({ username: ADMIN_USERNAME, role: 'dashboard', name: 'Dashboard owner' });
}

function createToken(user) {
  const payload = Buffer.from(JSON.stringify({ ...user, issuedAt: Date.now() })).toString('base64url');
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

function getAuthUser(req) {
  if (!authIsConfigured()) return false;

  const token = req.headers.cookie
    ?.split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${AUTH_COOKIE}=`))
    ?.slice(`${AUTH_COOKIE}=`.length);

  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (
    !payload ||
    !signature ||
    signature.length !== 64
  ) return false;

  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    const user = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return user.issuedAt && Date.now() - user.issuedAt <= TOKEN_TTL ? user : false;
  } catch {
    return false;
  }
}

function requireAuth(req, res, next) {
  const user = getAuthUser(req);
  if (user) {
    req.user = user;
    return next();
  }

  if (req.path === '/seller' || req.path === '/dashboard') {
    return res.redirect(`/login?next=${encodeURIComponent(req.path)}`);
  }

  return res.status(401).json({ error: 'Authentication required.' });
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ error: 'This account is not authorized.' });
    next();
  };
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  return { salt, hash: crypto.scryptSync(String(password), salt, 64).toString('hex') };
}

function passwordMatches(password, user) {
  if (!user.password_hash || !user.password_salt) return false;
  const actual = crypto.scryptSync(String(password), user.password_salt, 64);
  const expected = Buffer.from(user.password_hash, 'hex');
  return expected.length === actual.length && crypto.timingSafeEqual(actual, expected);
}

function ensureStorageFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const defaultData = {
    customers: [],
    vehicles: [],
    sessions: [],
    payments: [],
    workers: []
  };

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
    return;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (!data.customers || !data.vehicles || !data.sessions || !data.payments) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({ ...defaultData, ...data }, null, 2));
    }
  } catch (error) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
}

function readStorage() {
  ensureStorageFile();
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  data.workers = data.workers || [];
  return data;
}

function writeStorage(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

async function connectMongo() {
  if (!MONGO_URI) {
    return null;
  }

  if (!mongoClient) {
    mongoClient = new MongoClient(MONGO_URI);
    await mongoClient.connect();
  }

  if (!mongoDb) {
    mongoDb = mongoClient.db(MONGO_DB);
  }

  return mongoDb;
}

async function ensureMongoCollections(db) {
  if (!db) return;

  const collectionNames = ['customers', 'vehicles', 'sessions', 'payments', 'workers'];
  const existing = await db.listCollections({ name: { $in: collectionNames } }).toArray();
  const existingNames = new Set(existing.map((item) => item.name));

  for (const name of collectionNames) {
    if (!existingNames.has(name)) {
      await db.createCollection(name);
    }
  }
}

async function getDataStore() {
  const db = await connectMongo();
  if (!db) {
    return readStorage();
  }

  await ensureMongoCollections(db);

  const [customers, vehicles, sessions, payments, workers] = await Promise.all([
    db.collection('customers').find({}).toArray(),
    db.collection('vehicles').find({}).toArray(),
    db.collection('sessions').find({}).toArray(),
    db.collection('payments').find({}).toArray(),
    db.collection('workers').find({}).toArray()
  ]);

  return { customers, vehicles, sessions, payments, workers };
}

async function saveDataStore(data) {
  const db = await connectMongo();
  if (!db) {
    writeStorage(data);
    return;
  }

  await ensureMongoCollections(db);

  for (const collectionName of ['customers', 'vehicles', 'sessions', 'payments', 'workers']) {
    const collection = db.collection(collectionName);
    await collection.deleteMany({});
    const items = data[collectionName] || [];
    if (items.length) {
      await collection.insertMany(items);
    }
  }
}

function normalizePlate(value) {
  return String(value || '').trim().toUpperCase();
}

function generateReference(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sela Volts EV kiosk station is running' });
});

app.post('/api/auth/login', async (req, res) => {
  if (!authIsConfigured()) {
    return res.status(503).json({ error: 'Authentication is not configured on the server.' });
  }

  const { username, password } = req.body;
  let user = null;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    user = { username: ADMIN_USERNAME, role: 'dashboard', name: 'Dashboard owner' };
  } else {
    const data = await getDataStore();
    const worker = (data.workers || []).find((item) => item.username.toLowerCase() === String(username || '').trim().toLowerCase());
    if (worker && worker.approved && passwordMatches(password, worker)) {
      user = { username: worker.username, role: 'seller', name: worker.name, workerId: worker.id };
    }
  }
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const secure = req.secure || req.headers['x-forwarded-proto'] === 'https';
  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE}=${createToken(user)}; HttpOnly;${secure ? ' Secure;' : ''} SameSite=Lax; Max-Age=28800; Path=/`
  );
  res.json({ message: 'Signed in successfully.', user });
});

app.get('/api/auth/me', requireAuth, (req, res) => res.json({ user: req.user }));

app.post('/api/auth/password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || String(newPassword).length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters.' });
  if (req.user.role !== 'seller') return res.status(403).json({ error: 'Only sellers can change their password here.' });
  const data = await getDataStore();
  const worker = data.workers.find((item) => item.id === req.user.workerId);
  if (!worker || !passwordMatches(currentPassword, worker)) return res.status(401).json({ error: 'Current password is incorrect.' });
  const credentials = hashPassword(newPassword);
  worker.password_hash = credentials.hash;
  worker.password_salt = credentials.salt;
  await saveDataStore(data);
  res.json({ message: 'Password changed successfully.' });
});

app.get('/api/workers', requireAuth, requireRole('dashboard'), async (req, res) => {
  const data = await getDataStore();
  res.json((data.workers || []).map(({ password_hash, password_salt, ...worker }) => worker));
});

app.post('/api/workers', requireAuth, requireRole('dashboard'), async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password || String(password).length < 8) return res.status(400).json({ error: 'Name, username, and a password of at least 8 characters are required.' });
  const data = await getDataStore();
  if (data.workers.some((item) => item.username.toLowerCase() === String(username).trim().toLowerCase())) return res.status(409).json({ error: 'Username already exists.' });
  const credentials = hashPassword(password);
  const worker = { id: Date.now(), name: String(name).trim(), username: String(username).trim(), approved: false, created_at: new Date().toISOString(), password_hash: credentials.hash, password_salt: credentials.salt };
  data.workers.push(worker);
  await saveDataStore(data);
  const { password_hash, password_salt, ...safeWorker } = worker;
  res.status(201).json({ worker: safeWorker });
});

app.patch('/api/workers/:id', requireAuth, requireRole('dashboard'), async (req, res) => {
  const data = await getDataStore();
  const worker = data.workers.find((item) => String(item.id) === String(req.params.id));
  if (!worker) return res.status(404).json({ error: 'Worker not found.' });
  if (typeof req.body.approved === 'boolean') worker.approved = req.body.approved;
  if (req.body.password) {
    if (String(req.body.password).length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    const credentials = hashPassword(req.body.password);
    worker.password_hash = credentials.hash;
    worker.password_salt = credentials.salt;
  }
  await saveDataStore(data);
  const { password_hash, password_salt, ...safeWorker } = worker;
  res.json({ worker: safeWorker });
});

app.delete('/api/workers/:id', requireAuth, requireRole('dashboard'), async (req, res) => {
  const data = await getDataStore();
  const before = data.workers.length;
  data.workers = data.workers.filter((item) => String(item.id) !== String(req.params.id));
  if (data.workers.length === before) return res.status(404).json({ error: 'Worker not found.' });
  await saveDataStore(data);
  res.json({ message: 'Worker deleted.' });
});

app.post('/api/auth/logout', (req, res) => {
  const secure = req.secure || req.headers['x-forwarded-proto'] === 'https';
  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE}=; HttpOnly;${secure ? ' Secure;' : ''} SameSite=Lax; Max-Age=0; Path=/`
  );
  res.json({ message: 'Signed out successfully.' });
});

app.get('/api/customers', async (req, res) => {
  const data = await getDataStore();
  res.json(data.customers);
});

app.get('/api/vehicles', async (req, res) => {
  const data = await getDataStore();
  res.json(data.vehicles);
});

app.post('/api/customers/register', async (req, res) => {
  const { full_name, phone_number, plate_number, vehicle_type, charging_type } = req.body;
  const plate = normalizePlate(plate_number);

  if (!full_name || !phone_number || !plate || !charging_type) {
    return res.status(400).json({
      error: 'Full name, phone number, plate number, and charging connector are required.'
    });
  }

  const data = await getDataStore();
  const plateExists = data.vehicles.some((vehicle) => vehicle.plate_number === plate);

  if (plateExists) {
    return res.status(400).json({ error: 'This vehicle is already registered.' });
  }

  const customer = {
    id: Date.now(),
    full_name,
    phone_number,
    created_at: new Date().toISOString()
  };

  const vehicle = {
    id: Date.now() + 1,
    customer_id: customer.id,
    full_name,
    phone_number,
    plate_number: plate,
    vehicle_type: vehicle_type || 'Car',
    charging_type,
    created_at: new Date().toISOString()
  };

  data.customers.push(customer);
  data.vehicles.push(vehicle);
  await saveDataStore(data);

  res.status(201).json({
    message: 'Customer registered successfully.',
    customer,
    vehicle
  });
});

app.post('/api/sessions/start', requireAuth, requireRole('seller'), async (req, res) => {
  const { vehicle_id, charger_id, amount_due } = req.body;

  if (!vehicle_id || !charger_id) {
    return res.status(400).json({ error: 'Vehicle and charger are required.' });
  }

  const data = await getDataStore();
  const vehicle = data.vehicles.find((item) => Number(item.id) === Number(vehicle_id));

  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found.' });
  }

  const session = {
    id: Date.now(),
    vehicle_id: Number(vehicle_id),
    plate_number: vehicle.plate_number,
    vehicle_type: vehicle.vehicle_type,
    charger_id,
    amount_due: Number(amount_due || 0),
    seller_name: req.user.name,
    status: 'charging',
    payment_status: 'pending',
    started_at: new Date().toISOString()
  };

  data.sessions.push(session);
  await saveDataStore(data);

  res.status(201).json({
    message: 'Charging session started.',
    session
  });
});

app.post('/api/payments/initiate', requireAuth, requireRole('seller'), async (req, res) => {
  const { session_id, phone_number, provider } = req.body;

  if (!session_id || !phone_number || !provider) {
    return res.status(400).json({ error: 'Session ID, phone number, and provider are required.' });
  }

  const data = await getDataStore();
  const session = data.sessions.find((item) => Number(item.id) === Number(session_id));

  if (!session) {
    return res.status(404).json({ error: 'Session not found.' });
  }

  const reference = generateReference('EV');
  const payment = {
    id: Date.now(),
    session_id: Number(session_id),
    amount: Number(session.amount_due || 0),
    provider,
    phone_number,
    reference,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  data.payments.push(payment);
  await saveDataStore(data);

  res.status(201).json({
    message: 'Payment request created.',
    payment,
    instructions: `Pay ${session.amount_due} RWF to ${provider} using reference ${reference}. Session ID: ${session.id}. Plate: ${session.plate_number}.`
  });
});

app.post('/api/payments/confirm', requireAuth, requireRole('seller'), async (req, res) => {
  const { payment_id, session_id } = req.body;

  const data = await getDataStore();
  const payment = data.payments.find((item) => Number(item.id) === Number(payment_id));
  const session = data.sessions.find((item) => Number(item.id) === Number(session_id));

  if (!payment || !session) {
    return res.status(404).json({ error: 'Payment or session not found.' });
  }

  payment.status = 'paid';
  session.payment_status = 'paid';
  session.status = 'completed';
  session.completed_at = new Date().toISOString();

  await saveDataStore(data);

  res.json({
    message: 'Payment confirmed successfully.',
    payment,
    session
  });
});

app.get('/api/dashboard', requireAuth, requireRole('dashboard'), async (req, res) => {
  const data = await getDataStore();
  const totalRevenue = data.payments
    .filter((payment) => payment.status === 'paid')
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  res.json({
    totalCustomers: data.customers.length,
    totalVehicles: data.vehicles.length,
    totalSessions: data.sessions.length,
    totalRevenue,
    sessions: data.sessions,
    payments: data.payments
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/customer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'customer.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/seller', requireAuth, requireRole('seller'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'seller.html'));
});

app.get('/dashboard', requireAuth, requireRole('dashboard'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'demo.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Sela Volts kiosk running at http://localhost:${PORT}`);
});
