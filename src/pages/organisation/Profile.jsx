// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Building2, Mail, Phone, FileText, MapPin,
//   Loader2, CheckCircle, AlertCircle, ArrowLeft
// } from 'lucide-react';
// import { updateOrganisationProfile } from '../../api/items';
// import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

// /* ── Helper: parse "PREFIX - Name" from organisation name ────── */
// function parseOrgName(fullName) {
//   if (!fullName) return { prefix: '', name: '' };
//   const idx = fullName.indexOf(' - ');
//   if (idx === -1) return { prefix: '', name: fullName };
//   return {
//     prefix: fullName.substring(0, idx),
//     name: fullName.substring(idx + 3),
//   };
// }

// export default function Profile() {
//   const navigate = useNavigate();

//   // ── Read current user from localStorage (or AuthContext) ──
//   const storedUser = (() => {
//     try {
//       return JSON.parse(localStorage.getItem('user') || '{}');
//     } catch { return {}; }
//   })();

//   const { prefix, name: orgNameOnly } = parseOrgName(
//     storedUser.organization_name || storedUser.full_name || ''
//   );

//   const [form, setForm] = useState({
//     organisationName: orgNameOnly,
//     mobile: storedUser.mobile || '',
//     email: storedUser.email || '',
//     description: '',
//     locationName: '',
//     latitude: '',
//     longitude: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   // Pre‑fill location from stored user (if available)
//   useEffect(() => {
//     setForm(prev => ({
//       ...prev,
//       locationName: storedUser.location_name || '',
//       latitude: storedUser.latitude?.toString() || '',
//       longitude: storedUser.longitude?.toString() || '',
//       description: storedUser.description || '',
//     }));
//     setLoading(false);
//   }, []);

//   // ── Validation ──────────────────────────────────────────────
//   const validate = () => {
//     if (!form.organisationName.trim()) {
//       setError('Organisation name is required.');
//       return false;
//     }
//     if (!form.mobile.trim()) {
//       setError('Mobile number is required.');
//       return false;
//     }
//     if (!/^(\+?255)?0?[67]\d{8}$/.test(form.mobile.replace(/\s/g, ''))) {
//       setError('Please enter a valid Tanzanian mobile number.');
//       return false;
//     }
//     if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
//       setError('Please select a location from the map.');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!validate()) return;

//     setSaving(true);
//     try {
//       const payload = {
//         organisationName: form.organisationName.trim(),
//         mobile: form.mobile.trim(),
//         locationName: form.locationName,
//         latitude: parseFloat(form.latitude) || 0,
//         longitude: parseFloat(form.longitude) || 0,
//         description: form.description.trim(),
//       };

