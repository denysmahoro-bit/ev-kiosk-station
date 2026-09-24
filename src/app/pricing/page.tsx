import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

const plans = [
  { name: 'Pay as you go', price: 'RWF 400 / kWh', text: 'Designed for occasional drivers and intercity travel.' },
  { name: 'City pass', price: 'RWF 18,000 / month', text: 'Ideal for commuters and regular urban drivers.' },
  { name: 'Fleet', price: 'Custom pricing', text: 'For business fleets and scheduled charging programs.' }
];

export default function PricingPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Pricing</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">Simple rates for a growing network</h1>
          <p className="mt-4 text-slate-600">Transparent pricing, configurable by location and connector type, with room for future loyalty and fleet programs.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="card-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan">{plan.name}</p>
              <p className="mt-4 text-3xl font-black text-brand-navy">{plan.price}</p>
              <p className="mt-4 text-sm text-slate-600">{plan.text}</p>
              <div className="mt-6"><Button href="/register" variant="primary">Get started</Button></div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
