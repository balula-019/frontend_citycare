import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import TrustStats from '../components/sections/TrustStats';
import HowItWorks from '../components/sections/HowItWorks';
import Categories from '../components/sections/Categories';
import WhyChoose from '../components/sections/WhyChoose';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import FloatingReportButton from '../components/shared/FloatingReportButton';
import { createLostReport } from '../api/items';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import {
  Search, Megaphone, ArrowRight, LogOut, Loader2,
  X, AlertCircle, CheckCircle, Brain, Upload, Trash2,
  LayoutDashboard, List, MapPin, Building2, Calendar, Tag
} from 'lucide-react';

/* ──────────────────────────────────────────────
   Constants & Animations (for the modal)
────────────────────────────────────────────── */
const CATEGORIES = [
  'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
  'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
  'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
  'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS',
  'CALCULATOR','OTHERS'   // ← added CALCULATOR
];
const REGIONS = [
  'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
  'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
  'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
  'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI','PEMBA'
];
const STEP_TITLES = ['Basic Information', 'Location Details', 'Images'];

const animStyles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }
  .ai-spinner-outer { animation: spin-slow 1.4s linear infinite; }
  .ai-spinner-inner { animation: spin-slow 1s linear infinite reverse; }
  .fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
  .dot-bounce { animation: dotBounce 1.2s ease-in-out infinite; }
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
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-800 transition-all"
      >
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ReportItemModal (inline definition)
────────────────────────────────────────────── */
function ReportItemModal({ onClose, onSuccess }) {
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
  const [reportId, setReportId] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

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
      if (!form.itemName.trim()) { setError('Item name is required'); return false; }
      if (!form.category) { setError('Please select a category'); return false; }
      if (!form.description.trim()) { setError('Description is required'); return false; }
    }
    if (step === 1) {
      if (!form.region) { setError('Region is required'); return false; }
      if (!form.area.trim()) { setError('Area is required'); return false; }
      if (!form.lostDate) { setError('Lost date is required'); return false; }
      if (!form.lostLocation.trim()) { setError('Lost location is required'); return false; }
    }
    return true;
  };

  const nextStep = () => { if (validateStep()) setStep(prev => Math.min(prev + 1, 2)); };
  const prevStep = () => { setError(''); setStep(prev => Math.max(prev - 1, 0)); };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        itemName: form.itemName,
        description: form.description,
        category: form.category,
        lostDate: form.lostDate,
        region: form.region,
        area: form.area,
        lostLocation: form.lostLocation,
        ...(form.dominantColor && { dominantColor: form.dominantColor }),
        ...(form.latitude && { latitude: parseFloat(form.latitude) }),
        ...(form.longitude && { longitude: parseFloat(form.longitude) }),
        ...(form.imageUrls.length > 0 && { imageUrls: form.imageUrls }),
      };

      const response = await createLostReport(payload);
      const data = response?.data || response;
      setReportId(data.id || null);
      setMatchResult(data);

      setSubmitting(false);
      setStep(3);                                          // AI processing animation
      setTimeout(() => setStep(4), 1200);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setSubmitting(false);
    }
  };

  const isFormStep = step <= 2;
  const canClose = step !== 3;

  const categoryOptions = CATEGORIES.map(c => ({
    value: c,
    label: c.replace(/_/g, ' ').charAt(0) + c.replace(/_/g, ' ').slice(1).toLowerCase()
  }));
  const regionOptions = REGIONS.map(r => ({ value: r, label: r.replace(/_/g, ' ') }));

  const hasMatch = matchResult?.matched === true;
  const matchDetails = matchResult?.matchDetails || {};
  const matchLevel = matchResult?.matchLevel || matchDetails?.matchLevel;

  const getMatchBadge = (level) => {
    if (level === 'POTENTIAL_MATCH') return { bg: '#dbeafe', text: '#1e40af', label: 'Potential Match' };
    if (level === 'NO_MATCH') return { bg: '#fee2e2', text: '#991b1b', label: 'No Match' };
    return null;
  };
  const matchBadge = matchLevel ? getMatchBadge(matchLevel) : null;

  return (
    <>
      <style>{animStyles}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative flex flex-col" style={{ maxHeight: '92vh' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {step === 3 ? 'Analyzing Your Report' : step === 4 ? 'Report Result' : 'Report Lost Item'}
              </h2>
              {isFormStep && (
                <p className="text-sm text-gray-500 mt-0.5">Step {step + 1} of 3 — {STEP_TITLES[step]}</p>
              )}
            </div>
            <button onClick={canClose ? onClose : undefined} disabled={!canClose}
              className={`rounded-full p-1.5 transition-colors ${canClose ? 'text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer' : 'text-gray-200 cursor-not-allowed'}`}
              aria-label="Close">
              <X size={22} />
            </button>
          </div>

          {/* Progress Bar */}
          {isFormStep && (
            <div className="px-8 pt-4 shrink-0">
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
                    style={{ backgroundColor: i <= step ? '#1a56db' : '#e2e8f0' }} />
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {STEP_TITLES.map((title, i) => (
                  <span key={i} className="text-xs transition-colors duration-300"
                    style={{ color: i <= step ? '#1a56db' : '#94a3b8' }}>{title}</span>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto flex-1 px-8 py-6">
            {error && isFormStep && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-center gap-2 text-sm">
                <AlertCircle size={16} className="shrink-0" /> {error}
              </div>
            )}

            {/* STEP 0 */}
            {step === 0 && (
              <div className="space-y-5 fade-in-up">
                <Input label="Item Name" name="itemName" placeholder="Enter the name of the lost item" value={form.itemName} onChange={handleChange} required />
                <SelectField label="Category" name="category" value={form.category} onChange={handleChange} options={categoryOptions} placeholder="Select a category" required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea name="description" rows={4} placeholder="Describe your lost item" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-800 transition-all text-sm" value={form.description} onChange={handleChange} />
                </div>
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5 fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField label="Region" name="region" value={form.region} onChange={handleChange} options={regionOptions} placeholder="Select a region" required />
                  <Input label="Area" name="area" placeholder="e.g., Kijitonyama" value={form.area} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Date Lost" type="date" name="lostDate" value={form.lostDate} onChange={handleChange} required max={new Date().toISOString().split('T')[0]} />
                  <Input label="Dominant Color" name="dominantColor" placeholder="e.g., Black, Silver" value={form.dominantColor} onChange={handleChange} />
                </div>
                <Input label="Lost Location" name="lostLocation" placeholder="e.g., Bus Stop near Posta" value={form.lostLocation} onChange={handleChange} required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GPS Coordinates <span className="text-gray-400 font-normal">(optional)</span></label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="latitude" placeholder="Latitude: -6.7924" value={form.latitude} onChange={handleChange} />
                    <Input name="longitude" placeholder="Longitude: 39.2083" value={form.longitude} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-4 fade-in-up">
                <p className="text-sm text-gray-500">Upload photos of the lost item to improve AI matching accuracy. <span className="text-gray-400">(optional)</span></p>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className="rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer"
                  style={{ borderColor: isDragOver ? '#1a56db' : '#d1d5db', backgroundColor: isDragOver ? '#eff6ff' : '#f9fafb' }}
                  onClick={() => document.getElementById('modalImageUpload').click()}
                >
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="modalImageUpload" />
                  <Upload size={32} className="mx-auto mb-3" style={{ color: isDragOver ? '#1a56db' : '#9ca3af' }} />
                  <p className="font-medium text-gray-600 text-sm">{isDragOver ? 'Drop images here' : 'Click or drag images here'}</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 5MB each</p>
                </div>
                {imagePreviews.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">{imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {imagePreviews.map((src, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                          <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                            <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5" aria-label="Remove image"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: AI Processing */}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center py-10 fade-in-up">
                <div className="relative flex items-center justify-center mb-8" style={{ width: 120, height: 120 }}>
                  <div className="absolute rounded-full" style={{ width: 120, height: 120, border: '3px solid #1a56db20', animation: 'pulse-ring 2s ease-out infinite' }} />
                  <div className="absolute rounded-full" style={{ width: 120, height: 120, border: '3px solid #1a56db20', animation: 'pulse-ring 2s ease-out 0.5s infinite' }} />
                  <svg width="90" height="90" viewBox="0 0 90 90" className="ai-spinner-outer">
                    <circle cx="45" cy="45" r="40" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <circle cx="45" cy="45" r="40" fill="none" stroke="#1a56db" strokeWidth="4" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="190" />
                  </svg>
                  <svg width="60" height="60" viewBox="0 0 60 60" className="absolute ai-spinner-inner">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="110" />
                  </svg>
                  <Brain size={22} className="absolute" style={{ color: '#1a56db' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing your report...</h3>
                <p className="text-gray-500 text-sm text-center max-w-xs">Our intelligent matching system is comparing your report with available found items.</p>
                <div className="flex gap-2 mt-6">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full dot-bounce" style={{ backgroundColor: '#1a56db', animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Result */}
            {step === 4 && (
              <div className="flex flex-col py-4 fade-in-up">
                {hasMatch ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={28} className="text-green-500" />
                      <h3 className="text-xl font-bold text-gray-900">
                        {matchLevel === 'POTENTIAL_MATCH' ? 'Potential Match Found!' : 'Match Found!'}
                      </h3>
                      {matchBadge && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: matchBadge.bg, color: matchBadge.text }}>
                          {matchBadge.label}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">A potential match for your lost item has been identified.</p>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">
                      {matchDetails.previewImage && <img src={matchDetails.previewImage} alt="Matched item" className="w-full h-48 object-cover rounded-lg mb-3" />}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2"><Tag size={16} className="text-gray-500" /><span className="text-gray-600">Item:</span><span className="font-medium text-gray-800">{matchDetails.itemName || '—'}</span></div>
                        <div className="flex items-center gap-2"><Building2 size={16} className="text-gray-500" /><span className="text-gray-600">Organization:</span><span className="font-medium text-gray-800">{matchDetails.organizationName || '—'}</span></div>
                        <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /><span className="text-gray-600">Region:</span><span className="font-medium text-gray-800">{matchDetails.region || '—'}</span></div>
                        <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /><span className="text-gray-600">Area:</span><span className="font-medium text-gray-800">{matchDetails.area || '—'}</span></div>
                        <div className="flex items-center gap-2 col-span-full"><Calendar size={16} className="text-gray-500" /><span className="text-gray-600">Found Date:</span><span className="font-medium text-gray-800">{matchDetails.foundDate || '—'}</span></div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      <button onClick={() => navigate(`/owner/claim/${reportId}`)} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>View Details</button>
                      <button onClick={() => { onSuccess?.(); onClose(); }} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-100 active:scale-95" style={{ color: '#1a56db', border: '1.5px solid #1a56db' }}><List size={18} /> My Reports</button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4"><AlertCircle size={32} /></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Item Found</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">No matching item has been found yet. Your report has been saved successfully. Future found items may still be matched automatically.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button onClick={() => { onSuccess?.(); onClose(); }} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-100 active:scale-95" style={{ color: '#1a56db', border: '1.5px solid #1a56db' }}><List size={18} /> My Reports</button>
                      <button onClick={() => navigate('/owner/dashboard')} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}><LayoutDashboard size={18} /> Dashboard</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer (form steps only) */}
          {isFormStep && (
            <div className="px-8 py-5 border-t border-gray-100 flex justify-between items-center shrink-0">
              <button onClick={prevStep} disabled={step === 0} className="px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50" style={{ borderColor: '#e2e8f0', color: '#374151' }}>← Back</button>
              {step < 2 ? (
                <button onClick={nextStep} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>Next →</button>
              ) : (
                <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed" style={{ backgroundColor: '#1a56db', minWidth: 140 }}>
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: 'spin-slow 0.8s linear infinite' }} />
                      Submitting...
                    </span>
                  ) : 'Submit Report'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   HomeCTA
────────────────────────────────────────────── */
function HomeCTA({ isOwner, onReportClick }) {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#1a56db] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-5 border border-white/20">
          Start today — it's free
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Start Your Recovery<br className="hidden sm:block" /> Journey Today
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Don't let a lost item disrupt your life. Join thousands of Tanzanians
          who trust PataChako for secure and efficient recovery.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={isOwner ? onReportClick : () => navigate('/register')}
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-[#1a56db] font-bold text-sm hover:bg-blue-50 active:scale-95 transition-all shadow-lg shadow-black/20"
          >
            <Megaphone size={18} />
            {isOwner ? 'Report lost item' : 'Get started free'}
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate(isOwner ? '/owner/search' : '/register')}
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border-2 border-white/40 text-white font-bold text-sm hover:bg-white/10 hover:border-white/70 active:scale-95 transition-all"
          >
            <Search size={17} />
            Search found items
          </button>
        </div>

        {!isOwner && (
          <p className="text-white/50 text-xs mt-6">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-white/80 underline hover:text-white transition-colors"
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   AboutSection
────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1a56db] text-xs font-bold tracking-wider uppercase mb-4 border border-blue-100">
              About us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-5 leading-tight">
              Tanzania's most trusted<br /> lost &amp; found platform
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              PataChako connects people who have lost items with verified
              organisations that have found them. Our AI-powered matching
              system compares thousands of reports in seconds.
            </p>
            <p className="text-gray-500 leading-relaxed">
              We partner with verified organisations across all 29 regions of
              Tanzania — from Dar es Salaam to Zanzibar — so no matter where
              you lost it, we can help you find it.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '50K+',  label: 'Items recovered',      bg: '#eff6ff', color: '#1a56db' },
              { value: '200+',  label: 'Partner organisations', bg: '#f0fdf4', color: '#10b981' },
              { value: '29',    label: 'Regions covered',       bg: '#fef9c3', color: '#b45309' },
              { value: '98%',   label: 'Customer satisfaction', bg: '#fce7f3', color: '#db2777' },
            ].map(({ value, label, bg, color }) => (
              <div
                key={label}
                className="rounded-2xl p-5 border border-[#e2e8f0]"
                style={{ backgroundColor: bg }}
              >
                <p className="text-3xl font-bold mb-1" style={{ color }}>
                  {value}
                </p>
                <p className="text-xs font-semibold text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   HomePage (main export)
────────────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout, loggingOut, isOwner: checkIsOwner } = useAuth();

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); }
    catch { return {}; }
  })();
  const isOwner = !!(
    user && (
      (typeof checkIsOwner === 'function' ? checkIsOwner() : false) ||
      storedUser.user_type === 'OWNER' ||
      user.role === 'OWNER' ||
      user.userType === 'OWNER'
    )
  );

  const [showModal, setShowModal] = useState(false);

  // Loading states for Hero buttons
  const [loadingReportBtn, setLoadingReportBtn] = useState(false);
  const [loadingSearchBtn, setLoadingSearchBtn] = useState(false);

  const handleHeroReport = () => {
    if (!isOwner) {
      navigate('/register?redirect=' + encodeURIComponent('/owner/report'));
      return;
    }
    setLoadingReportBtn(true);
    setTimeout(() => {
      setShowModal(true);
      setLoadingReportBtn(false);
    }, 300);
  };

  const handleHeroSearch = () => {
    if (!isOwner) {
      navigate('/register?redirect=' + encodeURIComponent('/owner/search'));
      return;
    }
    setLoadingSearchBtn(true);
    navigate('/owner/search');
    setTimeout(() => setLoadingSearchBtn(false), 500);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        <Hero
          onReportClick={handleHeroReport}
          onSearchClick={handleHeroSearch}
          isLoadingReport={loadingReportBtn}
          isLoadingSearch={loadingSearchBtn}
        />
        <TrustStats />
        <HowItWorks />
        <Categories />
        <WhyChoose />
        <Testimonials />
        <FAQ />

        <HomeCTA
          isOwner={isOwner}
          onReportClick={() => setShowModal(true)}
        />

        <AboutSection />
      </main>

      <Footer />

      {isOwner && (
        <FloatingReportButton onClick={() => setShowModal(true)} />
      )}

      {showModal && (
        <ReportItemModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </div>
  );
}