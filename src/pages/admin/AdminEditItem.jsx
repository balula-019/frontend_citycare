import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Package, AlignLeft, CalendarDays,
  Palette, MapPin, Phone, ShieldCheck, AlertCircle
} from 'lucide-react';
import { updatePublishedItem } from '../../api/adminApi.js';   // ← admin API
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

const CATEGORIES = [
  'PHONES','KISWASWADU','LAPTOPS','TABLETS','ELECTRONICS',
  'DOCUMENTS','IDS','PASSPORTS','CERTIFICATES','CARDS',
  'BAGS','WALLETS','PURSES','SUITCASES','KEYS','CLOTHES',
  'SHOES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
  'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES',
  'TOYS','MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS',
  'FOOD_CONTAINERS','UMBRELLAS','OTHERS'
];

const REGIONS = [
  'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
  'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
  'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
  'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI','PEMBA'
];

// Statuses that can be assigned (from the API spec)
const STATUSES = ['REPORTED', 'MATCHED', 'CLAIMED', 'CLOSED', 'FOUND'];

const selectClasses =
  "w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] focus:ring-4 focus:ring-[#1a56db]/10 focus:border-[#1a56db] outline-none bg-white text-sm font-medium text-[#0f172a] transition-all";

function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eff6ff] text-[#1a56db] shrink-0">
          {icon}
        </span>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function AdminEditItem() {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load item data from route state
  useEffect(() => {
    if (location.state?.item) {
      const item = location.state.item;
      setForm({
        itemName: item.itemName || '',
        description: item.description || '',
        category: item.category || '',
        foundDate: item.foundDate ? item.foundDate.split('T')[0] : '',
        region: item.region || '',
        area: item.area || '',
        dominantColor: item.dominantColor || '',
        foundLocation: item.foundLocation || '',
        mobileReporter: item.mobileReporter || '',
        latitude: item.latitude ?? '',
        longitude: item.longitude ?? '',
        status: item.status || 'REPORTED',
        imageUrls: item.imageUrls || [],
      });
    } else {
      setError('No item data provided. Please go back and try again.');
    }
  }, [location.state, itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLocationChange = ({ locationName, lat, lng }) => {
    setForm(prev => ({
      ...prev,
      foundLocation: locationName,
      latitude: lat,
      longitude: lng,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form) return;

    if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
      setError('Please search and select the exact found location on the map.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      const payload = {
        ...form,
        latitude: form.latitude !== '' ? parseFloat(form.latitude) : null,
        longitude: form.longitude !== '' ? parseFloat(form.longitude) : null,
        imageUrls: form.imageUrls || [],
      };
      await updatePublishedItem(itemId, payload);
      setSuccess(true);
      // Return to previous page after a short delay
      setTimeout(() => navigate(-1), 900);
    } catch (err) {
      setError(err.message || 'Failed to update item.');
    } finally {
      setSaving(false);
    }
  };

  // Loading / error states
  if (!form && !error) {
    return (
      <div className="p-8 flex justify-center">
        <Loader2 size={32} className="animate-spin text-[#1a56db]" />
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="p-8 text-center">
        <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-4">
          <AlertCircle size={16} className="shrink-0" /> {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white text-sm font-bold shadow-lg shadow-blue-100"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#1a56db] transition-colors mb-6"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
        Back
      </button>

      <div className="max-w-3xl mx-auto">
        {/* Header card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a56db] to-[#1547c0] p-6 sm:p-7 mb-6 shadow-lg shadow-blue-100">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -right-2 bottom-0 h-16 w-16 rounded-full bg-white/10" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
              <Package size={26} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-black text-white truncate">
                {form.itemName || 'Edit Published Item'}
              </h1>
              <p className="text-sm text-white/70 mt-0.5">Admin – Update any field including status</p>
            </div>
          </div>
        </div>

        {success && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl mb-6 text-sm font-medium">
            <ShieldCheck size={17} className="shrink-0" />
            Item updated successfully. Redirecting…
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 text-sm font-medium">
            <AlertCircle size={17} className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic info */}
          <SectionCard title="Item Details" icon={<Package size={15} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Item Name *"
                name="itemName"
                value={form.itemName}
                onChange={handleChange}
                required
                disabled={saving}
              />
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={selectClasses}
                  required
                  disabled={saving}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
            </div>
          </SectionCard>

          {/* Description */}
          <SectionCard title="Description" icon={<AlignLeft size={15} />}>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] focus:ring-4 focus:ring-[#1a56db]/10 focus:border-[#1a56db] outline-none text-sm resize-none transition-all"
              placeholder="Describe the item, any distinguishing marks, condition…"
              required
              disabled={saving}
            />
          </SectionCard>

          {/* Date + Color */}
          <SectionCard title="Found Details" icon={<CalendarDays size={15} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Found Date *"
                type="date"
                name="foundDate"
                value={form.foundDate}
                onChange={handleChange}
                required
                disabled={saving}
              />
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Palette size={13} className="text-[#1a56db]" /> Dominant Color
                </label>
                <Input
                  name="dominantColor"
                  value={form.dominantColor}
                  onChange={handleChange}
                  disabled={saving}
                />
              </div>
            </div>
          </SectionCard>

          {/* Region + Area */}
          <SectionCard title="Region" icon={<MapPin size={15} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Region *</label>
                <select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className={selectClasses}
                  required
                  disabled={saving}
                >
                  <option value="">Select region</option>
                  {REGIONS.map(r => (
                    <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Area *"
                name="area"
                value={form.area}
                onChange={handleChange}
                required
                disabled={saving}
              />
            </div>
          </SectionCard>

          {/* Exact found location */}
          <SectionCard title="Exact Found Location" icon={<MapPin size={15} />}>
            <LocationPicker
              locationName={form.foundLocation}
              onChange={handleLocationChange}
              initialLat={form.latitude !== '' ? parseFloat(form.latitude) : undefined}
              initialLng={form.longitude !== '' ? parseFloat(form.longitude) : undefined}
              placeholder="Search where the item was found…"
            />
            {form.foundLocation && (
              <p className="mt-2 text-xs text-slate-500">
                Selected: <span className="font-semibold text-[#0f172a]">{form.foundLocation}</span>
              </p>
            )}
          </SectionCard>

          {/* Reporter contact */}
          <SectionCard title="Reporter Contact" icon={<Phone size={15} />}>
            <Input
              label="Mobile Reporter *"
              name="mobileReporter"
              value={form.mobileReporter}
              onChange={handleChange}
              required
              disabled={saving}
            />
          </SectionCard>

          {/* Status – ENABLED for admin */}
          <SectionCard title="Status" icon={<ShieldCheck size={15} />}>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={selectClasses}
              required
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1.5">Admin can change the item’s status.</p>
          </SectionCard>

          <div className="pt-2">
            <Button
              variant="primary"
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl
                         bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
                         hover:opacity-90 active:scale-[0.99] disabled:opacity-70 transition-all
                         shadow-lg shadow-blue-100"
              disabled={saving}
            >
              {saving ? (
                <><Loader2 size={18} className="animate-spin" /> Saving…</>
              ) : (
                <><Save size={18} /> Save Changes</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}