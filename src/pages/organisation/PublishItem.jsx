

// // import { useState, useRef, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   Upload, X, CheckCircle, Loader2, MapPin,
// //   Package, AlertCircle, Sparkles, Image, ChevronRight
// // } from 'lucide-react';
// // import { publishOrganizationItem } from '../../api/items';

// // const CATEGORIES = [
// //   'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
// //   'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
// //   'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
// //   'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS','OTHERS',
// // ];
// // const REGIONS = [
// //   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
// //   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
// //   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
// //   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
// //   'UNGUJA_MJINI_MAGHARIBI','PEMBA',
// // ];

// // const ANIM = `
// //   @keyframes progressBar { from { width: 0%; } }
// //   @keyframes successPop {
// //     0%  { transform: scale(0.5); opacity: 0; }
// //     70% { transform: scale(1.1); }
// //     100%{ transform: scale(1);   opacity: 1; }
// //   }
// //   .success-pop { animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
// // `;

// // const STEPS = [
// //   { label: 'Publishing…',  sub: 'Sending to server',      color: '#1a56db' },
// //   { label: 'Saving…',      sub: 'Storing to database',     color: '#6366f1' },
// //   { label: 'AI Matching…', sub: 'Finding potential owners',color: '#22c55e' },
// // ];

// // function Field({ label, required, error, children }) {
// //   return (
// //     <div>
// //       <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
// //         {label}{required && <span className="text-[#ef4444] ml-0.5">*</span>}
// //       </label>
// //       {children}
// //       {error && (
// //         <p className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
// //           <AlertCircle size={11} /> {error}
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

// // const inputCls = `w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
// //                   focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
// //                   outline-none text-sm text-[#0f172a] bg-white transition-all
// //                   placeholder:text-gray-400`;

// // export default function PublishItem() {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({
// //     itemName: '', description: '', category: '', foundDate: '',
// //     region: '', area: '', foundLocation: '', dominantColor: '',
// //     mobileReporter: '', latitude: '', longitude: '', imageUrls: [],
// //   });
// //   const [images,   setImages]   = useState([]);   // { file, preview }
// //   const [errors,   setErrors]   = useState({});
// //   const [phase,    setPhase]    = useState('idle'); // idle | submitting | success | error
// //   const [stepIdx,  setStepIdx]  = useState(0);
// //   const [apiError, setApiError] = useState('');
// //   const [isDrag,   setIsDrag]   = useState(false);
// //   const fileRef = useRef(null);

// //   const set = (k, v) => {
// //     setForm(p => ({ ...p, [k]: v }));
// //     if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
// //   };

// //   const addImages = useCallback((files) => {
// //     const imgs = Array.from(files).filter(f => f.type.startsWith('image/'));
// //     const entries = imgs.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
// //     setImages(p => [...p, ...entries]);
// //   }, []);

// //   const removeImage = (i) => {
// //     URL.revokeObjectURL(images[i].preview);
// //     setImages(p => p.filter((_, j) => j !== i));
// //   };

// //   const validate = () => {
// //     const e = {};
// //     if (!form.itemName.trim())    e.itemName    = 'Required';
// //     if (!form.category)           e.category    = 'Required';
// //     if (!form.description.trim()) e.description = 'Required';
// //     if (!form.region)             e.region      = 'Required';
// //     if (!form.area.trim())        e.area        = 'Required';
// //     if (!form.foundDate)          e.foundDate   = 'Required';
// //     if (!form.foundLocation.trim()) e.foundLocation = 'Required';
// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validate()) return;
// //     setPhase('submitting'); setApiError(''); setStepIdx(0);

// //     try {
// //       // Animate through steps
// //       for (let i = 0; i < STEPS.length; i++) {
// //         setStepIdx(i);
// //         await new Promise(r => setTimeout(r, 900));
// //       }

// //       const payload = {
// //         ...form,
// //         latitude:  parseFloat(form.latitude)  || 0,
// //         longitude: parseFloat(form.longitude) || 0,
// //         imageUrls: images.map(img => img.preview), // replace with real upload URLs
// //       };
// //       await publishOrganizationItem(payload);
// //       setPhase('success');
// //     } catch (e) {
// //       setApiError(e.message || 'Failed to publish item');
// //       setPhase('error');
// //     }
// //   };

// //   const reset = () => {
// //     images.forEach(img => URL.revokeObjectURL(img.preview));
// //     setImages([]); setForm({
// //       itemName:'', description:'', category:'', foundDate:'', region:'',
// //       area:'', foundLocation:'', dominantColor:'', mobileReporter:'',
// //       latitude:'', longitude:'', imageUrls:[],
// //     }); setErrors({}); setPhase('idle');
// //   };

