// // // // // // // // // import { useState, useEffect, useCallback } from 'react';
// // // // // // // // // import {
// // // // // // // // //   Bell, Package, CheckCircle, X, Info,
// // // // // // // // //   AlertCircle, RefreshCw, Clock
// // // // // // // // // } from 'lucide-react';

// // // // // // // // // const TYPE_CFG = {
// // // // // // // // //   NEW_CLAIM:     { icon: Bell,         color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'       },
// // // // // // // // //   ITEM_COLLECTED:{ icon: CheckCircle,  color: '#22c55e', bg: '#dcfce7', label: 'Item Collected'  },
// // // // // // // // //   CLAIM_REJECTED:{ icon: X,            color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'  },
// // // // // // // // //   SYSTEM_UPDATE: { icon: Info,         color: '#1a56db', bg: '#dbeafe', label: 'System Update'   },
// // // // // // // // //   NEW_MATCH:     { icon: Package,      color: '#6366f1', bg: '#ede9fe', label: 'New Match'       },
// // // // // // // // // };

// // // // // // // // // function NotifSkeleton() {
// // // // // // // // //   return (
// // // // // // // // //     <div className="flex items-start gap-4 p-4 rounded-xl">
// // // // // // // // //       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
// // // // // // // // //       <div className="flex-1 space-y-2">
// // // // // // // // //         <div className="h-4 w-48 rounded shimmer-bg" />
// // // // // // // // //         <div className="h-3 w-full rounded shimmer-bg" />
// // // // // // // // //         <div className="h-3 w-24 rounded shimmer-bg" />
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default function Notifications() {
// // // // // // // // //   const [notifs,  setNotifs]  = useState([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [error,   setError]   = useState('');
// // // // // // // // //   const [filter,  setFilter]  = useState('ALL');

// // // // // // // // //   const fetch = useCallback(async () => {
// // // // // // // // //     setLoading(true); setError('');
// // // // // // // // //     try {
// // // // // // // // //       // Replace with: const res = await getNotifications(); → GET /organization/notifications
// // // // // // // // //       await new Promise(r => setTimeout(r, 600));
// // // // // // // // //       setNotifs([]); // populated from API
// // // // // // // // //     } catch (e) { setError(e.message); }
// // // // // // // // //     finally { setLoading(false); }
// // // // // // // // //   }, []);

// // // // // // // // //   useEffect(() => { fetch(); }, [fetch]);

// // // // // // // // //   const markRead  = (id) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
// // // // // // // // //   const markAll   = ()   => setNotifs(p => p.map(n => ({ ...n, read: true })));
// // // // // // // // //   const unreadCnt = notifs.filter(n => !n.read).length;

// // // // // // // // //   const filtered = filter === 'ALL'    ? notifs
// // // // // // // // //                  : filter === 'UNREAD' ? notifs.filter(n => !n.read)
// // // // // // // // //                  : notifs.filter(n => n.type === filter);

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
// // // // // // // // //       {/* Header */}
// // // // // // // // //       <div className="flex items-center justify-between gap-4 mb-6 fade-up">
// // // // // // // // //         <div>
// // // // // // // // //           <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
// // // // // // // // //             Notifications
// // // // // // // // //             {unreadCnt > 0 && (
// // // // // // // // //               <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs
// // // // // // // // //                                font-black flex items-center justify-center">
// // // // // // // // //                 {unreadCnt}
// // // // // // // // //               </span>
// // // // // // // // //             )}
// // // // // // // // //           </h1>
// // // // // // // // //           <p className="text-sm text-gray-400 mt-0.5">{notifs.length} total notifications</p>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="flex gap-2">
// // // // // // // // //           {unreadCnt > 0 && (
// // // // // // // // //             <button onClick={markAll}
// // // // // // // // //                     className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs
// // // // // // // // //                                font-bold text-gray-600 hover:bg-gray-50 transition-all">
// // // // // // // // //               Mark all read
// // // // // // // // //             </button>
// // // // // // // // //           )}
// // // // // // // // //           <button onClick={fetch} disabled={loading}
// // // // // // // // //                   className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
// // // // // // // // //                              border-[#e2e8f0] text-sm font-bold text-gray-600
// // // // // // // // //                              hover:bg-gray-50 disabled:opacity-50 transition-all">
// // // // // // // // //             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Filter pills */}
// // // // // // // // //       <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
// // // // // // // // //         {['ALL','UNREAD','NEW_CLAIM','ITEM_COLLECTED','SYSTEM_UPDATE'].map(f => (
// // // // // // // // //           <button key={f} onClick={() => setFilter(f)}
// // // // // // // // //                   className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all
// // // // // // // // //                               ${filter === f
// // // // // // // // //                                 ? 'bg-[#1a56db] text-white shadow-sm'
// // // // // // // // //                                 : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
// // // // // // // // //             {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
// // // // // // // // //           </button>
// // // // // // // // //         ))}
// // // // // // // // //       </div>

// // // // // // // // //       {error && (
// // // // // // // // //         <div className="flex items-center gap-3 bg-red-50 border border-red-200
// // // // // // // // //                         text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // // // // // // //           <AlertCircle size={16} className="shrink-0" /> {error}
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up"
// // // // // // // // //            style={{ animationDelay: '80ms' }}>
// // // // // // // // //         {loading ? (
// // // // // // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // // // // // //             {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
// // // // // // // // //           </div>
// // // // // // // // //         ) : filtered.length === 0 ? (
// // // // // // // // //           <div className="flex flex-col items-center py-20 text-center">
// // // // // // // // //             <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center
// // // // // // // // //                             justify-center mb-4">
// // // // // // // // //               <Bell size={28} className="text-gray-200" />
// // // // // // // // //             </div>
// // // // // // // // //             <p className="text-sm font-semibold text-gray-400 mb-1">No notifications</p>
// // // // // // // // //             <p className="text-xs text-gray-300">
// // // // // // // // //               {filter === 'UNREAD' ? 'All caught up!' : 'Nothing to show here yet.'}
// // // // // // // // //             </p>
// // // // // // // // //           </div>
// // // // // // // // //         ) : (
// // // // // // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // // // // // //             {filtered.map((n, i) => {
// // // // // // // // //               const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_UPDATE;
// // // // // // // // //               const Icon = cfg.icon;
// // // // // // // // //               return (
// // // // // // // // //                 <div key={n.id}
// // // // // // // // //                      onClick={() => markRead(n.id)}
// // // // // // // // //                      className={`flex items-start gap-4 p-4 cursor-pointer transition-all
// // // // // // // // //                                  hover:bg-[#f8fafc] fade-up
// // // // // // // // //                                  ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
// // // // // // // // //                      style={{ animationDelay: `${i * 50}ms` }}>
// // // // // // // // //                   <div className="w-11 h-11 rounded-xl flex items-center justify-center
// // // // // // // // //                                   shrink-0" style={{ backgroundColor: cfg.bg }}>
// // // // // // // // //                     <Icon size={18} style={{ color: cfg.color }} />
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="flex-1 min-w-0">
// // // // // // // // //                     <div className="flex items-start justify-between gap-2">
// // // // // // // // //                       <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
// // // // // // // // //                         {n.title || cfg.label}
// // // // // // // // //                       </p>
// // // // // // // // //                       {!n.read && (
// // // // // // // // //                         <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />
// // // // // // // // //                       )}
// // // // // // // // //                     </div>
// // // // // // // // //                     <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
// // // // // // // // //                       {n.message || 'No details available'}
// // // // // // // // //                     </p>
// // // // // // // // //                     <div className="flex items-center gap-1 mt-1.5">
// // // // // // // // //                       <Clock size={10} className="text-gray-300" />
// // // // // // // // //                       <span className="text-[10px] text-gray-300">
// // // // // // // // //                         {n.createdAt
// // // // // // // // //                           ? new Date(n.createdAt).toLocaleDateString('en-GB',{
// // // // // // // // //                               day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
// // // // // // // // //                             })
// // // // // // // // //                           : 'Just now'}
// // // // // // // // //                       </span>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               );
// // // // // // // // //             })}
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // import { useState, useEffect, useCallback } from 'react';
// // // // // // // // import {
// // // // // // // //   Bell, Package, CheckCircle, X, Info,
// // // // // // // //   AlertCircle, RefreshCw, Clock
// // // // // // // // } from 'lucide-react';

// // // // // // // // // Placeholder API (to be implemented by backend)
// // // // // // // // const fetchNotifications = async () => {
// // // // // // // //   // Replace with: return apiClient('/v1/services/notifications');
// // // // // // // //   return [];
// // // // // // // // };

// // // // // // // // const TYPE_CFG = {
// // // // // // // //   CLAIM_REQUEST:    { icon: Bell,         color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'       },
// // // // // // // //   CLAIM_APPROVED:   { icon: CheckCircle,  color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'  },
// // // // // // // //   CLAIM_REJECTED:   { icon: X,            color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'  },
// // // // // // // //   SYSTEM_NOTIFICATION:{ icon: Info,       color: '#1a56db', bg: '#dbeafe', label: 'System Update'   },
// // // // // // // //   NEW_MATCH:        { icon: Package,      color: '#6366f1', bg: '#ede9fe', label: 'New Match'       },
// // // // // // // // };

// // // // // // // // function NotifSkeleton() {
// // // // // // // //   return (
// // // // // // // //     <div className="flex items-start gap-4 p-4 rounded-xl">
// // // // // // // //       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
// // // // // // // //       <div className="flex-1 space-y-2">
// // // // // // // //         <div className="h-4 w-48 rounded shimmer-bg" />
// // // // // // // //         <div className="h-3 w-full rounded shimmer-bg" />
// // // // // // // //         <div className="h-3 w-24 rounded shimmer-bg" />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default function Notifications() {
// // // // // // // //   const [notifs,  setNotifs]  = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [error,   setError]   = useState('');
// // // // // // // //   const [filter,  setFilter]  = useState('ALL');

// // // // // // // //   const fetch = useCallback(async () => {
// // // // // // // //     setLoading(true); setError('');
// // // // // // // //     try {
// // // // // // // //       const data = await fetchNotifications();
// // // // // // // //       setNotifs(data || []);
// // // // // // // //     } catch (e) {
// // // // // // // //       setError(e.message || 'Failed to load notifications');
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => { fetch(); }, [fetch]);

