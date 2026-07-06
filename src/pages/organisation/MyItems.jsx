import { useState, useEffect, useCallback } from 'react';
import {
  Search, Filter, Eye, Edit2, Trash2, Package,
  PlusCircle, AlertCircle, RefreshCw, Image,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOrganizationItems } from '../../api/items';   // real API

/* ── Config ──────────────────────────────────────────────────── */
const STATUS_CFG = {
  REPORTED: { bg: '#dbeafe', text: '#1e40af', label: 'Published' },
  MATCHED:  { bg: '#e0e7ff', text: '#4338ca', label: 'Matched'  },
  CLAIMED:  { bg: '#fef9c3', text: '#854d0e', label: 'Claimed'   },
  CLOSED:   { bg: '#dcfce7', text: '#166534', label: 'Closed'    },
  FOUND:    { bg: '#d1fae5', text: '#065f46', label: 'Found'     },
};

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="h-4 rounded shimmer-bg" style={{ width: `${60 + i * 8}%` }} />
        </td>
      ))}
    </tr>
  );
}

function ConfirmModal({ message, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 scale-in">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
          <Trash2 size={22} className="text-[#ef4444]" />
        </div>
        <h3 className="text-lg font-black text-[#0f172a] mb-2">Confirm Delete</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e8f0]
                             text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#ef4444] text-white
                             text-sm font-bold hover:bg-red-600 transition-all
                             disabled:opacity-70 flex items-center justify-center gap-2">
            {loading ? <RefreshCw size={14} className="animate-spin" /> : null}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyItems() {
  const navigate = useNavigate();
  const [items,      setItems]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [search,     setSearch]     = useState('');
  const [statusFilt, setStatusFilt] = useState('ALL');
  const [sortBy,     setSortBy]     = useState({ col: 'itemName', dir: 'asc' });
  const [delTarget,  setDelTarget]  = useState(null);
  const [deleting,   setDeleting]   = useState(false);

  // ─── Real API fetch ──────────────────────────────────────────
  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getOrganizationItems(0, 100);
      const payload = res?.data || res;
      setItems(payload?.content || []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  // ─── Delete handler (placeholder) ────────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await new Promise(r => setTimeout(r, 600));
      setItems(p => p.filter(i => i.id !== delTarget.id));
      setDelTarget(null);
    } catch (e) {
      setError(e.message || 'Deletion failed');
    } finally {
      setDeleting(false);
    }
  };

  // ─── Filtering & sorting (purely frontend) ──────────────────
  const filtered = items
    .filter(i => statusFilt === 'ALL' || i.status === statusFilt)
    .filter(i =>
      !search ||
      (i.itemName && i.itemName.toLowerCase().includes(search.toLowerCase())) ||
      (i.category && i.category.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const mul = sortBy.dir === 'asc' ? 1 : -1;
      const valA = (a[sortBy.col] || '').toString().toLowerCase();
      const valB = (b[sortBy.col] || '').toString().toLowerCase();
      return valA.localeCompare(valB) * mul;
    });

  const SortIcon = ({ col }) => (
    sortBy.col === col
      ? sortBy.dir === 'asc'
        ? <ChevronUp size={13} className="text-[#1a56db]" />
        : <ChevronDown size={13} className="text-[#1a56db]" />
      : <ChevronDown size={13} className="text-gray-300" />
  );

  const toggleSort = (col) =>
    setSortBy(p => ({ col, dir: p.col === col && p.dir === 'asc' ? 'desc' : 'asc' }));

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {delTarget && (
        <ConfirmModal
          message={`Delete "${delTarget.itemName}"? This cannot be undone.`}
          onConfirm={handleDelete} onCancel={() => setDelTarget(null)} loading={deleting}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 fade-up">
        <div>
          <h1 className="text-2xl font-black text-[#0f172a]">My Published Items</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {items.length} item{items.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetch} disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
                             border-[#e2e8f0] text-sm font-bold text-gray-600
                             hover:bg-gray-50 disabled:opacity-50 transition-all">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={() => navigate('/org/publish')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                             bg-gradient-to-r from-[#1a56db] to-[#1547c0]
                             text-white text-sm font-bold hover:opacity-90 transition-all">
            <PlusCircle size={15} /> Publish New
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 mb-5
                      flex flex-col sm:flex-row gap-3 fade-up" style={{ animationDelay: '60ms' }}>
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="Search items…"
                 className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e2e8f0]
                            text-sm outline-none focus:ring-2 focus:ring-[#1a56db]/20
                            focus:border-[#1a56db] transition-all bg-[#f8fafc]" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-gray-400 shrink-0" />
          {['ALL','REPORTED','MATCHED','CLAIMED','CLOSED'].map(s => (
            <button key={s} onClick={() => setStatusFilt(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                ${statusFilt === s
                                  ? 'bg-[#1a56db] text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200
                        text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
          <AlertCircle size={16} className="shrink-0" /> {error}
          <button onClick={fetch} className="ml-auto font-bold underline">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up"
           style={{ animationDelay: '120ms' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f1f5f9] bg-[#f8fafc]">
                {[
                  { col: null,         label: 'Image'     },
                  { col: 'itemName',   label: 'Item Name' },
                  { col: 'category',   label: 'Category'  },
                  { col: 'region',     label: 'Region'    },
                  { col: null,         label: 'Status'    },
                  { col: null,         label: 'Actions'   },
                ].map(({ col, label }) => (
                  <th key={label}
                      className={`px-4 py-3 text-left text-[10px] font-black uppercase
                                  tracking-wider text-gray-400
                                  ${col ? 'cursor-pointer hover:text-gray-600' : ''}`}
                      onClick={() => col && toggleSort(col)}>
                    <div className="flex items-center gap-1">
                      {label} {col && <SortIcon col={col} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : filtered.length === 0
                ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <Package size={36} className="text-gray-200 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-gray-400 mb-1">
                        {items.length === 0 ? 'No published items yet' : 'No items match your filters'}
                      </p>
                      <p className="text-xs text-gray-300 mb-4">
                        {items.length === 0
                          ? 'Start by publishing your first found item.'
                          : 'Try adjusting your search or filters.'}
                      </p>
                      {items.length === 0 && (
                        <button onClick={() => navigate('/org/publish')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl
                                           bg-[#1a56db] text-white text-xs font-bold
                                           hover:bg-[#1547c0] transition-all">
                          <PlusCircle size={13} /> Publish Item
                        </button>
                      )}
                    </td>
                  </tr>
                )
                : filtered.map((item, i) => {
                  const sc = STATUS_CFG[item.status] || STATUS_CFG.REPORTED;
                  return (
                    <tr key={item.id}
                        className="fade-up hover:bg-[#f8fafc] transition-colors"
                        style={{ animationDelay: `${i * 40}ms` }}>
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden">
                          {item.previewImage
                            ? <img src={item.previewImage} alt=""
                                   className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center">
                                <Image size={16} className="text-gray-300" />
                              </div>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold text-[#0f172a] truncate max-w-[180px]">
                          {item.itemName}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {item.category?.replace(/_/g,' ')}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {item.region?.replace(/_/g,' ')}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black"
                              style={{ backgroundColor: sc.bg, color: sc.text }}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => navigate(`/org/items/${item.id}`)}
                                  className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center
                                             justify-center transition-all group"
                                  title="View">
                            <Eye size={15} className="text-gray-400 group-hover:text-[#1a56db]" />
                          </button>
                          <button
                            onClick={() => navigate(`/org/items/${item.id}/edit`, { state: { item } })}
                            className="w-8 h-8 rounded-lg hover:bg-amber-50 flex items-center
                                             justify-center transition-all group"
                            title="Edit"
                          >
                            <Edit2 size={15} className="text-gray-400 group-hover:text-amber-600" />
                          </button>
                          <button onClick={() => setDelTarget(item)}
                                  className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center
                                             justify-center transition-all group"
                                  title="Delete">
                            <Trash2 size={15} className="text-gray-400 group-hover:text-[#ef4444]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}