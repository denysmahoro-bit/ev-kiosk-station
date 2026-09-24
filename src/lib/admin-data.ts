export type RoleName =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'STATION_MANAGER'
  | 'FINANCE_MANAGER'
  | 'SUPPORT_AGENT'
  | 'TECHNICIAN';

export const adminNav = [
  { title: 'Overview', href: '/admin' },
  { title: 'Stations', href: '/admin/stations' },
  { title: 'Chargers', href: '/admin/chargers' },
  { title: 'Live Operations', href: '/admin/live-operations' },
  { title: 'Charging Sessions', href: '/admin/sessions' },
  { title: 'Customers', href: '/admin/customers' },
  { title: 'Payments & Revenue', href: '/admin/payments' },
  { title: 'Pricing', href: '/admin/pricing' },
  { title: 'Analytics', href: '/admin/analytics' },
  { title: 'Support', href: '/admin/support' },
  { title: 'Notifications', href: '/admin/notifications' },
  { title: 'Audit Logs', href: '/admin/audit-logs' },
  { title: 'Staff & Permissions', href: '/admin/staff' },
  { title: 'Settings', href: '/admin/settings' }
];

export const overviewStats = [
  { label: 'Total Stations', value: '32', change: '+4 this month', tone: 'blue' },
  { label: 'Total Chargers', value: '148', change: '+12 this week', tone: 'green' },
  { label: 'Online Chargers', value: '136', change: '92% uptime', tone: 'cyan' },
  { label: 'Active Charging Sessions', value: '21', change: '6 in Kigali', tone: 'amber' },
  { label: "Today's Revenue", value: 'RWF 2.4M', change: '+8.4%', tone: 'green' },
  { label: "Today's Energy Delivered", value: '4,820 kWh', change: '+12.6%', tone: 'blue' },
  { label: 'Registered Customers', value: '12,430', change: '+320 this month', tone: 'cyan' },
  { label: 'Faulted Chargers', value: '4', change: '2 require attention', tone: 'red' }
];

export const revenueSeries = [38, 58, 49, 72, 88, 96, 118, 103, 126, 134, 120, 148];
export const energySeries = [300, 420, 470, 520, 610, 690, 760, 710, 830, 880, 780, 930];
export const sessionsSeries = [28, 36, 42, 57, 61, 74, 70, 83, 96, 92, 101, 108];
export const utilizationData = [
  { station: 'Kigali Central Hub', utilisation: 86 },
  { station: 'Rusumo Border Charging', utilisation: 74 },
  { station: 'Nyanza Retail Hub', utilisation: 61 },
  { station: 'Nyagatare Rest Stop', utilisation: 58 }
];

export const stations = [
  { id: 'ST-001', name: 'Kigali Central Hub', district: 'Kigali City', status: 'ACTIVE', revenue: 'RWF 540,000', chargers: 12, activeSessions: 4 },
  { id: 'ST-002', name: 'Rusumo Border Charging', district: 'Kirehe', status: 'ACTIVE', revenue: 'RWF 410,000', chargers: 10, activeSessions: 3 },
  { id: 'ST-003', name: 'Nyanza Retail Hub', district: 'Nyanza', status: 'UNDER_MAINTENANCE', revenue: 'RWF 180,000', chargers: 8, activeSessions: 1 },
  { id: 'ST-004', name: 'Nyagatare Rest Stop', district: 'Nyagatare', status: 'COMING_SOON', revenue: 'RWF 0', chargers: 4, activeSessions: 0 }
];

export const chargers = [
  { id: 'CH-01', station: 'Kigali Central Hub', connector: 'CCS2', power: '120 kW', status: 'AVAILABLE', lastHeartbeat: '12 sec ago', ocpp: 'CONNECTED' },
  { id: 'CH-02', station: 'Kigali Central Hub', connector: 'GB/T', power: '60 kW', status: 'CHARGING', lastHeartbeat: '3 sec ago', ocpp: 'CONNECTED' },
  { id: 'CH-12', station: 'Rusumo Border Charging', connector: 'CCS2', power: '180 kW', status: 'FAULTED', lastHeartbeat: '4 min ago', ocpp: 'DEGRADED' },
  { id: 'CH-21', station: 'Nyanza Retail Hub', connector: 'Type 2', power: '30 kW', status: 'OFFLINE', lastHeartbeat: '12 min ago', ocpp: 'NOT CONNECTED' }
];

export const sessions = [
  { id: 'SES-1042', customer: 'Aline Uwimana', vehicle: 'Tesla Model 3', station: 'Kigali Central Hub', charger: 'CH-02', amount: 'RWF 32,960', status: 'ACTIVE', start: '09:34', duration: '24 min' },
  { id: 'SES-1039', customer: 'Emmanuel Nkurunziza', vehicle: 'BYD Dolphin', station: 'Rusumo Border Charging', charger: 'CH-07', amount: 'RWF 25,392', status: 'COMPLETED', start: '08:01', duration: '16 min' },
  { id: 'SES-1034', customer: 'Jean Bosco', vehicle: 'VW ID.4', station: 'Nyanza Retail Hub', charger: 'CH-16', amount: 'RWF 18,430', status: 'STOPPED', start: '07:52', duration: '12 min' }
];

