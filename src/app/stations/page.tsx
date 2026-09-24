import Link from 'next/link';
import { ArrowRight, Map, Navigation, Zap } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { stations } from '@/data/mock';

export default function StationsPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Discover charging</p>
            <h1 className="mt-3 text-4xl font-black text-brand-navy">Find a charger</h1>
          </div>
          <Button href="/dashboard" variant="secondary">Open customer dashboard</Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan">Map view</p>
                <h2 className="mt-2 text-xl font-bold text-brand-navy">Network coverage</h2>
              </div>
              <div className="rounded-full bg-brand-cyan/10 p-2 text-brand-navy">
                <Map className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 grid min-h-[360px] place-items-center rounded-[24px] bg-gradient-to-br from-slate-900 via-brand-navy to-slate-800 text-white">
              <div className="relative h-52 w-full max-w-md">
                <div className="absolute left-8 top-10 h-4 w-4 rounded-full bg-brand-green shadow-[0_0_25px_rgba(34,197,94,0.9)]" />
                <div className="absolute left-1/2 top-1/3 h-4 w-4 rounded-full bg-brand-cyan shadow-[0_0_25px_rgba(6,182,212,0.9)]" />
                <div className="absolute bottom-10 right-12 h-4 w-4 rounded-full bg-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.9)]" />
                <div className="absolute inset-0 rounded-[28px] border border-white/10" />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <h3 className="text-xl font-bold text-brand-navy">Filters</h3>
            {['Available now', 'CCS2', 'GB/T', 'Fast charging', '60 kW', '120 kW', 'Price', 'Distance'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                <span>{item}</span>
                <div className="h-4 w-4 rounded-full border border-slate-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stations.map((station) => (
            <div key={station.id} className="card-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-brand-navy">{station.name}</h3>
                <StatusBadge status={station.status} />
              </div>
              <p className="mt-3 text-sm text-slate-600">{station.location}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Distance</p><p className="mt-2 font-bold text-brand-navy">{station.distanceKm} km</p></div>
                <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Power</p><p className="mt-2 font-bold text-brand-navy">{station.power}</p></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>{station.connector}</span>
                <span>RWF {station.priceRwf}/kWh</span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm text-slate-500"><Navigation className="h-4 w-4" /> {station.availableChargers} available</span>
                <Link href={`/stations/${station.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan">
                  Select <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
