import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, MapPin, ChevronRight, ChevronLeft,
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

// ── Validation helpers ────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
// Tanzanian mobile: after +255, 9 digits starting with 6 or 7
const MOBILE_REGEX = /^[67]\d{8}$/;

function validateEmail(email) {
  if (!email.trim()) return 'Email is required.';
  if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address.';
  return null;
}

function validateMobile(mobile) {
  const cleaned = mobile.replace(/\s/g, '');
  if (!cleaned) return 'Mobile number is required.';
  if (!MOBILE_REGEX.test(cleaned))
    return 'Enter a valid 9‑digit mobile number (starts with 6 or 7, e.g. 712345678).';
  return null;
}

function validatePassword(password) {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!PASSWORD_REGEX.test(password))
    return 'Password must include one uppercase, one lowercase, and one number.';
  return null;
}

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setFieldErrors(prev => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const validateStep = useCallback(() => {
    const errors = {};
    let firstError = '';

    if (step === 0) {
      if (!form.name.trim()) {
        errors.name = 'Full name is required.';
      }
      const emailErr = validateEmail(form.email);
      if (emailErr) errors.email = emailErr;
      const mobileErr = validateMobile(form.mobile);
      if (mobileErr) errors.mobile = mobileErr;
    }

    if (step === 1) {
      const passErr = validatePassword(form.password);
      if (passErr) errors.password = passErr;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      firstError = Object.values(errors)[0];
      setError(firstError);
      return false;
    }

    setFieldErrors({});
    setError('');
    return true;
  }, [step, form]);

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
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

      const res = await createAccount(payload);

      const code = String(res?.statusCode);

      // Check if backend returned success (600, 200, 201)
      if (code === '600' || code === '200' || code === '201') {
        // Success -> navigate to verify OTP screen
        navigate('/verify-otp', { state: { email: form.email } });
        return;
      }

      // If backend returned an error status code (like 705)
      setError(res?.message || 'Email is already registered.');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return { level: 0, label: 'Enter a password', color: '#94a3b8' };
    const length = p.length;
    const hasLower = /[a-z]/.test(p);
    const hasUpper = /[A-Z]/.test(p);
    const hasDigit = /\d/.test(p);
    const hasSpecial = /[^a-zA-Z0-9]/.test(p);

    if (length < 8) {
      if (length < 4) return { level: 1, label: 'Too weak', color: '#ef4444' };
      return { level: 1, label: 'Weak – use at least 8 characters', color: '#ef4444' };
    }

    const conditions = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
    if (conditions >= 3 && length >= 10) {
      return { level: 4, label: 'Strong password', color: '#10b981' };
    }
    if (conditions >= 2) {
      return { level: 3, label: 'Good password', color: '#1a56db' };
    }
    return { level: 2, label: 'Could be stronger – add uppercase/number', color: '#f59e0b' };
  };

  const strength = getPasswordStrength();

  const inputClass = (fieldName) =>
    `w-full px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-[#f8fafc] border rounded-xl outline-none transition-all focus:ring-2 focus:bg-white disabled:opacity-50 ${
      fieldErrors[fieldName]
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
        : 'border-gray-200 focus:border-[#1a56db] focus:ring-[#1a56db]/15'
    }`;

  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 tracking-wide uppercase";
  const errorTextClass = "text-[11px] text-red-500 mt-1 font-medium";

  return (
    <div className="min-h-screen flex overflow-hidden bg-white">
      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex w-[420px] flex-shrink-0 min-h-screen relative flex-col overflow-hidden"
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

          <div className="rounded-xl px-4 py-3.5 flex justify-between bg-white/5 border border-white/10 mt-auto">
            {[['12K+', 'Items Found'], ['98%', 'Success'], ['200+', 'Partners']].map(([val, lbl]) => (
              <div key={lbl} className="text-center flex-1">
                <p className="text-base font-extrabold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{val}</p>
                <p className="text-[10px] tracking-wide uppercase font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto"
        style={{ background: '#f4f7fd' }}
      >
        {/* Card Container */}
        <div className="w-full max-w-[460px] bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-100/30 overflow-hidden flex flex-col my-auto">
          <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

          {/* Stepper Header */}
          <div className="flex items-center justify-center gap-2 pt-6 pb-2 px-6 flex-shrink-0">
            {STEPS.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
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
                    className="text-xs font-bold tracking-wide uppercase hidden sm:block"
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

          <div className="px-6 sm:px-8 py-6 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              {/* Interactive Large Logo */}
              <div className="flex justify-center mb-3">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="focus:outline-none focus:ring-2 focus:ring-[#1a56db] rounded-2xl transition-transform hover:scale-105"
                  title="Go to home"
                >
                  <img
                    src={logoSrc}
                    alt="PataChako"
                    className="w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-xl cursor-pointer"
                  />
                </button>
              </div>

              <div className="mb-4 text-center">
                <h1
                  className="text-2xl font-extrabold text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {step === 0 && 'Personal Details'}
                  {step === 1 && 'Secure Your Account'}
                  {step === 2 && 'Your Location'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {step === 0 && 'Tell us your basic info to get started.'}
                  {step === 1 && 'Set a strong password to protect your account.'}
                  {step === 2 && 'Optional — helps match you with nearby lost items.'}
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl mb-4">
                  <span className="font-bold shrink-0">!</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Step 0: Personal Details */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      name="name"
                      placeholder="e.g. Amina Hassan"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                      required
                    />
                    {fieldErrors.name && <p className={errorTextClass}>{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      required
                    />
                    {fieldErrors.email && <p className={errorTextClass}>{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Mobile Number</label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs text-gray-600 font-semibold flex-shrink-0">
                        🇹🇿 +255
                      </div>
                      <input
                        name="mobile"
                        type="tel"
                        placeholder="7XX XXX XXX"
                        value={form.mobile}
                        onChange={handleChange}
                        className={inputClass('mobile')}
                        required
                      />
                    </div>
                    {fieldErrors.mobile && <p className={errorTextClass}>{fieldErrors.mobile}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full mt-2 py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 active:scale-[0.99]"
                    style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 1: Security */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Password</label>
                    <div className={`flex items-center bg-[#f8fafc] border rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:bg-white ${
                      fieldErrors.password
                        ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-200'
                        : 'border-gray-200 focus-within:border-[#1a56db] focus-within:ring-[#1a56db]/15'
                    }`}>
                      <input
                        type={showPass ? 'text' : 'password'}
                        name="password"
                        placeholder="Min. 8 characters, 1 upper, 1 lower, 1 digit"
                        value={form.password}
                        onChange={handleChange}
                        className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        tabIndex={-1}
                        className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className={errorTextClass}>{fieldErrors.password}</p>}
                  </div>

                  <div>
                    <div className="flex gap-1 mb-1.5">
                      {[1, 2, 3, 4].map(i => (
                        <div
                          key={i}
                          className="flex-1 h-1.5 rounded-full transition-all"
                          style={{
                            background: i <= strength.level ? strength.color : '#e2e8f0'
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: strength.color }}>
                      {strength.label}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setStep(0); setError(''); setFieldErrors({}); }}
                      className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95"
                      style={{ background: 'linear-gradient(135deg, #1a56db, #1240a8)', boxShadow: '0 4px 12px rgba(26,86,219,0.2)' }}
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex items-start gap-2 p-3 rounded-xl text-xs bg-blue-50/60 border border-blue-100">
                    <MapPin size={15} className="text-[#1a56db] mt-0.5 flex-shrink-0" />
                    <p className="text-blue-700 leading-snug text-xs">
                      Adding your location helps match you with nearby items. This is entirely optional.
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>Your Location</label>
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

                  <div className="flex gap-3 pt-3 mt-auto">
                    <button
                      type="button"
                      onClick={() => { setStep(1); setError(''); }}
                      className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl transition-all hover:opacity-95 disabled:opacity-70"
                      style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating…
                        </>
                      ) : (
                        <>Create Account ✓</>
                      )}
                    </button>
                  </div>

                  <style>{`
                    .location-picker-compact .leaflet-container {
                      height: 140px !important;
                      min-height: 140px !important;
                      max-height: 140px !important;
                    }
                  `}</style>
                </form>
              )}
            </div>

            {step !== 2 && (
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
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

        <p className="text-xs text-gray-400 text-center w-full pt-4 pb-2">
          By registering you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}