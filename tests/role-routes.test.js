const { spawn } = require('child_process');
const path = require('path');

async function waitForServer(port, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(`http://localhost:${port}/api/health`);
      if (response.ok) return;
    } catch (error) {
      // server still starting
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Server on port ${port} did not start in time.`);
}

async function assertRoute(port, route, expectedText, cookie) {
  const response = await fetch(`http://localhost:${port}${route}`, {
    headers: cookie ? { Cookie: cookie } : {}
  });
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`${route} responded with ${response.status}.`);
  }
  if (!html.includes(expectedText)) {
    throw new Error(`${route} did not include expected text: ${expectedText}`);
  }
}

async function assertLandingPage(port) {
  const response = await fetch(`http://localhost:${port}/`);
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`/ responded with ${response.status}.`);
  }
  if (!html.includes('href="/customer"') || !html.includes('href="/seller"')) {
    throw new Error('/ does not provide customer and seller portal options.');
  }
  if (html.includes('id="dashboard-panel"')) {
    throw new Error('/ still embeds the dashboard.');
  }
}

(async () => {
  const server = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], {
    cwd: path.join(__dirname, '..'),
    env: {
      ...process.env,
      PORT: '3100',
      ADMIN_USERNAME: 'test-admin',
      ADMIN_PASSWORD: 'test-password',
      AUTH_SECRET: 'test-secret-for-routes'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  const logs = [];
  server.stdout.on('data', (chunk) => logs.push(String(chunk)));
  server.stderr.on('data', (chunk) => logs.push(String(chunk)));

  try {
    await waitForServer(3100);
    await assertLandingPage(3100);
    const loginResponse = await fetch('http://localhost:3100/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'test-admin', password: 'test-password' })
    });
    const cookie = loginResponse.headers.get('set-cookie').split(';')[0];
    await assertRoute(3100, '/customer', 'Customer portal');
    await assertRoute(3100, '/dashboard', 'Dashboard', cookie);
    const deniedSeller = await fetch('http://localhost:3100/seller', { headers: { Cookie: cookie } });
    if (deniedSeller.status !== 403) throw new Error('Dashboard owner should not use seller access.');
    const sellerUsername = `test-seller-${Date.now()}`;
    const workerResponse = await fetch('http://localhost:3100/api/workers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ name: 'Test Seller', username: sellerUsername, password: 'seller-password' })
    });
    const worker = await workerResponse.json();
    const approval = await fetch(`http://localhost:3100/api/workers/${worker.worker.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ approved: true })
    });
    if (!approval.ok) throw new Error('Worker approval failed.');
    const sellerLogin = await fetch('http://localhost:3100/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: sellerUsername, password: 'seller-password' })
    });
    const sellerCookie = sellerLogin.headers.get('set-cookie').split(';')[0];
    await assertRoute(3100, '/seller', 'Seller portal', sellerCookie);
    const deniedDashboard = await fetch('http://localhost:3100/dashboard', { headers: { Cookie: sellerCookie } });
    if (deniedDashboard.status !== 403) throw new Error('Seller should not use dashboard access.');
    console.log('PASS: role-separated customer/seller/dashboard routes exist.');
  } catch (error) {
    console.error('FAIL:', error.message);
    console.error(logs.join(''));
    process.exitCode = 1;
  } finally {
    server.kill('SIGTERM');
  }
})();
