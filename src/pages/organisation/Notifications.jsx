import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Bell, Package, CheckCircle, X, Info,
  AlertCircle, RefreshCw, Clock, Trash2
} from 'lucide-react';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
} from '../../api/items';

const TYPE_CFG = {
  CLAIM_REQUEST:       { icon: Bell,        color: '#f59e0b', bg: '#fef9c3', label: 'New Claim'        },
  CLAIM_APPROVED:      { icon: CheckCircle, color: '#22c55e', bg: '#dcfce7', label: 'Claim Approved'   },
  CLAIM_REJECTED:      { icon: X,           color: '#ef4444', bg: '#fee2e2', label: 'Claim Rejected'   },
  SYSTEM_NOTIFICATION: { icon: Info,        color: '#1a56db', bg: '#dbeafe', label: 'System Update'    },
  ITEM_MATCHED:        { icon: Package,     color: '#6366f1', bg: '#ede9fe', label: 'New Match'        },
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
  const [notifs, setNotifs] = useState([]);
  const [total, setTotal] = useState(0);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [actionLoad, setActionLoad] = useState(null);

  // Sound & State Refs
  const audioCtxRef = useRef(null);
  const isFirstLoad = useRef(true);
  const prevUnreadRef = useRef(0);

  /**
   * Synthesizes a crisp, smooth dual-tone chime (E5 -> B5) using Web Audio API.
   * No external MP3 file dependency needed.
   */
  const playChimeSound = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.15, now);
      masterGain.connect(ctx.destination);

      // Tone 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.8, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Tone 2: B5 (987.77 Hz) - Slight delay for rich chime effect
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(987.77, now + 0.08);
      gain2.gain.setValueAtTime(0, now + 0.08);
      gain2.gain.linearRampToValueAtTime(0.9, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.5);
    } catch (e) {
      console.warn('Audio play prevented or unsupported:', e);
    }
  }, []);

  const fetchNotifs = useCallback(async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    setError('');
    try {
      const res = await getNotifications();

      // Handles direct page payload or Axios data wrapper safely
      const rootData = res?.data?.data ? res.data.data : (res?.data || res);
      
      const items = rootData?.notifications || [];
      const totalCount = rootData?.totalNotifications ?? items.length;
      const unreadCount = rootData?.unreadNotifications ?? items.filter(n => !n.read).length;

      setNotifs(items);
      setTotal(totalCount);
      setUnread(unreadCount);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load notifications');
    } finally {
      if (!isBackground) setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchNotifs();
  }, [fetchNotifs]);

  // Background polling every 30 seconds for new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifs(true);
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifs]);

  // Sound trigger effect: Chimes only when unread count INCREASES after initial load
  useEffect(() => {
    if (loading) return;

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      prevUnreadRef.current = unread;
      return;
    }

    if (unread > prevUnreadRef.current) {
      playChimeSound();
    }

    prevUnreadRef.current = unread;
  }, [unread, loading, playChimeSound]);

  // Mark single as read
  const handleMarkRead = async (id, isRead) => {
    if (isRead) return;
    setActionLoad(id);
    try {
      if (typeof markNotificationRead === 'function') {
        await markNotificationRead(id);
      }
      setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      setUnread(prev => Math.max(0, prev - 1));
    } catch (e) {
      setError(e.response?.data?.message || 'Could not mark as read');
    } finally {
      setActionLoad(null);
    }
  };

  // Mark all read
  const handleMarkAll = async () => {
    setActionLoad('all');
    try {
      if (typeof markAllNotificationsRead === 'function') {
        await markAllNotificationsRead();
      }
      setNotifs(prev => prev.map(n => ({ ...n, read: true })));
      setUnread(0);
    } catch (e) {
      setError(e.response?.data?.message || 'Could not mark all as read');
    } finally {
      setActionLoad(null);
    }
  };

  // Delete notification
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setActionLoad(id);
    try {
      if (typeof deleteNotification === 'function') {
        await deleteNotification(id);
      }
      setNotifs(prev => {
        const itemToDelete = prev.find(n => n.id === id);
        if (itemToDelete && !itemToDelete.read) {
          setUnread(u => Math.max(0, u - 1));
        }
        return prev.filter(n => n.id !== id);
      });
      setTotal(t => Math.max(0, t - 1));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete notification');
    } finally {
      setActionLoad(null);
    }
  };

  const filtered = filter === 'ALL'
    ? notifs
    : filter === 'UNREAD' 
      ? notifs.filter(n => !n.read)
      : notifs.filter(n => n.type === filter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 fade-up">
        <div>
          <h1 className="text-2xl font-black text-[#0f172a] flex items-center gap-2">
            Notifications
            {unread > 0 && (
              <span className="w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-black flex items-center justify-center">
                {unread}
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">{total} total notifications</p>
        </div>
        <div className="flex gap-2">
          {unread > 0 && (
            <button 
              onClick={handleMarkAll}
              disabled={actionLoad === 'all'}
              className="px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Mark all read
            </button>
          )}
          <button 
            onClick={() => fetchNotifs(false)} 
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
            title="Refresh notifications"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-5 fade-up" style={{ animationDelay: '60ms' }}>
        {['ALL', 'UNREAD', 'CLAIM_REQUEST', 'CLAIM_APPROVED', 'SYSTEM_NOTIFICATION'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === f
                ? 'bg-[#1a56db] text-white shadow-sm'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {f === 'ALL' ? 'All' : f.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
          <AlertCircle size={16} className="shrink-0" /> {error}
        </div>
      )}

      {/* List Container */}
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
            <p className="text-sm font-semibold text-gray-400 mb-1">No notifications</p>
            <p className="text-xs text-gray-300">
              {filter === 'UNREAD' ? 'All caught up!' : 'Nothing to show here yet.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#f8fafc]">
            {filtered.map((n, i) => {
              const cfg = TYPE_CFG[n.type] || TYPE_CFG.SYSTEM_NOTIFICATION;
              const Icon = cfg.icon;
              const dateStr = n.createdDate || n.createdAt;

              return (
                <div 
                  key={n.id}
                  onClick={() => handleMarkRead(n.id, n.read)}
                  className={`flex items-start gap-4 p-4 cursor-pointer transition-all hover:bg-[#f8fafc] fade-up relative group ${
                    !n.read ? 'bg-[#eff6ff]/40' : ''
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.bg }}>
                    <Icon size={18} style={{ color: cfg.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!n.read ? 'font-black text-[#0f172a]' : 'font-semibold text-gray-700'}`}>
                        {n.title || cfg.label}
                      </p>
                      <div className="flex items-center gap-2 shrink-0">
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />
                        )}
                        <button
                          onClick={(e) => handleDelete(e, n.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all rounded-md hover:bg-gray-100"
                          title="Delete notification"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                      {n.message || 'No details available'}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Clock size={10} className="text-gray-300" />
                      <span className="text-[10px] text-gray-300">
                        {dateStr
                          ? new Date(dateStr).toLocaleDateString('en-GB', {
                              day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                            })
                          : 'Just now'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}