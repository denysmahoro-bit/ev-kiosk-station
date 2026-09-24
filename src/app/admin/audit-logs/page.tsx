import { auditLogs } from '@/lib/admin-data';

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Audit</p>
        <h2 className="mt-2 text-3xl font-black text-brand-navy">Audit log</h2>
      </div>

      <div className="space-y-4">
        {auditLogs.map((row) => (
          <div key={`${row.actor}-${row.action}-${row.time}`} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-bold text-brand-navy">{row.action}</p>
              <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-green">{row.result}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{row.actor} changed {row.entity}</p>
            <p className="mt-1 text-xs text-slate-500">{row.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
