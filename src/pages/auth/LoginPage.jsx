import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Shield, MapPin, Search, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logoSrc from '/src/assets/pata-logo.png';

// ---- Rate limiting config ----
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const LOCK_STORAGE_KEY = 'patachako_login_lock';

// ---- Username / mobile / email validation ----
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts 255XXXXXXXXX (12 digits) or local 0XXXXXXXXX (10 digits)
const MOBILE_255_REGEX = /^255\d{9}$/;
const MOBILE_LOCAL_REGEX = /^0\d{9}$/;
// Plain username: letters, numbers, dot/underscore/hyphen, 3-30 chars
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,30}$/;

function classifyAndValidate(rawValue) {
  const value = rawValue.trim();

  if (!value) {
    return { valid: false, error: 'Enter your mobile number, email, or username.' };
  }

  // Looks like an email attempt
  if (value.includes('@')) {
    if (!EMAIL_REGEX.test(value)) {
      return { valid: false, error: 'Enter a valid email address (e.g. name@example.com).' };
    }
    return { valid: true, type: 'email', value };
  }

  // Looks like a mobile number attempt (only digits, optionally starting with +)
  const digitsOnly = value.replace(/^\+/, '');
  if (/^\d+$/.test(digitsOnly)) {
    if (MOBILE_255_REGEX.test(digitsOnly) || MOBILE_LOCAL_REGEX.test(digitsOnly)) {
      return { valid: true, type: 'mobile', value: digitsOnly };
    }
    return {
      valid: false,
      error: 'Enter a valid mobile number in the format 255XXXXXXXXX or 0XXXXXXXXX.',
    };
  }

  // Otherwise treat as a plain username
  if (!USERNAME_REGEX.test(value)) {
    return {
      valid: false,
      error: 'Username must be 3-30 characters (letters, numbers, ".", "_", "-" only, no spaces).',
    };
  }
  return { valid: true, type: 'username', value };
}

