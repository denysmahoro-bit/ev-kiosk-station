export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-lg rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Account recovery</p>
        <h1 className="mt-3 text-3xl font-black text-brand-navy">Reset password</h1>
        <p className="mt-3 text-sm text-slate-600">Enter the email associated with your admin account. This is a secure workflow placeholder for production email or SSO integration.</p>
        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Admin email</label>
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="admin@selavolt.rw" />
          </div>
          <button type="button" className="w-full rounded-2xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white">Send reset link</button>
        </form>
      </div>
    </main>
  );
}
