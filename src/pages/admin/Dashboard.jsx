import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users, Building2, FileText, ShieldCheck, TrendingUp,
  LogOut, RefreshCw, AlertCircle, LayoutDashboard,
  UserPlus, PlusCircle, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAdminStats } from '../../api/admin';

/* ── Progress bar stat ────────────────────────────────────────── */
function ProgressStat({ label, value, max, color }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t); }, []);
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div>
      <div className="flex justify-between mb-1.5 text-xs">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="font-bold" style={{ color }}>{value?.toLocaleString() ?? '—'}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
             style={{ width: ready ? `${pct}%` : '0%', backgroundColor: color }} />
      </div>
    </div>
  );
}

/* ── Stat card ────────────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, color, loading }) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
           style={{ backgroundColor: `${color}18` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        {loading ? (
          <div className="h-7 w-16 rounded shimmer-bg mb-1" />
        ) : (
          <p className="text-2xl font-bold text-[#0f172a]">{value ?? '—'}</p>
        )}
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

/* ── Quick action ─────────────────────────────────────────────── */
function QuickAction({ label, desc, icon: Icon, color, to }) {
  return (
    <Link to={to}
          className="flex items-center gap-4 p-4 bg-white border border-[#e2e8f0]
                     rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all group">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
           style={{ backgroundColor: `${color}18` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0f172a] group-hover:text-[#1a56db] transition-colors">
          {label}
        </p>
        <p className="text-xs text-gray-400 truncate">{desc}</p>
      </div>
      <Activity size={14} className="text-gray-300 group-hover:text-[#1a56db] transition-colors shrink-0" />
    </Link>
  );
}

/* ── Main dashboard ───────────────────────────────────────────── */
export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Call real endpoint if it exists; otherwise gracefully degrade
      const res = await getAdminStats();
      setStats(res?.data || res);
    } catch (err) {
      // If the endpoint doesn't exist yet, show zeros rather than a hard error
      if (err?.status === 404 || err?.response?.status === 404) {
        setStats({ users: 0, organisations: 0, reports: 0, matches: 0 });
      } else {
        setError(err.message || 'Failed to load stats.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const totalForChart = Math.max(
    stats?.reports || 0,
    stats?.users   || 0,
    stats?.organisations || 0,
    1
  );

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .shimmer-bg {
          background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.4s ease-out forwards; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fee2e2] flex items-center justify-center">
              <ShieldCheck size={18} className="text-[#e11d48]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-0.5">PataChako control centre</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border
                         border-[#e2e8f0] text-sm font-semibold text-gray-600
                         hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                         bg-[#e11d48] text-white text-sm font-semibold
                         hover:bg-[#be123c] transition-all active:scale-95"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200
                          text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={fetchStats} className="font-semibold underline shrink-0">Retry</button>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 fade-up">
          <StatCard label="Total users"         value={stats?.users?.toLocaleString()}         icon={Users}      color="#1a56db" loading={loading} />
          <StatCard label="Organisations"       value={stats?.organisations?.toLocaleString()} icon={Building2}  color="#10b981" loading={loading} />
          <StatCard label="Lost reports"        value={stats?.reports?.toLocaleString()}       icon={FileText}   color="#f59e0b" loading={loading} />
          <StatCard label="Successful matches"  value={stats?.matches?.toLocaleString()}       icon={TrendingUp} color="#e11d48" loading={loading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Activity breakdown */}
          <div className="lg:col-span-2 bg-white border border-[#e2e8f0] rounded-2xl p-6 fade-up">
            <h2 className="text-base font-bold text-[#0f172a] mb-5 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#1a56db]" /> Activity breakdown
            </h2>
            {loading ? (
              <div className="space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <div className="h-3 w-24 rounded shimmer-bg" />
                      <div className="h-3 w-10 rounded shimmer-bg" />
                    </div>
                    <div className="h-2 rounded-full shimmer-bg" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <ProgressStat label="Registered users"   value={stats?.users || 0}         max={totalForChart} color="#1a56db" />
                <ProgressStat label="Organisations"      value={stats?.organisations || 0} max={totalForChart} color="#10b981" />
                <ProgressStat label="Lost reports filed" value={stats?.reports || 0}       max={totalForChart} color="#f59e0b" />
                <ProgressStat label="Matches found"      value={stats?.matches || 0}       max={totalForChart} color="#e11d48" />
              </div>
            )}
          </div>

          {/* Match rate */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 fade-up flex flex-col">
            <h2 className="text-base font-bold text-[#0f172a] mb-2">Match rate</h2>
            <p className="text-xs text-gray-400 mb-6">
              % of reports that found a match
            </p>
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full shimmer-bg" />
              </div>
            ) : (() => {
              const r = stats?.reports || 0;
              const m = stats?.matches  || 0;
              const pct = r > 0 ? Math.round((m / r) * 100) : 0;
              const circumference = 2 * Math.PI * 40;
              const offset = circumference - (pct / 100) * circumference;
              const color = pct >= 60 ? '#10b981' : pct >= 30 ? '#f59e0b' : '#e11d48';
              return (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-28 h-28">
                    <svg width="112" height="112" viewBox="0 0 112 112">
                      <circle cx="56" cy="56" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                      <circle cx="56" cy="56" r="40" fill="none"
                              stroke={color} strokeWidth="10" strokeLinecap="round"
                              strokeDasharray={circumference}
                              strokeDashoffset={offset}
                              transform="rotate(-90 56 56)"
                              style={{ transition: 'stroke-dashoffset 1.2s ease-out' }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold" style={{ color }}>{pct}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    {m} of {r} reports matched
                  </p>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 fade-up">
          <h2 className="text-base font-bold text-[#0f172a] mb-4">Quick actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <QuickAction to="/admin/users"       label="Manage users"        desc="View, edit, or remove users"       icon={Users}     color="#1a56db" />
            <QuickAction to="/admin/orgs/create" label="Create organisation" desc="Register a new organisation"       icon={PlusCircle} color="#10b981" />
            <QuickAction to="/admin/orgs"        label="View organisations"  desc="List all registered organisations" icon={Building2} color="#f59e0b" />
            <QuickAction to="/admin/reports"     label="All reports"         desc="Browse all lost item reports"      icon={FileText}  color="#e11d48" />
            <QuickAction to="/admin/matches"     label="AI matches"          desc="Review AI match results"           icon={TrendingUp} color="#8b5cf6" />
            <QuickAction to="/admin/settings"    label="System settings"     desc="Configure platform settings"       icon={ShieldCheck} color="#0f172a" />
          </div>
        </div>

      </div>
    </>
  );
}