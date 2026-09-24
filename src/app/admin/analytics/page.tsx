import { energySeries, revenueSeries, sessionsSeries } from '@/lib/admin-data';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Analytics</p>
        <h2 className="mt-2 text-3xl font-black text-brand-navy">Business analytics</h2>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Revenue</h3>
          <div className="mt-5 flex h-40 items-end gap-2">
            {revenueSeries.map((value, idx) => (
              <div key={idx} className="flex-1 rounded-t-xl bg-gradient-to-t from-brand-green to-brand-cyan" style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Energy</h3>
          <div className="mt-5 flex h-40 items-end gap-2">
            {energySeries.map((value, idx) => (
              <div key={idx} className="flex-1 rounded-t-xl bg-gradient-to-t from-brand-cyan to-sky-400" style={{ height: `${(value / 1000) * 100}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Sessions</h3>
          <div className="mt-5 flex h-40 items-end gap-2">
            {sessionsSeries.map((value, idx) => (
              <div key={idx} className="flex-1 rounded-t-xl bg-gradient-to-t from-amber-400 to-orange-500" style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
