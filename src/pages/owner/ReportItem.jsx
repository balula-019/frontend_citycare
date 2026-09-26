import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertCircle, Brain, Upload, Trash2,
  LayoutDashboard, List, ArrowLeft, CheckCircle2, BellRing
} from 'lucide-react';
import { createLostReport } from '../../api/items';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

const CATEGORIES = [
  'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
  'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
  'HEADPHONES','CHARGERS_PHONE','CHARGERS_LAPTOPS','CHARGERS_VEHICLE','CHARGERS_OTHERS',
  'WATER_BOTTLES','TOYS','MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS',
  'UMBRELLAS','CALCULATOR','OTHERS',
];

const REGIONS = [
  'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
  'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
  'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
  'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI','PEMBA'
];

/* Map backend category code → key under categoriesGrid.items.* */
const CATEGORY_KEY_MAP = {
  PHONES: 'phones',
  LAPTOPS: 'laptops',
  DOCUMENTS: 'documents',
  IDS: 'ids',
  PASSPORTS: 'passports',
  BAGS: 'bags',
  WALLETS: 'wallets',
  KEYS: 'keys',
  ELECTRONICS: 'electronics',
  CLOTHES: 'clothes',
  JEWELRY: 'jewelry',
  WATCHES: 'watches',
  MONEY: 'money',
  BOOKS: 'books',
  VEHICLE_ITEMS: 'vehicleItems',
  HEADPHONES: 'headphones',
  CHARGERS_PHONE: 'chargerOfPhone',
  CHARGERS_LAPTOPS: 'chargerOfLaptop',
  CHARGERS_VEHICLE: 'chargerOfVehicle',
  CHARGERS_OTHERS: 'otherChargers',
  WATER_BOTTLES: 'waterBottles',
  TOYS: 'toys',
  MEDICAL_ITEMS: 'medicalItems',
  SPORTS_ITEMS: 'sportsItems',
  PET_ITEMS: 'petItems',
  FOOD_CONTAINERS: 'foodContainers',
  UMBRELLAS: 'umbrellas',
  CALCULATOR: 'calculator',
  OTHERS: 'otherItems',
};

