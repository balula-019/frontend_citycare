import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Loader2, AlertCircle, CheckCircle2,
  Save, Upload, Trash2, Lock,
} from 'lucide-react';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';
import { updateLostReport } from '../../api/items';

const CATEGORIES = [
  'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
  'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
  'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
  'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS',
  'CALCULATOR','OTHERS'
];
const REGIONS = [
  'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
  'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
  'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
  'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI','PEMBA'
];

/* Backend category code → key under categoriesGrid.items.* */
const CATEGORY_KEY_MAP = {
  PHONES: 'phones', LAPTOPS: 'laptops', DOCUMENTS: 'documents', IDS: 'ids',
  PASSPORTS: 'passports', BAGS: 'bags', WALLETS: 'wallets', KEYS: 'keys',
  ELECTRONICS: 'electronics', CLOTHES: 'clothes', JEWELRY: 'jewelry',
  WATCHES: 'watches', MONEY: 'money', BOOKS: 'books', VEHICLE_ITEMS: 'vehicleItems',
  HEADPHONES: 'headphones', CHARGERS_PHONE: 'chargers', CHARGERS_OTHERS: 'chargers',
  WATER_BOTTLES: 'waterBottles', TOYS: 'toys', MEDICAL_ITEMS: 'medicalItems',
  SPORTS_ITEMS: 'sportsItems', PET_ITEMS: 'petItems', FOOD_CONTAINERS: 'foodContainers',
  UMBRELLAS: 'umbrellas', CALCULATOR: 'calculator', OTHERS: 'otherItems',
};

const extractError = (err, fallback) => {
  const resp = err?.response?.data;
  return (
    resp?.data?.message ||
    resp?.message ||
    err?.message ||
    fallback
  );
};

const isLockError = (msg = '') => /lock/i.test(msg);

