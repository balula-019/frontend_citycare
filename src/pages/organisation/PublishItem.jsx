// src/pages/organisation/PublishItem.jsx
import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, X, CheckCircle, Loader2, MapPin,
  Package, AlertCircle, Sparkles, Image, ChevronRight,
  Camera, FolderOpen
} from 'lucide-react';
import { publishOrganizationItem } from '../../api/items';
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
  'UNGUJA_MJINI_MAGHARIBI','PEMBA',
];

// Friendlier display names — any category not listed here falls back to the
// default "Title Case" formatting (e.g. CHARGERS_PHONE → "Chargers Phone").
const CATEGORY_DISPLAY = {
  CHARGERS_PHONE:   'Charger of Phone',
  CHARGERS_LAPTOPS: 'Charger of Laptop',
  CHARGERS_VEHICLE: 'Charger of Vehicle',
  CHARGERS_OTHERS:  'Other Chargers',
};

const categoryLabel = (code) =>
  CATEGORY_DISPLAY[code] ||
  code.replace(/_/g, ' ').charAt(0) + code.replace(/_/g, ' ').slice(1).toLowerCase();

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_FILE_EXTENSIONS = 'image/jpeg,image/png,image/webp';

const ANIM = `
  @keyframes successPop {
    0%   { transform: scale(0.5); opacity: 0; }
    70%  { transform: scale(1.1); }
    100% { transform: scale(1);   opacity: 1; }
  }
  .success-pop { animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
`;

