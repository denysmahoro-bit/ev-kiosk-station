import { Car, Plus } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

const vehicles = [
  { name: 'Tesla Model 3', plate: 'RAD 214 A', connector: 'CCS2', make: 'Tesla', status: 'Ready' },
  { name: 'BYD Dolphin', plate: 'RAB 511 C', connector: 'CCS2', make: 'BYD', status: 'Ready' },
  { name: 'Kia EV6', plate: 'RAC 774 D', connector: 'CCS2', make: 'Kia', status: 'Pending verification' }
];

export default function DashboardVehiclesPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Vehicles</p>
            <h1 className="mt-3 text-4xl font-black text-brand-navy">My EVs</h1>
          </div>
          <Button href="/dashboard" variant="primary"><Plus className="mr-2 h-4 w-4" /> Add vehicle</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.plate} className="card-surface p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-navy">
                <Car className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-brand-navy">{vehicle.name}</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between"><span>Plate</span><span className="font-semibold text-brand-navy">{vehicle.plate}</span></div>
                <div className="flex items-center justify-between"><span>Make</span><span className="font-semibold text-brand-navy">{vehicle.make}</span></div>
                <div className="flex items-center justify-between"><span>Connector</span><span className="font-semibold text-brand-navy">{vehicle.connector}</span></div>
                <div className="flex items-center justify-between"><span>Status</span><span className="font-semibold text-brand-green">{vehicle.status}</span></div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
