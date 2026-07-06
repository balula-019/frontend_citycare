// // // // import { useState, useEffect, useCallback } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import {
// // // //   PlusCircle, RefreshCw, Package, Bell, AlertCircle,
// // // //   Image, ArrowRight, LogOut, User, LayoutDashboard
// // // // } from 'lucide-react';
// // // // import { searchPublicItems } from '../../api/items';
// // // // import { useAuth } from '../../context/AuthContext';

// // // // /* ── Skeleton ─────────────────────────────────────────────────── */
// // // // function SkeletonCard() {
// // // //   return (
// // // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
// // // //       <div className="h-32 shimmer-bg" />
// // // //       <div className="p-3 space-y-2">
// // // //         <div className="h-3.5 w-2/3 rounded shimmer-bg" />
// // // //         <div className="h-3 w-1/3 rounded shimmer-bg" />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── Item card ────────────────────────────────────────────────── */
// // // // function ItemCard({ item }) {
// // // //   const [imgErr, setImgErr] = useState(false);
// // // //   return (
// // // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden
// // // //                     transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
// // // //       <div className="h-32 bg-[#f8fafc] flex items-center justify-center overflow-hidden">
// // // //         {item.previewImage && !imgErr ? (
// // // //           <img src={item.previewImage} alt={item.itemName}
// // // //                className="w-full h-full object-cover"
// // // //                onError={() => setImgErr(true)} />
// // // //         ) : (
// // // //           <Image size={28} className="text-gray-300" />
// // // //         )}
// // // //       </div>
// // // //       <div className="p-3">
// // // //         <p className="font-semibold text-[#0f172a] text-xs truncate">{item.itemName}</p>
// // // //         <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{item.id?.slice(0, 10)}…</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── Stat card ────────────────────────────────────────────────── */
// // // // function StatCard({ label, value, icon: Icon, color }) {
// // // //   return (
// // // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex items-center gap-4">
// // // //       <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
// // // //            style={{ backgroundColor: `${color}18` }}>
// // // //         <Icon size={20} style={{ color }} />
// // // //       </div>
// // // //       <div>
// // // //         <p className="text-2xl font-bold text-[#0f172a]">{value}</p>
// // // //         <p className="text-xs text-gray-500 mt-0.5">{label}</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── Main dashboard ───────────────────────────────────────────── */
// // // // export default function OrgDashboard() {
// // // //   const { user, logout } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const [items, setItems]       = useState([]);
// // // //   const [loading, setLoading]   = useState(true);
// // // //   const [error, setError]       = useState('');
// // // //   const [refreshing, setRefreshing] = useState(false);

// // // //   const fetchItems = useCallback(async (isRefresh = false) => {
// // // //     isRefresh ? setRefreshing(true) : setLoading(true);
// // // //     setError('');
// // // //     try {
// // // //       const res = await searchPublicItems({ page: 0, size: 20 });
// // // //       setItems(res?.data?.content || []);
// // // //     } catch (err) {
// // // //       setError(err.message || 'Failed to load items.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //       setRefreshing(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => { fetchItems(false); }, [fetchItems]);

// // // //   const handleLogout = () => { logout(); navigate('/login'); };

// // // //   const orgName = user?.organizationName || user?.name || 'Organisation';

// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
// // // //         .shimmer-bg {
// // // //           background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
// // // //           background-size: 400px 100%;
// // // //           animation: shimmer 1.4s ease-in-out infinite;
// // // //         }
// // // //         @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
// // // //         .fade-up { animation: fadeUp 0.35s ease-out forwards; }
// // // //       `}</style>

// // // //       <div className="max-w-7xl mx-auto px-4 py-8">

// // // //         {/* Top bar */}
// // // //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
// // // //           <div className="flex items-center gap-3">
// // // //             <div className="w-10 h-10 rounded-xl bg-[#dbeafe] flex items-center justify-center">
// // // //               <LayoutDashboard size={18} className="text-[#1a56db]" />
// // // //             </div>
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold text-[#0f172a]">
// // // //                 {orgName}
// // // //               </h1>
// // // //               <p className="text-sm text-gray-500 mt-0.5">Organisation dashboard</p>
// // // //             </div>
// // // //           </div>

// // // //           <div className="flex items-center gap-2 flex-wrap">
// // // //             <Link to="/org/profile"
// // // //                   className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border
// // // //                              border-[#e2e8f0] text-sm font-semibold text-gray-600
// // // //                              hover:bg-gray-50 transition-all">
// // // //               <User size={15} /> Profile
// // // //             </Link>
// // // //             <button
// // // //               onClick={handleLogout}
// // // //               className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border
// // // //                          border-[#e2e8f0] text-sm font-semibold text-[#e11d48]
// // // //                          hover:bg-red-50 transition-all"
// // // //             >
// // // //               <LogOut size={15} /> Logout
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Quick stats */}
// // // //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // //           <StatCard label="Published items" value={items.length} icon={Package} color="#1a56db" />
// // // //           <StatCard label="Pending claims"  value={0}            icon={Bell}    color="#f59e0b" />
// // // //           <StatCard label="Matched reports" value="—"            icon={ArrowRight} color="#10b981" />
// // // //           <StatCard label="Total reports"   value="—"            icon={LayoutDashboard} color="#e11d48" />
// // // //         </div>

// // // //         {/* Published items section */}
// // // //         <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 mb-6">
// // // //           <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
// // // //             <h2 className="text-base font-bold text-[#0f172a]">Published Found Items</h2>
// // // //             <div className="flex items-center gap-2">
// // // //               <button
// // // //                 onClick={() => fetchItems(true)}
// // // //                 disabled={refreshing}
// // // //                 className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border
// // // //                            border-[#e2e8f0] text-xs font-semibold text-gray-600
// // // //                            hover:bg-gray-50 disabled:opacity-50 transition-all"
// // // //               >
// // // //                 <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
// // // //                 Refresh
// // // //               </button>
// // // //               <Link to="/org/publish"
// // // //                     className="flex items-center gap-1.5 px-4 py-2 rounded-xl
// // // //                                bg-[#1a56db] text-white text-xs font-semibold
// // // //                                hover:bg-[#1547c0] transition-all active:scale-95">
// // // //                 <PlusCircle size={13} /> Publish new item
// // // //               </Link>
// // // //             </div>
// // // //           </div>

// // // //           {/* Error */}
// // // //           {error && (
// // // //             <div className="flex items-center gap-3 bg-red-50 border border-red-200
// // // //                             text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // //               <AlertCircle size={15} className="shrink-0" />
// // // //               <span className="flex-1">{error}</span>
// // // //               <button onClick={() => fetchItems(false)}
// // // //                       className="font-semibold underline shrink-0">Retry</button>
// // // //             </div>
// // // //           )}

// // // //           {/* Skeleton */}
// // // //           {loading && (
// // // //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
// // // //               {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
// // // //             </div>
// // // //           )}

// // // //           {/* Grid */}
// // // //           {!loading && items.length > 0 && (
// // // //             <>
// // // //               <p className="text-xs text-gray-400 mb-3">{items.length} items</p>
// // // //               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
// // // //                 {items.map((item, i) => (
// // // //                   <div key={item.id} className="fade-up" style={{ animationDelay: `${i * 20}ms` }}>
// // // //                     <ItemCard item={item} />
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </>
// // // //           )}

// // // //           {/* Empty */}
// // // //           {!loading && !error && items.length === 0 && (
// // // //             <div className="flex flex-col items-center py-12 text-center">
// // // //               <Package size={32} className="text-gray-300 mb-3" />
// // // //               <p className="text-sm font-semibold text-gray-600 mb-1">No items published yet</p>
// // // //               <p className="text-xs text-gray-400 mb-4">Publish a found item to help owners reclaim it.</p>
// // // //               <Link to="/org/publish"
// // // //                     className="flex items-center gap-1.5 px-4 py-2 rounded-xl
// // // //                                bg-[#1a56db] text-white text-xs font-semibold
// // // //                                hover:bg-[#1547c0] transition-all">
// // // //                 <PlusCircle size={13} /> Publish first item
// // // //               </Link>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Pending claims */}
// // // //         <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
// // // //           <h2 className="text-base font-bold text-[#0f172a] mb-4 flex items-center gap-2">
// // // //             <Bell size={16} className="text-[#f59e0b]" /> Pending claims
// // // //           </h2>
// // // //           <div className="flex flex-col items-center py-8 text-center">
// // // //             <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100
// // // //                             flex items-center justify-center mb-3">
// // // //               <Bell size={20} className="text-[#f59e0b]" />
// // // //             </div>
// // // //             <p className="text-sm font-semibold text-gray-600 mb-1">No pending claims</p>
// // // //             <p className="text-xs text-gray-400">
// // // //               When an owner claims a found item you published, it will appear here.
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //       </div>
// // // //     </>
// // // //   );
// // // // }

