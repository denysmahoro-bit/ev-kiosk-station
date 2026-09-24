import { BatteryCharging, PauseCircle, PlayCircle } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function DashboardChargingPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Charging session</p>
              <h1 className="mt-3 text-3xl font-black text-brand-navy">Kigali Central Hub</h1>
            </div>
            <div className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">ACTIVE</div>
          </div>

          <div className="mt-8 rounded-[28px] bg-brand-navy p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Current output</p>
                <p className="mt-2 text-4xl font-black">98 kW</p>
              </div>
              <BatteryCharging className="h-8 w-8 text-brand-green" />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Energy</p><p className="mt-2 text-2xl font-bold">82.4 kWh</p></div>
              <div className="rounded-2xl bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Duration</p><p className="mt-2 text-2xl font-bold">24 min</p></div>
              <div className="rounded-2xl bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Cost</p><p className="mt-2 text-2xl font-bold">RWF 32,960</p></div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/dashboard" variant="primary" className="w-full justify-center"><PlayCircle className="mr-2 h-4 w-4" /> Start charging</Button>
            <Button href="/dashboard" variant="secondary" className="w-full justify-center"><PauseCircle className="mr-2 h-4 w-4" /> Stop charging</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
