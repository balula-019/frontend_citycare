import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../api/auth';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logoSrc from '/src/assets/pata-logo.png';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPassword(trimmed);

      // Extract data depending on whether your API helper unwraps Axios responses or not
      const data = response?.data || response;

      // Intercept custom backend error status codes (like 804) wrapped inside a 200 OK
      if (data && data.statusCode && String(data.statusCode) !== '600') {
        setError(data.message || 'Profile not found.');
        return;
      }

      // If custom status code is 600 (or if it doesn't return a custom error structure), treat as success
      setSuccess('OTP sent to your email. Redirecting...');
      setTimeout(() => navigate('/reset-password', { state: { email: trimmed } }), 1500);
    } catch (err) {
      // Catches actual network dropouts, crashes, or traditional 4xx/5xx HTTP errors
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to send OTP. Please try again.';
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#f0f4ff] to-[#f8fafc] px-4 py-8">
      {/* Spacer to keep card centered visually while keeping footer at bottom */}
      <div className="flex-1 flex items-center justify-center my-auto">
        <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-gray-100 overflow-hidden min-h-[520px] flex flex-col">
          <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

          <div className="px-8 pt-8 pb-8 flex-1 flex flex-col">
            <div className="flex flex-col items-center mb-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="focus:outline-none focus:ring-2 focus:ring-[#1a56db] rounded-2xl transition-transform hover:scale-105"
                title="Go to home"
              >
                <img
                  src={logoSrc}
                  alt="PataChako"
                  className="w-36 h-36 object-contain drop-shadow-xl cursor-pointer"
                />
              </button>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mt-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                Forgot password?
              </h1>
              <p className="text-sm text-gray-500 mt-1 text-center leading-relaxed">
                Enter your email and we'll send you an OTP to reset it.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-xs flex items-center gap-2.5">
                <span className="text-red-500 font-bold shrink-0">!</span>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-xs flex items-center gap-2.5">
                <span className="text-green-500 font-bold shrink-0">✓</span>
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col justify-center">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />

              <Button
                variant="primary"
                type="submit"
                className="w-full py-3.5 text-sm font-semibold tracking-wide rounded-xl mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>

            <div className="mt-auto pt-6 text-center">
              <p className="text-sm text-gray-500">
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-bold text-[#1a56db] hover:underline transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center w-full pt-4">
        If you didn't receive the email, check your spam folder or try again.
      </p>
    </div>
  );
}