// // // import { useState, useEffect, useCallback, useRef } from 'react';
// // // import { useNavigate, Link } from 'react-router-dom';
// // // import {
// // //   Package, Clock, CheckCircle, Trophy, Bell,
// // //   PlusCircle, ArrowRight, TrendingUp, AlertCircle,
// // //   Image, RefreshCw, Activity
// // // } from 'lucide-react';
// // // import { useAuth } from '../../context/AuthContext';

// // // /* ── Animated number counter ─────────────────────────────────── */
// // // function Counter({ target, duration = 1200 }) {
// // //   const [val, setVal]  = useState(0);
// // //   const frame          = useRef(null);
// // //   useEffect(() => {
// // //     const start = performance.now();
// // //     const run   = (now) => {
// // //       const t = Math.min((now - start) / duration, 1);
// // //       setVal(Math.floor(target * (1 - Math.pow(1 - t, 3))));
// // //       if (t < 1) frame.current = requestAnimationFrame(run);
// // //       else        setVal(target);
// // //     };
// // //     frame.current = requestAnimationFrame(run);
// // //     return () => cancelAnimationFrame(frame.current);
// // //   }, [target, duration]);
// // //   return <>{val.toLocaleString()}</>;
// // // }

// // // /* ── Stat card ────────────────────────────────────────────────── */
// // // function StatCard({ icon: Icon, label, value, delta, color, gradient, delay = 0 }) {
// // //   return (
// // //     <div className="card-hover fade-up bg-white rounded-2xl p-5 border border-[#e2e8f0]
// // //                     relative overflow-hidden"
// // //          style={{ animationDelay: `${delay}ms` }}>
// // //       {/* Gradient blob */}
// // //       <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
// // //            style={{ background: gradient }} />
// // //       <div className="flex items-start justify-between mb-4">
// // //         <div className="w-11 h-11 rounded-xl flex items-center justify-center"
// // //              style={{ backgroundColor: `${color}18` }}>
// // //           <Icon size={20} style={{ color }} />
// // //         </div>
// // //         {delta && (
// // //           <span className="flex items-center gap-1 text-[11px] font-bold
// // //                            text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
// // //             <TrendingUp size={10} /> {delta}
// // //           </span>
// // //         )}
// // //       </div>
// // //       <p className="text-3xl font-black text-[#0f172a] mb-1">
// // //         <Counter target={value} />
// // //       </p>
// // //       <p className="text-xs text-gray-500 font-medium">{label}</p>
// // //     </div>
// // //   );
// // // }

// // // /* ── Mini line sparkline ─────────────────────────────────────── */
// // // function Sparkline({ data, color }) {
// // //   const max = Math.max(...data);
// // //   const min = Math.min(...data);
// // //   const W = 120, H = 40;
// // //   const pts = data.map((v, i) => {
// // //     const x = (i / (data.length - 1)) * W;
// // //     const y = H - ((v - min) / (max - min || 1)) * (H - 4) - 2;
// // //     return `${x},${y}`;
// // //   }).join(' ');
// // //   return (
// // //     <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
// // //       <polyline fill="none" stroke={color} strokeWidth="2.5"
// // //                 strokeLinecap="round" strokeLinejoin="round" points={pts} />
// // //       <circle cx={pts.split(' ').pop().split(',')[0]}
// // //               cy={pts.split(' ').pop().split(',')[1]}
// // //               r="3.5" fill={color} />
// // //     </svg>
// // //   );
// // // }

// // // /* ── Recent item row ─────────────────────────────────────────── */
// // // function ItemRow({ item, delay }) {
// // //   const [err, setErr] = useState(false);
// // //   const statusColor = {
// // //     PUBLISHED: { bg: '#dbeafe', text: '#1e40af', label: 'Published' },
// // //     CLAIMED:   { bg: '#fef9c3', text: '#854d0e', label: 'Claimed'   },
// // //     COMPLETED: { bg: '#dcfce7', text: '#166534', label: 'Completed' },
// // //   };
// // //   const sc = statusColor[item.status] || statusColor.PUBLISHED;
// // //   return (
// // //     <div className="fade-up flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50
// // //                     transition-all cursor-pointer group"
// // //          style={{ animationDelay: `${delay}ms` }}>
// // //       <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
// // //         {item.previewImage && !err ? (
// // //           <img src={item.previewImage} alt={item.itemName}
// // //                className="w-full h-full object-cover"
// // //                onError={() => setErr(true)} />
// // //         ) : (
// // //           <div className="w-full h-full flex items-center justify-center">
// // //             <Image size={20} className="text-gray-300" />
// // //           </div>
// // //         )}
// // //       </div>
// // //       <div className="flex-1 min-w-0">
// // //         <p className="text-sm font-semibold text-[#0f172a] truncate">{item.itemName}</p>
// // //         <p className="text-xs text-gray-400 mt-0.5">{item.category?.replace(/_/g,' ')}</p>
// // //       </div>
// // //       <span className="px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0"
// // //             style={{ backgroundColor: sc.bg, color: sc.text }}>
// // //         {sc.label}
// // //       </span>
// // //       <ArrowRight size={14} className="text-gray-300 group-hover:text-[#1a56db]
// // //                                        transition-colors shrink-0" />
// // //     </div>
// // //   );
// // // }

// // // /* ── Claim card ──────────────────────────────────────────────── */
// // // function ClaimCard({ claim, delay }) {
// // //   return (
// // //     <div className="fade-up bg-gradient-to-r from-amber-50 to-orange-50
// // //                     border border-amber-100 rounded-2xl p-4"
// // //          style={{ animationDelay: `${delay}ms` }}>
// // //       <div className="flex items-start gap-3">
// // //         <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center
// // //                         justify-center shrink-0">
// // //           <Clock size={16} className="text-amber-600" />
// // //         </div>
// // //         <div className="flex-1 min-w-0">
// // //           <p className="text-sm font-bold text-[#0f172a]">
// // //             {claim.ownerName || 'Unknown Owner'}
// // //           </p>
// // //           <p className="text-xs text-gray-500 mt-0.5 truncate">
// // //             Claiming: <span className="font-semibold">{claim.itemName || 'Item'}</span>
// // //           </p>
// // //           <p className="text-[10px] text-gray-400 mt-1">
// // //             {new Date(claim.createdAt || Date.now()).toLocaleDateString('en-GB', {
// // //               day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
// // //             })}
// // //           </p>
// // //         </div>
// // //         <div className="flex gap-1.5 shrink-0">
// // //           <button className="px-2.5 py-1 rounded-lg bg-[#1a56db] text-white text-[10px]
// // //                              font-bold hover:bg-[#1547c0] transition-all active:scale-95">
// // //             Review
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ── Chart bars ──────────────────────────────────────────────── */
// // // function MiniBar({ labels, data, color }) {
// // //   const max = Math.max(...data, 1);
// // //   return (
// // //     <div className="flex items-end gap-2 h-24">
// // //       {data.map((v, i) => (
// // //         <div key={i} className="flex-1 flex flex-col items-center gap-1">
// // //           <div className="w-full rounded-t-lg transition-all duration-700 ease-out"
// // //                style={{
// // //                  height: `${Math.max((v / max) * 80, 4)}px`,
// // //                  backgroundColor: color,
// // //                  opacity: 0.7 + (i / data.length) * 0.3,
// // //                }} />
// // //           <span className="text-[9px] text-gray-400">{labels[i]}</span>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // /* ── Main dashboard ───────────────────────────────────────────── */
// // // export default function OrgDashboard() {
// // //   const { user }  = useAuth();
// // //   const navigate  = useNavigate();

// // //   // In production these come from GET /organization/dashboard
// // //   // For now we initialize with 0 and let real API fill them
// // //   const [stats, setStats]         = useState(null);
// // //   const [items, setItems]         = useState([]);
// // //   const [claims, setClaims]       = useState([]);
// // //   const [loading, setLoading]     = useState(true);
// // //   const [error, setError]         = useState('');

// // //   const MONTHLY_LABELS = ['Jan','Feb','Mar','Apr','May','Jun'];
// // //   const MONTHLY_DATA   = stats?.monthlyPublished || [8,14,22,18,32,28];