// //   /* ── Submitting overlay ── */
// //   if (phase === 'submitting') {
// //     const step = STEPS[Math.min(stepIdx, STEPS.length - 1)];
// //     return (
// //       <>
// //         <style>{ANIM}</style>
// //         <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
// //           <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6
// //                           bg-gradient-to-br from-[#1a56db] to-[#6366f1] shadow-xl
// //                           shadow-blue-200">
// //             <Loader2 size={36} className="text-white animate-spin" />
// //           </div>
// //           <h3 className="text-2xl font-black text-[#0f172a] mb-2">{step.label}</h3>
// //           <p className="text-sm text-gray-400 mb-8">{step.sub}</p>
// //           {/* Step indicators */}
// //           <div className="flex items-center gap-3">
// //             {STEPS.map((s, i) => (
// //               <div key={i} className="flex items-center gap-2">
// //                 <div className={`w-8 h-8 rounded-full flex items-center justify-center
// //                                  text-xs font-black transition-all duration-500
// //                                  ${i < stepIdx ? 'bg-[#22c55e] text-white'
// //                                   : i === stepIdx ? 'bg-[#1a56db] text-white scale-110'
// //                                   : 'bg-gray-100 text-gray-300'}`}>
// //                   {i < stepIdx ? <CheckCircle size={16} /> : i + 1}
// //                 </div>
// //                 {i < STEPS.length - 1 && (
// //                   <div className={`w-10 h-0.5 rounded-full transition-all duration-700
// //                                    ${i < stepIdx ? 'bg-[#22c55e]' : 'bg-gray-200'}`} />
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //           <div className="mt-8 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
// //             <div className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full"
// //                  style={{
// //                    width: `${((stepIdx + 1) / STEPS.length) * 100}%`,
// //                    transition: 'width 0.8s ease-out',
// //                  }} />
// //           </div>
// //         </div>
// //       </>
// //     );
// //   }

// //   /* ── Success screen ── */
// //   if (phase === 'success') {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
// //         <style>{ANIM}</style>
// //         <div className="success-pop w-24 h-24 rounded-2xl bg-gradient-to-br
// //                         from-[#22c55e] to-[#16a34a] flex items-center justify-center
// //                         mb-6 shadow-xl shadow-green-200">
// //           <CheckCircle size={44} className="text-white" />
// //         </div>
// //         <h3 className="text-2xl font-black text-[#0f172a] mb-2">
// //           Item Published Successfully!
// //         </h3>
// //         <p className="text-sm text-gray-500 mb-2 max-w-sm">
// //           Your found item is now live. Our AI is matching it with lost item reports.
// //         </p>
// //         <div className="flex items-center gap-1.5 text-xs text-[#22c55e] font-bold
// //                         bg-green-50 px-3 py-1.5 rounded-full mb-8">
// //           <Sparkles size={12} /> AI matching complete
// //         </div>
// //         <div className="flex gap-3">
// //           <button onClick={reset}
// //                   className="px-5 py-2.5 rounded-xl border border-[#e2e8f0]
// //                              text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
// //             Publish Another
// //           </button>
// //           <button onClick={() => navigate('/org/items')}
// //                   className="flex items-center gap-2 px-5 py-2.5 rounded-xl
// //                              bg-gradient-to-r from-[#1a56db] to-[#1547c0]
// //                              text-white text-sm font-bold hover:opacity-90 transition-all">
// //             View My Items <ChevronRight size={15} />
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   /* ── Form ── */
// //   return (
// //     <>
// //       <style>{ANIM}</style>
// //       <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">

