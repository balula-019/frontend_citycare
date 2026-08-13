import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';   // ✅ fixed import

export default function FloatingReportButton() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 300));
    setLoading(false);
    if (user) {
      navigate('/owner/report');
    } else {
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`fixed bottom-24 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-200 ${
        loading ? 'bg-gray-400 text-white cursor-wait' : 'bg-[#1a56db] hover:bg-[#1547c0] text-white'
      }`}
      aria-label="Report Lost Item"
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <Megaphone size={20} />
      )}
      <span className="hidden sm:inline font-medium">
        {loading ? 'Processing...' : 'Report Lost Item'}
      </span>
    </button>
  );
}