const STEPS = [
  { label: 'Publishing…',  sub: 'Sending to server',       color: '#1a56db' },
  { label: 'Saving…',      sub: 'Storing to database',     color: '#6366f1' },
  { label: 'AI Matching…', sub: 'Finding potential owners',color: '#22c55e' },
];

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
        {label}{required && <span className="text-[#ef4444] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[#ef4444] mt-1 flex items-center gap-1 font-medium">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

const getInputCls = (hasError) => `
  w-full px-4 py-2.5 rounded-xl border transition-all text-sm outline-none bg-white text-[#0f172a]
  placeholder:text-gray-400
  ${hasError 
    ? 'border-[#ef4444] ring-1 ring-[#ef4444] bg-red-50/20' 
    : 'border-[#e2e8f0] focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]'}
`;

// Reusable photo upload/capture section
function PhotoSection({ title, description, images, onAdd, onRemove, required, error }) {
  const cameraRef = useRef(null);
  const uploadRef = useRef(null);

  const handleFiles = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onAdd(e.target.files);
      e.target.value = '';
    }
  };

  const handleCameraClick = () => cameraRef.current?.click();
  const handleUploadClick = () => uploadRef.current?.click();

  return (
    <div className={`bg-white rounded-2xl border p-5 transition-all ${
      error ? 'border-[#ef4444] ring-1 ring-[#ef4444]' : 'border-[#e2e8f0]'
    }`}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider">
          {title}{required && <span className="text-[#ef4444] ml-0.5">*</span>}
        </h3>
      </div>
      
      {description && <p className="text-xs text-gray-400 mb-4">{description}</p>}

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={handleCameraClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e2e8f0]
                     text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
        >
          <Camera size={16} /> Take Photo
        </button>
        <button
          type="button"
          onClick={handleUploadClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e2e8f0]
                     text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
        >
          <FolderOpen size={16} /> Upload Photo
        </button>

        <input
          ref={cameraRef}
          type="file"
          accept={ACCEPTED_FILE_EXTENSIONS}
          capture="environment"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
        <input
          ref={uploadRef}
          type="file"
          accept={ACCEPTED_FILE_EXTENSIONS}
          multiple
          className="hidden"
          onChange={handleFiles}
        />
      </div>

      <p className="text-[11px] text-gray-400 mb-3">
        Supported formats: <strong className="font-semibold text-gray-600">JPEG, PNG, WEBP</strong>
      </p>

      {images.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-[#e2e8f0]">
              <img src={img.preview} alt={`Upload preview ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40
                              transition-all flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity
                             w-7 h-7 rounded-full bg-red-500 text-white
                             flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
          <Image size={14} />
          No photos selected
        </div>
      )}

      {error && (
        <p className="text-xs text-[#ef4444] mt-2 flex items-center gap-1 font-medium">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

export default function PublishItem() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itemName: '', description: '', category: '', foundDate: '',
    region: '', area: '', foundLocation: '', dominantColor: '',
    mobileReporter: '', fullReporterName: '', latitude: '', longitude: '',
  });
  const [itemImages, setItemImages] = useState([]);
  const [reporterImages, setReporterImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState('idle');
  const [stepIdx, setStepIdx] = useState(0);
  const [apiError, setApiError] = useState('');

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
  };

  const addItemImages = useCallback((files) => {
    const validImgs = Array.from(files).filter(f => ALLOWED_MIME_TYPES.includes(f.type));
    
    if (validImgs.length < files.length) {
      alert('Only JPEG, PNG, and WEBP image formats are allowed.');
    }

    const entries = validImgs.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    setItemImages(p => [...p, ...entries]);
    if (errors.itemImages) setErrors(p => ({ ...p, itemImages: '' }));
  }, [errors.itemImages]);

  const removeItemImage = (i) => {
    URL.revokeObjectURL(itemImages[i].preview);
    setItemImages(p => p.filter((_, j) => j !== i));
  };

  const addReporterImages = useCallback((files) => {
    const validImgs = Array.from(files).filter(f => ALLOWED_MIME_TYPES.includes(f.type));

    if (validImgs.length < files.length) {
      alert('Only JPEG, PNG, and WEBP image formats are allowed.');
    }

    const entries = validImgs.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    reporterImages.forEach(img => URL.revokeObjectURL(img.preview));
    setReporterImages(p => [...p, ...entries]);
  }, [reporterImages]);

  const removeReporterImage = (i) => {
    URL.revokeObjectURL(reporterImages[i].preview);
    setReporterImages(p => p.filter((_, j) => j !== i));
  };

  const validate = () => {
    const e = {};
    if (!form.itemName.trim()) e.itemName = 'Item name is required';
    if (!form.category) e.category = 'Category selection is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.region) e.region = 'Region is required';
    if (!form.area.trim()) e.area = 'Area is required';
    if (!form.foundDate) e.foundDate = 'Found date is required';
    if (!form.fullReporterName.trim()) e.fullReporterName = 'Reporter name is required';
    if (!form.mobileReporter.trim()) e.mobileReporter = 'Mobile phone number is required';
    
    if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
      e.foundLocation = 'Please select a location on the map';
    }

    if (itemImages.length === 0) {
      e.itemImages = 'At least one photo of the found item is required';
    }

    setErrors(e);

    if (Object.keys(e).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setPhase('submitting'); 
    setApiError(''); 
    setStepIdx(0);

    try {
      for (let i = 0; i < STEPS.length; i++) {
        setStepIdx(i);
        await new Promise(r => setTimeout(r, 800));
      }

      const requestData = {
        itemName: form.itemName,
        description: form.description,
        category: form.category,
        foundDate: form.foundDate,
        region: form.region,
        area: form.area,
        foundLocation: form.foundLocation,
        dominantColor: form.dominantColor,
        mobileReporter: form.mobileReporter,
        fullReporterName: form.fullReporterName,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
      };

      const formData = new FormData();
      formData.append('request', JSON.stringify(requestData));

      itemImages.forEach(img => {
        formData.append('photos', img.file, img.file.name);
      });

      reporterImages.forEach(img => {
        formData.append('reporterPhotos', img.file, img.file.name);
      });

      await publishOrganizationItem(formData);
      setPhase('success');
    } catch (e) {
      setApiError(e.message || 'Failed to publish item. Please try again.');
      setPhase('error');
    }
  };

  const reset = () => {
    itemImages.forEach(img => URL.revokeObjectURL(img.preview));
    reporterImages.forEach(img => URL.revokeObjectURL(img.preview));
    setItemImages([]);
    setReporterImages([]);
    setForm({
      itemName:'', description:'', category:'', foundDate:'', region:'',
      area:'', foundLocation:'', dominantColor:'', mobileReporter:'',
      fullReporterName:'', latitude:'', longitude:'',
    });
    setErrors({});
    setPhase('idle');
  };

  /* ── Submitting overlay ── */
  if (phase === 'submitting') {
    const step = STEPS[Math.min(stepIdx, STEPS.length - 1)];
    return (
      <>
        <style>{ANIM}</style>
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6
                          bg-gradient-to-br from-[#1a56db] to-[#6366f1] shadow-xl shadow-blue-200">
            <Loader2 size={36} className="text-white animate-spin" />
          </div>
          <h3 className="text-2xl font-black text-[#0f172a] mb-2">{step.label}</h3>
          <p className="text-sm text-gray-400 mb-8">{step.sub}</p>
          
          <div className="flex items-center gap-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                 text-xs font-black transition-all duration-500
                                 ${i < stepIdx ? 'bg-[#22c55e] text-white'
                                  : i === stepIdx ? 'bg-[#1a56db] text-white scale-110'
                                  : 'bg-gray-100 text-gray-300'}`}>
                  {i < stepIdx ? <CheckCircle size={16} /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-10 h-0.5 rounded-full transition-all duration-700
                                   ${i < stepIdx ? 'bg-[#22c55e]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full"
                 style={{
                   width: `${((stepIdx + 1) / STEPS.length) * 100}%`,
                   transition: 'width 0.8s ease-out',
                 }} />
          </div>
        </div>
      </>
    );
  }

  /* ── Success screen ── */
  if (phase === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <style>{ANIM}</style>
        <div className="success-pop w-24 h-24 rounded-2xl bg-gradient-to-br
                        from-[#22c55e] to-[#16a34a] flex items-center justify-center
                        mb-6 shadow-xl shadow-green-200">
          <CheckCircle size={44} className="text-white" />
        </div>
        <h3 className="text-2xl font-black text-[#0f172a] mb-2">
          Item Published Successfully!
        </h3>
        <p className="text-sm text-gray-500 mb-2 max-w-sm">
          Your found item is now live. Our AI is matching it with lost item reports.
        </p>
        <div className="flex items-center gap-1.5 text-xs text-[#22c55e] font-bold
                        bg-green-50 px-3 py-1.5 rounded-full mb-8">
          <Sparkles size={12} /> AI matching complete
        </div>
        <div className="flex gap-3">
          <button onClick={reset}
                  className="px-5 py-2.5 rounded-xl border border-[#e2e8f0]
                             text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            Publish Another
          </button>
          <button onClick={() => navigate('/org/items')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                             bg-gradient-to-r from-[#1a56db] to-[#1547c0]
                             text-white text-sm font-bold hover:opacity-90 transition-all">
            View My Items <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <>
      <style>{ANIM}</style>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
                            flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0f172a]">Publish Found Item</h1>
              <p className="text-sm text-gray-400">
                Help reunite owners with their lost belongings
              </p>
            </div>
          </div>
        </div>

        {/* Validation Failure Warning Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200
                          text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <div>
              <p className="font-bold">Missing Required Information</p>
              <p className="text-xs text-red-600 mt-0.5">
                Please fill in all mandatory fields marked with an asterisk (*) and upload at least one item photo.
              </p>
            </div>
          </div>
        )}

        {/* Server Error Alert */}
        {apiError && phase === 'error' && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200
                          text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" /> {apiError}
            <button onClick={() => setPhase('idle')}
                    className="ml-auto font-bold underline shrink-0">Try again</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Form Column */}
          <div className="lg:col-span-2 space-y-5">

            {/* Basic Info Card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
                             flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1a56db] text-white text-[10px]
                                 font-black flex items-center justify-center">1</span>
                Basic Information
              </h2>
              <div className="space-y-4">
                <Field label="Item Name" required error={errors.itemName}>
                  <input 
                    value={form.itemName} 
                    onChange={e => set('itemName', e.target.value)}
                    placeholder="e.g., iPhone 14 Pro, Brown Leather Wallet"
                    className={getInputCls(errors.itemName)} 
                  />
                </Field>

                <Field label="Category" required error={errors.category}>
                  <select 
                    value={form.category} 
                    onChange={e => set('category', e.target.value)}
                    className={getInputCls(errors.category)}
                  >
                    <option value="">Select category…</option>
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>
                        {categoryLabel(c)}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Description" required error={errors.description}>
                  <textarea 
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    rows={4}
                    placeholder="Describe the item in detail — color, brand, unique marks…"
                    className={`${getInputCls(errors.description)} resize-none`} 
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Found Date" required error={errors.foundDate}>
                    <input 
                      type="date" 
                      value={form.foundDate}
                      max={new Date().toISOString().split('T')[0]}
                      onChange={e => set('foundDate', e.target.value)}
                      className={getInputCls(errors.foundDate)} 
                    />
                  </Field>

                  <Field label="Dominant Color">
                    <input 
                      value={form.dominantColor}
                      onChange={e => set('dominantColor', e.target.value)}
                      placeholder="e.g., Black, Silver"
                      className={getInputCls(false)} 
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Reporter Information Card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
                             flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#f59e0b] text-white text-[10px]
                                 font-black flex items-center justify-center">2</span>
                Reporter Information
              </h2>
              <div className="space-y-4">
                <Field label="Full Name" required error={errors.fullReporterName}>
                  <input 
                    value={form.fullReporterName}
                    onChange={e => set('fullReporterName', e.target.value)}
                    placeholder="e.g., John Doe"
                    className={getInputCls(errors.fullReporterName)} 
                  />
                </Field>

                <Field label="Mobile Number" required error={errors.mobileReporter}>
                  <input 
                    value={form.mobileReporter}
                    onChange={e => set('mobileReporter', e.target.value)}
                    placeholder="+255 7XX XXX XXX"
                    className={getInputCls(errors.mobileReporter)} 
                  />
                </Field>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
                             flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white text-[10px]
                                 font-black flex items-center justify-center">3</span>
                Location Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Region" required error={errors.region}>
                    <select 
                      value={form.region} 
                      onChange={e => set('region', e.target.value)}
                      className={getInputCls(errors.region)}
                    >
                      <option value="">Select region…</option>
                      {REGIONS.map(r => (
                        <option key={r} value={r}>{r.replace(/_/g,' ')}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Area" required error={errors.area}>
                    <input 
                      value={form.area} 
                      onChange={e => set('area', e.target.value)}
                      placeholder="e.g., Mikocheni"
                      className={getInputCls(errors.area)} 
                    />
                  </Field>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Found Location <span className="text-[#ef4444] ml-0.5">*</span>
                  </label>
                  <LocationPicker
                    locationName={form.foundLocation}
                    onChange={({ locationName, lat, lng }) => {
                      set('foundLocation', locationName);
                      set('latitude', lat.toString());
                      set('longitude', lng.toString());
                    }}
                    initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
                    initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
                    placeholder="Search where the item was found…"
                  />
                  {errors.foundLocation && (
                    <p className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle size={12} /> {errors.foundLocation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-5">

            <PhotoSection
              title="Item Photos"
              description="Upload photos of the found item (JPEG, PNG, WEBP)"
              images={itemImages}
              onAdd={addItemImages}
              onRemove={removeItemImage}
              required
              error={errors.itemImages}
            />

            <PhotoSection
              title="Reporter Photos"
              description="Photos of the finder (optional)"
              images={reporterImages}
              onAdd={addReporterImages}
              onRemove={removeReporterImage}
            />

            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <div className="flex items-start gap-3 p-3 bg-[#eff6ff] rounded-xl mb-4">
                <Sparkles size={16} className="text-[#1a56db] shrink-0 mt-0.5" />
                <p className="text-xs text-[#1a56db] font-medium">
                  After publishing, our AI will automatically match this item with lost item reports.
                </p>
              </div>
              <button 
                type="button"
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
                           bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-black 
                           text-sm shadow-sm hover:opacity-95 transition-all active:scale-[0.98]"
              >
                <Package size={16} /> Publish Item
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}