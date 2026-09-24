import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg px-4">
      <div className="card-surface max-w-md p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">404</p>
        <h1 className="mt-3 text-3xl font-black text-brand-navy">Page not found</h1>
        <p className="mt-3 text-slate-600">The route you requested does not exist in the SELAVOLT network.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-brand-navy">
          Return home
        </Link>
      </div>
    </main>
  );
}
