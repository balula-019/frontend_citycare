import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logoSrc from '/src/assets/citycare-logo.png';

// ---- Rate limiting config ----
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const LOCK_STORAGE_KEY = 'patachako_login_lock';

// ---- Username / mobile / email validation ----
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_255_REGEX = /^255\d{9}$/;
const MOBILE_LOCAL_REGEX = /^0\d{9}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,30}$/;

function classifyAndValidate(rawValue, t) {
  const value = rawValue.trim();

  if (!value) {
    return { valid: false, error: t('login.validation.enterUsername') };
  }

  if (value.includes('@')) {
    if (!EMAIL_REGEX.test(value)) {
      return { valid: false, error: t('login.validation.emailInvalid') };
    }
    return { valid: true, type: 'email', value };
  }

  const digitsOnly = value.replace(/^\+/, '');
  if (/^\d+$/.test(digitsOnly)) {
    if (MOBILE_255_REGEX.test(digitsOnly) || MOBILE_LOCAL_REGEX.test(digitsOnly)) {
      return { valid: true, type: 'mobile', value: digitsOnly };
    }
    return { valid: false, error: t('login.validation.mobileInvalid') };
  }

  if (!USERNAME_REGEX.test(value)) {
    return { valid: false, error: t('login.validation.usernameInvalid') };
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
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [backendLockMessage, setBackendLockMessage] = useState('');
  const tickRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LOCK_STORAGE_KEY) || 'null');
      if (stored) {
        if (stored.lockedUntil && stored.lockedUntil > Date.now()) {
          setLockedUntil(stored.lockedUntil);
          setAttempts(stored.attempts ?? MAX_ATTEMPTS);
          setBackendLockMessage(stored.message ?? '');
        } else if (stored.lockedUntil && stored.lockedUntil <= Date.now()) {
          localStorage.removeItem(LOCK_STORAGE_KEY);
        } else {
          setAttempts(stored.attempts ?? 0);
        }
      }
    } catch {
      localStorage.removeItem(LOCK_STORAGE_KEY);
    }
  }, []);

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

  const isAccountLockedMessage = (message = '') => {
    const lower = message.toLowerCase();
    return lower.includes('locked') || lower.includes('too many');
  };

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
      setError(t('login.tooManyAttempts', { time: formatMMSS(LOCK_DURATION_MS) }));
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
    setUsername(e.target.value.replace(/\s/g, ''));
  };

  const extractBackendError = (err) => ({
    code: err?.statusCode != null ? String(err.statusCode) : undefined,
    message: err?.message || t('login.errors.loginFailed'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLocked) return;

    const check = classifyAndValidate(username, t);
    if (!check.valid) {
      setError(t('login.errors.invalidCredentials'));
      return;
    }

    setLoading(true);
    try {
      const result = await login(check.value, password);
      const role = result.user.user_type;

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

      if (code === '702') {
        setError(t('login.errors.invalidCredentials'));
        setLoading(false);
        return;
      }

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
          setError(t('login.errors.invalidCredentials'));
        }
        setLoading(false);
        return;
      }

      if (message === 'Session expired') {
        setError(t('login.errors.sessionExpired'));
        setLoading(false);
        return;
      }

      if (message.includes('Network request failed') || message.includes('Failed to fetch')) {
        setError(t('login.errors.networkFailed'));
        setLoading(false);
        return;
      }

      setError(t('login.errors.invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">

      {/* LEFT PANEL */}
      <div
        className="hidden lg:flex w-[480px] flex-shrink-0 relative flex-col justify-start overflow-hidden pt-12 pb-8"
        style={{ background: 'linear-gradient(160deg, #0f766e 0%, #115e59 55%, #134e4a 100%)' }}
      >
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute top-1/2 -right-32 w-[380px] h-[380px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute -bottom-28 -left-20 w-[320px] h-[320px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative z-10 px-10 flex-1 flex flex-col justify-center">
          <img src={logoSrc} alt="City Care" className="w-24 h-24 object-contain mb-6" />
          <h2
            className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {t('login.leftPanel.headingLine1')}<br />
            {t('login.leftPanel.headingLine2')}<br />
            {t('login.leftPanel.headingLine3')}
          </h2>
          <p className="text-sm leading-relaxed max-w-[320px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {t('login.leftPanel.subtext')}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col items-center justify-start pt-6 px-6 pb-8 overflow-y-auto" style={{ background: '#f5faf9' }}>

        <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/60 overflow-hidden min-h-[580px] flex flex-col mt-4">
          <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #0f766e, #10b981)' }} />

          <div className="px-8 pt-6 pb-6 flex-1 flex flex-col">
            <div className="flex flex-col items-center mb-5">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="focus:outline-none focus:ring-2 focus:ring-[#0f766e] rounded-2xl transition-transform hover:scale-105"
                title={t('login.goHome')}
              >
                <img
                  src={logoSrc}
                  alt="City Care"
                  className="w-36 h-36 object-contain drop-shadow-xl cursor-pointer"
                />
              </button>
              <h1
                className="text-2xl font-extrabold text-gray-900 tracking-tight mt-4"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {t('login.title')}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{t('login.subtitle')}</p>
            </div>

            {isLocked && (
              <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2 rounded-xl mb-3">
                <Lock size={14} className="shrink-0" />
                <span>
                  {backendLockMessage || t('login.lockedFallback')}{' '}
                  {t('login.tryAgainIn')}{' '}
                  <span className="font-bold tabular-nums">{formatMMSS(remainingMs)}</span>.
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
                label={t('login.fields.username')}
                type="text"
                placeholder={t('login.placeholders.username')}
                value={username}
                onChange={handleUsernameChange}
                required
                disabled={loading || isLocked}
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">
                  {t('login.fields.password')}
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#0f766e] focus-within:ring-2 focus-within:ring-[#0f766e]/20 focus-within:bg-white">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder={t('login.placeholders.password')}
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
                    className="px-4 text-gray-400 hover:text-[#0f766e] transition-colors flex-shrink-0"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs font-semibold text-[#0f766e] hover:underline"
                >
                  {t('login.forgotPassword')}
                </button>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full py-3 text-sm font-semibold tracking-wide rounded-xl mt-1"
                disabled={loading || isLocked}
              >
                {isLocked ? (
                  t('login.tryAgainIn') + ' ' + formatMMSS(remainingMs)
                ) : loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('login.signingIn')}
                  </span>
                ) : (
                  t('login.signIn')
                )}
              </Button>
            </form>

            <div className="mt-auto pt-4 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                {t('login.newHere')}{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="font-bold text-[#0f766e] hover:underline transition-colors"
                >
                  {t('login.createAccount')}
                </button>
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          {t('login.footer')}
        </p>
      </div>
    </div>
  );
}