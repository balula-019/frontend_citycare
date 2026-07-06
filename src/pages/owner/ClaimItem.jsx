// // // // // // src/pages/owner/ClaimItem.jsx
// // // // // import { useState, useEffect } from 'react';
// // // // // import { useParams, useNavigate, Link } from 'react-router-dom';
// // // // // import {
// // // // //   ArrowLeft, CheckCircle, Loader2, AlertCircle,
// // // // //   Building2, Tag, Sparkles, Clock
// // // // // } from 'lucide-react';
// // // // // import { claimItem, getMyLostReportsWithMatches } from '../../api/items';

// // // // // export default function ClaimItem() {
// // // // //   const { reportId } = useParams();
// // // // //   const navigate = useNavigate();

// // // // //   const [report, setReport]         = useState(null);
// // // // //   const [loading, setLoading]       = useState(true);
// // // // //   const [claiming, setClaiming]     = useState(false);
// // // // //   const [claimed, setClaimed]       = useState(false);
// // // // //   const [claimStatus, setClaimStatus] = useState(null);
// // // // //   const [error, setError]           = useState('');

// // // // //   const bestMatch = report?.matches?.[0];
// // // // //   const organizationItemId = bestMatch?.organizationItemId;

// // // // //   useEffect(() => {
// // // // //     const fetchReport = async () => {
// // // // //       try {
// // // // //         const res = await getMyLostReportsWithMatches(0, 50);
// // // // //         const data = res?.data || res;
// // // // //         const items = data?.content || [];
// // // // //         const found = items.find(r => r.id === reportId);
// // // // //         if (found) setReport(found);
// // // // //         else setError('Report not found.');
// // // // //       } catch (err) {
// // // // //         setError(err.response?.data?.message || err.message || 'Failed to load report');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchReport();
// // // // //   }, [reportId]);

// // // // //   const handleClaim = async () => {
// // // // //     if (!organizationItemId) {
// // // // //       setError('No matched item to claim.');
// // // // //       return;
// // // // //     }
// // // // //     setClaiming(true);
// // // // //     setError('');
// // // // //     try {
// // // // //       const result = await claimItem(organizationItemId);
// // // // //       const claimResponse = result?.data?.data || result?.data || result;
// // // // //       setClaimStatus(claimResponse);
// // // // //       setClaimed(true);
// // // // //     } catch (err) {
// // // // //       setError(err.response?.data?.message || err.message || 'Claim failed');
// // // // //     } finally {
// // // // //       setClaiming(false);
// // // // //     }
// // // // //   };

// // // // //   // ── Success screen ────────────────────────────────────────
// // // // //   if (claimed) {
// // // // //     const status = claimStatus?.status || 'PENDING';
// // // // //     const isPending = status === 'PENDING';

// // // // //     return (
// // // // //       <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
// // // // //         <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isPending ? 'bg-amber-100' : 'bg-green-100'}`}>
// // // // //           {isPending ? (
// // // // //             <Clock size={40} className="text-amber-600" />
// // // // //           ) : (
// // // // //             <CheckCircle size={40} className="text-green-600" />
// // // // //           )}
// // // // //         </div>
// // // // //         <h2 className="text-2xl font-black text-[#0f172a] mb-2">Claim Submitted!</h2>
// // // // //         <div className="flex items-center gap-2 mb-4">
// // // // //           <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
// // // // //             {isPending ? 'Pending Review' : status}
// // // // //           </span>
// // // // //         </div>
// // // // //         <p className="text-sm text-gray-500 mb-6 max-w-sm">
// // // // //           {isPending
// // // // //             ? 'Your claim has been sent to the organisation. They will review it and get back to you.'
// // // // //             : 'The organisation has processed your claim.'}
// // // // //         </p>
// // // // //         <div className="flex gap-3">
// // // // //           <Link to="/owner/reports"
// // // // //                 className="px-5 py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-bold hover:bg-[#1547c0]">
// // // // //             My Reports
// // // // //           </Link>
// // // // //           <Link to="/owner/search"
// // // // //                 className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50">
// // // // //             Back to Search
// // // // //           </Link>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // ── Loading ───────────────────────────────────────────────
// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex items-center justify-center min-h-[60vh]">
// // // // //         <div className="text-center">
// // // // //           <Loader2 size={40} className="animate-spin text-[#1a56db] mx-auto mb-4" />
// // // // //           <p className="text-sm text-gray-400">Loading match details…</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // ── Error / no match ──────────────────────────────────────
// // // // //   if (error || !bestMatch) {
// // // // //     return (
// // // // //       <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
// // // // //         <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
// // // // //         <h2 className="text-xl font-black mb-2">No match available</h2>
// // // // //         <p className="text-sm text-gray-500 mb-6">
// // // // //           {error || 'This report has not been matched with any found item yet.'}
// // // // //         </p>
// // // // //         <Link to="/owner/reports" className="text-[#1a56db] font-bold underline">
// // // // //           Back to My Reports
// // // // //         </Link>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // ── Match card ────────────────────────────────────────────
// // // // //   return (
// // // // //     <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
// // // // //       <Link to="/owner/reports" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6">
// // // // //         <ArrowLeft size={15} /> Back to My Reports
// // // // //       </Link>

// // // // //       <div className="text-center mb-8">
// // // // //         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a56db] to-[#6366f1] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
// // // // //           <Sparkles size={28} className="text-white" />
// // // // //         </div>
// // // // //         <h1 className="text-2xl font-black text-[#0f172a] mb-1">We found a match!</h1>
// // // // //         <p className="text-sm text-gray-500">
// // // // //           Your lost item may have been found by an organisation.
// // // // //         </p>
// // // // //       </div>