// // //   const fetch = useCallback(async () => {
// // //     setLoading(true); setError('');
// // //     try {
// // //       // Replace with real API calls once endpoints are ready:
// // //       // const dash  = await getDashboard();   → GET /organization/dashboard
// // //       // const items = await getOrgItems();    → GET /organization/items?size=5
// // //       // const clms  = await getClaims();      → GET /organization/claims?status=PENDING&size=3
// // //       await new Promise(r => setTimeout(r, 800)); // remove when real API is used
// // //       setStats({ published: 245, pending: 16, approved: 39, completed: 201, notifications: 5 });
// // //       setItems([]);   // will be populated from API
// // //       setClaims([]);  // will be populated from API
// // //     } catch (e) {
// // //       setError(e.message || 'Failed to load dashboard');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => { fetch(); }, [fetch]);

// // //   const orgName  = user?.organizationName || user?.name || 'Organisation';
// // //   const greeting = (() => {
// // //     const h = new Date().getHours();
// // //     if (h < 12) return 'Good morning';
// // //     if (h < 17) return 'Good afternoon';
// // //     return 'Good evening';
// // //   })();

// // //   return (
// // //     <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">

// // //       {/* Page header */}
// // //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8
// // //                       fade-up">
// // //         <div>
// // //           <p className="text-sm text-gray-400 font-medium">{greeting} 👋</p>
// // //           <h1 className="text-2xl font-black text-[#0f172a] mt-0.5">{orgName}</h1>
// // //           <p className="text-sm text-gray-500 mt-0.5">
// // //             Here's what's happening with your organization today.
// // //           </p>
// // //         </div>
// // //         <div className="flex gap-2">
// // //           <button onClick={fetch} disabled={loading}
// // //                   className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
// // //                              border-[#e2e8f0] text-sm font-semibold text-gray-600
// // //                              hover:bg-gray-50 disabled:opacity-50 transition-all">
// // //             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// // //             Refresh
// // //           </button>
// // //           <Link to="/org/publish"
// // //                 className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl
// // //                            bg-gradient-to-r from-[#1a56db] to-[#1547c0]
// // //                            text-white text-sm font-bold shadow-sm">
// // //             <PlusCircle size={15} /> Publish Item
// // //           </Link>
// // //         </div>
// // //       </div>

// // //       {/* Error */}
// // //       {error && (
// // //         <div className="flex items-center gap-3 bg-red-50 border border-red-200
// // //                         text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
// // //           <AlertCircle size={16} className="shrink-0" />
// // //           <span className="flex-1">{error}</span>
// // //           <button onClick={fetch} className="font-bold underline shrink-0">Retry</button>
// // //         </div>
// // //       )}

// // //       {/* Stat cards */}
// // //       {loading ? (
// // //         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// // //           {Array.from({ length: 5 }).map((_, i) => (
// // //             <div key={i} className="bg-white rounded-2xl p-5 border border-[#e2e8f0]">
// // //               <div className="w-11 h-11 rounded-xl shimmer-bg mb-4" />
// // //               <div className="h-7 w-16 rounded shimmer-bg mb-2" />
// // //               <div className="h-3 w-24 rounded shimmer-bg" />
// // //             </div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// // //           <StatCard icon={Package}     label="Published Items"  value={stats?.published     || 0} delta="+12 today" color="#1a56db" gradient="linear-gradient(135deg,#1a56db,#6366f1)" delay={0}   />
// // //           <StatCard icon={Clock}       label="Pending Claims"   value={stats?.pending        || 0}                  color="#f59e0b" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" delay={80}  />
// // //           <StatCard icon={CheckCircle} label="Approved Claims"  value={stats?.approved       || 0}                  color="#1a56db" gradient="linear-gradient(135deg,#1a56db,#22c55e)" delay={160} />
// // //           <StatCard icon={Trophy}      label="Completed Claims" value={stats?.completed      || 0} delta="+8 week"  color="#22c55e" gradient="linear-gradient(135deg,#22c55e,#06b6d4)" delay={240} />
// // //           <StatCard icon={Bell}        label="Notifications"    value={stats?.notifications  || 0}                  color="#ef4444" gradient="linear-gradient(135deg,#ef4444,#f59e0b)" delay={320} />
// // //         </div>
// // //       )}

// // //       {/* Charts + activity row */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

// // //         {/* Monthly activity chart */}
// // //         <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// // //              style={{ animationDelay: '200ms' }}>
// // //           <div className="flex items-center justify-between mb-6">
// // //             <div>
// // //               <h2 className="text-base font-black text-[#0f172a]">Monthly Activity</h2>
// // //               <p className="text-xs text-gray-400 mt-0.5">Published items over time</p>
// // //             </div>
// // //             <div className="flex items-center gap-1.5 text-xs text-[#1a56db] font-semibold
// // //                             bg-blue-50 px-3 py-1.5 rounded-full">
// // //               <Activity size={12} /> Live
// // //             </div>
// // //           </div>

// // //           {/* SVG line chart */}
// // //           <div className="relative h-48">
// // //             <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
// // //               {/* Grid lines */}
// // //               {[0,1,2,3].map(i => (
// // //                 <line key={i} x1="0" y1={i*40+8} x2="600" y2={i*40+8}
// // //                       stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4,4" />
// // //               ))}
// // //               {/* Y-axis labels */}
// // //               {[40,30,20,10,0].map((v, i) => (
// // //                 <text key={i} x="-8" y={i*40+12} textAnchor="end"
// // //                       fontSize="10" fill="#94a3b8">{v}</text>
// // //               ))}
// // //               {/* Data area gradient */}
// // //               <defs>
// // //                 <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
// // //                   <stop offset="0%"   stopColor="#1a56db" stopOpacity="0.15" />
// // //                   <stop offset="100%" stopColor="#1a56db" stopOpacity="0.01" />
// // //                 </linearGradient>
// // //               </defs>
// // //               {(() => {
// // //                 const pts = MONTHLY_DATA.map((v, i) => {
// // //                   const x = (i / (MONTHLY_DATA.length - 1)) * 570 + 15;
// // //                   const y = 152 - (v / 40) * 144;
// // //                   return { x, y, v };
// // //                 });
// // //                 const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
// // //                 const area = `${d} L ${pts[pts.length-1].x} 160 L ${pts[0].x} 160 Z`;
// // //                 return (
// // //                   <>
// // //                     <path d={area} fill="url(#areaGrad)" />
// // //                     <path d={d} fill="none" stroke="#1a56db" strokeWidth="2.5"
// // //                           strokeLinecap="round" strokeLinejoin="round" />
// // //                     {pts.map((p, i) => (
// // //                       <g key={i}>
// // //                         <circle cx={p.x} cy={p.y} r="5" fill="white"
// // //                                 stroke="#1a56db" strokeWidth="2.5" />
// // //                         <text x={p.x} y={p.y - 10} textAnchor="middle"
// // //                               fontSize="10" fill="#1a56db" fontWeight="700">{p.v}</text>
// // //                         <text x={p.x} y="172" textAnchor="middle"
// // //                               fontSize="10" fill="#94a3b8">{MONTHLY_LABELS[i]}</text>
// // //                       </g>
// // //                     ))}
// // //                   </>
// // //                 );
// // //               })()}
// // //             </svg>
// // //           </div>
// // //         </div>

// // //         {/* Claim status donut */}
// // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// // //              style={{ animationDelay: '280ms' }}>
// // //           <h2 className="text-base font-black text-[#0f172a] mb-1">Claim Status</h2>
// // //           <p className="text-xs text-gray-400 mb-5">Distribution overview</p>
// // //           {(() => {
// // //             const segments = [
// // //               { label: 'Completed', value: stats?.completed || 201, color: '#22c55e' },
// // //               { label: 'Approved',  value: stats?.approved  ||  39, color: '#1a56db' },
// // //               { label: 'Pending',   value: stats?.pending   ||  16, color: '#f59e0b' },
// // //               { label: 'Rejected',  value: 8,                       color: '#ef4444' },
// // //             ];
// // //             const total = segments.reduce((s, seg) => s + seg.value, 0);
// // //             let cumulative = 0;
// // //             const cx = 80, cy = 80, r = 60, inner = 38;
// // //             const circ = 2 * Math.PI * r;
// // //             return (
// // //               <>
// // //                 <div className="flex justify-center mb-5">
// // //                   <svg width="160" height="160" viewBox="0 0 160 160">
// // //                     {segments.map((seg, i) => {
// // //                       const pct    = seg.value / total;
// // //                       const offset = cumulative * circ;
// // //                       const dash   = pct * circ;
// // //                       cumulative  += pct;
// // //                       return (
// // //                         <circle key={i}
// // //                           cx={cx} cy={cy} r={r}
// // //                           fill="none" stroke={seg.color} strokeWidth="22"
// // //                           strokeDasharray={`${dash} ${circ - dash}`}
// // //                           strokeDashoffset={-offset + circ / 4}
// // //                           style={{ transition: 'stroke-dasharray 1s ease-out' }}
// // //                         />
// // //                       );
// // //                     })}
// // //                     <circle cx={cx} cy={cy} r={inner} fill="white" />
// // //                     <text x={cx} y={cy - 4} textAnchor="middle"
// // //                           fontSize="16" fontWeight="900" fill="#0f172a">{total}</text>
// // //                     <text x={cx} y={cy + 14} textAnchor="middle"
// // //                           fontSize="9" fill="#94a3b8">Total</text>
// // //                   </svg>
// // //                 </div>
// // //                 <div className="space-y-2">
// // //                   {segments.map((seg) => (
// // //                     <div key={seg.label} className="flex items-center justify-between">
// // //                       <div className="flex items-center gap-2">
// // //                         <div className="w-2.5 h-2.5 rounded-full"
// // //                              style={{ backgroundColor: seg.color }} />
// // //                         <span className="text-xs text-gray-600">{seg.label}</span>
// // //                       </div>
// // //                       <div className="flex items-center gap-2">
// // //                         <span className="text-xs font-bold text-[#0f172a]">{seg.value}</span>
// // //                         <span className="text-[10px] text-gray-400">
// // //                           {Math.round((seg.value / total) * 100)}%
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </>
// // //             );
// // //           })()}
// // //         </div>
// // //       </div>

