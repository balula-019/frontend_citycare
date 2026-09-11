// import { useState, useEffect } from 'react';
// import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard, PlusCircle, Users, LogOut,
//   ChevronLeft, ChevronRight, Search, Menu, X, ShieldCheck,
//   UserCircle, Package   // ✅ Package icon added
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const NAV = [
//   { to: '/admin/dashboard',    icon: LayoutDashboard, label: 'Dashboard'            },
//   { to: '/admin/create-org',   icon: PlusCircle,      label: 'Create Organisation'  },
//   { to: '/admin/manage-users', icon: Users,           label: 'Manage Users'         },
//   { to: '/admin/items',        icon: Package,         label: 'Manage Items'         },   // ✅ new
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
//   .glass {
//     background: rgba(255,255,255,0.85);
//     backdrop-filter: blur(12px);
//     -webkit-backdrop-filter: blur(12px);
//   }
//   .nav-link { transition: all 0.18s ease; }
//   .nav-link:hover .nav-icon { transform: scale(1.12); }
//   .card-hover { transition: all 0.22s ease; }
//   .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
//   ::-webkit-scrollbar { width: 5px; }
//   ::-webkit-scrollbar-track { background: transparent; }
//   ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
// `;

// export default function AdminLayout() {
//   const { user, logout } = useAuth();
//   const navigate  = useNavigate();
//   const location  = useLocation();
//   const [collapsed,   setCollapsed]   = useState(false);
//   const [mobileOpen,  setMobileOpen]  = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const adminName = user?.name || 'Administrator';
//   const initials  = adminName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

//   const handleLogout = () => {
//     logout();
//     setTimeout(() => navigate('/login', { replace: true }), 200);
//   };

//   const goToProfile = () => navigate('/admin/profile');

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
//       <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a56db] via-[#6366f1] to-[#22c55e]" />

//       <div className={`flex items-center gap-3 px-4 pt-6 pb-5 border-b border-white/8
//                         ${collapsed && !mobile ? 'justify-center px-2' : ''}`}>
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
//                         flex items-center justify-center shrink-0 shadow-lg">
//           <ShieldCheck size={17} className="text-white" />
//         </div>
//         {(!collapsed || mobile) && (
//           <div className="slide-in min-w-0">
//             <p className="font-black text-sm text-white truncate">PataChako</p>
//             <p className="text-[10px] text-white/40 font-medium">Admin Control Panel</p>
//           </div>
//         )}
//         {!mobile && (
//           <button
//             onClick={() => setCollapsed(p => !p)}
//             className="ml-auto w-6 h-6 rounded-lg bg-white/8 hover:bg-white/15
//                        flex items-center justify-center transition-all shrink-0"
//           >
//             {collapsed ? <ChevronRight size={13} className="text-white/60" /> : <ChevronLeft size={13} className="text-white/60" />}
//           </button>
//         )}
//       </div>

//       <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
//         {NAV.map(({ to, icon: Icon, label }) => {
//           const active = location.pathname === to || (to !== '/admin/dashboard' && location.pathname.startsWith(to));
//           return (
//             <NavLink key={to} to={to}
//               className={`nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl group relative
//                           ${active ? 'bg-gradient-to-r from-[#1a56db] to-[#1547c0] text-white shadow-lg shadow-blue-900/30'
//                                     : 'text-white/55 hover:text-white hover:bg-white/8'}
//                           ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
//               title={collapsed && !mobile ? label : undefined}
//             >
//               <Icon size={18} className="nav-icon shrink-0 transition-transform duration-200" />
//               {(!collapsed || mobile) && <span className="text-sm font-medium truncate">{label}</span>}
//             </NavLink>
//           );
//         })}
//       </nav>

//       {/* User section – now clickable to go to profile */}
//       <div className={`border-t border-white/8 p-3 ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
//         {collapsed && !mobile ? (
//           <button onClick={goToProfile} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all">
//             <UserCircle size={16} className="text-white/60" />
//           </button>
//         ) : (
//           <div className="flex items-center gap-3">
//             <button
//               onClick={goToProfile}
//               className="flex items-center gap-3 flex-1 min-w-0 text-left hover:bg-white/5 rounded-lg p-1 -m-1 transition-all"
//             >
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db]/60 to-[#6366f1]/60 flex items-center justify-center text-white text-xs font-black shrink-0">
//                 {initials}
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="text-xs font-semibold text-white truncate">{adminName}</p>
//                 <p className="text-[10px] text-white/40">View profile</p>
//               </div>
//             </button>
//             <button onClick={handleLogout}
//                     className="w-7 h-7 rounded-lg hover:bg-red-500/20 flex items-center justify-center transition-all group shrink-0">
//               <LogOut size={14} className="text-white/40 group-hover:text-red-400 transition-colors" />
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

//         <div className="hidden md:flex h-full">
//           <Sidebar />
//         </div>

//         {mobileOpen && (
//           <div className="fixed inset-0 z-50 flex md:hidden">
//             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
//             <div className="relative z-10 h-full scale-in">
//               <Sidebar mobile />
//             </div>
//             <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
//               <X size={18} className="text-white" />
//             </button>
//           </div>
//         )}

//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//           <header className="glass border-b border-[#e2e8f0] px-4 sm:px-6 h-16 flex items-center gap-4 shrink-0 z-30">
//             <button onClick={() => setMobileOpen(true)} className="md:hidden w-9 h-9 rounded-xl border border-[#e2e8f0] flex items-center justify-center hover:bg-gray-50 transition-all">
//               <Menu size={18} className="text-gray-600" />
//             </button>

//             <div className="flex-1 max-w-md relative">
//               <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 placeholder="Search organisations, users…"
//                 className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[#e2e8f0] bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none transition-all"
//               />
//             </div>

//             <div className="flex items-center gap-2 ml-auto">
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
//                               flex items-center justify-center text-white text-xs font-black shadow-sm">
//                 {initials}
//               </div>
//             </div>
//           </header>

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
  LayoutDashboard, PlusCircle, Users, LogOut,
  ChevronLeft, ChevronRight, Search, Menu, X, ShieldCheck,
  UserCircle, Package, Handshake   // ✅ Handshake icon added
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/admin/dashboard',         icon: LayoutDashboard, label: 'Dashboard'            },
  { to: '/admin/create-org',        icon: PlusCircle,      label: 'Create Organisation'  },
  { to: '/admin/manage-users',      icon: Users,           label: 'Manage Users'         },
  { to: '/admin/items',             icon: Package,         label: 'Manage Items'         },
  { to: '/admin/partner-requests',  icon: Handshake,       label: 'Partner Requests'     },  // ✅ new
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
  .glass {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .nav-link { transition: all 0.18s ease; }
  .nav-link:hover .nav-icon { transform: scale(1.12); }
  .card-hover { transition: all 0.22s ease; }
  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
`;

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const adminName = user?.name || 'Administrator';
  const initials  = adminName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate('/login', { replace: true }), 200);
  };

  const goToProfile = () => navigate('/admin/profile');

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
          <ShieldCheck size={17} className="text-white" />
        </div>
        {(!collapsed || mobile) && (
          <div className="slide-in min-w-0">
            <p className="font-black text-sm text-white truncate">PataChako</p>
            <p className="text-[10px] text-white/40 font-medium">Admin Control Panel</p>
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
          const active = location.pathname === to || (to !== '/admin/dashboard' && location.pathname.startsWith(to));
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
            </NavLink>
          );
        })}
      </nav>

      <div className={`border-t border-white/8 p-3 ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
        {collapsed && !mobile ? (
          <button onClick={goToProfile} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all">
            <UserCircle size={16} className="text-white/60" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={goToProfile}
              className="flex items-center gap-3 flex-1 min-w-0 text-left hover:bg-white/5 rounded-lg p-1 -m-1 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db]/60 to-[#6366f1]/60 flex items-center justify-center text-white text-xs font-black shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{adminName}</p>
                <p className="text-[10px] text-white/40">View profile</p>
              </div>
            </button>
            <button onClick={handleLogout}
                    className="w-7 h-7 rounded-lg hover:bg-red-500/20 flex items-center justify-center transition-all group shrink-0">
              <LogOut size={14} className="text-white/40 group-hover:text-red-400 transition-colors" />
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
                placeholder="Search organisations, users…"
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[#e2e8f0] bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#6366f1]
                              flex items-center justify-center text-white text-xs font-black shadow-sm">
                {initials}
              </div>
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