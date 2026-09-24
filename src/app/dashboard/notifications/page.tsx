import { BellRing } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const notifications = [
  { title: 'Session started', message: 'Your charging session at Kigali Central Hub has started successfully.', time: '2 min ago', status: 'Sent' },
  { title: 'Price update', message: 'Your preferred station rate remains consistent with current network pricing.', time: '1 hour ago', status: 'Seen' },
  { title: 'Reminder', message: 'Your next planned charging window opens in 3 hours.', time: 'Today', status: 'Queued' }
];

export default function DashboardNotificationsPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cyan">Notifications</p>
          <h1 className="mt-3 text-4xl font-black text-brand-navy">Your alerts</h1>
        </div>

        <div className="space-y-5">
          {notifications.map((item) => (
            <div key={item.title} className="card-surface flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-navy">
                <BellRing className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-bold text-brand-navy">{item.title}</h2>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-cyan">{item.status}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.message}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