// //         {/* Header */}
// //         <div className="mb-8 fade-up">
// //           <div className="flex items-center gap-3 mb-2">
// //             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
// //                             flex items-center justify-center">
// //               <Package size={20} className="text-white" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-black text-[#0f172a]">Publish Found Item</h1>
// //               <p className="text-sm text-gray-400">
// //                 Help reunite owners with their lost belongings
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {apiError && phase === 'error' && (
// //           <div className="flex items-center gap-3 bg-red-50 border border-red-200
// //                           text-red-700 px-4 py-3 rounded-xl mb-6 text-sm fade-up">
// //             <AlertCircle size={16} className="shrink-0" /> {apiError}
// //             <button onClick={() => setPhase('idle')}
// //                     className="ml-auto font-bold underline shrink-0">Try again</button>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

// //           {/* Main form */}
// //           <div className="lg:col-span-2 space-y-5">

// //             {/* Basic info card */}
// //             <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up">
// //               <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
// //                              flex items-center gap-2">
// //                 <span className="w-5 h-5 rounded-full bg-[#1a56db] text-white text-[10px]
// //                                  font-black flex items-center justify-center">1</span>
// //                 Basic Information
// //               </h2>
// //               <div className="space-y-4">
// //                 <Field label="Item Name" required error={errors.itemName}>
// //                   <input value={form.itemName} onChange={e => set('itemName', e.target.value)}
// //                          placeholder="e.g., iPhone 14 Pro, Brown Leather Wallet"
// //                          className={inputCls} />
// //                 </Field>
// //                 <Field label="Category" required error={errors.category}>
// //                   <select value={form.category} onChange={e => set('category', e.target.value)}
// //                           className={inputCls}>
// //                     <option value="">Select category…</option>
// //                     {CATEGORIES.map(c => (
// //                       <option key={c} value={c}>
// //                         {c.replace(/_/g,' ').charAt(0) + c.replace(/_/g,' ').slice(1).toLowerCase()}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </Field>
// //                 <Field label="Description" required error={errors.description}>
// //                   <textarea value={form.description}
// //                             onChange={e => set('description', e.target.value)}
// //                             rows={4}
// //                             placeholder="Describe the item in detail — color, brand, unique marks…"
// //                             className={`${inputCls} resize-none`} />
// //                 </Field>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <Field label="Found Date" required error={errors.foundDate}>
// //                     <input type="date" value={form.foundDate}
// //                            max={new Date().toISOString().split('T')[0]}
// //                            onChange={e => set('foundDate', e.target.value)}
// //                            className={inputCls} />
// //                   </Field>
// //                   <Field label="Dominant Color">
// //                     <input value={form.dominantColor}
// //                            onChange={e => set('dominantColor', e.target.value)}
// //                            placeholder="e.g., Black, Silver"
// //                            className={inputCls} />
// //                   </Field>
// //                 </div>
// //                 <Field label="Reporter Mobile">
// //                   <input value={form.mobileReporter}
// //                          onChange={e => set('mobileReporter', e.target.value)}
// //                          placeholder="+255 7XX XXX XXX"
// //                          className={inputCls} />
// //                 </Field>
// //               </div>
// //             </div>

// //             {/* Location card */}
// //             <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
// //                  style={{ animationDelay: '80ms' }}>
// //               <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
// //                              flex items-center gap-2">
// //                 <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white text-[10px]
// //                                  font-black flex items-center justify-center">2</span>
// //                 Location Details
// //               </h2>
// //               <div className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <Field label="Region" required error={errors.region}>
// //                     <select value={form.region} onChange={e => set('region', e.target.value)}
// //                             className={inputCls}>
// //                       <option value="">Select region…</option>
// //                       {REGIONS.map(r => (
// //                         <option key={r} value={r}>{r.replace(/_/g,' ')}</option>
// //                       ))}
// //                     </select>
// //                   </Field>
// //                   <Field label="Area" required error={errors.area}>
// //                     <input value={form.area} onChange={e => set('area', e.target.value)}
// //                            placeholder="e.g., Mikocheni"
// //                            className={inputCls} />
// //                   </Field>
// //                 </div>
// //                 <Field label="Found Location Description" required error={errors.foundLocation}>
// //                   <input value={form.foundLocation}
// //                          onChange={e => set('foundLocation', e.target.value)}
// //                          placeholder="e.g., Near Mlimani Mall entrance, Gate B"
// //                          className={inputCls} />
// //                 </Field>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <Field label="Latitude (optional)">
// //                     <input value={form.latitude} onChange={e => set('latitude', e.target.value)}
// //                            placeholder="-6.7924" className={inputCls} />
// //                   </Field>
// //                   <Field label="Longitude (optional)">
// //                     <input value={form.longitude} onChange={e => set('longitude', e.target.value)}
// //                            placeholder="39.2083" className={inputCls} />
// //                   </Field>
// //                 </div>
// //                 <div className="flex items-center gap-2 text-xs text-[#1a56db] font-semibold
// //                                 bg-blue-50 px-3 py-2 rounded-xl">
// //                   <MapPin size={13} />
// //                   GPS coordinates help AI match items more accurately
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right panel: images + submit */}
// //           <div className="space-y-5">

// //             {/* Image upload */}
// //             <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
// //                  style={{ animationDelay: '120ms' }}>
// //               <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-4
// //                              flex items-center gap-2">
// //                 <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white text-[10px]
// //                                  font-black flex items-center justify-center">3</span>
// //                 Images
// //               </h2>
// //               <div
// //                 onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
// //                 onDragLeave={() => setIsDrag(false)}
// //                 onDrop={e => { e.preventDefault(); setIsDrag(false); addImages(e.dataTransfer.files); }}
// //                 onClick={() => fileRef.current?.click()}
// //                 className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
// //                              transition-all duration-200 mb-4
// //                              ${isDrag ? 'border-[#1a56db] bg-blue-50' : 'border-[#e2e8f0] hover:border-[#1a56db]/50 bg-[#f8fafc]'}`}
// //               >
// //                 <input ref={fileRef} type="file" multiple accept="image/*"
// //                        className="hidden"
// //                        onChange={e => addImages(e.target.files)} />
// //                 <Upload size={24} className={`mx-auto mb-2 ${isDrag ? 'text-[#1a56db]' : 'text-gray-300'}`} />
// //                 <p className={`text-xs font-semibold ${isDrag ? 'text-[#1a56db]' : 'text-gray-400'}`}>
// //                   {isDrag ? 'Drop here' : 'Click or drag images'}
// //                 </p>
// //                 <p className="text-[10px] text-gray-300 mt-0.5">PNG, JPG, WEBP — max 5MB</p>
// //               </div>

// //               {images.length > 0 && (
// //                 <div className="grid grid-cols-3 gap-2">
// //                   {images.map((img, i) => (
// //                     <div key={i} className="relative group aspect-square rounded-xl overflow-hidden">
// //                       <img src={img.preview} alt="" className="w-full h-full object-cover" />
// //                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40
// //                                       transition-all flex items-center justify-center">
// //                         <button onClick={() => removeImage(i)}
// //                                 className="opacity-0 group-hover:opacity-100 transition-opacity
// //                                            w-6 h-6 rounded-full bg-red-500 text-white
// //                                            flex items-center justify-center">
// //                           <X size={12} />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}

// //               {images.length === 0 && (
// //                 <div className="flex items-center gap-2 text-[10px] text-gray-400">
// //                   <Image size={12} />
// //                   No images selected · Images improve AI matching
// //                 </div>
// //               )}
// //             </div>

// //             {/* Submit */}
// //             <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
// //                  style={{ animationDelay: '160ms' }}>
// //               <div className="flex items-start gap-3 p-3 bg-[#eff6ff] rounded-xl mb-4">
// //                 <Sparkles size={16} className="text-[#1a56db] shrink-0 mt-0.5" />
// //                 <p className="text-xs text-[#1a56db] font-medium">
// //                   After publishing, our AI will automatically match this item
// //                   with lost item reports.
// //                 </p>
// //               </div>
// //               <button onClick={handleSubmit}
// //                       className="btn-primary w-full flex items-center justify-center gap-2
// //                                  py-3 rounded-xl bg-gradient-to-r from-[#1a56db] to-[#1547c0]
// //                                  text-white font-black text-sm shadow-sm">
// //                 <Package size={16} /> Publish Item
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// import { useState, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Upload, X, CheckCircle, Loader2, MapPin,
//   Package, AlertCircle, Sparkles, Image, ChevronRight
// } from 'lucide-react';
// import { publishOrganizationItem } from '../../api/items';
// import LocationPicker from '../../components/shared/LocationPicker';

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
//   'UNGUJA_MJINI_MAGHARIBI','PEMBA',
// ];

// const ANIM = `
//   @keyframes progressBar { from { width: 0%; } }
//   @keyframes successPop {
//     0%  { transform: scale(0.5); opacity: 0; }
//     70% { transform: scale(1.1); }
//     100%{ transform: scale(1);   opacity: 1; }
//   }
//   .success-pop { animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
// `;

// const STEPS = [
//   { label: 'Publishing…',  sub: 'Sending to server',      color: '#1a56db' },
//   { label: 'Saving…',      sub: 'Storing to database',     color: '#6366f1' },
//   { label: 'AI Matching…', sub: 'Finding potential owners',color: '#22c55e' },
// ];

// function Field({ label, required, error, children }) {
//   return (
//     <div>
//       <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
//         {label}{required && <span className="text-[#ef4444] ml-0.5">*</span>}
//       </label>
//       {children}
//       {error && (
//         <p className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
//           <AlertCircle size={11} /> {error}
//         </p>
//       )}
//     </div>
//   );
// }

// const inputCls = `w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
//                   focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
//                   outline-none text-sm text-[#0f172a] bg-white transition-all
//                   placeholder:text-gray-400`;

// export default function PublishItem() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     itemName: '', description: '', category: '', foundDate: '',
//     region: '', area: '', foundLocation: '', dominantColor: '',
//     mobileReporter: '', latitude: '', longitude: '', imageUrls: [],
//   });
//   const [images,   setImages]   = useState([]);   // { file, preview }
//   const [errors,   setErrors]   = useState({});
//   const [phase,    setPhase]    = useState('idle'); // idle | submitting | success | error
//   const [stepIdx,  setStepIdx]  = useState(0);
//   const [apiError, setApiError] = useState('');
//   const [isDrag,   setIsDrag]   = useState(false);
//   const fileRef = useRef(null);

//   const set = (k, v) => {
//     setForm(p => ({ ...p, [k]: v }));
//     if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
//   };

//   const addImages = useCallback((files) => {
//     const imgs = Array.from(files).filter(f => f.type.startsWith('image/'));
//     const entries = imgs.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
//     setImages(p => [...p, ...entries]);
//   }, []);

//   const removeImage = (i) => {
//     URL.revokeObjectURL(images[i].preview);
//     setImages(p => p.filter((_, j) => j !== i));
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.itemName.trim())    e.itemName    = 'Required';
//     if (!form.category)           e.category    = 'Required';
//     if (!form.description.trim()) e.description = 'Required';
//     if (!form.region)             e.region      = 'Required';
//     if (!form.area.trim())        e.area        = 'Required';
//     if (!form.foundDate)          e.foundDate   = 'Required';
//     // Validate location (must have a non‑zero lat/lng)
//     if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
//       e.foundLocation = 'Please select a location from the map.';
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;
//     setPhase('submitting'); setApiError(''); setStepIdx(0);