// // // // // // // //   const markRead  = (id) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
// // // // // // // //   const markAll   = ()   => setNotifs(p => p.map(n => ({ ...n, read: true })));
// // // // // // // //   const unreadCnt = notifs.filter(n => !n.read).length;

// // // // // // // //   const filtered = filter === 'ALL'    ? notifs
// // // // // // // //                  : filter === 'UNREAD' ? notifs.filter(n => !n.read)
// // // // // // // //                  : notifs.filter(n => n.type === filter);

// // // // // // // //   return (
// // // // // // // //     <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
// // // // // // // //       {/* Header */}
// // // // // // // //       <div className="flex items-center justify-between gap-4 mb-6 fade-up">
// // // // // // // //         <div>
// // // // // // // //           <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
// // // // // // // //             Notifications
// // // // // // // //             {unreadCnt > 0 && (
// // // // // // // //               <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs
// // // // // // // //                                font-black flex items-center justify-center">
// // // // // // // //                 {unreadCnt}
// // // // // // // //               </span>
// // // // // // // //             )}
// // // // // // // //           </h1>
// // // // // // // //           <p className="text-sm text-gray-400 mt-0.5">{notifs.length} total notifications</p>
// // // // // // // //         </div>
// // // // // // // //         <div className="flex gap-2">
// // // // // // // //           {unreadCnt > 0 && (
// // // // // // // //             <button onClick={markAll}
// // // // // // // //                     className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs
// // // // // // // //                                font-bold text-gray-600 hover:bg-gray-50 transition-all">
// // // // // // // //               Mark all read
// // // // // // // //             </button>
// // // // // // // //           )}
// // // // // // // //           <button onClick={fetch} disabled={loading}
// // // // // // // //                   className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
// // // // // // // //                              border-[#e2e8f0] text-sm font-bold text-gray-600
// // // // // // // //                              hover:bg-gray-50 disabled:opacity-50 transition-all">
// // // // // // // //             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Filter pills */}
// // // // // // // //       <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
// // // // // // // //         {['ALL','UNREAD','CLAIM_REQUEST','CLAIM_APPROVED','SYSTEM_NOTIFICATION'].map(f => (
// // // // // // // //           <button key={f} onClick={() => setFilter(f)}
// // // // // // // //                   className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all
// // // // // // // //                               ${filter === f
// // // // // // // //                                 ? 'bg-[#1a56db] text-white shadow-sm'
// // // // // // // //                                 : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
// // // // // // // //             {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
// // // // // // // //           </button>
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       {error && (
// // // // // // // //         <div className="flex items-center gap-3 bg-red-50 border border-red-200
// // // // // // // //                         text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // // // // // //           <AlertCircle size={16} className="shrink-0" /> {error}
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up"
// // // // // // // //            style={{ animationDelay: '80ms' }}>
// // // // // // // //         {loading ? (
// // // // // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // // // // //             {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
// // // // // // // //           </div>
// // // // // // // //         ) : filtered.length === 0 ? (
// // // // // // // //           <div className="flex flex-col items-center py-20 text-center">
// // // // // // // //             <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center
// // // // // // // //                             justify-center mb-4">
// // // // // // // //               <Bell size={28} className="text-gray-200" />
// // // // // // // //             </div>
// // // // // // // //             <p className="text-sm font-semibold text-gray-400 mb-1">No notifications</p>
// // // // // // // //             <p className="text-xs text-gray-300">
// // // // // // // //               {filter === 'UNREAD' ? 'All caught up!' : 'Nothing to show here yet.'}
// // // // // // // //             </p>
// // // // // // // //           </div>
// // // // // // // //         ) : (
// // // // // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // // // // //             {filtered.map((n, i) => {
// // // // // // // //               const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
// // // // // // // //               const Icon = cfg.icon;
// // // // // // // //               return (
// // // // // // // //                 <div key={n.id}
// // // // // // // //                      onClick={() => markRead(n.id)}
// // // // // // // //                      className={`flex items-start gap-4 p-4 cursor-pointer transition-all
// // // // // // // //                                  hover:bg-[#f8fafc] fade-up
// // // // // // // //                                  ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
// // // // // // // //                      style={{ animationDelay: `${i * 50}ms` }}>
// // // // // // // //                   <div className="w-11 h-11 rounded-xl flex items-center justify-center
// // // // // // // //                                   shrink-0" style={{ backgroundColor: cfg.bg }}>
// // // // // // // //                     <Icon size={18} style={{ color: cfg.color }} />
// // // // // // // //                   </div>
// // // // // // // //                   <div className="flex-1 min-w-0">
// // // // // // // //                     <div className="flex items-start justify-between gap-2">
// // // // // // // //                       <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
// // // // // // // //                         {n.title || cfg.label}
// // // // // // // //                       </p>
// // // // // // // //                       {!n.read && (
// // // // // // // //                         <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />
// // // // // // // //                       )}
// // // // // // // //                     </div>
// // // // // // // //                     <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
// // // // // // // //                       {n.message || 'No details available'}
// // // // // // // //                     </p>
// // // // // // // //                     <div className="flex items-center gap-1 mt-1.5">
// // // // // // // //                       <Clock size={10} className="text-gray-300" />
// // // // // // // //                       <span className="text-[10px] text-gray-300">
// // // // // // // //                         {n.createdAt
// // // // // // // //                           ? new Date(n.createdAt).toLocaleDateString('en-GB',{
// // // // // // // //                               day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
// // // // // // // //                             })
// // // // // // // //                           : 'Just now'}
// // // // // // // //                       </span>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               );
// // // // // // // //             })}
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // import { useState, useEffect, useCallback } from 'react';
// // // // // // // import {
// // // // // // //   Bell, Package, CheckCircle, X, Info,
// // // // // // //   AlertCircle, RefreshCw, Clock, Trash2
// // // // // // // } from 'lucide-react';
// // // // // // // import {
// // // // // // //   getNotifications,
// // // // // // //   markNotificationRead,
// // // // // // //   markAllNotificationsRead,
// // // // // // //   deleteNotification
// // // // // // // } from '../../api/items';

// // // // // // // const TYPE_CFG = {
// // // // // // //   CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'         },
// // // // // // //   CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'    },
// // // // // // //   CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'    },
// // // // // // //   SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'     },
// // // // // // //   ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'         },
// // // // // // // };

// // // // // // // function NotifSkeleton() {
// // // // // // //   return (
// // // // // // //     <div className="flex items-start gap-4 p-4 rounded-xl">
// // // // // // //       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
// // // // // // //       <div className="flex-1 space-y-2">
// // // // // // //         <div className="h-4 w-48 rounded shimmer-bg" />
// // // // // // //         <div className="h-3 w-full rounded shimmer-bg" />
// // // // // // //         <div className="h-3 w-24 rounded shimmer-bg" />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default function Notifications() {
// // // // // // //   const [notifs,      setNotifs]      = useState([]);
// // // // // // //   const [total,       setTotal]       = useState(0);
// // // // // // //   const [unread,      setUnread]      = useState(0);
// // // // // // //   const [loading,     setLoading]     = useState(true);
// // // // // // //   const [error,       setError]       = useState('');
// // // // // // //   const [filter,      setFilter]      = useState('ALL');
// // // // // // //   const [actionLoad,  setActionLoad]  = useState(null);   // id of item being acted on

// // // // // // //   const fetch = useCallback(async () => {
// // // // // // //     setLoading(true);
// // // // // // //     setError('');
// // // // // // //     try {
// // // // // // //       const res = await getNotifications();
// // // // // // //       // Backend wraps in GenericRestResponseNotificationListResponse
// // // // // // //       const payload = res?.data?.data || res?.data || res;
// // // // // // //       const items = payload?.notifications || [];
// // // // // // //       setNotifs(items);
// // // // // // //       setTotal(payload?.totalNotifications || items.length);
// // // // // // //       setUnread(payload?.unreadNotifications ?? items.filter(n => !n.read).length);
// // // // // // //     } catch (e) {
// // // // // // //       setError(e.response?.data?.message || e.message || 'Failed to load notifications');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   useEffect(() => { fetch(); }, [fetch]);

// // // // // // //   // Mark single as read
// // // // // // //   const handleMarkRead = async (id) => {
// // // // // // //     setActionLoad(id);
// // // // // // //     try {
// // // // // // //       await markNotificationRead(id);
// // // // // // //       setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
// // // // // // //       setUnread(prev => Math.max(0, prev - 1));
// // // // // // //     } catch (e) {
// // // // // // //       setError(e.response?.data?.message || 'Could not mark as read');
// // // // // // //     } finally {
// // // // // // //       setActionLoad(null);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Mark all read
// // // // // // //   const handleMarkAll = async () => {
// // // // // // //     setActionLoad('all');
// // // // // // //     try {
// // // // // // //       await markAllNotificationsRead();
// // // // // // //       setNotifs(prev => prev.map(n => ({ ...n, read: true })));
// // // // // // //       setUnread(0);
// // // // // // //     } catch (e) {
// // // // // // //       setError(e.response?.data?.message || 'Could not mark all as read');
// // // // // // //     } finally {
// // // // // // //       setActionLoad(null);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Delete
// // // // // // //   const handleDelete = async (id) => {
// // // // // // //     setActionLoad(id);
// // // // // // //     try {
// // // // // // //       await deleteNotification(id);
// // // // // // //       const removed = notifs.find(n => n.id === id);
// // // // // // //       setNotifs(prev => prev.filter(n => n.id !== id));
// // // // // // //       if (removed && !removed.read) setUnread(prev => Math.max(0, prev - 1));
// // // // // // //       setTotal(prev => prev - 1);
// // // // // // //     } catch (e) {
// // // // // // //       setError(e.response?.data?.message || 'Could not delete notification');
// // // // // // //     } finally {
// // // // // // //       setActionLoad(null);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const filtered = filter === 'ALL'    ? notifs
// // // // // // //                  : filter === 'UNREAD' ? notifs.filter(n => !n.read)
// // // // // // //                  : notifs.filter(n => n.type === filter);

// // // // // // //   return (
// // // // // // //     <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
// // // // // // //       {/* Header */}
// // // // // // //       <div className="flex items-center justify-between gap-4 mb-6 fade-up">
// // // // // // //         <div>
// // // // // // //           <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
// // // // // // //             Notifications
// // // // // // //             {unread > 0 && (
// // // // // // //               <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs
// // // // // // //                                font-black flex items-center justify-center">
// // // // // // //                 {unread}
// // // // // // //               </span>
// // // // // // //             )}
// // // // // // //           </h1>
// // // // // // //           <p className="text-sm text-gray-400 mt-0.5">{total} total · {unread} unread</p>
// // // // // // //         </div>
// // // // // // //         <div className="flex gap-2">
// // // // // // //           {unread > 0 && (
// // // // // // //             <button onClick={handleMarkAll}
// // // // // // //                     disabled={actionLoad === 'all'}
// // // // // // //                     className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs
// // // // // // //                                font-bold text-gray-600 hover:bg-gray-50 transition-all
// // // // // // //                                disabled:opacity-50">
// // // // // // //               Mark all read
// // // // // // //             </button>
// // // // // // //           )}
// // // // // // //           <button onClick={fetch} disabled={loading}
// // // // // // //                   className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
// // // // // // //                              border-[#e2e8f0] text-sm font-bold text-gray-600
// // // // // // //                              hover:bg-gray-50 disabled:opacity-50 transition-all">
// // // // // // //             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Filter pills */}
// // // // // // //       <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
// // // // // // //         {['ALL','UNREAD','CLAIM_REQUEST','CLAIM_APPROVED','CLAIM_REJECTED','SYSTEM_NOTIFICATION','ITEM_MATCHED'].map(f => (
// // // // // // //           <button key={f} onClick={() => setFilter(f)}
// // // // // // //                   className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all
// // // // // // //                               ${filter === f
// // // // // // //                                 ? 'bg-[#1a56db] text-white shadow-sm'
// // // // // // //                                 : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
// // // // // // //             {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
// // // // // // //           </button>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {error && (
// // // // // // //         <div className="flex items-center gap-3 bg-red-50 border border-red-200
// // // // // // //                         text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // // // // //           <AlertCircle size={16} className="shrink-0" /> {error}
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up"
// // // // // // //            style={{ animationDelay: '80ms' }}>
// // // // // // //         {loading ? (
// // // // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // // // //             {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
// // // // // // //           </div>
// // // // // // //         ) : filtered.length === 0 ? (
// // // // // // //           <div className="flex flex-col items-center py-20 text-center">
// // // // // // //             <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center
// // // // // // //                             justify-center mb-4">
// // // // // // //               <Bell size={28} className="text-gray-200" />
// // // // // // //             </div>
// // // // // // //             <p className="text-sm font-semibold text-gray-400 mb-1">No notifications</p>
// // // // // // //             <p className="text-xs text-gray-300">
// // // // // // //               {filter === 'UNREAD' ? 'All caught up!' : 'Nothing to show here yet.'}
// // // // // // //             </p>
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // // // //             {filtered.map((n, i) => {
// // // // // // //               const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
// // // // // // //               const Icon = cfg.icon;
// // // // // // //               const isBusy = actionLoad === n.id || actionLoad === 'all';
// // // // // // //               return (
// // // // // // //                 <div key={n.id}
// // // // // // //                      className={`flex items-start gap-4 p-4 transition-all
// // // // // // //                                  hover:bg-[#f8fafc] fade-up
// // // // // // //                                  ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
// // // // // // //                      style={{ animationDelay: `${i * 50}ms` }}>
// // // // // // //                   {/* Icon + content (click to mark read) */}
// // // // // // //                   <div className="flex-1 flex items-start gap-4 cursor-pointer"
// // // // // // //                        onClick={() => !n.read && handleMarkRead(n.id)}>
// // // // // // //                     <div className="w-11 h-11 rounded-xl flex items-center justify-center
// // // // // // //                                     shrink-0" style={{ backgroundColor: cfg.bg }}>
// // // // // // //                       <Icon size={18} style={{ color: cfg.color }} />
// // // // // // //                     </div>
// // // // // // //                     <div className="flex-1 min-w-0">
// // // // // // //                       <div className="flex items-start justify-between gap-2">
// // // // // // //                         <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
// // // // // // //                           {n.title || cfg.label}
// // // // // // //                         </p>
// // // // // // //                         {!n.read && (
// // // // // // //                           <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />
// // // // // // //                         )}
// // // // // // //                       </div>
// // // // // // //                       <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
// // // // // // //                         {n.message || 'No details available'}
// // // // // // //                       </p>
// // // // // // //                       <div className="flex items-center gap-1 mt-1.5">
// // // // // // //                         <Clock size={10} className="text-gray-300" />
// // // // // // //                         <span className="text-[10px] text-gray-300">
// // // // // // //                           {n.createdDate
// // // // // // //                             ? new Date(n.createdDate).toLocaleDateString('en-GB',{
// // // // // // //                                 day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
// // // // // // //                               })
// // // // // // //                             : 'Just now'}
// // // // // // //                         </span>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   {/* Delete button */}
// // // // // // //                   <button
// // // // // // //                     onClick={(e) => { e.stopPropagation(); handleDelete(n.id); }}
// // // // // // //                     disabled={isBusy}
// // // // // // //                     className="shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center
// // // // // // //                                justify-center transition-all group disabled:opacity-50"
// // // // // // //                     title="Delete"
// // // // // // //                   >
// // // // // // //                     <Trash2 size={14} className="text-gray-300 group-hover:text-[#ef4444]" />
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               );
// // // // // // //             })}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // import { useState } from 'react';
// // // // // // import {
// // // // // //   Bell, Package, CheckCircle, X, Info,
// // // // // //   AlertCircle, Clock, Trash2
// // // // // // } from 'lucide-react';
// // // // // // import { useNotifications } from '../context/NotificationContext';

// // // // // // const TYPE_CFG = {
// // // // // //   CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'         },
// // // // // //   CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'    },
// // // // // //   CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'    },
// // // // // //   SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'     },
// // // // // //   ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'         },
// // // // // // };

// // // // // // function NotifSkeleton() {
// // // // // //   return (
// // // // // //     <div className="flex items-start gap-4 p-4 rounded-xl">
// // // // // //       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
// // // // // //       <div className="flex-1 space-y-2">
// // // // // //         <div className="h-4 w-48 rounded shimmer-bg" />
// // // // // //         <div className="h-3 w-full rounded shimmer-bg" />
// // // // // //         <div className="h-3 w-24 rounded shimmer-bg" />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default function Notifications() {
// // // // // //   const {
// // // // // //     notifications,
// // // // // //     unreadCount,
// // // // // //     totalCount,
// // // // // //     loading,
// // // // // //     error,
// // // // // //     refresh,
// // // // // //     markOneRead,
// // // // // //     markAllRead,
// // // // // //     removeNotification,
// // // // // //   } = useNotifications();

// // // // // //   const [filter, setFilter] = useState('ALL');
// // // // // //   const [acting, setActing] = useState(null); // id or 'all'

// // // // // //   const filtered = filter === 'ALL'    ? notifications
// // // // // //                  : filter === 'UNREAD' ? notifications.filter(n => !n.read)
// // // // // //                  : notifications.filter(n => n.type === filter);

// // // // // //   return (
// // // // // //     <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
// // // // // //       {/* Header */}
// // // // // //       <div className="flex items-center justify-between gap-4 mb-6 fade-up">
// // // // // //         <div>
// // // // // //           <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
// // // // // //             Notifications
// // // // // //             {unreadCount > 0 && (
// // // // // //               <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-black flex items-center justify-center">
// // // // // //                 {unreadCount}
// // // // // //               </span>
// // // // // //             )}
// // // // // //           </h1>
// // // // // //           <p className="text-sm text-gray-400 mt-0.5">{totalCount} total · {unreadCount} unread</p>
// // // // // //         </div>
// // // // // //         <div className="flex gap-2">
// // // // // //           {unreadCount > 0 && (
// // // // // //             <button
// // // // // //               onClick={async () => { setActing('all'); await markAllRead(); setActing(null); }}
// // // // // //               disabled={acting === 'all'}
// // // // // //               className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
// // // // // //             >
// // // // // //               Mark all read
// // // // // //             </button>
// // // // // //           )}
// // // // // //           <button onClick={refresh} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
// // // // // //             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Filter pills */}
// // // // // //       <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
// // // // // //         {['ALL','UNREAD','CLAIM_REQUEST','CLAIM_APPROVED','CLAIM_REJECTED','SYSTEM_NOTIFICATION','ITEM_MATCHED'].map(f => (
// // // // // //           <button key={f} onClick={() => setFilter(f)}
// // // // // //                   className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f ? 'bg-[#1a56db] text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
// // // // // //             {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
// // // // // //           </button>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {error && (
// // // // // //         <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // // // //           <AlertCircle size={16} className="shrink-0" /> {error}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up" style={{ animationDelay: '80ms' }}>
// // // // // //         {loading ? (
// // // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // // //             {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
// // // // // //           </div>
// // // // // //         ) : filtered.length === 0 ? (
// // // // // //           <div className="flex flex-col items-center py-20 text-center">
// // // // // //             <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
// // // // // //               <Bell size={28} className="text-gray-200" />
// // // // // //             </div>
// // // // // //             <p className="text-sm font-semibold text-gray-400 mb-1">No notifications</p>
// // // // // //             <p className="text-xs text-gray-300">
// // // // // //               {filter === 'UNREAD' ? 'All caught up!' : 'Nothing to show here yet.'}
// // // // // //             </p>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // // //             {filtered.map((n, i) => {
// // // // // //               const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
// // // // // //               const Icon = cfg.icon;
// // // // // //               const isActing = acting === n.id || acting === 'all';
// // // // // //               return (
// // // // // //                 <div key={n.id}
// // // // // //                      className={`flex items-start gap-4 p-4 transition-all hover:bg-[#f8fafc] fade-up ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
// // // // // //                      style={{ animationDelay: `${i * 50}ms` }}>
// // // // // //                   {/* Click to mark read */}
// // // // // //                   <div className="flex-1 flex items-start gap-4 cursor-pointer"
// // // // // //                        onClick={() => !n.read && (async () => { setActing(n.id); await markOneRead(n.id); setActing(null); })()}>
// // // // // //                     <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.bg }}>
// // // // // //                       <Icon size={18} style={{ color: cfg.color }} />
// // // // // //                     </div>
// // // // // //                     <div className="flex-1 min-w-0">
// // // // // //                       <div className="flex items-start justify-between gap-2">
// // // // // //                         <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
// // // // // //                           {n.title || cfg.label}
// // // // // //                         </p>
// // // // // //                         {!n.read && <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />}
// // // // // //                       </div>
// // // // // //                       <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.message || 'No details available'}</p>
// // // // // //                       <div className="flex items-center gap-1 mt-1.5">
// // // // // //                         <Clock size={10} className="text-gray-300" />
// // // // // //                         <span className="text-[10px] text-gray-300">
// // // // // //                           {n.createdDate
// // // // // //                             ? new Date(n.createdDate).toLocaleDateString('en-GB',{ day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
// // // // // //                             : 'Just now'}
// // // // // //                         </span>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   {/* Delete */}
// // // // // //                   <button
// // // // // //                     onClick={(e) => { e.stopPropagation(); setActing(n.id); removeNotification(n.id).finally(() => setActing(null)); }}
// // // // // //                     disabled={isActing}
// // // // // //                     className="shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-all group disabled:opacity-50"
// // // // // //                     title="Delete"
// // // // // //                   >
// // // // // //                     <Trash2 size={14} className="text-gray-300 group-hover:text-[#ef4444]" />
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               );
// // // // // //             })}
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // import { useState } from 'react';
// // // // // import {
// // // // //   Bell, Package, CheckCircle, X, Info,
// // // // //   AlertCircle, Clock, Trash2
// // // // // } from 'lucide-react';
// // // // // import { useNotifications } from '../../context/NotificationContext';  // ✅ corrected path

