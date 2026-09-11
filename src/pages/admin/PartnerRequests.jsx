import { useState, useEffect, useCallback } from 'react';
import {
  RefreshCw, Handshake, Loader2, CheckCircle2, XCircle, Clock,
  AlertCircle, Mail, Phone, Building2, User as UserIcon,
} from 'lucide-react';
import { getAllPartnerRequests, updatePartnerRequestStatus } from '../../api/partnerApi';

export default function AdminPartnerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState({}); // requestId -> true
  const [filter, setFilter] = useState('ALL'); // ALL | PENDING | APPROVED | REJECTED

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllPartnerRequests();

      // Backend returns a plain array, but be defensive about wrappers
      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.content)
        ? res.data.content
        : Array.isArray(res?.content)
        ? res.content
        : [];

      setRequests(list);
    } catch (err) {
      setError(err?.message || 'Failed to load partner requests.');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleStatusChange = async (requestId, status) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: true }));
    setError('');
    setSuccess('');
    try {
      await updatePartnerRequestStatus(requestId, { status });
      setSuccess(`Request ${status.toLowerCase()} successfully.`);
      await fetchRequests();
      setTimeout(() => setSuccess(''), 3500);
    } catch (err) {
      setError(err?.message || 'Failed to update partner request.');
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  const statusBadge = (status) => {
    const map = {
      PENDING:  { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      APPROVED: { bg: 'bg-green-100',  text: 'text-green-700',  icon: CheckCircle2 },
      REJECTED: { bg: 'bg-red-100',    text: 'text-red-700',    icon: XCircle },
    };
    const cfg = map[status] || map.PENDING;
    const Icon = cfg.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}
      >
        <Icon size={12} /> {status}
      </span>
    );
  };

  const filtered = filter === 'ALL'
    ? requests
    : requests.filter((r) => r.status === filter);

  const counts = {
    ALL: requests.length,
    PENDING: requests.filter((r) => r.status === 'PENDING').length,
    APPROVED: requests.filter((r) => r.status === 'APPROVED').length,
    REJECTED: requests.filter((r) => r.status === 'REJECTED').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#dbeafe] flex items-center justify-center">
              <Handshake size={22} className="text-[#1a56db]" />
            </div>
            <div>
              <h1
                className="text-xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Partner Requests
              </h1>
              <p className="text-sm text-gray-500">
                Review and manage partnership applications
              </p>
            </div>
          </div>
          <button
            onClick={fetchRequests}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 self-start sm:self-auto"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            <AlertCircle size={16} className="shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-4 text-sm">
            <CheckCircle2 size={16} className="shrink-0" /> {success}
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-[#1a56db] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-[#e2e8f0] hover:bg-gray-50'
              }`}
            >
              {tab} ({counts[tab]})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center p-16">
              <Loader2 size={32} className="animate-spin text-[#1a56db]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <Handshake size={44} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">
                {filter === 'ALL'
                  ? 'No partner requests yet.'
                  : `No ${filter.toLowerCase()} requests.`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((req) => (
                <div key={req.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left: org info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-base truncate">
                          {req.organizationName}
                        </h3>
                        {statusBadge(req.status)}
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full">
                          {req.partnershipType}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2 truncate">
                          <UserIcon size={14} className="text-gray-400 shrink-0" />
                          <span className="truncate">{req.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <Mail size={14} className="text-gray-400 shrink-0" />
                          <span className="truncate">{req.email}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <Phone size={14} className="text-gray-400 shrink-0" />
                          <span className="truncate">{req.phoneNumber}</span>
                        </div>
                        {req.reviewedBy && (
                          <div className="flex items-center gap-2 truncate">
                            <Building2 size={14} className="text-gray-400 shrink-0" />
                            <span className="truncate">Reviewed by {req.reviewedBy}</span>
                          </div>
                        )}
                      </div>

                      {req.message && (
                        <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 border border-gray-100">
                          <p className="line-clamp-3">{req.message}</p>
                        </div>
                      )}

                      {req.adminNote && (
                        <p className="text-xs text-gray-500 mt-2 italic">
                          Admin note: {req.adminNote}
                        </p>
                      )}

                      {req.createdDate && (
                        <p className="text-[11px] text-gray-400 mt-2">
                          Submitted {new Date(req.createdDate).toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* Right: actions */}
                    <div className="flex lg:flex-col gap-2 shrink-0">
                      {req.status === 'PENDING' ? (
                        <>
                          <button
                            onClick={() => handleStatusChange(req.id, 'APPROVED')}
                            disabled={actionLoading[req.id]}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-sm"
                          >
                            {actionLoading[req.id] ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <CheckCircle2 size={15} />
                            )}
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(req.id, 'REJECTED')}
                            disabled={actionLoading[req.id]}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-white text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-50 transition-all"
                          >
                            {actionLoading[req.id] ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <XCircle size={15} />
                            )}
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic self-start lg:self-center">
                          No actions
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}