//     try {
//       // Animate through steps
//       for (let i = 0; i < STEPS.length; i++) {
//         setStepIdx(i);
//         await new Promise(r => setTimeout(r, 900));
//       }

//       const payload = {
//         ...form,
//         latitude:  parseFloat(form.latitude)  || 0,
//         longitude: parseFloat(form.longitude) || 0,
//         imageUrls: images.map(img => img.preview), // replace with real upload URLs
//       };
//       await publishOrganizationItem(payload);
//       setPhase('success');
//     } catch (e) {
//       setApiError(e.message || 'Failed to publish item');
//       setPhase('error');
//     }
//   };

//   const reset = () => {
//     images.forEach(img => URL.revokeObjectURL(img.preview));
//     setImages([]); setForm({
//       itemName:'', description:'', category:'', foundDate:'', region:'',
//       area:'', foundLocation:'', dominantColor:'', mobileReporter:'',
//       latitude:'', longitude:'', imageUrls:[],
//     }); setErrors({}); setPhase('idle');
//   };

//   /* ── Submitting overlay ── */
//   if (phase === 'submitting') {
//     const step = STEPS[Math.min(stepIdx, STEPS.length - 1)];
//     return (
//       <>
//         <style>{ANIM}</style>
//         <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
//           <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6
//                           bg-gradient-to-br from-[#1a56db] to-[#6366f1] shadow-xl
//                           shadow-blue-200">
//             <Loader2 size={36} className="text-white animate-spin" />
//           </div>
//           <h3 className="text-2xl font-black text-[#0f172a] mb-2">{step.label}</h3>
//           <p className="text-sm text-gray-400 mb-8">{step.sub}</p>
//           {/* Step indicators */}
//           <div className="flex items-center gap-3">
//             {STEPS.map((s, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center
//                                  text-xs font-black transition-all duration-500
//                                  ${i < stepIdx ? 'bg-[#22c55e] text-white'
//                                   : i === stepIdx ? 'bg-[#1a56db] text-white scale-110'
//                                   : 'bg-gray-100 text-gray-300'}`}>
//                   {i < stepIdx ? <CheckCircle size={16} /> : i + 1}
//                 </div>
//                 {i < STEPS.length - 1 && (
//                   <div className={`w-10 h-0.5 rounded-full transition-all duration-700
//                                    ${i < stepIdx ? 'bg-[#22c55e]' : 'bg-gray-200'}`} />
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="mt-8 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//             <div className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full"
//                  style={{
//                    width: `${((stepIdx + 1) / STEPS.length) * 100}%`,
//                    transition: 'width 0.8s ease-out',
//                  }} />
//           </div>
//         </div>
//       </>
//     );
//   }

