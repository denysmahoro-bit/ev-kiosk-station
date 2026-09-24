import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function RegisterPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Create account</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy">Register with SELAVOLT</h1>

          <form className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="+250" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="••••••••" />
            </div>
            <Button href="/dashboard" className="w-full">Create account</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
