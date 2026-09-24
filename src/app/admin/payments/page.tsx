import { payments } from '@/lib/admin-data';

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Finance</p>
        <h2 className="mt-2 text-3xl font-black text-brand-navy">Payments & revenue</h2>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Transaction</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Station</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold text-brand-navy">{payment.id}</td>
                <td className="px-4 py-3 text-slate-600">{payment.customer}</td>
                <td className="px-4 py-3 text-slate-600">{payment.station}</td>
                <td className="px-4 py-3 font-semibold text-brand-navy">{payment.amount}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{payment.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
