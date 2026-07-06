import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Package, MapPin, Calendar,
  Tag, Phone, Hash, Loader2, AlertCircle, EyeOff
} from 'lucide-react';
import { getPublishedItem } from '../../api/items';

const STATUS_MAP = {
  REPORTED: 'Published',
  MATCHED:  'Matched',
  CLAIMED:  'Claimed',
  CLOSED:   'Closed',
  FOUND:    'Found',
  DELETED:  'Deleted',
};

const STATUS_COLOR = {
  REPORTED: { bg: '#dbeafe', text: '#1e40af' },
  MATCHED:  { bg: '#e0e7ff', text: '#4338ca' },
  CLAIMED:  { bg: '#fef9c3', text: '#854d0e' },
  CLOSED:   { bg: '#dcfce7', text: '#166534' },
  FOUND:    { bg: '#d1fae5', text: '#065f46' },
  DELETED:  { bg: '#fee2e2', text: '#991b1b' },
};

export default function ViewItem() {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!item);
  const [error, setError] = useState('');

  const fetchItem = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getPublishedItem(itemId);
      const payload = res?.data || res;
      setItem(payload?.data || payload);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load item details');
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    if (!item) {
      fetchItem();
    }
  }, [item, fetchItem]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 size={32} className="animate-spin text-[#1a56db]" />
      </div>
    );
  }

  // Error state (no item or fetch error)
  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
        <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-black mb-2">Item not found</h2>
        <p className="text-sm text-gray-500 mb-6">{error || 'The item could not be loaded.'}</p>
        <button
          onClick={() => navigate('/org/items')}
          className="text-[#1a56db] font-bold underline"
        >
          Back to My Items
        </button>
      </div>
    );
  }

  const statusLabel = STATUS_MAP[item.status] || item.status;
  const statusColor = STATUS_COLOR[item.status] || { bg: '#f1f5f9', text: '#475569' };

  // ── Access control: only allow viewing if status is REPORTED (Published) ──
  if (item.status !== 'REPORTED') {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-4">
          <EyeOff size={28} className="text-amber-500" />
        </div>
        <h2 className="text-xl font-black text-[#0f172a] mb-2">Viewing not available</h2>
        <p className="text-sm text-gray-500 mb-2">
          This item is currently <span className="font-bold" style={{ color: statusColor.text }}>{statusLabel}</span>.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          Detailed view is only available for published items.
        </p>
        <button
          onClick={() => navigate('/org/items')}
          className="px-5 py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-bold hover:bg-[#1547c0] transition-all"
        >
          Back to My Items
        </button>
      </div>
    );
  }

  // ── Full view (only for REPORTED items) ──
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/org/items')}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1a56db] transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to My Items
      </button>

      {/* Main card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-100/30 overflow-hidden">
        {/* Gradient top bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #1a56db, #10b981)' }} />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#0f172a] mb-2">
              {item.itemName}
            </h1>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-400">
                {item.category?.replace(/_/g, ' ')}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-black"
                style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          {/* Details grid (no images) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-[#1a56db]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Region / Area</p>
                <p className="text-sm font-semibold text-gray-800">
                  {item.region?.replace(/_/g, ' ')}, {item.area || '—'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                <Calendar size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Found Date</p>
                <p className="text-sm font-semibold text-gray-800">
                  {item.foundDate
                    ? new Date(item.foundDate).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })
                    : '—'}
                </p>
              </div>
            </div>

            {item.dominantColor && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Hash size={16} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Dominant Color</p>
                  <p className="text-sm font-semibold text-gray-800">{item.dominantColor}</p>
                </div>
              </div>
            )}

            {item.foundLocation && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Found Location</p>
                  <p className="text-sm font-semibold text-gray-800">{item.foundLocation}</p>
                </div>
              </div>
            )}

            {item.mobileReporter && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Mobile Reporter</p>
                  <p className="text-sm font-semibold text-gray-800">{item.mobileReporter}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                <Tag size={15} className="text-gray-400" />
                Description
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">
                {item.description}
              </p>
            </div>
          )}

          {/* NO image section – as requested */}
        </div>
      </div>
    </div>
  );
}