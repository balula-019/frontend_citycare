// // // import { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { ArrowLeft, Eye, EyeOff, MapPin, ChevronRight, ChevronLeft, UserCircle, Lock } from 'lucide-react';
// // // import { createAccount } from '../../api/auth';
// // // import logoSrc from '/src/assets/pata-logo.png';

// // // const STEPS = [
// // //   { id: 0, label: 'Personal', icon: UserCircle },
// // //   { id: 1, label: 'Security', icon: Lock },
// // //   { id: 2, label: 'Location', icon: MapPin },
// // // ];

// // // export default function RegisterPage() {
// // //   // ... all state and handlers exactly as before ...
// // //   const [step, setStep] = useState(0);
// // //   const [form, setForm] = useState({
// // //     name: '',
// // //     email: '',
// // //     mobile: '',
// // //     password: '',
// // //     location_name: '',
// // //     location_lat: '',
// // //     location_long: ''
// // //   });
// // //   const [error, setError] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [showPass, setShowPass] = useState(false);
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //     setError('');
// // //   };

// // //   const validateStep = () => {
// // //     if (step === 0) {
// // //       if (!form.name.trim()) return 'Please enter your full name.';
// // //       if (!form.email.trim()) return 'Please enter your email address.';
// // //       if (!form.mobile.trim()) return 'Please enter your mobile number.';
// // //     }
// // //     if (step === 1) {
// // //       if (!form.password) return 'Please set a password.';
// // //       if (form.password.length < 6) return 'Password must be at least 6 characters.';
// // //     }
// // //     return null;
// // //   };

// // //   const nextStep = () => {
// // //     const err = validateStep();
// // //     if (err) { setError(err); return; }
// // //     setError('');
// // //     setStep(step + 1);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError('');
// // //     setLoading(true);
// // //     try {
// // //       const payload = {
// // //         ...form,
// // //         location_lat: parseFloat(form.location_lat) || 0,
// // //         location_long: parseFloat(form.location_long) || 0,
// // //       };
// // //       await createAccount(payload);
// // //       navigate('/verify-otp', { state: { email: form.email } });
// // //     } catch (err) {
// // //       setError(err.message || 'Registration failed. Please try again.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const inputClass = "w-full px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-[#f8fafc] border border-gray-200 rounded-xl outline-none transition-all focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/15 focus:bg-white disabled:opacity-50";
// // //   const labelClass = "block text-xs font-semibold text-gray-600 mb-1 tracking-wide uppercase";

// // //   return (
// // //     <div className="h-screen flex overflow-hidden bg-white">
// // //       {/* ── LEFT PANEL – STATIC ── */}
// // //       <div
// // //         className="hidden lg:flex w-[420px] flex-shrink-0 h-full relative flex-col overflow-hidden"
// // //         style={{ background: 'linear-gradient(160deg, #1a56db 0%, #1240a8 55%, #0b2878 100%)' }}
// // //       >
// // //         <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
// // //         <div className="absolute top-1/2 -right-28 w-[340px] h-[340px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
// // //         <div className="absolute -bottom-24 -left-16 w-[280px] h-[280px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

// // //         <div className="relative z-10 flex flex-col h-full px-10 py-12">
// // //           <div>
// // //             <div className="flex items-center gap-2 mb-8">
// // //               <span className="text-xl font-black text-white tracking-wider" style={{ fontFamily: "'Sora', sans-serif" }}>PATACHAKO</span>
// // //               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
// // //             </div>
// // //             <h2 className="text-3xl font-extrabold text-white leading-snug tracking-tight mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
// // //               Join Tanzania's<br />Trusted Lost<br />& Found Network
// // //             </h2>
// // //             <p className="text-xs leading-relaxed max-w-[300px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
// // //               Create your free account and reconnect with what matters most — backed by verified partners nationwide.
// // //             </p>
// // //           </div>

// // //           <div className="flex flex-col gap-3 mt-8">
// // //             {STEPS.map(({ id, label, icon: Icon }) => (
// // //               <div
// // //                 key={id}
// // //                 className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
// // //                 style={{
// // //                   background: step === id ? 'rgba(255,255,255,0.15)' : 'transparent',
// // //                   border: step === id ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
// // //                 }}
// // //               >
// // //                 <div
// // //                   className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
// // //                   style={{
// // //                     background: step > id ? '#10b981' : step === id ? '#fff' : 'rgba(255,255,255,0.1)',
// // //                   }}
// // //                 >
// // //                   {step > id
// // //                     ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
// // //                     : <Icon size={14} color={step === id ? '#1a56db' : 'rgba(255,255,255,0.5)'} />
// // //                   }
// // //                 </div>
// // //                 <span
// // //                   className="text-sm font-semibold"
// // //                   style={{ color: step === id ? '#fff' : step > id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)' }}
// // //                 >
// // //                   {label}
// // //                 </span>
// // //                 {step === id && (
// // //                   <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
// // //                     Active
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="rounded-xl px-4 py-3.5 flex justify-between bg-white/5 border border-white/10 mt-8">
// // //             {[['12K+', 'Items Found'], ['98%', 'Success'], ['200+', 'Partners']].map(([val, lbl]) => (
// // //               <div key={lbl} className="text-center flex-1">
// // //                 <p className="text-base font-extrabold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{val}</p>
// // //                 <p className="text-[10px] tracking-wide uppercase font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{lbl}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ── RIGHT PANEL – SCROLLABLE, card taller to show sign-in link ── */}
// // //       <div
// // //         className="flex-1 flex flex-col items-center justify-start pt-10 px-6 pb-8 overflow-y-auto"
// // //         style={{ background: '#f4f7fd' }}
// // //       >
// // //         <button
// // //           onClick={() => navigate('/')}
// // //           className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#1a56db] transition-colors bg-white border border-gray-200 hover:border-[#1a56db] rounded-xl px-3 py-1.5 shadow-sm z-20"
// // //         >
// // //           <ArrowLeft size={12} /> Back
// // //         </button>

// // //         {/* Card with increased minimum height */}
// // //         <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-100/30 overflow-hidden flex flex-col min-h-[560px]">
// // //           <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

