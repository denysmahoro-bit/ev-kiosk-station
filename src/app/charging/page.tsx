import { BatteryCharging, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

const chargingFeatures = [
  { title: 'Fast charging', text: 'High-power charging for road trips, city commutes and commercial fleets.', icon: Zap },
  { title: 'Smart session control', text: 'Monitor energy, pricing and charging status in real time from a single workflow.', icon: BatteryCharging },
  { title: 'Secure operations', text: 'Role-based site management and payment integrity with strict audit trails.', icon: ShieldCheck }
];

export default function ChargingPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Charging experience</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">EV charging built for Rwanda’s pace</h1>
          <p className="mt-4 text-lg text-slate-600">SELAVOLT brings dependable, premium charging to highways, city centers, fleet depots, and commercial destinations.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {chargingFeatures.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-surface p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-navy">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-brand-navy">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">DEMO DATA</p>
              <h2 className="mt-3 text-3xl font-black text-brand-navy">Charging flow</h2>
            </div>
            <Button href="/stations" variant="primary">Find a station</Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {['Plan route', 'Choose charger', 'Authenticate', 'Charge & pay'].map((step, index) => (
              <div key={step} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">0{index + 1}</p>
                <p className="mt-3 text-lg font-bold text-brand-navy">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
