

// // // // import { useState, useCallback } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import {
// // // //   AlertCircle, CheckCircle, Brain, Upload, Trash2,
// // // //   LayoutDashboard, List, MapPin, Building2, Calendar, Tag,
// // // //   ArrowLeft
// // // // } from 'lucide-react';
// // // // import { createLostReport } from '../../api/items';
// // // // import Button from '../../components/shared/Button';
// // // // import Input from '../../components/shared/Input';

// // // // /* ---------- Constants ---------- */
// // // // const CATEGORIES = [
// // // //   'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
// // // //   'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
// // // //   'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
// // // //   'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS','OTHERS'
// // // // ];
// // // // const REGIONS = [
// // // //   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
// // // //   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
// // // //   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
// // // //   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
// // // //   'UNGUJA_MJINI_MAGHARIBI','PEMBA'
// // // // ];
// // // // const STEP_TITLES = ['Basic Information', 'Location Details', 'Images'];

// // // // /* ---------- Animations ---------- */
// // // // const animStyles = `
// // // //   @keyframes spin-slow {
// // // //     from { transform: rotate(0deg); }
// // // //     to { transform: rotate(360deg); }
// // // //   }
// // // //   @keyframes pulse-ring {
// // // //     0% { transform: scale(0.8); opacity: 1; }
// // // //     100% { transform: scale(2); opacity: 0; }
// // // //   }
// // // //   @keyframes fadeInUp {
// // // //     from { opacity: 0; transform: translateY(20px); }
// // // //     to { opacity: 1; transform: translateY(0); }
// // // //   }
// // // //   @keyframes dotBounce {
// // // //     0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
// // // //     40% { transform: scale(1); opacity: 1; }
// // // //   }
// // // //   .ai-spinner-outer { animation: spin-slow 1.4s linear infinite; }
// // // //   .ai-spinner-inner { animation: spin-slow 1s linear infinite reverse; }
// // // //   .fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
// // // //   .dot-bounce { animation: dotBounce 1.2s ease-in-out infinite; }
// // // // `;

// // // // function SelectField({ label, name, value, onChange, options, placeholder, required }) {
// // // //   return (
// // // //     <div>
// // // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //         {label}{required && <span className="text-red-500 ml-0.5">*</span>}
// // // //       </label>
// // // //       <select
// // // //         name={name}
// // // //         value={value}
// // // //         onChange={onChange}
// // // //         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-800 transition-all"
// // // //       >
// // // //         <option value="">{placeholder}</option>
// // // //         {options.map(o => (
// // // //           <option key={o.value} value={o.value}>{o.label}</option>
// // // //         ))}
// // // //       </select>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function ReportItem() {
// // // //   const navigate = useNavigate();

// // // //   const [step, setStep] = useState(0); // 0,1,2 = form steps; 3 = AI processing; 4 = result
// // // //   const [form, setForm] = useState({
// // // //     itemName: '', description: '', category: '', lostDate: '', region: '',
// // // //     area: '', lostLocation: '', dominantColor: '', latitude: '', longitude: '',
// // // //     imageUrls: [],
// // // //   });
// // // //   const [imageFiles, setImageFiles] = useState([]);
// // // //   const [imagePreviews, setImagePreviews] = useState([]);
// // // //   const [error, setError] = useState('');
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [reportId, setReportId] = useState(null);
// // // //   const [matchResult, setMatchResult] = useState(null); // real backend response
// // // //   const [isDragOver, setIsDragOver] = useState(false);

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setForm(prev => ({ ...prev, [name]: value }));
// // // //   };

// // // //   const addImageFiles = useCallback((files) => {
// // // //     const imageOnly = files.filter(f => f.type.startsWith('image/'));
// // // //     if (!imageOnly.length) return;
// // // //     setImageFiles(prev => [...prev, ...imageOnly]);
// // // //     const newPreviews = imageOnly.map(file => URL.createObjectURL(file));
// // // //     setImagePreviews(prev => [...prev, ...newPreviews]);
// // // //     setForm(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...newPreviews] }));
// // // //   }, []);

// // // //   const handleImageUpload = (e) => {
// // // //     addImageFiles(Array.from(e.target.files));
// // // //     e.target.value = '';
// // // //   };

// // // //   const handleDrop = (e) => {
// // // //     e.preventDefault();
// // // //     setIsDragOver(false);
// // // //     addImageFiles(Array.from(e.dataTransfer.files));
// // // //   };

// // // //   const removeImage = (index) => {
// // // //     URL.revokeObjectURL(imagePreviews[index]);
// // // //     setImageFiles(prev => prev.filter((_, i) => i !== index));
// // // //     setImagePreviews(prev => prev.filter((_, i) => i !== index));
// // // //     setForm(prev => ({
// // // //       ...prev,
// // // //       imageUrls: prev.imageUrls.filter((_, i) => i !== index),
// // // //     }));
// // // //   };

// // // //   const validateStep = () => {
// // // //     setError('');
// // // //     if (step === 0) {
// // // //       if (!form.itemName.trim()) { setError('Item name is required'); return false; }
// // // //       if (!form.category) { setError('Please select a category'); return false; }
// // // //       if (!form.description.trim()) { setError('Description is required'); return false; }
// // // //     }
// // // //     if (step === 1) {
// // // //       if (!form.region) { setError('Region is required'); return false; }
// // // //       if (!form.area.trim()) { setError('Area is required'); return false; }
// // // //       if (!form.lostDate) { setError('Lost date is required'); return false; }
// // // //       if (!form.lostLocation.trim()) { setError('Lost location is required'); return false; }
// // // //     }
// // // //     return true;
// // // //   };

// // // //   const nextStep = () => {
// // // //     if (validateStep()) setStep(prev => Math.min(prev + 1, 2));
// // // //   };

// // // //   const prevStep = () => {
// // // //     setError('');
// // // //     setStep(prev => Math.max(prev - 1, 0));
// // // //   };

// // // //   const handleSubmit = async () => {
// // // //     if (!validateStep()) return;
// // // //     setSubmitting(true);
// // // //     setError('');
// // // //     // Show processing screen immediately
// // // //     setStep(3);

// // // //     try {
// // // //       const payload = {
// // // //         itemName: form.itemName,
// // // //         description: form.description,
// // // //         category: form.category,
// // // //         lostDate: form.lostDate,
// // // //         region: form.region,
// // // //         area: form.area,
// // // //         lostLocation: form.lostLocation,
// // // //         ...(form.dominantColor && { dominantColor: form.dominantColor }),
// // // //         ...(form.latitude && { latitude: parseFloat(form.latitude) }),
// // // //         ...(form.longitude && { longitude: parseFloat(form.longitude) }),
// // // //         ...(form.imageUrls.length > 0 && { imageUrls: form.imageUrls }),
// // // //       };

// // // //       // Call the real backend endpoint
// // // //       const response = await createLostReport(payload);
// // // //       // Extract actual data (adjust if needed based on your backend envelope)
// // // //       const data = response?.data || response;
// // // //       console.log('Backend AI result:', data);

// // // //       setReportId(data.id || null);
// // // //       setMatchResult(data);   // store real response, no simulation

// // // //       // Immediately show the result – NO setTimeout
// // // //       setStep(4);
// // // //     } catch (err) {
// // // //       setError(err.message || 'Something went wrong.');
// // // //       setStep(0); // go back to form on error
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   const isFormStep = step <= 2;
// // // //   const goBack = () => navigate('/owner/search');

// // // //   const categoryOptions = CATEGORIES.map(c => ({
// // // //     value: c,
// // // //     label: c.replace(/_/g, ' ').charAt(0) + c.replace(/_/g, ' ').slice(1).toLowerCase()
// // // //   }));
// // // //   const regionOptions = REGIONS.map(r => ({ value: r, label: r.replace(/_/g, ' ') }));

// // // //   // Real data from backend
// // // //   const hasMatch = matchResult?.matched === true;
// // // //   const matchDetails = matchResult?.matchDetails || matchResult || {}; // fallback if structure differs
// // // //   const matchLevel = matchResult?.matchLevel || matchDetails?.matchLevel;
// // // //   const getMatchBadge = (level) => {
// // // //     if (level === 'POTENTIAL_MATCH') return { bg: '#dbeafe', text: '#1e40af', label: 'Potential Match' };
// // // //     if (level === 'NO_MATCH') return { bg: '#fee2e2', text: '#991b1b', label: 'No Match' };
// // // //     return null;
// // // //   };
// // // //   const matchBadge = matchLevel ? getMatchBadge(matchLevel) : null;

// // // //   return (
// // // //     <div className="min-h-screen bg-surface flex flex-col">
// // // //       <style>{animStyles}</style>

