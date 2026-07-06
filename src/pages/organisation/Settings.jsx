// src/pages/organisation/Settings.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Save, Package, Clock, CheckCircle, Loader2
} from 'lucide-react';

const STORAGE_KEY = 'pata_org_settings';

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { maxItems: 100, maxPending: 50, maxApproved: 50 };
  } catch {
    return { maxItems: 100, maxPending: 50, maxApproved: 50 };
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(loadSettings);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1) return;
    setSettings(prev => ({ ...prev, [field]: num }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate a tiny delay so spinner is visible
    setTimeout(() => {
      saveSettings(settings);
      setSaving(false);
      setSaved(true);
      // Auto‑dismiss after 4 seconds
      setTimeout(() => setSaved(false), 4000);
    }, 300);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto relative">
      {/* Success toast – absolutely positioned so it overlays everything */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white border border-green-200 text-green-700 px-5 py-4 rounded-2xl shadow-xl shadow-green-100/50 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle size={20} className="text-green-500" />
          <div>
            <p className="font-bold text-sm">Settings saved successfully!</p>
            <p className="text-xs text-green-600 mt-0.5">Your targets have been updated.</p>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate('/org/dashboard')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#0f172a]">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your organisation's thresholds for progress tracking</p>
      </div>

      {/* Inline success banner – as a second visual cue */}
      {saved && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">
          <CheckCircle size={16} className="shrink-0" />
          Settings saved successfully.
        </div>
      )}

      <div className="space-y-6">
        {/* Max Published Items */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Package size={18} className="text-[#1a56db]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">Maximum Published Items</h3>
              <p className="text-xs text-gray-400">Target number of published items</p>
            </div>
          </div>
          <input
            type="number"
            min="1"
            value={settings.maxItems}
            onChange={e => handleChange('maxItems', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm font-semibold text-[#0f172a]"
          />
        </div>

        {/* Max Pending Claims */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock size={18} className="text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">Maximum Pending Claims</h3>
              <p className="text-xs text-gray-400">Target cap for pending claims</p>
            </div>
          </div>
          <input
            type="number"
            min="1"
            value={settings.maxPending}
            onChange={e => handleChange('maxPending', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm font-semibold text-[#0f172a]"
          />
        </div>

        {/* Max Approved Claims */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={18} className="text-[#10b981]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">Maximum Approved Claims</h3>
              <p className="text-xs text-gray-400">Target cap for approved claims</p>
            </div>
          </div>
          <input
            type="number"
            min="1"
            value={settings.maxApproved}
            onChange={e => handleChange('maxApproved', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm font-semibold text-[#0f172a]"
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                     bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
                     hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
        >
          {saving ? (
            <><Loader2 size={16} className="animate-spin" /> Saving…</>
          ) : (
            <><Save size={16} /> Save Settings</>
          )}
        </button>
      </div>
    </div>
  );
}