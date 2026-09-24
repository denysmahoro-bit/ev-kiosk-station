'use client';

import { useMemo, useState } from 'react';
import { PencilLine, Plus, Save, Search, Trash2 } from 'lucide-react';
import { stations as initialStations } from '@/lib/admin-data';

const emptyDraft = {
  id: '',
  name: '',
  district: '',
  status: 'ACTIVE',
  chargers: 0,
  revenue: 'RWF 0'
};

export default function AdminStationsPage() {
  const [stationList, setStationList] = useState(initialStations);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredStations = useMemo(() => {
    return stationList.filter((station) => {
      const haystack = `${station.name} ${station.district} ${station.id}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query, stationList]);

  const openNewStation = () => {
    setEditingId(null);
    setDraft(emptyDraft);
  };

  const openEditStation = (station: (typeof initialStations)[number]) => {
    setEditingId(station.id);
    setDraft({
      id: station.id,
      name: station.name,
      district: station.district,
      status: station.status,
      chargers: station.chargers,
      revenue: station.revenue
    });
  };

  const saveStation = () => {
    if (!draft.name.trim() || !draft.district.trim()) {
      return;
    }

    if (editingId) {
      setStationList((current) =>
        current.map((station) =>
          station.id === editingId
            ? { ...station, name: draft.name, district: draft.district, status: draft.status, chargers: draft.chargers, revenue: draft.revenue }
            : station
        )
      );
    } else {
      const generatedId = `ST-${String(stationList.length + 1).padStart(3, '0')}`;
      setStationList((current) => [
        { id: generatedId, name: draft.name, district: draft.district, status: draft.status, chargers: draft.chargers, revenue: draft.revenue, activeSessions: 0 },
        ...current
      ]);
    }

    setDraft(emptyDraft);
    setEditingId(null);
  };

  const toggleStationStatus = (id: string) => {
    setStationList((current) =>
      current.map((station) =>
        station.id === id
          ? { ...station, status: station.status === 'ACTIVE' ? 'UNDER_MAINTENANCE' : 'ACTIVE' }
          : station
      )
    );
  };

  const removeStation = (id: string) => {
    setStationList((current) => current.filter((station) => station.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Network</p>
          <h2 className="mt-2 text-3xl font-black text-brand-navy">Stations</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
            <Search className="h-4 w-4" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="bg-transparent outline-none" placeholder="Search station" />
          </div>
          <button onClick={openNewStation} className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-navy">
            <Plus className="h-4 w-4" />
            Add station
          </button>
        </div>
      </div>

      {(draft.name || draft.district || editingId !== null) && (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-brand-navy">{editingId ? 'Edit station' : 'Create station'}</h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">DEMO EDIT MODE</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Station name" />
            <input value={draft.district} onChange={(e) => setDraft({ ...draft, district: e.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="District" />
            <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as typeof draft.status })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
              <option value="ACTIVE">ACTIVE</option>
              <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
            </select>
            <input type="number" value={draft.chargers} onChange={(e) => setDraft({ ...draft, chargers: Number(e.target.value || 0) })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Chargers" />
            <input value={draft.revenue} onChange={(e) => setDraft({ ...draft, revenue: e.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Revenue" />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => { setDraft(emptyDraft); setEditingId(null); }} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-navy">Cancel</button>
            <button onClick={saveStation} className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-4 py-2 text-sm font-semibold text-brand-navy">
              <Save className="h-4 w-4" /> Save station
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Station</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Chargers</th>
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStations.map((station) => (
              <tr key={station.id} className="border-t border-slate-200">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold text-brand-navy">{station.name}</p>
                    <p className="text-xs text-slate-500">{station.id}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{station.district}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${station.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{station.status}</span></td>
                <td className="px-4 py-3 text-slate-600">{station.chargers}</td>
                <td className="px-4 py-3 font-semibold text-brand-navy">{station.revenue}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditStation(station)} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2 py-1.5 text-xs font-semibold text-brand-navy"><PencilLine className="h-3.5 w-3.5" /> Edit</button>
                    <button onClick={() => toggleStationStatus(station.id)} className="rounded-xl border border-slate-200 px-2 py-1.5 text-xs font-semibold text-brand-navy">{station.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}</button>
                    <button onClick={() => removeStation(station.id)} className="inline-flex items-center gap-1 rounded-xl border border-red-200 px-2 py-1.5 text-xs font-semibold text-red-600"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