// // // //       {/* Header (form steps only) */}
// // // //       {isFormStep && (
// // // //         <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-20">
// // // //           <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
// // // //             <div className="flex items-center gap-4">
// // // //               <h2 className="text-xl font-bold text-gray-900">Report Lost Item</h2>
// // // //               <span className="text-sm text-gray-500">
// // // //                 Step {step + 1} of 3 — {STEP_TITLES[step]}
// // // //               </span>
// // // //             </div>
// // // //             <button
// // // //               onClick={goBack}
// // // //               className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
// // // //               title="Back to search"
// // // //             >
// // // //               <ArrowLeft size={20} />
// // // //               <span className="hidden sm:inline text-sm font-medium">Back</span>
// // // //             </button>
// // // //           </div>
// // // //           <div className="max-w-3xl mx-auto px-4 pb-3">
// // // //             <div className="flex gap-2">
// // // //               {[0,1,2].map(i => (
// // // //                 <div
// // // //                   key={i}
// // // //                   className="flex-1 h-1.5 rounded-full transition-all duration-500"
// // // //                   style={{ backgroundColor: i <= step ? '#1a56db' : '#e2e8f0' }}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //             <div className="flex justify-between mt-1.5">
// // // //               {STEP_TITLES.map((title, i) => (
// // // //                 <span
// // // //                   key={i}
// // // //                   className="text-xs transition-colors duration-300"
// // // //                   style={{ color: i <= step ? '#1a56db' : '#94a3b8' }}
// // // //                 >
// // // //                   {title}
// // // //                 </span>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Main content */}
// // // //       <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
// // // //         {error && isFormStep && (
// // // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
// // // //             <AlertCircle size={16} className="shrink-0" /> {error}
// // // //           </div>
// // // //         )}

// // // //         {/* Step 0: Basic Info */}
// // // //         {step === 0 && (
// // // //           <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// // // //             <Input label="Item Name" name="itemName" placeholder="e.g., Samsung Galaxy S22" value={form.itemName} onChange={handleChange} required />
// // // //             <SelectField label="Category" name="category" value={form.category} onChange={handleChange} options={categoryOptions} placeholder="Select a category" required />
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
// // // //               <textarea
// // // //                 name="description"
// // // //                 rows={4}
// // // //                 placeholder="Describe the lost item..."
// // // //                 className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-800 transition-all text-sm"
// // // //                 value={form.description}
// // // //                 onChange={handleChange}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Step 1: Location Details */}
// // // //         {step === 1 && (
// // // //           <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // //               <SelectField label="Region" name="region" value={form.region} onChange={handleChange} options={regionOptions} placeholder="Select a region" required />
// // // //               <Input label="Area" name="area" placeholder="e.g., Kijitonyama" value={form.area} onChange={handleChange} required />
// // // //             </div>
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // //               <Input label="Date Lost" type="date" name="lostDate" value={form.lostDate} onChange={handleChange} required max={new Date().toISOString().split('T')[0]} />
// // // //               <Input label="Dominant Color" name="dominantColor" placeholder="e.g., Black, Silver" value={form.dominantColor} onChange={handleChange} />
// // // //             </div>
// // // //             <Input label="Lost Location" name="lostLocation" placeholder="e.g., Bus Stop near Posta" value={form.lostLocation} onChange={handleChange} required />
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">GPS Coordinates <span className="text-gray-400 font-normal">(optional)</span></label>
// // // //               <div className="grid grid-cols-2 gap-4">
// // // //                 <Input name="latitude" placeholder="Latitude: -6.7924" value={form.latitude} onChange={handleChange} />
// // // //                 <Input name="longitude" placeholder="Longitude: 39.2083" value={form.longitude} onChange={handleChange} />
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Step 2: Images */}
// // // //         {step === 2 && (
// // // //           <div className="space-y-4 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// // // //             <p className="text-sm text-gray-500">Upload photos of the lost item to improve AI matching accuracy. <span className="text-gray-400">(optional)</span></p>
// // // //             <div
// // // //               onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
// // // //               onDragLeave={() => setIsDragOver(false)}
// // // //               onDrop={handleDrop}
// // // //               className="rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer"
// // // //               style={{ borderColor: isDragOver ? '#1a56db' : '#d1d5db', backgroundColor: isDragOver ? '#eff6ff' : '#f9fafb' }}
// // // //               onClick={() => document.getElementById('reportImageUpload').click()}
// // // //             >
// // // //               <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="reportImageUpload" />
// // // //               <Upload size={32} className="mx-auto mb-3" style={{ color: isDragOver ? '#1a56db' : '#9ca3af' }} />
// // // //               <p className="font-medium text-gray-600 text-sm">{isDragOver ? 'Drop images here' : 'Click or drag images here'}</p>
// // // //               <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 5MB each</p>
// // // //             </div>
// // // //             {imagePreviews.length > 0 && (
// // // //               <div>
// // // //                 <p className="text-xs font-medium text-gray-500 mb-2">{imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected</p>
// // // //                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
// // // //                   {imagePreviews.map((src, idx) => (
// // // //                     <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
// // // //                       <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
// // // //                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
// // // //                         <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5" aria-label="Remove image"><Trash2 size={14} /></button>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* AI Processing (step 3) – shown only while API call is in progress */}
// // // //         {step === 3 && (
// // // //           <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
// // // //             <div className="relative w-40 h-40 mb-10">
// // // //               <div className="absolute inset-0 rounded-full border-4 border-[#1a56db]/10 animate-pulse-ring"></div>
// // // //               <div className="absolute inset-4 rounded-full border-4 border-[#e11d48]/20 animate-spin-slow"></div>
// // // //               <div className="absolute inset-8 rounded-full border-4 border-[#1a56db]/30 animate-spin-slow-reverse"></div>
// // // //               <div className="absolute inset-0 flex items-center justify-center">
// // // //                 <Brain size={48} className="text-[#1a56db] animate-pulse" />
// // // //               </div>
// // // //             </div>

// // // //             <h2 className="text-4xl font-black text-gray-900 mb-4">
// // // //               Analyzing your report
// // // //             </h2>
// // // //             <p className="text-lg text-gray-600 max-w-md mb-8">
// // // //               Our intelligent matching system is comparing your report with available found items.
// // // //             </p>

// // // //             <div className="flex gap-2 mb-12">
// // // //               {[0,1,2].map(i => (
// // // //                 <div
// // // //                   key={i}
// // // //                   className="w-3 h-3 rounded-full bg-[#1a56db] dot-bounce"
// // // //                   style={{ animationDelay: `${i * 0.2}s` }}
// // // //                 />
// // // //               ))}
// // // //             </div>

// // // //             <p className="text-sm text-gray-400">Please wait while we process your request...</p>
// // // //           </div>
// // // //         )}

// // // //         {/* Result (step 4) – real backend data */}
// // // //         {step === 4 && (
// // // //           <div className="fade-in-up">
// // // //             {hasMatch ? (
// // // //               <div className="space-y-6">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <CheckCircle size={28} className="text-green-500" />
// // // //                   <h3 className="text-2xl font-bold text-gray-900">Potential Match Found!</h3>
// // // //                   {matchBadge && (
// // // //                     <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: matchBadge.bg, color: matchBadge.text }}>{matchBadge.label}</span>
// // // //                   )}
// // // //                 </div>
// // // //                 <p className="text-gray-600">A potential match for your lost item has been identified.</p>

