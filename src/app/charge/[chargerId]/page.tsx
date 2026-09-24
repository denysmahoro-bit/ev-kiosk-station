import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

const demoCharger = {
  station: 'Kigali Central Hub',
  charger: 'SELAVOLT-ST01-CH01-CCS2',
  connector: 'CCS2',
  power: '120 kW',
  price: 'RWF 420 / kWh',
  status: 'AVAILABLE'
};

export default function ChargePage({ params }: { params: { chargerId: string } }) {
  if (!params.chargerId) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <Link href="/stations" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
          <ArrowLeft className="h-4 w-4" />
          Back to stations
        </Link>

        <div className="mt-8 mx-auto max-w-2xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">QR charging access</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy">{demoCharger.charger}</h1>
          <p className="mt-2 text-sm text-slate-600">Station: {demoCharger.station}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Connector</p><p className="mt-2 text-lg font-bold text-brand-navy">{demoCharger.connector}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Power</p><p className="mt-2 text-lg font-bold text-brand-navy">{demoCharger.power}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p><p className="mt-2 text-lg font-bold text-brand-navy">{demoCharger.price}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Availability</p><p className="mt-2 text-lg font-bold text-brand-green">{demoCharger.status}</p></div>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            DEMO DATA • Authentication required before starting a real session. Connect the actual backend/OCPP layer before switching this flow to live charging.
          </div>

          <div className="mt-8">
            <Button href="/login" className="w-full justify-center">Sign in to start charging</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
