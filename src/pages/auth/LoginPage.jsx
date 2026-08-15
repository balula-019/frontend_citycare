import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Shield, MapPin, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logoSrc from '/src/assets/pata-logo.png';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(username, password);
      const role = result.user.user_type;

      // ✅ If the backend requires a password change, redirect to change‑password page
      if (result.passwordChangeRequired) {
        navigate('/change-password', { replace: true });
        return;
      }

      // Normal role‑based navigation
      if (role === 'OWNER') navigate('/owner/dashboard');
      else if (role === 'ORGANISATION') navigate('/org/dashboard');
      else if (role === 'ADMIN') navigate('/admin/dashboard');
    } catch (err) {
      const message = err?.message || 'Login failed.';
      const knownMessages = {
        'Not authenticated':   'Invalid email or password. Please try again.',
        'Unauthorized':        'Invalid email or password. Please try again.',
        'Session expired':     'Your session has expired. Please log in again.',
        'Bad credentials':     'Invalid email or password. Please try again.',
        'Invalid credentials': 'Invalid email or password. Please try again.',
      };

      if (knownMessages[message]) {
        setError(knownMessages[message]);
        setLoading(false);
        return;
      }
      if (message.includes('Network request failed') || message.includes('Failed to fetch')) {
        setError('Unable to connect. Check your internet connection.');
        setLoading(false);
        return;
      }
      if (err?.response?.status === 401) {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }
      setError('Invalid email or password. Please try again.');
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

            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2 rounded-xl mb-4">
                <span className="font-bold shrink-0">!</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              <Input
                label="Email or phone number"
                type="text"
                placeholder="255XXXXXXXXX"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
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
                    disabled={loading}
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
                disabled={loading}
              >
                {loading ? (
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