// // // //                 {/* Display AI scores if provided by backend */}
// // // //                 {matchResult?.finalScore !== undefined && (
// // // //                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
// // // //                     {['finalScore', 'descriptionScore', 'imageScore', 'colorScore', 'categoryScore'].map(key => {
// // // //                       if (matchResult[key] !== undefined) {
// // // //                         const score = matchResult[key];
// // // //                         return (
// // // //                           <div key={key} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
// // // //                             <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</p>
// // // //                             <p className="text-2xl font-bold text-[#1a56db]">{score}%</p>
// // // //                             <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
// // // //                               <div className="h-full bg-[#1a56db] rounded-full" style={{ width: `${score}%` }}></div>
// // // //                             </div>
// // // //                           </div>
// // // //                         );
// // // //                       }
// // // //                       return null;
// // // //                     })}
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Match details card */}
// // // //                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">
// // // //                   {matchDetails.previewImage && <img src={matchDetails.previewImage} alt="Matched item" className="w-full h-48 object-cover rounded-lg mb-3" />}
// // // //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
// // // //                     <div className="flex items-center gap-2"><Tag size={16} className="text-gray-500" /><span className="text-gray-600">Item:</span><span className="font-medium text-gray-800">{matchDetails.itemName || '—'}</span></div>
// // // //                     <div className="flex items-center gap-2"><Building2 size={16} className="text-gray-500" /><span className="text-gray-600">Organization:</span><span className="font-medium text-gray-800">{matchDetails.organizationName || '—'}</span></div>
// // // //                     <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /><span className="text-gray-600">Region:</span><span className="font-medium text-gray-800">{matchDetails.region || '—'}</span></div>
// // // //                     <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /><span className="text-gray-600">Area:</span><span className="font-medium text-gray-800">{matchDetails.area || '—'}</span></div>
// // // //                     <div className="flex items-center gap-2 col-span-full"><Calendar size={16} className="text-gray-500" /><span className="text-gray-600">Found Date:</span><span className="font-medium text-gray-800">{matchDetails.foundDate || '—'}</span></div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Buttons */}
// // // //                 <div className="flex flex-col sm:flex-row gap-3">
// // // //                   <Button variant="primary" onClick={() => navigate(`/owner/claim/${reportId}`)} className="flex-1">View Match Details</Button>
// // // //                   <Button variant="outline" onClick={() => navigate('/owner/reports')} className="flex-1"><List size={18} /> My Reports</Button>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="text-center py-12">
// // // //                 <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4"><AlertCircle size={32} /></div>
// // // //                 <h3 className="text-2xl font-bold text-gray-900 mb-2">No Matching Item Found</h3>
// // // //                 <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find a match for your lost item at this time. Your report has been saved, and future found items may still be matched automatically.</p>
// // // //                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
// // // //                   <Button variant="primary" onClick={() => navigate('/owner/dashboard')}><LayoutDashboard size={18} /> Dashboard</Button>
// // // //                   <Button variant="outline" onClick={() => navigate('/owner/reports')}><List size={18} /> My Reports</Button>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* Footer navigation (form steps only) */}
// // // //       {isFormStep && (
// // // //         <div className="bg-white border-t border-[#e2e8f0] sticky bottom-0 z-20 py-4">
// // // //           <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
// // // //             <button onClick={prevStep} disabled={step === 0} className="px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50" style={{ borderColor: '#e2e8f0', color: '#374151' }}>
// // // //               ← Back
// // // //             </button>
// // // //             {step < 2 ? (
// // // //               <button onClick={nextStep} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>
// // // //                 Next →
// // // //               </button>
// // // //             ) : (
// // // //               <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed" style={{ backgroundColor: '#1a56db', minWidth: 140 }}>
// // // //                 {submitting ? (
// // // //                   <span className="flex items-center justify-center gap-2">
// // // //                     <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: 'spin-slow 0.8s linear infinite' }} />
// // // //                     Submitting...
// // // //                   </span>
// // // //                 ) : 'Submit Report'}
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState, useCallback } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import {
// // //   AlertCircle, CheckCircle, Brain, Upload, Trash2,
// // //   LayoutDashboard, List, MapPin, Building2, Calendar, Tag,
// // //   ArrowLeft
// // // } from 'lucide-react';
// // // import { createLostReport } from '../../api/items';
// // // import Button from '../../components/shared/Button';
// // // import Input from '../../components/shared/Input';

// // // /* ---------- Constants ---------- */
// // // const CATEGORIES = [
// // //   'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
// // //   'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
// // //   'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
// // //   'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS','OTHERS'
// // // ];
// // // const REGIONS = [
// // //   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
// // //   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
// // //   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
// // //   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
// // //   'UNGUJA_MJINI_MAGHARIBI','PEMBA'
// // // ];
// // // const STEP_TITLES = ['Basic Information', 'Location Details', 'Images'];

// // // /* ---------- Animations ---------- */
// // // const animStyles = `
// // //   @keyframes spin-slow {
// // //     from { transform: rotate(0deg); }
// // //     to { transform: rotate(360deg); }
// // //   }
// // //   @keyframes pulse-ring {
// // //     0% { transform: scale(0.8); opacity: 1; }
// // //     100% { transform: scale(2); opacity: 0; }
// // //   }
// // //   @keyframes fadeInUp {
// // //     from { opacity: 0; transform: translateY(20px); }
// // //     to { opacity: 1; transform: translateY(0); }
// // //   }
// // //   @keyframes dotBounce {
// // //     0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
// // //     40% { transform: scale(1); opacity: 1; }
// // //   }
// // //   .ai-spinner-outer { animation: spin-slow 1.4s linear infinite; }
// // //   .ai-spinner-inner { animation: spin-slow 1s linear infinite reverse; }
// // //   .fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
// // //   .dot-bounce { animation: dotBounce 1.2s ease-in-out infinite; }
// // // `;

// // // function SelectField({ label, name, value, onChange, options, placeholder, required }) {
// // //   return (
// // //     <div>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //         {label}{required && <span className="text-red-500 ml-0.5">*</span>}
// // //       </label>
// // //       <select
// // //         name={name}
// // //         value={value}
// // //         onChange={onChange}
// // //         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-800 transition-all"
// // //       >
// // //         <option value="">{placeholder}</option>
// // //         {options.map(o => (
// // //           <option key={o.value} value={o.value}>{o.label}</option>
// // //         ))}
// // //       </select>
// // //     </div>
// // //   );
// // // }

// // // export default function ReportItem() {
// // //   const navigate = useNavigate();

// // //   const [step, setStep] = useState(0); // 0,1,2 = form steps; 3 = AI processing; 4 = result
// // //   const [form, setForm] = useState({
// // //     itemName: '', description: '', category: '', lostDate: '', region: '',
// // //     area: '', lostLocation: '', dominantColor: '', latitude: '', longitude: '',
// // //     imageUrls: [],
// // //   });
// // //   const [imageFiles, setImageFiles] = useState([]);
// // //   const [imagePreviews, setImagePreviews] = useState([]);
// // //   const [error, setError] = useState('');
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [reportId, setReportId] = useState(null);
// // //   const [matchResult, setMatchResult] = useState(null); // real backend response
// // //   const [isDragOver, setIsDragOver] = useState(false);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setForm(prev => ({ ...prev, [name]: value }));
// // //   };

// // //   const addImageFiles = useCallback((files) => {
// // //     const imageOnly = files.filter(f => f.type.startsWith('image/'));
// // //     if (!imageOnly.length) return;
// // //     setImageFiles(prev => [...prev, ...imageOnly]);
// // //     const newPreviews = imageOnly.map(file => URL.createObjectURL(file));
// // //     setImagePreviews(prev => [...prev, ...newPreviews]);
// // //     setForm(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...newPreviews] }));
// // //   }, []);

// // //   const handleImageUpload = (e) => {
// // //     addImageFiles(Array.from(e.target.files));
// // //     e.target.value = '';
// // //   };

// // //   const handleDrop = (e) => {
// // //     e.preventDefault();
// // //     setIsDragOver(false);
// // //     addImageFiles(Array.from(e.dataTransfer.files));
// // //   };

// // //   const removeImage = (index) => {
// // //     URL.revokeObjectURL(imagePreviews[index]);
// // //     setImageFiles(prev => prev.filter((_, i) => i !== index));
// // //     setImagePreviews(prev => prev.filter((_, i) => i !== index));
// // //     setForm(prev => ({
// // //       ...prev,
// // //       imageUrls: prev.imageUrls.filter((_, i) => i !== index),
// // //     }));
// // //   };

// // //   const validateStep = () => {
// // //     setError('');
// // //     if (step === 0) {
// // //       if (!form.itemName.trim()) { setError('Item name is required'); return false; }
// // //       if (!form.category) { setError('Please select a category'); return false; }
// // //       if (!form.description.trim()) { setError('Description is required'); return false; }
// // //     }
// // //     if (step === 1) {
// // //       if (!form.region) { setError('Region is required'); return false; }
// // //       if (!form.area.trim()) { setError('Area is required'); return false; }
// // //       if (!form.lostDate) { setError('Lost date is required'); return false; }
// // //       if (!form.lostLocation.trim()) { setError('Lost location is required'); return false; }
// // //     }
// // //     return true;
// // //   };

// // //   const nextStep = () => {
// // //     if (validateStep()) setStep(prev => Math.min(prev + 1, 2));
// // //   };

// // //   const prevStep = () => {
// // //     setError('');
// // //     setStep(prev => Math.max(prev - 1, 0));
// // //   };

// // //   const handleSubmit = async () => {
// // //     if (!validateStep()) return;
// // //     setSubmitting(true);
// // //     setError('');
// // //     setStep(3);

// // //     try {
// // //       const payload = {
// // //         itemName: form.itemName,
// // //         description: form.description,
// // //         category: form.category,
// // //         lostDate: form.lostDate,
// // //         region: form.region,
// // //         area: form.area,
// // //         lostLocation: form.lostLocation,
// // //         ...(form.dominantColor && { dominantColor: form.dominantColor }),
// // //         ...(form.latitude && { latitude: parseFloat(form.latitude) }),
// // //         ...(form.longitude && { longitude: parseFloat(form.longitude) }),
// // //         ...(form.imageUrls.length > 0 && { imageUrls: form.imageUrls }),
// // //       };

// // //       const response = await createLostReport(payload);
// // //       const data = response?.data || response;
// // //       console.log('Backend AI result:', data);

// // //       setReportId(data.id || null);
// // //       setMatchResult(data); 
// // //       setStep(4);
// // //     } catch (err) {
// // //       setError(err.message || 'Something went wrong.');
// // //       setStep(0); 
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const isFormStep = step <= 2;
// // //   const goBack = () => navigate('/owner/search');

// // //   const categoryOptions = CATEGORIES.map(c => ({
// // //     value: c,
// // //     label: c.replace(/_/g, ' ').charAt(0) + c.replace(/_/g, ' ').slice(1).toLowerCase()
// // //   }));
// // //   const regionOptions = REGIONS.map(r => ({ value: r, label: r.replace(/_/g, ' ') }));

// // //   /* ---------- Structural Mapping Dynamic Calculations ---------- */
// // //   const hasMatch = Array.isArray(matchResult?.matches) && matchResult.matches.length > 0;
// // //   const matchDetails = hasMatch ? matchResult.matches[0] : {}; 
// // //   const displayedScore = matchResult?.bestScore ?? matchResult?.finalScore ?? matchDetails?.finalScore;

// // //   const getMatchBadge = (score) => {
// // //     if (!score) return null;
// // //     if (score >= 80) return { bg: '#dcfce7', text: '#166534', label: 'Strong Match' };
// // //     return { bg: '#dbeafe', text: '#1e40af', label: 'Potential Match' };
// // //   };
// // //   const matchBadge = getMatchBadge(displayedScore);

// // //   return (
// // //     <div className="min-h-screen bg-surface flex flex-col">
// // //       <style>{animStyles}</style>

// // //       {/* Header (form steps only) */}
// // //       {isFormStep && (
// // //         <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-20">
// // //           <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
// // //             <div className="flex items-center gap-4">
// // //               <h2 className="text-xl font-bold text-gray-900">Report Lost Item</h2>
// // //               <span className="text-sm text-gray-500">
// // //                 Step {step + 1} of 3 — {STEP_TITLES[step]}
// // //               </span>
// // //             </div>
// // //             <button
// // //               onClick={goBack}
// // //               className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
// // //               title="Back to search"
// // //             >
// // //               <ArrowLeft size={20} />
// // //               <span className="hidden sm:inline text-sm font-medium">Back</span>
// // //             </button>
// // //           </div>
// // //           <div className="max-w-3xl mx-auto px-4 pb-3">
// // //             <div className="flex gap-2">
// // //               {[0,1,2].map(i => (
// // //                 <div
// // //                   key={i}
// // //                   className="flex-1 h-1.5 rounded-full transition-all duration-500"
// // //                   style={{ backgroundColor: i <= step ? '#1a56db' : '#e2e8f0' }}
// // //                 />
// // //               ))}
// // //             </div>
// // //             <div className="flex justify-between mt-1.5">
// // //               {STEP_TITLES.map((title, i) => (
// // //                 <span
// // //                   key={i}
// // //                   className="text-xs transition-colors duration-300"
// // //                   style={{ color: i <= step ? '#1a56db' : '#94a3b8' }}
// // //                 >
// // //                   {title}
// // //                 </span>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Main content */}
// // //       <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
// // //         {error && isFormStep && (
// // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
// // //             <AlertCircle size={16} className="shrink-0" /> {error}
// // //           </div>
// // //         )}

// // //         {/* Step 0: Basic Info */}
// // //         {step === 0 && (
// // //           <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// // //             <Input label="Item Name" name="itemName" placeholder="e.g., Samsung Galaxy S22" value={form.itemName} onChange={handleChange} required />
// // //             <SelectField label="Category" name="category" value={form.category} onChange={handleChange} options={categoryOptions} placeholder="Select a category" required />
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
// // //               <textarea
// // //                 name="description"
// // //                 rows={4}
// // //                 placeholder="Describe the lost item..."
// // //                 className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-800 transition-all text-sm"
// // //                 value={form.description}
// // //                 onChange={handleChange}
// // //               />
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Step 1: Location Details */}
// // //         {step === 1 && (
// // //           <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //               <SelectField label="Region" name="region" value={form.region} onChange={handleChange} options={regionOptions} placeholder="Select a region" required />
// // //               <Input label="Area" name="area" placeholder="e.g., Kijitonyama" value={form.area} onChange={handleChange} required />
// // //             </div>
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //               <Input label="Date Lost" type="date" name="lostDate" value={form.lostDate} onChange={handleChange} required max={new Date().toISOString().split('T')[0]} />
// // //               <Input label="Dominant Color" name="dominantColor" placeholder="e.g., Black, Silver" value={form.dominantColor} onChange={handleChange} />
// // //             </div>
// // //             <Input label="Lost Location" name="lostLocation" placeholder="e.g., Bus Stop near Posta" value={form.lostLocation} onChange={handleChange} required />
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">GPS Coordinates <span className="text-gray-400 font-normal">(optional)</span></label>
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <Input name="latitude" placeholder="Latitude: -6.7924" value={form.latitude} onChange={handleChange} />
// // //                 <Input name="longitude" placeholder="Longitude: 39.2083" value={form.longitude} onChange={handleChange} />
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Step 2: Images */}
// // //         {step === 2 && (
// // //           <div className="space-y-4 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// // //             <p className="text-sm text-gray-500">Upload photos of the lost item to improve AI matching accuracy. <span className="text-gray-400">(optional)</span></p>
// // //             <div
// // //               onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
// // //               onDragLeave={() => setIsDragOver(false)}
// // //               onDrop={handleDrop}
// // //               className="rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer"
// // //               style={{ borderColor: isDragOver ? '#1a56db' : '#d1d5db', backgroundColor: isDragOver ? '#eff6ff' : '#f9fafb' }}
// // //               onClick={() => document.getElementById('reportImageUpload').click()}
// // //             >
// // //               <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="reportImageUpload" />
// // //               <Upload size={32} className="mx-auto mb-3" style={{ color: isDragOver ? '#1a56db' : '#9ca3af' }} />
// // //               <p className="font-medium text-gray-600 text-sm">{isDragOver ? 'Drop images here' : 'Click or drag images here'}</p>
// // //               <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 5MB each</p>
// // //             </div>
// // //             {imagePreviews.length > 0 && (
// // //               <div>
// // //                 <p className="text-xs font-medium text-gray-500 mb-2">{imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected</p>
// // //                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
// // //                   {imagePreviews.map((src, idx) => (
// // //                     <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
// // //                       <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
// // //                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
// // //                         <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5" aria-label="Remove image"><Trash2 size={14} /></button>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* AI Processing (step 3) */}
// // //         {step === 3 && (
// // //           <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
// // //             <div className="relative w-40 h-40 mb-10">
// // //               <div className="absolute inset-0 rounded-full border-4 border-[#1a56db]/10 animate-pulse-ring"></div>
// // //               <div className="absolute inset-4 rounded-full border-4 border-[#e11d48]/20 animate-spin-slow"></div>
// // //               <div className="absolute inset-8 rounded-full border-4 border-[#1a56db]/30 animate-spin-slow-reverse"></div>
// // //               <div className="absolute inset-0 flex items-center justify-center">
// // //                 <Brain size={48} className="text-[#1a56db] animate-pulse" />
// // //               </div>
// // //             </div>

