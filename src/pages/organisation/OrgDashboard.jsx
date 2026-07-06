// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { searchPublicItems } from '../../api/items'; // use as example
// // import Button from '../../components/shared/Button';

// // export default function OrganisationDashboard() {
// //   const [publishedItems, setPublishedItems] = useState([]);

// //   useEffect(() => {
// //     // Fetch all public items (simulate my org's items)
// //     searchPublicItems({ size: 50 }).then(res => setPublishedItems(res.data.content)).catch(console.error);
// //   }, []);

// //   return (
// //     <div className="max-w-7xl mx-auto p-8">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold">Organisation Dashboard</h1>
// //         <Link to="/org/publish"><Button variant="primary">Publish New Item</Button></Link>
// //       </div>
// //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {publishedItems.map(item => (
// //           <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border">
// //             <img src={item.previewImage || 'https://via.placeholder.com/300'} alt="" className="w-full h-40 object-cover rounded-xl mb-2" />
// //             <h3 className="font-semibold">{item.itemName}</h3>
// //             <p className="text-sm text-gray-500">{item.itemName}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   Package, Clock, CheckCircle, Trophy, Bell,
//   PlusCircle, ArrowRight, TrendingUp, AlertCircle,
//   Image, RefreshCw, Activity
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// // ─── REAL API IMPORTS ────────────────────────────────────────
// import {
//   getOrganizationDashboard,
//   getOrganizationItems,
//   getOrganizationClaims,
//   getNotifications,          // ✅ added for real notification count
// } from '../../api/items';

// /* ── Animated number counter ─────────────────────────────────── */
// function Counter({ target, duration = 1200 }) {
//   const [val, setVal]  = useState(0);
//   const frame          = useRef(null);
//   useEffect(() => {
//     const start = performance.now();
//     const run   = (now) => {
//       const t = Math.min((now - start) / duration, 1);
//       setVal(Math.floor(target * (1 - Math.pow(1 - t, 3))));
//       if (t < 1) frame.current = requestAnimationFrame(run);
//       else        setVal(target);
//     };
//     frame.current = requestAnimationFrame(run);
//     return () => cancelAnimationFrame(frame.current);
//   }, [target, duration]);
//   return <>{val.toLocaleString()}</>;
// }

// /* ── Stat card ────────────────────────────────────────────────── */
// function StatCard({ icon: Icon, label, value, delta, color, gradient, delay = 0 }) {
//   return (
//     <div className="card-hover fade-up bg-white rounded-2xl p-5 border border-[#e2e8f0]
//                     relative overflow-hidden"
//          style={{ animationDelay: `${delay}ms` }}>
//       {/* Gradient blob */}
//       <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
//            style={{ background: gradient }} />
//       <div className="flex items-start justify-between mb-4">
//         <div className="w-11 h-11 rounded-xl flex items-center justify-center"
//              style={{ backgroundColor: `${color}18` }}>
//           <Icon size={20} style={{ color }} />
//         </div>
//         {delta && (
//           <span className="flex items-center gap-1 text-[11px] font-bold
//                            text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
//             <TrendingUp size={10} /> {delta}
//           </span>
//         )}
//       </div>
//       <p className="text-3xl font-black text-[#0f172a] mb-1">
//         <Counter target={value} />
//       </p>
//       <p className="text-xs text-gray-500 font-medium">{label}</p>
//     </div>
//   );
// }

// /* ── Recent item row ─────────────────────────────────────────── */
// function ItemRow({ item, delay }) {
//   const [err, setErr] = useState(false);
//   const statusColor = {
//     REPORTED: { bg: '#dbeafe', text: '#1e40af', label: 'Published' },
//     MATCHED:  { bg: '#e0e7ff', text: '#4338ca', label: 'Matched'  },
//     CLAIMED:  { bg: '#fef9c3', text: '#854d0e', label: 'Claimed'   },
//     CLOSED:   { bg: '#dcfce7', text: '#166534', label: 'Closed'    },
//     FOUND:    { bg: '#d1fae5', text: '#065f46', label: 'Found'     },
//   };
//   const sc = statusColor[item.status] || statusColor.REPORTED;
//   return (
//     <div className="fade-up flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50
//                     transition-all cursor-pointer group"
//          style={{ animationDelay: `${delay}ms` }}>
//       <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
//         {item.previewImage && !err ? (
//           <img src={item.previewImage} alt={item.itemName}
//                className="w-full h-full object-cover"
//                onError={() => setErr(true)} />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <Image size={20} className="text-gray-300" />
//           </div>
//         )}
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="text-sm font-semibold text-[#0f172a] truncate">{item.itemName}</p>
//         <p className="text-xs text-gray-400 mt-0.5">{item.category?.replace(/_/g,' ')}</p>
//       </div>
//       <span className="px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0"
//             style={{ backgroundColor: sc.bg, color: sc.text }}>
//         {sc.label}
//       </span>
//       <ArrowRight size={14} className="text-gray-300 group-hover:text-[#1a56db]
//                                        transition-colors shrink-0" />
//     </div>
//   );
// }

