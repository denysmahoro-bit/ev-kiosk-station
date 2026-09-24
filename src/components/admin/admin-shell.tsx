import Link from 'next/link';
import { Bell, ChevronDown, LogOut, Menu, Search, ShieldCheck } from 'lucide-react';
import { logoutAction } from '@/app/admin/login/actions';
import { adminHeaderUser, adminNav, demoModeBanner } from '@/lib/admin-data';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="relative flex min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.10),transparent_25%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_18%)]" />

        <aside className="relative hidden w-72 flex-col border-r border-white/10 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_30%),linear-gradient(180deg,#071a2b_0%,#0d1e2d_100%)] text-slate-100 lg:flex">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-green/30 to-brand-cyan/30 text-brand-green shadow-[0_12px_24px_rgba(34,197,94,0.25)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">SELAVOLT</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-cyan">CONTROL CENTER</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-5">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-white/6 hover:text-white"
              >
                <span className="mr-3 inline-flex h-2 w-2 rounded-full bg-brand-cyan/80 transition group-hover:bg-brand-green" />
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="px-4 pb-5">
            <div className="rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 p-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-cyan shadow-[0_10px_30px_rgba(6,182,212,0.15)]">
              {demoModeBanner}
            </div>
          </div>
        </aside>

        <div className="relative flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm lg:hidden">
                  <Menu className="h-5 w-5 text-brand-navy" />
                </button>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cyan">Network</p>
                  <h1 className="text-xl font-black tracking-tight text-brand-navy">SELAVOLT Operations Hub</h1>
                </div>
              </div>

              <div className="hidden flex-1 items-center justify-center px-8 md:flex">
                <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm">
                  <Search className="h-4 w-4 text-slate-500" />
                  <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Search stations, customers, sessions..." />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-navy shadow-sm">
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-green ring-2 ring-white" />
                </button>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-cyan text-sm font-bold text-white">
                    {adminHeaderUser.name.slice(0, 1)}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-brand-navy">{adminHeaderUser.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{adminHeaderUser.role}</p>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-slate-500 sm:block" />
                </div>

                <form action={logoutAction}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-brand-navy shadow-sm transition hover:border-brand-cyan/50 hover:text-brand-navy">
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </form>
              </div>
            </div>
          </header>

          <main className="p-5 lg:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