// // // // // const TYPE_CFG = {
// // // // //   CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'         },
// // // // //   CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'    },
// // // // //   CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'    },
// // // // //   SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'     },
// // // // //   ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'         },
// // // // // };

// // // // // function NotifSkeleton() {
// // // // //   return (
// // // // //     <div className="flex items-start gap-4 p-4 rounded-xl">
// // // // //       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
// // // // //       <div className="flex-1 space-y-2">
// // // // //         <div className="h-4 w-48 rounded shimmer-bg" />
// // // // //         <div className="h-3 w-full rounded shimmer-bg" />
// // // // //         <div className="h-3 w-24 rounded shimmer-bg" />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default function Notifications() {
// // // // //   const {
// // // // //     notifications,
// // // // //     unreadCount,
// // // // //     totalCount,
// // // // //     loading,
// // // // //     error,
// // // // //     refresh,
// // // // //     markOneRead,
// // // // //     markAllRead,
// // // // //     removeNotification,
// // // // //   } = useNotifications();

// // // // //   const [filter, setFilter] = useState('ALL');
// // // // //   const [acting, setActing] = useState(null); // id or 'all'

// // // // //   const filtered = filter === 'ALL'    ? notifications
// // // // //                  : filter === 'UNREAD' ? notifications.filter(n => !n.read)
// // // // //                  : notifications.filter(n => n.type === filter);

