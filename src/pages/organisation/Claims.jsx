import { useState, useEffect, useCallback } from 'react';
import {
  Clock, CheckCircle, XCircle, AlertCircle, RefreshCw,
  Eye, Loader2, X, Hash, PackageCheck, Trash2, Phone, Mail
} from 'lucide-react';
import {
  getOrganizationClaims, acceptClaim, rejectClaim,
  getClaimDetail, markClaimFound, deleteClaim
} from '../../api/items';
import { useNotifications } from '../../context/NotificationContext';   // ✅ new

/* ── Confirm reject modal ─────────────────────────── */
function RejectModal({ claim, onClose, onConfirm, loading }) {
  const [reason, setReason] = useState('');
  const handleConfirm = () => onConfirm(claim.id, reason.trim() || 'No reason provided');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 scale-in">
        <h3 className="text-lg font-black text-[#0f172a] mb-2">Reject Claim</h3>
        <p className="text-sm text-gray-500 mb-4">
          Reject claim by <span className="font-bold">{claim.claimantName || 'Owner'}</span> for
          <span className="font-bold"> {claim.itemName}</span>?
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for rejection (optional)"
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-sm outline-none
                     focus:ring-2 focus:ring-[#ef4444]/20 focus:border-[#ef4444] mb-4 resize-none"
        />
        <div className="flex gap-3">
          <button onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e8f0]
                             text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#ef4444] text-white
                             text-sm font-bold hover:bg-red-600 transition-all
                             disabled:opacity-70 flex items-center justify-center gap-2">
            {loading ? <RefreshCw size={14} className="animate-spin" /> : null}
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete confirmation modal ───────────────────── */
function DeleteClaimModal({ claim, onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 scale-in">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 size={18} className="text-red-600" />
          </div>
          <h3 className="text-lg font-black text-[#0f172a]">Delete Claim</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to delete the claim by
          <span className="font-bold"> {claim.claimantName || 'Owner'}</span> for
          <span className="font-bold"> {claim.itemName}</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e8f0]
                             text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white
                             text-sm font-bold hover:bg-red-700 transition-all
                             disabled:opacity-70 flex items-center justify-center gap-2">
            {loading ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete Claim
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Status badge (includes FOUND) ─────────────── */
function StatusBadge({ status }) {
  const cfg = {
    PENDING:  { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
    APPROVED: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Approved' },
    REJECTED: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' },
    CANCELLED:{ bg: 'bg-gray-100', text: 'text-gray-600', label: 'Cancelled' },
    FOUND:    { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Found' },
  };
  const c = cfg[status] || cfg.PENDING;
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

/* ── Claim Detail Modal ────────────────────────── */
function ClaimDetailModal({ claimId, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getClaimDetail(claimId);
        const payload = res?.data || res;
        setDetail(payload?.data || payload);
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load claim details');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [claimId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-[#1a56db]" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <AlertCircle size={28} className="text-red-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        ) : detail ? (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#0f172a]">Claim Details</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400 text-xs">Claimant</span>
                <p className="font-semibold text-[#0f172a]">{detail.claimantName || '—'}</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">Contact</span>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone size={12} className="text-gray-400" /> {detail.claimantPhone || '—'}
                  <span className="mx-1">·</span>
                  <Mail size={12} className="text-gray-400" /> {detail.claimantEmail || '—'}
                </p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">Status</span>
                <StatusBadge status={detail.status} />
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 text-xs">Item</span>
                <p className="font-semibold text-[#0f172a]">{detail.itemName || '—'}</p>
              </div>
              {detail.lostReportId && (
                <div className="col-span-2">
                  <span className="text-gray-400 text-xs">Lost Report ID</span>
                  <p className="font-mono font-bold text-[#0f172a]">{detail.lostReportId}</p>
                </div>
              )}
              {detail.description && (
                <div className="col-span-2">
                  <span className="text-gray-400 text-xs">Description</span>
                  <p className="text-sm text-gray-600">{detail.description}</p>
                </div>
              )}
              {detail.message && (
                <div className="col-span-2">
                  <span className="text-gray-400 text-xs">Owner message</span>
                  <p className="text-sm text-gray-600 italic">"{detail.message}"</p>
                </div>
              )}
              <div>
                <span className="text-gray-400 text-xs">Claimed Date</span>
                <p className="text-xs text-gray-600">
                  {new Date(detail.claimedDate).toLocaleDateString('en-GB', {
                    day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ── Main Claims component ────────────────────── */
export default function Claims() {
  const [claims, setClaims]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [activeTab, setActiveTab] = useState('PENDING');
  const [actionLoading, setActionLoading] = useState(null);
  const [rejectTarget, setRejectTarget]  = useState(null);
  const [viewClaimId, setViewClaimId]    = useState(null);
  const [deleteTarget, setDeleteTarget]  = useState(null);

  // ✅ Access notification context to trigger instant refresh
  const { refresh } = useNotifications();

  const fetchClaims = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const wrapper = await getOrganizationClaims();
      const claimsArray = wrapper?.data ?? [];
      setClaims(Array.isArray(claimsArray) ? claimsArray : []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load claims');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClaims(); }, [fetchClaims]);

  const handleAccept = async (claimId) => {
    setActionLoading(claimId);
    try {
      await acceptClaim(claimId);
      setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: 'APPROVED' } : c));
      refresh();   // ✅ instantly fetch latest notifications for the owner
    } catch (e) {
      setError(e.response?.data?.message || 'Accept failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (claimId, reason) => {
    setActionLoading(claimId);
    setRejectTarget(null);
    try {
      await rejectClaim(claimId, reason);
      setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: 'REJECTED' } : c));
      refresh();   // ✅ instantly fetch latest notifications for the owner
    } catch (e) {
      setError(e.response?.data?.message || 'Reject failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkFound = async (claimId) => {
    setActionLoading(claimId);
    try {
      await markClaimFound(claimId);
      setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: 'FOUND' } : c));
      refresh();   // ✅ instantly fetch latest notifications for the owner
    } catch (e) {
      setError(e.response?.data?.message || 'Mark as found failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteClaim = async (claimId) => {
    setActionLoading(claimId);
    setDeleteTarget(null);
    try {
      await deleteClaim(claimId);
      setClaims(prev => prev.filter(c => c.id !== claimId));
    } catch (e) {
      setError(e.response?.data?.message || 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredClaims = claims.filter(c => {
    if (activeTab === 'PENDING')   return c.status === 'PENDING';
    if (activeTab === 'APPROVED')  return c.status === 'APPROVED';
    if (activeTab === 'COMPLETED') return c.status === 'FOUND';
    return true;
  });

  const tabs = [
    { key: 'PENDING',   label: `Pending (${claims.filter(c => c.status === 'PENDING').length})` },
    { key: 'APPROVED',  label: `Approved (${claims.filter(c => c.status === 'APPROVED').length})` },
    { key: 'COMPLETED', label: `Completed (${claims.filter(c => c.status === 'FOUND').length})` },
    { key: 'ALL',       label: `All (${claims.length})` },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {viewClaimId && (
        <ClaimDetailModal claimId={viewClaimId} onClose={() => setViewClaimId(null)} />
      )}

      {rejectTarget && (
        <RejectModal
          claim={rejectTarget}
          onClose={() => setRejectTarget(null)}
          onConfirm={handleReject}
          loading={actionLoading === rejectTarget.id}
        />
      )}

      {deleteTarget && (
        <DeleteClaimModal
          claim={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => handleDeleteClaim(deleteTarget.id)}
          loading={actionLoading === deleteTarget.id}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 fade-up">
        <div>
          <h1 className="text-2xl font-black text-[#0f172a]">Claims</h1>
          <p className="text-sm text-gray-400 mt-0.5">Review and manage owner claims</p>
        </div>
        <button onClick={fetchClaims} disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
                           border-[#e2e8f0] text-sm font-bold text-gray-600
                           hover:bg-gray-50 disabled:opacity-50 transition-all">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200
                        text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
          <AlertCircle size={16} className="shrink-0" /> {error}
          <button onClick={fetchClaims} className="ml-auto font-bold underline">Retry</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-5 fade-up overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap
              ${activeTab === tab.key
                ? 'bg-[#1a56db] text-white shadow-sm'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Claims list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 animate-pulse">
              <div className="h-4 w-2/3 rounded bg-gray-200 mb-2" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : filteredClaims.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center fade-up">
          <div className="w-16 h-16 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]
                          flex items-center justify-center mb-4">
            <Clock size={28} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            No {activeTab === 'ALL' ? '' : activeTab.toLowerCase()} claims
          </h3>
          <p className="text-sm text-gray-400 max-w-sm">
            {activeTab === 'PENDING'
              ? 'When owners claim your items, they will appear here for review.'
              : activeTab === 'COMPLETED'
              ? 'No items have been marked as found yet.'
              : 'No claims with this status yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3 fade-up">
          {filteredClaims.map(claim => (
            <div key={claim.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-5
                                            hover:border-[#1a56db]/20 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#0f172a]">{claim.claimantName || 'Unknown'}</h3>
                    <StatusBadge status={claim.status} />
                  </div>
                  <p className="text-sm text-gray-500">
                    Claiming: <span className="font-semibold">{claim.itemName}</span>
                  </p>
                  {(claim.status === 'APPROVED' || claim.status === 'FOUND') && claim.lostReportId && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-emerald-700">
                      <Hash size={11} />
                      <span className="font-mono font-bold">{claim.lostReportId}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {claim.claimantPhone || '—'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> {claim.claimantEmail || '—'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(claim.claimedDate).toLocaleDateString('en-GB', {
                        day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
                      })}
                    </span>
                  </div>
                  {claim.message && (
                    <p className="text-xs text-gray-400 mt-2 italic">"{claim.message}"</p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setViewClaimId(claim.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600
                               text-xs font-bold hover:bg-gray-200 transition-all"
                    title="View details"
                  >
                    <Eye size={13} /> View
                  </button>

                  {claim.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleAccept(claim.id)}
                        disabled={actionLoading === claim.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#22c55e] text-white
                                   text-xs font-bold hover:bg-[#16a34a] disabled:opacity-50 transition-all"
                      >
                        {actionLoading === claim.id ? (
                          <RefreshCw size={12} className="animate-spin" />
                        ) : (
                          <CheckCircle size={13} />
                        )}
                        Accept
                      </button>
                      <button
                        onClick={() => setRejectTarget(claim)}
                        disabled={actionLoading === claim.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ef4444] text-white
                                   text-xs font-bold hover:bg-red-600 disabled:opacity-50 transition-all"
                      >
                        <XCircle size={13} /> Reject
                      </button>
                    </>
                  )}

                  {claim.status === 'APPROVED' && (
                    <button
                      onClick={() => handleMarkFound(claim.id)}
                      disabled={actionLoading === claim.id}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#3b82f6] text-white
                                 text-xs font-bold hover:bg-blue-600 disabled:opacity-50 transition-all"
                    >
                      {actionLoading === claim.id ? (
                        <RefreshCw size={12} className="animate-spin" />
                      ) : (
                        <PackageCheck size={13} />
                      )}
                      Mark Found
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteTarget(claim)}
                    disabled={actionLoading === claim.id}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400
                               text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-all
                               disabled:opacity-50"
                    title="Delete claim"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}