// // //           {/* Step tabs header */}
// // //           <div className="flex items-center justify-center gap-2 pt-3 pb-1 px-6 flex-shrink-0">
// // //             {STEPS.map(({ id, label }) => (
// // //               <div key={id} className="flex items-center gap-2">
// // //                 <div className="flex items-center gap-1.5">
// // //                   <div
// // //                     className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all"
// // //                     style={{
// // //                       background: step > id ? '#10b981' : step === id ? '#1a56db' : '#e8eef8',
// // //                       color: step >= id ? '#fff' : '#94a3b8',
// // //                     }}
// // //                   >
// // //                     {step > id
// // //                       ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
// // //                       : id + 1
// // //                     }
// // //                   </div>
// // //                   <span
// // //                     className="text-[11px] font-bold tracking-wide uppercase hidden sm:block"
// // //                     style={{ color: step === id ? '#1a56db' : step > id ? '#10b981' : '#94a3b8' }}
// // //                   >
// // //                     {label}
// // //                   </span>
// // //                 </div>
// // //                 {id < STEPS.length - 1 && (
// // //                   <div
// // //                     className="w-8 h-px mx-1"
// // //                     style={{ background: step > id ? '#10b981' : '#e2e8f0' }}
// // //                   />
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="px-6 py-3 flex-1 flex flex-col">
// // //             <div className="flex-1">
// // //               {/* Logo – same size */}
// // //               <div className="flex justify-center mb-2">
// // //                 <img
// // //                   src={logoSrc}
// // //                   alt="PataChako"
// // //                   className="w-28 h-28 object-contain drop-shadow-md"
// // //                 />
// // //               </div>

// // //               {/* Step heading */}
// // //               <div className="mb-3 text-center">
// // //                 <h1
// // //                   className="text-xl font-extrabold text-gray-900 tracking-tight"
// // //                   style={{ fontFamily: "'Sora', sans-serif" }}
// // //                 >
// // //                   {step === 0 && 'Personal Details'}
// // //                   {step === 1 && 'Secure Your Account'}
// // //                   {step === 2 && 'Your Location'}
// // //                 </h1>
// // //                 <p className="text-xs text-gray-400 mt-1">
// // //                   {step === 0 && 'Tell us your basic info to get started.'}
// // //                   {step === 1 && 'Set a strong password to protect your account.'}
// // //                   {step === 2 && 'Optional — helps match you with nearby lost items.'}
// // //                 </p>
// // //               </div>

// // //               {error && (
// // //                 <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl mb-3">
// // //                   <span className="font-bold shrink-0">!</span>
// // //                   <span>{error}</span>
// // //                 </div>
// // //               )}

// // //               {/* Step forms – unchanged, just compact */}
// // //               {step === 0 && (
// // //                 <div className="space-y-3">
// // //                   <div>
// // //                     <label className={labelClass}>Full Name</label>
// // //                     <input name="name" placeholder="e.g. Amina Hassan" value={form.name} onChange={handleChange} className={inputClass} required />
// // //                   </div>
// // //                   <div>
// // //                     <label className={labelClass}>Email Address</label>
// // //                     <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
// // //                   </div>
// // //                   <div>
// // //                     <label className={labelClass}>Mobile Number</label>
// // //                     <div className="flex gap-2">
// // //                       <div className="flex items-center gap-1 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs text-gray-600 font-semibold flex-shrink-0">
// // //                         🇹🇿 +255
// // //                       </div>
// // //                       <input name="mobile" type="tel" placeholder="7XX XXX XXX" value={form.mobile} onChange={handleChange} className={inputClass} required />
// // //                     </div>
// // //                   </div>
// // //                   <button type="button" onClick={nextStep} className="w-full mt-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 active:scale-[0.99]" style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}>
// // //                     Continue <ChevronRight size={14} />
// // //                   </button>
// // //                 </div>
// // //               )}

// // //               {step === 1 && (
// // //                 <div className="space-y-3">
// // //                   <div>
// // //                     <label className={labelClass}>Password</label>
// // //                     <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#1a56db] focus-within:ring-2 focus-within:ring-[#1a56db]/15 focus-within:bg-white">
// // //                       <input type={showPass ? 'text' : 'password'} name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none" required />
// // //                       <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1} className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors">
// // //                         {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                   <div>
// // //                     <div className="flex gap-1 mb-1.5">
// // //                       {[1, 2, 3, 4].map(i => (
// // //                         <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{
// // //                           background: form.password.length === 0 ? '#e2e8f0'
// // //                             : form.password.length < 4 && i === 1 ? '#ef4444'
// // //                             : form.password.length < 6 && i <= 2 ? '#f59e0b'
// // //                             : form.password.length < 8 && i <= 3 ? '#10b981'
// // //                             : form.password.length >= 8 ? '#1a56db'
// // //                             : '#e2e8f0'
// // //                         }} />
// // //                       ))}
// // //                     </div>
// // //                     <p className="text-[11px] font-medium" style={{ color: form.password.length === 0 ? '#94a3b8' : form.password.length < 4 ? '#ef4444' : form.password.length < 6 ? '#f59e0b' : form.password.length < 8 ? '#10b981' : '#1a56db' }}>
// // //                       {form.password.length === 0 ? 'Enter a password' : form.password.length < 4 ? 'Too weak' : form.password.length < 6 ? 'Could be stronger' : form.password.length < 8 ? 'Good password' : 'Strong password ✓'}
// // //                     </p>
// // //                   </div>
// // //                   <div className="flex gap-3 pt-1">
// // //                     <button type="button" onClick={() => { setStep(0); setError(''); }} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
// // //                       <ChevronLeft size={14} /> Back
// // //                     </button>
// // //                     <button type="button" onClick={nextStep} className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95" style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}>
// // //                       Continue <ChevronRight size={14} />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {step === 2 && (
// // //                 <form onSubmit={handleSubmit} className="space-y-3">
// // //                   <div className="flex items-start gap-2.5 p-3 rounded-xl text-xs bg-blue-50/60 border border-blue-100">
// // //                     <MapPin size={14} className="text-[#1a56db] mt-0.5 flex-shrink-0" />
// // //                     <p className="text-blue-700 leading-relaxed">
// // //                       Adding your location helps match you with nearby items. This is entirely optional.
// // //                     </p>
// // //                   </div>
// // //                   <div>
// // //                     <label className={labelClass}>Location Name</label>
// // //                     <input name="location_name" placeholder="e.g. Kijitonyama, Dar es Salaam" value={form.location_name} onChange={handleChange} className={inputClass} disabled={loading} />
// // //                   </div>
// // //                   <div className="grid grid-cols-2 gap-3">
// // //                     <div>
// // //                       <label className={labelClass}>Latitude</label>
// // //                       <input name="location_lat" placeholder="-6.7924" value={form.location_lat} onChange={handleChange} className={inputClass} disabled={loading} />
// // //                     </div>
// // //                     <div>
// // //                       <label className={labelClass}>Longitude</label>
// // //                       <input name="location_long" placeholder="39.2083" value={form.location_long} onChange={handleChange} className={inputClass} disabled={loading} />
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex gap-3 pt-1">
// // //                     <button type="button" onClick={() => { setStep(1); setError(''); }} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
// // //                       <ChevronLeft size={14} /> Back
// // //                     </button>
// // //                     <button type="submit" disabled={loading} className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 disabled:opacity-70" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}>
// // //                       {loading ? (
// // //                         <>
// // //                           <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // //                           Creating…
// // //                         </>
// // //                       ) : (
// // //                         <>Create Account ✓</>
// // //                       )}
// // //                     </button>
// // //                   </div>
// // //                 </form>
// // //               )}
// // //             </div>

