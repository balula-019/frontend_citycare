import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, UserCircle, MapPin } from 'lucide-react';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { updateUser } from '../../api/adminApi';
import { useAuth } from '../../context/AuthContext';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

export default function AdminProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();        // { id, name, email, mobile, ... }
  const userId = user?.id;           // assumes AuthContext stores the user's ID

  const [form, setForm] = useState({
    email: user?.email || '',
    mobile: user?.mobile || '',
    location_name: user?.location_name || '',
    location_lat: user?.latitude?.toString() || '',
    location_long: user?.longitude?.toString() || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Map selection only updates coordinates; it does not overwrite user's custom Area name
  const handleLocationChange = ({ lat, lng }) => {
    setForm(prev => ({
      ...prev,
      location_lat: lat.toString(),
      location_long: lng.toString(),
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!userId) {
      setError('User ID not found. Please log out and log in again.');
      return;
    }
    if (!parseFloat(form.location_lat) || !parseFloat(form.location_long)) {
      setError('Please search and select your location on the map.');
      return;
    }
    setLoading(true);
    try {
      await updateUser(userId, {
        ...form,
        location_lat: parseFloat(form.location_lat) || 0,
        location_long: parseFloat(form.location_long) || 0,
      });
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#1a56db] transition-colors mb-6 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1a56db] to-[#10b981] rounded-t-2xl" />
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-[#dbeafe] flex items-center justify-center">
              <UserCircle size={22} className="text-[#1a56db]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0f172a]">My Profile</h1>
              <p className="text-sm text-gray-500">Edit your personal account details.</p>
            </div>
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
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />

            {/* Editable Area Input Field */}
            <Input
              label="Area"
              name="location_name"
              value={form.location_name}
              onChange={handleChange}
              placeholder="e.g. Kariakoo, Block A"
            />

            {/* Location — Map Picker */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Location
              </label>
              <div className="flex items-start gap-2">
                <MapPin size={17} className="text-[#1a56db] mt-2.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <LocationPicker
                    locationName={form.location_name}
                    onChange={handleLocationChange}
                    initialLat={form.location_lat ? parseFloat(form.location_lat) : undefined}
                    initialLng={form.location_long ? parseFloat(form.location_long) : undefined}
                    placeholder="Search for your location on the map…"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading} className="flex-1">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Saving…
                  </span>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}