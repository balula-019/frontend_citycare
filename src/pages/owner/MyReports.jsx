import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, RefreshCw, AlertCircle, FileText,
  MapPin, Calendar, Tag, ChevronDown,
  CheckCircle2, Brain, Trash2, Pencil, Loader2, X,
  Smartphone, Laptop, FileText as DocIcon, CreditCard, BookOpen,
  ShoppingBag, Wallet, Key, Headphones, Shirt, Gem, Watch,
  Banknote, Car, Zap, Droplets, Baby, Heart, Dog, UtensilsCrossed,
  Umbrella, Package, Globe
} from 'lucide-react';
import {
  getMyLostReportsWithMatches,
  deleteClaim,
  deleteOwnerLostReport,
} from '../../api/items';

/* ─── Status & Claim Helpers ──────────────────────────────────── */
const STATUS_CFG = {
  REPORTED: { bg: '#f1f5f9', text: '#475569', label: 'Not Claimed' },
  MATCHED:  { bg: '#dbeafe', text: '#1e40af', label: 'Matched' },
  CLAIMED:  { bg: '#dcfce7', text: '#166534', label: 'Already Claimed' },
  CLOSED:   { bg: '#e2e8f0', text: '#334155', label: 'Closed' },
  FOUND:    { bg: '#ccfbf1', text: '#0f766e', label: 'Found' },
};

const SCORE_LABELS = {
  finalScore:       'Final score',
  descriptionScore: 'Description',
  nameScore:        'Name match',
  locationScore:    'Location',
  dateScore:        'Date',
  colorScore:       'Color',
};

const CATEGORY_ICON_MAP = {
  PHONES:          { icon: Smartphone,      bg: '#dbeafe', color: '#1d4ed8' },
  LAPTOPS:         { icon: Laptop,          bg: '#ede9fe', color: '#7c3aed' },
  DOCUMENTS:       { icon: DocIcon,         bg: '#fef9c3', color: '#b45309' },
  IDS:             { icon: CreditCard,      bg: '#fef9c3', color: '#b45309' },
  PASSPORTS:       { icon: Globe,           bg: '#fef9c3', color: '#b45309' },
  BAGS:            { icon: ShoppingBag,     bg: '#f3e8ff', color: '#9333ea' },
  WALLETS:         { icon: Wallet,          bg: '#dcfce7', color: '#15803d' },
  KEYS:            { icon: Key,             bg: '#ffedd5', color: '#c2410c' },
  ELECTRONICS:     { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
  CLOTHES:         { icon: Shirt,           bg: '#fce7f3', color: '#be185d' },
  JEWELRY:         { icon: Gem,             bg: '#fdf4ff', color: '#a21caf' },
  WATCHES:         { icon: Watch,           bg: '#fdf4ff', color: '#a21caf' },
  MONEY:           { icon: Banknote,        bg: '#dcfce7', color: '#15803d' },
  BOOKS:           { icon: BookOpen,        bg: '#fef3c7', color: '#d97706' },
  VEHICLE_ITEMS:   { icon: Car,             bg: '#f1f5f9', color: '#475569' },
  HEADPHONES:      { icon: Headphones,      bg: '#dbeafe', color: '#1d4ed8' },
  CHARGERS_PHONE:  { icon: Smartphone,      bg: '#e0f2fe', color: '#0369a1' },
  CHARGERS_OTHERS: { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
  WATER_BOTTLES:   { icon: Droplets,        bg: '#e0f2fe', color: '#0284c7' },
  TOYS:            { icon: Baby,            bg: '#fce7f3', color: '#db2777' },
  MEDICAL_ITEMS:   { icon: Heart,           bg: '#fee2e2', color: '#dc2626' },
  SPORTS_ITEMS:    { icon: Heart,           bg: '#dcfce7', color: '#16a34a' },
  PET_ITEMS:       { icon: Dog,             bg: '#fef9c3', color: '#ca8a04' },
  FOOD_CONTAINERS: { icon: UtensilsCrossed, bg: '#ffedd5', color: '#ea580c' },
  UMBRELLAS:       { icon: Umbrella,        bg: '#e0f2fe', color: '#0369a1' },
  OTHERS:          { icon: Package,         bg: '#f1f5f9', color: '#475569' },
};

const DEFAULT_CATEGORY = { icon: Package, bg: '#f1f5f9', color: '#475569' };

const isItemClaimedOrUnavailable = (item) => {
  if (!item) return false;
  const code = String(item.statusCode || item.code || item.errorCode || '');
  if (code === '702') return true;
  if (item.claimed === true || item.isClaimed === true) return true;
  const rawStatus = String(item.status || item.claimStatus || item.itemStatus || '').toUpperCase();
  const claimedStatuses = ['CLAIMED', 'UNAVAILABLE', 'APPROVED', 'FOUND', 'CLOSED', '702'];
  return claimedStatuses.includes(rawStatus);
};

const toPercent = (v) => {
  if (v == null || isNaN(Number(v))) return null;
  const n = Number(v);
  return n <= 1 ? n * 100 : n;
};

const fmtScore = (v) => {
  const p = toPercent(v);
  return p != null ? `${p.toFixed(2)}%` : '—';
};

const scoreColor = (v) => {
  const p = toPercent(v) ?? 0;
  if (p >= 80) return '#10b981';
  if (p >= 60) return '#1a56db';
  return '#f59e0b';
};

const fmt     = (s) => s ? s.replace(/_/g, ' ') : '—';
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
      })
    : '—';

