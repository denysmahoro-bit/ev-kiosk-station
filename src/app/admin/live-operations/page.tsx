import { Activity, AlertTriangle, Circle } from 'lucide-react';

const liveChargers = [
  { id: 'CH-01', station: 'Kigali Central Hub', status: 'AVAILABLE', power: '98 kW', heartbeat: '4 sec ago', session: 'No active session' },
  { id: 'CH-02', station: 'Kigali Central Hub', status: 'CHARGING', power: '98 kW', heartbeat: '2 sec ago', session: 'SES-1042' },
  { id: 'CH-12', station: 'Rusumo Border Charging', status: 'FAULTED', power: '0 kW', heartbeat: '4 min ago', session: 'None' },
  { id: 'CH-21', station: 'Nyanza Retail Hub', status: 'OFFLINE', power: '0 kW', heartbeat: '12 min ago', session: 'None' }
];

export default function AdminLiveOperationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Operations</p>
        <h2 className="mt-2 text-3xl font-black text-brand-navy">Live operations</h2>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-brand-navy">Network map</h3>
          <div className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">DEMO DATA</div>
        </div>
        <div className="grid min-h-[260px] place-items-center rounded-[28px] bg-gradient-to-br from-brand-navy via-slate-900 to-slate-800 text-white">
          <div className="relative h-40 w-full max-w-xl">
            <div className="absolute left-10 top-10 h-3 w-3 rounded-full bg-brand-green" />
            <div className="absolute left-1/2 top-1/3 h-3 w-3 rounded-full bg-brand-cyan" />
            <div className="absolute bottom-10 right-16 h-3 w-3 rounded-full bg-red-500" />
            <div className="absolute right-8 top-8 h-3 w-3 rounded-full bg-slate-500" />
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <h3 className="text-xl font-bold text-brand-navy">Live charger table</h3>
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Charger</th>
                <th className="px-4 py-3">Station</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Power</th>
                <th className="px-4 py-3">Heartbeat</th>
              </tr>
            </thead>
            <tbody>
              {liveChargers.map((charger) => (
                <tr key={charger.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-semibold text-brand-navy">{charger.id}</td>
                  <td className="px-4 py-3 text-slate-600">{charger.station}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{charger.status}</span></td>
                  <td className="px-4 py-3 text-slate-600">{charger.power}</td>
                  <td className="px-4 py-3 text-slate-600">{charger.heartbeat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
