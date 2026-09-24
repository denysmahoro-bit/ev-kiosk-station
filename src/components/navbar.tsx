import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/stations', label: 'Stations' },
    { href: '/charging', label: 'Charging' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/vehicles', label: 'Vehicles' },
    { href: '/business', label: 'Business' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-brand-navy">
            <Image src="/selavolt-mark.svg" alt="SELAVOLT logo" width={40} height={40} priority />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-brand-navy">SELAVOLT</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-cyan">Rwanda charging</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-brand-navy">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-medium text-brand-navy">Login</Link>
          <Button href="/register" variant="primary">Register</Button>
        </div>

        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5 text-brand-navy" />
        </button>
      </div>
    </header>
  );
}