function SelectField({ label, name, value, onChange, options, placeholder, disabled }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
                   focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
                   outline-none bg-white text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function EditReport() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { reportId } = useParams();
  const location = useLocation();

  const incoming = location.state?.report || null;

  const [form, setForm] = useState({
    itemName: '',
    description: '',
    category: '',
    lostDate: '',
    region: '',
    area: '',
    lostLocation: '',
    dominantColor: '',
    latitude: '',
    longitude: '',
    imageUrls: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Hydrate form from incoming report
  useEffect(() => {
    if (incoming) {
      setForm({
        itemName: incoming.itemName || '',
        description: incoming.description || '',
        category: incoming.category || '',
        lostDate: incoming.lostDate
          ? String(incoming.lostDate).split('T')[0]
          : '',
        region: incoming.region || '',
        area: incoming.area || '',
        lostLocation: incoming.lostLocation || incoming.searchedLocation || '',
        dominantColor: incoming.dominantColor || '',
        latitude: incoming.latitude != null ? String(incoming.latitude) : '',
        longitude: incoming.longitude != null ? String(incoming.longitude) : '',
        imageUrls: Array.isArray(incoming.imageUrls) ? incoming.imageUrls : [],
      });
      setImagePreviews(Array.isArray(incoming.imageUrls) ? incoming.imageUrls : []);
    }
  }, [incoming]);

  // Guard: no report data → bounce back. Also block editing when status isn't REPORTED.
  useEffect(() => {
    if (!incoming) {
      navigate('/owner/reports', { replace: true });
      return;
    }
    if (String(incoming.status).toUpperCase() !== 'REPORTED') {
      navigate('/owner/reports', { replace: true });
    }
  }, [incoming, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    const newPreviews = files.map(f => URL.createObjectURL(f));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setForm(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...newPreviews] }));
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setForm(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const errs = {};
    const name = form.itemName.trim();
    const desc = form.description.trim();
    const area = form.area.trim();

    if (name && (name.length < 2 || name.length > 105)) {
      errs.itemName = t('editReport.errors.itemNameLength');
    }
    if (desc && desc.length > 2000) {
      errs.description = t('editReport.errors.descriptionTooLong');
    }
    if (area && area.length > 150) {
      errs.area = t('editReport.errors.areaTooLong');
    }
    if (form.lostDate) {
      const today = new Date().toISOString().split('T')[0];
      if (form.lostDate > today) {
        errs.lostDate = t('editReport.errors.dateInFuture');
      }
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      setError(t('editReport.errors.fixHighlighted'));
      return;
    }

    setFieldErrors({});
    setError('');
    setLoading(true);

    try {
      const payload = {};
      if (form.itemName.trim())       payload.itemName = form.itemName.trim();
      if (form.description.trim())    payload.description = form.description.trim();
      if (form.category)              payload.category = form.category;
      if (form.lostDate)              payload.lostDate = form.lostDate;
      if (form.region)                payload.region = form.region;
      if (form.area.trim())           payload.area = form.area.trim();
      if (form.lostLocation.trim())   payload.lostLocation = form.lostLocation.trim();
      if (form.dominantColor.trim())  payload.dominantColor = form.dominantColor.trim();
      if (form.latitude && !isNaN(parseFloat(form.latitude)))   payload.latitude = parseFloat(form.latitude);
      if (form.longitude && !isNaN(parseFloat(form.longitude))) payload.longitude = parseFloat(form.longitude);
      if (form.imageUrls.length > 0)  payload.imageUrls = form.imageUrls;

      await updateLostReport(reportId, payload);
      setSuccess(true);
      setTimeout(() => {
        navigate('/owner/reports', { replace: true });
      }, 1500);
    } catch (err) {
      const msg = extractError(err, t('common.somethingWentWrong'));
      setError(msg);
      if (isLockError(msg)) setIsLocked(true);
    } finally {
      setLoading(false);
    }
  };

  if (!incoming) return null;

  const categoryOptions = CATEGORIES.map(c => {
    const key = CATEGORY_KEY_MAP[c];
    return {
      value: c,
      label: key ? t(`categoriesGrid.items.${key}`) : c.replace(/_/g, ' '),
    };
  });
  const regionOptions = REGIONS.map(r => ({
    value: r,
    label: t(`regions.${r}`, r.replace(/_/g, ' ')),
  }));

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          {t('editReport.success.title')}
        </h1>
        <p className="text-gray-500 max-w-md mb-8">
          {t('editReport.success.subtitle')}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/owner/reports"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
                   bg-white border border-[#e2e8f0] text-sm font-semibold text-gray-700
                   hover:bg-gray-50 hover:text-gray-900 shadow-sm
                   transition-all active:scale-95 mb-6"
      >
        <ArrowLeft size={16} /> {t('editReport.backToMyReports')}
      </Link>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1a56db] to-[#10b981]" />
        <div className="p-8">
          <h1
            className="text-2xl font-extrabold text-gray-900 mb-1"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {t('editReport.title')}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {t('editReport.subtitlePart1')}{' '}
            <strong>REPORTED</strong>
            {t('editReport.subtitlePart2')}
          </p>

          {error && (
            <div
              className={`flex items-start gap-2 px-4 py-3 rounded-xl mb-5 text-sm ${
                isLocked
                  ? 'bg-amber-50 border border-amber-200 text-amber-800'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {isLocked ? (
                <Lock size={16} className="shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
              )}
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              label={t('editReport.fields.itemName')}
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              placeholder={t('editReport.placeholders.itemName')}
              error={fieldErrors.itemName}
            />

            <SelectField
              label={t('editReport.fields.category')}
              name="category"
              value={form.category}
              onChange={handleChange}
              options={categoryOptions}
              placeholder={t('editReport.placeholders.category')}
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t('editReport.fields.description')}
              </label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder={t('editReport.placeholders.description')}
                className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm resize-none focus:ring-2 ${
                  fieldErrors.description
                    ? 'border-red-400 focus:ring-red-200'
                    : 'border-[#e2e8f0] focus:ring-[#1a56db]/20 focus:border-[#1a56db]'
                }`}
              />
              {fieldErrors.description && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                label={t('editReport.fields.region')}
                name="region"
                value={form.region}
                onChange={handleChange}
                options={regionOptions}
                placeholder={t('editReport.placeholders.region')}
              />
              <Input
                label={t('editReport.fields.area')}
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder={t('editReport.placeholders.area')}
                error={fieldErrors.area}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t('editReport.fields.dateLost')}
                type="date"
                name="lostDate"
                value={form.lostDate}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                error={fieldErrors.lostDate}
              />
              <Input
                label={t('editReport.fields.dominantColor')}
                name="dominantColor"
                value={form.dominantColor}
                onChange={handleChange}
                placeholder={t('editReport.placeholders.dominantColor')}
              />
            </div>

            {/* Lost Location via LocationPicker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t('editReport.fields.lostLocation')}
              </label>
              <LocationPicker
                locationName={form.lostLocation}
                onChange={({ locationName, lat, lng }) => {
                  setForm(prev => ({
                    ...prev,
                    lostLocation: locationName,
                    latitude: lat != null ? String(lat) : '',
                    longitude: lng != null ? String(lng) : '',
                  }));
                }}
                initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
                initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
                placeholder={t('editReport.placeholders.lostLocation')}
              />
              {(form.latitude || form.longitude) && (
                <p className="text-[11px] text-gray-400 mt-2">
                  📍 {form.lostLocation || t('editReport.pinnedLocation')} ·{' '}
                  {Number(form.latitude).toFixed(5)}, {Number(form.longitude).toFixed(5)}
                </p>
              )}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('editReport.fields.images')}{' '}
                <span className="text-gray-400 font-normal">
                  {t('editReport.imagesOptional')}
                </span>
              </label>

              <div
                className="rounded-xl border-2 border-dashed border-[#d1d5db] p-6 text-center
                           transition-colors cursor-pointer hover:border-[#1a56db] hover:bg-[#eff6ff]"
                onClick={() => document.getElementById('editImageUpload').click()}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="editImageUpload"
                />
                <Upload size={28} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium text-gray-600">
                  {t('editReport.imageUpload.clickToAdd')}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {t('editReport.imageUpload.formats')}
                </p>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                  {imagePreviews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100"
                    >
                      <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600
                                     text-white rounded-full p-1.5 transition-opacity"
                          aria-label={t('editReport.imageUpload.removeImage')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-3.5 text-base font-semibold rounded-xl"
              disabled={loading || isLocked}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" /> {t('common.saving')}
                </span>
              ) : isLocked ? (
                <span className="flex items-center justify-center gap-2">
                  <Lock size={18} /> {t('editReport.accountLocked')}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Save size={18} /> {t('editReport.saveChanges')}
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}