// // //       {/* Recent items + pending claims */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// // //         {/* Recent items */}
// // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
// // //              style={{ animationDelay: '320ms' }}>
// // //           <div className="flex items-center justify-between mb-4">
// // //             <h2 className="text-base font-black text-[#0f172a]">Recent Items</h2>
// // //             <Link to="/org/items"
// // //                   className="text-xs font-bold text-[#1a56db] hover:underline flex items-center gap-1">
// // //               View all <ArrowRight size={12} />
// // //             </Link>
// // //           </div>
// // //           {items.length === 0 ? (
// // //             <div className="flex flex-col items-center py-10 text-center">
// // //               <div className="w-14 h-14 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]
// // //                               flex items-center justify-center mb-3">
// // //                 <Package size={24} className="text-gray-300" />
// // //               </div>
// // //               <p className="text-sm font-semibold text-gray-600 mb-1">No items yet</p>
// // //               <p className="text-xs text-gray-400 mb-4">
// // //                 Start publishing found items to see them here.
// // //               </p>
// // //               <Link to="/org/publish"
// // //                     className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl
// // //                                bg-[#1a56db] text-white text-xs font-bold">
// // //                 <PlusCircle size={13} /> Publish first item
// // //               </Link>
// // //             </div>
// // //           ) : (
// // //             <div className="space-y-1">
// // //               {items.slice(0, 5).map((item, i) => (
// // //                 <ItemRow key={item.id} item={item} delay={i * 60} />
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Pending claims */}
// // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
// // //              style={{ animationDelay: '380ms' }}>
// // //           <div className="flex items-center justify-between mb-4">
// // //             <div className="flex items-center gap-2">
// // //               <h2 className="text-base font-black text-[#0f172a]">Pending Claims</h2>
// // //               {claims.length > 0 && (
// // //                 <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700
// // //                                  text-[10px] font-black flex items-center justify-center">
// // //                   {claims.length}
// // //                 </span>
// // //               )}
// // //             </div>
// // //             <Link to="/org/claims/pending"
// // //                   className="text-xs font-bold text-[#1a56db] hover:underline flex items-center gap-1">
// // //               View all <ArrowRight size={12} />
// // //             </Link>
// // //           </div>
// // //           {claims.length === 0 ? (
// // //             <div className="flex flex-col items-center py-10 text-center">
// // //               <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100
// // //                               flex items-center justify-center mb-3">
// // //                 <Clock size={24} className="text-amber-400" />
// // //               </div>
// // //               <p className="text-sm font-semibold text-gray-600 mb-1">No pending claims</p>
// // //               <p className="text-xs text-gray-400">
// // //                 When owners claim your items, they'll appear here for review.
// // //               </p>
// // //             </div>
// // //           ) : (
// // //             <div className="space-y-3">
// // //               {claims.slice(0, 3).map((claim, i) => (
// // //                 <ClaimCard key={claim.id} claim={claim} delay={i * 80} />
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect, useCallback, useRef } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import {
// //   Package, Clock, CheckCircle, Trophy, Bell,
// //   PlusCircle, ArrowRight, TrendingUp, AlertCircle,
// //   Image, RefreshCw, Activity
// // } from 'lucide-react';
// // import { useAuth } from '../../context/AuthContext';
// // // ─── REAL API IMPORTS ────────────────────────────────────────
// // import {
// //   getOrganizationDashboard,
// //   getOrganizationItems,
// //   getOrganizationClaims,
// // } from '../../api/items';

// // /* ── Animated number counter ─────────────────────────────────── */
// // function Counter({ target, duration = 1200 }) {
// //   const [val, setVal]  = useState(0);
// //   const frame          = useRef(null);
// //   useEffect(() => {
// //     const start = performance.now();
// //     const run   = (now) => {
// //       const t = Math.min((now - start) / duration, 1);
// //       setVal(Math.floor(target * (1 - Math.pow(1 - t, 3))));
// //       if (t < 1) frame.current = requestAnimationFrame(run);
// //       else        setVal(target);
// //     };
// //     frame.current = requestAnimationFrame(run);
// //     return () => cancelAnimationFrame(frame.current);
// //   }, [target, duration]);
// //   return <>{val.toLocaleString()}</>;
// // }

// // /* ── Stat card ────────────────────────────────────────────────── */
// // function StatCard({ icon: Icon, label, value, delta, color, gradient, delay = 0 }) {
// //   return (
// //     <div className="card-hover fade-up bg-white rounded-2xl p-5 border border-[#e2e8f0]
// //                     relative overflow-hidden"
// //          style={{ animationDelay: `${delay}ms` }}>
// //       <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
// //            style={{ background: gradient }} />
// //       <div className="flex items-start justify-between mb-4">
// //         <div className="w-11 h-11 rounded-xl flex items-center justify-center"
// //              style={{ backgroundColor: `${color}18` }}>
// //           <Icon size={20} style={{ color }} />
// //         </div>
// //         {delta && (
// //           <span className="flex items-center gap-1 text-[11px] font-bold
// //                            text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
// //             <TrendingUp size={10} /> {delta}
// //           </span>
// //         )}
// //       </div>
// //       <p className="text-3xl font-black text-[#0f172a] mb-1">
// //         <Counter target={value} />
// //       </p>
// //       <p className="text-xs text-gray-500 font-medium">{label}</p>
// //     </div>
// //   );
// // }

// // /* ── Recent item row ─────────────────────────────────────────── */
// // function ItemRow({ item, delay }) {
// //   const [err, setErr] = useState(false);
// //   const statusColor = {
// //     REPORTED: { bg: '#dbeafe', text: '#1e40af', label: 'Published' },
// //     MATCHED:  { bg: '#e0e7ff', text: '#4338ca', label: 'Matched'  },
// //     CLAIMED:  { bg: '#fef9c3', text: '#854d0e', label: 'Claimed'   },
// //     CLOSED:   { bg: '#dcfce7', text: '#166534', label: 'Closed'    },
// //     FOUND:    { bg: '#d1fae5', text: '#065f46', label: 'Found'     },
// //   };
// //   const sc = statusColor[item.status] || statusColor.REPORTED;
// //   return (
// //     <div className="fade-up flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50
// //                     transition-all cursor-pointer group"
// //          style={{ animationDelay: `${delay}ms` }}>
// //       <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
// //         {item.previewImage && !err ? (
// //           <img src={item.previewImage} alt={item.itemName}
// //                className="w-full h-full object-cover"
// //                onError={() => setErr(true)} />
// //         ) : (
// //           <div className="w-full h-full flex items-center justify-center">
// //             <Image size={20} className="text-gray-300" />
// //           </div>
// //         )}
// //       </div>
// //       <div className="flex-1 min-w-0">
// //         <p className="text-sm font-semibold text-[#0f172a] truncate">{item.itemName}</p>
// //         <p className="text-xs text-gray-400 mt-0.5">{item.category?.replace(/_/g,' ')}</p>
// //       </div>
// //       <span className="px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0"
// //             style={{ backgroundColor: sc.bg, color: sc.text }}>
// //         {sc.label}
// //       </span>
// //       <ArrowRight size={14} className="text-gray-300 group-hover:text-[#1a56db]
// //                                        transition-colors shrink-0" />
// //     </div>
// //   );
// // }

// // /* ── Claim card ──────────────────────────────────────────────── */
// // function ClaimCard({ claim, delay }) {
// //   const navigate = useNavigate();
// //   return (
// //     <div className="fade-up bg-gradient-to-r from-amber-50 to-orange-50
// //                     border border-amber-100 rounded-2xl p-4"
// //          style={{ animationDelay: `${delay}ms` }}>
// //       <div className="flex items-start gap-3">
// //         <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center
// //                         justify-center shrink-0">
// //           <Clock size={16} className="text-amber-600" />
// //         </div>
// //         <div className="flex-1 min-w-0">
// //           <p className="text-sm font-bold text-[#0f172a]">
// //             {claim.claimantName || claim.ownerName || 'Unknown Owner'}
// //           </p>
// //           <p className="text-xs text-gray-500 mt-0.5 truncate">
// //             Claiming: <span className="font-semibold">{claim.itemName || 'Item'}</span>
// //           </p>
// //           <p className="text-[10px] text-gray-400 mt-1">
// //             {new Date(claim.claimedDate || claim.createdAt || Date.now()).toLocaleDateString('en-GB', {
// //               day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
// //             })}
// //           </p>
// //         </div>
// //         <button
// //           onClick={() => navigate(`/org/claims/${claim.id}`)}
// //           className="px-2.5 py-1 rounded-lg bg-[#1a56db] text-white text-[10px]
// //                      font-bold hover:bg-[#1547c0] transition-all active:scale-95"
// //         >
// //           Review
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ── Main dashboard ───────────────────────────────────────────── */
// // export default function OrgDashboard() {
// //   const { user }  = useAuth();
// //   const navigate  = useNavigate();

// //   const [stats, setStats]         = useState(null);
// //   const [items, setItems]         = useState([]);
// //   const [claims, setClaims]       = useState([]);
// //   const [loading, setLoading]     = useState(true);
// //   const [error, setError]         = useState('');

// //   // ─── REAL API FETCH (replaces the mock setTimeout) ──────────
// //   const fetch = useCallback(async () => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const [dashData, itemsPage, claimsList] = await Promise.all([
// //         getOrganizationDashboard(),
// //         getOrganizationItems(0, 5),     // first 5 recent items
// //         getOrganizationClaims(),
// //       ]);

// //       // apiClient may or may not unwrap the `data` field
// //       const dash   = dashData?.data  || dashData;
// //       const itemsPayload = itemsPage?.data || itemsPage;
// //       const claimsPayload = claimsList?.data || claimsList;

// //       setStats({
// //         published:      dash?.totalPublishedItems || 0,
// //         pending:        dash?.pendingClaims        || 0,
// //         approved:       dash?.approvedClaims       || 0,
// //         completed:      (dash?.totalClaims || 0) - (dash?.pendingClaims || 0),
// //         notifications:  0,   // not available in current API
// //         monthlyPublished: [8,14,22,18,32,28],  // static; API doesn't supply monthly data
// //       });

// //       setItems(itemsPayload?.content || []);
// //       setClaims(Array.isArray(claimsPayload) ? claimsPayload : []);
// //     } catch (e) {
// //       setError(e.response?.data?.message || e.message || 'Failed to load dashboard');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => { fetch(); }, [fetch]);

// //   const orgName  = user?.organizationName || user?.name || 'Organisation';
// //   const greeting = (() => {
// //     const h = new Date().getHours();
// //     if (h < 12) return 'Good morning';
// //     if (h < 17) return 'Good afternoon';
// //     return 'Good evening';
// //   })();

// //   const MONTHLY_LABELS = ['Jan','Feb','Mar','Apr','May','Jun'];
// //   const MONTHLY_DATA   = stats?.monthlyPublished || [8,14,22,18,32,28];

// //   // Filter for pending claims
// //   const pendingClaims = claims.filter(c => c.status === 'PENDING');

// //   return (
// //     <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">

// //       {/* Page header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8
// //                       fade-up">
// //         <div>
// //           <p className="text-sm text-gray-400 font-medium">{greeting} 👋</p>
// //           <h1 className="text-2xl font-black text-[#0f172a] mt-0.5">{orgName}</h1>
// //           <p className="text-sm text-gray-500 mt-0.5">
// //             Here's what's happening with your organization today.
// //           </p>
// //         </div>
// //         <div className="flex gap-2">
// //           <button onClick={fetch} disabled={loading}
// //                   className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
// //                              border-[#e2e8f0] text-sm font-semibold text-gray-600
// //                              hover:bg-gray-50 disabled:opacity-50 transition-all">
// //             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// //             Refresh
// //           </button>
// //           <Link to="/org/publish"
// //                 className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl
// //                            bg-gradient-to-r from-[#1a56db] to-[#1547c0]
// //                            text-white text-sm font-bold shadow-sm">
// //             <PlusCircle size={15} /> Publish Item
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Error */}
// //       {error && (
// //         <div className="flex items-center gap-3 bg-red-50 border border-red-200
// //                         text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
// //           <AlertCircle size={16} className="shrink-0" />
// //           <span className="flex-1">{error}</span>
// //           <button onClick={fetch} className="font-bold underline shrink-0">Retry</button>
// //         </div>
// //       )}

