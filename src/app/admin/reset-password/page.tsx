export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-lg rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Set new password</p>
        <h1 className="mt-3 text-3xl font-black text-brand-navy">Create a new admin password</h1>
        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">New password</label>
            <input type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="••••••••" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
            <input type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="••••••••" />
          </div>
          <button type="button" className="w-full rounded-2xl bg-brand-green px-5 py-3 text-sm font-semibold text-brand-navy">Update password</button>
        </form>
      </div>
    </main>
  );
}