// // //             <h2 className="text-4xl font-black text-gray-900 mb-4">
// // //               Analyzing your report
// // //             </h2>
// // //             <p className="text-lg text-gray-600 max-w-md mb-8">
// // //               Our intelligent matching system is comparing your report with available found items.
// // //             </p>

// // //             <div className="flex gap-2 mb-12">
// // //               {[0,1,2].map(i => (
// // //                 <div
// // //                   key={i}
// // //                   className="w-3 h-3 rounded-full bg-[#1a56db] dot-bounce"
// // //                   style={{ animationDelay: `${i * 0.2}s` }}
// // //                 />
// // //               ))}
// // //             </div>

// // //             <p className="text-sm text-gray-400">Please wait while we process your request...</p>
// // //           </div>
// // //         )}

// // //         {/* Result (step 4) – Render based on explicit metrics */}
// // //         {step === 4 && (
// // //           <div className="fade-in-up">
// // //             {hasMatch ? (
// // //               <div className="space-y-6">
// // //                 <div className="flex items-center gap-3">
// // //                   <CheckCircle size={28} className="text-green-500" />
// // //                   <h3 className="text-2xl font-bold text-gray-900">Potential Match Found!</h3>
// // //                   {matchBadge && (
// // //                     <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: matchBadge.bg, color: matchBadge.text }}>{matchBadge.label}</span>
// // //                   )}
// // //                 </div>
// // //                 <p className="text-gray-600">A potential match for your lost item has been identified.</p>

// // //                 {/* Unified dynamic AI Score display block */}
// // //                 {displayedScore !== undefined && (
// // //                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
// // //                     <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
// // //                       <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Confidence Match Score</p>
// // //                       <p className="text-2xl font-bold text-[#1a56db]">{displayedScore}%</p>
// // //                       <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
// // //                         <div className="h-full bg-[#1a56db] rounded-full" style={{ width: `${displayedScore}%` }}></div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {/* Match details card */}
// // //                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">
// // //                   {matchDetails.previewImage && <img src={matchDetails.previewImage} alt="Matched item" className="w-full h-48 object-cover rounded-lg mb-3" />}
// // //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
// // //                     <div className="flex items-center gap-2">
// // //                       <Tag size={16} className="text-gray-500" />
// // //                       <span className="text-gray-600">Item:</span>
// // //                       <span className="font-medium text-gray-800">{matchDetails.itemName || '—'}</span>
// // //                     </div>
// // //                     <div className="flex items-center gap-2">
// // //                       <Building2 size={16} className="text-gray-500" />
// // //                       <span className="text-gray-600">Organization:</span>
// // //                       <span className="font-medium text-gray-800">{matchDetails.organizationName || '—'}</span>
// // //                     </div>
// // //                     <div className="flex items-center gap-2">
// // //                       <MapPin size={16} className="text-gray-500" />
// // //                       <span className="text-gray-600">Region:</span>
// // //                       <span className="font-medium text-gray-800">{matchDetails.region || '—'}</span>
// // //                     </div>
// // //                     <div className="flex items-center gap-2">
// // //                       <MapPin size={16} className="text-gray-500" />
// // //                       <span className="text-gray-600">Area:</span>
// // //                       <span className="font-medium text-gray-800">{matchDetails.area || '—'}</span>
// // //                     </div>
// // //                     <div className="flex items-center gap-2 col-span-full">
// // //                       <Calendar size={16} className="text-gray-500" />
// // //                       <span className="text-gray-600">Found Date:</span>
// // //                       <span className="font-medium text-gray-800">{matchDetails.foundDate || matchDetails.createdAt || '—'}</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Buttons */}
// // //                 <div className="flex flex-col sm:flex-row gap-3">
// // //                   <Button variant="primary" onClick={() => navigate(`/owner/claim/${reportId}`)} className="flex-1">View Match Details</Button>
// // //                   <Button variant="outline" onClick={() => navigate('/owner/reports')} className="flex-1"><List size={18} /> My Reports</Button>
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <div className="text-center py-12">
// // //                 <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4"><AlertCircle size={32} /></div>
// // //                 <h3 className="text-2xl font-bold text-gray-900 mb-2">No Matching Item Found</h3>
// // //                 <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find a match for your lost item at this time. Your report has been saved, and future found items may still be matched automatically.</p>
// // //                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
// // //                   <Button variant="primary" onClick={() => navigate('/owner/dashboard')}><LayoutDashboard size={18} /> Dashboard</Button>
// // //                   <Button variant="outline" onClick={() => navigate('/owner/reports')}><List size={18} /> My Reports</Button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Footer navigation (form steps only) */}
// // //       {isFormStep && (
// // //         <div className="bg-white border-t border-[#e2e8f0] sticky bottom-0 z-20 py-4">
// // //           <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
// // //             <button onClick={prevStep} disabled={step === 0} className="px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50" style={{ borderColor: '#e2e8f0', color: '#374151' }}>
// // //               ← Back
// // //             </button>
// // //             {step < 2 ? (
// // //               <button onClick={nextStep} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>
// // //                 Next →
// // //               </button>
// // //             ) : (
// // //               <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed" style={{ backgroundColor: '#1a56db', minWidth: 140 }}>
// // //                 {submitting ? (
// // //                   <span className="flex items-center justify-center gap-2">
// // //                     <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: 'spin-slow 0.8s linear infinite' }} />
// // //                     Submitting...
// // //                   </span>
// // //                 ) : 'Submit Report'}
// // //               </button>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // src/pages/owner/ReportItem.jsx
// // import { useState, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   AlertCircle, CheckCircle, Brain, Upload, Trash2,
// //   LayoutDashboard, List, MapPin, Building2, Calendar, Tag,
// //   ArrowLeft
// // } from 'lucide-react';
// // import { createLostReport } from '../../api/items';
// // import Button from '../../components/shared/Button';
// // import Input from '../../components/shared/Input';
// // import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker'; // ✅ corrected