// //       {/* Stat cards */}
// //       {loading ? (
// //         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// //           {Array.from({ length: 5 }).map((_, i) => (
// //             <div key={i} className="bg-white rounded-2xl p-5 border border-[#e2e8f0]">
// //               <div className="w-11 h-11 rounded-xl shimmer-bg mb-4" />
// //               <div className="h-7 w-16 rounded shimmer-bg mb-2" />
// //               <div className="h-3 w-24 rounded shimmer-bg" />
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// //           <StatCard icon={Package}     label="Published Items"  value={stats?.published     || 0} delta="+12 today" color="#1a56db" gradient="linear-gradient(135deg,#1a56db,#6366f1)" delay={0}   />
// //           <StatCard icon={Clock}       label="Pending Claims"   value={stats?.pending        || 0}                  color="#f59e0b" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" delay={80}  />
// //           <StatCard icon={CheckCircle} label="Approved Claims"  value={stats?.approved       || 0}                  color="#1a56db" gradient="linear-gradient(135deg,#1a56db,#22c55e)" delay={160} />
// //           <StatCard icon={Trophy}      label="Completed Claims" value={stats?.completed      || 0} delta="+8 week"  color="#22c55e" gradient="linear-gradient(135deg,#22c55e,#06b6d4)" delay={240} />
// //           <StatCard icon={Bell}        label="Notifications"    value={stats?.notifications  || 0}                  color="#ef4444" gradient="linear-gradient(135deg,#ef4444,#f59e0b)" delay={320} />
// //         </div>
// //       )}

// //       {/* Charts + activity row */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

// //         {/* Monthly activity chart */}
// //         <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// //              style={{ animationDelay: '200ms' }}>
// //           <div className="flex items-center justify-between mb-6">
// //             <div>
// //               <h2 className="text-base font-black text-[#0f172a]">Monthly Activity</h2>
// //               <p className="text-xs text-gray-400 mt-0.5">Published items over time</p>
// //             </div>
// //             <div className="flex items-center gap-1.5 text-xs text-[#1a56db] font-semibold
// //                             bg-blue-50 px-3 py-1.5 rounded-full">
// //               <Activity size={12} /> Live
// //             </div>
// //           </div>

// //           {/* SVG line chart */}
// //           <div className="relative h-48">
// //             <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
// //               {/* Grid lines */}
// //               {[0,1,2,3].map(i => (
// //                 <line key={i} x1="0" y1={i*40+8} x2="600" y2={i*40+8}
// //                       stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4,4" />
// //               ))}
// //               {/* Y-axis labels */}
// //               {[40,30,20,10,0].map((v, i) => (
// //                 <text key={i} x="-8" y={i*40+12} textAnchor="end"
// //                       fontSize="10" fill="#94a3b8">{v}</text>
// //               ))}
// //               {/* Data area gradient */}
// //               <defs>
// //                 <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
// //                   <stop offset="0%"   stopColor="#1a56db" stopOpacity="0.15" />
// //                   <stop offset="100%" stopColor="#1a56db" stopOpacity="0.01" />
// //                 </linearGradient>
// //               </defs>
// //               {(() => {
// //                 const pts = MONTHLY_DATA.map((v, i) => {
// //                   const x = (i / (MONTHLY_DATA.length - 1)) * 570 + 15;
// //                   const y = 152 - (v / 40) * 144;
// //                   return { x, y, v };
// //                 });
// //                 const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
// //                 const area = `${d} L ${pts[pts.length-1].x} 160 L ${pts[0].x} 160 Z`;
// //                 return (
// //                   <>
// //                     <path d={area} fill="url(#areaGrad)" />
// //                     <path d={d} fill="none" stroke="#1a56db" strokeWidth="2.5"
// //                           strokeLinecap="round" strokeLinejoin="round" />
// //                     {pts.map((p, i) => (
// //                       <g key={i}>
// //                         <circle cx={p.x} cy={p.y} r="5" fill="white"
// //                                 stroke="#1a56db" strokeWidth="2.5" />
// //                         <text x={p.x} y={p.y - 10} textAnchor="middle"
// //                               fontSize="10" fill="#1a56db" fontWeight="700">{p.v}</text>
// //                         <text x={p.x} y="172" textAnchor="middle"
// //                               fontSize="10" fill="#94a3b8">{MONTHLY_LABELS[i]}</text>
// //                       </g>
// //                     ))}
// //                   </>
// //                 );
// //               })()}
// //             </svg>
// //           </div>
// //         </div>

