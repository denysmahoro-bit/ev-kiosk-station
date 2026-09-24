import { Activity, BatteryCharging, CreditCard, History, MapPinned } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

const dashboardStats = [
  { label: 'Available stations', value: '12', icon: MapPinned },
  { label: 'Active session', value: '01:24:10', icon: Activity },
  { label: 'Current cost', value: 'RWF 32,960', icon: CreditCard },
  { label: 'Energy this session', value: '82.4 kWh', icon: BatteryCharging }
];

const sessionHistory = [
  { station: 'Kigali Central Hub', date: '25 Sep 2026', duration: '24 min', energy: '82.4 kWh', amount: 'RWF 32,960', status: 'Completed' },
  { station: 'Nyanza Retail Hub', date: '18 Sep 2026', duration: '32 min', energy: '93.8 kWh', amount: 'RWF 37,520', status: 'Completed' },
  { station: 'Rusumo Border Charging', date: '11 Sep 2026', duration: '16 min', energy: '55.2 kWh', amount: 'RWF 25,392', status: 'Completed' }
];

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-cyan">Customer dashboard</p>
            <h1 className="mt-3 text-4xl font-black text-brand-navy">Welcome back, Aline</h1>
          </div>
          <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">Account active</div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="card-surface p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{label}</p>
                <div className="rounded-xl bg-brand-cyan/10 p-2 text-brand-navy"><Icon className="h-4 w-4" /></div>
              </div>
              <p className="mt-4 text-2xl font-black text-brand-navy">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-navy">Active charging session</h2>
              <div className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-green">Charging</div>
            </div>

            <div className="mt-6 rounded-[28px] bg-brand-navy p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Kigali Central Hub</p>
                  <p className="mt-2 text-3xl font-black">98 kW</p>
                </div>
                <div className="rounded-full bg-white/5 p-3">
                  <BatteryCharging className="h-6 w-6 text-brand-cyan" />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-200">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-slate-300">Energy delivered</p>
                  <p className="mt-2 text-xl font-bold">82.4 kWh</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-slate-300">Estimated cost</p>
                  <p className="mt-2 text-xl font-bold">RWF 32,960</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-xl font-bold text-brand-navy">Profile</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-slate-500">Name</p><p className="mt-1 font-semibold text-brand-navy">Aline Uwimana</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-slate-500">Phone</p><p className="mt-1 font-semibold text-brand-navy">+250 788 123 456</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-slate-500">Vehicle</p><p className="mt-1 font-semibold text-brand-navy">Tesla Model 3</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-slate-500">Preferred connector</p><p className="mt-1 font-semibold text-brand-navy">CCS2</p></div>
            </div>
          </div>
        </div>

        <div className="mt-10 card-surface p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-navy">Charging history</h2>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
              <History className="h-4 w-4" />
              Last 3 sessions
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Station</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Energy</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {sessionHistory.map((row) => (
                  <tr key={`${row.station}-${row.date}`}>
                    <td className="px-4 py-3 font-medium text-brand-navy">{row.station}</td>
                    <td className="px-4 py-3 text-slate-600">{row.date}</td>
                    <td className="px-4 py-3 text-slate-600">{row.energy}</td>
                    <td className="px-4 py-3 text-slate-600">{row.amount}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
