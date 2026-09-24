import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const sections = [
  { title: 'Service scope', body: 'SELAVOLT enables access to EV charging services through station locations, payment workflows and operational monitoring. Network operations remain subject to site conditions and service availability.' },
  { title: 'User responsibility', body: 'Drivers are responsible for using compatible connectors, safe operation of vehicles and compliance with site guidance while charging.' },
  { title: 'Payments & billing', body: 'Charging costs are displayed per kWh or station rules as configured by SELAVOLT. Payment states may be pending, authorized, paid, failed or refunded depending on the transaction lifecycle.' },
  { title: 'Platform changes', body: 'SELAVOLT may update service features, pricing or operational rules over time to improve reliability, security and host network performance.' }
];

export default function TermsPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Terms</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">Terms of service</h1>
          <p className="mt-4 text-slate-600">These terms describe how users access SELAVOLT charging services, station information and account tools.</p>
        </div>

        <div className="mt-12 space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="card-surface p-6">
              <h2 className="text-xl font-bold text-brand-navy">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
