// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { TrendingUp, Package, CheckCircle, Trophy, BarChart3 } from 'lucide-react';
// // // // // // import { getOrganizationDashboard, getOrganizationClaims } from '/src/api/organization.js';

// // // // // // function ProgressCard({ label, value, max, color, icon: Icon }) {
// // // // // //   const [w, setW] = useState(0);
// // // // // //   const pct = max > 0 ? Math.round((value / max) * 100) : 0;
// // // // // //   useEffect(() => {
// // // // // //     const t = setTimeout(() => setW(pct), 150);
// // // // // //     return () => clearTimeout(t);
// // // // // //   }, [pct]);
// // // // // //   return (
// // // // // //     <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 card-hover">
// // // // // //       <div className="flex items-center justify-between mb-4">
// // // // // //         <div className="flex items-center gap-2">
// // // // // //           <div className="w-9 h-9 rounded-xl flex items-center justify-center"
// // // // // //                style={{ backgroundColor: `${color}18` }}>
// // // // // //             <Icon size={18} style={{ color }} />
// // // // // //           </div>
// // // // // //           <span className="text-sm font-bold text-gray-600">{label}</span>
// // // // // //         </div>
// // // // // //         <span className="text-2xl font-black text-[#0f172a]">{pct}%</span>
// // // // // //       </div>
// // // // // //       <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
// // // // // //         <div className="h-full rounded-full transition-all duration-1000 ease-out"
// // // // // //              style={{ width: `${w}%`, backgroundColor: color }} />
// // // // // //       </div>
// // // // // //       <p className="text-xs text-gray-400 mt-2">{value} of {max}</p>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default function Analytics() {
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [stats, setStats] = useState({
// // // // // //     totalPublished: 0,
// // // // // //     monthlyClaims: new Array(12).fill(0),
// // // // // //     approvalRate: 0,
// // // // // //     completionRate: 0,
// // // // // //     totalClaims: 0,
// // // // // //     approved: 0,
// // // // // //     completed: 0,
// // // // // //     rejected: 0,
// // // // // //     pending: 0,
// // // // // //   });

// // // // // //   useEffect(() => {
// // // // // //     async function fetchData() {
// // // // // //       try {
// // // // // //         const [dashboard, claims] = await Promise.all([
// // // // // //           getOrganizationDashboard(),
// // // // // //           getOrganizationClaims(),
// // // // // //         ]);

// // // // // //         const totalPublished = dashboard.totalPublishedItems ?? 0;
// // // // // //         const totalClaims = dashboard.totalClaims ?? 0;
// // // // // //         const approved = dashboard.approvedClaims ?? 0;
// // // // // //         const pending = dashboard.pendingClaims ?? 0;

// // // // // //         // Process claims array
// // // // // //         const now = new Date();
// // // // // //         const currentYear = now.getFullYear();
// // // // // //         const monthly = new Array(12).fill(0);
// // // // // //         let rejected = 0;

// // // // // //         if (Array.isArray(claims)) {
// // // // // //           claims.forEach((c) => {
// // // // // //             const date = c.claimedDate ? new Date(c.claimedDate) : null;
// // // // // //             if (date && date.getFullYear() === currentYear) {
// // // // // //               monthly[date.getMonth()] += 1;
// // // // // //             }
// // // // // //             if (c.status === 'REJECTED') rejected += 1;
// // // // // //           });
// // // // // //         }

// // // // // //         // Calculate percentages
// // // // // //         const approvalRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;
// // // // // //         const completionRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;

// // // // // //         setStats({
// // // // // //           totalPublished,
// // // // // //           totalClaims,
// // // // // //           approved,
// // // // // //           pending,
// // // // // //           rejected,
// // // // // //           completed: approved,
// // // // // //           monthlyClaims: monthly,
// // // // // //           approvalRate,
// // // // // //           completionRate,
// // // // // //         });
// // // // // //       } catch (err) {
// // // // // //         setError(err.response?.data?.message || err.message || 'Failed to load analytics');
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     }

// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// // // // // //   const maxVal = Math.max(...stats.monthlyClaims, 1);

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="p-6 flex items-center justify-center h-64">
// // // // // //         <span className="w-8 h-8 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="p-6 flex items-center justify-center h-64 text-red-500">
// // // // // //         <p>{error}</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="p-4 sm:p-6 lg:p-8">
// // // // // //       <div className="mb-8 fade-up">
// // // // // //         <h1 className="text-2xl font-black text-[#0f172a]">Analytics</h1>
// // // // // //         <p className="text-sm text-gray-400 mt-0.5">
// // // // // //           Performance overview for your organization
// // // // // //         </p>
// // // // // //       </div>

// // // // // //       {/* Progress cards */}
// // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // // // //         <ProgressCard
// // // // // //           label="Published Items"
// // // // // //           value={stats.totalPublished}
// // // // // //           max={Math.max(stats.totalPublished, 300)}
// // // // // //           color="#1a56db"
// // // // // //           icon={Package}
// // // // // //         />
// // // // // //         <ProgressCard
// // // // // //           label="Total Claims"
// // // // // //           value={stats.totalClaims}
// // // // // //           max={Math.max(stats.totalClaims, 400)}
// // // // // //           color="#6366f1"
// // // // // //           icon={BarChart3}
// // // // // //         />
// // // // // //         <ProgressCard
// // // // // //           label="Approval Rate"
// // // // // //           value={stats.approvalRate}
// // // // // //           max={100}
// // // // // //           color="#22c55e"
// // // // // //           icon={CheckCircle}
// // // // // //         />
// // // // // //         <ProgressCard
// // // // // //           label="Completion Rate"
// // // // // //           value={stats.completionRate}
// // // // // //           max={100}
// // // // // //           color="#f59e0b"
// // // // // //           icon={Trophy}
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // // //         {/* Monthly claims bar chart */}
// // // // // //         <div
// // // // // //           className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// // // // // //           style={{ animationDelay: '120ms' }}
// // // // // //         >
// // // // // //           <div className="flex items-center gap-2 mb-6">
// // // // // //             <BarChart3 size={18} className="text-[#1a56db]" />
// // // // // //             <h2 className="text-base font-black text-[#0f172a]">Monthly Claims</h2>
// // // // // //           </div>
// // // // // //           <div className="flex items-end gap-2 h-48">
// // // // // //             {stats.monthlyClaims.map((v, i) => {
// // // // // //               const [barH, setBarH] = useState(0);
// // // // // //               useEffect(() => {
// // // // // //                 const t = setTimeout(() => setBarH((v / maxVal) * 160), 200 + i * 60);
// // // // // //                 return () => clearTimeout(t);
// // // // // //               }, [v, i]);
// // // // // //               return (
// // // // // //                 <div key={i} className="flex-1 flex flex-col items-center gap-1">
// // // // // //                   <span className="text-[9px] text-gray-400 font-bold">{v}</span>
// // // // // //                   <div
// // // // // //                     className="w-full rounded-t-lg transition-all duration-700 ease-out
// // // // // //                                bg-gradient-to-t from-[#1a56db] to-[#6366f1] opacity-80
// // // // // //                                hover:opacity-100"
// // // // // //                     style={{ height: `${barH}px` }}
// // // // // //                   />
// // // // // //                   <span className="text-[9px] text-gray-400">{months[i]}</span>
// // // // // //                 </div>
// // // // // //               );
// // // // // //             })}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Donut + breakdown */}
// // // // // //         <div
// // // // // //           className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// // // // // //           style={{ animationDelay: '180ms' }}
// // // // // //         >
// // // // // //           <div className="flex items-center gap-2 mb-6">
// // // // // //             <TrendingUp size={18} className="text-[#22c55e]" />
// // // // // //             <h2 className="text-base font-black text-[#0f172a]">Claim Outcomes</h2>
// // // // // //           </div>
// // // // // //           {(() => {
// // // // // //             const segs = [
// // // // // //               { label: 'Approved',  val: stats.approved, color: '#22c55e' },
// // // // // //               { label: 'Pending',   val: stats.pending,  color: '#f59e0b' },
// // // // // //               { label: 'Rejected',  val: stats.rejected, color: '#ef4444' },
// // // // // //             ];
// // // // // //             const total = segs.reduce((s, g) => s + g.val, 0) || 1;
// // // // // //             let cum = 0;
// // // // // //             const circ = 2 * Math.PI * 56;
// // // // // //             return (
// // // // // //               <div className="flex items-center gap-6">
// // // // // //                 <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
// // // // // //                   {segs.map((s, i) => {
// // // // // //                     const pct = s.val / total;
// // // // // //                     const off = cum * circ;
// // // // // //                     cum += pct;
// // // // // //                     return (
// // // // // //                       <circle
// // // // // //                         key={i}
// // // // // //                         cx="70"
// // // // // //                         cy="70"
// // // // // //                         r="56"
// // // // // //                         fill="none"
// // // // // //                         stroke={s.color}
// // // // // //                         strokeWidth="20"
// // // // // //                         strokeDasharray={`${pct * circ} ${circ}`}
// // // // // //                         strokeDashoffset={-off + circ / 4}
// // // // // //                       />
// // // // // //                     );
// // // // // //                   })}
// // // // // //                   <circle cx="70" cy="70" r="40" fill="white" />
// // // // // //                   <text x="70" y="66" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
// // // // // //                     {total}
// // // // // //                   </text>
// // // // // //                   <text x="70" y="82" textAnchor="middle" fontSize="9" fill="#94a3b8">
// // // // // //                     Total
// // // // // //                   </text>
// // // // // //                 </svg>
// // // // // //                 <div className="space-y-2.5 flex-1">
// // // // // //                   {segs.map(s => (
// // // // // //                     <div key={s.label} className="flex items-center justify-between">
// // // // // //                       <div className="flex items-center gap-2">
// // // // // //                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
// // // // // //                         <span className="text-xs text-gray-600">{s.label}</span>
// // // // // //                       </div>
// // // // // //                       <div className="flex items-center gap-2">
// // // // // //                         <span className="text-xs font-black text-[#0f172a]">{s.val}</span>
// // // // // //                         <span className="text-[10px] text-gray-400 w-8 text-right">
// // // // // //                           {Math.round((s.val / total) * 100)}%
// // // // // //                         </span>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             );
// // // // // //           })()}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // import { useState, useEffect } from 'react';
// // // // // import { TrendingUp, Package, CheckCircle, Trophy, BarChart3 } from 'lucide-react';
// // // // // import { getOrganizationDashboard, getOrganizationClaims } from '/src/api/organization.js';

// // // // // function ProgressCard({ label, value, max, color, icon: Icon }) {
// // // // //   const [w, setW] = useState(0);
// // // // //   const pct = max > 0 ? Math.round((value / max) * 100) : 0;
// // // // //   useEffect(() => {
// // // // //     const t = setTimeout(() => setW(pct), 150);
// // // // //     return () => clearTimeout(t);
// // // // //   }, [pct]);
// // // // //   return (
// // // // //     <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 card-hover">
// // // // //       <div className="flex items-center justify-between mb-4">
// // // // //         <div className="flex items-center gap-2">
// // // // //           <div className="w-9 h-9 rounded-xl flex items-center justify-center"
// // // // //                style={{ backgroundColor: `${color}18` }}>
// // // // //             <Icon size={18} style={{ color }} />
// // // // //           </div>
// // // // //           <span className="text-sm font-bold text-gray-600">{label}</span>
// // // // //         </div>
// // // // //         <span className="text-2xl font-black text-[#0f172a]">{pct}%</span>
// // // // //       </div>
// // // // //       <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
// // // // //         <div className="h-full rounded-full transition-all duration-1000 ease-out"
// // // // //              style={{ width: `${w}%`, backgroundColor: color }} />
// // // // //       </div>
// // // // //       <p className="text-xs text-gray-400 mt-2">{value} of {max}</p>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default function Analytics() {
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [stats, setStats] = useState({
// // // // //     totalPublished: 0,
// // // // //     monthlyClaims: new Array(12).fill(0),
// // // // //     approvalRate: 0,
// // // // //     completionRate: 0,
// // // // //     totalClaims: 0,
// // // // //     approved: 0,
// // // // //     completed: 0,
// // // // //     rejected: 0,
// // // // //     pending: 0,
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     async function fetchData() {
// // // // //       try {
// // // // //         const [dashboard, claims] = await Promise.all([
// // // // //           getOrganizationDashboard(),
// // // // //           getOrganizationClaims(),
// // // // //         ]);

// // // // //         const totalPublished = dashboard.totalPublishedItems ?? 0;
// // // // //         const totalClaims = dashboard.totalClaims ?? 0;
// // // // //         const approved = dashboard.approvedClaims ?? 0;
// // // // //         const pending = dashboard.pendingClaims ?? 0;

// // // // //         const now = new Date();
// // // // //         const currentYear = now.getFullYear();
// // // // //         const monthly = new Array(12).fill(0);
// // // // //         let rejected = 0;

// // // // //         if (Array.isArray(claims)) {
// // // // //           claims.forEach((c) => {
// // // // //             const date = c.claimedDate ? new Date(c.claimedDate) : null;
// // // // //             if (date && date.getFullYear() === currentYear) {
// // // // //               monthly[date.getMonth()] += 1;
// // // // //             }
// // // // //             if (c.status === 'REJECTED') rejected += 1;
// // // // //           });
// // // // //         }

// // // // //         const approvalRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;
// // // // //         const completionRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;

// // // // //         setStats({
// // // // //           totalPublished,
// // // // //           totalClaims,
// // // // //           approved,
// // // // //           pending,
// // // // //           rejected,
// // // // //           completed: approved,
// // // // //           monthlyClaims: monthly,
// // // // //           approvalRate,
// // // // //           completionRate,
// // // // //         });
// // // // //       } catch (err) {
// // // // //         setError(err.response?.data?.message || err.message || 'Failed to load analytics');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     }

// // // // //     fetchData();
// // // // //   }, []);

// // // // //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// // // // //   const maxVal = Math.max(...stats.monthlyClaims, 1);

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="p-6 flex items-center justify-center h-64">
// // // // //         <span className="w-8 h-8 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="p-6 flex items-center justify-center h-64 text-red-500">
// // // // //         <p>{error}</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="p-4 sm:p-6 lg:p-8">
// // // // //       <div className="mb-8 fade-up">
// // // // //         <h1 className="text-2xl font-black text-[#0f172a]">Analytics</h1>
// // // // //         <p className="text-sm text-gray-400 mt-0.5">
// // // // //           Performance overview for your organization
// // // // //         </p>
// // // // //       </div>

// // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // // //         <ProgressCard label="Published Items"  value={stats.totalPublished} max={Math.max(stats.totalPublished, 300)} color="#1a56db" icon={Package} />
// // // // //         <ProgressCard label="Total Claims"     value={stats.totalClaims}   max={Math.max(stats.totalClaims, 400)} color="#6366f1" icon={BarChart3} />
// // // // //         <ProgressCard label="Approval Rate"    value={stats.approvalRate}   max={100} color="#22c55e" icon={CheckCircle} />
// // // // //         <ProgressCard label="Completion Rate"  value={stats.completionRate} max={100} color="#f59e0b" icon={Trophy} />
// // // // //       </div>

// // // // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up" style={{ animationDelay: '120ms' }}>
// // // // //           <div className="flex items-center gap-2 mb-6">
// // // // //             <BarChart3 size={18} className="text-[#1a56db]" />
// // // // //             <h2 className="text-base font-black text-[#0f172a]">Monthly Claims</h2>
// // // // //           </div>
// // // // //           <div className="flex items-end gap-2 h-48">
// // // // //             {stats.monthlyClaims.map((v, i) => {
// // // // //               const [barH, setBarH] = useState(0);
// // // // //               useEffect(() => {
// // // // //                 const t = setTimeout(() => setBarH((v / maxVal) * 160), 200 + i * 60);
// // // // //                 return () => clearTimeout(t);
// // // // //               }, [v, i]);
// // // // //               return (
// // // // //                 <div key={i} className="flex-1 flex flex-col items-center gap-1">
// // // // //                   <span className="text-[9px] text-gray-400 font-bold">{v}</span>
// // // // //                   <div className="w-full rounded-t-lg transition-all duration-700 ease-out bg-gradient-to-t from-[#1a56db] to-[#6366f1] opacity-80 hover:opacity-100" style={{ height: `${barH}px` }} />
// // // // //                   <span className="text-[9px] text-gray-400">{months[i]}</span>
// // // // //                 </div>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up" style={{ animationDelay: '180ms' }}>
// // // // //           <div className="flex items-center gap-2 mb-6">
// // // // //             <TrendingUp size={18} className="text-[#22c55e]" />
// // // // //             <h2 className="text-base font-black text-[#0f172a]">Claim Outcomes</h2>
// // // // //           </div>
// // // // //           {(() => {
// // // // //             const segs = [
// // // // //               { label: 'Approved',  val: stats.approved, color: '#22c55e' },
// // // // //               { label: 'Pending',   val: stats.pending,  color: '#f59e0b' },
// // // // //               { label: 'Rejected',  val: stats.rejected, color: '#ef4444' },
// // // // //             ];
// // // // //             const total = segs.reduce((s, g) => s + g.val, 0) || 1;
// // // // //             let cum = 0;
// // // // //             const circ = 2 * Math.PI * 56;
// // // // //             return (
// // // // //               <div className="flex items-center gap-6">
// // // // //                 <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
// // // // //                   {segs.map((s, i) => {
// // // // //                     const pct = s.val / total;
// // // // //                     const off = cum * circ;
// // // // //                     cum += pct;
// // // // //                     return (
// // // // //                       <circle key={i} cx="70" cy="70" r="56" fill="none" stroke={s.color} strokeWidth="20" strokeDasharray={`${pct * circ} ${circ}`} strokeDashoffset={-off + circ / 4} />
// // // // //                     );
// // // // //                   })}
// // // // //                   <circle cx="70" cy="70" r="40" fill="white" />
// // // // //                   <text x="70" y="66" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">{total}</text>
// // // // //                   <text x="70" y="82" textAnchor="middle" fontSize="9" fill="#94a3b8">Total</text>
// // // // //                 </svg>
// // // // //                 <div className="space-y-2.5 flex-1">
// // // // //                   {segs.map(s => (
// // // // //                     <div key={s.label} className="flex items-center justify-between">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
// // // // //                         <span className="text-xs text-gray-600">{s.label}</span>
// // // // //                       </div>
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <span className="text-xs font-black text-[#0f172a]">{s.val}</span>
// // // // //                         <span className="text-[10px] text-gray-400 w-8 text-right">{Math.round((s.val / total) * 100)}%</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             );
// // // // //           })()}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import { useState, useEffect } from 'react';
// // // // import { TrendingUp, Package, CheckCircle, Trophy, BarChart3 } from 'lucide-react';
// // // // import { getOrganizationDashboard, getOrganizationClaims } from '/src/api/organization.js';

// // // // function ProgressCard({ label, value, max, color, icon: Icon }) {
// // // //   const [w, setW] = useState(0);
// // // //   const pct = max > 0 ? Math.round((value / max) * 100) : 0;
// // // //   useEffect(() => {
// // // //     const t = setTimeout(() => setW(pct), 150);
// // // //     return () => clearTimeout(t);
// // // //   }, [pct]);
// // // //   return (
// // // //     <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 card-hover">
// // // //       <div className="flex items-center justify-between mb-4">
// // // //         <div className="flex items-center gap-2">
// // // //           <div className="w-9 h-9 rounded-xl flex items-center justify-center"
// // // //                style={{ backgroundColor: `${color}18` }}>
// // // //             <Icon size={18} style={{ color }} />
// // // //           </div>
// // // //           <span className="text-sm font-bold text-gray-600">{label}</span>
// // // //         </div>
// // // //         <span className="text-2xl font-black text-[#0f172a]">{pct}%</span>
// // // //       </div>
// // // //       <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
// // // //         <div className="h-full rounded-full transition-all duration-1000 ease-out"
// // // //              style={{ width: `${w}%`, backgroundColor: color }} />
// // // //       </div>
// // // //       <p className="text-xs text-gray-400 mt-2">{value} of {max}</p>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function Analytics() {
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [stats, setStats] = useState({
// // // //     totalPublished: 0,
// // // //     monthlyClaims: new Array(12).fill(0),
// // // //     approvalRate: 0,
// // // //     completionRate: 0,
// // // //     totalClaims: 0,
// // // //     approved: 0,
// // // //     completed: 0,
// // // //     rejected: 0,
// // // //     pending: 0,
// // // //   });

// // // //   // 🎯 Animated bar heights (all 12 bars in one state array)
// // // //   const [barHeights, setBarHeights] = useState(new Array(12).fill(0));

// // // //   useEffect(() => {
// // // //     async function fetchData() {
// // // //       try {
// // // //         const [dashboard, claims] = await Promise.all([
// // // //           getOrganizationDashboard(),
// // // //           getOrganizationClaims(),
// // // //         ]);

// // // //         const totalPublished = dashboard.totalPublishedItems ?? 0;
// // // //         const totalClaims = dashboard.totalClaims ?? 0;
// // // //         const approved = dashboard.approvedClaims ?? 0;
// // // //         const pending = dashboard.pendingClaims ?? 0;

// // // //         const now = new Date();
// // // //         const currentYear = now.getFullYear();
// // // //         const monthly = new Array(12).fill(0);
// // // //         let rejected = 0;

// // // //         if (Array.isArray(claims)) {
// // // //           claims.forEach((c) => {
// // // //             const date = c.claimedDate ? new Date(c.claimedDate) : null;
// // // //             if (date && date.getFullYear() === currentYear) {
// // // //               monthly[date.getMonth()] += 1;
// // // //             }
// // // //             if (c.status === 'REJECTED') rejected += 1;
// // // //           });
// // // //         }

// // // //         const approvalRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;
// // // //         const completionRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;

// // // //         setStats({
// // // //           totalPublished,
// // // //           totalClaims,
// // // //           approved,
// // // //           pending,
// // // //           rejected,
// // // //           completed: approved,
// // // //           monthlyClaims: monthly,
// // // //           approvalRate,
// // // //           completionRate,
// // // //         });
// // // //       } catch (err) {
// // // //         setError(err.response?.data?.message || err.message || 'Failed to load analytics');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     }

// // // //     fetchData();
// // // //   }, []);

// // // //   // 🎯 Animate bar heights whenever monthlyClaims changes
// // // //   useEffect(() => {
// // // //     const maxVal = Math.max(...stats.monthlyClaims, 1);
// // // //     const timeouts = [];

// // // //     stats.monthlyClaims.forEach((v, i) => {
// // // //       const t = setTimeout(() => {
// // // //         setBarHeights(prev => {
// // // //           const copy = [...prev];
// // // //           copy[i] = (v / maxVal) * 160;
// // // //           return copy;
// // // //         });
// // // //       }, 200 + i * 60);
// // // //       timeouts.push(t);
// // // //     });

// // // //     return () => timeouts.forEach(clearTimeout);
// // // //   }, [stats.monthlyClaims]);

// // // //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// // // //   const maxVal = Math.max(...stats.monthlyClaims, 1);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="p-6 flex items-center justify-center h-64">
// // // //         <span className="w-8 h-8 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="p-6 flex items-center justify-center h-64 text-red-500">
// // // //         <p>{error}</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="p-4 sm:p-6 lg:p-8">
// // // //       <div className="mb-8 fade-up">
// // // //         <h1 className="text-2xl font-black text-[#0f172a]">Analytics</h1>
// // // //         <p className="text-sm text-gray-400 mt-0.5">
// // // //           Performance overview for your organization
// // // //         </p>
// // // //       </div>

// // // //       {/* Progress cards */}
// // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // //         <ProgressCard label="Published Items"  value={stats.totalPublished} max={Math.max(stats.totalPublished, 300)} color="#1a56db" icon={Package} />
// // // //         <ProgressCard label="Total Claims"     value={stats.totalClaims}   max={Math.max(stats.totalClaims, 400)} color="#6366f1" icon={BarChart3} />
// // // //         <ProgressCard label="Approval Rate"    value={stats.approvalRate}   max={100} color="#22c55e" icon={CheckCircle} />
// // // //         <ProgressCard label="Completion Rate"  value={stats.completionRate} max={100} color="#f59e0b" icon={Trophy} />
// // // //       </div>

// // // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // //         {/* Monthly claims bar chart – no hooks inside map */}
// // // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// // // //              style={{ animationDelay: '120ms' }}>
// // // //           <div className="flex items-center gap-2 mb-6">
// // // //             <BarChart3 size={18} className="text-[#1a56db]" />
// // // //             <h2 className="text-base font-black text-[#0f172a]">Monthly Claims</h2>
// // // //           </div>
// // // //           <div className="flex items-end gap-2 h-48">
// // // //             {stats.monthlyClaims.map((v, i) => (
// // // //               <div key={i} className="flex-1 flex flex-col items-center gap-1">
// // // //                 <span className="text-[9px] text-gray-400 font-bold">{v}</span>
// // // //                 <div
// // // //                   className="w-full rounded-t-lg transition-all duration-700 ease-out
// // // //                              bg-gradient-to-t from-[#1a56db] to-[#6366f1] opacity-80
// // // //                              hover:opacity-100"
// // // //                   style={{ height: `${barHeights[i]}px` }}
// // // //                 />
// // // //                 <span className="text-[9px] text-gray-400">{months[i]}</span>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Donut + breakdown */}
// // // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// // // //              style={{ animationDelay: '180ms' }}>
// // // //           <div className="flex items-center gap-2 mb-6">
// // // //             <TrendingUp size={18} className="text-[#22c55e]" />
// // // //             <h2 className="text-base font-black text-[#0f172a]">Claim Outcomes</h2>
// // // //           </div>
// // // //           {(() => {
// // // //             const segs = [
// // // //               { label: 'Approved',  val: stats.approved, color: '#22c55e' },
// // // //               { label: 'Pending',   val: stats.pending,  color: '#f59e0b' },
// // // //               { label: 'Rejected',  val: stats.rejected, color: '#ef4444' },
// // // //             ];
// // // //             const total = segs.reduce((s, g) => s + g.val, 0) || 1;
// // // //             let cum = 0;
// // // //             const circ = 2 * Math.PI * 56;
// // // //             return (
// // // //               <div className="flex items-center gap-6">
// // // //                 <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
// // // //                   {segs.map((s, i) => {
// // // //                     const pct = s.val / total;
// // // //                     const off = cum * circ;
// // // //                     cum += pct;
// // // //                     return (
// // // //                       <circle key={i} cx="70" cy="70" r="56" fill="none"
// // // //                               stroke={s.color} strokeWidth="20"
// // // //                               strokeDasharray={`${pct * circ} ${circ}`}
// // // //                               strokeDashoffset={-off + circ / 4} />
// // // //                     );
// // // //                   })}
// // // //                   <circle cx="70" cy="70" r="40" fill="white" />
// // // //                   <text x="70" y="66" textAnchor="middle" fontSize="16"
// // // //                         fontWeight="900" fill="#0f172a">{total}</text>
// // // //                   <text x="70" y="82" textAnchor="middle" fontSize="9" fill="#94a3b8">Total</text>
// // // //                 </svg>
// // // //                 <div className="space-y-2.5 flex-1">
// // // //                   {segs.map(s => (
// // // //                     <div key={s.label} className="flex items-center justify-between">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <div className="w-2.5 h-2.5 rounded-full"
// // // //                              style={{ backgroundColor: s.color }} />
// // // //                         <span className="text-xs text-gray-600">{s.label}</span>
// // // //                       </div>
// // // //                       <div className="flex items-center gap-2">
// // // //                         <span className="text-xs font-black text-[#0f172a]">{s.val}</span>
// // // //                         <span className="text-[10px] text-gray-400 w-8 text-right">
// // // //                           {Math.round((s.val / total) * 100)}%
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })()}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState, useEffect } from 'react';
// // // import { TrendingUp, Package, CheckCircle, Trophy, BarChart3 } from 'lucide-react';
// // // import { getOrganizationDashboard, getOrganizationClaims } from '/src/api/organization.js';

// // // function ProgressCard({ label, value, max, color, icon: Icon }) {
// // //   const [w, setW] = useState(0);
// // //   const pct = max > 0 ? Math.round((value / max) * 100) : 0;
// // //   useEffect(() => {
// // //     const t = setTimeout(() => setW(pct), 150);
// // //     return () => clearTimeout(t);
// // //   }, [pct]);
// // //   return (
// // //     <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 card-hover">
// // //       <div className="flex items-center justify-between mb-4">
// // //         <div className="flex items-center gap-2">
// // //           <div className="w-9 h-9 rounded-xl flex items-center justify-center"
// // //                style={{ backgroundColor: `${color}18` }}>
// // //             <Icon size={18} style={{ color }} />
// // //           </div>
// // //           <span className="text-sm font-bold text-gray-600">{label}</span>
// // //         </div>
// // //         <span className="text-2xl font-black text-[#0f172a]">{pct}%</span>
// // //       </div>
// // //       <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
// // //         <div className="h-full rounded-full transition-all duration-1000 ease-out"
// // //              style={{ width: `${w}%`, backgroundColor: color }} />
// // //       </div>
// // //       <p className="text-xs text-gray-400 mt-2">{value} of {max}</p>
// // //     </div>
// // //   );
// // // }

// // // export default function Analytics() {
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [stats, setStats] = useState({
// // //     totalPublished: 0,
// // //     monthlyClaims: new Array(12).fill(0),
// // //     approvalRate: 0,
// // //     completionRate: 0,
// // //     totalClaims: 0,
// // //     approved: 0,
// // //     completed: 0,
// // //     rejected: 0,
// // //     pending: 0,
// // //   });

// // //   // 🎯 Animated bar heights
// // //   const [barHeights, setBarHeights] = useState(new Array(12).fill(0));

// // //   useEffect(() => {
// // //     async function fetchData() {
// // //       try {
// // //         const [dashResp, claimsResp] = await Promise.all([
// // //           getOrganizationDashboard(),
// // //           getOrganizationClaims(),
// // //         ]);

// // //         // ── Unwrap the outer `data` property from the GenericRestResponse ──
// // //         const dash = dashResp?.data || {};
// // //         const claims = claimsResp?.data || [];

// // //         const totalPublished = dash.totalPublishedItems ?? 0;
// // //         const totalClaims = dash.totalClaims ?? 0;
// // //         const approved = dash.approvedClaims ?? 0;
// // //         const pending = dash.pendingClaims ?? 0;

// // //         const now = new Date();
// // //         const currentYear = now.getFullYear();
// // //         const monthly = new Array(12).fill(0);
// // //         let rejected = 0;

// // //         if (Array.isArray(claims)) {
// // //           claims.forEach((c) => {
// // //             const date = c.claimedDate ? new Date(c.claimedDate) : null;
// // //             if (date && date.getFullYear() === currentYear) {
// // //               monthly[date.getMonth()] += 1;
// // //             }
// // //             if (c.status === 'REJECTED') rejected += 1;
// // //           });
// // //         }

// // //         const approvalRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;
// // //         const completionRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;

// // //         setStats({
// // //           totalPublished,
// // //           totalClaims,
// // //           approved,
// // //           pending,
// // //           rejected,
// // //           completed: approved,
// // //           monthlyClaims: monthly,
// // //           approvalRate,
// // //           completionRate,
// // //         });
// // //       } catch (err) {
// // //         setError(err.response?.data?.message || err.message || 'Failed to load analytics');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }

// // //     fetchData();
// // //   }, []);

// // //   // 🎯 Animate bar heights whenever monthlyClaims changes
// // //   useEffect(() => {
// // //     const maxVal = Math.max(...stats.monthlyClaims, 1);
// // //     const timeouts = [];

// // //     stats.monthlyClaims.forEach((v, i) => {
// // //       const t = setTimeout(() => {
// // //         setBarHeights(prev => {
// // //           const copy = [...prev];
// // //           copy[i] = (v / maxVal) * 160;
// // //           return copy;
// // //         });
// // //       }, 200 + i * 60);
// // //       timeouts.push(t);
// // //     });

// // //     return () => timeouts.forEach(clearTimeout);
// // //   }, [stats.monthlyClaims]);

// // //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// // //   if (loading) {
// // //     return (
// // //       <div className="p-6 flex items-center justify-center h-64">
// // //         <span className="w-8 h-8 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="p-6 flex items-center justify-center h-64 text-red-500">
// // //         <p>{error}</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-4 sm:p-6 lg:p-8">
// // //       <div className="mb-8 fade-up">
// // //         <h1 className="text-2xl font-black text-[#0f172a]">Analytics</h1>
// // //         <p className="text-sm text-gray-400 mt-0.5">
// // //           Performance overview for your organization
// // //         </p>
// // //       </div>

// // //       {/* Progress cards */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // //         <ProgressCard label="Published Items"  value={stats.totalPublished} max={Math.max(stats.totalPublished, 300)} color="#1a56db" icon={Package} />
// // //         <ProgressCard label="Total Claims"     value={stats.totalClaims}   max={Math.max(stats.totalClaims, 400)} color="#6366f1" icon={BarChart3} />
// // //         <ProgressCard label="Approval Rate"    value={stats.approvalRate}   max={100} color="#22c55e" icon={CheckCircle} />
// // //         <ProgressCard label="Completion Rate"  value={stats.completionRate} max={100} color="#f59e0b" icon={Trophy} />
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         {/* Monthly claims bar chart */}
// // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// // //              style={{ animationDelay: '120ms' }}>
// // //           <div className="flex items-center gap-2 mb-6">
// // //             <BarChart3 size={18} className="text-[#1a56db]" />
// // //             <h2 className="text-base font-black text-[#0f172a]">Monthly Claims</h2>
// // //           </div>
// // //           <div className="flex items-end gap-2 h-48">
// // //             {stats.monthlyClaims.map((v, i) => (
// // //               <div key={i} className="flex-1 flex flex-col items-center gap-1">
// // //                 <span className="text-[9px] text-gray-400 font-bold">{v}</span>
// // //                 <div
// // //                   className="w-full rounded-t-lg transition-all duration-700 ease-out
// // //                              bg-gradient-to-t from-[#1a56db] to-[#6366f1] opacity-80
// // //                              hover:opacity-100"
// // //                   style={{ height: `${barHeights[i]}px` }}
// // //                 />
// // //                 <span className="text-[9px] text-gray-400">{months[i]}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Donut + breakdown */}
// // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// // //              style={{ animationDelay: '180ms' }}>
// // //           <div className="flex items-center gap-2 mb-6">
// // //             <TrendingUp size={18} className="text-[#22c55e]" />
// // //             <h2 className="text-base font-black text-[#0f172a]">Claim Outcomes</h2>
// // //           </div>
// // //           {(() => {
// // //             const segs = [
// // //               { label: 'Approved',  val: stats.approved, color: '#22c55e' },
// // //               { label: 'Pending',   val: stats.pending,  color: '#f59e0b' },
// // //               { label: 'Rejected',  val: stats.rejected, color: '#ef4444' },
// // //             ];
// // //             const total = segs.reduce((s, g) => s + g.val, 0) || 1;
// // //             let cum = 0;
// // //             const circ = 2 * Math.PI * 56;
// // //             return (
// // //               <div className="flex items-center gap-6">
// // //                 <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
// // //                   {segs.map((s, i) => {
// // //                     const pct = s.val / total;
// // //                     const off = cum * circ;
// // //                     cum += pct;
// // //                     return (
// // //                       <circle key={i} cx="70" cy="70" r="56" fill="none"
// // //                               stroke={s.color} strokeWidth="20"
// // //                               strokeDasharray={`${pct * circ} ${circ}`}
// // //                               strokeDashoffset={-off + circ / 4} />
// // //                     );
// // //                   })}
// // //                   <circle cx="70" cy="70" r="40" fill="white" />
// // //                   <text x="70" y="66" textAnchor="middle" fontSize="16"
// // //                         fontWeight="900" fill="#0f172a">{total}</text>
// // //                   <text x="70" y="82" textAnchor="middle" fontSize="9" fill="#94a3b8">Total</text>
// // //                 </svg>
// // //                 <div className="space-y-2.5 flex-1">
// // //                   {segs.map(s => (
// // //                     <div key={s.label} className="flex items-center justify-between">
// // //                       <div className="flex items-center gap-2">
// // //                         <div className="w-2.5 h-2.5 rounded-full"
// // //                              style={{ backgroundColor: s.color }} />
// // //                         <span className="text-xs text-gray-600">{s.label}</span>
// // //                       </div>
// // //                       <div className="flex items-center gap-2">
// // //                         <span className="text-xs font-black text-[#0f172a]">{s.val}</span>
// // //                         <span className="text-[10px] text-gray-400 w-8 text-right">
// // //                           {Math.round((s.val / total) * 100)}%
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })()}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/pages/organisation/Analytics.jsx
// // import { useState, useEffect } from 'react';
// // import { TrendingUp, Package, CheckCircle, Trophy, BarChart3 } from 'lucide-react';
// // import { getOrganizationDashboard, getOrganizationClaims } from '../../api/items';

// // const STORAGE_KEY = 'pata_org_settings';

// // function loadMaxValues() {
// //   try {
// //     const raw = localStorage.getItem(STORAGE_KEY);
// //     return raw ? JSON.parse(raw) : { maxItems: 100, maxPending: 50, maxApproved: 50 };
// //   } catch {
// //     return { maxItems: 100, maxPending: 50, maxApproved: 50 };
// //   }
// // }

// // function ProgressCard({ label, value, max, color, icon: Icon }) {
// //   const [w, setW] = useState(0);
// //   const pct = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
// //   useEffect(() => {
// //     const t = setTimeout(() => setW(pct), 150);
// //     return () => clearTimeout(t);
// //   }, [pct]);
// //   return (
// //     <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 card-hover">
// //       <div className="flex items-center justify-between mb-4">
// //         <div className="flex items-center gap-2">
// //           <div className="w-9 h-9 rounded-xl flex items-center justify-center"
// //                style={{ backgroundColor: `${color}18` }}>
// //             <Icon size={18} style={{ color }} />
// //           </div>
// //           <span className="text-sm font-bold text-gray-600">{label}</span>
// //         </div>
// //         <span className="text-2xl font-black text-[#0f172a]">{pct}%</span>
// //       </div>
// //       <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
// //         <div className="h-full rounded-full transition-all duration-1000 ease-out"
// //              style={{ width: `${w}%`, backgroundColor: color }} />
// //       </div>
// //       <p className="text-xs text-gray-400 mt-2">{value} of {max}</p>
// //     </div>
// //   );
// // }

// // export default function Analytics() {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [stats, setStats] = useState({
// //     totalPublished: 0,
// //     monthlyClaims: new Array(12).fill(0),
// //     approvalRate: 0,
// //     completionRate: 0,
// //     totalClaims: 0,
// //     approved: 0,
// //     completed: 0,
// //     rejected: 0,
// //     pending: 0,
// //   });

// //   const [barHeights, setBarHeights] = useState(new Array(12).fill(0));
// //   const maxValues = loadMaxValues(); // from Settings

// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         const [dashResp, claimsResp] = await Promise.all([
// //           getOrganizationDashboard(),
// //           getOrganizationClaims(),
// //         ]);

// //         // Unwrap GenericRestResponse wrapper
// //         const dash = dashResp?.data || {};
// //         const claims = claimsResp?.data || [];

// //         const totalPublished = dash.totalPublishedItems ?? 0;
// //         const totalClaims = dash.totalClaims ?? 0;
// //         const approved = dash.approvedClaims ?? 0;
// //         const pending = dash.pendingClaims ?? 0;

// //         const now = new Date();
// //         const currentYear = now.getFullYear();
// //         const monthly = new Array(12).fill(0);
// //         let rejected = 0;

// //         if (Array.isArray(claims)) {
// //           claims.forEach((c) => {
// //             const date = c.claimedDate ? new Date(c.claimedDate) : null;
// //             if (date && date.getFullYear() === currentYear) {
// //               monthly[date.getMonth()] += 1;
// //             }
// //             if (c.status === 'REJECTED') rejected += 1;
// //           });
// //         }

// //         const approvalRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;
// //         const completionRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;

// //         setStats({
// //           totalPublished,
// //           totalClaims,
// //           approved,
// //           pending,
// //           rejected,
// //           completed: approved,
// //           monthlyClaims: monthly,
// //           approvalRate,
// //           completionRate,
// //         });
// //       } catch (err) {
// //         setError(err.response?.data?.message || err.message || 'Failed to load analytics');
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchData();
// //   }, []);

// //   // Animate bar heights
// //   useEffect(() => {
// //     const maxVal = Math.max(...stats.monthlyClaims, 1);
// //     const timeouts = [];
// //     stats.monthlyClaims.forEach((v, i) => {
// //       const t = setTimeout(() => {
// //         setBarHeights(prev => {
// //           const copy = [...prev];
// //           copy[i] = (v / maxVal) * 160;
// //           return copy;
// //         });
// //       }, 200 + i * 60);
// //       timeouts.push(t);
// //     });
// //     return () => timeouts.forEach(clearTimeout);
// //   }, [stats.monthlyClaims]);

// //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// //   if (loading) {
// //     return (
// //       <div className="p-6 flex items-center justify-center h-64">
// //         <span className="w-8 h-8 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-6 flex items-center justify-center h-64 text-red-500">
// //         <p>{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-4 sm:p-6 lg:p-8">
// //       <div className="mb-8 fade-up">
// //         <h1 className="text-2xl font-black text-[#0f172a]">Analytics</h1>
// //         <p className="text-sm text-gray-400 mt-0.5">
// //           Performance overview for your organization
// //         </p>
// //       </div>

// //       {/* Progress cards using Settings max values */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //         <ProgressCard
// //           label="Published Items"
// //           value={stats.totalPublished}
// //           max={maxValues.maxItems}
// //           color="#1a56db"
// //           icon={Package}
// //         />
// //         <ProgressCard
// //           label="Pending Claims"
// //           value={stats.pending}
// //           max={maxValues.maxPending}
// //           color="#f59e0b"
// //           icon={Clock}   // using Clock from lucide (need to import)
// //         />
// //         <ProgressCard
// //           label="Approved Claims"
// //           value={stats.approved}
// //           max={maxValues.maxApproved}
// //           color="#22c55e"
// //           icon={CheckCircle}
// //         />
// //         <ProgressCard
// //           label="Completion Rate"
// //           value={stats.completionRate}
// //           max={100}
// //           color="#f59e0b"
// //           icon={Trophy}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         {/* Monthly claims bar chart */}
// //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// //              style={{ animationDelay: '120ms' }}>
// //           <div className="flex items-center gap-2 mb-6">
// //             <BarChart3 size={18} className="text-[#1a56db]" />
// //             <h2 className="text-base font-black text-[#0f172a]">Monthly Claims</h2>
// //           </div>
// //           <div className="flex items-end gap-2 h-48">
// //             {stats.monthlyClaims.map((v, i) => (
// //               <div key={i} className="flex-1 flex flex-col items-center gap-1">
// //                 <span className="text-[9px] text-gray-400 font-bold">{v}</span>
// //                 <div
// //                   className="w-full rounded-t-lg transition-all duration-700 ease-out
// //                              bg-gradient-to-t from-[#1a56db] to-[#6366f1] opacity-80
// //                              hover:opacity-100"
// //                   style={{ height: `${barHeights[i]}px` }}
// //                 />
// //                 <span className="text-[9px] text-gray-400">{months[i]}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Donut + breakdown */}
// //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// //              style={{ animationDelay: '180ms' }}>
// //           <div className="flex items-center gap-2 mb-6">
// //             <TrendingUp size={18} className="text-[#22c55e]" />
// //             <h2 className="text-base font-black text-[#0f172a]">Claim Outcomes</h2>
// //           </div>
// //           {(() => {
// //             const segs = [
// //               { label: 'Approved',  val: stats.approved, color: '#22c55e' },
// //               { label: 'Pending',   val: stats.pending,  color: '#f59e0b' },
// //               { label: 'Rejected',  val: stats.rejected, color: '#ef4444' },
// //             ];
// //             const total = segs.reduce((s, g) => s + g.val, 0) || 1;
// //             let cum = 0;
// //             const circ = 2 * Math.PI * 56;
// //             return (
// //               <div className="flex items-center gap-6">
// //                 <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
// //                   {segs.map((s, i) => {
// //                     const pct = s.val / total;
// //                     const off = cum * circ;
// //                     cum += pct;
// //                     return (
// //                       <circle key={i} cx="70" cy="70" r="56" fill="none"
// //                               stroke={s.color} strokeWidth="20"
// //                               strokeDasharray={`${pct * circ} ${circ}`}
// //                               strokeDashoffset={-off + circ / 4} />
// //                     );
// //                   })}
// //                   <circle cx="70" cy="70" r="40" fill="white" />
// //                   <text x="70" y="66" textAnchor="middle" fontSize="16"
// //                         fontWeight="900" fill="#0f172a">{total}</text>
// //                   <text x="70" y="82" textAnchor="middle" fontSize="9" fill="#94a3b8">Total</text>
// //                 </svg>
// //                 <div className="space-y-2.5 flex-1">
// //                   {segs.map(s => (
// //                     <div key={s.label} className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <div className="w-2.5 h-2.5 rounded-full"
// //                              style={{ backgroundColor: s.color }} />
// //                         <span className="text-xs text-gray-600">{s.label}</span>
// //                       </div>
// //                       <div className="flex items-center gap-2">
// //                         <span className="text-xs font-black text-[#0f172a]">{s.val}</span>
// //                         <span className="text-[10px] text-gray-400 w-8 text-right">
// //                           {Math.round((s.val / total) * 100)}%
// //                         </span>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             );
// //           })()}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/organisation/Analytics.jsx
// import { useState, useEffect } from 'react';
// import { TrendingUp, Package, CheckCircle, Trophy, BarChart3 } from 'lucide-react';
// import { getOrganizationDashboard, getOrganizationClaims } from '../../api/items';

// const STORAGE_KEY = 'pata_org_settings';

// function loadMaxValues() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : { maxItems: 100, maxPending: 50, maxApproved: 50 };
//   } catch {
//     return { maxItems: 100, maxPending: 50, maxApproved: 50 };
//   }
// }

// function ProgressCard({ label, value, max, color, icon: Icon }) {
//   const [w, setW] = useState(0);
//   const pct = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
//   useEffect(() => {
//     const t = setTimeout(() => setW(pct), 150);
//     return () => clearTimeout(t);
//   }, [pct]);
//   return (
//     <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 card-hover">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-xl flex items-center justify-center"
//                style={{ backgroundColor: `${color}18` }}>
//             <Icon size={18} style={{ color }} />
//           </div>
//           <span className="text-sm font-bold text-gray-600">{label}</span>
//         </div>
//         <span className="text-2xl font-black text-[#0f172a]">{pct}%</span>
//       </div>
//       <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
//         <div className="h-full rounded-full transition-all duration-1000 ease-out"
//              style={{ width: `${w}%`, backgroundColor: color }} />
//       </div>
//       <p className="text-xs text-gray-400 mt-2">{value} of {max}</p>
//     </div>
//   );
// }

// export default function Analytics() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState({
//     totalPublished: 0,
//     monthlyClaims: new Array(12).fill(0),
//     approvalRate: 0,
//     completionRate: 0,
//     totalClaims: 0,
//     approved: 0,
//     completed: 0,
//     rejected: 0,
//     pending: 0,
//   });

//   const [barHeights, setBarHeights] = useState(new Array(12).fill(0));
//   const maxValues = loadMaxValues(); // from Settings

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [dashResp, claimsResp] = await Promise.all([
//           getOrganizationDashboard(),
//           getOrganizationClaims(),
//         ]);

//         // Unwrap GenericRestResponse wrapper
//         const dash = dashResp?.data || {};
//         const claims = claimsResp?.data || [];

//         const totalPublished = dash.totalPublishedItems ?? 0;
//         const totalClaims = dash.totalClaims ?? 0;
//         const approved = dash.approvedClaims ?? 0;
//         const pending = dash.pendingClaims ?? 0;

//         const now = new Date();
//         const currentYear = now.getFullYear();
//         const monthly = new Array(12).fill(0);
//         let rejected = 0;

//         if (Array.isArray(claims)) {
//           claims.forEach((c) => {
//             const date = c.claimedDate ? new Date(c.claimedDate) : null;
//             if (date && date.getFullYear() === currentYear) {
//               monthly[date.getMonth()] += 1;
//             }
//             if (c.status === 'REJECTED') rejected += 1;
//           });
//         }

//         const approvalRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;
//         const completionRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;

//         setStats({
//           totalPublished,
//           totalClaims,
//           approved,
//           pending,
//           rejected,
//           completed: approved,
//           monthlyClaims: monthly,
//           approvalRate,
//           completionRate,
//         });
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || 'Failed to load analytics');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   // Animate bar heights
//   useEffect(() => {
//     const maxVal = Math.max(...stats.monthlyClaims, 1);
//     const timeouts = [];
//     stats.monthlyClaims.forEach((v, i) => {
//       const t = setTimeout(() => {
//         setBarHeights(prev => {
//           const copy = [...prev];
//           copy[i] = (v / maxVal) * 160;
//           return copy;
//         });
//       }, 200 + i * 60);
//       timeouts.push(t);
//     });
//     return () => timeouts.forEach(clearTimeout);
//   }, [stats.monthlyClaims]);

//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   if (loading) {
//     return (
//       <div className="p-6 flex items-center justify-center h-64">
//         <span className="w-8 h-8 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 flex items-center justify-center h-64 text-red-500">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="mb-8 fade-up">
//         <h1 className="text-2xl font-black text-[#0f172a]">Analytics</h1>
//         <p className="text-sm text-gray-400 mt-0.5">
//           Performance overview for your organization
//         </p>
//       </div>

//       {/* Progress cards using Settings max values */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <ProgressCard
//           label="Published Items"
//           value={stats.totalPublished}
//           max={maxValues.maxItems}
//           color="#1a56db"
//           icon={Package}
//         />
//         <ProgressCard
//           label="Pending Claims"
//           value={stats.pending}
//           max={maxValues.maxPending}
//           color="#f59e0b"
//           icon={Clock}   // using Clock from lucide (need to import)
//         />
//         <ProgressCard
//           label="Approved Claims"
//           value={stats.approved}
//           max={maxValues.maxApproved}
//           color="#22c55e"
//           icon={CheckCircle}
//         />
//         <ProgressCard
//           label="Completion Rate"
//           value={stats.completionRate}
//           max={100}
//           color="#f59e0b"
//           icon={Trophy}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Monthly claims bar chart */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
//              style={{ animationDelay: '120ms' }}>
//           <div className="flex items-center gap-2 mb-6">
//             <BarChart3 size={18} className="text-[#1a56db]" />
//             <h2 className="text-base font-black text-[#0f172a]">Monthly Claims</h2>
//           </div>
//           <div className="flex items-end gap-2 h-48">
//             {stats.monthlyClaims.map((v, i) => (
//               <div key={i} className="flex-1 flex flex-col items-center gap-1">
//                 <span className="text-[9px] text-gray-400 font-bold">{v}</span>
//                 <div
//                   className="w-full rounded-t-lg transition-all duration-700 ease-out
//                              bg-gradient-to-t from-[#1a56db] to-[#6366f1] opacity-80
//                              hover:opacity-100"
//                   style={{ height: `${barHeights[i]}px` }}
//                 />
//                 <span className="text-[9px] text-gray-400">{months[i]}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Donut + breakdown */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
//              style={{ animationDelay: '180ms' }}>
//           <div className="flex items-center gap-2 mb-6">
//             <TrendingUp size={18} className="text-[#22c55e]" />
//             <h2 className="text-base font-black text-[#0f172a]">Claim Outcomes</h2>
//           </div>
//           {(() => {
//             const segs = [
//               { label: 'Approved',  val: stats.approved, color: '#22c55e' },
//               { label: 'Pending',   val: stats.pending,  color: '#f59e0b' },
//               { label: 'Rejected',  val: stats.rejected, color: '#ef4444' },
//             ];
//             const total = segs.reduce((s, g) => s + g.val, 0) || 1;
//             let cum = 0;
//             const circ = 2 * Math.PI * 56;
//             return (
//               <div className="flex items-center gap-6">
//                 <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
//                   {segs.map((s, i) => {
//                     const pct = s.val / total;
//                     const off = cum * circ;
//                     cum += pct;
//                     return (
//                       <circle key={i} cx="70" cy="70" r="56" fill="none"
//                               stroke={s.color} strokeWidth="20"
//                               strokeDasharray={`${pct * circ} ${circ}`}
//                               strokeDashoffset={-off + circ / 4} />
//                     );
//                   })}
//                   <circle cx="70" cy="70" r="40" fill="white" />
//                   <text x="70" y="66" textAnchor="middle" fontSize="16"
//                         fontWeight="900" fill="#0f172a">{total}</text>
//                   <text x="70" y="82" textAnchor="middle" fontSize="9" fill="#94a3b8">Total</text>
//                 </svg>
//                 <div className="space-y-2.5 flex-1">
//                   {segs.map(s => (
//                     <div key={s.label} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="w-2.5 h-2.5 rounded-full"
//                              style={{ backgroundColor: s.color }} />
//                         <span className="text-xs text-gray-600">{s.label}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-xs font-black text-[#0f172a]">{s.val}</span>
//                         <span className="text-[10px] text-gray-400 w-8 text-right">
//                           {Math.round((s.val / total) * 100)}%
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })()}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import {
  TrendingUp, Package, CheckCircle, Trophy, BarChart3, Clock
} from 'lucide-react';
import { getOrganizationDashboard, getOrganizationClaims } from '../../api/items';

