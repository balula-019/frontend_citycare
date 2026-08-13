import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

export default function NotificationBell() {
  const { unreadCount } = useNotifications();
  const { user } = useAuth();

  const isOrg = user?.user_type === 'ORGANISATION' || user?.role === 'ORGANISATION';
  const linkTo = isOrg ? '/org/notifications' : '/owner/notifications';

  return (
    <Link to={linkTo} className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
      <Bell size={20} className="text-gray-600" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </Link>
  );
}