import { Activity, Plus } from 'lucide-react';
import { chargers } from '@/lib/admin-data';

export default function AdminChargersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Hardware</p>
          <h2 className="mt-2 text-3xl font-black text-brand-navy">Chargers</h2>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-navy">
          <Plus className="h-4 w-4" />
          Add charger
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {chargers.map((charger) => (
          <div key={charger.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-brand-navy">{charger.id}</p>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{charger.status}</span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p><span className="font-medium text-brand-navy">Station:</span> {charger.station}</p>
              <p><span className="font-medium text-brand-navy">Connector:</span> {charger.connector}</p>
              <p><span className="font-medium text-brand-navy">Power:</span> {charger.power}</p>
              <p><span className="font-medium text-brand-navy">OCPP:</span> {charger.ocpp}</p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-cyan">
              <Activity className="h-3.5 w-3.5" />
              {charger.lastHeartbeat}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
