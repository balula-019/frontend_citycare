import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Send, Loader2, AlertCircle, Handshake, ShieldCheck, Lock,
} from 'lucide-react';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { sendPartnerRequestOtp, getPartnerOtpConfig } from '../api/partnerApi';
import logoSrc from '/src/assets/pata-logo.png';

const extractError = (err, fallback) => {
  const resp = err?.response?.data;
  return (
    resp?.data?.message ||
    resp?.message ||
    err?.message ||
    fallback
  );
};

const isLockError = (msg = '') => /lock/i.test(msg);

export default function PartnerSendOtp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [otpConfig, setOtpConfig] = useState(null);

  useEffect(() => {
    getPartnerOtpConfig()
      .then((cfg) => setOtpConfig(cfg))
      .catch(() => {});
  }, []);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    // Validation
    const errs = {};
    if (!email.trim()) errs.email = t('partnerSendOtp.errors.emailRequired');
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      errs.email = t('partnerSendOtp.errors.emailInvalid');

    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      setError(t('partnerSendOtp.errors.fillAll'));
      triggerShake();
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setError('');
    try {
      await sendPartnerRequestOtp({ email: email.trim() });
      navigate('/partner-with-us/form', {
        state: { email: email.trim() },
        replace: true,
      });
    } catch (err) {
      const msg = extractError(err, t('common.somethingWentWrong'));
      setError(msg);
      if (isLockError(msg)) setIsLocked(true);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fd] p-4 sm:p-6 lg:p-8">
      {/* Shake keyframes */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.45s ease-in-out; }
      `}</style>

      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-100/30 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#1a56db] to-[#10b981]" />
          <div className="p-8">
            {/* Logo — BIG, clickable → home */}
            <div className="flex flex-col items-center mb-8">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="focus:outline-none group"
                aria-label={t('partnerSendOtp.goHome')}
              >
                <img
                  src={logoSrc}
                  alt="PataChako"
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain mb-3 transition-transform group-hover:scale-105 cursor-pointer"
                />
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer focus:outline-none"
              >
                Pata<span className="text-[#1a56db]">Chako</span>
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#dbeafe] flex items-center justify-center shrink-0">
                <Handshake size={24} className="text-[#1a56db]" />
              </div>
              <div>
                <h1
                  className="text-xl font-extrabold text-gray-900"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {t('partnerSendOtp.title')}
                </h1>
                <p className="text-sm text-gray-500">
                  {t('partnerSendOtp.stepLabel')}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-5">
              {t('partnerSendOtp.instructions')}
            </p>

            {/* Error banner */}
            {error && (
              <div
                className={`flex items-start gap-2 px-4 py-3 rounded-xl mb-5 text-sm ${
                  isLocked
                    ? 'bg-amber-50 border border-amber-200 text-amber-800'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {isLocked ? (
                  <Lock size={16} className="shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                )}
                <span>{error}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className={`space-y-5 ${shake ? 'animate-shake' : ''}`}
            >
              <Input
                label={t('partnerSendOtp.emailLabel')}
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                  setFieldErrors((p) => ({ ...p, email: '' }));
                }}
                required
                placeholder={t('partnerSendOtp.emailPlaceholder')}
                disabled={isLocked}
                error={fieldErrors.email}
              />

              <Button
                variant="primary"
                type="submit"
                className="w-full py-3.5 text-base font-semibold rounded-xl"
                disabled={loading || isLocked}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    {t('partnerSendOtp.sending')}
                  </span>
                ) : isLocked ? (
                  <span className="flex items-center justify-center gap-2">
                    <Lock size={18} />
                    {t('partnerSendOtp.accountLocked')}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={18} />
                    {t('partnerSendOtp.sendOtp')}
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-5 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-100">
              <ShieldCheck size={14} className="text-[#1a56db] mt-0.5 shrink-0" />
              <span>
                {otpConfig
                  ? t('partnerSendOtp.otpInfo', {
                      expiry: otpConfig.expiryMinutes,
                      attempts: otpConfig.maxFailedAttempts,
                      cooldown: otpConfig.cooldownSeconds,
                      daily: otpConfig.dailyLimit,
                    })
                  : t('partnerSendOtp.otpInfoFallback')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}