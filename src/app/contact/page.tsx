import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-2xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Contact</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy">Partner with SELAVOLT</h1>
          <p className="mt-3 text-slate-600">Tell us about your location, fleet needs, or commercial opportunity in Rwanda.</p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="you@company.rw" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
              <textarea className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Tell us what you need" />
            </div>
            <Button href="/" className="w-full">Send inquiry</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
