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

async function assertRoute(port, route, expectedText) {
  const response = await fetch(`http://localhost:${port}${route}`);
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`${route} responded with ${response.status}.`);
  }
  if (!html.includes(expectedText)) {
    throw new Error(`${route} did not include expected text: ${expectedText}`);
  }
}

(async () => {
  const server = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3100' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  const logs = [];
  server.stdout.on('data', (chunk) => logs.push(String(chunk)));
  server.stderr.on('data', (chunk) => logs.push(String(chunk)));

  try {
    await waitForServer(3100);
    await assertRoute(3100, '/customer', 'Customer portal');
    await assertRoute(3100, '/seller', 'Seller portal');
    await assertRoute(3100, '/dashboard', 'Dashboard');
    console.log('PASS: customer/seller/dashboard routes exist.');
  } catch (error) {
    console.error('FAIL:', error.message);
    console.error(logs.join(''));
    process.exitCode = 1;
  } finally {
    server.kill('SIGTERM');
  }
})();
