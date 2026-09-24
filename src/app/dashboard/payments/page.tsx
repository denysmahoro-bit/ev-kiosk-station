import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const payments = [
  { id: 'TX-2201', date: '2026-09-24', method: 'Mobile Money', amount: 'RWF 32,960', status: 'PAID' },
  { id: 'TX-2188', date: '2026-09-18', method: 'Card', amount: 'RWF 20,815', status: 'PAID' },
  { id: 'TX-2164', date: '2026-09-11', method: 'Mobile Money', amount: 'RWF 25,392', status: 'FAILED' }
];

export default function DashboardPaymentsPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Payments</p>
          <h1 className="mt-3 text-4xl font-black text-brand-navy">Payment history</h1>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Transaction</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-brand-navy">{item.id}</td>
                  <td className="px-4 py-3 text-slate-600">{item.date}</td>
                  <td className="px-4 py-3 text-slate-600">{item.method}</td>
                  <td className="px-4 py-3 text-slate-600">{item.amount}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${item.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
