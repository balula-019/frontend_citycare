import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../../api/auth';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logoSrc from '/src/assets/pata-logo.png';

export default function VerifyOtpPage() {
  const location = useLocation();
  // Read mobile passed from RegisterPage state, falling back to email if missing
  const mobile = location.state?.mobile || '';
  const email = location.state?.email || '';
  const identifier = mobile || email;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await verifyOtp(identifier, otp);
      const data = response?.data || response;

      // Intercept custom backend errors wrapped inside a 200 OK
      if (data && data.statusCode && String(data.statusCode) !== '600') {
        setError(data.message || 'Invalid OTP. Please try again.');
        return;
      }

      // Only redirect if it is a confirmed success (status code 600)
      navigate('/login', { state: { accountVerified: true } });
    } catch (err) {
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Invalid OTP. Please try again.';
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setMessage('');

    try {
      const response = await resendOtp(identifier, 'ACCOUNT_VERIFICATION');
      const data = response?.data || response;

      // Intercept custom backend errors during resend
      if (data && data.statusCode && String(data.statusCode) !== '600') {
        setError(data.message || 'Failed to resend OTP.');
        return;
      }

      setMessage(`A new OTP has been sent via SMS to ${mobile ? `+255 ${mobile}` : 'your mobile number'}.`);
    } catch (err) {
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to resend OTP.';
      setError(serverMessage);
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
          {/* Enlarged Interactive Logo */}
          <div className="flex justify-center mb-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="focus:outline-none focus:ring-2 focus:ring-[#1a56db] rounded-2xl transition-transform hover:scale-105"
              title="Go to home"
            >
              <img
                src={logoSrc}
                alt="PataChako"
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-xl cursor-pointer"
              />
            </button>
          </div>

          <div className="mb-6 text-center">
            <h1
              className="text-2xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Verify your mobile number
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              We sent a 6‑digit code via SMS to{' '}
              <strong className="text-gray-700">
                {mobile ? `+255 ${mobile}` : email || 'your mobile number'}
              </strong>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-xs sm:text-sm flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">!</span>
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-xs sm:text-sm flex items-start gap-2">
              <span className="text-green-500 font-bold shrink-0">✓</span>
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <Input
              label="SMS OTP Code"
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
                  Verifying…
                </span>
              ) : (
                'Verify Account'
              )}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-semibold text-[#1a56db] hover:underline"
            >
              Resend SMS OTP
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already verified?{' '}
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
        If you didn't receive the SMS message, check your network signal or request a new OTP.
      </p>
    </div>
  );
}