// // /* ---------- Constants ---------- */
// // const CATEGORIES = [
// //   'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
// //   'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
// //   'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
// //   'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS',
// //   'CALCULATOR','OTHERS',
// // ];
// // const REGIONS = [
// //   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
// //   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
// //   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
// //   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
// //   'UNGUJA_MJINI_MAGHARIBI','PEMBA'
// // ];
// // const STEP_TITLES = ['Basic Information', 'Location Details', 'Images'];

// // /* ---------- Animations ---------- */
// // const animStyles = `
// //   @keyframes spin-slow {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   @keyframes pulse-ring {
// //     0% { transform: scale(0.8); opacity: 1; }
// //     100% { transform: scale(2); opacity: 0; }
// //   }
// //   @keyframes fadeInUp {
// //     from { opacity: 0; transform: translateY(20px); }
// //     to { opacity: 1; transform: translateY(0); }
// //   }
// //   @keyframes dotBounce {
// //     0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
// //     40% { transform: scale(1); opacity: 1; }
// //   }
// //   .ai-spinner-outer { animation: spin-slow 1.4s linear infinite; }
// //   .ai-spinner-inner { animation: spin-slow 1s linear infinite reverse; }
// //   .fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
// //   .dot-bounce { animation: dotBounce 1.2s ease-in-out infinite; }
// // `;

// // function SelectField({ label, name, value, onChange, options, placeholder, required }) {
// //   return (
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1">
// //         {label}{required && <span className="text-red-500 ml-0.5">*</span>}
// //       </label>
// //       <select
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-800 transition-all"
// //       >
// //         <option value="">{placeholder}</option>
// //         {options.map(o => (
// //           <option key={o.value} value={o.value}>{o.label}</option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // }

// // export default function ReportItem() {
// //   const navigate = useNavigate();

// //   const [step, setStep] = useState(0);
// //   const [form, setForm] = useState({
// //     itemName: '', description: '', category: '', lostDate: '', region: '',
// //     area: '', lostLocation: '', dominantColor: '', latitude: '', longitude: '',
// //     imageUrls: [],
// //   });
// //   const [imageFiles, setImageFiles] = useState([]);
// //   const [imagePreviews, setImagePreviews] = useState([]);
// //   const [error, setError] = useState('');
// //   const [submitting, setSubmitting] = useState(false);
// //   const [reportId, setReportId] = useState(null);
// //   const [matchResult, setMatchResult] = useState(null);
// //   const [isDragOver, setIsDragOver] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm(prev => ({ ...prev, [name]: value }));
// //   };

// //   const addImageFiles = useCallback((files) => {
// //     const imageOnly = files.filter(f => f.type.startsWith('image/'));
// //     if (!imageOnly.length) return;
// //     setImageFiles(prev => [...prev, ...imageOnly]);
// //     const newPreviews = imageOnly.map(file => URL.createObjectURL(file));
// //     setImagePreviews(prev => [...prev, ...newPreviews]);
// //     setForm(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...newPreviews] }));
// //   }, []);

// //   const handleImageUpload = (e) => {
// //     addImageFiles(Array.from(e.target.files));
// //     e.target.value = '';
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     setIsDragOver(false);
// //     addImageFiles(Array.from(e.dataTransfer.files));
// //   };

// //   const removeImage = (index) => {
// //     URL.revokeObjectURL(imagePreviews[index]);
// //     setImageFiles(prev => prev.filter((_, i) => i !== index));
// //     setImagePreviews(prev => prev.filter((_, i) => i !== index));
// //     setForm(prev => ({
// //       ...prev,
// //       imageUrls: prev.imageUrls.filter((_, i) => i !== index),
// //     }));
// //   };

// //   const validateStep = () => {
// //     setError('');
// //     if (step === 0) {
// //       if (!form.itemName.trim()) { setError('Item name is required'); return false; }
// //       if (!form.category) { setError('Please select a category'); return false; }
// //       if (!form.description.trim()) { setError('Description is required'); return false; }
// //     }
// //     if (step === 1) {
// //       if (!form.region) { setError('Region is required'); return false; }
// //       if (!form.area.trim()) { setError('Area is required'); return false; }
// //       if (!form.lostDate) { setError('Lost date is required'); return false; }
// //       // Validate that a location was picked from the map
// //       if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
// //         setError('Please select a location from the map.');
// //         return false;
// //       }
// //     }
// //     return true;
// //   };

// //   const nextStep = () => {
// //     if (validateStep()) setStep(prev => Math.min(prev + 1, 2));
// //   };

// //   const prevStep = () => {
// //     setError('');
// //     setStep(prev => Math.max(prev - 1, 0));
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateStep()) return;
// //     setSubmitting(true);
// //     setError('');
// //     setStep(3);

// //     try {
// //       const payload = {
// //         itemName: form.itemName,
// //         description: form.description,
// //         category: form.category,
// //         lostDate: form.lostDate,
// //         region: form.region,
// //         area: form.area,
// //         lostLocation: form.lostLocation,
// //         ...(form.dominantColor && { dominantColor: form.dominantColor }),
// //         latitude: parseFloat(form.latitude) || 0,
// //         longitude: parseFloat(form.longitude) || 0,
// //         ...(form.imageUrls.length > 0 && { imageUrls: form.imageUrls }),
// //       };

// //       const response = await createLostReport(payload);
// //       const data = response?.data || response;
// //       console.log('Backend AI result:', data);

// //       setReportId(data.id || null);
// //       setMatchResult(data);
// //       setStep(4);
// //     } catch (err) {
// //       setError(err.message || 'Something went wrong.');
// //       setStep(0);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const isFormStep = step <= 2;
// //   const goBack = () => navigate('/owner/search');

// //   const categoryOptions = CATEGORIES.map(c => ({
// //     value: c,
// //     label: c.replace(/_/g, ' ').charAt(0) + c.replace(/_/g, ' ').slice(1).toLowerCase()
// //   }));
// //   const regionOptions = REGIONS.map(r => ({ value: r, label: r.replace(/_/g, ' ') }));

// //   const hasMatch = Array.isArray(matchResult?.matches) && matchResult.matches.length > 0;
// //   const matchDetails = hasMatch ? matchResult.matches[0] : {};
// //   const displayedScore = matchResult?.bestScore ?? matchResult?.finalScore ?? matchDetails?.finalScore;

// //   const getMatchBadge = (score) => {
// //     if (!score) return null;
// //     if (score >= 80) return { bg: '#dcfce7', text: '#166534', label: 'Strong Match' };
// //     return { bg: '#dbeafe', text: '#1e40af', label: 'Potential Match' };
// //   };
// //   const matchBadge = getMatchBadge(displayedScore);

// //   return (
// //     <div className="min-h-screen bg-surface flex flex-col">
// //       <style>{animStyles}</style>

