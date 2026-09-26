import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Send, Loader2, CheckCircle2, AlertCircle,
  Handshake, KeyRound, ShieldCheck, RefreshCw, Lock,
} from 'lucide-react';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import {
  submitPartnerRequest,
  resendPartnerRequestOtp,
  getPartnerOtpConfig,
} from '../api/partnerApi';
import logoSrc from '/src/assets/pata-logo.png';

const PARTNERSHIP_TYPES = [
  'UNIVERSITY',
  'BUSINESS',
  'NGO',
  'GOVERNMENT',
  'TECHNOLOGY',
  'SECURITY',
  'OTHER',
];

// Validation Regex patterns
const ALPHA_SPACE_REGEX = /^[a-zA-Z\s]+$/;
const PHONE_REGEX = /^(\+?[0-9]{1,3})?[0-9]{9,12}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export default function PartnerWithUs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const verifiedEmail = location.state?.email || '';

  const [form, setForm] = useState({
    organizationName: '',
    contactPerson: '',
    email: verifiedEmail,
    phoneNumber: '',
    partnershipType: 'UNIVERSITY',
    message: '',
    otpCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpConfig, setOtpConfig] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (!verifiedEmail) navigate('/partner-with-us', { replace: true });
  }, [verifiedEmail, navigate]);

  useEffect(() => {
    getPartnerOtpConfig()
      .then((cfg) => setOtpConfig(cfg))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setInfo('');
    setFieldErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  const handleResendOtp = async () => {
    if (cooldown > 0 || isLocked) return;
    setResending(true);
    setError('');
    setInfo('');
    try {
      await resendPartnerRequestOtp({
        identifier: form.email,
        purpose: 'PARTNER_REQUEST_EMAIL_VERIFICATION',
      });
      setInfo(t('partnerWithUs.messages.resendSuccess'));
      setCooldown(otpConfig?.cooldownSeconds ?? 60);
    } catch (err) {
      const msg = extractError(err, t('common.somethingWentWrong'));
      setError(msg);
      if (isLockError(msg)) setIsLocked(true);
      triggerShake();
    } finally {
      setResending(false);
    }
  };

  const validateForm = () => {
    const errs = {};

    // 1. Organization Name
    const org = form.organizationName.trim();
    if (!org) {
      errs.organizationName = t('partnerWithUs.errors.orgNameRequired');
    } else if (org.length < 2 || org.length > 100) {
      errs.organizationName = t('partnerWithUs.errors.orgNameLength');
    } else if (!ALPHA_SPACE_REGEX.test(org)) {
      errs.organizationName = t('partnerWithUs.errors.orgNameLettersOnly');
    }

    // 2. Contact Person
    const contact = form.contactPerson.trim();
    if (!contact) {
      errs.contactPerson = t('partnerWithUs.errors.contactRequired');
    } else if (contact.length < 2 || contact.length > 50) {
      errs.contactPerson = t('partnerWithUs.errors.contactLength');
    } else if (!ALPHA_SPACE_REGEX.test(contact)) {
      errs.contactPerson = t('partnerWithUs.errors.contactLettersOnly');
    }

    // 3. Email
    const emailVal = form.email.trim();
    if (!emailVal) {
      errs.email = t('partnerWithUs.errors.emailRequired');
    } else if (!EMAIL_REGEX.test(emailVal)) {
      errs.email = t('partnerWithUs.errors.emailInvalid');
    }

    // 4. Phone Number
    const phone = form.phoneNumber.trim();
    if (!phone) {
      errs.phoneNumber = t('partnerWithUs.errors.phoneRequired');
    } else if (!PHONE_REGEX.test(phone)) {
      errs.phoneNumber = t('partnerWithUs.errors.phoneInvalid');
    }

    // 5. Message
    const msg = form.message.trim();
    if (!msg) {
      errs.message = t('partnerWithUs.errors.messageRequired');
    } else if (msg.length < 10 || msg.length > 1000) {
      errs.message = t('partnerWithUs.errors.messageLength');
    }

    // 6. OTP Code
    const otp = form.otpCode.trim();
    if (!otp) {
      errs.otpCode = t('partnerWithUs.errors.otpRequired');
    } else if (!/^\d{6}$/.test(otp)) {
      errs.otpCode = t('partnerWithUs.errors.otpInvalid');
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    const errs = validateForm();

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setError(t('partnerWithUs.errors.fixBeforeSubmit'));
      triggerShake();
      return;
    }

    setFieldErrors({});
    setError('');
    setInfo('');
    setLoading(true);
    try {
      await submitPartnerRequest(form);
      setSuccess(true);
    } catch (err) {
      const msg = extractError(err, t('common.somethingWentWrong'));

      const serverFieldErrors = err?.response?.data?.data?.fieldErrors;
      if (serverFieldErrors) {
        setFieldErrors(serverFieldErrors);
      }

      setError(msg);
      if (isLockError(msg)) setIsLocked(true);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  if (!verifiedEmail) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-[#f4f7fd] flex flex-col items-center justify-center p-8 text-center">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="focus:outline-none group mb-4"
          aria-label={t('partnerWithUs.goHome')}
        >
          <img
            src={logoSrc}
            alt="PataChako"
            className="w-32 h-32 object-contain transition-transform group-hover:scale-105 cursor-pointer"
          />
        </button>
        <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          {t('partnerWithUs.success.title')}
        </h1>
        <p className="text-gray-500 max-w-md mb-8">
          {t('partnerWithUs.success.message')}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold"
        >
          {t('partnerWithUs.success.backHome')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fd] p-4 sm:p-6 lg:p-8">
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

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-100/30 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#1a56db] to-[#10b981]" />
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="focus:outline-none group"
                aria-label={t('partnerWithUs.goHome')}
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

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#dbeafe] flex items-center justify-center shrink-0">
                <Handshake size={24} className="text-[#1a56db]" />
              </div>
              <div>
                <h1
                  className="text-2xl font-extrabold text-gray-900"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {t('partnerWithUs.title')}
                </h1>
                <p className="text-sm text-gray-500">
                  {t('partnerWithUs.stepLabel')}
                </p>
              </div>
            </div>

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

            {info && !error && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-5 text-sm">
                <CheckCircle2 size={16} className="shrink-0" /> {info}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className={`space-y-4 ${shake ? 'animate-shake' : ''}`}
            >
              <Input
                label={t('partnerWithUs.fields.orgName')}
                name="organizationName"
                value={form.organizationName}
                onChange={handleChange}
                required
                placeholder={t('partnerWithUs.placeholders.orgName')}
                error={fieldErrors.organizationName}
              />
              <Input
                label={t('partnerWithUs.fields.contactPerson')}
                name="contactPerson"
                value={form.contactPerson}
                onChange={handleChange}
                required
                placeholder={t('partnerWithUs.placeholders.contactPerson')}
                error={fieldErrors.contactPerson}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('partnerWithUs.fields.emailVerified')}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={() => {}}
                  disabled
                  required
                  placeholder={t('partnerWithUs.placeholders.email')}
                  error={fieldErrors.email}
                />
                <Input
                  label={t('partnerWithUs.fields.phone')}
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder={t('partnerWithUs.placeholders.phone')}
                  error={fieldErrors.phoneNumber}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('partnerWithUs.fields.partnershipType')}
                </label>
                <select
                  name="partnershipType"
                  value={form.partnershipType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none bg-white text-sm"
                  required
                >
                  {PARTNERSHIP_TYPES.map((pt) => (
                    <option key={pt} value={pt}>
                      {t(`partnerWithUs.partnershipTypes.${pt}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('partnerWithUs.fields.message')}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder={t('partnerWithUs.placeholders.message')}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm resize-none focus:ring-2 ${
                    fieldErrors.message
                      ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                      : 'border-[#e2e8f0] focus:ring-[#1a56db]/20 focus:border-[#1a56db]'
                  }`}
                />
                {fieldErrors.message && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.message}</p>
                )}
              </div>

              {/* OTP Section */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <KeyRound size={16} className="text-[#1a56db]" />
                    {t('partnerWithUs.otp.heading')}
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resending || cooldown > 0 || isLocked}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#1a56db] hover:text-[#1547c0] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLocked ? (
                      <>
                        <Lock size={12} /> {t('partnerWithUs.otp.locked')}
                      </>
                    ) : resending ? (
                      <>
                        <Loader2 size={12} className="animate-spin" /> {t('partnerWithUs.otp.sending')}
                      </>
                    ) : cooldown > 0 ? (
                      <>{t('partnerWithUs.otp.resendIn', { seconds: cooldown })}</>
                    ) : (
                      <>
                        <RefreshCw size={12} /> {t('partnerWithUs.otp.resend')}
                      </>
                    )}
                  </button>
                </div>
                <Input
                  label=""
                  name="otpCode"
                  value={form.otpCode}
                  onChange={handleChange}
                  placeholder={t('partnerWithUs.otp.placeholder')}
                  maxLength={6}
                  disabled={isLocked}
                  error={fieldErrors.otpCode}
                />
                <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
                  <ShieldCheck size={12} className="text-[#1a56db] mt-0.5 shrink-0" />
                  <span>
                    {t('partnerWithUs.otp.sentTo1')}{' '}
                    <strong>{form.email}</strong>
                    {t('partnerWithUs.otp.sentTo2')}
                    {otpConfig
                      ? ` ${t('partnerWithUs.otp.expiresIn', { minutes: otpConfig.expiryMinutes })}`
                      : ''}
                  </span>
                </p>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full py-3.5 text-base font-semibold rounded-xl"
                disabled={loading || isLocked}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    {t('partnerWithUs.buttons.submitting')}
                  </span>
                ) : isLocked ? (
                  <span className="flex items-center justify-center gap-2">
                    <Lock size={18} />
                    {t('partnerWithUs.buttons.accountLocked')}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={18} />
                    {t('partnerWithUs.buttons.submitRequest')}
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}