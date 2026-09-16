const express = require('express');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const DATA_FILE = path.join(__dirname, 'data', 'storage.json');
const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB || 'sela_volts';

let mongoClient;
let mongoDb;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function ensureStorageFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const defaultData = {
    customers: [],
    vehicles: [],
    sessions: [],
    payments: []
  };

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
    return;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (!data.customers || !data.vehicles || !data.sessions || !data.payments) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
    }
  } catch (error) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
}

function readStorage() {
  ensureStorageFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
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

  const collectionNames = ['customers', 'vehicles', 'sessions', 'payments'];
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

  const [customers, vehicles, sessions, payments] = await Promise.all([
    db.collection('customers').find({}).toArray(),
    db.collection('vehicles').find({}).toArray(),
    db.collection('sessions').find({}).toArray(),
    db.collection('payments').find({}).toArray()
  ]);

  return { customers, vehicles, sessions, payments };
}

async function saveDataStore(data) {
  const db = await connectMongo();
  if (!db) {
    writeStorage(data);
    return;
  }

  await ensureMongoCollections(db);

  for (const collectionName of ['customers', 'vehicles', 'sessions', 'payments']) {
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

app.get('/api/customers', async (req, res) => {
  const data = await getDataStore();
  res.json(data.customers);
});

app.get('/api/vehicles', async (req, res) => {
  const data = await getDataStore();
  res.json(data.vehicles);
});

app.post('/api/customers/register', async (req, res) => {
  const { full_name, phone_number, plate_number, vehicle_type } = req.body;
  const plate = normalizePlate(plate_number);

  if (!full_name || !phone_number || !plate) {
    return res.status(400).json({ error: 'Full name, phone number, and plate number are required.' });
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

app.post('/api/sessions/start', async (req, res) => {
  const { vehicle_id, charger_id, amount_due, seller_name } = req.body;

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
    charger_id,
    amount_due: Number(amount_due || 0),
    seller_name: seller_name || 'Seller',
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

app.post('/api/payments/initiate', async (req, res) => {
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

app.post('/api/payments/confirm', async (req, res) => {
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

app.get('/api/dashboard', async (req, res) => {
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

app.get('/seller', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'seller.html'));
});

app.get('/dashboard', (req, res) => {
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