const STORAGE_KEY = 'pata_org_settings';

function loadMaxValues() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { maxItems: 100, maxPending: 50, maxApproved: 50 };
  } catch {
    return { maxItems: 100, maxPending: 50, maxApproved: 50 };
  }
}

function ProgressCard({ label, value, max, color, icon: Icon }) {
  const [w, setW] = useState(0);
  const pct = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 150);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ backgroundColor: `${color}18` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <span className="text-sm font-bold text-gray-600">{label}</span>
        </div>
        <span className="text-2xl font-black text-[#0f172a]">{pct}%</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
             style={{ width: `${w}%`, backgroundColor: color }} />
      </div>
      <p className="text-xs text-gray-400 mt-2">{value} of {max}</p>
    </div>
  );
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);          // always a string or null
  const [stats, setStats] = useState({
    totalPublished: 0,
    monthlyClaims: new Array(12).fill(0),
    approvalRate: 0,
    completionRate: 0,
    totalClaims: 0,
    approved: 0,
    completed: 0,
    rejected: 0,
    pending: 0,
  });

  const [barHeights, setBarHeights] = useState(new Array(12).fill(0));
  const maxValues = loadMaxValues();

  useEffect(() => {
    async function fetchData() {
      try {
        const [dashResp, claimsResp] = await Promise.all([
          getOrganizationDashboard(),
          getOrganizationClaims(),
        ]);

        // ── Safe unwrap of GenericRestResponse ──
        const dash = dashResp?.data || {};          // dashboard stats
        const claims = claimsResp?.data || [];      // claims array

        const totalPublished = dash.totalPublishedItems ?? 0;
        const totalClaims = dash.totalClaims ?? 0;
        const approved = dash.approvedClaims ?? 0;
        const pending = dash.pendingClaims ?? 0;

        const now = new Date();
        const currentYear = now.getFullYear();
        const monthly = new Array(12).fill(0);
        let rejected = 0;

        if (Array.isArray(claims)) {
          claims.forEach((c) => {
            const date = c.claimedDate ? new Date(c.claimedDate) : null;
            if (date && date.getFullYear() === currentYear) {
              monthly[date.getMonth()] += 1;
            }
            if (c.status === 'REJECTED') rejected += 1;
          });
        }

        const approvalRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;
        const completionRate = totalClaims > 0 ? Math.round((approved / totalClaims) * 100) : 0;

        setStats({
          totalPublished,
          totalClaims,
          approved,
          pending,
          rejected,
          completed: approved,
          monthlyClaims: monthly,
          approvalRate,
          completionRate,
        });
      } catch (err) {
        // ── Extract a flat string, NEVER an object ──
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          'Failed to load analytics';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Animate bar heights
  useEffect(() => {
    const maxVal = Math.max(...stats.monthlyClaims, 1);
    const timeouts = [];
    stats.monthlyClaims.forEach((v, i) => {
      const t = setTimeout(() => {
        setBarHeights(prev => {
          const copy = [...prev];
          copy[i] = (v / maxVal) * 160;
          return copy;
        });
      }, 200 + i * 60);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [stats.monthlyClaims]);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <span className="w-8 h-8 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    // error is always a string now
    return (
      <div className="p-6 flex items-center justify-center h-64 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 fade-up">
        <h1 className="text-2xl font-black text-[#0f172a]">Analytics</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Performance overview for your organization
        </p>
      </div>

      {/* Progress cards using Settings max values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ProgressCard
          label="Published Items"
          value={stats.totalPublished}
          max={maxValues.maxItems}
          color="#1a56db"
          icon={Package}
        />
        <ProgressCard
          label="Pending Claims"
          value={stats.pending}
          max={maxValues.maxPending}
          color="#f59e0b"
          icon={Clock}
        />
        <ProgressCard
          label="Approved Claims"
          value={stats.approved}
          max={maxValues.maxApproved}
          color="#22c55e"
          icon={CheckCircle}
        />
        <ProgressCard
          label="Completion Rate"
          value={stats.completionRate}
          max={100}
          color="#f59e0b"
          icon={Trophy}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly claims bar chart */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
             style={{ animationDelay: '120ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={18} className="text-[#1a56db]" />
            <h2 className="text-base font-black text-[#0f172a]">Monthly Claims</h2>
          </div>
          <div className="flex items-end gap-2 h-48">
            {stats.monthlyClaims.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-gray-400 font-bold">{v}</span>
                <div
                  className="w-full rounded-t-lg transition-all duration-700 ease-out
                             bg-gradient-to-t from-[#1a56db] to-[#6366f1] opacity-80
                             hover:opacity-100"
                  style={{ height: `${barHeights[i]}px` }}
                />
                <span className="text-[9px] text-gray-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut + breakdown */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
             style={{ animationDelay: '180ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-[#22c55e]" />
            <h2 className="text-base font-black text-[#0f172a]">Claim Outcomes</h2>
          </div>
          {(() => {
            const segs = [
              { label: 'Approved',  val: stats.approved, color: '#22c55e' },
              { label: 'Pending',   val: stats.pending,  color: '#f59e0b' },
              { label: 'Rejected',  val: stats.rejected, color: '#ef4444' },
            ];
            const total = segs.reduce((s, g) => s + g.val, 0) || 1;
            let cum = 0;
            const circ = 2 * Math.PI * 56;
            return (
              <div className="flex items-center gap-6">
                <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
                  {segs.map((s, i) => {
                    const pct = s.val / total;
                    const off = cum * circ;
                    cum += pct;
                    return (
                      <circle key={i} cx="70" cy="70" r="56" fill="none"
                              stroke={s.color} strokeWidth="20"
                              strokeDasharray={`${pct * circ} ${circ}`}
                              strokeDashoffset={-off + circ / 4} />
                    );
                  })}
                  <circle cx="70" cy="70" r="40" fill="white" />
                  <text x="70" y="66" textAnchor="middle" fontSize="16"
                        fontWeight="900" fill="#0f172a">{total}</text>
                  <text x="70" y="82" textAnchor="middle" fontSize="9" fill="#94a3b8">Total</text>
                </svg>
                <div className="space-y-2.5 flex-1">
                  {segs.map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full"
                             style={{ backgroundColor: s.color }} />
                        <span className="text-xs text-gray-600">{s.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#0f172a]">{s.val}</span>
                        <span className="text-[10px] text-gray-400 w-8 text-right">
                          {Math.round((s.val / total) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}