// // // // //   return (
// // // // //     <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
// // // // //       {/* Header */}
// // // // //       <div className="flex items-center justify-between gap-4 mb-6 fade-up">
// // // // //         <div>
// // // // //           <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
// // // // //             Notifications
// // // // //             {unreadCount > 0 && (
// // // // //               <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-black flex items-center justify-center">
// // // // //                 {unreadCount}
// // // // //               </span>
// // // // //             )}
// // // // //           </h1>
// // // // //           <p className="text-sm text-gray-400 mt-0.5">{totalCount} total · {unreadCount} unread</p>
// // // // //         </div>
// // // // //         <div className="flex gap-2">
// // // // //           {unreadCount > 0 && (
// // // // //             <button
// // // // //               onClick={async () => { setActing('all'); await markAllRead(); setActing(null); }}
// // // // //               disabled={acting === 'all'}
// // // // //               className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
// // // // //             >
// // // // //               Mark all read
// // // // //             </button>
// // // // //           )}
// // // // //           <button onClick={refresh} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
// // // // //             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Filter pills */}
// // // // //       <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
// // // // //         {['ALL','UNREAD','CLAIM_REQUEST','CLAIM_APPROVED','CLAIM_REJECTED','SYSTEM_NOTIFICATION','ITEM_MATCHED'].map(f => (
// // // // //           <button key={f} onClick={() => setFilter(f)}
// // // // //                   className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f ? 'bg-[#1a56db] text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
// // // // //             {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
// // // // //           </button>
// // // // //         ))}
// // // // //       </div>

