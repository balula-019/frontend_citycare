import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
             focus:ring-2 focus:ring-[#0f766e] focus:border-transparent
             outline-none bg-white text-[#0f172a] text-sm transition-all
             disabled:bg-[#f8fafc] disabled:text-gray-400 disabled:cursor-not-allowed`;

export default function Profile() {
  const { t } = useTranslation();
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

  const handleLocationChange = ({ locationName, lat, lng }) => {
    setForm(prev => ({
      ...prev,
      location_name: locationName || '',
      location_lat: lat != null ? String(lat) : '',
      location_long: lng != null ? String(lng) : '',
    }));
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
    if (!form.name.trim()) errs.name = t('profile.errors.nameRequired');
    if (!form.email.trim()) errs.email = t('profile.errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t('profile.errors.emailInvalid');
    if (form.location_lat && isNaN(parseFloat(form.location_lat)))
      errs.location_lat = t('profile.errors.numberInvalid');
    if (form.location_long && isNaN(parseFloat(form.location_long)))
      errs.location_long = t('profile.errors.numberInvalid');
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

      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, ...payload }));
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || t('profile.errors.updateFailed'));
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
          to="/owner/reports"
          className="p-2 rounded-xl border border-[#e2e8f0] text-gray-500
                     hover:bg-gray-50 hover:text-gray-800 transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">
            {t('profile.title')}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {t('profile.subtitle')}
          </p>
        </div>
      </div>

      {/* Avatar card */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#ccfbf1] flex items-center justify-center text-[#0f766e] text-xl font-bold shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-[#0f172a] text-base">{form.name || '—'}</p>
          <p className="text-sm text-gray-500">{form.email || '—'}</p>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary-tint text-[#0f766e]">
            {t('profile.roleOwner')}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {t('profile.accountInfo')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label={t('profile.fields.fullName')} icon={User} error={fieldErrors.name}>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder={t('profile.placeholders.fullName')}
              className={cls}
            />
          </Field>
          <Field label={t('profile.fields.email')} icon={Mail} error={fieldErrors.email}>
            <input
              value={form.email}
              onChange={e => set('email', e.target.value)}
              type="email"
              placeholder={t('profile.placeholders.email')}
              className={cls}
            />
          </Field>
          <Field label={t('profile.fields.mobile')} icon={Phone}>
            <input
              value={form.mobile}
              onChange={e => set('mobile', e.target.value)}
              type="tel"
              placeholder={t('profile.placeholders.mobile')}
              className={cls}
            />
          </Field>
        </div>

        {/* Location section */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-1">
            {t('profile.location.heading')}{' '}
            <span className="font-normal normal-case">
              {t('profile.location.optional')}
            </span>
          </p>
          <div className="mt-2 rounded-xl overflow-hidden border border-[#e2e8f0]">
            <LocationPicker
              locationName={form.location_name}
              onChange={handleLocationChange}
              initialLat={form.location_lat ? parseFloat(form.location_lat) : undefined}
              initialLng={form.location_long ? parseFloat(form.location_long) : undefined}
              placeholder={t('profile.location.placeholder')}
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
            {t('profile.location.hint')}
          </p>
        </div>

        {apiError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            <AlertCircle size={15} className="shrink-0" /> {apiError}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            <CheckCircle2 size={15} className="shrink-0" /> {t('profile.success')}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f766e] text-white
                       text-sm font-semibold hover:bg-[#115e59] active:scale-95 transition-all
                       disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <><Loader2 size={15} className="animate-spin" /> {t('profile.saving')}</>
            ) : (
              <><Save size={15} /> {t('profile.saveChanges')}</>
            )}
          </button>
        </div>
      </div>

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