/* ─── Skeleton ───────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
      <div className="h-36 shimmer-bg" />
      <div className="p-4 space-y-2.5">
        <div className="h-4 w-2/3 rounded shimmer-bg" />
        <div className="h-3 w-1/2 rounded shimmer-bg" />
        <div className="h-3 w-3/4 rounded shimmer-bg" />
        <div className="h-6 w-24 rounded-full shimmer-bg mt-1" />
      </div>
    </div>
  );
}

/* ─── Category placeholder ──────────────────────────────────── */
function CategoryPlaceholder({ category }) {
  const cfg = CATEGORY_ICON_MAP[category] || DEFAULT_CATEGORY;
  const IconComp = cfg.icon;
  return (
    <div
      className="h-36 w-full flex flex-col items-center justify-center gap-2"
      style={{ backgroundColor: cfg.bg }}
    >
      <IconComp size={36} strokeWidth={1.4} style={{ color: cfg.color }} />
      <span
        className="text-xs font-semibold tracking-wide"
        style={{ color: cfg.color, opacity: 0.75 }}
      >
        {(category || 'ITEM').replace(/_/g, ' ')}
      </span>
    </div>
  );
}

/* ─── Score bar ──────────────────────────────────────────────── */
function ScoreBar({ label, rawValue }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);
  const pct   = toPercent(rawValue) ?? 0;
  const color = scoreColor(rawValue);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[11px] text-gray-500">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>
          {pct.toFixed(2)}%
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width:           ready ? `${Math.min(pct, 100)}%` : '0%',
            backgroundColor: color,
            transition:      'width 0.9s ease-out',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Match detail panel ────────────────────────────────────── */
