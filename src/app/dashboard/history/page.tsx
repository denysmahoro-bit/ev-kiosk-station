import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const history = [
  { station: 'Kigali Central Hub', date: '25 Sep 2026', duration: '24 min', energy: '82.4 kWh', amount: 'RWF 32,960', status: 'Completed' },
  { station: 'Nyanza Retail Hub', date: '18 Sep 2026', duration: '32 min', energy: '93.8 kWh', amount: 'RWF 37,520', status: 'Completed' },
  { station: 'Rusumo Border Charging', date: '11 Sep 2026', duration: '16 min', energy: '55.2 kWh', amount: 'RWF 25,392', status: 'Completed' }
];

export default function DashboardHistoryPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Charging history</p>
          <h1 className="mt-3 text-4xl font-black text-brand-navy">Recent sessions</h1>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Station</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Energy</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={`${row.station}-${row.date}`} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-brand-navy">{row.station}</td>
                  <td className="px-4 py-3 text-slate-600">{row.date}</td>
                  <td className="px-4 py-3 text-slate-600">{row.duration}</td>
                  <td className="px-4 py-3 text-slate-600">{row.energy}</td>
                  <td className="px-4 py-3 text-slate-600">{row.amount}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{row.status}</span></td>
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
