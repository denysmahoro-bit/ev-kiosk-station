import { Mail, Phone, UserRound } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function DashboardProfilePage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Profile</p>
              <h1 className="mt-3 text-3xl font-black text-brand-navy">Aline Uwimana</h1>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy text-white">
              <UserRound className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</p>
              <div className="mt-3 flex items-center gap-3 text-brand-navy"><Phone className="h-4 w-4" /> +250 788 123 456</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
              <div className="mt-3 flex items-center gap-3 text-brand-navy"><Mail className="h-4 w-4" /> aline@selavolt.rw</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Preferred vehicle</p>
              <p className="mt-3 text-lg font-bold text-brand-navy">Tesla Model 3 • CCS2</p>
            </div>
          </div>

          <div className="mt-8">
            <Button href="/dashboard" variant="primary" className="w-full justify-center">Update profile</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
