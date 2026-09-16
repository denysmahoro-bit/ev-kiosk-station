const registerForm = document.getElementById('register-form');
const sessionForm = document.getElementById('session-form');
const paymentForm = document.getElementById('payment-form');
const confirmForm = document.getElementById('confirm-form');
const vehicleSelect = document.getElementById('vehicle_id');
const dashboardSummary = document.getElementById('dashboard-summary');
const sessionsTable = document.getElementById('sessions-table');

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

async function loadVehicles() {
  const vehicles = await fetchJson('/api/vehicles');
  vehicleSelect.innerHTML = vehicles
    .map((vehicle) => `<option value="${vehicle.id}">${vehicle.plate_number} - ${vehicle.full_name}</option>`)
    .join('');

  if (!vehicles.length) {
    vehicleSelect.innerHTML = '<option value="">No vehicles registered</option>';
  }
}

async function loadDashboard() {
  const stats = await fetchJson('/api/dashboard');

  dashboardSummary.innerHTML = `
    <div class="summary-card">
      <h3>Customers</h3>
      <p>${stats.totalCustomers}</p>
    </div>
    <div class="summary-card">
      <h3>Vehicles</h3>
      <p>${stats.totalVehicles}</p>
    </div>
    <div class="summary-card">
      <h3>Sessions</h3>
      <p>${stats.totalSessions}</p>
    </div>
    <div class="summary-card">
      <h3>Revenue</h3>
      <p>${stats.totalRevenue} RWF</p>
    </div>
  `;

  sessionsTable.innerHTML = (stats.sessions || [])
    .slice()
    .reverse()
    .map((session) => `
      <tr>
        <td>${session.plate_number}</td>
        <td>${session.seller_name}</td>
        <td>${session.amount_due} RWF</td>
        <td><span class="status-badge ${session.status}">${session.status}</span></td>
      </tr>
    `)
    .join('');
}

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const payload = {
      full_name: document.getElementById('full_name').value,
      phone_number: document.getElementById('phone_number').value,
      plate_number: document.getElementById('plate_number').value,
      vehicle_type: document.getElementById('vehicle_type').value
    };

    await fetchJson('/api/customers/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    registerForm.reset();
    await loadVehicles();
    await loadDashboard();
    alert('Customer registered successfully.');
  } catch (error) {
    alert(error.message);
  }
});

sessionForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const checked = document.getElementById('customer_confirmed').checked;
    if (!checked) {
      throw new Error('Customer must confirm the amount before charging starts.');
    }

    const payload = {
      vehicle_id: vehicleSelect.value,
      charger_id: document.getElementById('charger_id').value,
      amount_due: Number(document.getElementById('amount_due').value || 0),
      seller_name: document.getElementById('seller_name').value
    };

    const result = await fetchJson('/api/sessions/start', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    document.getElementById('session_id').value = result.session.id;
    document.getElementById('confirm_session_id').value = result.session.id;
    await loadDashboard();
    alert(`Charging session started. Session ID: ${result.session.id}. Amount due: ${result.session.amount_due} RWF.`);
  } catch (error) {
    alert(error.message);
  }
});

paymentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const payload = {
      session_id: Number(document.getElementById('session_id').value),
      phone_number: document.getElementById('payment_phone').value,
      provider: document.getElementById('provider').value
    };

    const result = await fetchJson('/api/payments/initiate', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    document.getElementById('payment_id').value = result.payment.id;
    alert(result.instructions);
  } catch (error) {
    alert(error.message);
  }
});

confirmForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const payload = {
      payment_id: Number(document.getElementById('payment_id').value),
      session_id: Number(document.getElementById('confirm_session_id').value)
    };

    await fetchJson('/api/payments/confirm', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    await loadDashboard();
    alert('Payment confirmed. Charging session complete.');
  } catch (error) {
    alert(error.message);
  }
});

(async function init() {
  try {
    await loadVehicles();
    await loadDashboard();
  } catch (error) {
    console.error(error);
  }
})();
