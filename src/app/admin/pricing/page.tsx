'use client';

import { useMemo, useState } from 'react';
import { PencilLine, Plus, Save, Search, Trash2 } from 'lucide-react';
import { pricingRules as initialPricing } from '@/lib/admin-data';

const emptyRule = {
  name: '',
  station: 'Kigali Central Hub',
  connector: 'CCS2',
  price: 'RWF 420 / kWh',
  status: 'ACTIVE'
};

export default function AdminPricingPage() {
  const [pricingList, setPricingList] = useState(initialPricing);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState(emptyRule);
  const [editingName, setEditingName] = useState<string | null>(null);

  const filteredRules = useMemo(() => {
    return pricingList.filter((rule) => {
      const haystack = `${rule.name} ${rule.station} ${rule.connector}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query, pricingList]);

  const openNewRule = () => {
    setEditingName(null);
    setDraft(emptyRule);
  };

  const openEditRule = (rule: (typeof initialPricing)[number]) => {
    setEditingName(rule.name);
    setDraft({
      name: rule.name,
      station: rule.station,
      connector: rule.connector,
      price: rule.price,
      status: rule.status
    });
  };

  const saveRule = () => {
    if (!draft.name.trim()) return;

    if (editingName) {
      setPricingList((current) =>
        current.map((rule) =>
          rule.name === editingName ? { ...rule, ...draft } : rule
        )
      );
    } else {
      setPricingList((current) => [{ ...draft }, ...current]);
    }

    setDraft(emptyRule);
    setEditingName(null);
  };

  const removeRule = (name: string) => {
    setPricingList((current) => current.filter((rule) => rule.name !== name));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Pricing</p>
          <h2 className="mt-2 text-3xl font-black text-brand-navy">Pricing management</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
            <Search className="h-4 w-4" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="bg-transparent outline-none" placeholder="Search pricing" />
          </div>
          <button onClick={openNewRule} className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-navy">
            <Plus className="h-4 w-4" /> Add rule
          </button>
        </div>
      </div>

      {(draft.name || editingName !== null) && (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-brand-navy">{editingName ? 'Edit pricing rule' : 'Create pricing rule'}</h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">DEMO EDIT MODE</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Rule name" />
            <input value={draft.station} onChange={(event) => setDraft({ ...draft, station: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Station" />
            <select value={draft.connector} onChange={(event) => setDraft({ ...draft, connector: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
              <option value="CCS2">CCS2</option>
              <option value="GB/T">GB/T</option>
              <option value="Type 2">Type 2</option>
            </select>
            <input value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="RWF 420 / kWh" />
            <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as typeof draft.status })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
              <option value="ACTIVE">ACTIVE</option>
              <option value="DRAFT">DRAFT</option>
              <option value="DISABLED">DISABLED</option>
            </select>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => { setDraft(emptyRule); setEditingName(null); }} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-navy">Cancel</button>
            <button onClick={saveRule} className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-4 py-2 text-sm font-semibold text-brand-navy"><Save className="h-4 w-4" /> Save rule</button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Rule</th>
              <th className="px-4 py-3">Station</th>
              <th className="px-4 py-3">Connector</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRules.map((rule) => (
              <tr key={rule.name} className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold text-brand-navy">{rule.name}</td>
                <td className="px-4 py-3 text-slate-600">{rule.station}</td>
                <td className="px-4 py-3 text-slate-600">{rule.connector}</td>
                <td className="px-4 py-3 font-semibold text-brand-navy">{rule.price}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${rule.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : rule.status === 'DRAFT' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>{rule.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditRule(rule)} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2 py-1.5 text-xs font-semibold text-brand-navy"><PencilLine className="h-3.5 w-3.5" /> Edit</button>
                    <button onClick={() => removeRule(rule.name)} className="inline-flex items-center gap-1 rounded-xl border border-red-200 px-2 py-1.5 text-xs font-semibold text-red-600"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
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
