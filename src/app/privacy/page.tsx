import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const sections = [
  { title: 'Information we collect', body: 'SELAVOLT collects account information, vehicle details, payment metadata, charging session data, support interactions and service analytics required to operate a safe and transparent network.' },
  { title: 'How we use it', body: 'We use customer and operational data to deliver charging services, support driver accounts, manage billing, maintain reliability, and improve the experience across the network.' },
  { title: 'Security', body: 'We protect account information through secure authentication, encrypted transport, access controls and audit logging. Sensitive credentials are never exposed in frontend code.' },
  { title: 'Your rights', body: 'Customers can request access, correction or deletion of personal data in line with applicable privacy obligations and service operational requirements.' }
];

export default function PrivacyPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Privacy</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">Privacy policy</h1>
          <p className="mt-4 text-slate-600">This policy explains how SELAVOLT handles personal data, operational records and customer information in the development and operational lifecycle of the charging platform.</p>
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