// // // // //       {error && (
// // // // //         <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // // //           <AlertCircle size={16} className="shrink-0" /> {error}
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up" style={{ animationDelay: '80ms' }}>
// // // // //         {loading ? (
// // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // //             {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
// // // // //           </div>
// // // // //         ) : filtered.length === 0 ? (
// // // // //           <div className="flex flex-col items-center py-20 text-center">
// // // // //             <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
// // // // //               <Bell size={28} className="text-gray-200" />
// // // // //             </div>
// // // // //             <p className="text-sm font-semibold text-gray-400 mb-1">No notifications</p>
// // // // //             <p className="text-xs text-gray-300">
// // // // //               {filter === 'UNREAD' ? 'All caught up!' : 'Nothing to show here yet.'}
// // // // //             </p>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="divide-y divide-[#f8fafc]">
// // // // //             {filtered.map((n, i) => {
// // // // //               const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
// // // // //               const Icon = cfg.icon;
// // // // //               const isActing = acting === n.id || acting === 'all';
// // // // //               return (
// // // // //                 <div key={n.id}
// // // // //                      className={`flex items-start gap-4 p-4 transition-all hover:bg-[#f8fafc] fade-up ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
// // // // //                      style={{ animationDelay: `${i * 50}ms` }}>
// // // // //                   <div className="flex-1 flex items-start gap-4 cursor-pointer"
// // // // //                        onClick={() => !n.read && (async () => { setActing(n.id); await markOneRead(n.id); setActing(null); })()}>
// // // // //                     <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.bg }}>
// // // // //                       <Icon size={18} style={{ color: cfg.color }} />
// // // // //                     </div>
// // // // //                     <div className="flex-1 min-w-0">
// // // // //                       <div className="flex items-start justify-between gap-2">
// // // // //                         <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
// // // // //                           {n.title || cfg.label}
// // // // //                         </p>
// // // // //                         {!n.read && <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />}
// // // // //                       </div>
// // // // //                       <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.message || 'No details available'}</p>
// // // // //                       <div className="flex items-center gap-1 mt-1.5">
// // // // //                         <Clock size={10} className="text-gray-300" />
// // // // //                         <span className="text-[10px] text-gray-300">
// // // // //                           {n.createdDate
// // // // //                             ? new Date(n.createdDate).toLocaleDateString('en-GB',{ day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
// // // // //                             : 'Just now'}
// // // // //                         </span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <button
// // // // //                     onClick={(e) => { e.stopPropagation(); setActing(n.id); removeNotification(n.id).finally(() => setActing(null)); }}
// // // // //                     disabled={isActing}
// // // // //                     className="shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-all group disabled:opacity-50"
// // // // //                     title="Delete"
// // // // //                   >
// // // // //                     <Trash2 size={14} className="text-gray-300 group-hover:text-[#ef4444]" />
// // // // //                   </button>
// // // // //                 </div>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { useState } from 'react';
// // // // import {
// // // //   Bell, Package, CheckCircle, X, Info,
// // // //   AlertCircle, Clock, Trash2, RefreshCw        // ✅ added RefreshCw
// // // // } from 'lucide-react';
// // // // import { useNotifications } from '../../context/NotificationContext';  // ✅ corrected path

// // // // const TYPE_CFG = {
// // // //   CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'         },
// // // //   CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'    },
// // // //   CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'    },
// // // //   SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'     },
// // // //   ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'         },
// // // // };