// // //             {/* Sign‑in link – now fully visible inside the taller card */}
// // //             <div className="mt-auto pt-2 border-t border-gray-100 text-center">
// // //               <p className="text-sm text-gray-500">
// // //                 Already have an account?{' '}
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => navigate('/login')}
// // //                   className="font-bold text-[#1a56db] hover:underline"
// // //                 >
// // //                   Sign in
// // //                 </button>
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <p className="text-[11px] text-gray-400 mt-4 text-center">
// // //           By registering you agree to our Terms & Privacy Policy.
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   ArrowLeft, Eye, EyeOff, MapPin, ChevronRight, ChevronLeft,
// //   UserCircle, Lock
// // } from 'lucide-react';
// // import { createAccount } from '../../api/auth';
// // import logoSrc from '/src/assets/pata-logo.png';
// // import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

// // const STEPS = [
// //   { id: 0, label: 'Personal', icon: UserCircle },
// //   { id: 1, label: 'Security', icon: Lock },
// //   { id: 2, label: 'Location', icon: MapPin },
// // ];

// // export default function RegisterPage() {
// //   const [step, setStep] = useState(0);
// //   const [form, setForm] = useState({
// //     name: '',
// //     email: '',
// //     mobile: '',
// //     password: '',
// //     location_name: '',
// //     location_lat: '',
// //     location_long: ''
// //   });
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [showPass, setShowPass] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //     setError('');
// //   };

// //   const validateStep = () => {
// //     if (step === 0) {
// //       if (!form.name.trim()) return 'Please enter your full name.';
// //       if (!form.email.trim()) return 'Please enter your email address.';
// //       if (!form.mobile.trim()) return 'Please enter your mobile number.';
// //     }
// //     if (step === 1) {
// //       if (!form.password) return 'Please set a password.';
// //       if (form.password.length < 6) return 'Password must be at least 6 characters.';
// //     }
// //     return null;
// //   };

// //   const nextStep = () => {
// //     const err = validateStep();
// //     if (err) { setError(err); return; }
// //     setError('');
// //     setStep(step + 1);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);
// //     try {
// //       const payload = {
// //         ...form,
// //         location_lat: parseFloat(form.location_lat) || 0,
// //         location_long: parseFloat(form.location_long) || 0,
// //       };
// //       await createAccount(payload);
// //       navigate('/verify-otp', { state: { email: form.email } });
// //     } catch (err) {
// //       setError(err.message || 'Registration failed. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const inputClass = "w-full px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-[#f8fafc] border border-gray-200 rounded-xl outline-none transition-all focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/15 focus:bg-white disabled:opacity-50";
// //   const labelClass = "block text-xs font-semibold text-gray-600 mb-1 tracking-wide uppercase";

// //   return (
// //     <div className="h-screen flex overflow-hidden bg-white">
// //       {/* ── LEFT PANEL – STATIC ── */}
// //       <div
// //         className="hidden lg:flex w-[420px] flex-shrink-0 h-full relative flex-col overflow-hidden"
// //         style={{ background: 'linear-gradient(160deg, #1a56db 0%, #1240a8 55%, #0b2878 100%)' }}
// //       >
// //         <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
// //         <div className="absolute top-1/2 -right-28 w-[340px] h-[340px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
// //         <div className="absolute -bottom-24 -left-16 w-[280px] h-[280px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

// //         <div className="relative z-10 flex flex-col h-full px-10 py-12">
// //           <div>
// //             <div className="flex items-center gap-2 mb-8">
// //               <span className="text-xl font-black text-white tracking-wider" style={{ fontFamily: "'Sora', sans-serif" }}>PATACHAKO</span>
// //               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
// //             </div>
// //             <h2 className="text-3xl font-extrabold text-white leading-snug tracking-tight mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
// //               Join Tanzania's<br />Trusted Lost<br />& Found Network
// //             </h2>
// //             <p className="text-xs leading-relaxed max-w-[300px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
// //               Create your free account and reconnect with what matters most — backed by verified partners nationwide.
// //             </p>
// //           </div>