// /* ── Claim card ──────────────────────────────────────────────── */
// function ClaimCard({ claim, delay }) {
//   const navigate = useNavigate();
//   return (
//     <div className="fade-up bg-gradient-to-r from-amber-50 to-orange-50
//                     border border-amber-100 rounded-2xl p-4"
//          style={{ animationDelay: `${delay}ms` }}>
//       <div className="flex items-start gap-3">
//         <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center
//                         justify-center shrink-0">
//           <Clock size={16} className="text-amber-600" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-bold text-[#0f172a]">
//             {claim.claimantName || claim.ownerName || 'Unknown Owner'}
//           </p>
//           <p className="text-xs text-gray-500 mt-0.5 truncate">
//             Claiming: <span className="font-semibold">{claim.itemName || 'Item'}</span>
//           </p>
//           <p className="text-[10px] text-gray-400 mt-1">
//             {new Date(claim.claimedDate || claim.createdAt || Date.now()).toLocaleDateString('en-GB', {
//               day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
//             })}
//           </p>
//         </div>
//         <button
//           onClick={() => navigate(`/org/claims/${claim.id}`)}
//           className="px-2.5 py-1 rounded-lg bg-[#1a56db] text-white text-[10px]
//                      font-bold hover:bg-[#1547c0] transition-all active:scale-95"
//         >
//           Review
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ── Main dashboard ───────────────────────────────────────────── */
// export default function OrgDashboard() {
//   const { user }  = useAuth();
//   const navigate  = useNavigate();

//   const [stats, setStats]         = useState(null);
//   const [items, setItems]         = useState([]);
//   const [claims, setClaims]       = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [error, setError]         = useState('');

//   // ─── REAL API FETCH (correct extraction) ──────────────────────
//   const fetch = useCallback(async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const [dashData, itemsPage, claimsList, notifData] = await Promise.all([
//         getOrganizationDashboard(),
//         getOrganizationItems(0, 5),     // first 5 recent items
//         getOrganizationClaims(),
//         getNotifications(),             // ✅ real notification count
//       ]);

//       // The API wraps data inside a "data" field; extract it
//       const dash   = dashData?.data  || dashData;
//       const itemsPayload = itemsPage?.data || itemsPage;
//       const claimsPayload = claimsList?.data || claimsList;
//       const notifPayload  = notifData?.data || notifData;

//       setStats({
//         published:      dash?.totalPublishedItems || 0,
//         pending:        dash?.pendingClaims        || 0,
//         approved:       dash?.approvedClaims       || 0,
//         completed:      dash?.completedClaim       || 0,   // ✅ dedicated field
//         notifications:  notifPayload?.unreadNotifications || 0, // ✅ real value
//         monthlyPublished: [8,14,22,18,32,28],  // static (API doesn't provide monthly history)
//       });

//       setItems(itemsPayload?.content || []);
//       setClaims(Array.isArray(claimsPayload) ? claimsPayload : []);
//     } catch (e) {
//       setError(e.response?.data?.message || e.message || 'Failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetch(); }, [fetch]);

//   const orgName  = user?.organizationName || user?.name || 'Organisation';
//   const greeting = (() => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Good morning';
//     if (h < 17) return 'Good afternoon';
//     return 'Good evening';
//   })();

//   const MONTHLY_LABELS = ['Jan','Feb','Mar','Apr','May','Jun'];
//   const MONTHLY_DATA   = stats?.monthlyPublished || [8,14,22,18,32,28];

//   // Filter only pending claims for the dedicated panel
//   const pendingClaims = claims.filter(c => c.status === 'PENDING');

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">

//       {/* Page header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8
//                       fade-up">
//         <div>
//           <p className="text-sm text-gray-400 font-medium">{greeting} 👋</p>
//           <h1 className="text-2xl font-black text-[#0f172a] mt-0.5">{orgName}</h1>
//           <p className="text-sm text-gray-500 mt-0.5">
//             Here's what's happening with your organization today.
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <button onClick={fetch} disabled={loading}
//                   className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
//                              border-[#e2e8f0] text-sm font-semibold text-gray-600
//                              hover:bg-gray-50 disabled:opacity-50 transition-all">
//             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
//             Refresh
//           </button>
//           <Link to="/org/publish"
//                 className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl
//                            bg-gradient-to-r from-[#1a56db] to-[#1547c0]
//                            text-white text-sm font-bold shadow-sm">
//             <PlusCircle size={15} /> Publish Item
//           </Link>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="flex items-center gap-3 bg-red-50 border border-red-200
//                         text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
//           <AlertCircle size={16} className="shrink-0" />
//           <span className="flex-1">{error}</span>
//           <button onClick={fetch} className="font-bold underline shrink-0">Retry</button>
//         </div>
//       )}

