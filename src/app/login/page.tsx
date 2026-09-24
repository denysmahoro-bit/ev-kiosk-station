import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-md rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Access portal</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">Secure sign-in for drivers and network operators.</p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 focus:border-brand-cyan" placeholder="driver@selavolt.rw" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 focus:border-brand-cyan" placeholder="••••••••" />
            </div>
            <Button href="/dashboard" className="w-full">Sign in</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