// //           <div className="flex flex-col gap-3 mt-8">
// //             {STEPS.map(({ id, label, icon: Icon }) => (
// //               <div
// //                 key={id}
// //                 className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
// //                 style={{
// //                   background: step === id ? 'rgba(255,255,255,0.15)' : 'transparent',
// //                   border: step === id ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
// //                 }}
// //               >
// //                 <div
// //                   className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
// //                   style={{
// //                     background: step > id ? '#10b981' : step === id ? '#fff' : 'rgba(255,255,255,0.1)',
// //                   }}
// //                 >
// //                   {step > id
// //                     ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
// //                     : <Icon size={14} color={step === id ? '#1a56db' : 'rgba(255,255,255,0.5)'} />
// //                   }
// //                 </div>
// //                 <span
// //                   className="text-sm font-semibold"
// //                   style={{ color: step === id ? '#fff' : step > id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)' }}
// //                 >
// //                   {label}
// //                 </span>
// //                 {step === id && (
// //                   <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
// //                     Active
// //                   </span>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="rounded-xl px-4 py-3.5 flex justify-between bg-white/5 border border-white/10 mt-8">
// //             {[['12K+', 'Items Found'], ['98%', 'Success'], ['200+', 'Partners']].map(([val, lbl]) => (
// //               <div key={lbl} className="text-center flex-1">
// //                 <p className="text-base font-extrabold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{val}</p>
// //                 <p className="text-[10px] tracking-wide uppercase font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{lbl}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── RIGHT PANEL – SCROLLABLE ── */}
// //       <div
// //         className="flex-1 flex flex-col items-center justify-start pt-10 px-6 pb-8 overflow-y-auto"
// //         style={{ background: '#f4f7fd' }}
// //       >
// //         <button
// //           onClick={() => navigate('/')}
// //           className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#1a56db] transition-colors bg-white border border-gray-200 hover:border-[#1a56db] rounded-xl px-3 py-1.5 shadow-sm z-20"
// //         >
// //           <ArrowLeft size={12} /> Back
// //         </button>

// //         <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-100/30 overflow-hidden flex flex-col min-h-[560px]">
// //           <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

// //           <div className="flex items-center justify-center gap-2 pt-3 pb-1 px-6 flex-shrink-0">
// //             {STEPS.map(({ id, label }) => (
// //               <div key={id} className="flex items-center gap-2">
// //                 <div className="flex items-center gap-1.5">
// //                   <div
// //                     className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all"
// //                     style={{
// //                       background: step > id ? '#10b981' : step === id ? '#1a56db' : '#e8eef8',
// //                       color: step >= id ? '#fff' : '#94a3b8',
// //                     }}
// //                   >
// //                     {step > id
// //                       ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
// //                       : id + 1
// //                     }
// //                   </div>
// //                   <span
// //                     className="text-[11px] font-bold tracking-wide uppercase hidden sm:block"
// //                     style={{ color: step === id ? '#1a56db' : step > id ? '#10b981' : '#94a3b8' }}
// //                   >
// //                     {label}
// //                   </span>
// //                 </div>
// //                 {id < STEPS.length - 1 && (
// //                   <div
// //                     className="w-8 h-px mx-1"
// //                     style={{ background: step > id ? '#10b981' : '#e2e8f0' }}
// //                   />
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="px-6 py-3 flex-1 flex flex-col">
// //             <div className="flex-1">
// //               <div className="flex justify-center mb-2">
// //                 <img
// //                   src={logoSrc}
// //                   alt="PataChako"
// //                   className="w-28 h-28 object-contain drop-shadow-md"
// //                 />
// //               </div>

// //               <div className="mb-3 text-center">
// //                 <h1
// //                   className="text-xl font-extrabold text-gray-900 tracking-tight"
// //                   style={{ fontFamily: "'Sora', sans-serif" }}
// //                 >
// //                   {step === 0 && 'Personal Details'}
// //                   {step === 1 && 'Secure Your Account'}
// //                   {step === 2 && 'Your Location'}
// //                 </h1>
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   {step === 0 && 'Tell us your basic info to get started.'}
// //                   {step === 1 && 'Set a strong password to protect your account.'}
// //                   {step === 2 && 'Optional — helps match you with nearby lost items.'}
// //                 </p>
// //               </div>

// //               {error && (
// //                 <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl mb-3">
// //                   <span className="font-bold shrink-0">!</span>
// //                   <span>{error}</span>
// //                 </div>
// //               )}

// //               {/* Step 0: Personal Details */}
// //               {step === 0 && (
// //                 <div className="space-y-3">
// //                   <div>
// //                     <label className={labelClass}>Full Name</label>
// //                     <input name="name" placeholder="e.g. Amina Hassan" value={form.name} onChange={handleChange} className={inputClass} required />
// //                   </div>
// //                   <div>
// //                     <label className={labelClass}>Email Address</label>
// //                     <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
// //                   </div>
// //                   <div>
// //                     <label className={labelClass}>Mobile Number</label>
// //                     <div className="flex gap-2">
// //                       <div className="flex items-center gap-1 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs text-gray-600 font-semibold flex-shrink-0">
// //                         🇹🇿 +255
// //                       </div>
// //                       <input name="mobile" type="tel" placeholder="7XX XXX XXX" value={form.mobile} onChange={handleChange} className={inputClass} required />
// //                     </div>
// //                   </div>
// //                   <button type="button" onClick={nextStep} className="w-full mt-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 active:scale-[0.99]" style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}>
// //                     Continue <ChevronRight size={14} />
// //                   </button>
// //                 </div>
// //               )}

