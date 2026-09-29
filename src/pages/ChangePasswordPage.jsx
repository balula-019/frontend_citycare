import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from '../components/shared/Button';
import { apiClient } from '../api/client';
import { useAuth } from '../context/AuthContext';
import logoSrc from '/src/assets/citycare-logo.png';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdfa] to-[#f8fafc] px-4 sm:px-6 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-primary-soft/50 border border-gray-100 overflow-hidden transition-all">
        <div className="h-2 w-full bg-gradient-to-r from-[#0f766e] to-[#10b981]" />
        
        <div className="px-6 py-8 sm:p-10">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={logoSrc}
              alt="PataChako"
              className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-lg mb-4 transition-all"
            />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight text-center" style={{ fontFamily: "'Sora', sans-serif" }}>
              Change Password
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2 text-center max-w-sm">
              Your account requires a new password before you can continue.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl mb-5 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3.5 rounded-xl mb-5 text-sm">
              <CheckCircle2 size={18} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Current (temporary) password
              </label>
              <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#0f766e] focus-within:ring-2 focus-within:ring-[#0f766e]/15 focus-within:bg-white">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  name="currentPassword"
                  placeholder="Enter temporary password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex-1 bg-transparent px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  tabIndex={-1}
                  className="px-4 text-gray-400 hover:text-[#0f766e] transition-colors flex-shrink-0"
                >
                  {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                New password
              </label>
              <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#0f766e] focus-within:ring-2 focus-within:ring-[#0f766e]/15 focus-within:bg-white">
                <input
                  type={showNew ? 'text' : 'password'}
                  name="newPassword"
                  placeholder="Min. 8 characters"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex-1 bg-transparent px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  tabIndex={-1}
                  className="px-4 text-gray-400 hover:text-[#0f766e] transition-colors flex-shrink-0"
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm new password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Confirm new password
              </label>
              <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:border-[#0f766e] focus-within:ring-2 focus-within:ring-[#0f766e]/15 focus-within:bg-white">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex-1 bg-transparent px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={-1}
                  className="px-4 text-gray-400 hover:text-[#0f766e] transition-colors flex-shrink-0"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-4 text-base font-semibold tracking-wide rounded-xl mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={20} className="animate-spin" />
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