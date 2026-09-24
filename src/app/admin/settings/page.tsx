'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

const defaultSettings = {
  currency: 'Rwandan Franc (RWF)',
  paymentProvider: 'Demo gateway',
  ocppSecurity: 'Secured key placeholder',
  autoApprove: true,
  remoteLockout: true,
  maintenanceNotifications: false
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings((current) => ({ ...current, [key]: !current[key] }));
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">System</p>
          <h2 className="mt-2 text-3xl font-black text-brand-navy">Settings</h2>
        </div>
        <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-brand-navy">
          <Save className="h-4 w-4" /> Save settings
        </button>
      </div>

      {saved && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Settings saved successfully in demo mode.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Network configuration</h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-600">Currency</label>
              <input value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" />
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-600">Payment provider</label>
              <input value={settings.paymentProvider} onChange={(e) => setSettings({ ...settings, paymentProvider: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" />
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-600">OCPP security</label>
              <input value={settings.ocppSecurity} onChange={(e) => setSettings({ ...settings, ocppSecurity: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-bold text-brand-navy">Operational preferences</h3>
          <div className="mt-5 space-y-4">
            <button type="button" onClick={() => toggle('autoApprove')} className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-4 text-left">
              <span className="text-sm text-slate-600">Auto-approve payment authorizations</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${settings.autoApprove ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>{settings.autoApprove ? 'ON' : 'OFF'}</span>
            </button>
            <button type="button" onClick={() => toggle('remoteLockout')} className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-4 text-left">
              <span className="text-sm text-slate-600">Remote station lockout</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${settings.remoteLockout ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>{settings.remoteLockout ? 'ON' : 'OFF'}</span>
            </button>
            <button type="button" onClick={() => toggle('maintenanceNotifications')} className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-4 text-left">
              <span className="text-sm text-slate-600">Maintenance notifications</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${settings.maintenanceNotifications ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{settings.maintenanceNotifications ? 'ON' : 'DELAYED'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
