import { MessageSquareText, Send } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

const tickets = [
  { title: 'Charging session issue', status: 'Open', type: 'Charging' },
  { title: 'Billing confirmation', status: 'In progress', type: 'Payment' },
  { title: 'Station access problem', status: 'Resolved', type: 'Station' }
];

export default function DashboardSupportPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Support</p>
          <h1 className="mt-3 text-4xl font-black text-brand-navy">Customer support</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-surface p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-navy">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-brand-navy">Open a ticket</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Issue type</label>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  <option>Charging session</option>
                  <option>Payment</option>
                  <option>Account</option>
                  <option>Station</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <textarea className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Describe the issue" />
              </div>
              <Button href="/dashboard" variant="primary" className="w-full justify-center"><Send className="mr-2 h-4 w-4" /> Send request</Button>
            </div>
          </div>

          <div className="space-y-5">
            {tickets.map((ticket) => (
              <div key={ticket.title} className="card-surface p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold text-brand-navy">{ticket.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{ticket.type}</p>
                  </div>
                  <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-green">{ticket.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