//       {/* Stat cards */}
//       {loading ? (
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <div key={i} className="bg-white rounded-2xl p-5 border border-[#e2e8f0]">
//               <div className="w-11 h-11 rounded-xl shimmer-bg mb-4" />
//               <div className="h-7 w-16 rounded shimmer-bg mb-2" />
//               <div className="h-3 w-24 rounded shimmer-bg" />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           <StatCard icon={Package}     label="Published Items"  value={stats?.published     || 0} delta="+12 today" color="#1a56db" gradient="linear-gradient(135deg,#1a56db,#6366f1)" delay={0}   />
//           <StatCard icon={Clock}       label="Pending Claims"   value={stats?.pending        || 0}                  color="#f59e0b" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" delay={80}  />
//           <StatCard icon={CheckCircle} label="Approved Claims"  value={stats?.approved       || 0}                  color="#1a56db" gradient="linear-gradient(135deg,#1a56db,#22c55e)" delay={160} />
//           <StatCard icon={Trophy}      label="Completed Claims" value={stats?.completed      || 0} delta="+8 week"  color="#22c55e" gradient="linear-gradient(135deg,#22c55e,#06b6d4)" delay={240} />
//           <StatCard icon={Bell}        label="Notifications"    value={stats?.notifications  || 0}                  color="#ef4444" gradient="linear-gradient(135deg,#ef4444,#f59e0b)" delay={320} />
//         </div>
//       )}

//       {/* Charts + activity row */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

//         {/* Monthly activity chart */}
//         <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
//              style={{ animationDelay: '200ms' }}>
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-base font-black text-[#0f172a]">Monthly Activity</h2>
//               <p className="text-xs text-gray-400 mt-0.5">Published items over time</p>
//             </div>
//             <div className="flex items-center gap-1.5 text-xs text-[#1a56db] font-semibold
//                             bg-blue-50 px-3 py-1.5 rounded-full">
//               <Activity size={12} /> Live
//             </div>
//           </div>

//           {/* SVG line chart */}
//           <div className="relative h-48">
//             <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
//               {/* Grid lines */}
//               {[0,1,2,3].map(i => (
//                 <line key={i} x1="0" y1={i*40+8} x2="600" y2={i*40+8}
//                       stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4,4" />
//               ))}
//               {/* Y-axis labels */}
//               {[40,30,20,10,0].map((v, i) => (
//                 <text key={i} x="-8" y={i*40+12} textAnchor="end"
//                       fontSize="10" fill="#94a3b8">{v}</text>
//               ))}
//               {/* Data area gradient */}
//               <defs>
//                 <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%"   stopColor="#1a56db" stopOpacity="0.15" />
//                   <stop offset="100%" stopColor="#1a56db" stopOpacity="0.01" />
//                 </linearGradient>
//               </defs>
//               {(() => {
//                 const pts = MONTHLY_DATA.map((v, i) => {
//                   const x = (i / (MONTHLY_DATA.length - 1)) * 570 + 15;
//                   const y = 152 - (v / 40) * 144;
//                   return { x, y, v };
//                 });
//                 const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
//                 const area = `${d} L ${pts[pts.length-1].x} 160 L ${pts[0].x} 160 Z`;
//                 return (
//                   <>
//                     <path d={area} fill="url(#areaGrad)" />
//                     <path d={d} fill="none" stroke="#1a56db" strokeWidth="2.5"
//                           strokeLinecap="round" strokeLinejoin="round" />
//                     {pts.map((p, i) => (
//                       <g key={i}>
//                         <circle cx={p.x} cy={p.y} r="5" fill="white"
//                                 stroke="#1a56db" strokeWidth="2.5" />
//                         <text x={p.x} y={p.y - 10} textAnchor="middle"
//                               fontSize="10" fill="#1a56db" fontWeight="700">{p.v}</text>
//                         <text x={p.x} y="172" textAnchor="middle"
//                               fontSize="10" fill="#94a3b8">{MONTHLY_LABELS[i]}</text>
//                       </g>
//                     ))}
//                   </>
//                 );
//               })()}
//             </svg>
//           </div>
//         </div>

//         {/* Claim status donut */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
//              style={{ animationDelay: '280ms' }}>
//           <h2 className="text-base font-black text-[#0f172a] mb-1">Claim Status</h2>
//           <p className="text-xs text-gray-400 mb-5">Distribution overview</p>
//           {(() => {
//             const segments = [
//               { label: 'Completed', value: stats?.completed || 0, color: '#22c55e' },
//               { label: 'Approved',  value: stats?.approved  || 0, color: '#1a56db' },
//               { label: 'Pending',   value: stats?.pending   || 0, color: '#f59e0b' },
//               { label: 'Rejected',  value: 0,                       color: '#ef4444' },
//             ];
//             const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
//             let cumulative = 0;
//             const cx = 80, cy = 80, r = 60, inner = 38;
//             const circ = 2 * Math.PI * r;
//             return (
//               <>
//                 <div className="flex justify-center mb-5">
//                   <svg width="160" height="160" viewBox="0 0 160 160">
//                     {segments.map((seg, i) => {
//                       const pct    = seg.value / total;
//                       const offset = cumulative * circ;
//                       const dash   = pct * circ;
//                       cumulative  += pct;
//                       return (
//                         <circle key={i}
//                           cx={cx} cy={cy} r={r}
//                           fill="none" stroke={seg.color} strokeWidth="22"
//                           strokeDasharray={`${dash} ${circ - dash}`}
//                           strokeDashoffset={-offset + circ / 4}
//                           style={{ transition: 'stroke-dasharray 1s ease-out' }}
//                         />
//                       );
//                     })}
//                     <circle cx={cx} cy={cy} r={inner} fill="white" />
//                     <text x={cx} y={cy - 4} textAnchor="middle"
//                           fontSize="16" fontWeight="900" fill="#0f172a">{total}</text>
//                     <text x={cx} y={cy + 14} textAnchor="middle"
//                           fontSize="9" fill="#94a3b8">Total</text>
//                   </svg>
//                 </div>
//                 <div className="space-y-2">
//                   {segments.map((seg) => (
//                     <div key={seg.label} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="w-2.5 h-2.5 rounded-full"
//                              style={{ backgroundColor: seg.color }} />
//                         <span className="text-xs text-gray-600">{seg.label}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-xs font-bold text-[#0f172a]">{seg.value}</span>
//                         <span className="text-[10px] text-gray-400">
//                           {Math.round((seg.value / total) * 100)}%
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             );
//           })()}
//         </div>
//       </div>

