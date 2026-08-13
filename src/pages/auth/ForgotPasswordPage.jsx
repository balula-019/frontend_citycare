import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

      // Extract data depending on whether your API helper unwarps Axios responses or not
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#f8fafc] px-4 py-8 relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 right-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1a56db] transition-colors bg-white border border-gray-200 hover:border-[#1a56db] rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-100/40 border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

        <div className="px-8 py-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src={logoSrc}
              alt="PataChako"
              className="w-24 h-24 object-contain drop-shadow-md mb-4"
            />
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Forgot password?
            </h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Enter your email and we'll send you an OTP to reset it.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
              <span className="text-red-500 font-bold shrink-0">!</span>
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
              <span className="text-green-500 font-bold shrink-0">✓</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full py-3.5 text-base font-semibold tracking-wide rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </span>
              ) : (
                'Send OTP'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-semibold text-[#1a56db] hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      <p className="absolute bottom-6 text-xs text-gray-400 text-center w-full">
        If you didn't receive the email, check your spam folder or try again.
      </p>
    </div>
  );
}