//   /* ── Success screen ── */
//   if (phase === 'success') {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
//         <style>{ANIM}</style>
//         <div className="success-pop w-24 h-24 rounded-2xl bg-gradient-to-br
//                         from-[#22c55e] to-[#16a34a] flex items-center justify-center
//                         mb-6 shadow-xl shadow-green-200">
//           <CheckCircle size={44} className="text-white" />
//         </div>
//         <h3 className="text-2xl font-black text-[#0f172a] mb-2">
//           Item Published Successfully!
//         </h3>
//         <p className="text-sm text-gray-500 mb-2 max-w-sm">
//           Your found item is now live. Our AI is matching it with lost item reports.
//         </p>
//         <div className="flex items-center gap-1.5 text-xs text-[#22c55e] font-bold
//                         bg-green-50 px-3 py-1.5 rounded-full mb-8">
//           <Sparkles size={12} /> AI matching complete
//         </div>
//         <div className="flex gap-3">
//           <button onClick={reset}
//                   className="px-5 py-2.5 rounded-xl border border-[#e2e8f0]
//                              text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
//             Publish Another
//           </button>
//           <button onClick={() => navigate('/org/items')}
//                   className="flex items-center gap-2 px-5 py-2.5 rounded-xl
//                              bg-gradient-to-r from-[#1a56db] to-[#1547c0]
//                              text-white text-sm font-bold hover:opacity-90 transition-all">
//             View My Items <ChevronRight size={15} />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ── Form ── */
//   return (
//     <>
//       <style>{ANIM}</style>
//       <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">

//         {/* Header */}
//         <div className="mb-8 fade-up">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
//                             flex items-center justify-center">
//               <Package size={20} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black text-[#0f172a]">Publish Found Item</h1>
//               <p className="text-sm text-gray-400">
//                 Help reunite owners with their lost belongings
//               </p>
//             </div>
//           </div>
//         </div>

//         {apiError && phase === 'error' && (
//           <div className="flex items-center gap-3 bg-red-50 border border-red-200
//                           text-red-700 px-4 py-3 rounded-xl mb-6 text-sm fade-up">
//             <AlertCircle size={16} className="shrink-0" /> {apiError}
//             <button onClick={() => setPhase('idle')}
//                     className="ml-auto font-bold underline shrink-0">Try again</button>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* Main form */}
//           <div className="lg:col-span-2 space-y-5">

