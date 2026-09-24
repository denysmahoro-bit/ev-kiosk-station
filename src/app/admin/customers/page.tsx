import { customers } from '@/lib/admin-data';

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Customers</p>
        <h2 className="mt-2 text-3xl font-black text-brand-navy">Customer management</h2>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Sessions</th>
              <th className="px-4 py-3">Energy</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.email} className="border-t border-slate-200">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold text-brand-navy">{customer.name}</p>
                    <p className="text-xs text-slate-500">{customer.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{customer.phone}</td>
                <td className="px-4 py-3 text-slate-600">{customer.sessions}</td>
                <td className="px-4 py-3 text-slate-600">{customer.energy}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{customer.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