// //               {/* Step 1: Security */}
// //               {step === 1 && (
// //                 <div className="space-y-3">
// //                   <div>
// //                     <label className={labelClass}>Password</label>
// //                     <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#1a56db] focus-within:ring-2 focus-within:ring-[#1a56db]/15 focus-within:bg-white">
// //                       <input type={showPass ? 'text' : 'password'} name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none" required />
// //                       <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1} className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors">
// //                         {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <div className="flex gap-1 mb-1.5">
// //                       {[1, 2, 3, 4].map(i => (
// //                         <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{
// //                           background: form.password.length === 0 ? '#e2e8f0'
// //                             : form.password.length < 4 && i === 1 ? '#ef4444'
// //                             : form.password.length < 6 && i <= 2 ? '#f59e0b'
// //                             : form.password.length < 8 && i <= 3 ? '#10b981'
// //                             : form.password.length >= 8 ? '#1a56db'
// //                             : '#e2e8f0'
// //                         }} />
// //                       ))}
// //                     </div>
// //                     <p className="text-[11px] font-medium" style={{ color: form.password.length === 0 ? '#94a3b8' : form.password.length < 4 ? '#ef4444' : form.password.length < 6 ? '#f59e0b' : form.password.length < 8 ? '#10b981' : '#1a56db' }}>
// //                       {form.password.length === 0 ? 'Enter a password' : form.password.length < 4 ? 'Too weak' : form.password.length < 6 ? 'Could be stronger' : form.password.length < 8 ? 'Good password' : 'Strong password ✓'}
// //                     </p>
// //                   </div>
// //                   <div className="flex gap-3 pt-1">
// //                     <button type="button" onClick={() => { setStep(0); setError(''); }} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
// //                       <ChevronLeft size={14} /> Back
// //                     </button>
// //                     <button type="button" onClick={nextStep} className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95" style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}>
// //                       Continue <ChevronRight size={14} />
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Step 2: Location with LocationPicker */}
// //               {step === 2 && (
// //                 <form onSubmit={handleSubmit} className="space-y-3">
// //                   <div className="flex items-start gap-2.5 p-3 rounded-xl text-xs bg-blue-50/60 border border-blue-100">
// //                     <MapPin size={14} className="text-[#1a56db] mt-0.5 flex-shrink-0" />
// //                     <p className="text-blue-700 leading-relaxed">
// //                       Adding your location helps match you with nearby items. This is entirely optional.
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <label className={labelClass}>Your Location</label>
// //                     <LocationPicker
// //                       locationName={form.location_name}
// //                       onChange={({ locationName, lat, lng }) => {
// //                         setForm(prev => ({
// //                           ...prev,
// //                           location_name: locationName,
// //                           location_lat: lat.toString(),
// //                           location_long: lng.toString(),
// //                         }));
// //                       }}
// //                       initialLat={form.location_lat ? parseFloat(form.location_lat) : undefined}
// //                       initialLng={form.location_long ? parseFloat(form.location_long) : undefined}
// //                       placeholder="Search your area…"
// //                       disabled={loading}
// //                     />
// //                   </div>

// //                   <div className="flex gap-3 pt-1">
// //                     <button type="button" onClick={() => { setStep(1); setError(''); }} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
// //                       <ChevronLeft size={14} /> Back
// //                     </button>
// //                     <button type="submit" disabled={loading} className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 disabled:opacity-70" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}>
// //                       {loading ? (
// //                         <>
// //                           <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                           Creating…
// //                         </>
// //                       ) : (
// //                         <>Create Account ✓</>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               )}
// //             </div>

// //             {/* Sign‑in link */}
// //             <div className="mt-auto pt-2 border-t border-gray-100 text-center">
// //               <p className="text-sm text-gray-500">
// //                 Already have an account?{' '}
// //                 <button
// //                   type="button"
// //                   onClick={() => navigate('/login')}
// //                   className="font-bold text-[#1a56db] hover:underline"
// //                 >
// //                   Sign in
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <p className="text-[11px] text-gray-400 mt-4 text-center">
// //           By registering you agree to our Terms & Privacy Policy.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft, Eye, EyeOff, MapPin, ChevronRight, ChevronLeft,
//   UserCircle, Lock
// } from 'lucide-react';
// import { createAccount } from '../../api/auth';
// import logoSrc from '/src/assets/pata-logo.png';
// import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

// const STEPS = [
//   { id: 0, label: 'Personal', icon: UserCircle },
//   { id: 1, label: 'Security', icon: Lock },
//   { id: 2, label: 'Location', icon: MapPin },
// ];

// export default function RegisterPage() {
//   const [step, setStep] = useState(0);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     password: '',
//     location_name: '',
//     location_lat: '',
//     location_long: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPass, setShowPass] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const validateStep = () => {
//     if (step === 0) {
//       if (!form.name.trim()) return 'Please enter your full name.';
//       if (!form.email.trim()) return 'Please enter your email address.';
//       if (!form.mobile.trim()) return 'Please enter your mobile number.';
//     }
//     if (step === 1) {
//       if (!form.password) return 'Please set a password.';
//       if (form.password.length < 6) return 'Password must be at least 6 characters.';
//     }
//     return null;
//   };

//   const nextStep = () => {
//     const err = validateStep();
//     if (err) { setError(err); return; }
//     setError('');
//     setStep(step + 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const payload = {
//         ...form,
//         location_lat: parseFloat(form.location_lat) || 0,
//         location_long: parseFloat(form.location_long) || 0,
//       };
//       await createAccount(payload);
//       navigate('/verify-otp', { state: { email: form.email } });
//     } catch (err) {
//       setError(err.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass = "w-full px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-[#f8fafc] border border-gray-200 rounded-xl outline-none transition-all focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/15 focus:bg-white disabled:opacity-50";
//   const labelClass = "block text-xs font-semibold text-gray-600 mb-1 tracking-wide uppercase";

//   return (
//     <div className="h-screen flex overflow-hidden bg-white">
//       {/* ── LEFT PANEL – STATIC ── */}
//       <div
//         className="hidden lg:flex w-[420px] flex-shrink-0 h-full relative flex-col overflow-hidden"
//         style={{ background: 'linear-gradient(160deg, #1a56db 0%, #1240a8 55%, #0b2878 100%)' }}
//       >
//         <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
//         <div className="absolute top-1/2 -right-28 w-[340px] h-[340px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
//         <div className="absolute -bottom-24 -left-16 w-[280px] h-[280px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

//         <div className="relative z-10 flex flex-col h-full px-10 py-12">
//           <div>
//             <div className="flex items-center gap-2 mb-8">
//               <span className="text-xl font-black text-white tracking-wider" style={{ fontFamily: "'Sora', sans-serif" }}>PATACHAKO</span>
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
//             </div>
//             <h2 className="text-3xl font-extrabold text-white leading-snug tracking-tight mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
//               Join Tanzania's<br />Trusted Lost<br />& Found Network
//             </h2>
//             <p className="text-xs leading-relaxed max-w-[300px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
//               Create your free account and reconnect with what matters most — backed by verified partners nationwide.
//             </p>
//           </div>