// // // // function NotifSkeleton() {
// // // //   return (
// // // //     <div className="flex items-start gap-4 p-4 rounded-xl">
// // // //       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
// // // //       <div className="flex-1 space-y-2">
// // // //         <div className="h-4 w-48 rounded shimmer-bg" />
// // // //         <div className="h-3 w-full rounded shimmer-bg" />
// // // //         <div className="h-3 w-24 rounded shimmer-bg" />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function Notifications() {
// // // //   const {
// // // //     notifications,
// // // //     unreadCount,
// // // //     totalCount,
// // // //     loading,
// // // //     error,
// // // //     refresh,
// // // //     markOneRead,
// // // //     markAllRead,
// // // //     removeNotification,
// // // //   } = useNotifications();

// // // //   const [filter, setFilter] = useState('ALL');
// // // //   const [acting, setActing] = useState(null); // id or 'all'

// // // //   const filtered = filter === 'ALL'    ? notifications
// // // //                  : filter === 'UNREAD' ? notifications.filter(n => !n.read)
// // // //                  : notifications.filter(n => n.type === filter);

// // // //   return (
// // // //     <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
// // // //       {/* Header */}
// // // //       <div className="flex items-center justify-between gap-4 mb-6 fade-up">
// // // //         <div>
// // // //           <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
// // // //             Notifications
// // // //             {unreadCount > 0 && (
// // // //               <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-black flex items-center justify-center">
// // // //                 {unreadCount}
// // // //               </span>
// // // //             )}
// // // //           </h1>
// // // //           <p className="text-sm text-gray-400 mt-0.5">{totalCount} total · {unreadCount} unread</p>
// // // //         </div>
// // // //         <div className="flex gap-2">
// // // //           {unreadCount > 0 && (
// // // //             <button
// // // //               onClick={async () => { setActing('all'); await markAllRead(); setActing(null); }}
// // // //               disabled={acting === 'all'}
// // // //               className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
// // // //             >
// // // //               Mark all read
// // // //             </button>
// // // //           )}
// // // //           <button onClick={refresh} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
// // // //             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Filter pills */}
// // // //       <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
// // // //         {['ALL','UNREAD','CLAIM_REQUEST','CLAIM_APPROVED','CLAIM_REJECTED','SYSTEM_NOTIFICATION','ITEM_MATCHED'].map(f => (
// // // //           <button key={f} onClick={() => setFilter(f)}
// // // //                   className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f ? 'bg-[#1a56db] text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
// // // //             {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       {error && (
// // // //         <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // // //           <AlertCircle size={16} className="shrink-0" /> {error}
// // // //         </div>
// // // //       )}

// // // //       <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up" style={{ animationDelay: '80ms' }}>
// // // //         {loading ? (
// // // //           <div className="divide-y divide-[#f8fafc]">
// // // //             {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
// // // //           </div>
// // // //         ) : filtered.length === 0 ? (
// // // //           <div className="flex flex-col items-center py-20 text-center">
// // // //             <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
// // // //               <Bell size={28} className="text-gray-200" />
// // // //             </div>
// // // //             <p className="text-sm font-semibold text-gray-400 mb-1">No notifications</p>
// // // //             <p className="text-xs text-gray-300">
// // // //               {filter === 'UNREAD' ? 'All caught up!' : 'Nothing to show here yet.'}
// // // //             </p>
// // // //           </div>
// // // //         ) : (
// // // //           <div className="divide-y divide-[#f8fafc]">
// // // //             {filtered.map((n, i) => {
// // // //               const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
// // // //               const Icon = cfg.icon;
// // // //               const isActing = acting === n.id || acting === 'all';
// // // //               return (
// // // //                 <div key={n.id}
// // // //                      className={`flex items-start gap-4 p-4 transition-all hover:bg-[#f8fafc] fade-up ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
// // // //                      style={{ animationDelay: `${i * 50}ms` }}>
// // // //                   <div className="flex-1 flex items-start gap-4 cursor-pointer"
// // // //                        onClick={() => !n.read && (async () => { setActing(n.id); await markOneRead(n.id); setActing(null); })()}>
// // // //                     <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.bg }}>
// // // //                       <Icon size={18} style={{ color: cfg.color }} />
// // // //                     </div>
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <div className="flex items-start justify-between gap-2">
// // // //                         <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
// // // //                           {n.title || cfg.label}
// // // //                         </p>
// // // //                         {!n.read && <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />}
// // // //                       </div>
// // // //                       <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.message || 'No details available'}</p>
// // // //                       <div className="flex items-center gap-1 mt-1.5">
// // // //                         <Clock size={10} className="text-gray-300" />
// // // //                         <span className="text-[10px] text-gray-300">
// // // //                           {n.createdDate
// // // //                             ? new Date(n.createdDate).toLocaleDateString('en-GB',{ day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
// // // //                             : 'Just now'}
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                   <button
// // // //                     onClick={(e) => { e.stopPropagation(); setActing(n.id); removeNotification(n.id).finally(() => setActing(null)); }}
// // // //                     disabled={isActing}
// // // //                     className="shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-all group disabled:opacity-50"
// // // //                     title="Delete"
// // // //                   >
// // // //                     <Trash2 size={14} className="text-gray-300 group-hover:text-[#ef4444]" />
// // // //                   </button>
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState } from 'react';
// // // import {
// // //   Bell, Package, CheckCircle, X, Info,
// // //   AlertCircle, Clock, Trash2, RefreshCw
// // // } from 'lucide-react';
// // // import { useNotifications } from '../../context/NotificationContext';

// // // // ─── CSS animations (shimmer + fade) ──────────────────────────
// // // const SHIMMER_STYLE = `
// // //   @keyframes shimmer {
// // //     0%   { background-position: -400px 0; }
// // //     100% { background-position:  400px 0; }
// // //   }
// // //   @keyframes fadeUp {
// // //     from { opacity: 0; transform: translateY(10px); }
// // //     to   { opacity: 1; transform: translateY(0); }
// // //   }
// // //   .shimmer-bg {
// // //     background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
// // //     background-size: 400px 100%;
// // //     animation: shimmer 1.4s ease-in-out infinite;
// // //   }
// // //   .fade-up {
// // //     animation: fadeUp 0.35s ease-out forwards;
// // //   }
// // // `;

// // // const TYPE_CFG = {
// // //   CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'         },
// // //   CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'    },
// // //   CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'    },
// // //   SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'     },
// // //   ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'         },
// // // };

// // // function NotifSkeleton() {
// // //   return (
// // //     <div className="flex items-start gap-4 p-4 rounded-xl">
// // //       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
// // //       <div className="flex-1 space-y-2">
// // //         <div className="h-4 w-48 rounded shimmer-bg" />
// // //         <div className="h-3 w-full rounded shimmer-bg" />
// // //         <div className="h-3 w-24 rounded shimmer-bg" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function Notifications() {
// // //   const {
// // //     notifications,
// // //     unreadCount,
// // //     totalCount,
// // //     loading,
// // //     error,
// // //     refresh,
// // //     markOneRead,
// // //     markAllRead,
// // //     removeNotification,
// // //   } = useNotifications();

// // //   const [filter, setFilter] = useState('ALL');
// // //   const [acting, setActing] = useState(null);

// // //   const filtered = filter === 'ALL'
// // //     ? notifications
// // //     : filter === 'UNREAD'
// // //     ? notifications.filter(n => !n.read)
// // //     : notifications.filter(n => n.type === filter);

// // //   return (
// // //     <>
// // //       <style>{SHIMMER_STYLE}</style>
// // //       <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">

