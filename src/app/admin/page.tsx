import { ArrowUpRight, BatteryCharging, CreditCard, Gauge, MapPinned, TrendingUp, Users } from 'lucide-react';
import { overviewStats, revenueSeries, energySeries, sessionsSeries, utilizationData, stations, payments, sessions, auditLogs } from '@/lib/admin-data';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Overview</p>
          <h2 className="mt-2 text-3xl font-black text-brand-navy">Business overview</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-brand-navy">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-green" />
          Demo data active
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((item) => (
          <div key={item.label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="rounded-xl bg-slate-100 p-2 text-brand-navy">
                {item.tone === 'green' ? <TrendingUp className="h-4 w-4" /> : item.tone === 'blue' ? <MapPinned className="h-4 w-4" /> : item.tone === 'cyan' ? <BatteryCharging className="h-4 w-4" /> : item.tone === 'amber' ? <Gauge className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
              </div>
            </div>
            <p className="mt-5 text-3xl font-black text-brand-navy">{item.value}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{item.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-brand-navy">Revenue over time</h3>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">Last 12 months</span>
          </div>
          <div className="flex h-56 items-end gap-2">
            {revenueSeries.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-2xl bg-gradient-to-t from-brand-green via-emerald-400 to-brand-cyan" style={{ height: `${value}%` }} />
                <span className="text-[10px] text-slate-500">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Network Summary</h3>
          <div className="mt-5 space-y-4">
            {stations.map((station) => (
              <div key={station.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-brand-navy">{station.name}</p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{station.status}</span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600">
                  <div className="flex justify-between"><span>Available chargers</span><span>{station.chargers - station.activeSessions}</span></div>
                  <div className="flex justify-between"><span>Charging</span><span>{station.activeSessions}</span></div>
                  <div className="flex justify-between"><span>Revenue</span><span>{station.revenue}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft xl:col-span-2">
          <h3 className="text-xl font-bold text-brand-navy">Recent charging sessions</h3>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Session</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Station</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((row) => (
                  <tr key={row.id} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-brand-navy">{row.id}</td>
                    <td className="px-4 py-3">{row.customer}</td>
                    <td className="px-4 py-3">{row.station}</td>
                    <td className="px-4 py-3">{row.amount}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Critical alerts</h3>
          <div className="mt-5 space-y-4">
            {['CH-12 faulted at Rusumo Border Charging', 'Nyanza Retail Hub offline', 'Maintenance window required for CH-21'].map((alert) => (
              <div key={alert} className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                {alert}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Energy delivered</h3>
          <div className="mt-6 flex h-48 items-end gap-2">
            {energySeries.map((value, index) => (
              <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-brand-cyan to-brand-green" style={{ height: `${(value / 1000) * 100}%` }} />
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Utilization by station</h3>
          <div className="mt-6 space-y-4">
            {utilizationData.map((item) => (
              <div key={item.station}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>{item.station}</span>
                  <span>{item.utilisation}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className="h-2.5 rounded-full bg-gradient-to-r from-brand-green to-brand-cyan" style={{ width: `${item.utilisation}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Recent payments</h3>
          <div className="mt-5 space-y-3">
            {payments.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <div>
                  <p className="font-semibold text-brand-navy">{item.customer}</p>
                  <p className="text-xs text-slate-500">{item.id} • {item.method}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-brand-navy">{item.amount}</p>
                  <p className="text-xs text-slate-500">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Recent administrative actions</h3>
          <div className="mt-5 space-y-3">
            {auditLogs.map((row) => (
              <div key={`${row.actor}-${row.time}`} className="rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-brand-navy">{row.action}</p>
                  <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-green">{row.result}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{row.actor} • {row.entity}</p>
                <p className="mt-1 text-xs text-slate-500">{row.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