//           <div className="flex flex-col gap-3 mt-8">
//             {STEPS.map(({ id, label, icon: Icon }) => (
//               <div
//                 key={id}
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
//                 style={{
//                   background: step === id ? 'rgba(255,255,255,0.15)' : 'transparent',
//                   border: step === id ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
//                 }}
//               >
//                 <div
//                   className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
//                   style={{
//                     background: step > id ? '#10b981' : step === id ? '#fff' : 'rgba(255,255,255,0.1)',
//                   }}
//                 >
//                   {step > id
//                     ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
//                     : <Icon size={14} color={step === id ? '#1a56db' : 'rgba(255,255,255,0.5)'} />
//                   }
//                 </div>
//                 <span
//                   className="text-sm font-semibold"
//                   style={{ color: step === id ? '#fff' : step > id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)' }}
//                 >
//                   {label}
//                 </span>
//                 {step === id && (
//                   <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
//                     Active
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="rounded-xl px-4 py-3.5 flex justify-between bg-white/5 border border-white/10 mt-8">
//             {[['12K+', 'Items Found'], ['98%', 'Success'], ['200+', 'Partners']].map(([val, lbl]) => (
//               <div key={lbl} className="text-center flex-1">
//                 <p className="text-base font-extrabold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{val}</p>
//                 <p className="text-[10px] tracking-wide uppercase font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{lbl}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── RIGHT PANEL – SCROLLABLE ── */}
//       <div
//         className="flex-1 flex flex-col items-center justify-start pt-10 px-6 pb-8 overflow-y-auto"
//         style={{ background: '#f4f7fd' }}
//       >
//         <button
//           onClick={() => navigate('/')}
//           className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#1a56db] transition-colors bg-white border border-gray-200 hover:border-[#1a56db] rounded-xl px-3 py-1.5 shadow-sm z-20"
//         >
//           <ArrowLeft size={12} /> Back
//         </button>

//         <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-100/30 overflow-hidden flex flex-col min-h-[560px]">
//           <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

//           <div className="flex items-center justify-center gap-2 pt-3 pb-1 px-6 flex-shrink-0">
//             {STEPS.map(({ id, label }) => (
//               <div key={id} className="flex items-center gap-2">
//                 <div className="flex items-center gap-1.5">
//                   <div
//                     className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all"
//                     style={{
//                       background: step > id ? '#10b981' : step === id ? '#1a56db' : '#e8eef8',
//                       color: step >= id ? '#fff' : '#94a3b8',
//                     }}
//                   >
//                     {step > id
//                       ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
//                       : id + 1
//                     }
//                   </div>
//                   <span
//                     className="text-[11px] font-bold tracking-wide uppercase hidden sm:block"
//                     style={{ color: step === id ? '#1a56db' : step > id ? '#10b981' : '#94a3b8' }}
//                   >
//                     {label}
//                   </span>
//                 </div>
//                 {id < STEPS.length - 1 && (
//                   <div
//                     className="w-8 h-px mx-1"
//                     style={{ background: step > id ? '#10b981' : '#e2e8f0' }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="px-6 py-3 flex-1 flex flex-col">
//             <div className="flex-1 flex flex-col">
//               <div className="flex justify-center mb-2">
//                 <img
//                   src={logoSrc}
//                   alt="PataChako"
//                   className="w-28 h-28 object-contain drop-shadow-md"
//                 />
//               </div>

//               <div className="mb-3 text-center">
//                 <h1
//                   className="text-xl font-extrabold text-gray-900 tracking-tight"
//                   style={{ fontFamily: "'Sora', sans-serif" }}
//                 >
//                   {step === 0 && 'Personal Details'}
//                   {step === 1 && 'Secure Your Account'}
//                   {step === 2 && 'Your Location'}
//                 </h1>
//                 <p className="text-xs text-gray-400 mt-1">
//                   {step === 0 && 'Tell us your basic info to get started.'}
//                   {step === 1 && 'Set a strong password to protect your account.'}
//                   {step === 2 && 'Optional — helps match you with nearby lost items.'}
//                 </p>
//               </div>

//               {error && (
//                 <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl mb-3">
//                   <span className="font-bold shrink-0">!</span>
//                   <span>{error}</span>
//                 </div>
//               )}

//               {/* Step 0: Personal Details */}
//               {step === 0 && (
//                 <div className="space-y-3">
//                   <div>
//                     <label className={labelClass}>Full Name</label>
//                     <input name="name" placeholder="e.g. Amina Hassan" value={form.name} onChange={handleChange} className={inputClass} required />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Email Address</label>
//                     <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Mobile Number</label>
//                     <div className="flex gap-2">
//                       <div className="flex items-center gap-1 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs text-gray-600 font-semibold flex-shrink-0">
//                         🇹🇿 +255
//                       </div>
//                       <input name="mobile" type="tel" placeholder="7XX XXX XXX" value={form.mobile} onChange={handleChange} className={inputClass} required />
//                     </div>
//                   </div>
//                   <button type="button" onClick={nextStep} className="w-full mt-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 active:scale-[0.99]" style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}>
//                     Continue <ChevronRight size={14} />
//                   </button>
//                 </div>
//               )}