// //       {isFormStep && (
// //         <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-20">
// //           <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
// //             <div className="flex items-center gap-4">
// //               <h2 className="text-xl font-bold text-gray-900">Report Lost Item</h2>
// //               <span className="text-sm text-gray-500">
// //                 Step {step + 1} of 3 — {STEP_TITLES[step]}
// //               </span>
// //             </div>
// //             <button onClick={goBack} className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
// //               <ArrowLeft size={20} />
// //               <span className="hidden sm:inline text-sm font-medium">Back</span>
// //             </button>
// //           </div>
// //           <div className="max-w-3xl mx-auto px-4 pb-3">
// //             <div className="flex gap-2">
// //               {[0,1,2].map(i => (
// //                 <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
// //                      style={{ backgroundColor: i <= step ? '#1a56db' : '#e2e8f0' }} />
// //               ))}
// //             </div>
// //             <div className="flex justify-between mt-1.5">
// //               {STEP_TITLES.map((title, i) => (
// //                 <span key={i} className="text-xs transition-colors duration-300"
// //                       style={{ color: i <= step ? '#1a56db' : '#94a3b8' }}>{title}</span>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
// //         {error && isFormStep && (
// //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
// //             <AlertCircle size={16} className="shrink-0" /> {error}
// //           </div>
// //         )}

// //         {step === 0 && (
// //           <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// //             <Input label="Item Name" name="itemName" placeholder="e.g., Samsung Galaxy S22" value={form.itemName} onChange={handleChange} required />
// //             <SelectField label="Category" name="category" value={form.category} onChange={handleChange} options={categoryOptions} placeholder="Select a category" required />
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
// //               <textarea name="description" rows={4} placeholder="Describe the lost item..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-800 transition-all text-sm" value={form.description} onChange={handleChange} />
// //             </div>
// //             <Input label="Dominant Color" name="dominantColor" placeholder="e.g., Black, Silver" value={form.dominantColor} onChange={handleChange} />
// //           </div>
// //         )}

// //         {step === 1 && (
// //           <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <SelectField label="Region" name="region" value={form.region} onChange={handleChange} options={regionOptions} placeholder="Select a region" required />
// //               <Input label="Area" name="area" placeholder="e.g., Kijitonyama" value={form.area} onChange={handleChange} required />
// //             </div>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <Input label="Date Lost" type="date" name="lostDate" value={form.lostDate} onChange={handleChange} required max={new Date().toISOString().split('T')[0]} />
// //             </div>

// //             {/* LocationPicker replaces old lostLocation + lat/lng inputs */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Lost Location <span className="text-red-500">*</span>
// //               </label>
// //               <LocationPicker
// //                 locationName={form.lostLocation}
// //                 onChange={({ locationName, lat, lng }) => {
// //                   setForm(prev => ({
// //                     ...prev,
// //                     lostLocation: locationName,
// //                     latitude: lat.toString(),
// //                     longitude: lng.toString()
// //                   }));
// //                 }}
// //                 initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
// //                 initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
// //                 placeholder="Search where the item was lost…"
// //               />
// //             </div>
// //           </div>
// //         )}

// //         {step === 2 && (
// //           <div className="space-y-4 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
// //             <p className="text-sm text-gray-500">Upload photos of the lost item to improve AI matching accuracy. <span className="text-gray-400">(optional)</span></p>
// //             <div
// //               onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
// //               onDragLeave={() => setIsDragOver(false)}
// //               onDrop={handleDrop}
// //               className="rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer"
// //               style={{ borderColor: isDragOver ? '#1a56db' : '#d1d5db', backgroundColor: isDragOver ? '#eff6ff' : '#f9fafb' }}
// //               onClick={() => document.getElementById('reportImageUpload').click()}
// //             >
// //               <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="reportImageUpload" />
// //               <Upload size={32} className="mx-auto mb-3" style={{ color: isDragOver ? '#1a56db' : '#9ca3af' }} />
// //               <p className="font-medium text-gray-600 text-sm">{isDragOver ? 'Drop images here' : 'Click or drag images here'}</p>
// //               <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 5MB each</p>
// //             </div>
// //             {imagePreviews.length > 0 && (
// //               <div>
// //                 <p className="text-xs font-medium text-gray-500 mb-2">{imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected</p>
// //                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
// //                   {imagePreviews.map((src, idx) => (
// //                     <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
// //                       <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
// //                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
// //                         <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5" aria-label="Remove image"><Trash2 size={14} /></button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {step === 3 && (
// //           <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
// //             <div className="relative w-40 h-40 mb-10">
// //               <div className="absolute inset-0 rounded-full border-4 border-[#1a56db]/10 animate-pulse-ring"></div>
// //               <div className="absolute inset-4 rounded-full border-4 border-[#e11d48]/20 animate-spin-slow"></div>
// //               <div className="absolute inset-8 rounded-full border-4 border-[#1a56db]/30 animate-spin-slow-reverse"></div>
// //               <div className="absolute inset-0 flex items-center justify-center">
// //                 <Brain size={48} className="text-[#1a56db] animate-pulse" />
// //               </div>
// //             </div>
// //             <h2 className="text-4xl font-black text-gray-900 mb-4">Analyzing your report</h2>
// //             <p className="text-lg text-gray-600 max-w-md mb-8">Our intelligent matching system is comparing your report with available found items.</p>
// //             <div className="flex gap-2 mb-12">
// //               {[0,1,2].map(i => (
// //                 <div key={i} className="w-3 h-3 rounded-full bg-[#1a56db] dot-bounce"
// //                      style={{ animationDelay: `${i * 0.2}s` }} />
// //               ))}
// //             </div>
// //             <p className="text-sm text-gray-400">Please wait while we process your request...</p>
// //           </div>
// //         )}

// //         {step === 4 && (
// //           <div className="fade-in-up">
// //             {hasMatch ? (
// //               <div className="space-y-6">
// //                 <div className="flex items-center gap-3">
// //                   <CheckCircle size={28} className="text-green-500" />
// //                   <h3 className="text-2xl font-bold text-gray-900">Potential Match Found!</h3>
// //                   {matchBadge && (
// //                     <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: matchBadge.bg, color: matchBadge.text }}>{matchBadge.label}</span>
// //                   )}
// //                 </div>
// //                 <p className="text-gray-600">A potential match for your lost item has been identified.</p>
// //                 {displayedScore !== undefined && (
// //                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
// //                     <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
// //                       <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Confidence Match Score</p>
// //                       <p className="text-2xl font-bold text-[#1a56db]">{displayedScore}%</p>
// //                       <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
// //                         <div className="h-full bg-[#1a56db] rounded-full" style={{ width: `${displayedScore}%` }}></div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">
// //                   {matchDetails.previewImage && <img src={matchDetails.previewImage} alt="Matched item" className="w-full h-48 object-cover rounded-lg mb-3" />}
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
// //                     <div className="flex items-center gap-2"><Tag size={16} className="text-gray-500" /><span className="text-gray-600">Item:</span><span className="font-medium text-gray-800">{matchDetails.itemName || '—'}</span></div>
// //                     <div className="flex items-center gap-2"><Building2 size={16} className="text-gray-500" /><span className="text-gray-600">Organization:</span><span className="font-medium text-gray-800">{matchDetails.organizationName || '—'}</span></div>
// //                     <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /><span className="text-gray-600">Region:</span><span className="font-medium text-gray-800">{matchDetails.region || '—'}</span></div>
// //                     <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /><span className="text-gray-600">Area:</span><span className="font-medium text-gray-800">{matchDetails.area || '—'}</span></div>
// //                     <div className="flex items-center gap-2 col-span-full"><Calendar size={16} className="text-gray-500" /><span className="text-gray-600">Found Date:</span><span className="font-medium text-gray-800">{matchDetails.foundDate || matchDetails.createdAt || '—'}</span></div>
// //                   </div>
// //                 </div>
// //                 <div className="flex flex-col sm:flex-row gap-3">
// //                   <Button variant="primary" onClick={() => navigate(`/owner/claim/${reportId}`)} className="flex-1">View Match Details</Button>
// //                   <Button variant="outline" onClick={() => navigate('/owner/reports')} className="flex-1"><List size={18} /> My Reports</Button>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4"><AlertCircle size={32} /></div>
// //                 <h3 className="text-2xl font-bold text-gray-900 mb-2">No Matching Item Found</h3>
// //                 <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find a match for your lost item at this time. Your report has been saved, and future found items may still be matched automatically.</p>
// //                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
// //                   <Button variant="primary" onClick={() => navigate('/owner/dashboard')}><LayoutDashboard size={18} /> Dashboard</Button>
// //                   <Button variant="outline" onClick={() => navigate('/owner/reports')}><List size={18} /> My Reports</Button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {isFormStep && (
// //         <div className="bg-white border-t border-[#e2e8f0] sticky bottom-0 z-20 py-4">
// //           <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
// //             <button onClick={prevStep} disabled={step === 0} className="px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50" style={{ borderColor: '#e2e8f0', color: '#374151' }}>
// //               ← Back
// //             </button>
// //             {step < 2 ? (
// //               <button onClick={nextStep} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>
// //                 Next →
// //               </button>
// //             ) : (
// //               <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed" style={{ backgroundColor: '#1a56db', minWidth: 140 }}>
// //                 {submitting ? (
// //                   <span className="flex items-center justify-center gap-2">
// //                     <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: 'spin-slow 0.8s linear infinite' }} />
// //                     Submitting...
// //                   </span>
// //                 ) : 'Submit Report'}
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AlertCircle, CheckCircle, Brain, Upload, Trash2,
//   LayoutDashboard, List, ArrowLeft
// } from 'lucide-react';
// import { createLostReport } from '../../api/items';
// import Button from '../../components/shared/Button';
// import Input from '../../components/shared/Input';
// import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