//       {/* Recent items + pending claims */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Recent items */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
//              style={{ animationDelay: '320ms' }}>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-base font-black text-[#0f172a]">Recent Items</h2>
//             <Link to="/org/items"
//                   className="text-xs font-bold text-[#1a56db] hover:underline flex items-center gap-1">
//               View all <ArrowRight size={12} />
//             </Link>
//           </div>
//           {items.length === 0 ? (
//             <div className="flex flex-col items-center py-10 text-center">
//               <div className="w-14 h-14 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]
//                               flex items-center justify-center mb-3">
//                 <Package size={24} className="text-gray-300" />
//               </div>
//               <p className="text-sm font-semibold text-gray-600 mb-1">No items yet</p>
//               <p className="text-xs text-gray-400 mb-4">
//                 Start publishing found items to see them here.
//               </p>
//               <Link to="/org/publish"
//                     className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl
//                                bg-[#1a56db] text-white text-xs font-bold">
//                 <PlusCircle size={13} /> Publish first item
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-1">
//               {items.slice(0, 5).map((item, i) => (
//                 <ItemRow key={item.id} item={item} delay={i * 60} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Pending claims */}
//         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
//              style={{ animationDelay: '380ms' }}>
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <h2 className="text-base font-black text-[#0f172a]">Pending Claims</h2>
//               {pendingClaims.length > 0 && (
//                 <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700
//                                  text-[10px] font-black flex items-center justify-center">
//                   {pendingClaims.length}
//                 </span>
//               )}
//             </div>
//             <Link to="/org/claims/pending"
//                   className="text-xs font-bold text-[#1a56db] hover:underline flex items-center gap-1">
//               View all <ArrowRight size={12} />
//             </Link>
//           </div>
//           {pendingClaims.length === 0 ? (
//             <div className="flex flex-col items-center py-10 text-center">
//               <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100
//                               flex items-center justify-center mb-3">
//                 <Clock size={24} className="text-amber-400" />
//               </div>
//               <p className="text-sm font-semibold text-gray-600 mb-1">No pending claims</p>
//               <p className="text-xs text-gray-400">
//                 When owners claim your items, they'll appear here for review.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {pendingClaims.slice(0, 3).map((claim, i) => (
//                 <ClaimCard key={claim.id} claim={claim} delay={i * 80} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }