require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);
const databaseName = process.env.MYSQL_DATABASE || 'sela_volts';
const database = mysql.createPool({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: databaseName,
  waitForConnections: true,
  connectionLimit: 10
});
const sessions = new Map();
const restrictedEmails = {
  seller: (process.env.SELLER_EMAIL || process.env.ADMIN_EMAIL || '').trim().toLowerCase(),
  dashboard: (process.env.DASHBOARD_EMAIL || process.env.ADMIN_EMAIL || '').trim().toLowerCase()
};
const mailTransport = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
    })
  : null;

async function query(sql, parameters = []) {
  const [rows] = await database.execute(sql, parameters);
  return rows;
}

async function nextId(sequenceName) {
  await query('INSERT INTO sequences (name, value) VALUES (?, 1) ON DUPLICATE KEY UPDATE value = value + 1', [sequenceName]);
  const rows = await query('SELECT value FROM sequences WHERE name = ?', [sequenceName]);
  return rows[0].value;
}

function requiredString(value, field) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} is required`);
  return value.trim();
}

function positiveNumber(value, field) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) throw new Error(`${field} must be a valid positive number`);
  return number;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function passwordsMatch(password, storedHash) {
  const [salt] = storedHash.split(':');
  const candidate = Buffer.from(hashPassword(password, salt));
  const expected = Buffer.from(storedHash);
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

function sessionToken(request) {
  return request.headers.cookie?.match(/(?:^|; )session=([^;]+)/)?.[1];
}

function currentUser(request) {
  const token = sessionToken(request);
  return token ? sessions.get(token) : null;
}

function requireLogin(request, response, next) {
  if (!currentUser(request)) return response.status(401).json({ error: 'Please log in first.' });
  next();
}

function requirePageLogin(request, response, next) {
  if (!currentUser(request)) return response.redirect('/login.html');
  next();
}

function requireAuthorizedRole(request, response, next) {
  const user = currentUser(request);
  if (!user) return response.redirect('/login.html');
  const role = request.query?.view || 'customer';
  const allowedEmail = restrictedEmails[role];
  if ((role === 'seller' || role === 'dashboard') && allowedEmail && user.email.toLowerCase() !== allowedEmail) {
    return response.status(403).json({ error: 'This email does not have access to this section.' });
  }
  if ((role === 'seller' || role === 'dashboard') && !allowedEmail) {
    return response.status(403).json({ error: 'Seller and dashboard access is not configured for this email.' });
  }
  next();
}

app.use(express.json());
app.get('/', (request, response) => response.redirect(currentUser(request) ? '/index.html' : '/login.html'));
app.get('/login', (request, response) => response.sendFile(path.join(__dirname, 'login.html')));
app.get('/index.html', requirePageLogin, requireAuthorizedRole, (request, response) => response.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard.html', requirePageLogin, requireAuthorizedRole, (request, response) => response.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/customer.html', requirePageLogin, requireAuthorizedRole, (request, response) => response.sendFile(path.join(__dirname, 'customer.html')));
app.get('/seller.html', requirePageLogin, requireAuthorizedRole, (request, response) => response.sendFile(path.join(__dirname, 'seller.html')));
app.get('/demo.html', requirePageLogin, (request, response) => response.sendFile(path.join(__dirname, 'demo.html')));
app.use(express.static(__dirname, { index: false }));

app.post('/api/auth/register', async (request, response, next) => {
  try {
    const email = requiredString(request.body.email, 'Email').toLowerCase();
    const phoneNumber = requiredString(request.body.phone_number, 'Phone number');
    const password = requiredString(request.body.password, 'Password');
    const confirmPassword = requiredString(request.body.confirm_password, 'Confirm password');
    if (!/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ error: 'Enter a valid email address.' });
    if (!/^\+?[0-9\s-]{7,15}$/.test(phoneNumber)) return response.status(400).json({ error: 'Enter a valid phone number.' });
    if (password.length < 8) return response.status(400).json({ error: 'Password must be at least 8 characters.' });
    if (password !== confirmPassword) return response.status(400).json({ error: 'Passwords do not match.' });
    if ((await query('SELECT id FROM users WHERE email = ? LIMIT 1', [email])).length) return response.status(409).json({ error: 'That email is already registered.' });
    const userId = await nextId('users');
    await query('INSERT INTO users (id, email, phone_number, password_hash, created_at) VALUES (?, ?, ?, ?, ?)', [userId, email, phoneNumber, hashPassword(password), new Date()]);
    if (mailTransport && process.env.NOTIFICATION_EMAIL) {
      await mailTransport.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: 'New Sela Volts account registration',
        text: `A new user registered with email: ${email} and phone: ${phoneNumber}`
      });
    }
    response.status(201).json({ message: 'Account created. You can now log in.' });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', async (request, response, next) => {
  try {
    const email = requiredString(request.body.email, 'Email').toLowerCase();
    const password = requiredString(request.body.password, 'Password');
    const role = String(request.body.role || 'customer').toLowerCase();
    const users = await query('SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1', [email]);
    const user = users[0];
    if (!user || !passwordsMatch(password, user.password_hash)) return response.status(401).json({ error: 'Invalid email or password.' });

    if ((role === 'seller' || role === 'dashboard')) {
      const allowedEmail = restrictedEmails[role];
      if (!allowedEmail) return response.status(403).json({ error: 'Seller and dashboard access is not configured.' });
      if (user.email.toLowerCase() !== allowedEmail) return response.status(403).json({ error: 'This email does not have access to this section.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, { id: user.id, email: user.email, role });
    response.setHeader('Set-Cookie', `session=${token}; HttpOnly; SameSite=Lax; Path=/`);
    response.json({ user: { email: user.email, role } });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/logout', (request, response) => {
  const token = sessionToken(request);
  if (token) sessions.delete(token);
  response.setHeader('Set-Cookie', 'session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
  response.json({ ok: true });
});

app.get('/health', (request, response) => response.json({ ok: true, database: Boolean(database) }));

app.get('/api/vehicles', requireLogin, async (request, response, next) => {
  try {
    response.json(await query('SELECT id, customer_id, full_name, phone_number, plate_number, vehicle_type, created_at FROM vehicles ORDER BY created_at DESC'));
  } catch (error) {
    next(error);
  }
});

app.post('/api/customers/register', requireLogin, async (request, response, next) => {
  try {
    const fullName = requiredString(request.body.full_name, 'Full name');
    const phoneNumber = requiredString(request.body.phone_number, 'Phone number');
    const plateNumber = requiredString(request.body.plate_number, 'Plate number').toUpperCase();
    const vehicleType = requiredString(request.body.vehicle_type, 'Vehicle type');
    if ((await query('SELECT id FROM vehicles WHERE plate_number = ? LIMIT 1', [plateNumber])).length) return response.status(409).json({ error: 'That plate number is already registered.' });
    const customerId = await nextId('customers');
    const vehicleId = await nextId('vehicles');
    const now = new Date();
    await query('INSERT INTO customers (id, full_name, phone_number, created_at) VALUES (?, ?, ?, ?)', [customerId, fullName, phoneNumber, now]);
    await query('INSERT INTO vehicles (id, customer_id, full_name, phone_number, plate_number, vehicle_type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [vehicleId, customerId, fullName, phoneNumber, plateNumber, vehicleType, now]);
    response.status(201).json({ customer: { id: customerId, full_name: fullName }, vehicle: { id: vehicleId, plate_number: plateNumber } });
  } catch (error) {
    next(error);
  }
});

app.post('/api/sessions/start', requireLogin, async (request, response, next) => {
  try {
    const vehicleId = Number(request.body.vehicle_id);
    const vehicles = await query('SELECT plate_number FROM vehicles WHERE id = ? LIMIT 1', [vehicleId]);
    if (!vehicles[0]) return response.status(404).json({ error: 'Vehicle not found.' });
    const session = {
      id: await nextId('sessions'), vehicle_id: vehicleId, plate_number: vehicles[0].plate_number,
      charger_id: requiredString(request.body.charger_id, 'Charger'), seller_name: requiredString(request.body.seller_name, 'Seller name'),
      amount_due: positiveNumber(request.body.amount_due, 'Amount due'), status: 'pending_payment', created_at: new Date()
    };
    await query('INSERT INTO sessions (id, vehicle_id, plate_number, charger_id, amount_due, seller_name, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [session.id, session.vehicle_id, session.plate_number, session.charger_id, session.amount_due, session.seller_name, session.status, session.created_at]);
    response.status(201).json({ session });
  } catch (error) {
    next(error);
  }
});

app.post('/api/payments/initiate', requireLogin, async (request, response, next) => {
  try {
    const sessionId = Number(request.body.session_id);
    const sessions = await query('SELECT * FROM sessions WHERE id = ? LIMIT 1', [sessionId]);
    const session = sessions[0];
    if (!session) return response.status(404).json({ error: 'Charging session not found.' });
    if (session.status === 'paid') return response.status(409).json({ error: 'This session is already paid.' });
    const payment = { id: await nextId('payments'), session_id: sessionId, phone_number: requiredString(request.body.phone_number, 'Phone number'), provider: requiredString(request.body.provider, 'Payment provider'), amount: session.amount_due, status: 'pending', created_at: new Date() };
    await query('INSERT INTO payments (id, session_id, phone_number, provider, amount, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [payment.id, payment.session_id, payment.phone_number, payment.provider, payment.amount, payment.status, payment.created_at]);
    response.status(201).json({ payment, instructions: `Payment request created for ${payment.amount} RWF using ${payment.provider}. Confirm it after the customer pays.` });
  } catch (error) {
    next(error);
  }
});

app.post('/api/payments/confirm', requireLogin, async (request, response, next) => {
  try {
    const paymentId = Number(request.body.payment_id);
    const sessionId = Number(request.body.session_id);
    const payments = await query('SELECT * FROM payments WHERE id = ? AND session_id = ? LIMIT 1', [paymentId, sessionId]);
    const sessions = await query('SELECT * FROM sessions WHERE id = ? LIMIT 1', [sessionId]);
    if (!payments[0] || !sessions[0]) return response.status(404).json({ error: 'Payment or session not found.' });
    const confirmedAt = new Date();
    await query('UPDATE payments SET status = ?, confirmed_at = ? WHERE id = ?', ['confirmed', confirmedAt, paymentId]);
    await query('UPDATE sessions SET status = ?, paid_at = ? WHERE id = ?', ['paid', confirmedAt, sessionId]);
    response.json({ payment: { ...payments[0], status: 'confirmed' }, session: { ...sessions[0], status: 'paid' } });
  } catch (error) {
    next(error);
  }
});

app.get('/api/dashboard', requireLogin, async (request, response, next) => {
  try {
    const [customerCount, vehicleCount, sessionCount, revenueRows, sessions] = await Promise.all([
      query('SELECT COUNT(*) AS total FROM customers'), query('SELECT COUNT(*) AS total FROM vehicles'), query('SELECT COUNT(*) AS total FROM sessions'),
      query("SELECT COALESCE(SUM(amount_due), 0) AS total FROM sessions WHERE status = 'paid'"),
      query('SELECT id, vehicle_id, plate_number, charger_id, amount_due, seller_name, status, created_at, paid_at FROM sessions ORDER BY created_at DESC LIMIT 100')
    ]);
    response.json({ totalCustomers: Number(customerCount[0].total), totalVehicles: Number(vehicleCount[0].total), totalSessions: Number(sessionCount[0].total), totalRevenue: Number(revenueRows[0]?.total || 0), sessions });
  } catch (error) {
    next(error);
  }
});

app.get('/dashboard', requirePageLogin, (request, response) => response.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/customer', requirePageLogin, (request, response) => response.sendFile(path.join(__dirname, 'customer.html')));
app.get('/seller', requirePageLogin, (request, response) => response.sendFile(path.join(__dirname, 'seller.html')));
app.get('/demo', requirePageLogin, (request, response) => response.sendFile(path.join(__dirname, 'demo.html')));

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ error: error.message || 'Internal server error' });
});

async function start() {
  await query('CREATE TABLE IF NOT EXISTS sequences (name VARCHAR(50) PRIMARY KEY, value INT NOT NULL)');
  await query('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, phone_number VARCHAR(30) NULL, password_hash VARCHAR(200) NOT NULL, created_at DATETIME NOT NULL)');
  await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_number VARCHAR(30) NULL');
  await query('CREATE TABLE IF NOT EXISTS customers (id INT PRIMARY KEY, full_name VARCHAR(150) NOT NULL, phone_number VARCHAR(30) NOT NULL, created_at DATETIME NOT NULL)');
  await query('CREATE TABLE IF NOT EXISTS vehicles (id INT PRIMARY KEY, customer_id INT NOT NULL, full_name VARCHAR(150) NOT NULL, phone_number VARCHAR(30) NOT NULL, plate_number VARCHAR(30) NOT NULL UNIQUE, vehicle_type VARCHAR(30) NOT NULL, created_at DATETIME NOT NULL)');
  await query('CREATE TABLE IF NOT EXISTS sessions (id INT PRIMARY KEY, vehicle_id INT NOT NULL, plate_number VARCHAR(30) NOT NULL, charger_id VARCHAR(50) NOT NULL, amount_due DECIMAL(12, 2) NOT NULL, seller_name VARCHAR(150) NOT NULL, status VARCHAR(30) NOT NULL, created_at DATETIME NOT NULL, paid_at DATETIME NULL)');
  await query('CREATE TABLE IF NOT EXISTS payments (id INT PRIMARY KEY, session_id INT NOT NULL, phone_number VARCHAR(30) NOT NULL, provider VARCHAR(50) NOT NULL, amount DECIMAL(12, 2) NOT NULL, status VARCHAR(30) NOT NULL, created_at DATETIME NOT NULL, confirmed_at DATETIME NULL)');
  app.listen(port, host, () => console.log(`Sela Volts running at http://${host}:${port}`));
}

start().catch((error) => {
  console.error('Could not connect to MySQL/MariaDB:', error.message);
  process.exitCode = 1;
});
