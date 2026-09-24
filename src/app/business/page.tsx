import { Building2, Handshake, Route, Users } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

const businessSolutions = [
  { title: 'Retail & hospitality', text: 'Drive traffic and revenue with premium driver-friendly charging at strategic customer destinations.', icon: Building2 },
  { title: 'Fleet operations', text: 'Reduce downtime and manage recurring vehicle charging for delivery, taxi and public service fleets.', icon: Route },
  { title: 'Commercial partnerships', text: 'Turn your property into an EV-ready hub with SELAVOLT network support and operational expertise.', icon: Handshake },
  { title: 'Customer retention', text: 'Create a stronger experience for EV drivers and increase dwell time at your location.', icon: Users }
];

export default function BusinessPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Business solutions</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">Power the next generation of mobility.</h1>
          <p className="mt-4 text-lg text-slate-600">SELAVOLT helps businesses, fleets and public partners roll out dependable EV charging infrastructure with professional support.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {businessSolutions.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-surface p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-navy">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-brand-navy">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[30px] border border-slate-200 bg-brand-navy p-8 text-white shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Ready to partner?</p>
          <h2 className="mt-3 text-3xl font-black">Plan a charging site with SELAVOLT</h2>
          <p className="mt-4 max-w-2xl text-slate-300">From site selection to installation and operations support, we help communities and brands adopt EV charging confidently.</p>
          <div className="mt-6">
            <Button href="/contact" variant="secondary" className="bg-white text-brand-navy">Talk to our team</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