// //         {/* Claim status donut */}
// //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
// //              style={{ animationDelay: '280ms' }}>
// //           <h2 className="text-base font-black text-[#0f172a] mb-1">Claim Status</h2>
// //           <p className="text-xs text-gray-400 mb-5">Distribution overview</p>
// //           {(() => {
// //             const segments = [
// //               { label: 'Completed', value: stats?.completed || 0, color: '#22c55e' },
// //               { label: 'Approved',  value: stats?.approved  || 0, color: '#1a56db' },
// //               { label: 'Pending',   value: stats?.pending   || 0, color: '#f59e0b' },
// //               { label: 'Rejected',  value: 0,                       color: '#ef4444' },
// //             ];
// //             const total = segments.reduce((s, seg) => s + seg.value, 0) || 1; // avoid division by zero
// //             let cumulative = 0;
// //             const cx = 80, cy = 80, r = 60, inner = 38;
// //             const circ = 2 * Math.PI * r;
// //             return (
// //               <>
// //                 <div className="flex justify-center mb-5">
// //                   <svg width="160" height="160" viewBox="0 0 160 160">
// //                     {segments.map((seg, i) => {
// //                       const pct    = seg.value / total;
// //                       const offset = cumulative * circ;
// //                       const dash   = pct * circ;
// //                       cumulative  += pct;
// //                       return (
// //                         <circle key={i}
// //                           cx={cx} cy={cy} r={r}
// //                           fill="none" stroke={seg.color} strokeWidth="22"
// //                           strokeDasharray={`${dash} ${circ - dash}`}
// //                           strokeDashoffset={-offset + circ / 4}
// //                           style={{ transition: 'stroke-dasharray 1s ease-out' }}
// //                         />
// //                       );
// //                     })}
// //                     <circle cx={cx} cy={cy} r={inner} fill="white" />
// //                     <text x={cx} y={cy - 4} textAnchor="middle"
// //                           fontSize="16" fontWeight="900" fill="#0f172a">{total}</text>
// //                     <text x={cx} y={cy + 14} textAnchor="middle"
// //                           fontSize="9" fill="#94a3b8">Total</text>
// //                   </svg>
// //                 </div>
// //                 <div className="space-y-2">
// //                   {segments.map((seg) => (
// //                     <div key={seg.label} className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <div className="w-2.5 h-2.5 rounded-full"
// //                              style={{ backgroundColor: seg.color }} />
// //                         <span className="text-xs text-gray-600">{seg.label}</span>
// //                       </div>
// //                       <div className="flex items-center gap-2">
// //                         <span className="text-xs font-bold text-[#0f172a]">{seg.value}</span>
// //                         <span className="text-[10px] text-gray-400">
// //                           {Math.round((seg.value / total) * 100)}%
// //                         </span>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </>
// //             );
// //           })()}
// //         </div>
// //       </div>

// //       {/* Recent items + pending claims */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// //         {/* Recent items */}
// //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
// //              style={{ animationDelay: '320ms' }}>
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-base font-black text-[#0f172a]">Recent Items</h2>
// //             <Link to="/org/items"
// //                   className="text-xs font-bold text-[#1a56db] hover:underline flex items-center gap-1">
// //               View all <ArrowRight size={12} />
// //             </Link>
// //           </div>
// //           {items.length === 0 ? (
// //             <div className="flex flex-col items-center py-10 text-center">
// //               <div className="w-14 h-14 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]
// //                               flex items-center justify-center mb-3">
// //                 <Package size={24} className="text-gray-300" />
// //               </div>
// //               <p className="text-sm font-semibold text-gray-600 mb-1">No items yet</p>
// //               <p className="text-xs text-gray-400 mb-4">
// //                 Start publishing found items to see them here.
// //               </p>
// //               <Link to="/org/publish"
// //                     className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl
// //                                bg-[#1a56db] text-white text-xs font-bold">
// //                 <PlusCircle size={13} /> Publish first item
// //               </Link>
// //             </div>
// //           ) : (
// //             <div className="space-y-1">
// //               {items.slice(0, 5).map((item, i) => (
// //                 <ItemRow key={item.id} item={item} delay={i * 60} />
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Pending claims */}
// //         <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
// //              style={{ animationDelay: '380ms' }}>
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="flex items-center gap-2">
// //               <h2 className="text-base font-black text-[#0f172a]">Pending Claims</h2>
// //               {pendingClaims.length > 0 && (
// //                 <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700
// //                                  text-[10px] font-black flex items-center justify-center">
// //                   {pendingClaims.length}
// //                 </span>
// //               )}
// //             </div>
// //             <Link to="/org/claims/pending"
// //                   className="text-xs font-bold text-[#1a56db] hover:underline flex items-center gap-1">
// //               View all <ArrowRight size={12} />
// //             </Link>
// //           </div>
// //           {pendingClaims.length === 0 ? (
// //             <div className="flex flex-col items-center py-10 text-center">
// //               <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100
// //                               flex items-center justify-center mb-3">
// //                 <Clock size={24} className="text-amber-400" />
// //               </div>
// //               <p className="text-sm font-semibold text-gray-600 mb-1">No pending claims</p>
// //               <p className="text-xs text-gray-400">
// //                 When owners claim your items, they'll appear here for review.
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="space-y-3">
// //               {pendingClaims.slice(0, 3).map((claim, i) => (
// //                 <ClaimCard key={claim.id} claim={claim} delay={i * 80} />
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   Package, Clock, CheckCircle, Trophy, Bell,
//   PlusCircle, ArrowRight, TrendingUp, AlertCircle,
//   Image, RefreshCw, Activity, X, Loader2
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import {
//   getOrganizationDashboard,
//   getOrganizationItems,
//   getOrganizationClaims,
//   getNotifications,
//   getClaimDetail,          // ← for the review modal
// } from '../../api/items';

// /* ── Animated number counter ─────────────────────────────────── */
// function Counter({ target, duration = 1200 }) {
//   const [val, setVal] = useState(0);
//   const frame = useRef(null);
//   useEffect(() => {
//     const start = performance.now();
//     const run = (now) => {
//       const t = Math.min((now - start) / duration, 1);
//       setVal(Math.floor(target * (1 - Math.pow(1 - t, 3))));
//       if (t < 1) frame.current = requestAnimationFrame(run);
//       else setVal(target);
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
// function ClaimCard({ claim, delay, onView }) {
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
//           onClick={() => onView && onView(claim.id)}
//           className="px-2.5 py-1 rounded-lg bg-[#1a56db] text-white text-[10px]
//                      font-bold hover:bg-[#1547c0] transition-all active:scale-95"
//         >
//           Review
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ── Claim Detail Modal (used for quick review) ───────────────── */
// function ClaimDetailModal({ claimId, onClose }) {
//   const [detail, setDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await getClaimDetail(claimId);
//         const payload = res?.data || res;
//         setDetail(payload?.data || payload);
//       } catch (e) {
//         setError(e.response?.data?.message || 'Failed to load claim details');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, [claimId]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
//          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//           <X size={20} />
//         </button>

//         {loading ? (
//           <div className="flex items-center justify-center py-12">
//             <Loader2 size={28} className="animate-spin text-[#1a56db]" />
//           </div>
//         ) : error ? (
//           <div className="text-center py-8">
//             <AlertCircle size={28} className="text-red-400 mx-auto mb-3" />
//             <p className="text-sm text-gray-500">{error}</p>
//           </div>
//         ) : detail ? (
//           <div className="space-y-4">
//             <h2 className="text-xl font-black text-[#0f172a]">Claim Details</h2>
//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div>
//                 <span className="text-gray-400 text-xs">Claimant</span>
//                 <p className="font-semibold text-[#0f172a]">{detail.claimantName || '—'}</p>
//               </div>
//               <div>
//                 <span className="text-gray-400 text-xs">Phone</span>
//                 <p className="font-semibold text-[#0f172a]">{detail.claimantPhone || '—'}</p>
//               </div>
//               <div>
//                 <span className="text-gray-400 text-xs">Email</span>
//                 <p className="font-semibold text-[#0f172a]">{detail.claimantEmail || '—'}</p>
//               </div>
//               <div>
//                 <span className="text-gray-400 text-xs">Status</span>
//                 <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black
//                   ${detail.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
//                     detail.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
//                     detail.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
//                     detail.status === 'FOUND' ? 'bg-blue-100 text-blue-700' :
//                     'bg-gray-100 text-gray-600'}`}>
//                   {detail.status || '—'}
//                 </span>
//               </div>
//               <div className="col-span-2">
//                 <span className="text-gray-400 text-xs">Item</span>
//                 <p className="font-semibold text-[#0f172a]">{detail.itemName || '—'}</p>
//               </div>
//               {detail.lostReportId && (
//                 <div className="col-span-2">
//                   <span className="text-gray-400 text-xs">Lost Report ID</span>
//                   <p className="font-mono font-bold text-[#0f172a]">{detail.lostReportId}</p>
//                 </div>
//               )}
//               {detail.description && (
//                 <div className="col-span-2">
//                   <span className="text-gray-400 text-xs">Description</span>
//                   <p className="text-sm text-gray-600">{detail.description}</p>
//                 </div>
//               )}
//               {detail.message && (
//                 <div className="col-span-2">
//                   <span className="text-gray-400 text-xs">Owner message</span>
//                   <p className="text-sm text-gray-600 italic">"{detail.message}"</p>
//                 </div>
//               )}
//               <div>
//                 <span className="text-gray-400 text-xs">Claimed Date</span>
//                 <p className="text-xs text-gray-600">
//                   {new Date(detail.claimedDate).toLocaleDateString('en-GB', {
//                     day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// /* ── Main dashboard ───────────────────────────────────────────── */
// export default function OrgDashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState(null);
//   const [items, setItems] = useState([]);
//   const [claims, setClaims] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [viewClaimId, setViewClaimId] = useState(null);  // ← for modal

//   // ─── REAL API FETCH (correct extraction) ──────────────────────
//   const fetch = useCallback(async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const [dashData, itemsPage, claimsList, notifData] = await Promise.all([
//         getOrganizationDashboard(),
//         getOrganizationItems(0, 5),
//         getOrganizationClaims(),
//         getNotifications(),
//       ]);

//       const dash = dashData?.data || dashData;
//       const itemsPayload = itemsPage?.data || itemsPage;
//       const claimsPayload = claimsList?.data || claimsList;
//       const notifPayload = notifData?.data || notifData;

//       setStats({
//         published:      dash?.totalPublishedItems || 0,
//         pending:        dash?.pendingClaims        || 0,
//         approved:       dash?.approvedClaims       || 0,
//         completed:      dash?.completedClaim       || 0,
//         notifications:  notifPayload?.unreadNotifications || 0,
//         monthlyPublished: [8,14,22,18,32,28],
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

//   const orgName = user?.organizationName || user?.name || 'Organisation';
//   const greeting = (() => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Good morning';
//     if (h < 17) return 'Good afternoon';
//     return 'Good evening';
//   })();

//   const MONTHLY_LABELS = ['Jan','Feb','Mar','Apr','May','Jun'];
//   const MONTHLY_DATA = stats?.monthlyPublished || [8,14,22,18,32,28];

//   // Only pending claims for the highlighted panel
//   const pendingClaims = claims.filter(c => c.status === 'PENDING');

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">

//       {/* Claim detail modal */}
//       {viewClaimId && (
//         <ClaimDetailModal claimId={viewClaimId} onClose={() => setViewClaimId(null)} />
//       )}

//       {/* Page header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 fade-up">
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
//               {[0,1,2,3].map(i => (
//                 <line key={i} x1="0" y1={i*40+8} x2="600" y2={i*40+8}
//                       stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4,4" />
//               ))}
//               {[40,30,20,10,0].map((v, i) => (
//                 <text key={i} x="-8" y={i*40+12} textAnchor="end"
//                       fontSize="10" fill="#94a3b8">{v}</text>
//               ))}
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
//                       const pct = seg.value / total;
//                       const offset = cumulative * circ;
//                       const dash = pct * circ;
//                       cumulative += pct;
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
//             <Link to="/org/claims"
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
//                 <ClaimCard key={claim.id} claim={claim} delay={i * 80} onView={setViewClaimId} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Clock, CheckCircle, Trophy, Bell,
  PlusCircle, ArrowRight, TrendingUp, AlertCircle,
  Image, RefreshCw, Activity, X, Loader2, Phone, Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getOrganizationDashboard,
  getOrganizationItems,
  getOrganizationClaims,
  getNotifications,
  getClaimDetail,
} from '../../api/items';

