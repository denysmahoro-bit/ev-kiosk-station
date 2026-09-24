import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-brand-navy text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-xl font-black text-white">SELAVOLT</p>
          <p className="mt-4 text-sm text-slate-300">Powering Rwanda&apos;s Electric Future.</p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan">Network</p>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link href="/stations">Find a charger</Link></li>
            <li><Link href="/charging">Charging</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan">Support</p>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link href="/help">Help center</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/login">Customer login</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan">Legal</p>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/cookies">Cookies</Link></li>
            <li>Kigali • Nyagatare • Rusumo</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