//               {/* Step 1: Security */}
//               {step === 1 && (
//                 <div className="space-y-3">
//                   <div>
//                     <label className={labelClass}>Password</label>
//                     <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#1a56db] focus-within:ring-2 focus-within:ring-[#1a56db]/15 focus-within:bg-white">
//                       <input type={showPass ? 'text' : 'password'} name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none" required />
//                       <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1} className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors">
//                         {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex gap-1 mb-1.5">
//                       {[1, 2, 3, 4].map(i => (
//                         <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{
//                           background: form.password.length === 0 ? '#e2e8f0'
//                             : form.password.length < 4 && i === 1 ? '#ef4444'
//                             : form.password.length < 6 && i <= 2 ? '#f59e0b'
//                             : form.password.length < 8 && i <= 3 ? '#10b981'
//                             : form.password.length >= 8 ? '#1a56db'
//                             : '#e2e8f0'
//                         }} />
//                       ))}
//                     </div>
//                     <p className="text-[11px] font-medium" style={{ color: form.password.length === 0 ? '#94a3b8' : form.password.length < 4 ? '#ef4444' : form.password.length < 6 ? '#f59e0b' : form.password.length < 8 ? '#10b981' : '#1a56db' }}>
//                       {form.password.length === 0 ? 'Enter a password' : form.password.length < 4 ? 'Too weak' : form.password.length < 6 ? 'Could be stronger' : form.password.length < 8 ? 'Good password' : 'Strong password ✓'}
//                     </p>
//                   </div>
//                   <div className="flex gap-3 pt-1">
//                     <button type="button" onClick={() => { setStep(0); setError(''); }} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
//                       <ChevronLeft size={14} /> Back
//                     </button>
//                     <button type="button" onClick={nextStep} className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95" style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}>
//                       Continue <ChevronRight size={14} />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Step 2: Location with LocationPicker (compact map + pinned submit) */}
//               {step === 2 && (
//                 <form onSubmit={handleSubmit} className="flex flex-col flex-1">
//                   {/* Scrollable content so the map/picker never pushes the button off-screen */}
//                   <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
//                     <div className="flex items-start gap-2.5 p-3 rounded-xl text-xs bg-blue-50/60 border border-blue-100">
//                       <MapPin size={14} className="text-[#1a56db] mt-0.5 flex-shrink-0" />
//                       <p className="text-blue-700 leading-relaxed">
//                         Adding your location helps match you with nearby items. This is entirely optional.
//                       </p>
//                     </div>

//                     <div>
//                       <label className={labelClass}>Your Location</label>

//                       {/* Compact wrapper — shrinks only the map, nothing else on the page */}
//                       <div className="location-picker-compact rounded-xl overflow-hidden border border-gray-200">
//                         <LocationPicker
//                           locationName={form.location_name}
//                           onChange={({ locationName, lat, lng }) => {
//                             setForm(prev => ({
//                               ...prev,
//                               location_name: locationName,
//                               location_lat: lat.toString(),
//                               location_long: lng.toString(),
//                             }));
//                           }}
//                           initialLat={form.location_lat ? parseFloat(form.location_lat) : undefined}
//                           initialLng={form.location_long ? parseFloat(form.location_long) : undefined}
//                           placeholder="Search your area…"
//                           disabled={loading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Pinned action row — always visible regardless of picker height */}
//                   <div className="flex gap-3 pt-3 mt-3 border-t border-gray-100 flex-shrink-0">
//                     <button type="button" onClick={() => { setStep(1); setError(''); }} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
//                       <ChevronLeft size={14} /> Back
//                     </button>
//                     <button type="submit" disabled={loading} className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 disabled:opacity-70" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}>
//                       {loading ? (
//                         <>
//                           <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                           Creating…
//                         </>
//                       ) : (
//                         <>Create Account ✓</>
//                       )}
//                     </button>
//                   </div>

//                   {/* Scoped style: shrinks the map only within this instance of LocationPicker */}
//                   <style>{`
//                     .location-picker-compact .leaflet-container {
//                       height: 150px !important;
//                       min-height: 150px !important;
//                     }
//                   `}</style>
//                 </form>
//               )}
//             </div>

//             {/* Sign‑in link */}
//             <div className="mt-auto pt-2 border-t border-gray-100 text-center">
//               <p className="text-sm text-gray-500">
//                 Already have an account?{' '}
//                 <button
//                   type="button"
//                   onClick={() => navigate('/login')}
//                   className="font-bold text-[#1a56db] hover:underline"
//                 >
//                   Sign in
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>

//         <p className="text-[11px] text-gray-400 mt-4 text-center">
//           By registering you agree to our Terms & Privacy Policy.
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Eye, EyeOff, MapPin, ChevronRight, ChevronLeft,
  UserCircle, Lock
} from 'lucide-react';
import { createAccount } from '../../api/auth';
import logoSrc from '/src/assets/pata-logo.png';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