// const CATEGORIES = [
//   'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
//   'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
//   'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
//   'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS',
//   'CALCULATOR','OTHERS',
// ];
// const REGIONS = [
//   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
//   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
//   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
//   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
//   'UNGUJA_MJINI_MAGHARIBI','PEMBA'
// ];
// const STEP_TITLES = ['Basic Information', 'Location Details', 'Images'];

// const animStyles = `
//   @keyframes spin-slow {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   @keyframes pulse-ring {
//     0% { transform: scale(0.8); opacity: 1; }
//     100% { transform: scale(2); opacity: 0; }
//   }
//   @keyframes fadeInUp {
//     from { opacity: 0; transform: translateY(20px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes dotBounce {
//     0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
//     40% { transform: scale(1); opacity: 1; }
//   }
//   .ai-spinner-outer { animation: spin-slow 1.4s linear infinite; }
//   .ai-spinner-inner { animation: spin-slow 1s linear infinite reverse; }
//   .fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
//   .dot-bounce { animation: dotBounce 1.2s ease-in-out infinite; }
// `;

// function SelectField({ label, name, value, onChange, options, placeholder, required }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}{required && <span className="text-red-500 ml-0.5">*</span>}
//       </label>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-800 transition-all"
//       >
//         <option value="">{placeholder}</option>
//         {options.map(o => (
//           <option key={o.value} value={o.value}>{o.label}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default function ReportItem() {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(0);
//   const [form, setForm] = useState({
//     itemName: '', description: '', category: '', lostDate: '', region: '',
//     area: '', lostLocation: '', dominantColor: '', latitude: '', longitude: '',
//     imageUrls: [],
//   });
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [reportId, setReportId] = useState(null);
//   const [matchResult, setMatchResult] = useState(null);
//   const [isDragOver, setIsDragOver] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const addImageFiles = useCallback((files) => {
//     const imageOnly = files.filter(f => f.type.startsWith('image/'));
//     if (!imageOnly.length) return;
//     setImageFiles(prev => [...prev, ...imageOnly]);
//     const newPreviews = imageOnly.map(file => URL.createObjectURL(file));
//     setImagePreviews(prev => [...prev, ...newPreviews]);
//     setForm(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...newPreviews] }));
//   }, []);

//   const handleImageUpload = (e) => {
//     addImageFiles(Array.from(e.target.files));
//     e.target.value = '';
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     addImageFiles(Array.from(e.dataTransfer.files));
//   };

//   const removeImage = (index) => {
//     URL.revokeObjectURL(imagePreviews[index]);
//     setImageFiles(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//     setForm(prev => ({
//       ...prev,
//       imageUrls: prev.imageUrls.filter((_, i) => i !== index),
//     }));
//   };

//   const validateStep = () => {
//     setError('');
//     if (step === 0) {
//       if (!form.itemName.trim()) { setError('Item name is required'); return false; }
//       if (!form.category) { setError('Please select a category'); return false; }
//       if (!form.description.trim()) { setError('Description is required'); return false; }
//     }
//     if (step === 1) {
//       if (!form.region) { setError('Region is required'); return false; }
//       if (!form.area.trim()) { setError('Area is required'); return false; }
//       if (!form.lostDate) { setError('Lost date is required'); return false; }
//       if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
//         setError('Please select a location from the map.');
//         return false;
//       }
//     }
//     return true;
//   };

//   const nextStep = () => {
//     if (validateStep()) setStep(prev => Math.min(prev + 1, 2));
//   };

//   const prevStep = () => {
//     setError('');
//     setStep(prev => Math.max(prev - 1, 0));
//   };

//   const handleSubmit = async () => {
//     if (!validateStep()) return;
//     setSubmitting(true);
//     setError('');
//     setStep(3);

//     try {
//       const payload = {
//         itemName: form.itemName,
//         description: form.description,
//         category: form.category,
//         lostDate: form.lostDate,
//         region: form.region,
//         area: form.area,
//         lostLocation: form.lostLocation,
//         dominantColor: form.dominantColor || null,
//         latitude: parseFloat(form.latitude) || 0,
//         longitude: parseFloat(form.longitude) || 0,
//         imageUrls: form.imageUrls.length > 0 ? form.imageUrls : undefined,
//       };

//       const response = await createLostReport(payload);
//       const data = response?.data || response;
//       setReportId(data.id || null);
//       setMatchResult(data);
//       setStep(4);
//     } catch (err) {
//       setError(err.message || 'Something went wrong.');
//       setStep(0);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const isFormStep = step <= 2;
//   const goBack = () => navigate('/owner/search');

//   const categoryOptions = CATEGORIES.map(c => ({
//     value: c,
//     label: c.replace(/_/g, ' ').charAt(0) + c.replace(/_/g, ' ').slice(1).toLowerCase()
//   }));
//   const regionOptions = REGIONS.map(r => ({ value: r, label: r.replace(/_/g, ' ') }));

//   const hasMatch = Array.isArray(matchResult?.matches) && matchResult.matches.length > 0;
//   const matchDetails = hasMatch ? matchResult.matches[0] : {};
//   const displayedScore = matchResult?.bestScore ?? matchResult?.finalScore ?? matchDetails?.finalScore;

//   const getMatchBadge = (score) => {
//     if (!score) return null;
//     if (score >= 80) return { bg: '#dcfce7', text: '#166534', label: 'Strong Match' };
//     return { bg: '#dbeafe', text: '#1e40af', label: 'Potential Match' };
//   };
//   const matchBadge = getMatchBadge(displayedScore);

//   return (
//     <div className="min-h-screen bg-surface flex flex-col">
//       <style>{animStyles}</style>

//       {isFormStep && (
//         <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-20">
//           <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <h2 className="text-xl font-bold text-gray-900">Report Lost Item</h2>
//               <span className="text-sm text-gray-500">
//                 Step {step + 1} of 3 — {STEP_TITLES[step]}
//               </span>
//             </div>
//             <button onClick={goBack} className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
//               <ArrowLeft size={20} />
//               <span className="hidden sm:inline text-sm font-medium">Back</span>
//             </button>
//           </div>
//           <div className="max-w-3xl mx-auto px-4 pb-3">
//             <div className="flex gap-2">
//               {[0,1,2].map(i => (
//                 <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
//                      style={{ backgroundColor: i <= step ? '#1a56db' : '#e2e8f0' }} />
//               ))}
//             </div>
//             <div className="flex justify-between mt-1.5">
//               {STEP_TITLES.map((title, i) => (
//                 <span key={i} className="text-xs transition-colors duration-300"
//                       style={{ color: i <= step ? '#1a56db' : '#94a3b8' }}>{title}</span>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
//         {error && isFormStep && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
//             <AlertCircle size={16} className="shrink-0" /> {error}
//           </div>
//         )}

//         {step === 0 && (
//           <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
//             <Input label="Item Name" name="itemName" placeholder="e.g., Samsung Galaxy S22" value={form.itemName} onChange={handleChange} required />
//             <SelectField label="Category" name="category" value={form.category} onChange={handleChange} options={categoryOptions} placeholder="Select a category" required />
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
//               <textarea name="description" rows={4} placeholder="Describe the lost item..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-800 transition-all text-sm" value={form.description} onChange={handleChange} />
//             </div>
//             <Input label="Dominant Color" name="dominantColor" placeholder="e.g., Black, Silver" value={form.dominantColor} onChange={handleChange} />
//           </div>
//         )}

//         {step === 1 && (
//           <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <SelectField label="Region" name="region" value={form.region} onChange={handleChange} options={regionOptions} placeholder="Select a region" required />
//               <Input label="Area" name="area" placeholder="e.g., Kijitonyama" value={form.area} onChange={handleChange} required />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Input label="Date Lost" type="date" name="lostDate" value={form.lostDate} onChange={handleChange} required max={new Date().toISOString().split('T')[0]} />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Lost Location <span className="text-red-500">*</span>
//               </label>
//               <LocationPicker
//                 locationName={form.lostLocation}
//                 onChange={({ locationName, lat, lng }) => {
//                   setForm(prev => ({
//                     ...prev,
//                     lostLocation: locationName,
//                     latitude: lat.toString(),
//                     longitude: lng.toString()
//                   }));
//                 }}
//                 initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
//                 initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
//                 placeholder="Search where the item was lost…"
//               />
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
//             <p className="text-sm text-gray-500">Upload photos of the lost item to improve AI matching accuracy. <span className="text-gray-400">(optional)</span></p>
//             <div
//               onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
//               onDragLeave={() => setIsDragOver(false)}
//               onDrop={handleDrop}
//               className="rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer"
//               style={{ borderColor: isDragOver ? '#1a56db' : '#d1d5db', backgroundColor: isDragOver ? '#eff6ff' : '#f9fafb' }}
//               onClick={() => document.getElementById('reportImageUpload').click()}
//             >
//               <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="reportImageUpload" />
//               <Upload size={32} className="mx-auto mb-3" style={{ color: isDragOver ? '#1a56db' : '#9ca3af' }} />
//               <p className="font-medium text-gray-600 text-sm">{isDragOver ? 'Drop images here' : 'Click or drag images here'}</p>
//               <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 5MB each</p>
//             </div>
//             {imagePreviews.length > 0 && (
//               <div>
//                 <p className="text-xs font-medium text-gray-500 mb-2">{imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected</p>
//                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
//                   {imagePreviews.map((src, idx) => (
//                     <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
//                       <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
//                         <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5" aria-label="Remove image"><Trash2 size={14} /></button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {step === 3 && (
//           <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
//             <div className="relative w-40 h-40 mb-10">
//               <div className="absolute inset-0 rounded-full border-4 border-[#1a56db]/10 animate-pulse-ring"></div>
//               <div className="absolute inset-4 rounded-full border-4 border-[#e11d48]/20 animate-spin-slow"></div>
//               <div className="absolute inset-8 rounded-full border-4 border-[#1a56db]/30 animate-spin-slow-reverse"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Brain size={48} className="text-[#1a56db] animate-pulse" />
//               </div>
//             </div>
//             <h2 className="text-4xl font-black text-gray-900 mb-4">Analyzing your report</h2>
//             <p className="text-lg text-gray-600 max-w-md mb-8">Our intelligent matching system is comparing your report with available found items.</p>
//             <div className="flex gap-2 mb-12">
//               {[0,1,2].map(i => (
//                 <div key={i} className="w-3 h-3 rounded-full bg-[#1a56db] dot-bounce"
//                      style={{ animationDelay: `${i * 0.2}s` }} />
//               ))}
//             </div>
//             <p className="text-sm text-gray-400">Please wait while we process your request...</p>
//           </div>
//         )}

