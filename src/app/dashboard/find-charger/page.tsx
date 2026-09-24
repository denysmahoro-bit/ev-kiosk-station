import { ArrowRight, MapPinned, Navigation } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

const stations = [
  { name: 'Kigali Central Hub', distance: '1.8 km', power: '120 kW', status: 'Available now' },
  { name: 'Nyagatare Rest Stop', distance: '22.4 km', power: '60 kW', status: 'Available now' },
  { name: 'Rusumo Border Charging', distance: '78.6 km', power: '180 kW', status: 'Busy' },
  { name: 'Nyanza Retail Hub', distance: '45.2 km', power: '60 kW', status: 'Offline' }
];

export default function DashboardFindChargerPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Find charger</p>
            <h1 className="mt-3 text-4xl font-black text-brand-navy">Nearby stations</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-2 text-sm font-semibold text-brand-green">
            <MapPinned className="h-4 w-4" /> DEMO DATA
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stations.map((station) => (
            <div key={station.name} className="card-surface p-5">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-brand-navy">{station.name}</p>
                <Navigation className="h-4 w-4 text-brand-cyan" />
              </div>
              <p className="mt-4 text-sm text-slate-600">{station.distance}</p>
              <p className="mt-2 text-sm text-slate-600">{station.power}</p>
              <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm font-medium text-brand-navy">{station.status}</div>
              <div className="mt-5">
                <Button href="/stations" variant="secondary" className="w-full justify-center">View details <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