// // // // //       {/* Match card */}
// // // // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm mb-6">
// // // // //         <div className="flex items-center gap-2 mb-4">
// // // // //           <Building2 size={18} className="text-[#1a56db]" />
// // // // //           <span className="text-sm font-bold text-[#0f172a]">
// // // // //             {bestMatch.organizationName || 'Organisation'}
// // // // //           </span>
// // // // //         </div>

// // // // //         <div className="flex items-center gap-2 mb-4">
// // // // //           <Tag size={18} className="text-[#1a56db]" />
// // // // //           <span className="text-sm font-bold text-[#0f172a]">
// // // // //             {bestMatch.itemName || 'Matched Item'}
// // // // //           </span>
// // // // //         </div>

// // // // //         {/* Score display */}
// // // // //         <div className="bg-[#f8fafc] rounded-xl p-4 mb-6">
// // // // //           <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI Confidence</p>
// // // // //           <div className="flex items-end gap-2">
// // // // //             <span className="text-4xl font-black text-[#1a56db]">
// // // // //               {bestMatch.finalScore?.toFixed(0) ?? '—'}%
// // // // //             </span>
// // // // //             <span className="text-sm text-gray-400 mb-1">match</span>
// // // // //           </div>
// // // // //           <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
// // // // //             <div
// // // // //               className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full transition-all duration-1000"
// // // // //               style={{ width: `${Math.min(bestMatch.finalScore ?? 0, 100)}%` }}
// // // // //             />
// // // // //           </div>
// // // // //         </div>

// // // // //         {error && (
// // // // //           <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // // //             <AlertCircle size={16} className="shrink-0" /> {error}
// // // // //           </div>
// // // // //         )}

// // // // //         <button
// // // // //           onClick={handleClaim}
// // // // //           disabled={claiming}
// // // // //           className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
// // // // //                      bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
// // // // //                      hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
// // // // //         >
// // // // //           {claiming ? (
// // // // //             <><Loader2 size={16} className="animate-spin" /> Submitting Claim…</>
// // // // //           ) : (
// // // // //             'Claim This Item'
// // // // //           )}
// // // // //         </button>
// // // // //       </div>

// // // // //       <p className="text-xs text-gray-400 text-center">
// // // // //         By claiming, you confirm this item belongs to you. The organisation will verify your request.
// // // // //       </p>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // src/pages/owner/ClaimItem.jsx
// // // // import { useState, useEffect } from 'react';
// // // // import { useParams, useNavigate, Link } from 'react-router-dom';
// // // // import {
// // // //   ArrowLeft, CheckCircle, Loader2, AlertCircle,
// // // //   Building2, Tag, Sparkles, Clock, Hash
// // // // } from 'lucide-react';
// // // // import { claimItem, getMyLostReportsWithMatches } from '../../api/items';

// // // // export default function ClaimItem() {
// // // //   const { reportId } = useParams();
// // // //   const navigate = useNavigate();

// // // //   const [report, setReport]         = useState(null);
// // // //   const [loading, setLoading]       = useState(true);
// // // //   const [claiming, setClaiming]     = useState(false);
// // // //   const [claimed, setClaimed]       = useState(false);
// // // //   const [claimStatus, setClaimStatus] = useState(null);
// // // //   const [error, setError]           = useState('');

// // // //   const bestMatch = report?.matches?.[0];
// // // //   const organizationItemId = bestMatch?.organizationItemId;

// // // //   useEffect(() => {
// // // //     const fetchReport = async () => {
// // // //       try {
// // // //         const res = await getMyLostReportsWithMatches(0, 50);
// // // //         const data = res?.data || res;
// // // //         const items = data?.content || [];
// // // //         const found = items.find(r => r.id === reportId);
// // // //         if (found) setReport(found);
// // // //         else setError('Report not found.');
// // // //       } catch (err) {
// // // //         setError(err.response?.data?.message || err.message || 'Failed to load report');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchReport();
// // // //   }, [reportId]);

// // // //   const handleClaim = async () => {
// // // //     if (!organizationItemId) {
// // // //       setError('No matched item to claim.');
// // // //       return;
// // // //     }
// // // //     setClaiming(true);
// // // //     setError('');
// // // //     try {
// // // //       const result = await claimItem(organizationItemId);
// // // //       const claimResponse = result?.data?.data || result?.data || result;
// // // //       setClaimStatus(claimResponse);
// // // //       setClaimed(true);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || err.message || 'Claim failed');
// // // //     } finally {
// // // //       setClaiming(false);
// // // //     }
// // // //   };

// // // //   // ── Success screen ────────────────────────────────────────
// // // //   if (claimed) {
// // // //     const status = claimStatus?.status || 'PENDING';
// // // //     const isPending = status === 'PENDING';
// // // //     const orgId = claimStatus?.organizationId || '—';
// // // //     const yourReportId = report?.id || reportId;   // the lost report ID

// // // //     return (
// // // //       <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
// // // //         <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isPending ? 'bg-amber-100' : 'bg-green-100'}`}>
// // // //           {isPending ? (
// // // //             <Clock size={40} className="text-amber-600" />
// // // //           ) : (
// // // //             <CheckCircle size={40} className="text-green-600" />
// // // //           )}
// // // //         </div>
// // // //         <h2 className="text-2xl font-black text-[#0f172a] mb-2">Claim Submitted!</h2>
// // // //         <div className="flex items-center gap-2 mb-4">
// // // //           <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
// // // //             {isPending ? 'Pending Review' : status}
// // // //           </span>
// // // //         </div>

