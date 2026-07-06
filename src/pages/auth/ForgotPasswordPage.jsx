// // src/pages/ForgotPasswordPage.jsx

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import { forgotPassword } from '../../api/auth';
// import Button from '../../components/shared/Button';
// import Input from '../../components/shared/Input';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     try {
//       await forgotPassword(email);
//       setSuccess('OTP sent to your email. Redirecting...');
//       setTimeout(() => navigate('/reset-password', { state: { email } }), 1500);
//     } catch (err) {
//       setError(err.message || 'Failed to send OTP. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#f8fafc] flex flex-col items-center justify-center px-4 py-8">
//       {/* Back button – top right */}
//       <div className="absolute top-6 right-6">
//         <button
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2 text-gray-500 hover:text-gray-800
//                      bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl
//                      px-3 py-2 text-sm font-medium transition-all hover:shadow-sm"
//           aria-label="Back to home"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>
//       </div>

//       {/* Main card */}
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//         {/* Logo / brand area */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-12 h-12 rounded-xl bg-[#1a56db] text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
//             <span className="text-2xl font-bold">P</span>
//           </div>
//           <h1 className="text-2xl font-extrabold text-gray-900">Forgot password?</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Enter your email and we'll send you an OTP to reset it.
//           </p>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
//             <span className="text-red-500 font-bold shrink-0">!</span>
//             {error}
//           </div>
//         )}

//         {/* Success message */}
//         {success && (
//           <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
//             <span className="text-green-500 font-bold shrink-0">✓</span>
//             {success}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <Input
//             label="Email address"
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             autoComplete="email"
//           />

//           <Button
//             variant="primary"
//             type="submit"
//             className="w-full py-3 text-base font-semibold tracking-wide"
//           >
//             Send OTP
//           </Button>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-500">
//             Remember your password?{' '}
//             <button
//               onClick={() => navigate('/login')}
//               className="font-semibold text-[#1a56db] hover:underline"
//             >
//               Sign in
//             </button>
//           </p>
//         </div>
//       </div>

//       {/* Bottom subtle text */}
//       <p className="text-xs text-gray-400 mt-6 text-center">
//         If you didn't receive the email, check your spam folder or try again.
//       </p>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, ArrowRight } from 'lucide-react';
import { forgotPassword } from '../../api/auth';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logoSrc from '/src/assets/pata-logo.png';

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
    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess('OTP sent to your email. Redirecting...');
      setTimeout(() => navigate('/reset-password', { state: { email } }), 1500);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
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
        {/* Gradient top bar */}
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
              Forgot password?
            </h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Enter your email and we'll send you an OTP to reset it.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
              <span className="text-red-500 font-bold shrink-0">!</span>
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
              <span className="text-green-500 font-bold shrink-0">✓</span>
              {success}
            </div>
          )}

          {/* Form */}
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

          {/* Footer */}
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

      {/* Bottom note */}
      <p className="absolute bottom-6 text-xs text-gray-400 text-center w-full">
        If you didn't receive the email, check your spam folder or try again.
      </p>
    </div>
  );
}