import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Phone, FileText, MapPin,
  Loader2, CheckCircle2, AlertCircle, ArrowLeft
} from 'lucide-react';
import { updateOrganisationProfile } from '../../api/organisation';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

// ─── Tanzania mobile number handling ───────────────────────────
// Accepts: 0712345678 | 712345678 | 255712345678 | +255712345678
// Valid prefixes after the country code are 6 or 7 (Vodacom/Tigo/Airtel/Halotel).
// Always normalizes to the backend's format: "2557XXXXXXXX" (no plus, no leading 0).
const TZ_COUNTRY_CODE = '255';
const TZ_MOBILE_REGEX = new RegExp(`^(?:\\+?${TZ_COUNTRY_CODE}|0)?([67]\\d{8})$`);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeTzMobile(raw) {
  const cleaned = raw.replace(/[\s-]/g, '');
  const match = cleaned.match(TZ_MOBILE_REGEX);
  if (!match) return null;
  return `${TZ_COUNTRY_CODE}${match[1]}`;
}

export default function Profile() {
  const navigate = useNavigate();

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch { return {}; }
  })();

  const [form, setForm] = useState({
    mobile: storedUser.mobile || '',
    email: storedUser.email || '',
    description: storedUser.description || '',
    locationName: storedUser.locationName || storedUser.location_name || '',
    latitude: storedUser.latitude?.toString() || '',
    longitude: storedUser.longitude?.toString() || '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const validate = () => {
    if (!EMAIL_REGEX.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!form.mobile.trim()) {
      setError('Mobile number is required.');
      return false;
    }
    if (!normalizeTzMobile(form.mobile)) {
      setError('Enter a valid Tanzanian mobile number, e.g. 0712 345 678.');
      return false;
    }
    if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
      setError('Please select a location from the map.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        mobile: normalizeTzMobile(form.mobile),
        email: form.email.trim(),
        locationName: form.locationName,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
        description: form.description.trim(),
      };

      const res = await updateOrganisationProfile(payload);
      const updated = res?.data?.data || res?.data || res;

      if (updated) {
        const newUser = {
          ...storedUser,
          ...updated,
          mobile: updated.mobile,
          email: updated.email,
          location_name: updated.locationName,
        };
        localStorage.setItem('user', JSON.stringify(newUser));

        setForm(prev => ({
          ...prev,
          mobile: updated.mobile ?? prev.mobile,
          email: updated.email ?? prev.email,
          description: updated.description ?? prev.description,
          locationName: updated.locationName ?? prev.locationName,
        }));
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Update failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const setField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (error) setError('');
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto animate-pulse space-y-5">
        <div className="h-6 w-48 rounded-full bg-slate-200" />
        <div className="h-28 rounded-3xl bg-slate-100" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/org/dashboard')}
        className="group flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0f766e] mb-6 transition-colors"
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
        Back to Dashboard
      </button>

      {/* Header card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f766e] to-[#115e59] p-6 sm:p-7 mb-6 shadow-lg shadow-primary-soft">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -right-2 bottom-0 h-16 w-16 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-black text-white truncate">
              Organisation Profile
            </h1>
            <p className="text-sm text-white/70 mt-0.5">Manage your public details</p>
          </div>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl mb-6 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 size={17} className="shrink-0" />
          Profile updated successfully.
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={17} className="shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <Field label="Email" icon={<Mail size={17} />}>
          <input
            type="email"
            value={form.email}
            onChange={e => setField('email', e.target.value)}
            className="w-full bg-transparent outline-none text-sm font-semibold text-[#0f172a] placeholder:text-slate-300"
            placeholder="you@example.com"
          />
        </Field>

        {/* Mobile */}
        <Field label="Mobile Number" icon={<Phone size={17} />}>
          <input
            type="tel"
            value={form.mobile}
            onChange={e => setField('mobile', e.target.value)}
            placeholder="e.g. 0712 345 678"
            className="w-full bg-transparent outline-none text-sm font-semibold text-[#0f172a] placeholder:text-slate-300"
          />
        </Field>

        {/* Description */}
        <Field label="Description" icon={<FileText size={17} />} align="top">
          <textarea
            value={form.description}
            onChange={e => setField('description', e.target.value)}
            maxLength={500}
            rows={4}
            placeholder="Tell us about your organisation…"
            className="w-full bg-transparent outline-none text-sm text-[#0f172a] placeholder:text-slate-300 resize-none"
          />
          <p className="text-xs text-slate-300 font-medium text-right mt-1">{form.description.length}/500</p>
        </Field>

        {/* Location */}
        <Field label="Location" icon={<MapPin size={17} />} align="top">
          <LocationPicker
            locationName={form.locationName}
            onChange={({ locationName, lat, lng }) => {
              setField('locationName', locationName);
              setField('latitude', lat.toString());
              setField('longitude', lng.toString());
            }}
            initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
            initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
            placeholder="Search for your organisation's location…"
          />
        </Field>

        {/* Save */}
        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl
                     bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white font-bold text-sm
                     hover:opacity-90 active:scale-[0.99] disabled:opacity-70 transition-all
                     shadow-lg shadow-primary-soft"
        >
          {saving ? (
            <><Loader2 size={16} className="animate-spin" /> Saving…</>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
}

function Field({ label, icon, children, align = 'center' }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 transition-colors focus-within:border-[#0f766e]/40 focus-within:ring-4 focus-within:ring-[#0f766e]/5">
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className={`flex gap-2.5 ${align === 'top' ? 'items-start' : 'items-center'}`}>
        <span className={`shrink-0 text-[#0f766e] ${align === 'top' ? 'mt-0.5' : ''}`}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}