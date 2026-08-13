import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { apiClient } from '../api/client';
import { useAuth } from '../context/AuthContext';
import logoSrc from '/src/assets/pata-logo.png';   // same logo as login page

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { clearPasswordChangeFlag } = useAuth();

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // separate visibility toggles for each field
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (form.newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await apiClient('/v1/services/users/change-password', {
        method: 'POST',
        body: JSON.stringify({
          current_password: form.currentPassword,
          new_password: form.newPassword,
          confirm_password: form.confirmPassword,
        }),
      });

      clearPasswordChangeFlag();
      setSuccess('Password changed successfully. Redirecting...');
      setTimeout(() => navigate('/', { replace: true }), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to change password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#f8fafc] px-4 py-8 relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1a56db] transition-colors bg-white border border-gray-200 hover:border-[#1a56db] rounded-xl px-4 py-2.5 shadow-sm"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-100/40 border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1a56db] to-[#10b981]" />
        <div className="px-8 py-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={logoSrc}
              alt="PataChako"
              className="w-24 h-24 object-contain drop-shadow-md mb-4"
            />
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Change Password
            </h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Your account requires a new password before you can continue.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-4 text-sm">
              <CheckCircle2 size={16} className="shrink-0" />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Current (temporary) password
              </label>
              <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#1a56db] focus-within:ring-2 focus-within:ring-[#1a56db]/15 focus-within:bg-white">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  name="currentPassword"
                  placeholder="Enter temporary password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  tabIndex={-1}
                  className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors flex-shrink-0"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                New password
              </label>
              <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#1a56db] focus-within:ring-2 focus-within:ring-[#1a56db]/15 focus-within:bg-white">
                <input
                  type={showNew ? 'text' : 'password'}
                  name="newPassword"
                  placeholder="Min. 8 characters"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  tabIndex={-1}
                  className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors flex-shrink-0"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm new password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Confirm new password
              </label>
              <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#1a56db] focus-within:ring-2 focus-within:ring-[#1a56db]/15 focus-within:bg-white">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={-1}
                  className="px-4 text-gray-400 hover:text-[#1a56db] transition-colors flex-shrink-0"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-3.5 text-base font-semibold tracking-wide rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Changing…
                </span>
              ) : (
                'Change Password'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}