import { useState, useEffect, useCallback } from 'react';
import {
  RefreshCw, Handshake, Loader2, CheckCircle2, XCircle, Clock,
  AlertCircle, Mail, Phone, Building2, User as UserIcon,
  MessageSquare, Trash2,
} from 'lucide-react';
import {
  getAllPartnerRequests,
  updatePartnerRequestStatus,
  deletePartnerRequest,
} from '../../api/partnerApi';

/* ── Delete confirmation modal ────────────────────── */
function DeleteConfirmModal({ request, onClose, onConfirm, loading }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-red-600" />
          </div>
          <h3 className="text-lg font-black text-[#0f172a]">Delete Partner Request</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Permanently delete the request from{' '}
          <span className="font-bold">{request.organizationName}</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e8f0]
                       text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all
                       disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white
                       text-sm font-bold hover:bg-red-700 transition-all
                       disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 size={14} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPartnerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // ✅ requestId -> 'APPROVED' | 'REJECTED' (which button is currently processing)
  const [actionLoading, setActionLoading] = useState({});
  const [filter, setFilter] = useState('ALL');
  const [notes, setNotes] = useState({});
  const [noteErrors, setNoteErrors] = useState({});
  // ✅ Delete state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllPartnerRequests();

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

  const handleNoteChange = (requestId, value) => {
    setNotes((prev) => ({ ...prev, [requestId]: value }));
    setNoteErrors((prev) => ({ ...prev, [requestId]: '' }));
  };

  const handleStatusChange = async (requestId, status) => {
    const note = (notes[requestId] || '').trim();

    if (!note) {
      setNoteErrors((prev) => ({
        ...prev,
        [requestId]: 'Please write a note before approving or rejecting.',
      }));
      return;
    }

    setActionLoading((prev) => ({ ...prev, [requestId]: status }));
    setError('');
    setSuccess('');
    try {
      await updatePartnerRequestStatus(requestId, {
        status,
        adminNote: note,
      });
      setSuccess(`Request ${status.toLowerCase()} successfully.`);

      setNotes((prev) => {
        const next = { ...prev };
        delete next[requestId];
        return next;
      });

      await fetchRequests();
      setTimeout(() => setSuccess(''), 3500);
    } catch (err) {
      setError(err?.message || 'Failed to update partner request.');
    } finally {
      setActionLoading((prev) => {
        const next = { ...prev };
        delete next[requestId];
        return next;
      });
    }
  };

  /* ✅ Delete handler — only allowed for APPROVED / REJECTED */
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError('');
    setSuccess('');
    try {
      await deletePartnerRequest(deleteTarget.id);
      // ✅ Success message shown right after the row disappears
      setSuccess('Partner request deleted successfully.');
      // Remove the row immediately
      setRequests((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
      setTimeout(() => setSuccess(''), 3500);
    } catch (err) {
      setError(err?.message || 'Failed to delete partner request.');
    } finally {
      setDeleting(false);
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
      {deleteTarget && (
        <DeleteConfirmModal
          request={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}

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
              {filtered.map((req) => {
                const note = notes[req.id] || '';
                const noteError = noteErrors[req.id];
                const canSubmit = note.trim().length > 0;

                const activeAction = actionLoading[req.id]; // undefined | 'APPROVED' | 'REJECTED'
                const approvingThis = activeAction === 'APPROVED';
                const rejectingThis = activeAction === 'REJECTED';
                const anyActionInFlight = Boolean(activeAction);

                // ✅ Delete only allowed once reviewed
                const canDelete = req.status === 'APPROVED' || req.status === 'REJECTED';

                return (
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
                          <div className="mt-2 text-xs text-gray-500 italic flex items-start gap-1.5">
                            <MessageSquare size={12} className="mt-0.5 shrink-0" />
                            <span>Admin note: {req.adminNote}</span>
                          </div>
                        )}

                        {req.createdDate && (
                          <p className="text-[11px] text-gray-400 mt-2">
                            Submitted {new Date(req.createdDate).toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Right: note + actions */}
                      <div className="lg:w-72 w-full shrink-0">
                        {req.status === 'PENDING' ? (
                          <>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                              <MessageSquare size={12} className="text-[#1a56db]" />
                              Admin Note <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              value={note}
                              onChange={(e) => handleNoteChange(req.id, e.target.value)}
                              rows={3}
                              disabled={anyActionInFlight}
                              placeholder="Write a note before approving or rejecting…"
                              className={`w-full px-3 py-2 text-sm rounded-xl border outline-none resize-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed ${
                                noteError
                                  ? 'border-red-300 focus:ring-2 focus:ring-red-200'
                                  : 'border-[#e2e8f0] focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]'
                              }`}
                            />
                            {noteError && (
                              <p className="text-[11px] text-red-600 mt-1">{noteError}</p>
                            )}

                            <div className="flex gap-2 mt-2.5">
                              <button
                                onClick={() => handleStatusChange(req.id, 'APPROVED')}
                                disabled={anyActionInFlight || !canSubmit}
                                title={!canSubmit ? 'Write a note first' : 'Approve'}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                              >
                                {approvingThis ? (
                                  <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Approving…
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 size={15} />
                                    Approve
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleStatusChange(req.id, 'REJECTED')}
                                disabled={anyActionInFlight || !canSubmit}
                                title={!canSubmit ? 'Write a note first' : 'Reject'}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold bg-white text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                              >
                                {rejectingThis ? (
                                  <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Rejecting…
                                  </>
                                ) : (
                                  <>
                                    <XCircle size={15} />
                                    Reject
                                  </>
                                )}
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-start lg:items-end gap-2">
                            <span className="text-xs text-gray-400 italic">
                              Reviewed — no further action needed
                            </span>
                            {canDelete && (
                              <button
                                onClick={() => setDeleteTarget(req)}
                                disabled={anyActionInFlight}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold
                                           bg-white text-red-600 border border-red-200
                                           hover:bg-red-50 disabled:opacity-50 transition-all"
                              >
                                <Trash2 size={13} /> Delete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}