// // //         {/* ── Header ──────────────────────────────────────── */}
// // //         <div className="flex items-center justify-between gap-4 mb-6 fade-up">
// // //           <div>
// // //             <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
// // //               Notifications
// // //               {unreadCount > 0 && (
// // //                 <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-black flex items-center justify-center">
// // //                   {unreadCount}
// // //                 </span>
// // //               )}
// // //             </h1>
// // //             <p className="text-sm text-gray-400 mt-0.5">{totalCount} total · {unreadCount} unread</p>
// // //           </div>
// // //           <div className="flex gap-2">
// // //             {unreadCount > 0 && (
// // //               <button
// // //                 onClick={async () => { setActing('all'); await markAllRead(); setActing(null); }}
// // //                 disabled={acting === 'all'}
// // //                 className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
// // //               >
// // //                 Mark all read
// // //               </button>
// // //             )}
// // //             <button onClick={refresh} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
// // //               <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* ── Filter pills ────────────────────────────────── */}
// // //         <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
// // //           {['ALL','UNREAD','CLAIM_REQUEST','CLAIM_APPROVED','CLAIM_REJECTED','SYSTEM_NOTIFICATION','ITEM_MATCHED'].map(f => (
// // //             <button key={f} onClick={() => setFilter(f)}
// // //                     className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f ? 'bg-[#1a56db] text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
// // //               {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* ── Error ────────────────────────────────────────── */}
// // //         {error && (
// // //           <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// // //             <AlertCircle size={16} className="shrink-0" /> {error}
// // //           </div>
// // //         )}

// // //         {/* ── Main content ─────────────────────────────────── */}
// // //         <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up" style={{ animationDelay: '80ms' }}>
// // //           {loading ? (
// // //             <div className="divide-y divide-[#f8fafc]">
// // //               {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
// // //             </div>
// // //           ) : filtered.length === 0 ? (
// // //             <div className="flex flex-col items-center py-20 text-center">
// // //               <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
// // //                 <Bell size={28} className="text-gray-200" />
// // //               </div>
// // //               <p className="text-sm font-semibold text-gray-400 mb-1">No notifications</p>
// // //               <p className="text-xs text-gray-300">
// // //                 {filter === 'UNREAD' ? 'All caught up!' : 'Nothing to show here yet.'}
// // //               </p>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               {/* 🔥 TEMP DEBUG – shows raw data (remove after confirming) */}
// // //               <div className="bg-yellow-50 border-b border-yellow-200 p-3 text-xs font-mono text-yellow-800">
// // //                 ✅ Notifications loaded: {filtered.length} items
// // //               </div>

// // //               <div className="divide-y divide-[#f8fafc]">
// // //                 {filtered.map((n, i) => {
// // //                   const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
// // //                   const Icon = cfg.icon;
// // //                   const isActing = acting === n.id || acting === 'all';
// // //                   return (
// // //                     <div key={n.id}
// // //                          className={`flex items-start gap-4 p-4 transition-all hover:bg-[#f8fafc] fade-up ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
// // //                          style={{ animationDelay: `${i * 50}ms` }}>
// // //                       <div className="flex-1 flex items-start gap-4 cursor-pointer"
// // //                            onClick={() => !n.read && (async () => { setActing(n.id); await markOneRead(n.id); setActing(null); })()}>
// // //                         <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.bg }}>
// // //                           <Icon size={18} style={{ color: cfg.color }} />
// // //                         </div>
// // //                         <div className="flex-1 min-w-0">
// // //                           <div className="flex items-start justify-between gap-2">
// // //                             <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
// // //                               {n.title || cfg.label}
// // //                             </p>
// // //                             {!n.read && <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />}
// // //                           </div>
// // //                           <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.message || 'No details available'}</p>
// // //                           <div className="flex items-center gap-1 mt-1.5">
// // //                             <Clock size={10} className="text-gray-300" />
// // //                             <span className="text-[10px] text-gray-300">
// // //                               {n.createdDate
// // //                                 ? new Date(n.createdDate).toLocaleDateString('en-GB',{ day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
// // //                                 : 'Just now'}
// // //                             </span>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                       <button
// // //                         onClick={(e) => { e.stopPropagation(); setActing(n.id); removeNotification(n.id).finally(() => setActing(null)); }}
// // //                         disabled={isActing}
// // //                         className="shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-all group disabled:opacity-50"
// // //                         title="Delete"
// // //                       >
// // //                         <Trash2 size={14} className="text-gray-300 group-hover:text-[#ef4444]" />
// // //                       </button>
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </div>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // import { useState } from 'react';
// // import {
// //   Bell, Package, CheckCircle, X, Info,
// //   AlertCircle, Clock, Trash2, RefreshCw
// // } from 'lucide-react';
// // import { useNotifications } from '../../context/NotificationContext';
// // import { timeAgo } from '../../utils/timeAgo';

// // // Shimmer animation for loading skeletons
// // const SHIMMER_STYLE = `
// //   @keyframes shimmer {
// //     0%   { background-position: -400px 0; }
// //     100% { background-position:  400px 0; }
// //   }
// //   @keyframes fadeUp {
// //     from { opacity: 0; transform: translateY(10px); }
// //     to   { opacity: 1; transform: translateY(0); }
// //   }
// //   .shimmer-bg {
// //     background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
// //     background-size: 400px 100%;
// //     animation: shimmer 1.4s ease-in-out infinite;
// //   }
// //   .fade-up { animation: fadeUp 0.35s ease-out forwards; }
// // `;

// // const TYPE_CFG = {
// //   CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'         },
// //   CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'    },
// //   CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'    },
// //   SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'     },
// //   ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'         },
// // };

// // function NotifSkeleton() {
// //   return (
// //     <div className="flex items-start gap-4 p-4 rounded-xl">
// //       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
// //       <div className="flex-1 space-y-2">
// //         <div className="h-4 w-48 rounded shimmer-bg" />
// //         <div className="h-3 w-full rounded shimmer-bg" />
// //         <div className="h-3 w-24 rounded shimmer-bg" />
// //       </div>
// //     </div>
// //   );
// // }

// // export default function Notifications() {
// //   const {
// //     notifications,
// //     unreadCount,
// //     totalCount,
// //     loading,
// //     error,
// //     refresh,
// //     markOneRead,
// //     markAllRead,
// //     removeNotification,
// //   } = useNotifications();

// //   const [filter, setFilter] = useState('ALL');
// //   const [acting, setActing] = useState(null); // 'all' or notification id

// //   const filtered = filter === 'ALL'
// //     ? notifications
// //     : filter === 'UNREAD'
// //     ? notifications.filter(n => !n.read)
// //     : notifications.filter(n => n.type === filter);

// //   return (
// //     <>
// //       <style>{SHIMMER_STYLE}</style>
// //       <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">

// //         {/* Header */}
// //         <div className="flex items-center justify-between gap-4 mb-6 fade-up">
// //           <div>
// //             <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
// //               Notifications
// //               {unreadCount > 0 && (
// //                 <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-black flex items-center justify-center">
// //                   {unreadCount}
// //                 </span>
// //               )}
// //             </h1>
// //             <p className="text-sm text-gray-400 mt-0.5">{totalCount} total · {unreadCount} unread</p>
// //           </div>
// //           <div className="flex gap-2">
// //             {unreadCount > 0 && (
// //               <button
// //                 onClick={async () => { setActing('all'); await markAllRead(); setActing(null); }}
// //                 disabled={acting === 'all'}
// //                 className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
// //               >
// //                 Mark all read
// //               </button>
// //             )}
// //             <button onClick={refresh} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
// //               <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Filter pills */}
// //         <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
// //           {['ALL','UNREAD','CLAIM_REQUEST','CLAIM_APPROVED','CLAIM_REJECTED','SYSTEM_NOTIFICATION','ITEM_MATCHED'].map(f => (
// //             <button key={f} onClick={() => setFilter(f)}
// //                     className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f ? 'bg-[#1a56db] text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
// //               {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Error */}
// //         {error && (
// //           <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
// //             <AlertCircle size={16} className="shrink-0" /> {error}
// //           </div>
// //         )}

