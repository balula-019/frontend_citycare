import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '../../api/auth';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logoSrc from '/src/assets/pata-logo.png';

export default function ResetPasswordPage() {
  const { t } = useTranslation();
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
      const data = response?.data || response;

      // Intercept custom backend error status codes wrapped inside a 200 OK
      if (data && data.statusCode && String(data.statusCode) !== '600') {
        setError(data.message || t('resetPassword.errors.invalidOtp'));
        return;
      }

      navigate('/login', { state: { passwordReset: true } });
    } catch (err) {
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        t('resetPassword.errors.genericFailure');
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto"
      style={{ background: '#f5faf9' }}
    >
      {/* Card Container */}
      <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-2xl shadow-primary-soft/30 border border-gray-100 overflow-hidden flex flex-col my-auto">
        <div
          className="h-1.5 w-full flex-shrink-0"
          style={{ background: 'linear-gradient(90deg, #0f766e, #10b981)' }}
        />

        <div className="px-6 sm:px-8 py-8 flex-1 flex flex-col justify-center">
          {/* Interactive Large Logo */}
          <div className="flex justify-center mb-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="focus:outline-none focus:ring-2 focus:ring-[#0f766e] rounded-2xl transition-transform hover:scale-105"
              title={t('resetPassword.goHome')}
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
              {t('resetPassword.title')}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {t('resetPassword.subtitlePart1')}{' '}
              <strong className="text-gray-700">
                {email || t('resetPassword.yourEmailFallback')}
              </strong>
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
              label={t('resetPassword.fields.otp')}
              type="text"
              placeholder={t('resetPassword.placeholders.otp')}
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
                label={t('resetPassword.fields.newPassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('resetPassword.placeholders.password')}
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
                className="absolute right-3.5 bottom-3.5 text-gray-400 hover:text-[#0f766e] transition-colors focus:outline-none"
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
                background: 'linear-gradient(135deg, #0f766e, #115e59)',
                boxShadow: '0 4px 12px rgba(26,86,219,0.2)',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('resetPassword.resetting')}
                </span>
              ) : (
                t('resetPassword.resetButton')
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              {t('resetPassword.rememberPassword')}{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-bold text-[#0f766e] hover:underline"
              >
                {t('resetPassword.signIn')}
              </button>
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center w-full pt-4 pb-2">
        {t('resetPassword.footer')}
      </p>
    </div>
  );
}