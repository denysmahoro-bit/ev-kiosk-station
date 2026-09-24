import Link from 'next/link';
import { ArrowLeft, BatteryCharging, PlugZap, TimerReset, Zap } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { stations } from '@/data/mock';

export default function StationDetailPage({ params }: { params: { id: string } }) {
  const station = stations.find((item) => item.id === params.id);

  if (!station) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <main className="section-shell py-14">
        <Link href="/stations" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
          <ArrowLeft className="h-4 w-4" />
          Back to stations
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-cyan">Charging station</p>
                <h1 className="mt-3 text-3xl font-black text-brand-navy">{station.name}</h1>
              </div>
              <StatusBadge status={station.status} />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Location</p>
                <p className="mt-2 font-semibold text-brand-navy">{station.location}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Power</p>
                <p className="mt-2 font-semibold text-brand-navy">{station.power}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                <p className="mt-2 font-semibold text-brand-navy">RWF {station.priceRwf}/kWh</p>
              </div>
            </div>

            <div className="mt-8 rounded-[28px] bg-gradient-to-br from-brand-navy to-slate-900 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-cyan">Charging now</p>
                  <p className="mt-2 text-4xl font-black">82.4 kWh</p>
                </div>
                <div className="rounded-full bg-brand-green/20 p-3 text-brand-green">
                  <Zap className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Current power</p>
                  <p className="mt-2 text-2xl font-bold">98 kW</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Est. cost</p>
                  <p className="mt-2 text-2xl font-bold">RWF 32,960</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-cyan">Session details</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="flex items-center gap-2 text-sm text-slate-600"><BatteryCharging className="h-4 w-4 text-brand-green" /> Charger</span>
                <span className="font-bold text-brand-navy">CH-01</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="flex items-center gap-2 text-sm text-slate-600"><PlugZap className="h-4 w-4 text-brand-cyan" /> Connector</span>
                <span className="font-bold text-brand-navy">{station.connector}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="flex items-center gap-2 text-sm text-slate-600"><TimerReset className="h-4 w-4 text-amber-500" /> Elapsed</span>
                <span className="font-bold text-brand-navy">24 min</span>
              </div>
            </div>

            <div className="mt-8">
              <Button href="/dashboard" className="w-full">Start charging</Button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