//             {/* Basic info card */}
//             <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up">
//               <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
//                              flex items-center gap-2">
//                 <span className="w-5 h-5 rounded-full bg-[#1a56db] text-white text-[10px]
//                                  font-black flex items-center justify-center">1</span>
//                 Basic Information
//               </h2>
//               <div className="space-y-4">
//                 <Field label="Item Name" required error={errors.itemName}>
//                   <input value={form.itemName} onChange={e => set('itemName', e.target.value)}
//                          placeholder="e.g., iPhone 14 Pro, Brown Leather Wallet"
//                          className={inputCls} />
//                 </Field>
//                 <Field label="Category" required error={errors.category}>
//                   <select value={form.category} onChange={e => set('category', e.target.value)}
//                           className={inputCls}>
//                     <option value="">Select category…</option>
//                     {CATEGORIES.map(c => (
//                       <option key={c} value={c}>
//                         {c.replace(/_/g,' ').charAt(0) + c.replace(/_/g,' ').slice(1).toLowerCase()}
//                       </option>
//                     ))}
//                   </select>
//                 </Field>
//                 <Field label="Description" required error={errors.description}>
//                   <textarea value={form.description}
//                             onChange={e => set('description', e.target.value)}
//                             rows={4}
//                             placeholder="Describe the item in detail — color, brand, unique marks…"
//                             className={`${inputCls} resize-none`} />
//                 </Field>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="Found Date" required error={errors.foundDate}>
//                     <input type="date" value={form.foundDate}
//                            max={new Date().toISOString().split('T')[0]}
//                            onChange={e => set('foundDate', e.target.value)}
//                            className={inputCls} />
//                   </Field>
//                   <Field label="Dominant Color">
//                     <input value={form.dominantColor}
//                            onChange={e => set('dominantColor', e.target.value)}
//                            placeholder="e.g., Black, Silver"
//                            className={inputCls} />
//                   </Field>
//                 </div>
//                 <Field label="Reporter Mobile">
//                   <input value={form.mobileReporter}
//                          onChange={e => set('mobileReporter', e.target.value)}
//                          placeholder="+255 7XX XXX XXX"
//                          className={inputCls} />
//                 </Field>
//               </div>
//             </div>

//             {/* Location card – now with OpenStreetMap + Nominatim */}
//             <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
//                  style={{ animationDelay: '80ms' }}>
//               <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
//                              flex items-center gap-2">
//                 <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white text-[10px]
//                                  font-black flex items-center justify-center">2</span>
//                 Location Details
//               </h2>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="Region" required error={errors.region}>
//                     <select value={form.region} onChange={e => set('region', e.target.value)}
//                             className={inputCls}>
//                       <option value="">Select region…</option>
//                       {REGIONS.map(r => (
//                         <option key={r} value={r}>{r.replace(/_/g,' ')}</option>
//                       ))}
//                     </select>
//                   </Field>
//                   <Field label="Area" required error={errors.area}>
//                     <input value={form.area} onChange={e => set('area', e.target.value)}
//                            placeholder="e.g., Mikocheni"
//                            className={inputCls} />
//                   </Field>
//                 </div>

//                 {/* LocationPicker replaces old foundLocation + lat/lng inputs */}
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
//                     Found Location <span className="text-[#ef4444] ml-0.5">*</span>
//                   </label>
//                   <LocationPicker
//                     locationName={form.foundLocation}
//                     onChange={({ locationName, lat, lng }) => {
//                       set('foundLocation', locationName);
//                       set('latitude', lat.toString());
//                       set('longitude', lng.toString());
//                     }}
//                     initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
//                     initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
//                     placeholder="Search where the item was found…"
//                   />
//                   {errors.foundLocation && (
//                     <p className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
//                       <AlertCircle size={11} /> {errors.foundLocation}
//                     </p>
//                   )}
//                 </div>

//                 {/* Removed old latitude/longitude text inputs – they're now hidden */}
//               </div>
//             </div>
//           </div>

//           {/* Right panel: images + submit */}
//           <div className="space-y-5">

//             {/* Image upload */}
//             <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
//                  style={{ animationDelay: '120ms' }}>
//               <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-4
//                              flex items-center gap-2">
//                 <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white text-[10px]
//                                  font-black flex items-center justify-center">3</span>
//                 Images
//               </h2>
//               <div
//                 onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
//                 onDragLeave={() => setIsDrag(false)}
//                 onDrop={e => { e.preventDefault(); setIsDrag(false); addImages(e.dataTransfer.files); }}
//                 onClick={() => fileRef.current?.click()}
//                 className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
//                              transition-all duration-200 mb-4
//                              ${isDrag ? 'border-[#1a56db] bg-blue-50' : 'border-[#e2e8f0] hover:border-[#1a56db]/50 bg-[#f8fafc]'}`}
//               >
//                 <input ref={fileRef} type="file" multiple accept="image/*"
//                        className="hidden"
//                        onChange={e => addImages(e.target.files)} />
//                 <Upload size={24} className={`mx-auto mb-2 ${isDrag ? 'text-[#1a56db]' : 'text-gray-300'}`} />
//                 <p className={`text-xs font-semibold ${isDrag ? 'text-[#1a56db]' : 'text-gray-400'}`}>
//                   {isDrag ? 'Drop here' : 'Click or drag images'}
//                 </p>
//                 <p className="text-[10px] text-gray-300 mt-0.5">PNG, JPG, WEBP — max 5MB</p>
//               </div>

//               {images.length > 0 && (
//                 <div className="grid grid-cols-3 gap-2">
//                   {images.map((img, i) => (
//                     <div key={i} className="relative group aspect-square rounded-xl overflow-hidden">
//                       <img src={img.preview} alt="" className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40
//                                       transition-all flex items-center justify-center">
//                         <button onClick={() => removeImage(i)}
//                                 className="opacity-0 group-hover:opacity-100 transition-opacity
//                                            w-6 h-6 rounded-full bg-red-500 text-white
//                                            flex items-center justify-center">
//                           <X size={12} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {images.length === 0 && (
//                 <div className="flex items-center gap-2 text-[10px] text-gray-400">
//                   <Image size={12} />
//                   No images selected · Images improve AI matching
//                 </div>
//               )}
//             </div>

