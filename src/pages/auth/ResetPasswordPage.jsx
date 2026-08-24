import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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
    <div
      className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto"
      style={{ background: '#f4f7fd' }}
    >
      {/* Card Container */}
      <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-2xl shadow-blue-100/30 border border-gray-100 overflow-hidden flex flex-col my-auto">
        <div
          className="h-1.5 w-full flex-shrink-0"
          style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }}
        />

        <div className="px-6 sm:px-8 py-8 flex-1 flex flex-col justify-center">
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

          <div className="mb-6 text-center">
            <h1
              className="text-2xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Reset your password
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter the OTP sent to{' '}
              <strong className="text-gray-700">{email || 'your email'}</strong>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-xs sm:text-sm flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">!</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="absolute right-3.5 bottom-3.5 text-gray-400 hover:text-[#1a56db] transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-3.5 text-sm sm:text-base font-bold tracking-wide rounded-xl mt-2"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #1a56db, #1240a8)',
                boxShadow: '0 4px 12px rgba(26,86,219,0.2)',
              }}
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

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-bold text-[#1a56db] hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center w-full pt-4 pb-2">
        For security, use a strong password with at least 8 characters.
      </p>
    </div>
  );
}