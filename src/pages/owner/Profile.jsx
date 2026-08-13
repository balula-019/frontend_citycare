import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, User, Mail, Phone, MapPin, Save, CheckCircle2,
  AlertCircle, Loader2
} from 'lucide-react';
import { updateProfile } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
        {Icon && <Icon size={13} className="text-gray-400" />}
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

const cls = `w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
             focus:ring-2 focus:ring-[#1a56db] focus:border-transparent
             outline-none bg-white text-[#0f172a] text-sm transition-all
             disabled:bg-[#f8fafc] disabled:text-gray-400 disabled:cursor-not-allowed`;

export default function Profile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    location_name: '',
    location_lat: '',
    location_long: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || '',
      email: user.email || '',
      mobile: user.mobile || '',
      location_name: user.location_name || '',
      location_lat: user.location_lat != null ? String(user.location_lat) : '',
      location_long: user.location_long != null ? String(user.location_long) : '',
    });
  }, [user]);

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: '' }));
    setSuccess(false);
  };

  // Update location fields from LocationPicker
  const handleLocationChange = ({ locationName, lat, lng }) => {
    setForm(prev => ({
      ...prev,
      location_name: locationName || '',
      location_lat: lat != null ? String(lat) : '',
      location_long: lng != null ? String(lng) : '',
    }));
    // Clear any location errors
    setFieldErrors(prev => {
      const next = { ...prev };
      delete next.location_lat;
      delete next.location_long;
      return next;
    });
    setSuccess(false);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address';
    if (form.location_lat && isNaN(parseFloat(form.location_lat)))
      errs.location_lat = 'Must be a valid number';
    if (form.location_long && isNaN(parseFloat(form.location_long)))
      errs.location_long = 'Must be a valid number';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setApiError('');
    setSuccess(false);
    try {
      const payload = {
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        location_name: form.location_name.trim(),
        ...(form.location_lat && { location_lat: parseFloat(form.location_lat) }),
        ...(form.location_long && { location_long: parseFloat(form.location_long) }),
      };
      await updateProfile(user.id, payload);

      // Update stored user
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, ...payload }));
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const initials = form.name
    ? form.name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/owner/search"
          className="p-2 rounded-xl border border-[#e2e8f0] text-gray-500
                     hover:bg-gray-50 hover:text-gray-800 transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">My Profile</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your account details</p>
        </div>
      </div>

      {/* Avatar card */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#1a56db] text-xl font-bold shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-[#0f172a] text-base">{form.name || '—'}</p>
          <p className="text-sm text-gray-500">{form.email || '—'}</p>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#1a56db]">
            Owner
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account information</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full name" icon={User} error={fieldErrors.name}>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Your full name"
              className={cls}
            />
          </Field>
          <Field label="Email address" icon={Mail} error={fieldErrors.email}>
            <input
              value={form.email}
              onChange={e => set('email', e.target.value)}
              type="email"
              placeholder="you@example.com"
              className={cls}
            />
          </Field>
          <Field label="Mobile number" icon={Phone}>
            <input
              value={form.mobile}
              onChange={e => set('mobile', e.target.value)}
              type="tel"
              placeholder="+255 7XX XXX XXX"
              className={cls}
            />
          </Field>
        </div>

        {/* Location section with OpenStreetMap picker */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-1">
            Your Location <span className="font-normal normal-case">(optional)</span>
          </p>
          <div className="mt-2 rounded-xl overflow-hidden border border-[#e2e8f0]">
            <LocationPicker
              locationName={form.location_name}
              onChange={handleLocationChange}
              initialLat={form.location_lat ? parseFloat(form.location_lat) : undefined}
              initialLng={form.location_long ? parseFloat(form.location_long) : undefined}
              placeholder="Search your area…"
              disabled={saving}
            />
          </div>
          {(fieldErrors.location_lat || fieldErrors.location_long) && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={11} />
              {fieldErrors.location_lat || fieldErrors.location_long}
            </p>
          )}
          <p className="text-[11px] text-gray-400 mt-1">
            Drag the map or search to set your coordinates.
          </p>
        </div>

        {apiError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            <AlertCircle size={15} className="shrink-0" /> {apiError}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            <CheckCircle2 size={15} className="shrink-0" /> Profile updated successfully!
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1a56db] text-white
                       text-sm font-semibold hover:bg-[#1547c0] active:scale-95 transition-all
                       disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <><Loader2 size={15} className="animate-spin" /> Saving...</>
            ) : (
              <><Save size={15} /> Save changes</>
            )}
          </button>
        </div>
      </div>

      {/* Style override for compact map height */}
      <style>{`
        .leaflet-container {
          height: 180px !important;
          min-height: 180px !important;
          max-height: 180px !important;
        }
      `}</style>
    </div>
  );
}