const animStyles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.85); opacity: 0.8; }
    50% { transform: scale(1.15); opacity: 0.3; }
    100% { transform: scale(0.85); opacity: 0.8; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .ai-spinner-outer { animation: spin-slow 2s linear infinite; }
  .ai-spinner-inner { animation: spin-reverse 1.5s linear infinite; }
  .pulse-ring-anim { animation: pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  .fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
`;

function SelectField({ label, name, value, onChange, options, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-800 transition-all text-sm"
      >
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function ReportItem() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    itemName: '', description: '', category: '', lostDate: '', region: '',
    area: '', lostLocation: '', dominantColor: '', latitude: '', longitude: '',
    imageUrls: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const stepTitles = [
    t('reportItem.steps.basic'),
    t('reportItem.steps.location'),
    t('reportItem.steps.images'),
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addImageFiles = useCallback((files) => {
    const imageOnly = files.filter(f => f.type.startsWith('image/'));
    if (!imageOnly.length) return;
    setImageFiles(prev => [...prev, ...imageOnly]);
    const newPreviews = imageOnly.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setForm(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...newPreviews] }));
  }, []);

  const handleImageUpload = (e) => {
    addImageFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    addImageFiles(Array.from(e.dataTransfer.files));
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setForm(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const validateStep = () => {
    setError('');
    if (step === 0) {
      if (!form.itemName.trim()) { setError(t('reportItem.errors.itemName')); return false; }
      if (!form.category) { setError(t('reportItem.errors.category')); return false; }
      if (!form.description.trim()) { setError(t('reportItem.errors.description')); return false; }
    }
    if (step === 1) {
      if (!form.region) { setError(t('reportItem.errors.region')); return false; }
      if (!form.area.trim()) { setError(t('reportItem.errors.area')); return false; }
      if (!form.lostDate) { setError(t('reportItem.errors.lostDate')); return false; }
      if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
        setError(t('reportItem.errors.pickLocation'));
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setError('');
    setStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setError('');
    setStep(3);

    try {
      const payload = {
        itemName: form.itemName,
        description: form.description,
        category: form.category,
        lostDate: form.lostDate,
        region: form.region,
        area: form.area,
        lostLocation: form.lostLocation,
        dominantColor: form.dominantColor || null,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
        imageUrls: form.imageUrls.length > 0 ? form.imageUrls : undefined,
      };

      await createLostReport(payload);
      setStep(4);
    } catch (err) {
      setError(err.message || t('reportItem.errors.submitFailed'));
      setStep(2);
    } finally {
      setSubmitting(false);
    }
  };

  const isFormStep = step <= 2;
  const goBack = () => navigate('/owner/search');

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

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <style>{animStyles}</style>

      {isFormStep && (
        <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">
                {t('reportItem.title')}
              </h2>
              <span className="text-sm text-gray-500">
                {t('reportItem.stepOf', { current: step + 1, total: 3 })} — {stepTitles[step]}
              </span>
            </div>
            <button onClick={goBack} className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} />
              <span className="hidden sm:inline text-sm font-medium">
                {t('common.back')}
              </span>
            </button>
          </div>
          <div className="max-w-3xl mx-auto px-4 pb-3">
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
                  style={{ backgroundColor: i <= step ? '#1a56db' : '#e2e8f0' }} />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {stepTitles.map((title, i) => (
                <span key={i} className="text-xs transition-colors duration-300"
                  style={{ color: i <= step ? '#1a56db' : '#94a3b8' }}>{title}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {error && isFormStep && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
            <AlertCircle size={16} className="shrink-0" /> {error}
          </div>
        )}

        {step === 0 && (
          <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <Input
              label={t('reportItem.fields.itemName')}
              name="itemName"
              placeholder={t('reportItem.placeholders.itemName')}
              value={form.itemName}
              onChange={handleChange}
              required
            />
            <SelectField
              label={t('reportItem.fields.category')}
              name="category"
              value={form.category}
              onChange={handleChange}
              options={categoryOptions}
              placeholder={t('reportItem.placeholders.category')}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reportItem.fields.description')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={5}
                placeholder={t('reportItem.placeholders.description')}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-800 transition-all text-sm placeholder:text-gray-400 placeholder:text-xs sm:placeholder:text-sm"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <Input
              label={t('reportItem.fields.dominantColor')}
              name="dominantColor"
              placeholder={t('reportItem.placeholders.dominantColor')}
              value={form.dominantColor}
              onChange={handleChange}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                label={t('reportItem.fields.region')}
                name="region"
                value={form.region}
                onChange={handleChange}
                options={regionOptions}
                placeholder={t('reportItem.placeholders.region')}
                required
              />
              <Input
                label={t('reportItem.fields.area')}
                name="area"
                placeholder={t('reportItem.placeholders.area')}
                value={form.area}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t('reportItem.fields.dateLost')}
                type="date"
                name="lostDate"
                value={form.lostDate}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reportItem.fields.lostLocation')} <span className="text-red-500">*</span>
              </label>
              <LocationPicker
                locationName={form.lostLocation}
                onChange={({ locationName, lat, lng }) => {
                  setForm(prev => ({
                    ...prev,
                    lostLocation: locationName,
                    latitude: lat.toString(),
                    longitude: lng.toString()
                  }));
                }}
                initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
                initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
                placeholder={t('reportItem.placeholders.lostLocation')}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              {t('reportItem.upload.hint')}{' '}
              <span className="text-gray-400">{t('reportItem.upload.optional')}</span>
            </p>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className="rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer"
              style={{ borderColor: isDragOver ? '#1a56db' : '#d1d5db', backgroundColor: isDragOver ? '#eff6ff' : '#f9fafb' }}
              onClick={() => document.getElementById('reportImageUpload').click()}
            >
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="reportImageUpload" />
              <Upload size={32} className="mx-auto mb-3" style={{ color: isDragOver ? '#1a56db' : '#9ca3af' }} />
              <p className="font-medium text-gray-600 text-sm">
                {isDragOver ? t('reportItem.upload.dropHere') : t('reportItem.upload.clickOrDrag')}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {t('reportItem.upload.formats')}
              </p>
            </div>
            {imagePreviews.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  {t('reportItem.upload.imagesSelected', { count: imagePreviews.length })}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                      <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5"
                          aria-label={t('reportItem.upload.removeImage')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 fade-in-up">
            <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#1a56db]/20 pulse-ring-anim" />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#1a56db]/40 ai-spinner-outer" />
              <div className="relative z-10 w-20 h-20 rounded-full bg-blue-50/80 backdrop-blur border border-blue-100 flex items-center justify-center shadow-inner">
                <Brain size={36} className="text-[#1a56db] animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('reportItem.saving.title')}
            </h2>
            <p className="text-sm text-gray-500">
              {t('reportItem.saving.subtitle')}
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="fade-in-up py-8 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t('reportItem.success.title')}
            </h3>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {t('reportItem.success.text1')}{' '}
              <strong className="text-gray-800">
                {t('reportItem.success.emailWord')}
              </strong>{' '}
              {t('reportItem.success.text2')}
            </p>

            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-left mb-8 flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-xl text-[#1a56db] shrink-0 mt-0.5">
                <BellRing size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1a56db] uppercase tracking-wider mb-0.5">
                  {t('reportItem.success.automatedTitle')}
                </p>
                <p className="text-xs text-blue-900 leading-snug">
                  {t('reportItem.success.automatedText1')}{' '}
                  <strong className="text-gray-800">
                    {t('reportItem.success.myReportWord')}
                  </strong>{' '}
                  {t('reportItem.success.automatedText2')}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={() => navigate('/owner/dashboard')}>
                <LayoutDashboard size={18} className="mr-2" /> {t('reportItem.success.goToDashboard')}
              </Button>
              <Button variant="outline" onClick={() => navigate('/owner/reports')}>
                <List size={18} className="mr-2" /> {t('reportItem.success.viewMyReports')}
              </Button>
            </div>
          </div>
        )}
      </div>

      {isFormStep && (
        <div className="bg-white border-t border-[#e2e8f0] sticky bottom-0 z-20 py-4">
          <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className="px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              style={{ borderColor: '#e2e8f0', color: '#374151' }}
            >
              ← {t('common.back')}
            </button>
            {step < 2 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#1a56db' }}
              >
                {t('common.next')} →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1a56db', minWidth: 140 }}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                      style={{ animation: 'spin-slow 0.8s linear infinite' }}
                    />
                    {t('reportItem.submitting')}
                  </span>
                ) : t('reportItem.submitReport')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}