//         {step === 4 && (
//           <div className="fade-in-up">
//             {hasMatch ? (
//               <div className="space-y-6">
//                 <div className="flex items-center gap-3">
//                   <CheckCircle size={28} className="text-green-500" />
//                   <h3 className="text-2xl font-bold text-gray-900">Strong Match Found!</h3>
//                   {matchBadge && (
//                     <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: matchBadge.bg, color: matchBadge.text }}>
//                       {matchBadge.label}
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-gray-600">Our AI found a potential match for your lost item.</p>

//                 {displayedScore !== undefined && (
//                   <div className="flex justify-center">
//                     <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm w-full max-w-xs">
//                       <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Confidence Match Score</p>
//                       <p className="text-4xl font-black text-[#1a56db]">{displayedScore}%</p>
//                       <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
//                         <div className="h-full bg-[#1a56db] rounded-full" style={{ width: `${displayedScore}%` }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <Button variant="primary" onClick={() => navigate('/owner/dashboard')}>
//                     <LayoutDashboard size={18} className="mr-1" /> Dashboard
//                   </Button>
//                   <Button variant="outline" onClick={() => navigate('/owner/reports')}>
//                     <List size={18} className="mr-1" /> My Reports
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
//                   <AlertCircle size={32} />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">No Matching Item Found</h3>
//                 <p className="text-gray-500 mb-8 max-w-md mx-auto">
//                   We couldn't find a match for your lost item at this time. Your report has been saved, and future found items may still be matched automatically.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <Button variant="primary" onClick={() => navigate('/owner/dashboard')}>
//                     <LayoutDashboard size={18} className="mr-1" /> Dashboard
//                   </Button>
//                   <Button variant="outline" onClick={() => navigate('/owner/reports')}>
//                     <List size={18} className="mr-1" /> My Reports
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {isFormStep && (
//         <div className="bg-white border-t border-[#e2e8f0] sticky bottom-0 z-20 py-4">
//           <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
//             <button onClick={prevStep} disabled={step === 0} className="px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50" style={{ borderColor: '#e2e8f0', color: '#374151' }}>
//               ← Back
//             </button>
//             {step < 2 ? (
//               <button onClick={nextStep} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>
//                 Next →
//               </button>
//             ) : (
//               <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed" style={{ backgroundColor: '#1a56db', minWidth: 140 }}>
//                 {submitting ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: 'spin-slow 0.8s linear infinite' }} />
//                     Submitting...
//                   </span>
//                 ) : 'Submit Report'}
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle, CheckCircle, Brain, Upload, Trash2,
  LayoutDashboard, List, ArrowLeft
} from 'lucide-react';
import { createLostReport } from '../../api/items';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

const CATEGORIES = [
  'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
  'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
  'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
  'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS',
  'CALCULATOR','OTHERS',
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

export default function ReportItem() {
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
      if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
        setError('Please select a location from the map.');
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

      const response = await createLostReport(payload);
      const data = response?.data || response;
      setReportId(data.id || null);
      setMatchResult(data);
      setStep(4);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setStep(0);
    } finally {
      setSubmitting(false);
    }
  };

  const isFormStep = step <= 2;
  const goBack = () => navigate('/owner/search');

  const categoryOptions = CATEGORIES.map(c => ({
    value: c,
    label: c.replace(/_/g, ' ').charAt(0) + c.replace(/_/g, ' ').slice(1).toLowerCase()
  }));
  const regionOptions = REGIONS.map(r => ({ value: r, label: r.replace(/_/g, ' ') }));

  const hasMatch = Array.isArray(matchResult?.matches) && matchResult.matches.length > 0;
  const matchDetails = hasMatch ? matchResult.matches[0] : {};
  const displayedScore = matchResult?.bestScore ?? matchResult?.finalScore ?? matchDetails?.finalScore;

  const getMatchBadge = (score) => {
    if (!score) return null;
    if (score >= 80) return { bg: '#dcfce7', text: '#166534', label: 'Strong Match' };
    return { bg: '#dbeafe', text: '#1e40af', label: 'Potential Match' };
  };
  const matchBadge = getMatchBadge(displayedScore);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <style>{animStyles}</style>

      {isFormStep && (
        <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">Report Lost Item</h2>
              <span className="text-sm text-gray-500">
                Step {step + 1} of 3 — {STEP_TITLES[step]}
              </span>
            </div>
            <button onClick={goBack} className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} />
              <span className="hidden sm:inline text-sm font-medium">Back</span>
            </button>
          </div>
          <div className="max-w-3xl mx-auto px-4 pb-3">
            <div className="flex gap-2">
              {[0,1,2].map(i => (
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
            <Input label="Item Name" name="itemName" placeholder="e.g., Samsung Galaxy S22" value={form.itemName} onChange={handleChange} required />
            <SelectField label="Category" name="category" value={form.category} onChange={handleChange} options={categoryOptions} placeholder="Select a category" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
              <textarea name="description" rows={4} placeholder="Describe the lost item..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-800 transition-all text-sm" value={form.description} onChange={handleChange} />
            </div>
            <Input label="Dominant Color" name="dominantColor" placeholder="e.g., Black, Silver" value={form.dominantColor} onChange={handleChange} />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Region" name="region" value={form.region} onChange={handleChange} options={regionOptions} placeholder="Select a region" required />
              <Input label="Area" name="area" placeholder="e.g., Kijitonyama" value={form.area} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Date Lost" type="date" name="lostDate" value={form.lostDate} onChange={handleChange} required max={new Date().toISOString().split('T')[0]} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lost Location <span className="text-red-500">*</span>
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
                placeholder="Search where the item was lost…"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 fade-in-up bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Upload photos of the lost item to improve AI matching accuracy. <span className="text-gray-400">(optional)</span></p>
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

        {step === 3 && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="relative w-40 h-40 mb-10">
              <div className="absolute inset-0 rounded-full border-4 border-[#1a56db]/10 animate-pulse-ring"></div>
              <div className="absolute inset-4 rounded-full border-4 border-[#e11d48]/20 animate-spin-slow"></div>
              <div className="absolute inset-8 rounded-full border-4 border-[#1a56db]/30 animate-spin-slow-reverse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain size={48} className="text-[#1a56db] animate-pulse" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Analyzing your report</h2>
            <p className="text-lg text-gray-600 max-w-md mb-8">Our intelligent matching system is comparing your report with available found items.</p>
            <div className="flex gap-2 mb-12">
              {[0,1,2].map(i => (
                <div key={i} className="w-3 h-3 rounded-full bg-[#1a56db] dot-bounce"
                     style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <p className="text-sm text-gray-400">Please wait while we process your request...</p>
          </div>
        )}

        {step === 4 && (
          <div className="fade-in-up">
            {hasMatch ? (
              <div className="space-y-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle size={28} className="text-green-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Strong Match Found!</h3>
                  {matchBadge && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: matchBadge.bg, color: matchBadge.text }}>
                      {matchBadge.label}
                    </span>
                  )}
                </div>
                <p className="text-gray-600">Our AI found a potential match for your lost item.</p>

                {displayedScore !== undefined && (
                  <div className="flex justify-center">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm w-full max-w-xs">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Confidence Match Score</p>
                      <p className="text-4xl font-black text-[#1a56db]">{displayedScore}%</p>
                      <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a56db] rounded-full" style={{ width: `${displayedScore}%` }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="primary" onClick={() => navigate(`/owner/claim/${reportId}`)}>
                    Claim Item
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/owner/reports')}>
                    <List size={18} className="mr-1" /> My Reports
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Matching Item Found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  We couldn't find a match for your lost item at this time. Your report has been saved, and future found items may still be matched automatically.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="primary" onClick={() => navigate('/owner/dashboard')}>
                    <LayoutDashboard size={18} className="mr-1" /> Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/owner/reports')}>
                    <List size={18} className="mr-1" /> My Reports
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isFormStep && (
        <div className="bg-white border-t border-[#e2e8f0] sticky bottom-0 z-20 py-4">
          <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
            <button onClick={prevStep} disabled={step === 0} className="px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50" style={{ borderColor: '#e2e8f0', color: '#374151' }}>
              ← Back
            </button>
            {step < 2 ? (
              <button onClick={nextStep} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>
                Next →
              </button>
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
        </div>
      )}
    </div>
  );
}