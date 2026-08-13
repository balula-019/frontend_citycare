import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Building2, Mail, Phone, FileText, MapPin,
  CheckCircle2, AlertCircle, Loader2, ShieldCheck, GraduationCap
} from 'lucide-react';
import { createOrganisation } from '../../api/adminApi';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import LocationPicker from '../../components/shared/LocationPicker/components/LocationPicker';

const ORG_TYPES = [
  { value: 'PUBLIC',     label: 'Public',     description: 'Police stations, airports, transit hubs', icon: ShieldCheck },
  { value: 'UNIVERSITY', label: 'University', description: 'Campus lost-and-found offices',            icon: GraduationCap },
];

export default function CreateOrganisation() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    organization_name: '', email: '', mobile: '', description: '',
    location_name: '', location_lat: '', location_long: '', organization_type: 'PUBLIC'
  });
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const selectType = (value) => setForm({ ...form, organization_type: value });

  const handleLocationChange = ({ locationName, lat, lng }) => {
    setForm(prev => ({
      ...prev,
      location_name: locationName,
      location_lat: lat.toString(),
      location_long: lng.toString(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!parseFloat(form.location_lat) || !parseFloat(form.location_long)) {
      setError('Please search and select a location for this organisation.');
      return;
    }

    setSubmitting(true);
    try {
      await createOrganisation({
        ...form,
        location_lat: parseFloat(form.location_lat) || 0,
        location_long: parseFloat(form.location_long) || 0,
      });
      setSuccess('Organisation created! A temporary password has been sent to their email.');
      setForm({ ...form, organization_name: '', email: '', mobile: '', description: '', location_name: '', location_lat: '', location_long: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const activeType = ORG_TYPES.find(t => t.value === form.organization_type);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.35s ease-out forwards; }
      `}</style>

      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">

        {/* Back + header */}
        <div className="fade-up mb-6">
          <button onClick={() => navigate(-1)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-500
                             hover:text-[#1a56db] transition-colors mb-4 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#dbeafe] flex items-center justify-center">
              <Building2 size={20} className="text-[#1a56db]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0f172a]">Create Organisation</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Onboard a new verified partner to receive and publish found items.
              </p>
            </div>
          </div>
        </div>

        {/* Banners */}
        {error && (
          <div className="fade-up flex items-center gap-3 bg-red-50 border border-red-200
                          text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            <span className="flex-1">{error}</span>
          </div>
        )}
        {success && (
          <div className="fade-up flex items-center gap-3 bg-emerald-50 border border-emerald-200
                          text-emerald-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <CheckCircle2 size={16} className="shrink-0" />
            <span className="flex-1">{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form */}
          <form onSubmit={handleSubmit}
                className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8
                           space-y-6 fade-up" style={{ animationDelay: '80ms' }}>

            {/* Organisation type */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Organisation type
              </p>
              <div className="grid grid-cols-2 gap-3">
                {ORG_TYPES.map((t) => {
                  const Icon = t.icon;
                  const active = form.organization_type === t.value;
                  return (
                    <button
                      type="button"
                      key={t.value}
                      onClick={() => selectType(t.value)}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all
                        ${active
                          ? 'border-[#1a56db] bg-[#eff6ff] ring-2 ring-[#1a56db]/20'
                          : 'border-[#e2e8f0] hover:border-[#c7d2e3] hover:bg-gray-50'}`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                        ${active ? 'bg-[#1a56db] text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${active ? 'text-[#1a56db]' : 'text-[#0f172a]'}`}>
                          {t.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{t.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Organisation details */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Organisation details
              </p>
              <div className="space-y-4">
                <Input label="Organisation Name" name="organization_name" required
                       placeholder="e.g. Kariakoo Police Station"
                       onChange={handleChange} value={form.organization_name} />
                <Input label="Description" name="description"
                       placeholder="A short note about this organisation"
                       onChange={handleChange} value={form.description} />
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Contact information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Email" name="email" type="email" required
                       placeholder="org@example.com"
                       onChange={handleChange} value={form.email} />
                <Input label="Mobile" name="mobile" required
                       placeholder="255 7XX XXX XXX"
                       onChange={handleChange} value={form.mobile} />
              </div>
            </div>

            {/* Location — search-based, no manual lat/long entry */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Location
              </p>
              <div className="flex items-start gap-2">
                <MapPin size={17} className="text-[#1a56db] mt-2.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <LocationPicker
                    locationName={form.location_name}
                    onChange={handleLocationChange}
                    initialLat={form.location_lat ? parseFloat(form.location_lat) : undefined}
                    initialLng={form.location_long ? parseFloat(form.location_long) : undefined}
                    placeholder="Search for the organisation's location…"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e2e8f0] flex items-center gap-3">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}
                      className="shrink-0">
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting} className="flex-1">
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Creating…
                  </span>
                ) : (
                  'Create Organisation'
                )}
              </Button>
            </div>
          </form>

          {/* Live preview */}
          <div className="fade-up" style={{ animationDelay: '160ms' }}>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sticky top-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">
                Preview
              </p>

              <div className="rounded-xl border border-[#e2e8f0] p-4 bg-gradient-to-br from-[#f8fafc] to-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1a56db] flex items-center justify-center shrink-0">
                    <Building2 size={20} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0f172a] truncate">
                      {form.organization_name || 'Organisation name'}
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                                     text-[10px] font-bold bg-[#dbeafe] text-[#1e40af] mt-1">
                      {activeType?.icon && <activeType.icon size={10} />}
                      {activeType?.label}
                    </span>
                  </div>
                </div>

                {form.description && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{form.description}</p>
                )}

                <div className="space-y-2 pt-3 border-t border-[#e2e8f0]">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail size={13} className="text-gray-400 shrink-0" />
                    <span className="truncate">{form.email || 'email@organisation.com'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone size={13} className="text-gray-400 shrink-0" />
                    <span className="truncate">{form.mobile || '255 7XX XXX XXX'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={13} className="text-gray-400 shrink-0" />
                    <span className="truncate">{form.location_name || 'Location not set'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <FileText size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  A temporary password is emailed automatically once the organisation is created.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}