//             {/* Submit */}
//             <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
//                  style={{ animationDelay: '160ms' }}>
//               <div className="flex items-start gap-3 p-3 bg-[#eff6ff] rounded-xl mb-4">
//                 <Sparkles size={16} className="text-[#1a56db] shrink-0 mt-0.5" />
//                 <p className="text-xs text-[#1a56db] font-medium">
//                   After publishing, our AI will automatically match this item
//                   with lost item reports.
//                 </p>
//               </div>
//               <button onClick={handleSubmit}
//                       className="btn-primary w-full flex items-center justify-center gap-2
//                                  py-3 rounded-xl bg-gradient-to-r from-[#1a56db] to-[#1547c0]
//                                  text-white font-black text-sm shadow-sm">
//                 <Package size={16} /> Publish Item
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// src/pages/organisation/PublishItem.jsx (final corrected version)
import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, X, CheckCircle, Loader2, MapPin,
  Package, AlertCircle, Sparkles, Image, ChevronRight
} from 'lucide-react';
import { publishOrganizationItem } from '../../api/items';
// ✅ Corrected import – LocationPicker now inside its own folder structure
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
  'UNGUJA_MJINI_MAGHARIBI','PEMBA',
];

const ANIM = `
  @keyframes progressBar { from { width: 0%; } }
  @keyframes successPop {
    0%  { transform: scale(0.5); opacity: 0; }
    70% { transform: scale(1.1); }
    100%{ transform: scale(1);   opacity: 1; }
  }
  .success-pop { animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
`;