/* ── Animated counter ───────────────────────────────────────── */
function Counter({ target, duration = 1200 }) {
  const [val, setVal] = useState(0);
  const frame = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const run = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setVal(Math.floor(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame.current = requestAnimationFrame(run);
      else setVal(target);
    };
    frame.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);
  return <>{val.toLocaleString()}</>;
}

/* ── Stat card ──────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, delta, color, gradient, delay = 0 }) {
  return (
    <div className="card-hover fade-up bg-white rounded-2xl p-5 border border-[#e2e8f0]
                    relative overflow-hidden"
         style={{ animationDelay: `${delay}ms` }}>
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
           style={{ background: gradient }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
             style={{ backgroundColor: `${color}18` }}>
          <Icon size={20} style={{ color }} />
        </div>
        {delta && (
          <span className="flex items-center gap-1 text-[11px] font-bold
                           text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp size={10} /> {delta}
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-[#0f172a] mb-1">
        <Counter target={value} />
      </p>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </div>
  );
}

/* ── Recent item row ────────────────────────────────────────── */
function ItemRow({ item, delay }) {
  const [err, setErr] = useState(false);
  const statusColor = {
    REPORTED: { bg: '#dbeafe', text: '#1e40af', label: 'Published' },
    MATCHED:  { bg: '#e0e7ff', text: '#4338ca', label: 'Matched'  },
    CLAIMED:  { bg: '#fef9c3', text: '#854d0e', label: 'Claimed'   },
    CLOSED:   { bg: '#dcfce7', text: '#166534', label: 'Closed'    },
    FOUND:    { bg: '#d1fae5', text: '#065f46', label: 'Found'     },
  };
  const sc = statusColor[item.status] || statusColor.REPORTED;
  return (
    <div className="fade-up flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50
                    transition-all cursor-pointer group"
         style={{ animationDelay: `${delay}ms` }}>
      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
        {item.previewImage && !err ? (
          <img src={item.previewImage} alt={item.itemName}
               className="w-full h-full object-cover"
               onError={() => setErr(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image size={20} className="text-gray-300" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0f172a] truncate">{item.itemName}</p>
        <p className="text-xs text-gray-400 mt-0.5">{item.category?.replace(/_/g,' ')}</p>
      </div>
      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0"
            style={{ backgroundColor: sc.bg, color: sc.text }}>
        {sc.label}
      </span>
      <ArrowRight size={14} className="text-gray-300 group-hover:text-[#1a56db]
                                       transition-colors shrink-0" />
    </div>
  );
}

/* ── Claim card (pending claims) ────────────────────────────── */
function ClaimCard({ claim, delay, onView }) {
  return (
    <div className="fade-up bg-gradient-to-r from-amber-50 to-orange-50
                    border border-amber-100 rounded-2xl p-4"
         style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center
                        justify-center shrink-0">
          <Clock size={16} className="text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#0f172a]">
            {claim.claimantName || claim.ownerName || 'Unknown Owner'}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 truncate">
            Claiming: <span className="font-semibold">{claim.itemName || 'Item'}</span>
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Phone size={12} /> {claim.claimantPhone || '—'}
            </span>
            <span className="flex items-center gap-1">
              <Mail size={12} /> {claim.claimantEmail || '—'}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {new Date(claim.claimedDate || claim.createdAt || Date.now()).toLocaleDateString('en-GB', {
                day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
              })}
            </span>
          </div>
        </div>
        <button
          onClick={() => onView && onView(claim.id)}
          className="px-2.5 py-1 rounded-lg bg-[#1a56db] text-white text-[10px]
                     font-bold hover:bg-[#1547c0] transition-all active:scale-95"
        >
          Review
        </button>
      </div>
    </div>
  );
}

/* ── Claim detail modal ────────────────────────────────────── */
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
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black
                  ${detail.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                    detail.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                    detail.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                    detail.status === 'FOUND' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'}`}>
                  {detail.status || '—'}
                </span>
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

/* ── Main dashboard ─────────────────────────────────────────── */
export default function OrgDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewClaimId, setViewClaimId] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [dashData, itemsPage, claimsList, notifData] = await Promise.all([
        getOrganizationDashboard(),
        getOrganizationItems(0, 5),
        getOrganizationClaims(),
        getNotifications(),
      ]);

      const dash = dashData?.data || dashData;
      const itemsPayload = itemsPage?.data || itemsPage;
      const claimsPayload = claimsList?.data || claimsList;
      const notifPayload = notifData?.data || notifData;

      setStats({
        published:      dash?.totalPublishedItems || 0,
        pending:        dash?.pendingClaims        || 0,
        approved:       dash?.approvedClaims       || 0,
        completed:      dash?.completedClaim       || 0,
        notifications:  notifPayload?.unreadNotifications || 0,
        monthlyPublished: [8,14,22,18,32,28],
      });

      setItems(itemsPayload?.content || []);
      setClaims(Array.isArray(claimsPayload) ? claimsPayload : []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const orgName = user?.organizationName || user?.name || 'Organisation';
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const MONTHLY_LABELS = ['Jan','Feb','Mar','Apr','May','Jun'];
  const MONTHLY_DATA = stats?.monthlyPublished || [8,14,22,18,32,28];

  const pendingClaims = claims.filter(c => c.status === 'PENDING');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">

      {viewClaimId && (
        <ClaimDetailModal claimId={viewClaimId} onClose={() => setViewClaimId(null)} />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 fade-up">
        <div>
          <p className="text-sm text-gray-400 font-medium">{greeting} 👋</p>
          <h1 className="text-2xl font-black text-[#0f172a] mt-0.5">{orgName}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Here's what's happening with your organization today.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetch} disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
                             border-[#e2e8f0] text-sm font-semibold text-gray-600
                             hover:bg-gray-50 disabled:opacity-50 transition-all">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <Link to="/org/publish"
                className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl
                           bg-gradient-to-r from-[#1a56db] to-[#1547c0]
                           text-white text-sm font-bold shadow-sm">
            <PlusCircle size={15} /> Publish Item
          </Link>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200
                        text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={fetch} className="font-bold underline shrink-0">Retry</button>
        </div>
      )}

      {/* Stat cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#e2e8f0]">
              <div className="w-11 h-11 rounded-xl shimmer-bg mb-4" />
              <div className="h-7 w-16 rounded shimmer-bg mb-2" />
              <div className="h-3 w-24 rounded shimmer-bg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard icon={Package}     label="Published Items"  value={stats?.published     || 0} delta="+12 today" color="#1a56db" gradient="linear-gradient(135deg,#1a56db,#6366f1)" delay={0}   />
          <StatCard icon={Clock}       label="Pending Claims"   value={stats?.pending        || 0}                  color="#f59e0b" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" delay={80}  />
          <StatCard icon={CheckCircle} label="Approved Claims"  value={stats?.approved       || 0}                  color="#1a56db" gradient="linear-gradient(135deg,#1a56db,#22c55e)" delay={160} />
          <StatCard icon={Trophy}      label="Completed Claims" value={stats?.completed      || 0} delta="+8 week"  color="#22c55e" gradient="linear-gradient(135deg,#22c55e,#06b6d4)" delay={240} />
          <StatCard icon={Bell}        label="Notifications"    value={stats?.notifications  || 0}                  color="#ef4444" gradient="linear-gradient(135deg,#ef4444,#f59e0b)" delay={320} />
        </div>
      )}

      {/* Charts + activity row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly activity chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
             style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-black text-[#0f172a]">Monthly Activity</h2>
              <p className="text-xs text-gray-400 mt-0.5">Published items over time</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#1a56db] font-semibold
                            bg-blue-50 px-3 py-1.5 rounded-full">
              <Activity size={12} /> Live
            </div>
          </div>
          <div className="relative h-48">
            <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
              {[0,1,2,3].map(i => (
                <line key={i} x1="0" y1={i*40+8} x2="600" y2={i*40+8}
                      stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4,4" />
              ))}
              {[40,30,20,10,0].map((v, i) => (
                <text key={i} x="-8" y={i*40+12} textAnchor="end"
                      fontSize="10" fill="#94a3b8">{v}</text>
              ))}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#1a56db" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1a56db" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              {(() => {
                const pts = MONTHLY_DATA.map((v, i) => {
                  const x = (i / (MONTHLY_DATA.length - 1)) * 570 + 15;
                  const y = 152 - (v / 40) * 144;
                  return { x, y, v };
                });
                const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                const area = `${d} L ${pts[pts.length-1].x} 160 L ${pts[0].x} 160 Z`;
                return (
                  <>
                    <path d={area} fill="url(#areaGrad)" />
                    <path d={d} fill="none" stroke="#1a56db" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                    {pts.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill="white"
                                stroke="#1a56db" strokeWidth="2.5" />
                        <text x={p.x} y={p.y - 10} textAnchor="middle"
                              fontSize="10" fill="#1a56db" fontWeight="700">{p.v}</text>
                        <text x={p.x} y="172" textAnchor="middle"
                              fontSize="10" fill="#94a3b8">{MONTHLY_LABELS[i]}</text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Donut */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
             style={{ animationDelay: '280ms' }}>
          <h2 className="text-base font-black text-[#0f172a] mb-1">Claim Status</h2>
          <p className="text-xs text-gray-400 mb-5">Distribution overview</p>
          {(() => {
            const segments = [
              { label: 'Completed', value: stats?.completed || 0, color: '#22c55e' },
              { label: 'Approved',  value: stats?.approved  || 0, color: '#1a56db' },
              { label: 'Pending',   value: stats?.pending   || 0, color: '#f59e0b' },
              { label: 'Rejected',  value: 0,                       color: '#ef4444' },
            ];
            const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
            let cumulative = 0;
            const cx = 80, cy = 80, r = 60, inner = 38;
            const circ = 2 * Math.PI * r;
            return (
              <>
                <div className="flex justify-center mb-5">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    {segments.map((seg, i) => {
                      const pct = seg.value / total;
                      const offset = cumulative * circ;
                      const dash = pct * circ;
                      cumulative += pct;
                      return (
                        <circle key={i}
                          cx={cx} cy={cy} r={r}
                          fill="none" stroke={seg.color} strokeWidth="22"
                          strokeDasharray={`${dash} ${circ - dash}`}
                          strokeDashoffset={-offset + circ / 4}
                          style={{ transition: 'stroke-dasharray 1s ease-out' }}
                        />
                      );
                    })}
                    <circle cx={cx} cy={cy} r={inner} fill="white" />
                    <text x={cx} y={cy - 4} textAnchor="middle"
                          fontSize="16" fontWeight="900" fill="#0f172a">{total}</text>
                    <text x={cx} y={cy + 14} textAnchor="middle"
                          fontSize="9" fill="#94a3b8">Total</text>
                  </svg>
                </div>
                <div className="space-y-2">
                  {segments.map((seg) => (
                    <div key={seg.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full"
                             style={{ backgroundColor: seg.color }} />
                        <span className="text-xs text-gray-600">{seg.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0f172a]">{seg.value}</span>
                        <span className="text-[10px] text-gray-400">
                          {Math.round((seg.value / total) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Recent items + pending claims */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
             style={{ animationDelay: '320ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-[#0f172a]">Recent Items</h2>
            <Link to="/org/items"
                  className="text-xs font-bold text-[#1a56db] hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {items.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]
                              flex items-center justify-center mb-3">
                <Package size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">No items yet</p>
              <p className="text-xs text-gray-400 mb-4">
                Start publishing found items to see them here.
              </p>
              <Link to="/org/publish"
                    className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl
                               bg-[#1a56db] text-white text-xs font-bold">
                <PlusCircle size={13} /> Publish first item
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {items.slice(0, 5).map((item, i) => (
                <ItemRow key={item.id} item={item} delay={i * 60} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 fade-up"
             style={{ animationDelay: '380ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-[#0f172a]">Pending Claims</h2>
              {pendingClaims.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700
                                 text-[10px] font-black flex items-center justify-center">
                  {pendingClaims.length}
                </span>
              )}
            </div>
            <Link to="/org/claims"
                  className="text-xs font-bold text-[#1a56db] hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {pendingClaims.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100
                              flex items-center justify-center mb-3">
                <Clock size={24} className="text-amber-400" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">No pending claims</p>
              <p className="text-xs text-gray-400">
                When owners claim your items, they'll appear here for review.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingClaims.slice(0, 3).map((claim, i) => (
                <ClaimCard key={claim.id} claim={claim} delay={i * 80} onView={setViewClaimId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}