// //         {/* Notifications list */}
// //         <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up" style={{ animationDelay: '80ms' }}>
// //           {loading ? (
// //             <div className="divide-y divide-[#f8fafc]">
// //               {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
// //             </div>
// //           ) : filtered.length === 0 ? (
// //             <div className="flex flex-col items-center py-20 text-center">
// //               <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
// //                 <Bell size={28} className="text-gray-200" />
// //               </div>
// //               <p className="text-sm font-semibold text-gray-400 mb-1">No notifications yet.</p>
// //               <p className="text-xs text-gray-300 max-w-xs">
// //                 You'll receive updates when someone interacts with your lost or found items.
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="divide-y divide-[#f8fafc]">
// //               {filtered.map((n, i) => {
// //                 const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
// //                 const Icon = cfg.icon;
// //                 const isActing = acting === n.id || acting === 'all';
// //                 return (
// //                   <div key={n.id}
// //                        className={`flex items-start gap-4 p-4 transition-all hover:bg-[#f8fafc] fade-up ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
// //                        style={{ animationDelay: `${i * 50}ms` }}>
// //                     {/* Click to mark read */}
// //                     <div
// //                       className="flex-1 flex items-start gap-4 cursor-pointer"
// //                       onClick={() => !n.read && (async () => { setActing(n.id); await markOneRead(n.id); setActing(null); })()}
// //                     >
// //                       <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.bg }}>
// //                         <Icon size={18} style={{ color: cfg.color }} />
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <div className="flex items-start justify-between gap-2">
// //                           <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
// //                             {n.title || cfg.label}
// //                           </p>
// //                           {!n.read && (
// //                             <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />
// //                           )}
// //                         </div>
// //                         <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.message || 'No details available'}</p>
// //                         <div className="flex items-center gap-1 mt-1.5">
// //                           <Clock size={10} className="text-gray-300" />
// //                           <span className="text-[10px] text-gray-300">
// //                             {n.createdDate ? timeAgo(n.createdDate) : 'Just now'}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Delete button */}
// //                     <button
// //                       onClick={(e) => { e.stopPropagation(); setActing(n.id); removeNotification(n.id).finally(() => setActing(null)); }}
// //                       disabled={isActing}
// //                       className="shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-all group disabled:opacity-50"
// //                       title="Delete"
// //                     >
// //                       <Trash2 size={14} className="text-gray-300 group-hover:text-[#ef4444]" />
// //                     </button>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// import { useState } from 'react';
// import {
//   Bell, Package, CheckCircle, X, Info,
//   AlertCircle, Clock, Trash2, RefreshCw
// } from 'lucide-react';
// import { useNotifications } from '../../context/NotificationContext';
// import { timeAgo } from '../../utils/timeAgo';

// const SHIMMER_STYLE = `
//   @keyframes shimmer {
//     0%   { background-position: -400px 0; }
//     100% { background-position:  400px 0; }
//   }
//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(10px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   .shimmer-bg {
//     background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
//     background-size: 400px 100%;
//     animation: shimmer 1.4s ease-in-out infinite;
//   }
//   .fade-up {
//     animation: fadeUp 0.35s ease-out forwards;
//   }
// `;

// const TYPE_CFG = {
//   CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'         },
//   CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'    },
//   CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'    },
//   SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'     },
//   ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'         },
// };

// function NotifSkeleton() {
//   return (
//     <div className="flex items-start gap-4 p-4 rounded-xl">
//       <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
//       <div className="flex-1 space-y-2">
//         <div className="h-4 w-48 rounded shimmer-bg" />
//         <div className="h-3 w-full rounded shimmer-bg" />
//         <div className="h-3 w-24 rounded shimmer-bg" />
//       </div>
//     </div>
//   );
// }

// export default function Notifications() {   // 👈 THIS LINE MUST BE EXACTLY "export default function"
//   const {
//     notifications,
//     unreadCount,
//     totalCount,
//     loading,
//     error,
//     refresh,
//     markOneRead,
//     markAllRead,
//     removeNotification,
//   } = useNotifications();

//   const [filter, setFilter] = useState('ALL');
//   const [acting, setActing] = useState(null);

//   const filtered = filter === 'ALL'    ? notifications
//                  : filter === 'UNREAD' ? notifications.filter(n => !n.read)
//                  : notifications.filter(n => n.type === filter);

//   return (
//     <>
//       <style>{SHIMMER_STYLE}</style>
//       <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
//         {/* … rest of the component identical to earlier final version … */}
//       </div>
//     </>
//   );
// }

import { useState } from 'react';
import {
  Bell, Package, CheckCircle, X, Info,
  AlertCircle, Clock, Trash2, RefreshCw
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { timeAgo } from '../../utils/timeAgo';

const SHIMMER_STYLE = `
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .shimmer-bg {
    background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s ease-in-out infinite;
  }
  .fade-up {
    animation: fadeUp 0.35s ease-out forwards;
  }
`;

const TYPE_CFG = {
  CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'         },
  CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'    },
  CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'    },
  SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'     },
  ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'         },
};

function NotifSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl">
      <div className="w-11 h-11 rounded-xl shimmer-bg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-48 rounded shimmer-bg" />
        <div className="h-3 w-full rounded shimmer-bg" />
        <div className="h-3 w-24 rounded shimmer-bg" />
      </div>
    </div>
  );
}

export default function Notifications() {
  const {
    notifications,
    unreadCount,
    totalCount,
    loading,
    error,
    refresh,
    markOneRead,
    markAllRead,
    removeNotification,
  } = useNotifications();

  const [filter, setFilter] = useState('ALL');
  const [acting, setActing] = useState(null);

  const filtered = filter === 'ALL'    ? notifications
                 : filter === 'UNREAD' ? notifications.filter(n => !n.read)
                 : notifications.filter(n => n.type === filter);

  return (
    <>
      <style>{SHIMMER_STYLE}</style>
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 fade-up">
          <div>
            <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-black flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">{totalCount} total · {unreadCount} unread</p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={async () => { setActing('all'); await markAllRead(); setActing(null); }}
                disabled={acting === 'all'}
                className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Mark all read
              </button>
            )}
            <button onClick={refresh} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
          {['ALL','UNREAD','CLAIM_REQUEST','CLAIM_APPROVED','CLAIM_REJECTED','SYSTEM_NOTIFICATION','ITEM_MATCHED'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f ? 'bg-[#1a56db] text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {f === 'ALL' ? 'All' : f.replace(/_/g,' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            <AlertCircle size={16} className="shrink-0" /> {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden fade-up" style={{ animationDelay: '80ms' }}>
          {loading ? (
            <div className="divide-y divide-[#f8fafc]">
              {Array.from({ length: 5 }).map((_, i) => <NotifSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <Bell size={28} className="text-gray-200" />
              </div>
              <p className="text-sm font-semibold text-gray-400 mb-1">No notifications yet.</p>
              <p className="text-xs text-gray-300 max-w-xs">
                You'll receive updates when someone interacts with your lost or found items.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#f8fafc]">
              {filtered.map((n, i) => {
                const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
                const Icon = cfg.icon;
                const isActing = acting === n.id || acting === 'all';
                return (
                  <div key={n.id}
                       className={`flex items-start gap-4 p-4 transition-all hover:bg-[#f8fafc] fade-up ${!n.read ? 'bg-[#eff6ff]/40' : ''}`}
                       style={{ animationDelay: `${i * 50}ms` }}>
                    <div className="flex-1 flex items-start gap-4 cursor-pointer"
                         onClick={() => !n.read && (async () => { setActing(n.id); await markOneRead(n.id); setActing(null); })()}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.bg }}>
                        <Icon size={18} style={{ color: cfg.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
                            {n.title || cfg.label}
                          </p>
                          {!n.read && <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.message || 'No details available'}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Clock size={10} className="text-gray-300" />
                          <span className="text-[10px] text-gray-300">
                            {n.createdDate ? timeAgo(n.createdDate) : 'Just now'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActing(n.id); removeNotification(n.id).finally(() => setActing(null)); }}
                      disabled={isActing}
                      className="shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-all group disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={14} className="text-gray-300 group-hover:text-[#ef4444]" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