const STEPS = [
  { label: 'Publishing…',  sub: 'Sending to server',      color: '#1a56db' },
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
        <p className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

const inputCls = `w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
                  focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
                  outline-none text-sm text-[#0f172a] bg-white transition-all
                  placeholder:text-gray-400`;

export default function PublishItem() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itemName: '', description: '', category: '', foundDate: '',
    region: '', area: '', foundLocation: '', dominantColor: '',
    mobileReporter: '', latitude: '', longitude: '', imageUrls: [],
  });
  const [images,   setImages]   = useState([]);   // { file, preview }
  const [errors,   setErrors]   = useState({});
  const [phase,    setPhase]    = useState('idle'); // idle | submitting | success | error
  const [stepIdx,  setStepIdx]  = useState(0);
  const [apiError, setApiError] = useState('');
  const [isDrag,   setIsDrag]   = useState(false);
  const fileRef = useRef(null);

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
  };

  const addImages = useCallback((files) => {
    const imgs = Array.from(files).filter(f => f.type.startsWith('image/'));
    const entries = imgs.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    setImages(p => [...p, ...entries]);
  }, []);

  const removeImage = (i) => {
    URL.revokeObjectURL(images[i].preview);
    setImages(p => p.filter((_, j) => j !== i));
  };

  const validate = () => {
    const e = {};
    if (!form.itemName.trim())    e.itemName    = 'Required';
    if (!form.category)           e.category    = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    if (!form.region)             e.region      = 'Required';
    if (!form.area.trim())        e.area        = 'Required';
    if (!form.foundDate)          e.foundDate   = 'Required';
    // Validate location (must have a non‑zero lat/lng)
    if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
      e.foundLocation = 'Please select a location from the map.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setPhase('submitting'); setApiError(''); setStepIdx(0);

    try {
      // Animate through steps
      for (let i = 0; i < STEPS.length; i++) {
        setStepIdx(i);
        await new Promise(r => setTimeout(r, 900));
      }

      const payload = {
        ...form,
        latitude:  parseFloat(form.latitude)  || 0,
        longitude: parseFloat(form.longitude) || 0,
        imageUrls: images.map(img => img.preview), // replace with real upload URLs
      };
      await publishOrganizationItem(payload);
      setPhase('success');
    } catch (e) {
      setApiError(e.message || 'Failed to publish item');
      setPhase('error');
    }
  };

  const reset = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]); setForm({
      itemName:'', description:'', category:'', foundDate:'', region:'',
      area:'', foundLocation:'', dominantColor:'', mobileReporter:'',
      latitude:'', longitude:'', imageUrls:[],
    }); setErrors({}); setPhase('idle');
  };

  /* ── Submitting overlay ── */
  if (phase === 'submitting') {
    const step = STEPS[Math.min(stepIdx, STEPS.length - 1)];
    return (
      <>
        <style>{ANIM}</style>
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6
                          bg-gradient-to-br from-[#1a56db] to-[#6366f1] shadow-xl
                          shadow-blue-200">
            <Loader2 size={36} className="text-white animate-spin" />
          </div>
          <h3 className="text-2xl font-black text-[#0f172a] mb-2">{step.label}</h3>
          <p className="text-sm text-gray-400 mb-8">{step.sub}</p>
          {/* Step indicators */}
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

  /* ── Form ── */
  return (
    <>
      <style>{ANIM}</style>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 fade-up">
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

        {apiError && phase === 'error' && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200
                          text-red-700 px-4 py-3 rounded-xl mb-6 text-sm fade-up">
            <AlertCircle size={16} className="shrink-0" /> {apiError}
            <button onClick={() => setPhase('idle')}
                    className="ml-auto font-bold underline shrink-0">Try again</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main form */}
          <div className="lg:col-span-2 space-y-5">

            {/* Basic info card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up">
              <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
                             flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1a56db] text-white text-[10px]
                                 font-black flex items-center justify-center">1</span>
                Basic Information
              </h2>
              <div className="space-y-4">
                <Field label="Item Name" required error={errors.itemName}>
                  <input value={form.itemName} onChange={e => set('itemName', e.target.value)}
                         placeholder="e.g., iPhone 14 Pro, Brown Leather Wallet"
                         className={inputCls} />
                </Field>
                <Field label="Category" required error={errors.category}>
                  <select value={form.category} onChange={e => set('category', e.target.value)}
                          className={inputCls}>
                    <option value="">Select category…</option>
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>
                        {c.replace(/_/g,' ').charAt(0) + c.replace(/_/g,' ').slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Description" required error={errors.description}>
                  <textarea value={form.description}
                            onChange={e => set('description', e.target.value)}
                            rows={4}
                            placeholder="Describe the item in detail — color, brand, unique marks…"
                            className={`${inputCls} resize-none`} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Found Date" required error={errors.foundDate}>
                    <input type="date" value={form.foundDate}
                           max={new Date().toISOString().split('T')[0]}
                           onChange={e => set('foundDate', e.target.value)}
                           className={inputCls} />
                  </Field>
                  <Field label="Dominant Color">
                    <input value={form.dominantColor}
                           onChange={e => set('dominantColor', e.target.value)}
                           placeholder="e.g., Black, Silver"
                           className={inputCls} />
                  </Field>
                </div>
                <Field label="Reporter Mobile">
                  <input value={form.mobileReporter}
                         onChange={e => set('mobileReporter', e.target.value)}
                         placeholder="+255 7XX XXX XXX"
                         className={inputCls} />
                </Field>
              </div>
            </div>

            {/* Location card – now with OpenStreetMap + Nominatim */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
                 style={{ animationDelay: '80ms' }}>
              <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-5
                             flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white text-[10px]
                                 font-black flex items-center justify-center">2</span>
                Location Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Region" required error={errors.region}>
                    <select value={form.region} onChange={e => set('region', e.target.value)}
                            className={inputCls}>
                      <option value="">Select region…</option>
                      {REGIONS.map(r => (
                        <option key={r} value={r}>{r.replace(/_/g,' ')}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Area" required error={errors.area}>
                    <input value={form.area} onChange={e => set('area', e.target.value)}
                           placeholder="e.g., Mikocheni"
                           className={inputCls} />
                  </Field>
                </div>

                {/* LocationPicker replaces old foundLocation + lat/lng inputs */}
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
                    <p className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.foundLocation}
                    </p>
                  )}
                </div>

                {/* Removed old latitude/longitude text inputs – they're now hidden */}
              </div>
            </div>
          </div>

          {/* Right panel: images + submit */}
          <div className="space-y-5">

            {/* Image upload */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
                 style={{ animationDelay: '120ms' }}>
              <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-4
                             flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white text-[10px]
                                 font-black flex items-center justify-center">3</span>
                Images
              </h2>
              <div
                onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
                onDragLeave={() => setIsDrag(false)}
                onDrop={e => { e.preventDefault(); setIsDrag(false); addImages(e.dataTransfer.files); }}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
                             transition-all duration-200 mb-4
                             ${isDrag ? 'border-[#1a56db] bg-blue-50' : 'border-[#e2e8f0] hover:border-[#1a56db]/50 bg-[#f8fafc]'}`}
              >
                <input ref={fileRef} type="file" multiple accept="image/*"
                       className="hidden"
                       onChange={e => addImages(e.target.files)} />
                <Upload size={24} className={`mx-auto mb-2 ${isDrag ? 'text-[#1a56db]' : 'text-gray-300'}`} />
                <p className={`text-xs font-semibold ${isDrag ? 'text-[#1a56db]' : 'text-gray-400'}`}>
                  {isDrag ? 'Drop here' : 'Click or drag images'}
                </p>
                <p className="text-[10px] text-gray-300 mt-0.5">PNG, JPG, WEBP — max 5MB</p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden">
                      <img src={img.preview} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40
                                      transition-all flex items-center justify-center">
                        <button onClick={() => removeImage(i)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity
                                           w-6 h-6 rounded-full bg-red-500 text-white
                                           flex items-center justify-center">
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && (
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <Image size={12} />
                  No images selected · Images improve AI matching
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
                 style={{ animationDelay: '160ms' }}>
              <div className="flex items-start gap-3 p-3 bg-[#eff6ff] rounded-xl mb-4">
                <Sparkles size={16} className="text-[#1a56db] shrink-0 mt-0.5" />
                <p className="text-xs text-[#1a56db] font-medium">
                  After publishing, our AI will automatically match this item
                  with lost item reports.
                </p>
              </div>
              <button onClick={handleSubmit}
                      className="btn-primary w-full flex items-center justify-center gap-2
                                 py-3 rounded-xl bg-gradient-to-r from-[#1a56db] to-[#1547c0]
                                 text-white font-black text-sm shadow-sm">
                <Package size={16} /> Publish Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}