import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Loader2 } from 'lucide-react';
import Button from '../shared/Button';
import { useAuth } from '../../context/AuthContext';
import logoSrc from '/src/assets/pata-logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, loggingOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = storedUser.user_type;

  // ✅ PUBLIC (guest) — sees Partner With Us
  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about', isHash: true },
    { name: 'Partner With Us', href: '/partner-with-us' }, // ✅ only guests
    { name: 'Contact', href: '#footer', isHash: true },
  ];

  // ✅ OWNER — no Partner With Us
  const ownerLinks = [
    { name: 'Dashboard', href: '/owner/dashboard' },
    { name: 'Search Items', href: '/owner/search' },
    { name: 'Report Lost Item', href: '/owner/report' },
    { name: 'My Reports', href: '/owner/reports' },
    { name: 'Profile', href: '/owner/profile' },
  ];

  // ✅ ORGANISATION — no Partner With Us
  const orgLinks = [
    { name: 'Dashboard', href: '/org/dashboard' },
    { name: 'Publish Item', href: '/org/publish' },
    { name: 'My Items', href: '/org/items' },
    { name: 'Claims', href: '/org/claims' },
    { name: 'Profile', href: '/org/profile' },
  ];

  // ✅ ADMIN — dedicated review section (approve / reject)
  const adminLinks = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Manage Users', href: '/admin/manage-users' },
    { name: 'Create Org', href: '/admin/create-org' },
    { name: 'Items', href: '/admin/items' },
    { name: 'Partner Requests', href: '/admin/partner-requests' }, // ✅ approve / reject
    { name: 'Profile', href: '/admin/profile' },
  ];

  let navLinks = publicLinks;
  if (userType === 'OWNER') {
    navLinks = ownerLinks;
  } else if (userType === 'ORGANISATION') {
    navLinks = orgLinks;
  } else if (userType === 'ADMIN') {
    navLinks = adminLinks;
  }

  const handleLogout = async () => {
    await logout();
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === '/' && location.hash) {
      window.history.pushState('', document.title, window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleHashClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const elementId = targetId.replace('#', '');

    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', targetId);
      }
    }
  };

  const renderLink = (link) => {
    if (link.name === 'Home') {
      return (
        <a
          key={link.name}
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer"
          onClick={handleHomeClick}
        >
          {link.name}
        </a>
      );
    }

    if (link.isHash) {
      return (
        <a
          key={link.name}
          href={link.href}
          className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer"
          onClick={(e) => handleHashClick(e, link.href)}
        >
          {link.name}
        </a>
      );
    }

    return (
      <Link
        key={link.name}
        to={link.href}
        className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group cursor-pointer" onClick={handleHomeClick}>
            <img
              src={logoSrc}
              alt="PataChako"
              className="w-11 h-11 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold text-dark tracking-tight">
              Pata<span className="text-primary">Chako</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(renderLink)}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <Button
                variant="ghost"
                className="px-4 py-2 text-sm gap-2"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <LogOut size={16} />
                )}
                Log Out
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="px-4 py-2 text-sm">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="px-5 py-2.5 text-sm">Create Account</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-b border-border px-4 py-6 space-y-4">
          {navLinks.map((link) => {
            if (link.name === 'Home') {
              return (
                <a
                  key={link.name}
                  href="/"
                  className="block text-base font-medium text-gray-700 hover:text-primary cursor-pointer"
                  onClick={handleHomeClick}
                >
                  {link.name}
                </a>
              );
            }
            if (link.isHash) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-base font-medium text-gray-700 hover:text-primary cursor-pointer"
                  onClick={(e) => handleHashClick(e, link.href)}
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.href}
                className="block text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-border space-y-3">
            {user ? (
              <Button
                variant="outline"
                className="w-full justify-center gap-2"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <LogOut size={16} />
                )}
                Log Out
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">Log In</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