function MatchDetailPanel({ match, index, reportId, isReportClaimed }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scoreKeys = Object.keys(SCORE_LABELS).filter(k => match[k] != null);
  const isMatchClaimed = isReportClaimed || isItemClaimedOrUnavailable(match);
  const canClaim = Boolean(match.organizationItemId) && !isMatchClaimed;

  return (
    <div className="border border-[#e2e8f0] rounded-xl overflow-hidden text-xs">
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-3 py-2.5
                   bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shrink-0"
               style={{ backgroundColor: scoreColor(match.finalScore) }} />
          <span className="font-semibold text-[#0f172a]">Match #{index + 1}</span>
          {match.finalScore != null && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: `${scoreColor(match.finalScore)}18`,
                    color:           scoreColor(match.finalScore),
                  }}>
              {fmtScore(match.finalScore)}
            </span>
          )}
          {isMatchClaimed && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
              Already Claimed
            </span>
          )}
        </div>
        <ChevronDown
          size={14}
          className="text-gray-400 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div className="px-3 py-3 bg-white space-y-2.5 border-t border-[#e2e8f0]">
          {scoreKeys.map(k => (
            <ScoreBar key={k} label={SCORE_LABELS[k]} rawValue={match[k]} />
          ))}
          {isMatchClaimed ? (
            <div className="mt-2 w-full flex items-center justify-center py-2.5 rounded-lg
                           bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              Already Claimed
            </div>
          ) : (
            <button
              onClick={() => navigate(`/owner/claim/${reportId}`)}
              disabled={!canClaim}
              className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg
                         bg-[#1a56db] text-white text-xs font-bold
                         hover:bg-[#1547c0] transition-all active:scale-95
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Claim This Item
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Delete report confirmation modal ──────────────── */
function DeleteReportModal({ report, onClose, onConfirm, loading }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-[#0f172a]">Delete Report</h3>
            <p className="text-xs text-gray-400 mt-0.5">This action cannot be undone.</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Permanently delete your report for{' '}
          <span className="font-bold">{report.itemName}</span>? It will be removed
          from your reports and stop any AI matching.
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

/* ─── Report card ────────────────────────────────────────────── */
function ReportCard({ report, onDelete, onDeleteReport }) {
  const [imgErr, setImgErr] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const thumb        = report.imageUrls?.[0];
  const matches      = Array.isArray(report.matches) ? report.matches : [];
  const totalMatches = report.totalMatches ?? matches.length;
  const hasMatches   = totalMatches > 0;
  const best         = matches[0] ?? null;
  const isMatched    = best?.finalScore != null;

  const isClaimed = isItemClaimedOrUnavailable(report) || matches.some(isItemClaimedOrUnavailable);
  const cfg = isClaimed
    ? { bg: '#dcfce7', text: '#166534', label: 'Already Claimed' }
    : isMatched
      ? STATUS_CFG.MATCHED
      : (STATUS_CFG[report.status] || { bg: '#f1f5f9', text: '#475569', label: 'Not Claimed' });

  const claimIdForDelete = report.claimId || report.claimRequestId;
  const claimTargetId    = best?.organizationItemId;

  // ✅ Edit + Delete report both only allowed while status is REPORTED
  const reportStatusUpper = String(report.status || '').toUpperCase();
  const canEdit   = reportStatusUpper === 'REPORTED';
  const canDelete = reportStatusUpper === 'REPORTED';

  const handleDeleteClaim = async () => {
    if (!claimIdForDelete) return;
    setDeleting(true);
    try {
      await deleteClaim(claimIdForDelete);
      onDelete?.(report.id);
    } catch (err) {
      // silent
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    if (!canEdit) return;
    navigate(`/owner/edit-report/${report.id}`, {
      state: { report },
    });
  };

  const handleDeleteReport = () => {
    if (!canDelete) return;
    onDeleteReport?.(report);
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden
                    transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
                    flex flex-col">
      {/* Thumbnail */}
      <div className="h-36 bg-[#f8fafc] flex items-center justify-center overflow-hidden shrink-0">
        {thumb && !imgErr ? (
          <img src={thumb} alt={report.itemName}
               className="w-full h-full object-cover"
               onError={() => setImgErr(true)} />
        ) : (
          <CategoryPlaceholder category={report.category} />
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2.5">
        {/* Title + status badge + delete claim */}
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-[#0f172a] text-sm leading-snug line-clamp-2">
            {report.itemName}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap"
                  style={{ backgroundColor: cfg.bg, color: cfg.text }}>
              {cfg.label}
            </span>
            {isClaimed && claimIdForDelete && (
              <button
                onClick={handleDeleteClaim}
                disabled={deleting}
                className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors group"
                title="Delete claim"
              >
                <Trash2 size={14} className="text-gray-400 group-hover:text-red-500" />
              </button>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Tag size={11} className="shrink-0 text-gray-400" />
            <span>{fmt(report.category)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="shrink-0 text-gray-400" />
            <span>Lost: {fmtDate(report.lostDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="shrink-0 text-gray-400" />
            <span className="truncate">
              {fmt(report.region)}{report.area ? `, ${report.area}` : ''}
            </span>
          </div>
        </div>

        {/* AI match banner */}
        {hasMatches && (
          <button
            onClick={() => setShowMatches(p => !p)}
            className="mt-1 flex items-center justify-between w-full
                       bg-[#eff6ff] border border-[#bfdbfe] rounded-xl
                       px-3 py-2.5 text-left transition-colors
                       hover:bg-[#dbeafe] active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <Brain size={13} className="text-[#1a56db] shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-[#1a56db] leading-none">
                  {totalMatches} AI match{totalMatches !== 1 ? 'es' : ''} found
                </p>
                {best?.finalScore != null && (
                  <p className="text-[10px] text-blue-500 mt-0.5">
                    Best score: {fmtScore(best.finalScore)}
                  </p>
                )}
              </div>
            </div>
            <ChevronDown
              size={13}
              className="text-[#1a56db] transition-transform duration-200 shrink-0"
              style={{ transform: showMatches ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
        )}

        {/* Expanded panels */}
        {hasMatches && showMatches && (
          <div className="space-y-2 mt-0.5">
            {matches.map((m, i) => (
              <MatchDetailPanel
                key={m.organizationItemId ?? i}
                match={m}
                index={i}
                reportId={report.id}
                isReportClaimed={isClaimed}
              />
            ))}
          </div>
        )}

        {/* Footer actions — Delete report + Edit + Claim */}
        <div className="mt-auto pt-2 border-t border-[#f1f5f9]
                        flex items-center justify-end gap-2">
          {/* ✅ Delete report — enabled only when REPORTED */}
          <button
            onClick={handleDeleteReport}
            disabled={!canDelete}
            title={canDelete ? 'Delete this report' : 'Report can only be deleted when status is REPORTED'}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-semibold
                       border border-red-200 text-red-600 bg-white
                       hover:bg-red-50
                       transition-all active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <Trash2 size={12} />
          </button>

          {/* ✅ Edit — enabled only when REPORTED */}
          <button
            onClick={handleEdit}
            disabled={!canEdit}
            title={canEdit ? 'Edit this report' : 'Report can only be edited when status is REPORTED'}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold
                       border border-[#e2e8f0] text-gray-600 bg-white
                       hover:bg-gray-50 hover:text-gray-900
                       transition-all active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <Pencil size={12} /> Edit
          </button>

          {isClaimed ? (
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold
                             bg-emerald-50 text-emerald-800 border border-emerald-200">
              Already Claimed
            </span>
          ) : (
            <button
              onClick={() => navigate(`/owner/claim/${report.id}`)}
              disabled={!claimTargetId}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold
                         bg-[#1a56db] text-white hover:bg-[#1547c0]
                         transition-all active:scale-95 disabled:opacity-60"
            >
              Claim Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────── */
export default function MyReports() {
  const [reports,     setReports]     = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [success,     setSuccess]     = useState('');
  const [page,        setPage]        = useState(0);
  const [totalPages,  setTotalPages]  = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // ✅ Delete report state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting,     setDeleting]     = useState(false);

  const PAGE_SIZE = 20;

  const fetchReports = useCallback(async (pageNum = 0, replace = true) => {
    replace ? setLoading(true) : setLoadingMore(true);
    setError('');
    try {
      const res      = await getMyLostReportsWithMatches(pageNum, PAGE_SIZE);
      const pageData = res?.data;

      const items = Array.isArray(pageData)
        ? pageData
        : Array.isArray(pageData?.content)
          ? pageData.content
          : Array.isArray(res?.content)
            ? res.content
            : [];

      setReports(prev => replace ? items : [...prev, ...items]);
      setTotalPages(pageData?.totalPages ?? res?.totalPages ?? 1);
      setPage(pageNum);
    } catch (err) {
      setError(err.message || 'Failed to load reports. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => { fetchReports(0, true); }, [fetchReports]);

  /* Removes a report after claim deletion */
  const handleDeleteAfterClaim = useCallback((reportId) => {
    if (reportId) {
      setReports(prev => prev.filter(r => r.id !== reportId));
    } else {
      fetchReports(0, true);
    }
  }, [fetchReports]);

  /* ✅ Delete report handler */
  const handleConfirmDeleteReport = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError('');
    setSuccess('');
    try {
      await deleteOwnerLostReport(deleteTarget.id);
      setSuccess('Report deleted successfully.');
      setReports(prev => prev.filter(r => r.id !== deleteTarget.id));
      setDeleteTarget(null);
      setTimeout(() => setSuccess(''), 3500);
    } catch (err) {
      const resp = err?.response?.data;
      setError(
        resp?.data?.message ||
        resp?.message ||
        err.message ||
        'Failed to delete report.'
      );
    } finally {
      setDeleting(false);
    }
  };

  const hasMore = page + 1 < totalPages;

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .shimmer-bg {
          background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.35s ease-out forwards; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {deleteTarget && (
        <DeleteReportModal
          report={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDeleteReport}
          loading={deleting}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/owner/search"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
                         bg-white border border-[#e2e8f0] text-sm font-semibold text-gray-700
                         hover:bg-gray-50 hover:text-gray-900 shadow-sm
                         transition-all active:scale-95 shrink-0"
              aria-label="Back to search"
            >
              <ArrowLeft size={16} />
              <span>Back to Search</span>
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">My Reports</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                All your lost item reports in one place
              </p>
            </div>
          </div>

          <button
            onClick={() => fetchReports(0, true)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       border border-[#e2e8f0] text-sm font-semibold
                       text-gray-600 hover:bg-gray-50
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Success */}
        {success && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200
                          text-emerald-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <CheckCircle2 size={16} className="shrink-0" />
            <span className="flex-1">{success}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200
                          text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => fetchReports(0, true)}
                    className="font-semibold underline hover:no-underline shrink-0">
              Retry
            </button>
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Results */}
        {!loading && reports.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <p className="text-xs text-gray-400">
                {reports.length} report{reports.length !== 1 ? 's' : ''}
              </p>
              {(() => {
                const n = reports.filter(r => (r.totalMatches ?? 0) > 0).length;
                return n > 0 ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold
                                   text-[#1a56db] bg-blue-50 border border-blue-100
                                   px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={12} />
                    {n} with AI matches
                  </span>
                ) : null;
              })()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {reports.map((r, i) => (
                <div key={r.id || i} className="fade-up"
                     style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}>
                  <ReportCard
                    report={r}
                    onDelete={handleDeleteAfterClaim}
                    onDeleteReport={setDeleteTarget}
                  />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => fetchReports(page + 1, false)}
                  disabled={loadingMore}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl
                             border border-[#e2e8f0] text-sm font-semibold
                             text-gray-600 hover:bg-gray-50
                             disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {loadingMore ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-gray-300
                                       border-t-[#1a56db]"
                            style={{ animation: 'spin 0.7s linear infinite' }} />
                      Loading…
                    </>
                  ) : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && !error && reports.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center fade-up">
            <div className="w-16 h-16 rounded-full bg-[#f8fafc] border border-[#e2e8f0]
                            flex items-center justify-center mb-4">
              <FileText size={28} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] mb-1">No reports yet</h3>
            <p className="text-sm text-gray-500 max-w-xs mb-5">
              You haven't filed any lost item reports. Start by searching found items.
            </p>
            <Link to="/owner/search"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                             bg-[#1a56db] text-white text-sm font-semibold
                             hover:bg-[#1547c0] transition-all active:scale-95">
              Go to search
            </Link>
          </div>
        )}
      </div>
    </>
  );
}