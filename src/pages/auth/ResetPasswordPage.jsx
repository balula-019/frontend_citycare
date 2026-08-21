import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '../../api/auth';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logoSrc from '/src/assets/pata-logo.png';

export default function ResetPasswordPage() {
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await resetPassword(email, otp, newPassword);

      // Extract data depending on whether your API helper unwraps Axios responses
      const data = response?.data || response;

      // Intercept custom backend error status codes (e.g. wrong OTP code) wrapped inside a 200 OK
      if (data && data.statusCode && String(data.statusCode) !== '600') {
        setError(data.message || 'Invalid OTP code. Please try again.');
        return;
      }

      // Only redirect if the response confirms a true success (status code 600)
      navigate('/login', { state: { passwordReset: true } });
    } catch (err) {
      // Catches actual network dropouts, server crashes, or traditional 4xx/5xx HTTP errors
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to reset password. Please try again.';
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#f8fafc] px-4 py-8 relative">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 right-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1a56db] transition-colors bg-white border border-gray-200 hover:border-[#1a56db] rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* Main card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-100/40 border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

        <div className="px-8 py-8">
          {/* Logo + branding */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={logoSrc}
              alt="PataChako"
              className="w-24 h-24 object-contain drop-shadow-md mb-4"
            />
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Reset your password
            </h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Enter the OTP sent to <strong className="text-gray-700">{email}</strong>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
              <span className="text-red-500 font-bold shrink-0">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="OTP Code"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              pattern="[0-9]{6}"
              inputMode="numeric"
              autoComplete="one-time-code"
              disabled={loading}
            />

            <div className="relative">
              <Input
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 bottom-3.5 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-3.5 text-base font-semibold tracking-wide rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Resetting…
                </span>
              ) : (
                'Reset Password'
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
        For security, use a strong password with at least 8 characters.
      </p>
    </div>
  );
}