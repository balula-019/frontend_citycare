import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { updatePublishedItem } from '../../api/organization.js';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

const CATEGORIES = [
  'PHONES','KISWASWADU','LAPTOPS','TABLETS','ELECTRONICS',
  'DOCUMENTS','IDS','PASSPORTS','CERTIFICATES','CARDS',
  'BAGS','WALLETS','PURSES','SUITCASES','KEYS','CLOTHES',
  'SHOES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
  'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES',
  'TOYS','MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS',
  'FOOD_CONTAINERS','UMBRELLAS','OTHERS'
];

const REGIONS = [
  'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
  'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
  'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
  'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI','PEMBA'
];

const STATUSES = ['REPORTED', 'MATCHED', 'CLAIMED', 'CLOSED', 'FOUND'];

export default function EditItem() {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Load item data from route state
  useEffect(() => {
    if (location.state?.item) {
      const item = location.state.item;
      setForm({
        itemName: item.itemName || '',
        description: item.description || '',
        category: item.category || '',
        foundDate: item.foundDate ? item.foundDate.split('T')[0] : '',
        region: item.region || '',
        area: item.area || '',
        dominantColor: item.dominantColor || '',
        foundLocation: item.foundLocation || '',
        mobileReporter: item.mobileReporter || '',
        latitude: item.latitude ?? '',
        longitude: item.longitude ?? '',
        status: item.status || 'REPORTED',
        imageUrls: item.imageUrls || [],
      });
    } else {
      setError('No item data provided. Please go back and try again.');
    }
  }, [location.state, itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form) return;

    setSaving(true);
    setError('');
    try {
      // Convert latitude/longitude to numbers if provided
      const payload = {
        ...form,
        latitude: form.latitude !== '' ? parseFloat(form.latitude) : null,
        longitude: form.longitude !== '' ? parseFloat(form.longitude) : null,
        imageUrls: form.imageUrls || [],
      };
      await updatePublishedItem(itemId, payload);
      navigate('/org/items', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to update item.');
    } finally {
      setSaving(false);
    }
  };

  // Loading / error states
  if (!form && !error) {
    return (
      <div className="p-8 flex justify-center">
        <Loader2 size={32} className="animate-spin text-[#1a56db]" />
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/org/items')}
          className="px-4 py-2 rounded-xl bg-[#1a56db] text-white text-sm font-bold"
        >
          Back to My Items
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/org/items')}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1a56db] transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to My Items
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-black text-[#0f172a] mb-1">Edit Published Item</h1>
        <p className="text-sm text-gray-400 mb-8">Update the details of your found item.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
            <span className="font-bold shrink-0">!</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Item Name *"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              required
              disabled={saving}
            />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none bg-white text-sm"
                required
                disabled={saving}
              >
                <option value="">Select category</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none text-sm resize-none"
              required
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Found Date *"
              type="date"
              name="foundDate"
              value={form.foundDate}
              onChange={handleChange}
              required
              disabled={saving}
            />
            <Input
              label="Dominant Color"
              name="dominantColor"
              value={form.dominantColor}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Region *</label>
              <select
                name="region"
                value={form.region}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none bg-white text-sm"
                required
                disabled={saving}
              >
                <option value="">Select region</option>
                {REGIONS.map(r => (
                  <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
            <Input
              label="Area *"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Found Location *"
              name="foundLocation"
              value={form.foundLocation}
              onChange={handleChange}
              required
              disabled={saving}
            />
            <Input
              label="Mobile Reporter *"
              name="mobileReporter"
              value={form.mobileReporter}
              onChange={handleChange}
              required
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitude"
              name="latitude"
              type="number"
              step="any"
              value={form.latitude}
              onChange={handleChange}
              disabled={saving}
            />
            <Input
              label="Longitude"
              name="longitude"
              type="number"
              step="any"
              value={form.longitude}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          {/* ── Status field – view-only for organisations ── */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed"
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Only admins can change the status.
            </p>
          </div>

          <div className="pt-4">
            <Button
              variant="primary"
              type="submit"
              className="w-full py-3 text-sm font-semibold tracking-wide rounded-xl"
              disabled={saving}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Saving…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Save size={18} />
                  Save Changes
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}