export function StatusBadge({ status }: { status: 'Available' | 'Charging' | 'Offline' | 'Faulted' }) {
  const palette = {
    Available: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    Charging: 'bg-cyan-100 text-cyan-700 ring-cyan-200',
    Offline: 'bg-slate-200 text-slate-700 ring-slate-300',
    Faulted: 'bg-red-100 text-red-700 ring-red-200'
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${palette[status]}`}>
      {status}
    </span>
  );
}
