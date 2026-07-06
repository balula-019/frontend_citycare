// import { useState, useEffect } from 'react';
// import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard, PlusCircle, Package, Clock, CheckCircle,
//   Trophy, Bell, BarChart3, User, Settings, LogOut,
//   ChevronLeft, ChevronRight, Search, Menu, X, Sparkles
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const NAV = [
//   { to: '/org/dashboard',        icon: LayoutDashboard, label: 'Dashboard'        },
//   { to: '/org/publish',          icon: PlusCircle,      label: 'Publish Item'     },
//   { to: '/org/items',            icon: Package,         label: 'My Items'         },
//   { to: '/org/claims/pending',   icon: Clock,           label: 'Pending Claims'   },
//   { to: '/org/claims/approved',  icon: CheckCircle,     label: 'Approved Claims'  },
//   { to: '/org/claims/completed', icon: Trophy,          label: 'Completed Claims' },
//   { to: '/org/notifications',    icon: Bell,            label: 'Notifications'    },
//   { to: '/org/analytics',        icon: BarChart3,       label: 'Analytics'        },
//   { to: '/org/profile',          icon: User,            label: 'Profile'          },
//   { to: '/org/settings',         icon: Settings,        label: 'Settings'         },
// ];

// const STYLES = `
//   @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
//   .shimmer-bg {
//     background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
//     background-size: 400px 100%; animation: shimmer 1.4s ease-in-out infinite;
//   }
//   @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
//   .fade-up { animation: fadeUp 0.38s ease-out forwards; }
//   @keyframes slideIn { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
//   .slide-in { animation: slideIn 0.32s ease-out forwards; }
//   @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
//   .scale-in { animation: scaleIn 0.28s ease-out forwards; }
//   @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
//   .count-up { animation: countUp 0.5s ease-out forwards; }
//   .glass {
//     background: rgba(255,255,255,0.85);
//     backdrop-filter: blur(12px);
//     -webkit-backdrop-filter: blur(12px);
//   }
//   .nav-link { transition: all 0.18s ease; }
//   .nav-link:hover .nav-icon { transform: scale(1.12); }
//   .card-hover { transition: all 0.22s ease; }
//   .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
//   .btn-primary { transition: all 0.18s ease; }
//   .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(26,86,219,0.35); }
//   .btn-primary:active { transform: scale(0.97); }
//   ::-webkit-scrollbar { width: 5px; }
//   ::-webkit-scrollbar-track { background: transparent; }
//   ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
// `;

// export default function OrgLayout() {
//   const { user, logout, loggingOut } = useAuth();
//   const navigate  = useNavigate();
//   const location  = useLocation();
//   const [collapsed,    setCollapsed]    = useState(false);
//   const [mobileOpen,   setMobileOpen]   = useState(false);
//   const [searchQuery,  setSearchQuery]  = useState('');
//   const [notifCount,   setNotifCount]   = useState(5);

//   const orgName   = user?.organizationName || user?.name || 'Organisation';
//   const initials  = orgName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

//   const handleLogout = async () => { await logout(); navigate('/login'); };

//   // Close mobile drawer on route change
//   useEffect(() => { setMobileOpen(false); }, [location.pathname]);

//   const Sidebar = ({ mobile = false }) => (
//     <aside
//       className={`
//         flex flex-col h-full
//         ${mobile ? 'w-72' : collapsed ? 'w-[72px]' : 'w-64'}
//         transition-all duration-300
//         bg-[#0f172a] text-white relative overflow-hidden
//       `}
//     >
//       {/* Gradient accent top */}
//       <div className="absolute top-0 left-0 right-0 h-1
//                       bg-gradient-to-r from-[#1a56db] via-[#6366f1] to-[#22c55e]" />

//       {/* Logo area */}
//       <div className={`flex items-center gap-3 px-4 pt-6 pb-5 border-b border-white/8
//                         ${collapsed && !mobile ? 'justify-center px-2' : ''}`}>
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
//                         flex items-center justify-center shrink-0 shadow-lg">
//           <Sparkles size={17} className="text-white" />
//         </div>
//         {(!collapsed || mobile) && (
//           <div className="slide-in min-w-0">
//             <p className="font-black text-sm text-white truncate">{orgName}</p>
//             <p className="text-[10px] text-white/40 font-medium">Organization Portal</p>
//           </div>
//         )}
//         {!mobile && (
//           <button
//             onClick={() => setCollapsed(p => !p)}
//             className="ml-auto w-6 h-6 rounded-lg bg-white/8 hover:bg-white/15
//                        flex items-center justify-center transition-all shrink-0"
//           >
//             {collapsed
//               ? <ChevronRight size={13} className="text-white/60" />
//               : <ChevronLeft  size={13} className="text-white/60" />}
//           </button>
//         )}
//       </div>

//       {/* Nav items */}
//       <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
//         {NAV.map(({ to, icon: Icon, label }) => {
//           const active = location.pathname === to ||
//                          (to !== '/org/dashboard' && location.pathname.startsWith(to));
//           return (
//             <NavLink key={to} to={to}
//               className={`nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl
//                           group relative
//                           ${active
//                             ? 'bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white shadow-lg shadow-blue-900/30'
//                             : 'text-white/55 hover:text-white hover:bg-white/8'}
//                           ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
//               title={collapsed && !mobile ? label : undefined}
//             >
//               <Icon size={18} className="nav-icon shrink-0 transition-transform duration-200" />
//               {(!collapsed || mobile) && (
//                 <span className="text-sm font-medium truncate">{label}</span>
//               )}
//               {/* Notification badge */}
//               {label === 'Notifications' && notifCount > 0 && (
//                 <span className={`${collapsed && !mobile ? 'absolute top-1 right-1' : 'ml-auto'}
//                                   w-5 h-5 rounded-full bg-[#ef4444] text-white text-[10px]
//                                   font-black flex items-center justify-center`}>
//                   {notifCount}
//                 </span>
//               )}
//             </NavLink>
//           );
//         })}
//       </nav>

//       {/* User + logout */}
//       <div className={`border-t border-white/8 p-3
//                         ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
//         {collapsed && !mobile ? (
//           <button onClick={handleLogout}
//                   className="w-9 h-9 rounded-xl bg-white/8 hover:bg-red-500/20
//                              flex items-center justify-center transition-all">
//             <LogOut size={16} className="text-white/60" />
//           </button>
//         ) : (
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db]/60 to-[#6366f1]/60
//                             flex items-center justify-center text-white text-xs font-black shrink-0">
//               {initials}
//             </div>
//             <div className="min-w-0 flex-1">
//               <p className="text-xs font-semibold text-white truncate">{orgName}</p>
//               <p className="text-[10px] text-white/40">Organization</p>
//             </div>
//             <button onClick={handleLogout} disabled={loggingOut}
//                     className="w-7 h-7 rounded-lg hover:bg-red-500/20 flex items-center
//                                justify-center transition-all group shrink-0">
//               <LogOut size={14}
//                       className={`group-hover:text-red-400 transition-colors
//                                   ${loggingOut ? 'animate-spin text-white/30' : 'text-white/40'}`} />
//             </button>
//           </div>
//         )}
//       </div>
//     </aside>
//   );

//   return (
//     <>
//       <style>{STYLES}</style>
//       <div className="h-screen flex bg-[#f8fafc] overflow-hidden">

//         {/* Desktop sidebar */}
//         <div className="hidden md:flex h-full">
//           <Sidebar />
//         </div>

//         {/* Mobile overlay */}
//         {mobileOpen && (
//           <div className="fixed inset-0 z-50 flex md:hidden">
//             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//                  onClick={() => setMobileOpen(false)} />
//             <div className="relative z-10 h-full scale-in">
//               <Sidebar mobile />
//             </div>
//             <button onClick={() => setMobileOpen(false)}
//                     className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl
//                                bg-white/10 flex items-center justify-center">
//               <X size={18} className="text-white" />
//             </button>
//           </div>
//         )}

//         {/* Main content area */}
//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

//           {/* Top navbar */}
//           <header className="glass border-b border-[#e2e8f0] px-4 sm:px-6
//                              h-16 flex items-center gap-4 shrink-0 z-30">
//             {/* Mobile menu toggle */}
//             <button onClick={() => setMobileOpen(true)}
//                     className="md:hidden w-9 h-9 rounded-xl border border-[#e2e8f0]
//                                flex items-center justify-center hover:bg-gray-50 transition-all">
//               <Menu size={18} className="text-gray-600" />
//             </button>

//             {/* Search */}
//             <div className="flex-1 max-w-md relative">
//               <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 placeholder="Search items, claims, owners…"
//                 className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[#e2e8f0]
//                            bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#1a56db]/20
//                            focus:border-[#1a56db] outline-none transition-all"
//               />
//             </div>

//             <div className="flex items-center gap-2 ml-auto">
//               {/* Notification bell */}
//               <button className="relative w-9 h-9 rounded-xl border border-[#e2e8f0]
//                                  flex items-center justify-center hover:bg-gray-50 transition-all"
//                       onClick={() => navigate('/org/notifications')}>
//                 <Bell size={17} className="text-gray-600" />
//                 {notifCount > 0 && (
//                   <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full
//                                    bg-[#ef4444] text-white text-[9px] font-black
//                                    flex items-center justify-center min-w-[18px] min-h-[18px]
//                                    px-1">
//                     {notifCount}
//                   </span>
//                 )}
//               </button>

//               {/* Avatar */}
//               <button onClick={() => navigate('/org/profile')}
//                       className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
//                                  flex items-center justify-center text-white text-xs font-black
//                                  hover:opacity-90 transition-all shadow-sm">
//                 {initials}
//               </button>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="flex-1 overflow-y-auto">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, PlusCircle, Package, FileText, Bell,
  BarChart3, User, Settings, LogOut,
  ChevronLeft, ChevronRight, Search, Menu, X, Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/org/dashboard',        icon: LayoutDashboard, label: 'Dashboard'        },
  { to: '/org/publish',          icon: PlusCircle,      label: 'Publish Item'     },
  { to: '/org/items',            icon: Package,         label: 'My Items'         },
  { to: '/org/claims',           icon: FileText,        label: 'Claims'           },  // ✅ single Claims
  { to: '/org/notifications',    icon: Bell,            label: 'Notifications'    },
  { to: '/org/analytics',        icon: BarChart3,       label: 'Analytics'        },
  { to: '/org/profile',          icon: User,            label: 'Profile'          },
  { to: '/org/settings',         icon: Settings,        label: 'Settings'         },
];