function formatMMSS(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // ---- Rate limit state ----
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null); // epoch ms
  const [remainingMs, setRemainingMs] = useState(0);
  // Exact message the backend sent when IT decided to lock the account
  // (e.g. "Too many failed login attempts. Your account has been
  // temporarily locked."). Falls back to a generic message if the lock
  // was only triggered by our own client-side attempt counter.
  const [backendLockMessage, setBackendLockMessage] = useState('');
  const tickRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Load any existing lock/attempt state on mount (survives page refresh)
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LOCK_STORAGE_KEY) || 'null');
      if (stored) {
        if (stored.lockedUntil && stored.lockedUntil > Date.now()) {
          setLockedUntil(stored.lockedUntil);
          setAttempts(stored.attempts ?? MAX_ATTEMPTS);
          setBackendLockMessage(stored.message ?? '');
        } else if (stored.lockedUntil && stored.lockedUntil <= Date.now()) {
          // Lock already expired since last visit — reset
          localStorage.removeItem(LOCK_STORAGE_KEY);
        } else {
          setAttempts(stored.attempts ?? 0);
        }
      }
    } catch {
      localStorage.removeItem(LOCK_STORAGE_KEY);
    }
  }, []);

  // Countdown ticker while locked
  useEffect(() => {
    if (!lockedUntil) {
      setRemainingMs(0);
      return;
    }

    const tick = () => {
      const remaining = lockedUntil - Date.now();
      if (remaining <= 0) {
        setLockedUntil(null);
        setAttempts(0);
        setRemainingMs(0);
        setBackendLockMessage('');
        localStorage.removeItem(LOCK_STORAGE_KEY);
        clearInterval(tickRef.current);
      } else {
        setRemainingMs(remaining);
      }
    };

    tick();
    tickRef.current = setInterval(tick, 1000);
    return () => clearInterval(tickRef.current);
  }, [lockedUntil]);

  const isLocked = !!lockedUntil && remainingMs > 0;

  const persistAttemptState = (nextAttempts, nextLockedUntil, message = '') => {
    localStorage.setItem(
      LOCK_STORAGE_KEY,
      JSON.stringify({ attempts: nextAttempts, lockedUntil: nextLockedUntil, message })
    );
  };

  // The backend uses statusCode 619 for both "wrong password" AND "account
  // locked from too many attempts" — the only way to tell them apart is the
  // message text, so we match on that.
  const isAccountLockedMessage = (message = '') => {
    const lower = message.toLowerCase();
    return lower.includes('locked') || lower.includes('too many');
  };

  // Backend has confirmed the account is locked — trust its exact wording
  // and start our own 15-minute countdown on top of it (the backend doesn't
  // send back a remaining-time value, so 15 minutes is our best estimate).
  const activateBackendLock = (message) => {
    const until = Date.now() + LOCK_DURATION_MS;
    setAttempts(MAX_ATTEMPTS);
    setLockedUntil(until);
    setBackendLockMessage(message);
    persistAttemptState(MAX_ATTEMPTS, until, message);
  };

  const registerFailedAttempt = () => {
    const nextAttempts = attempts + 1;
    if (nextAttempts >= MAX_ATTEMPTS) {
      const until = Date.now() + LOCK_DURATION_MS;
      setAttempts(nextAttempts);
      setLockedUntil(until);
      setBackendLockMessage('');
      persistAttemptState(nextAttempts, until);
      setError(`Too many failed attempts. Please try again in ${formatMMSS(LOCK_DURATION_MS)}.`);
    } else {
      setAttempts(nextAttempts);
      persistAttemptState(nextAttempts, null);
    }
  };

  const clearAttemptState = () => {
    setAttempts(0);
    setLockedUntil(null);
    setBackendLockMessage('');
    localStorage.removeItem(LOCK_STORAGE_KEY);
  };

  const handleUsernameChange = (e) => {
    // Strip whitespace as the user types — spaces are what triggered the
    // backend's "Invalid username format" (702) response.
    setUsername(e.target.value.replace(/\s/g, ''));
  };

  const extractBackendError = (err) => ({
    // apiClient throws a plain Error with .statusCode (string, e.g. "619")
    // and .message set directly from the backend body — there is no
    // err.response.data wrapper in this codebase.
    code: err?.statusCode != null ? String(err.statusCode) : undefined,
    message: err?.message || 'Login failed.',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLocked) return;

    // Client-side validation before ever hitting the network
    const check = classifyAndValidate(username);
    if (!check.valid) {
      setError('Invalid username or password.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(check.value, password);
      const role = result.user.user_type;

      // Successful login (backend statusCode 600) — clear rate-limit state
      clearAttemptState();

      if (result.passwordChangeRequired) {
        navigate('/change-password', { replace: true });
        return;
      }

      if (role === 'OWNER') navigate('/owner/dashboard');
      else if (role === 'ORGANISATION') navigate('/org/dashboard');
      else if (role === 'ADMIN') navigate('/admin/dashboard');
    } catch (err) {
      const { code, message } = extractBackendError(err);

      // 702: bad format for whatever the user typed. Don't count this
      // against the rate limit — it isn't a credential guess — and don't
      // reveal that it was a format issue, just show the generic message.
      if (code === '702') {
        setError('Invalid username or password.');
        setLoading(false);
        return;
      }

      // The backend sends statusCode 619 for two different situations,
      // distinguished only by message text:
      //   - "Invalid username or password."  -> a normal wrong-credentials guess
      //   - "Too many failed login attempts. Your account has been
      //      temporarily locked."             -> the backend itself has
      //      already locked the account
      if (code === '619' && isAccountLockedMessage(message)) {
        activateBackendLock(message);
        setLoading(false);
        return;
      }

      const credentialErrorMessages = {
        'Not authenticated': true,
        'Unauthorized': true,
        'Bad credentials': true,
        'Invalid credentials': true,
        'Invalid username or password.': true,
      };

      if (code === '619' || credentialErrorMessages[message] || err?.response?.status === 401) {
        registerFailedAttempt();
        if (attempts + 1 < MAX_ATTEMPTS) {
          setError('Invalid username or password.');
        }
        // if we've now hit MAX_ATTEMPTS, registerFailedAttempt() already set
        // the lockout message — don't overwrite it with the generic one.
        setLoading(false);
        return;
      }

      if (message === 'Session expired') {
        setError('Your session has expired. Please log in again.');
        setLoading(false);
        return;
      }

      if (message.includes('Network request failed') || message.includes('Failed to fetch')) {
        setError('Unable to connect. Check your internet connection.');
        setLoading(false);
        return;
      }

      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">

      {/* LEFT PANEL – STATIC */}
      <div
        className="hidden lg:flex w-[480px] flex-shrink-0 relative flex-col justify-start overflow-hidden pt-12 pb-8"
        style={{ background: 'linear-gradient(160deg, #1a56db 0%, #1240a8 55%, #0b2878 100%)' }}
      >
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute top-1/2 -right-32 w-[380px] h-[380px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute -bottom-28 -left-20 w-[320px] h-[320px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative z-10 px-10 flex-1 flex flex-col justify-between">
          <div>
            <h2
              className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Tanzania's<br />Lost & Found<br />Platform
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Reuniting people with what matters most — verified, secure, and trusted across the nation.
            </p>

            <div className="flex flex-col gap-2.5">
              {[
                { icon: Shield, label: 'Verified Partners', sub: 'Police, airports & universities' },
                { icon: Search, label: 'Smart Matching', sub: 'AI-powered item recognition' },
                { icon: MapPin, label: 'Nationwide Coverage', sub: 'All regions of Tanzania' },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl px-5 py-3.5"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                  >
                    <Icon size={16} color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl px-6 py-4 flex justify-between mt-4"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {[['10K+', 'Items Found'], ['98%', 'Success Rate'], ['200+', 'Partners']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="text-xl font-extrabold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{val}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL – scrollable, card tall enough to always show the link */}
      <div className="flex-1 flex flex-col items-center justify-start pt-6 px-6 pb-8 overflow-y-auto" style={{ background: '#f8fafd' }}>
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1a56db] transition-colors bg-white border border-gray-200 hover:border-[#1a56db] rounded-xl px-4 py-2 z-20 shadow-sm"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/60 overflow-hidden min-h-[580px] flex flex-col">
          <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

          <div className="px-8 pt-6 pb-6 flex-1 flex flex-col">
            <div className="flex flex-col items-center mb-5">
              <img
                src={logoSrc}
                alt="PataChako"
                className="w-36 h-36 object-contain drop-shadow-xl"
              />
              <h1
                className="text-2xl font-extrabold text-gray-900 tracking-tight mt-4"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Welcome back
              </h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to your PataChako account</p>
            </div>

            {isLocked && (
              <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2 rounded-xl mb-3">
                <Lock size={14} className="shrink-0" />
                <span>
                  {backendLockMessage || 'Too many failed attempts. Your account has been temporarily locked.'}{' '}
                  Try again in <span className="font-bold tabular-nums">{formatMMSS(remainingMs)}</span>.
                </span>
              </div>
            )}

            {error && !isLocked && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2 rounded-xl mb-3">
                <span className="font-bold shrink-0">!</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              <Input
                label="phone number"
                type="text"
                placeholder="255XXXXXXXXX"
                value={username}
                onChange={handleUsernameChange}
                required
                disabled={loading || isLocked}
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#1a56db] focus-within:ring-2 focus-within:ring-[#1a56db]/20 focus-within:bg-white">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading || isLocked}
                    className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                    className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors flex-shrink-0"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs font-semibold text-[#1a56db] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full py-3 text-sm font-semibold tracking-wide rounded-xl mt-1"
                disabled={loading || isLocked}
              >
                {isLocked ? (
                  `Try again in ${formatMMSS(remainingMs)}`
                ) : loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-auto pt-4 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                New to PataChako?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="font-bold text-[#1a56db] hover:underline transition-colors"
                >
                  Create an Account
                </button>
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          By signing in you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}