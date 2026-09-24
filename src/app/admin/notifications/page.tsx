import { notifications } from '@/lib/admin-data';

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Notifications</p>
        <h2 className="mt-2 text-3xl font-black text-brand-navy">Messaging center</h2>
      </div>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div key={`${item.channel}-${item.title}`} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-brand-navy">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.channel} • {item.sentAt}</p>
              </div>
              <span className="rounded-full bg-brand-cyan/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-cyan">{item.type}</span>
            </div>
            <p className="mt-4 text-slate-600">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
