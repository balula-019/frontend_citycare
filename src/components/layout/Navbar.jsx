import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../shared/Button';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';
import logoSrc from '/src/assets/pata-logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, loggingOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = storedUser.user_type;

  // ✅ PUBLIC (guest)
  const publicLinks = [
    { name: t('nav.home'),                                   href: '/', isHome: true },
    { name: t('cc.nav.howItWorks', 'How it works'),          href: '#how-it-works', isHash: true },
    { name: t('cc.nav.problemTypes', 'What you can report'), href: '#problem-types', isHash: true },
    { name: t('nav.about'),                                  href: '#about',  isHash: true },
  ];

  // ✅ OWNER
  const ownerLinks = [
    { name: t('nav.home'),                                 href: '/', isHome: true },
    { name: t('cc.nav.owner.report', 'Report a problem'),   href: '/owner/report' },
    { name: t('cc.nav.owner.reports', 'My reports'),        href: '/owner/reports' },
    { name: t('cc.nav.owner.notifications', 'Updates'),     href: '/owner/notifications' },
    { name: t('nav.owner.profile'),                         href: '/owner/profile' },
  ];

  // ✅ ORGANISATION
  const orgLinks = [
    { name: t('nav.org.dashboard'), href: '/org/dashboard' },
    { name: t('cc.nav.org.map', 'Reports map'), href: '/org/map' },
    { name: t('cc.nav.org.notifications', 'Updates'), href: '/org/notifications' },
    { name: t('nav.org.profile'),   href: '/org/profile'   },
  ];

  // ✅ ADMIN — dedicated review section
  const adminLinks = [
    { name: t('nav.admin.dashboard'),        href: '/admin/dashboard'        },
    { name: t('nav.admin.manageUsers'),      href: '/admin/manage-users'     },
    { name: t('nav.admin.createOrg'),        href: '/admin/create-org'       },
    { name: t('nav.admin.profile'),          href: '/admin/profile'          },
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
    if (link.isHome) {
      return (
        <a
          key={link.href}
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
          key={link.href}
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
        key={link.href}
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
              alt="City Care"
              className="w-11 h-11 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold text-dark tracking-tight">
              City<span className="text-primary">Care</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(renderLink)}
          </nav>

          {/* Desktop Auth Buttons + Language Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="pills" />

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
                {t('nav.logout')}
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="px-4 py-2 text-sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="px-5 py-2.5 text-sm">
                    {t('nav.register')}
                  </Button>
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
          isMenuOpen ? 'max-h-[42rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-b border-border px-4 py-6 space-y-4">
          {navLinks.map((link) => {
            if (link.isHome) {
              return (
                <a
                  key={link.href}
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
                  key={link.href}
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
                key={link.href}
                to={link.href}
                className="block text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          {/* ✅ Language switcher — mobile */}
          <div className="pt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              {t('nav.language') || 'Language'}
            </span>
            <LanguageSwitcher variant="pills" />
          </div>

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
                {t('nav.logout')}
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center">
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
