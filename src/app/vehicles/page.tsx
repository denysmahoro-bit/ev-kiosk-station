import { Car, Gauge, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const supportedVehicles = [
  { model: 'Tesla Model 3', connector: 'CCS2', range: '350+ km', role: 'Daily commuter' },
  { model: 'BYD Dolphin', connector: 'CCS2', range: '340 km', role: 'Urban mobility' },
  { model: 'VW ID.4', connector: 'CCS2', range: '410 km', role: 'Family EV' },
  { model: 'Kia EV6', connector: 'CCS2', range: '500 km', role: 'Long range' },
  { model: 'Nissan Leaf', connector: 'Type 2', range: '280 km', role: 'City transport' },
  { model: 'GB/T fleet vehicles', connector: 'GB/T', range: 'Varies', role: 'Commercial fleet' }
];

export default function VehiclesPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Vehicle support</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">Compatible EVs for Rwanda’s growing mobility mix</h1>
          <p className="mt-4 text-lg text-slate-600">SELAVOLT is designed to support mainstream EV models and a growing range of fleet, passenger and commercial vehicles.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportedVehicles.map(({ model, connector, range, role }) => (
            <div key={model} className="card-surface p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-navy">
                <Car className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-brand-navy">{model}</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between"><span>Connector</span><span className="font-semibold text-brand-navy">{connector}</span></div>
                <div className="flex items-center justify-between"><span>Range</span><span className="font-semibold text-brand-navy">{range}</span></div>
                <div className="flex items-center justify-between"><span>Use case</span><span className="font-semibold text-brand-navy">{role}</span></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { label: 'Connector coverage', value: 'CCS2 + GB/T + Type 2', icon: Gauge },
            { label: 'Security', value: 'Verified access and session tracking', icon: ShieldCheck },
            { label: 'Future ready', value: 'Designed for next-gen EV adoption', icon: Car }
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card-surface p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-navy">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-brand-cyan">{label}</p>
              <p className="mt-3 text-lg font-bold text-brand-navy">{value}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
