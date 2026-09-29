import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Users, Building2, Trophy, UserCheck,
  TrendingUp, RefreshCw, AlertCircle, Activity
} from 'lucide-react';
import { getAdminStats } from '../../api/adminApi';

/* ── Animated number counter ─────────────────────────────────── */
function Counter({ target, duration = 1200, suffix = '' }) {
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
  return <>{val.toLocaleString()}{suffix}</>;
}

/* ── Stat card ────────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, suffix, delta, color, gradient, delay = 0 }) {
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
        <Counter target={value} suffix={suffix} />
      </p>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </div>
  );
}

/* ── Main dashboard ───────────────────────────────────────────── */
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAdminStats();
      const data = res?.data || res;
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  // Wire this to real monthly platform data once the API exposes it.
  const MONTHLY_LABELS = ['Jan','Feb','Mar','Apr','May','Jun'];
  const MONTHLY_DATA    = stats?.monthlyActivity || [12, 19, 27, 24, 38, 33];

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
        .fade-up { animation: fadeUp 0.35s ease-out forwards; }
        .card-hover { transition: box-shadow .2s ease, transform .2s ease; }
        .card-hover:hover { box-shadow: 0 8px 24px -8px rgba(15,23,42,0.12); transform: translateY(-2px); }
      `}</style>

      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 fade-up">
          <div>
            <p className="text-sm text-gray-400 font-medium">{greeting} 👋</p>
            <h1 className="text-2xl font-black text-[#0f172a] mt-0.5">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Platform-wide overview and organisation management.
            </p>
          </div>
          <button
            onClick={fetchDashboard}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border
                       border-[#e2e8f0] text-sm font-semibold text-gray-600
                       hover:bg-gray-50 disabled:opacity-50 transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200
                          text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={fetchDashboard} className="font-bold underline shrink-0">Retry</button>
          </div>
        )}

        {/* Stat cards */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#e2e8f0]">
                <div className="w-11 h-11 rounded-xl shimmer-bg mb-4" />
                <div className="h-7 w-16 rounded shimmer-bg mb-2" />
                <div className="h-3 w-24 rounded shimmer-bg" />
              </div>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Users}       label="Total Users"        value={stats.totalUsers || 0}          color="#0f766e" gradient="linear-gradient(135deg,#0f766e,#6366f1)" delay={0}   />
            <StatCard icon={Building2}   label="Organisations"      value={stats.totalOrganizations || 0}  color="#f59e0b" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" delay={80}  />
            <StatCard icon={Trophy}      label="Items Found"        value={stats.totalFoundItems || 0}     color="#22c55e" gradient="linear-gradient(135deg,#22c55e,#06b6d4)" delay={160} />
            <StatCard icon={UserCheck}   label="Active Users"       value={stats.activeUsers || 0}         color="#8b5cf6" gradient="linear-gradient(135deg,#8b5cf6,#ec4899)" delay={240} />
          </div>
        ) : null}

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Monthly activity chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
               style={{ animationDelay: '280ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-black text-[#0f172a]">Platform Activity</h2>
                <p className="text-xs text-gray-400 mt-0.5">Found items reported across all organisations</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#0f766e] font-semibold
                              bg-primary-tint px-3 py-1.5 rounded-full">
                <Activity size={12} /> Live
              </div>
            </div>

            <div className="relative h-48">
              <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
                {[0,1,2,3].map(i => (
                  <line key={i} x1="0" y1={i*40+8} x2="600" y2={i*40+8}
                        stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4,4" />
                ))}
                {(() => {
                  const max = Math.max(...MONTHLY_DATA, 1);
                  const step = Math.ceil(max / 4 / 5) * 5 || 1;
                  return [4,3,2,1,0].map((m, i) => (
                    <text key={i} x="-8" y={i*40+12} textAnchor="end"
                          fontSize="10" fill="#94a3b8">{m * step}</text>
                  ));
                })()}
                <defs>
                  <linearGradient id="adminAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#0f766e" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {(() => {
                  const max = Math.max(...MONTHLY_DATA, 1);
                  const pts = MONTHLY_DATA.map((v, i) => {
                    const x = (i / (MONTHLY_DATA.length - 1)) * 570 + 15;
                    const y = 152 - (v / max) * 136;
                    return { x, y, v };
                  });
                  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                  const area = `${d} L ${pts[pts.length-1].x} 160 L ${pts[0].x} 160 Z`;
                  return (
                    <>
                      <path d={area} fill="url(#adminAreaGrad)" />
                      <path d={d} fill="none" stroke="#0f766e" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                      {pts.map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} r="5" fill="white"
                                  stroke="#0f766e" strokeWidth="2.5" />
                          <text x={p.x} y={p.y - 10} textAnchor="middle"
                                fontSize="10" fill="#0f766e" fontWeight="700">{p.v}</text>
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

          {/* Breakdown donut */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 card-hover fade-up"
               style={{ animationDelay: '340ms' }}>
            <h2 className="text-base font-black text-[#0f172a] mb-1">Claims Breakdown</h2>
            <p className="text-xs text-gray-400 mb-5">Platform-wide distribution</p>
            {(() => {
              const segments = [
                { label: 'Matched',   value: stats?.totalMatched         || 0, color: '#22c55e' },
                { label: 'Approved',  value: stats?.totalApprovedClaims  || 0, color: '#0f766e' },
                { label: 'Pending',   value: stats?.totalPendingClaims   || 0, color: '#f59e0b' },
                { label: 'Lost Reports', value: stats?.totalLostReports  || 0, color: '#8b5cf6' },
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
      </div>
    </>
  );
}