//       const res = await updateOrganisationProfile(payload);
//       // Update local storage with new data
//       const updated = res?.data?.data || res?.data || res;
//       if (updated) {
//         const newUser = { ...storedUser, ...updated, mobile: updated.mobile, location_name: updated.locationName };
//         localStorage.setItem('user', JSON.stringify(newUser));
//       }
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Update failed. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const setField = (key, value) => {
//     setForm(prev => ({ ...prev, [key]: value }));
//     setError('');
//   };

//   // ── Loading skeleton ─────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
//         <div className="animate-pulse space-y-6">
//           <div className="h-6 w-48 rounded bg-gray-200" />
//           {Array.from({ length: 5 }).map((_, i) => (
//             <div key={i} className="h-20 rounded-xl bg-gray-100" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
//       {/* Back link */}
//       <button
//         onClick={() => navigate('/org/dashboard')}
//         className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6 transition-colors"
//       >
//         <ArrowLeft size={15} /> Back to Dashboard
//       </button>

//       <div className="mb-8">
//         <h1 className="text-2xl font-black text-[#0f172a]">Organisation Profile</h1>
//         <p className="text-sm text-gray-400 mt-0.5">Manage your organisation's public details</p>
//       </div>

//       {/* Success toast */}
//       {success && (
//         <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">
//           <CheckCircle size={16} className="shrink-0" />
//           Profile updated successfully.
//         </div>
//       )}

//       {/* Error banner */}
//       {error && (
//         <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
//           <AlertCircle size={16} className="shrink-0" />
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Organisation Type (read‑only) */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
//           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
//             Organisation Type
//           </label>
//           <div className="flex items-center gap-2">
//             <Building2 size={18} className="text-[#1a56db]" />
//             <span className="text-sm font-bold text-[#0f172a]">{prefix || 'PUBLIC'}</span>
//           </div>
//         </div>

//         {/* Organisation Name (editable part) */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
//           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
//             Organisation Name
//           </label>
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-bold text-gray-400">{prefix}</span>
//             <span className="text-sm text-gray-400">-</span>
//             <input
//               type="text"
//               value={form.organisationName}
//               onChange={e => setField('organisationName', e.target.value)}
//               className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm font-semibold text-[#0f172a]"
//               placeholder="Enter organisation name"
//             />
//           </div>
//         </div>

//         {/* Email (read‑only) */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
//           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
//             Email
//           </label>
//           <div className="flex items-center gap-2">
//             <Mail size={18} className="text-[#1a56db]" />
//             <input
//               type="email"
//               value={form.email}
//               disabled
//               className="flex-1 px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
//             />
//           </div>
//         </div>

//         {/* Mobile */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
//           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
//             Mobile Number
//           </label>
//           <div className="flex items-center gap-2">
//             <Phone size={18} className="text-[#1a56db]" />
//             <input
//               type="tel"
//               value={form.mobile}
//               onChange={e => setField('mobile', e.target.value)}
//               placeholder="+255 7XX XXX XXX"
//               className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm font-semibold text-[#0f172a]"
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
//           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
//             Description
//           </label>
//           <div className="flex items-start gap-2">
//             <FileText size={18} className="text-[#1a56db] mt-2" />
//             <div className="flex-1">
//               <textarea
//                 value={form.description}
//                 onChange={e => setField('description', e.target.value)}
//                 maxLength={500}
//                 rows={4}
//                 placeholder="Tell us about your organisation…"
//                 className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm text-[#0f172a] resize-none"
//               />
//               <p className="text-xs text-gray-400 mt-1">{form.description.length}/500</p>
//             </div>
//           </div>
//         </div>

//         {/* Location */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
//           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
//             Location
//           </label>
//           <div className="flex items-start gap-2">
//             <MapPin size={18} className="text-[#1a56db] mt-1" />
//             <div className="flex-1">
//               <LocationPicker
//                 locationName={form.locationName}
//                 onChange={({ locationName, lat, lng }) => {
//                   setField('locationName', locationName);
//                   setField('latitude', lat.toString());
//                   setField('longitude', lng.toString());
//                 }}
//                 initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
//                 initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
//                 placeholder="Search for your organisation's location…"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Save button */}
//         <button
//           type="submit"
//           disabled={saving}
//           className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
//                      bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
//                      hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
//         >
//           {saving ? (
//             <><Loader2 size={16} className="animate-spin" /> Saving…</>
//           ) : (
//             'Save Changes'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

// src/pages/organisation/Profile.jsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Mail, Phone, FileText, MapPin,
  Loader2, CheckCircle, AlertCircle, ArrowLeft
} from 'lucide-react';
import { updateOrganisationProfile } from '../../api/items';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

function parseOrgName(fullName) {
  if (!fullName) return { prefix: '', name: '' };
  const idx = fullName.indexOf(' - ');
  if (idx === -1) return { prefix: '', name: fullName };
  return {
    prefix: fullName.substring(0, idx),
    name: fullName.substring(idx + 3),
  };
}

