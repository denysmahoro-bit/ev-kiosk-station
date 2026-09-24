import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function CookiesPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Cookies</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">Cookie notice</h1>
          <p className="mt-4 text-slate-600">SELAVOLT may use cookies and similar technologies to improve usability, maintain secure sessions and support service analytics.</p>
        </div>

        <div className="mt-12 space-y-6">
          <div className="card-surface p-6">
            <h2 className="text-xl font-bold text-brand-navy">Essential cookies</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">These cookies support secure sign-in, session continuity and essential operating functions.</p>
          </div>
          <div className="card-surface p-6">
            <h2 className="text-xl font-bold text-brand-navy">Analytics cookies</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">We may use limited analytics to understand product usage, page performance and service quality, without exposing sensitive account information.</p>
          </div>
          <div className="card-surface p-6">
            <h2 className="text-xl font-bold text-brand-navy">Managing cookies</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Users may configure browser preferences to disable non-essential cookies while still accessing the public site and service pages.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