const STEPS = [
  { id: 0, label: 'Personal', icon: UserCircle },
  { id: 1, label: 'Security', icon: Lock },
  { id: 2, label: 'Location', icon: MapPin },
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    location_name: '',
    location_lat: '',
    location_long: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validateStep = () => {
    if (step === 0) {
      if (!form.name.trim()) return 'Please enter your full name.';
      if (!form.email.trim()) return 'Please enter your email address.';
      if (!form.mobile.trim()) return 'Please enter your mobile number.';
    }
    if (step === 1) {
      if (!form.password) return 'Please set a password.';
      if (form.password.length < 6) return 'Password must be at least 6 characters.';
    }
    return null;
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        location_lat: parseFloat(form.location_lat) || 0,
        location_long: parseFloat(form.location_long) || 0,
      };
      await createAccount(payload);
      navigate('/verify-otp', { state: { email: form.email } });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-[#f8fafc] border border-gray-200 rounded-xl outline-none transition-all focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/15 focus:bg-white disabled:opacity-50";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 tracking-wide uppercase";

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* ── LEFT PANEL – STATIC ── */}
      <div
        className="hidden lg:flex w-[420px] flex-shrink-0 h-full relative flex-col overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a56db 0%, #1240a8 55%, #0b2878 100%)' }}
      >
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute top-1/2 -right-28 w-[340px] h-[340px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute -bottom-24 -left-16 w-[280px] h-[280px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative z-10 flex flex-col h-full px-10 py-12">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xl font-black text-white tracking-wider" style={{ fontFamily: "'Sora', sans-serif" }}>PATACHAKO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
            <h2 className="text-3xl font-extrabold text-white leading-snug tracking-tight mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              Join Tanzania's<br />Trusted Lost<br />& Found Network
            </h2>
            <p className="text-xs leading-relaxed max-w-[300px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Create your free account and reconnect with what matters most — backed by verified partners nationwide.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            {STEPS.map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{
                  background: step === id ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: step === id ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: step > id ? '#10b981' : step === id ? '#fff' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {step > id
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    : <Icon size={14} color={step === id ? '#1a56db' : 'rgba(255,255,255,0.5)'} />
                  }
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: step === id ? '#fff' : step > id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)' }}
                >
                  {label}
                </span>
                {step === id && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                    Active
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl px-4 py-3.5 flex justify-between bg-white/5 border border-white/10 mt-8">
            {[['12K+', 'Items Found'], ['98%', 'Success'], ['200+', 'Partners']].map(([val, lbl]) => (
              <div key={lbl} className="text-center flex-1">
                <p className="text-base font-extrabold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{val}</p>
                <p className="text-[10px] tracking-wide uppercase font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL – SCROLLABLE ── */}
      <div
        className="flex-1 flex flex-col items-center justify-start pt-6 px-6 pb-6 overflow-y-auto"
        style={{ background: '#f4f7fd' }}
      >
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#1a56db] transition-colors bg-white border border-gray-200 hover:border-[#1a56db] rounded-xl px-3 py-1.5 shadow-sm z-20"
        >
          <ArrowLeft size={12} /> Back
        </button>

        <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-100/30 overflow-hidden flex flex-col">
          <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

          <div className="flex items-center justify-center gap-2 pt-3 pb-1 px-6 flex-shrink-0">
            {STEPS.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all"
                    style={{
                      background: step > id ? '#10b981' : step === id ? '#1a56db' : '#e8eef8',
                      color: step >= id ? '#fff' : '#94a3b8',
                    }}
                  >
                    {step > id
                      ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      : id + 1
                    }
                  </div>
                  <span
                    className="text-[11px] font-bold tracking-wide uppercase hidden sm:block"
                    style={{ color: step === id ? '#1a56db' : step > id ? '#10b981' : '#94a3b8' }}
                  >
                    {label}
                  </span>
                </div>
                {id < STEPS.length - 1 && (
                  <div
                    className="w-8 h-px mx-1"
                    style={{ background: step > id ? '#10b981' : '#e2e8f0' }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="px-6 py-3 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              {/* Logo — shrunk on the Location step to save vertical space */}
              <div className="flex justify-center mb-2">
                <img
                  src={logoSrc}
                  alt="PataChako"
                  className={`object-contain drop-shadow-md transition-all ${step === 2 ? 'w-14 h-14' : 'w-28 h-28'}`}
                />
              </div>

              <div className={step === 2 ? 'mb-2 text-center' : 'mb-3 text-center'}>
                <h1
                  className="text-xl font-extrabold text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {step === 0 && 'Personal Details'}
                  {step === 1 && 'Secure Your Account'}
                  {step === 2 && 'Your Location'}
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                  {step === 0 && 'Tell us your basic info to get started.'}
                  {step === 1 && 'Set a strong password to protect your account.'}
                  {step === 2 && 'Optional — helps match you with nearby lost items.'}
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl mb-3">
                  <span className="font-bold shrink-0">!</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Step 0: Personal Details */}
              {step === 0 && (
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input name="name" placeholder="e.g. Amina Hassan" value={form.name} onChange={handleChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Mobile Number</label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs text-gray-600 font-semibold flex-shrink-0">
                        🇹🇿 +255
                      </div>
                      <input name="mobile" type="tel" placeholder="7XX XXX XXX" value={form.mobile} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>
                  <button type="button" onClick={nextStep} className="w-full mt-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 active:scale-[0.99]" style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}>
                    Continue <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 1: Security */}
              {step === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Password</label>
                    <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#1a56db] focus-within:ring-2 focus-within:ring-[#1a56db]/15 focus-within:bg-white">
                      <input type={showPass ? 'text' : 'password'} name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none" required />
                      <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1} className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-1 mb-1.5">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{
                          background: form.password.length === 0 ? '#e2e8f0'
                            : form.password.length < 4 && i === 1 ? '#ef4444'
                            : form.password.length < 6 && i <= 2 ? '#f59e0b'
                            : form.password.length < 8 && i <= 3 ? '#10b981'
                            : form.password.length >= 8 ? '#1a56db'
                            : '#e2e8f0'
                        }} />
                      ))}
                    </div>
                    <p className="text-[11px] font-medium" style={{ color: form.password.length === 0 ? '#94a3b8' : form.password.length < 4 ? '#ef4444' : form.password.length < 6 ? '#f59e0b' : form.password.length < 8 ? '#10b981' : '#1a56db' }}>
                      {form.password.length === 0 ? 'Enter a password' : form.password.length < 4 ? 'Too weak' : form.password.length < 6 ? 'Could be stronger' : form.password.length < 8 ? 'Good password' : 'Strong password ✓'}
                    </p>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => { setStep(0); setError(''); }} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button type="button" onClick={nextStep} className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95" style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}>
                      Continue <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Location — compact layout, button always visible */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2 p-2.5 rounded-xl text-xs bg-blue-50/60 border border-blue-100">
                    <MapPin size={13} className="text-[#1a56db] mt-0.5 flex-shrink-0" />
                    <p className="text-blue-700 leading-snug">
                      Adding your location helps match you with nearby items. This is entirely optional.
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>Your Location</label>

                    {/* Compact wrapper — shrinks only the map, nothing else on the page */}
                    <div className="location-picker-compact rounded-xl overflow-hidden border border-gray-200">
                      <LocationPicker
                        locationName={form.location_name}
                        onChange={({ locationName, lat, lng }) => {
                          setForm(prev => ({
                            ...prev,
                            location_name: locationName,
                            location_lat: lat.toString(),
                            location_long: lng.toString(),
                          }));
                        }}
                        initialLat={form.location_lat ? parseFloat(form.location_lat) : undefined}
                        initialLng={form.location_long ? parseFloat(form.location_long) : undefined}
                        placeholder="Search your area…"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => { setStep(1); setError(''); }} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button type="submit" disabled={loading} className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 disabled:opacity-70" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}>
                      {loading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating…
                        </>
                      ) : (
                        <>Create Account ✓</>
                      )}
                    </button>
                  </div>

                  {/* Scoped style: shrinks the map only within this instance of LocationPicker */}
                  <style>{`
                    .location-picker-compact .leaflet-container {
                      height: 120px !important;
                      min-height: 120px !important;
                    }
                  `}</style>
                </form>
              )}
            </div>

            {/* Sign‑in link */}
            {step !== 2 && (
              <div className="mt-auto pt-2 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-bold text-[#1a56db] hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mt-4 text-center">
          By registering you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}