export const customers = [
  { name: 'Aline Uwimana', email: 'aline@selavolt.rw', phone: '+250 788 123 456', sessions: 18, energy: '1,240 kWh', spend: 'RWF 420,000', status: 'ACTIVE' },
  { name: 'Emmanuel Nkurunziza', email: 'emmanuel@selavolt.rw', phone: '+250 785 908 772', sessions: 12, energy: '930 kWh', spend: 'RWF 312,000', status: 'ACTIVE' },
  { name: 'Jean Bosco', email: 'jbosco@selavolt.rw', phone: '+250 732 009 344', sessions: 7, energy: '480 kWh', spend: 'RWF 195,000', status: 'SUSPENDED' }
];

export const payments = [
  { id: 'TX-2201', customer: 'Aline Uwimana', station: 'Kigali Central Hub', amount: 'RWF 32,960', status: 'PAID', method: 'Mobile Money', date: '2026-09-24' },
  { id: 'TX-2188', customer: 'Emmanuel Nkurunziza', station: 'Rusumo Border Charging', amount: 'RWF 25,392', status: 'AUTHORIZED', method: 'Card', date: '2026-09-24' },
  { id: 'TX-2164', customer: 'Jean Bosco', station: 'Nyanza Retail Hub', amount: 'RWF 18,430', status: 'FAILED', method: 'Mobile Money', date: '2026-09-23' }
];

export const pricingRules = [
  { name: 'Kigali Peak Rate', station: 'Kigali Central Hub', connector: 'CCS2', price: 'RWF 420 / kWh', status: 'ACTIVE' },
  { name: 'Rural Standard', station: 'Rusumo Border Charging', connector: 'GB/T', price: 'RWF 390 / kWh', status: 'ACTIVE' },
  { name: 'Nyanza Off-Peak', station: 'Nyanza Retail Hub', connector: 'Type 2', price: 'RWF 310 / kWh', status: 'DRAFT' }
];

export const supportTickets = [
  { id: 'TKT-109', customer: 'Aline Uwimana', subject: 'Payment confirmation delay', issue: 'Payment confirmation delay', priority: 'HIGH', status: 'IN_PROGRESS' },
  { id: 'TKT-107', customer: 'Jean Bosco', subject: 'Charger offline at Nyanza', issue: 'Charger offline at Nyanza', priority: 'URGENT', status: 'OPEN' },
  { id: 'TKT-103', customer: 'Emmanuel Nkurunziza', subject: 'Billing mismatch', issue: 'Billing mismatch', priority: 'MEDIUM', status: 'RESOLVED' }
];

export const notifications = [
  { title: 'Charging session started', channel: 'In-app', message: 'Aline Uwimana has started a session at Kigali Central Hub.', sentAt: '2 min ago', type: 'Session', status: 'Sent' },
  { title: 'Charger fault detected', channel: 'System alert', message: 'CH-12 has reported a fault at Rusumo Border Charging.', sentAt: '11 min ago', type: 'Alert', status: 'Queued' },
  { title: 'Payment successful', channel: 'In-app', message: 'Payment TX-2201 has been recorded successfully.', sentAt: '21 min ago', type: 'Finance', status: 'Sent' }
];

export const staff = [
  { name: 'Nadine Mugisha', role: 'SUPER_ADMIN', station: 'All', status: 'ACTIVE' },
  { name: 'Patrick Kayitesi', role: 'STATION_MANAGER', station: 'Kigali Central Hub', status: 'ACTIVE' },
  { name: 'Grace Uwizeyimana', role: 'FINANCE_MANAGER', station: 'All', status: 'ACTIVE' },
  { name: 'Didas Murenzi', role: 'TECHNICIAN', station: 'Nyanza Retail Hub', status: 'ON_LEAVE' }
];

export const auditLogs = [
  { actor: 'Nadine Mugisha', action: 'Created station', entity: 'Kigali Central Hub', time: '2026-09-24 10:31', result: 'SUCCESS' },
  { actor: 'Grace Uwizeyimana', action: 'Changed pricing', entity: 'Kigali Peak Rate', time: '2026-09-24 09:44', result: 'SUCCESS' },
  { actor: 'Patrick Kayitesi', action: 'Disabled charger', entity: 'CH-21', time: '2026-09-23 17:05', result: 'SUCCESS' }
];

export const demoModeBanner = 'DEMO DATA - DEVELOPMENT ONLY';

export const adminHeaderUser = {
  name: 'Nadine Mugisha', role: 'SUPER_ADMIN'
};
