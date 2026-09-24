import { ShieldCheck } from 'lucide-react';
import { loginAction } from './actions';

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-green">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-brand-navy">SELAVOLT</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-cyan">CONTROL CENTER</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Secure access</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy">Admin login</h1>
        </div>

        <form action={loginAction} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input name="email" type="email" defaultValue="admin@selavolt.rw" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-cyan" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" defaultValue="password123" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-cyan" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <a href="/admin/forgot-password" className="font-medium text-brand-navy">Forgot password?</a>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">DEMO</span>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-brand-green px-5 py-3 text-sm font-semibold text-brand-navy shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
