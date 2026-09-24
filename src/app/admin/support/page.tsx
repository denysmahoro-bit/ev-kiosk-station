import { supportTickets } from '@/lib/admin-data';

export default function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Support</p>
        <h2 className="mt-2 text-3xl font-black text-brand-navy">Support tickets</h2>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Ticket</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Issue</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {supportTickets.map((ticket) => (
              <tr key={ticket.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold text-brand-navy">{ticket.id}</td>
                <td className="px-4 py-3 text-slate-600">{ticket.customer}</td>
                <td className="px-4 py-3 text-slate-600">{ticket.issue}</td>
                <td className="px-4 py-3 text-slate-600">{ticket.priority}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{ticket.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
