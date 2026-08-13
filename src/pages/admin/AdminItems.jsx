
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, RefreshCw, AlertCircle, Package,
  Loader2, ChevronLeft, ChevronRight, Edit
} from 'lucide-react';
import { getPublicItems } from '../../api/adminApi';

export default function AdminItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchItems = useCallback(async (pageNum = 0) => {
    setLoading(true);
    setError('');
    try {
      const params = { page: pageNum, size: 20 };
      const res = await getPublicItems(params);
      const data = res?.data || res;
      setItems(data.content || []);
      setTotalPages(data.totalPages || 1);
      setPage(pageNum);
    } catch (err) {
      setError(err.message || 'Failed to load items.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(0); }, [fetchItems]);

  const handleEdit = (item) => {
    navigate(`/admin/edit-item/${item.id}`, { state: { item } });
  };

  const prevPage = () => { if (page > 0) fetchItems(page - 1); };
  const nextPage = () => { if (page < totalPages - 1) fetchItems(page + 1); };

  const statusBadge = (status) => {
    const map = {
      REPORTED: 'bg-gray-100 text-gray-700',
      MATCHED: 'bg-blue-100 text-blue-700',
      CLAIMED: 'bg-green-100 text-green-700',
      CLOSED: 'bg-red-100 text-red-700',
      FOUND: 'bg-emerald-100 text-emerald-700',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${map[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7fd] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1a56db] mb-6"
        >
          <ArrowLeft size={15} /> Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dbeafe] flex items-center justify-center">
              <Package size={20} className="text-[#1a56db]" />
            </div>
            <h1 className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Manage Items
            </h1>
          </div>
          <button
            onClick={() => fetchItems(0)}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 size={32} className="animate-spin text-[#1a56db]" />
            </div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center">
              <Package size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No items found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Item Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Region</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {item.itemName || '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{item.category?.replace(/_/g, ' ') || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{item.region?.replace(/_/g, ' ') || '—'}</td>
                      <td className="px-4 py-3">{statusBadge(item.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <span className="text-xs text-gray-500">
                Page {page + 1} of {totalPages}
              </span>
              <div className="flex gap-1">
                <button onClick={prevPage} disabled={page === 0} className="p-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextPage} disabled={page >= totalPages - 1} className="p-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}