// // // //         {/* Shareable details card */}
// // // //         <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 w-full max-w-sm mb-6 text-left">
// // // //           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
// // // //             Important Details
// // // //           </p>
// // // //           <div className="space-y-2">
// // // //             <div className="flex items-center gap-2">
// // // //               <Hash size={14} className="text-[#1a56db] shrink-0" />
// // // //               <span className="text-sm text-gray-600">Your Report ID:</span>
// // // //               <span className="font-mono font-bold text-[#0f172a]">{yourReportId}</span>
// // // //             </div>
// // // //             <div className="flex items-center gap-2">
// // // //               <Building2 size={14} className="text-[#1a56db] shrink-0" />
// // // //               <span className="text-sm text-gray-600">Organisation ID:</span>
// // // //               <span className="font-mono font-bold text-[#0f172a]">{orgId}</span>
// // // //             </div>
// // // //           </div>
// // // //           <div className="mt-3 pt-3 border-t border-[#f1f5f9]">
// // // //             <p className="text-xs text-gray-500">
// // // //               📋 You can share your <span className="font-bold">Report ID</span> with a friend to pick up the item on your behalf.
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         <p className="text-sm text-gray-500 mb-6 max-w-sm">
// // // //           {isPending
// // // //             ? 'Your claim has been sent to the organisation. They will review it and get back to you.'
// // // //             : 'The organisation has processed your claim.'}
// // // //         </p>
// // // //         <div className="flex gap-3">
// // // //           <Link to="/owner/reports"
// // // //                 className="px-5 py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-bold hover:bg-[#1547c0]">
// // // //             My Reports
// // // //           </Link>
// // // //           <Link to="/owner/search"
// // // //                 className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50">
// // // //             Back to Search
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ── Loading ───────────────────────────────────────────────
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-[60vh]">
// // // //         <div className="text-center">
// // // //           <Loader2 size={40} className="animate-spin text-[#1a56db] mx-auto mb-4" />
// // // //           <p className="text-sm text-gray-400">Loading match details…</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ── Error / no match ──────────────────────────────────────
// // // //   if (error || !bestMatch) {
// // // //     return (
// // // //       <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
// // // //         <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
// // // //         <h2 className="text-xl font-black mb-2">No match available</h2>
// // // //         <p className="text-sm text-gray-500 mb-6">
// // // //           {error || 'This report has not been matched with any found item yet.'}
// // // //         </p>
// // // //         <Link to="/owner/reports" className="text-[#1a56db] font-bold underline">
// // // //           Back to My Reports
// // // //         </Link>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ── Match card ────────────────────────────────────────────
// // // //   return (
// // // //     <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
// // // //       <Link to="/owner/reports" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6">
// // // //         <ArrowLeft size={15} /> Back to My Reports
// // // //       </Link>

// // // //       <div className="text-center mb-8">
// // // //         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a56db] to-[#6366f1] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
// // // //           <Sparkles size={28} className="text-white" />
// // // //         </div>
// // // //         <h1 className="text-2xl font-black text-[#0f172a] mb-1">We found a match!</h1>
// // // //         <p className="text-sm text-gray-500">
// // // //           Your lost item may have been found by an organisation.
// // // //         </p>
// // // //       </div>

// // // //       {/* Match card */}
// // // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm mb-6">
// // // //         <div className="flex items-center gap-2 mb-4">
// // // //           <Building2 size={18} className="text-[#1a56db]" />
// // // //           <span className="text-sm font-bold text-[#0f172a]">
// // // //             {bestMatch.organizationName || 'Organisation'}
// // // //           </span>
// // // //         </div>

// // // //         <div className="flex items-center gap-2 mb-4">
// // // //           <Tag size={18} className="text-[#1a56db]" />
// // // //           <span className="text-sm font-bold text-[#0f172a]">
// // // //             {bestMatch.itemName || 'Matched Item'}
// // // //           </span>
// // // //         </div>