const STYLES = `
  @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  .shimmer-bg {
    background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
    background-size: 400px 100%; animation: shimmer 1.4s ease-in-out infinite;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .fade-up { animation: fadeUp 0.38s ease-out forwards; }
  @keyframes slideIn { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
  .slide-in { animation: slideIn 0.32s ease-out forwards; }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
  .scale-in { animation: scaleIn 0.28s ease-out forwards; }
  @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .count-up { animation: countUp 0.5s ease-out forwards; }
  .glass {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .nav-link { transition: all 0.18s ease; }
  .nav-link:hover .nav-icon { transform: scale(1.12); }
  .card-hover { transition: all 0.22s ease; }
  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
  .btn-primary { transition: all 0.18s ease; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(26,86,219,0.35); }
  .btn-primary:active { transform: scale(0.97); }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
`;

export default function OrgLayout() {
  const { user, logout, loggingOut } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [collapsed,    setCollapsed]    = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [notifCount,   setNotifCount]   = useState(5);

  const orgName   = user?.organizationName || user?.name || 'Organisation';
  const initials  = orgName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const handleLogout = async () => { await logout(); navigate('/login'); };

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`
        flex flex-col h-full
        ${mobile ? 'w-72' : collapsed ? 'w-[72px]' : 'w-64'}
        transition-all duration-300
        bg-[#0f172a] text-white relative overflow-hidden
      `}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a56db] via-[#6366f1] to-[#22c55e]" />

      <div className={`flex items-center gap-3 px-4 pt-6 pb-5 border-b border-white/8
                        ${collapsed && !mobile ? 'justify-center px-2' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
                        flex items-center justify-center shrink-0 shadow-lg">
          <Sparkles size={17} className="text-white" />
        </div>
        {(!collapsed || mobile) && (
          <div className="slide-in min-w-0">
            <p className="font-black text-sm text-white truncate">{orgName}</p>
            <p className="text-[10px] text-white/40 font-medium">Organization Portal</p>
          </div>
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(p => !p)}
            className="ml-auto w-6 h-6 rounded-lg bg-white/8 hover:bg-white/15
                       flex items-center justify-center transition-all shrink-0"
          >
            {collapsed ? <ChevronRight size={13} className="text-white/60" /> : <ChevronLeft size={13} className="text-white/60" />}
          </button>
        )}
      </div>

      <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to || (to !== '/org/dashboard' && location.pathname.startsWith(to));
          return (
            <NavLink key={to} to={to}
              className={`nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl group relative
                          ${active ? 'bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white shadow-lg shadow-blue-900/30'
                                    : 'text-white/55 hover:text-white hover:bg-white/8'}
                          ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
              title={collapsed && !mobile ? label : undefined}
            >
              <Icon size={18} className="nav-icon shrink-0 transition-transform duration-200" />
              {(!collapsed || mobile) && <span className="text-sm font-medium truncate">{label}</span>}
              {label === 'Notifications' && notifCount > 0 && (
                <span className={`${collapsed && !mobile ? 'absolute top-1 right-1' : 'ml-auto'} w-5 h-5 rounded-full bg-[#ef4444] text-white text-[10px] font-black flex items-center justify-center`}>
                  {notifCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className={`border-t border-white/8 p-3 ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
        {collapsed && !mobile ? (
          <button onClick={handleLogout} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-red-500/20 flex items-center justify-center transition-all">
            <LogOut size={16} className="text-white/60" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db]/60 to-[#6366f1]/60 flex items-center justify-center text-white text-xs font-black shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{orgName}</p>
              <p className="text-[10px] text-white/40">Organization</p>
            </div>
            <button onClick={handleLogout} disabled={loggingOut}
                    className="w-7 h-7 rounded-lg hover:bg-red-500/20 flex items-center justify-center transition-all group shrink-0">
              <LogOut size={14} className={`group-hover:text-red-400 transition-colors ${loggingOut ? 'animate-spin text-white/30' : 'text-white/40'}`} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      <style>{STYLES}</style>
      <div className="h-screen flex bg-[#f8fafc] overflow-hidden">

        <div className="hidden md:flex h-full">
          <Sidebar />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative z-10 h-full scale-in">
              <Sidebar mobile />
            </div>
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <X size={18} className="text-white" />
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="glass border-b border-[#e2e8f0] px-4 sm:px-6 h-16 flex items-center gap-4 shrink-0 z-30">
            <button onClick={() => setMobileOpen(true)} className="md:hidden w-9 h-9 rounded-xl border border-[#e2e8f0] flex items-center justify-center hover:bg-gray-50 transition-all">
              <Menu size={18} className="text-gray-600" />
            </button>

            <div className="flex-1 max-w-md relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search items, claims, owners…"
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[#e2e8f0] bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button className="relative w-9 h-9 rounded-xl border border-[#e2e8f0] flex items-center justify-center hover:bg-gray-50 transition-all"
                      onClick={() => navigate('/org/notifications')}>
                <Bell size={17} className="text-gray-600" />
                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#ef4444] text-white text-[9px] font-black flex items-center justify-center min-w-[18px] min-h-[18px] px-1">
                    {notifCount}
                  </span>
                )}
              </button>

              <button onClick={() => navigate('/org/profile')}
                      className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1] flex items-center justify-center text-white text-xs font-black hover:opacity-90 transition-all shadow-sm">
                {initials}
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}