export default function Profile() {
  const navigate = useNavigate();

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch { return {}; }
  })();

  const { prefix, name: orgNameOnly } = parseOrgName(
    storedUser.organization_name || storedUser.full_name || ''
  );

  const [form, setForm] = useState({
    organisationName: orgNameOnly,
    mobile: storedUser.mobile || '',
    email: storedUser.email || '',
    description: '',
    locationName: '',
    latitude: '',
    longitude: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      locationName: storedUser.location_name || '',
      latitude: storedUser.latitude?.toString() || '',
      longitude: storedUser.longitude?.toString() || '',
      description: storedUser.description || '',
    }));
    setLoading(false);
  }, []);

  const validate = () => {
    if (!form.organisationName.trim()) {
      setError('Organisation name is required.');
      return false;
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      setError('A valid email address is required.');
      return false;
    }
    if (!form.mobile.trim()) {
      setError('Mobile number is required.');
      return false;
    }
    if (!/^(\+?255)?0?[67]\d{8}$/.test(form.mobile.replace(/\s/g, ''))) {
      setError('Please enter a valid Tanzanian mobile number.');
      return false;
    }
    if (!parseFloat(form.latitude) || !parseFloat(form.longitude)) {
      setError('Please select a location from the map.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        organisationName: form.organisationName.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        locationName: form.locationName,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
        description: form.description.trim(),
      };

      const res = await updateOrganisationProfile(payload);
      const updated = res?.data?.data || res?.data || res;
      if (updated) {
        const newUser = { ...storedUser, ...updated, mobile: updated.mobile, email: updated.email, location_name: updated.locationName };
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  const setField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto animate-pulse space-y-6">
        <div className="h-6 w-48 rounded bg-gray-200" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/org/dashboard')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#0f172a]">Organisation Profile</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your public details</p>
      </div>

      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">
          <CheckCircle size={16} className="shrink-0" />
          Profile updated successfully.
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organisation Type */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Organisation Type</label>
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-[#1a56db]" />
            <span className="text-sm font-bold text-[#0f172a]">{prefix || 'PUBLIC'}</span>
          </div>
        </div>

        {/* Organisation Name */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Organisation Name</label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-400">{prefix}</span>
            <span className="text-sm text-gray-400">-</span>
            <input
              type="text"
              value={form.organisationName}
              onChange={e => setField('organisationName', e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm font-semibold text-[#0f172a]"
              placeholder="Enter organisation name"
            />
          </div>
        </div>

        {/* Email – now editable */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-[#1a56db]" />
            <input
              type="email"
              value={form.email}
              onChange={e => setField('email', e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm font-semibold text-[#0f172a]"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Mobile Number</label>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-[#1a56db]" />
            <input
              type="tel"
              value={form.mobile}
              onChange={e => setField('mobile', e.target.value)}
              placeholder="+255 7XX XXX XXX"
              className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm font-semibold text-[#0f172a]"
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Description</label>
          <div className="flex items-start gap-2">
            <FileText size={18} className="text-[#1a56db] mt-2" />
            <div className="flex-1">
              <textarea
                value={form.description}
                onChange={e => setField('description', e.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Tell us about your organisation…"
                className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#1a56db]/20 text-sm text-[#0f172a] resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{form.description.length}/500</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Location</label>
          <div className="flex items-start gap-2">
            <MapPin size={18} className="text-[#1a56db] mt-1" />
            <div className="flex-1">
              <LocationPicker
                locationName={form.locationName}
                onChange={({ locationName, lat, lng }) => {
                  setField('locationName', locationName);
                  setField('latitude', lat.toString());
                  setField('longitude', lng.toString());
                }}
                initialLat={form.latitude ? parseFloat(form.latitude) : undefined}
                initialLng={form.longitude ? parseFloat(form.longitude) : undefined}
                placeholder="Search for your organisation's location…"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                     bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
                     hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
        >
          {saving ? (
            <><Loader2 size={16} className="animate-spin" /> Saving…</>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
}