// // // //         {/* Score display */}
// // // //         <div className="bg-[#f8fafc] rounded-xl p-4 mb-6">
// // // //           <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI Confidence</p>
// // // //           <div className="flex items-end gap-2">
// // // //             <span className="text-4xl font-black text-[#1a56db]">
// // // //               {bestMatch.finalScore?.toFixed(0) ?? '—'}%
// // // //             </span>
// // // //             <span className="text-sm text-gray-400 mb-1">match</span>
// // // //           </div>
// // // //           <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
// // // //             <div
// // // //               className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full transition-all duration-1000"
// // // //               style={{ width: `${Math.min(bestMatch.finalScore ?? 0, 100)}%` }}
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         {error && (
// // // //           <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // //             <AlertCircle size={16} className="shrink-0" /> {error}
// // // //           </div>
// // // //         )}

// // // //         <button
// // // //           onClick={handleClaim}
// // // //           disabled={claiming}
// // // //           className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
// // // //                      bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
// // // //                      hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
// // // //         >
// // // //           {claiming ? (
// // // //             <><Loader2 size={16} className="animate-spin" /> Submitting Claim…</>
// // // //           ) : (
// // // //             'Claim This Item'
// // // //           )}
// // // //         </button>
// // // //       </div>

// // // //       <p className="text-xs text-gray-400 text-center">
// // // //         By claiming, you confirm this item belongs to you. The organisation will verify your request.
// // // //       </p>
// // // //     </div>
// // // //   );
// // // // }

// // // // src/pages/owner/ClaimItem.jsx
// // // import { useState, useEffect } from 'react';
// // // import { useParams, useNavigate, Link } from 'react-router-dom';
// // // import {
// // //   ArrowLeft, CheckCircle, Loader2, AlertCircle,
// // //   Building2, Tag, Sparkles, Clock, Hash
// // // } from 'lucide-react';
// // // import { claimItem, getMyLostReportsWithMatches } from '../../api/items';

// // // export default function ClaimItem() {
// // //   const { reportId } = useParams();
// // //   const navigate = useNavigate();

// // //   const [report, setReport]         = useState(null);
// // //   const [loading, setLoading]       = useState(true);
// // //   const [claiming, setClaiming]     = useState(false);
// // //   const [claimed, setClaimed]       = useState(false);
// // //   const [claimStatus, setClaimStatus] = useState(null);
// // //   const [error, setError]           = useState('');

// // //   const bestMatch = report?.matches?.[0];
// // //   const organizationItemId = bestMatch?.organizationItemId;

// // //   useEffect(() => {
// // //     const fetchReport = async () => {
// // //       try {
// // //         const res = await getMyLostReportsWithMatches(0, 50);
// // //         const data = res?.data || res;
// // //         const items = data?.content || [];
// // //         const found = items.find(r => r.id === reportId);
// // //         if (found) setReport(found);
// // //         else setError('Report not found.');
// // //       } catch (err) {
// // //         setError(err.response?.data?.message || err.message || 'Failed to load report');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchReport();
// // //   }, [reportId]);

// // //   const handleClaim = async () => {
// // //     if (!organizationItemId) {
// // //       setError('No matched item to claim.');
// // //       return;
// // //     }
// // //     setClaiming(true);
// // //     setError('');
// // //     try {
// // //       const result = await claimItem(organizationItemId);
// // //       const claimResponse = result?.data?.data || result?.data || result;
// // //       setClaimStatus(claimResponse);
// // //       setClaimed(true);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || err.message || 'Claim failed');
// // //     } finally {
// // //       setClaiming(false);
// // //     }
// // //   };

// // //   // ── Success screen ────────────────────────────────────────
// // //   if (claimed) {
// // //     const status = claimStatus?.status || 'PENDING';
// // //     const isPending = status === 'PENDING';
// // //     const lostReportId = claimStatus?.lostReportId || reportId; // from claim response
// // //     const orgId = claimStatus?.organizationId || '—';

// // //     return (
// // //       <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
// // //         <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isPending ? 'bg-amber-100' : 'bg-green-100'}`}>
// // //           {isPending ? (
// // //             <Clock size={40} className="text-amber-600" />
// // //           ) : (
// // //             <CheckCircle size={40} className="text-green-600" />
// // //           )}
// // //         </div>
// // //         <h2 className="text-2xl font-black text-[#0f172a] mb-2">Claim Submitted!</h2>
// // //         <div className="flex items-center gap-2 mb-4">
// // //           <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
// // //             {isPending ? 'Pending Review' : status}
// // //           </span>
// // //         </div>

// // //         {/* Shareable details card */}
// // //         <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 w-full max-w-sm mb-6 text-left">
// // //           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
// // //             Important Details
// // //           </p>
// // //           <div className="space-y-2">
// // //             <div className="flex items-center gap-2">
// // //               <Hash size={14} className="text-[#1a56db] shrink-0" />
// // //               <span className="text-sm text-gray-600">Your Lost Report ID:</span>
// // //               <span className="font-mono font-bold text-[#0f172a]">{lostReportId}</span>
// // //             </div>
// // //             <div className="flex items-center gap-2">
// // //               <Building2 size={14} className="text-[#1a56db] shrink-0" />
// // //               <span className="text-sm text-gray-600">Organisation ID:</span>
// // //               <span className="font-mono font-bold text-[#0f172a]">{orgId}</span>
// // //             </div>
// // //           </div>
// // //           <div className="mt-3 pt-3 border-t border-[#f1f5f9]">
// // //             <p className="text-xs text-gray-500">
// // //               📋 You can share your <span className="font-bold">Lost Report ID</span> with a friend to pick up the item on your behalf.
// // //             </p>
// // //           </div>
// // //         </div>

// // //         <p className="text-sm text-gray-500 mb-6 max-w-sm">
// // //           {isPending
// // //             ? 'Your claim has been sent to the organisation. They will review it and get back to you.'
// // //             : 'The organisation has processed your claim.'}
// // //         </p>
// // //         <div className="flex gap-3">
// // //           <Link to="/owner/reports"
// // //                 className="px-5 py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-bold hover:bg-[#1547c0]">
// // //             My Reports
// // //           </Link>
// // //           <Link to="/owner/search"
// // //                 className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50">
// // //             Back to Search
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // ── Loading ───────────────────────────────────────────────
// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-[60vh]">
// // //         <div className="text-center">
// // //           <Loader2 size={40} className="animate-spin text-[#1a56db] mx-auto mb-4" />
// // //           <p className="text-sm text-gray-400">Loading match details…</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // ── Error / no match ──────────────────────────────────────
// // //   if (error || !bestMatch) {
// // //     return (
// // //       <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
// // //         <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
// // //         <h2 className="text-xl font-black mb-2">No match available</h2>
// // //         <p className="text-sm text-gray-500 mb-6">
// // //           {error || 'This report has not been matched with any found item yet.'}
// // //         </p>
// // //         <Link to="/owner/reports" className="text-[#1a56db] font-bold underline">
// // //           Back to My Reports
// // //         </Link>
// // //       </div>
// // //     );
// // //   }

// // //   // ── Match card ────────────────────────────────────────────
// // //   return (
// // //     <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
// // //       <Link to="/owner/reports" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6">
// // //         <ArrowLeft size={15} /> Back to My Reports
// // //       </Link>

// // //       <div className="text-center mb-8">
// // //         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a56db] to-[#6366f1] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
// // //           <Sparkles size={28} className="text-white" />
// // //         </div>
// // //         <h1 className="text-2xl font-black text-[#0f172a] mb-1">We found a match!</h1>
// // //         <p className="text-sm text-gray-500">
// // //           Your lost item may have been found by an organisation.
// // //         </p>
// // //       </div>

// // //       {/* Match card */}
// // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm mb-6">
// // //         <div className="flex items-center gap-2 mb-4">
// // //           <Building2 size={18} className="text-[#1a56db]" />
// // //           <span className="text-sm font-bold text-[#0f172a]">
// // //             {bestMatch.organizationName || 'Organisation'}
// // //           </span>
// // //         </div>

// // //         <div className="flex items-center gap-2 mb-4">
// // //           <Tag size={18} className="text-[#1a56db]" />
// // //           <span className="text-sm font-bold text-[#0f172a]">
// // //             {bestMatch.itemName || 'Matched Item'}
// // //           </span>
// // //         </div>

// // //         {/* Score display */}
// // //         <div className="bg-[#f8fafc] rounded-xl p-4 mb-6">
// // //           <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI Confidence</p>
// // //           <div className="flex items-end gap-2">
// // //             <span className="text-4xl font-black text-[#1a56db]">
// // //               {bestMatch.finalScore?.toFixed(0) ?? '—'}%
// // //             </span>
// // //             <span className="text-sm text-gray-400 mb-1">match</span>
// // //           </div>
// // //           <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
// // //             <div
// // //               className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full transition-all duration-1000"
// // //               style={{ width: `${Math.min(bestMatch.finalScore ?? 0, 100)}%` }}
// // //             />
// // //           </div>
// // //         </div>

// // //         {error && (
// // //           <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // //             <AlertCircle size={16} className="shrink-0" /> {error}
// // //           </div>
// // //         )}

// // //         <button
// // //           onClick={handleClaim}
// // //           disabled={claiming}
// // //           className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
// // //                      bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
// // //                      hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
// // //         >
// // //           {claiming ? (
// // //             <><Loader2 size={16} className="animate-spin" /> Submitting Claim…</>
// // //           ) : (
// // //             'Claim This Item'
// // //           )}
// // //         </button>
// // //       </div>

// // //       <p className="text-xs text-gray-400 text-center">
// // //         By claiming, you confirm this item belongs to you. The organisation will verify your request.
// // //       </p>
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import {
// //   ArrowLeft, CheckCircle, Loader2, AlertCircle,
// //   Building2, Tag, Sparkles, Clock, Hash
// // } from 'lucide-react';
// // import { claimItem, getMyLostReportsWithMatches } from '../../api/items';

// // export default function ClaimItem() {
// //   const { reportId } = useParams();
// //   const navigate = useNavigate();

// //   const [report, setReport]         = useState(null);
// //   const [loading, setLoading]       = useState(true);
// //   const [claiming, setClaiming]     = useState(false);
// //   const [claimed, setClaimed]       = useState(false);
// //   const [claimStatus, setClaimStatus] = useState(null);
// //   const [error, setError]           = useState('');

// //   const bestMatch = report?.matches?.[0];
// //   const organizationItemId = bestMatch?.organizationItemId;

// //   useEffect(() => {
// //     const fetchReport = async () => {
// //       try {
// //         const res = await getMyLostReportsWithMatches(0, 50);
// //         const data = res?.data || res;
// //         const items = data?.content || [];
// //         const found = items.find(r => r.id === reportId);
// //         if (found) setReport(found);
// //         else setError('Report not found.');
// //       } catch (err) {
// //         setError(err.response?.data?.message || err.message || 'Failed to load report');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchReport();
// //   }, [reportId]);

// //   const handleClaim = async () => {
// //     if (!organizationItemId) {
// //       setError('No matched item to claim.');
// //       return;
// //     }
// //     setClaiming(true);
// //     setError('');
// //     try {
// //       const result = await claimItem(organizationItemId);
// //       const claimResponse = result?.data?.data || result?.data || result;
// //       setClaimStatus(claimResponse);
// //       setClaimed(true);
// //     } catch (err) {
// //       setError(err.response?.data?.message || err.message || 'Claim failed');
// //     } finally {
// //       setClaiming(false);
// //     }
// //   };

// //   // ── Success screen ────────────────────────────────────────
// //   if (claimed) {
// //     const status = claimStatus?.status || 'PENDING';
// //     const isPending = status === 'PENDING';
// //     const lostReportId = claimStatus?.lostReportId || reportId;
// //     const organisationName = claimStatus?.organisationName || bestMatch?.organizationName || 'Unknown Organisation';

// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
// //         <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isPending ? 'bg-amber-100' : 'bg-green-100'}`}>
// //           {isPending ? (
// //             <Clock size={40} className="text-amber-600" />
// //           ) : (
// //             <CheckCircle size={40} className="text-green-600" />
// //           )}
// //         </div>
// //         <h2 className="text-2xl font-black text-[#0f172a] mb-2">Claim Submitted!</h2>
// //         <div className="flex items-center gap-2 mb-4">
// //           <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
// //             {isPending ? 'Pending Review' : status}
// //           </span>
// //         </div>

// //         {/* Shareable details card */}
// //         <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 w-full max-w-sm mb-6 text-left">
// //           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
// //             Important Details
// //           </p>
// //           <div className="space-y-2">
// //             <div className="flex items-center gap-2">
// //               <Hash size={14} className="text-[#1a56db] shrink-0" />
// //               <span className="text-sm text-gray-600">Your Lost Report ID:</span>
// //               <span className="font-mono font-bold text-[#0f172a]">{lostReportId}</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Building2 size={14} className="text-[#1a56db] shrink-0" />
// //               <span className="text-sm text-gray-600">Organisation:</span>
// //               <span className="font-semibold text-[#0f172a]">{organisationName}</span>
// //             </div>
// //           </div>
// //           <div className="mt-3 pt-3 border-t border-[#f1f5f9]">
// //             <p className="text-xs text-gray-500">
// //               📋 You can share your <span className="font-bold">Lost Report ID</span> with a friend to pick up the item on your behalf.
// //             </p>
// //           </div>
// //         </div>

// //         <p className="text-sm text-gray-500 mb-6 max-w-sm">
// //           {isPending
// //             ? 'Your claim has been sent to the organisation. They will review it and get back to you.'
// //             : 'The organisation has processed your claim.'}
// //         </p>
// //         <div className="flex gap-3">
// //           <Link to="/owner/reports"
// //                 className="px-5 py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-bold hover:bg-[#1547c0]">
// //             My Reports
// //           </Link>
// //           <Link to="/owner/search"
// //                 className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50">
// //             Back to Search
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ── Loading ───────────────────────────────────────────────
// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[60vh]">
// //         <div className="text-center">
// //           <Loader2 size={40} className="animate-spin text-[#1a56db] mx-auto mb-4" />
// //           <p className="text-sm text-gray-400">Loading match details…</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ── Error / no match ──────────────────────────────────────
// //   if (error || !bestMatch) {
// //     return (
// //       <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
// //         <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
// //         <h2 className="text-xl font-black mb-2">No match available</h2>
// //         <p className="text-sm text-gray-500 mb-6">
// //           {error || 'This report has not been matched with any found item yet.'}
// //         </p>
// //         <Link to="/owner/reports" className="text-[#1a56db] font-bold underline">
// //           Back to My Reports
// //         </Link>
// //       </div>
// //     );
// //   }

// //   // ── Match card ────────────────────────────────────────────
// //   return (
// //     <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
// //       <Link to="/owner/reports" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6">
// //         <ArrowLeft size={15} /> Back to My Reports
// //       </Link>

// //       <div className="text-center mb-8">
// //         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a56db] to-[#6366f1] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
// //           <Sparkles size={28} className="text-white" />
// //         </div>
// //         <h1 className="text-2xl font-black text-[#0f172a] mb-1">We found a match!</h1>
// //         <p className="text-sm text-gray-500">
// //           Your lost item may have been found by an organisation.
// //         </p>
// //       </div>

// //       {/* Match card */}
// //       <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm mb-6">
// //         <div className="flex items-center gap-2 mb-4">
// //           <Building2 size={18} className="text-[#1a56db]" />
// //           <span className="text-sm font-bold text-[#0f172a]">
// //             {bestMatch.organizationName || 'Organisation'}
// //           </span>
// //         </div>

// //         <div className="flex items-center gap-2 mb-4">
// //           <Tag size={18} className="text-[#1a56db]" />
// //           <span className="text-sm font-bold text-[#0f172a]">
// //             {bestMatch.itemName || 'Matched Item'}
// //           </span>
// //         </div>

// //         {/* Score display */}
// //         <div className="bg-[#f8fafc] rounded-xl p-4 mb-6">
// //           <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI Confidence</p>
// //           <div className="flex items-end gap-2">
// //             <span className="text-4xl font-black text-[#1a56db]">
// //               {bestMatch.finalScore?.toFixed(0) ?? '—'}%
// //             </span>
// //             <span className="text-sm text-gray-400 mb-1">match</span>
// //           </div>
// //           <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
// //             <div
// //               className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full transition-all duration-1000"
// //               style={{ width: `${Math.min(bestMatch.finalScore ?? 0, 100)}%` }}
// //             />
// //           </div>
// //         </div>

// //         {error && (
// //           <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// //             <AlertCircle size={16} className="shrink-0" /> {error}
// //           </div>
// //         )}

// //         <button
// //           onClick={handleClaim}
// //           disabled={claiming}
// //           className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
// //                      bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
// //                      hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
// //         >
// //           {claiming ? (
// //             <><Loader2 size={16} className="animate-spin" /> Submitting Claim…</>
// //           ) : (
// //             'Claim This Item'
// //           )}
// //         </button>
// //       </div>

// //       <p className="text-xs text-gray-400 text-center">
// //         By claiming, you confirm this item belongs to you. The organisation will verify your request.
// //       </p>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import {
//   ArrowLeft, CheckCircle, Loader2, AlertCircle,
//   Building2, Tag, Sparkles, Clock, Hash, Clipboard
// } from 'lucide-react';
// import { claimItem, getMyLostReportsWithMatches } from '../../api/items';

// export default function ClaimItem() {
//   const { reportId } = useParams();
//   const navigate = useNavigate();

//   const [report, setReport]         = useState(null);
//   const [loading, setLoading]       = useState(true);
//   const [claiming, setClaiming]     = useState(false);
//   const [claimed, setClaimed]       = useState(false);
//   const [claimStatus, setClaimStatus] = useState(null);
//   const [error, setError]           = useState('');

//   const bestMatch = report?.matches?.[0];
//   const organizationItemId = bestMatch?.organizationItemId;

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await getMyLostReportsWithMatches(0, 50);
//         const data = res?.data || res;
//         const items = data?.content || [];
//         const found = items.find(r => r.id === reportId);
//         if (found) setReport(found);
//         else setError('Report not found.');
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || 'Failed to load report');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReport();
//   }, [reportId]);

//   const handleClaim = async () => {
//     if (!organizationItemId) {
//       setError('No matched item to claim.');
//       return;
//     }
//     setClaiming(true);
//     setError('');
//     try {
//       const result = await claimItem(organizationItemId);
//       const claimResponse = result?.data?.data || result?.data || result;
//       setClaimStatus(claimResponse);
//       setClaimed(true);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Claim failed');
//     } finally {
//       setClaiming(false);
//     }
//   };

//   // ── Success screen ────────────────────────────────────────
//   if (claimed) {
//     const status = claimStatus?.status || 'PENDING';
//     const isPending = status === 'PENDING';
//     const lostReportId = claimStatus?.lostReportId || reportId;
//     const organisationName = claimStatus?.organisationName || bestMatch?.organizationName || 'Unknown Organisation';

//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
//         <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isPending ? 'bg-amber-100' : 'bg-green-100'}`}>
//           {isPending ? (
//             <Clock size={40} className="text-amber-600" />
//           ) : (
//             <CheckCircle size={40} className="text-green-600" />
//           )}
//         </div>
//         <h2 className="text-2xl font-black text-[#0f172a] mb-2">Claim Submitted!</h2>
//         <div className="flex items-center gap-2 mb-4">
//           <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
//             {isPending ? 'Pending Review' : status}
//           </span>
//         </div>

//         {/* Shareable details card */}
//         <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 w-full max-w-sm mb-6 text-left">
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
//             Important Details
//           </p>
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <Hash size={14} className="text-[#1a56db] shrink-0" />
//               <span className="text-sm text-gray-600">Your Lost Report ID:</span>
//               <span className="font-mono font-bold text-[#0f172a]">{lostReportId}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Building2 size={14} className="text-[#1a56db] shrink-0" />
//               <span className="text-sm text-gray-600">Organisation:</span>
//               <span className="font-semibold text-[#0f172a]">{organisationName}</span>
//             </div>
//           </div>
//           <div className="mt-3 pt-3 border-t border-[#f1f5f9]">
//             <p className="text-xs text-gray-500 flex items-center gap-1">
//               <Clipboard size={14} className="text-gray-400 shrink-0" />
//               You can share your <span className="font-bold">Lost Report ID</span> with a friend to pick up the item on your behalf.
//             </p>
//           </div>
//         </div>

//         <p className="text-sm text-gray-500 mb-6 max-w-sm">
//           {isPending
//             ? 'Your claim has been sent to the organisation. They will review it and get back to you.'
//             : 'The organisation has processed your claim.'}
//         </p>
//         <div className="flex gap-3">
//           <Link to="/owner/reports"
//                 className="px-5 py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-bold hover:bg-[#1547c0]">
//             My Reports
//           </Link>
//           <Link to="/owner/search"
//                 className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50">
//             Back to Search
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // ── Loading ───────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <Loader2 size={40} className="animate-spin text-[#1a56db] mx-auto mb-4" />
//           <p className="text-sm text-gray-400">Loading match details…</p>
//         </div>
//       </div>
//     );
//   }

//   // ── Error / no match ──────────────────────────────────────
//   if (error || !bestMatch) {
//     return (
//       <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
//         <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
//         <h2 className="text-xl font-black mb-2">No match available</h2>
//         <p className="text-sm text-gray-500 mb-6">
//           {error || 'This report has not been matched with any found item yet.'}
//         </p>
//         <Link to="/owner/reports" className="text-[#1a56db] font-bold underline">
//           Back to My Reports
//         </Link>
//       </div>
//     );
//   }

//   // ── Match card ────────────────────────────────────────────
//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
//       <Link to="/owner/reports" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6">
//         <ArrowLeft size={15} /> Back to My Reports
//       </Link>

//       <div className="text-center mb-8">
//         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a56db] to-[#6366f1] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
//           <Sparkles size={28} className="text-white" />
//         </div>
//         <h1 className="text-2xl font-black text-[#0f172a] mb-1">We found a match!</h1>
//         <p className="text-sm text-gray-500">
//           Your lost item may have been found by an organisation.
//         </p>
//       </div>

//       {/* Match card */}
//       <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm mb-6">
//         <div className="flex items-center gap-2 mb-4">
//           <Building2 size={18} className="text-[#1a56db]" />
//           <span className="text-sm font-bold text-[#0f172a]">
//             {bestMatch.organizationName || 'Organisation'}
//           </span>
//         </div>

//         <div className="flex items-center gap-2 mb-4">
//           <Tag size={18} className="text-[#1a56db]" />
//           <span className="text-sm font-bold text-[#0f172a]">
//             {bestMatch.itemName || 'Matched Item'}
//           </span>
//         </div>

//         {/* Score display */}
//         <div className="bg-[#f8fafc] rounded-xl p-4 mb-6">
//           <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI Confidence</p>
//           <div className="flex items-end gap-2">
//             <span className="text-4xl font-black text-[#1a56db]">
//               {bestMatch.finalScore?.toFixed(0) ?? '—'}%
//             </span>
//             <span className="text-sm text-gray-400 mb-1">match</span>
//           </div>
//           <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full transition-all duration-1000"
//               style={{ width: `${Math.min(bestMatch.finalScore ?? 0, 100)}%` }}
//             />
//           </div>
//         </div>

//         {error && (
//           <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
//             <AlertCircle size={16} className="shrink-0" /> {error}
//           </div>
//         )}

//         <button
//           onClick={handleClaim}
//           disabled={claiming}
//           className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
//                      bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
//                      hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
//         >
//           {claiming ? (
//             <><Loader2 size={16} className="animate-spin" /> Submitting Claim…</>
//           ) : (
//             'Claim This Item'
//           )}
//         </button>
//       </div>

//       <p className="text-xs text-gray-400 text-center">
//         By claiming, you confirm this item belongs to you. The organisation will verify your request.
//       </p>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Loader2, AlertCircle,
  Building2, Tag, Sparkles, Clock, Hash, Clipboard
} from 'lucide-react';
import { claimItem, getMyLostReportsWithMatches } from '../../api/items';

export default function ClaimItem() {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [report, setReport]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [claiming, setClaiming]     = useState(false);
  const [claimed, setClaimed]       = useState(false);
  const [claimStatus, setClaimStatus] = useState(null);
  const [error, setError]           = useState('');

  const bestMatch = report?.matches?.[0];
  const organizationItemId = bestMatch?.organizationItemId;
  const isAlreadyClaimed = report?.status === 'CLAIMED' || report?.status === 'FOUND';

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getMyLostReportsWithMatches(0, 50);
        const data = res?.data || res;
        const items = data?.content || [];
        const found = items.find(r => r.id === reportId);
        if (found) setReport(found);
        else setError('Report not found.');
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load report');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  const handleClaim = async () => {
    if (!organizationItemId) {
      setError('No matched item to claim.');
      return;
    }
    setClaiming(true);
    setError('');
    try {
      const result = await claimItem(organizationItemId);
      const claimResponse = result?.data?.data || result?.data || result;
      setClaimStatus(claimResponse);
      setClaimed(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Claim failed');
    } finally {
      setClaiming(false);
    }
  };

  // ── Success screen ────────────────────────────────────────
  if (claimed) {
    const status = claimStatus?.status || 'PENDING';
    const isPending = status === 'PENDING';
    const lostReportId = claimStatus?.lostReportId || reportId;
    const organisationName = claimStatus?.organisationName || bestMatch?.organizationName || 'Unknown Organisation';

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isPending ? 'bg-amber-100' : 'bg-green-100'}`}>
          {isPending ? (
            <Clock size={40} className="text-amber-600" />
          ) : (
            <CheckCircle size={40} className="text-green-600" />
          )}
        </div>
        <h2 className="text-2xl font-black text-[#0f172a] mb-2">Claim Submitted!</h2>
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
            {isPending ? 'Pending Review' : status}
          </span>
        </div>

        {/* Shareable details card */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 w-full max-w-sm mb-6 text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Important Details
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash size={14} className="text-[#1a56db] shrink-0" />
              <span className="text-sm text-gray-600">Your Lost Report ID:</span>
              <span className="font-mono font-bold text-[#0f172a]">{lostReportId}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-[#1a56db] shrink-0" />
              <span className="text-sm text-gray-600">Organisation:</span>
              <span className="font-semibold text-[#0f172a]">{organisationName}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#f1f5f9]">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clipboard size={14} className="text-gray-400 shrink-0" />
              You can share your <span className="font-bold">Lost Report ID</span> with a friend to pick up the item on your behalf.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          {isPending
            ? 'Your claim has been sent to the organisation. They will review it and get back to you.'
            : 'The organisation has processed your claim.'}
        </p>
        <div className="flex gap-3">
          <Link to="/owner/reports"
                className="px-5 py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-bold hover:bg-[#1547c0]">
            My Reports
          </Link>
          <Link to="/owner/search"
                className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-[#1a56db] mx-auto mb-4" />
          <p className="text-sm text-gray-400">Loading match details…</p>
        </div>
      </div>
    );
  }

  // ── Error / no match ──────────────────────────────────────
  if (error || !bestMatch) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
        <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-black mb-2">No match available</h2>
        <p className="text-sm text-gray-500 mb-6">
          {error || 'This report has not been matched with any found item yet.'}
        </p>
        <Link to="/owner/reports" className="text-[#1a56db] font-bold underline">
          Back to My Reports
        </Link>
      </div>
    );
  }

  // ── Already claimed screen ────────────────────────────────
  if (isAlreadyClaimed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-amber-600" />
        </div>
        <h2 className="text-2xl font-black text-[#0f172a] mb-2">Already Claimed</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          You have already claimed this item. You can view the status of your claim in My Reports.
        </p>
        <div className="flex gap-3">
          <Link to="/owner/reports"
                className="px-5 py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-bold hover:bg-[#1547c0]">
            My Reports
          </Link>
          <Link to="/owner/search"
                className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  // ── Match card ────────────────────────────────────────────
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <Link to="/owner/reports" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a56db] mb-6">
        <ArrowLeft size={15} /> Back to My Reports
      </Link>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a56db] to-[#6366f1] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
          <Sparkles size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-[#0f172a] mb-1">We found a match!</h1>
        <p className="text-sm text-gray-500">
          Your lost item may have been found by an organisation.
        </p>
      </div>

      {/* Match card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={18} className="text-[#1a56db]" />
          <span className="text-sm font-bold text-[#0f172a]">
            {bestMatch.organizationName || 'Organisation'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Tag size={18} className="text-[#1a56db]" />
          <span className="text-sm font-bold text-[#0f172a]">
            {bestMatch.itemName || 'Matched Item'}
          </span>
        </div>

        {/* Score display */}
        <div className="bg-[#f8fafc] rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI Confidence</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-[#1a56db]">
              {bestMatch.finalScore?.toFixed(0) ?? '—'}%
            </span>
            <span className="text-sm text-gray-400 mb-1">match</span>
          </div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1a56db] to-[#22c55e] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(bestMatch.finalScore ?? 0, 100)}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            <AlertCircle size={16} className="shrink-0" /> {error}
          </div>
        )}

        <button
          onClick={handleClaim}
          disabled={claiming}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                     bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white font-bold text-sm
                     hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-100"
        >
          {claiming ? (
            <><Loader2 size={16} className="animate-spin" /> Submitting Claim…</>
          ) : (
            'Claim This Item'
          )}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        By claiming, you confirm this item belongs to you. The organisation will verify your request.
      </p>
    </div>
  );
}