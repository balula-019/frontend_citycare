import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { MapPin } from 'lucide-react';
import logoSrc from '/src/assets/citycare-logo.png';

const Footer = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleProtectedClick = (e, path) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const handleHashClick = (e, targetId) => {
    e.preventDefault();
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

  const platformLinks = [
    { label: t('cc.footer.reportProblem', 'Report a problem'), path: '/owner/report', protected: true },
    { label: t('cc.footer.myReports', 'My reports'),           path: '/owner/reports', protected: true },
    { label: t('footer.howItWorks'),                          path: '#how-it-works', isHash: true },
    { label: t('cc.nav.problemTypes', 'What you can report'), path: '#problem-types', isHash: true },
  ];

  const socialLinks = [
    { Icon: FaInstagram, href: 'https://www.instagram.com/pata.chako', label: 'Instagram', color: '#E1306C' },
    { Icon: FaFacebook,  href: 'https://www.facebook.com/share/1DT9uyErB5/', label: 'Facebook', color: '#1877F2' },
    { Icon: FaLinkedin,  href: 'https://www.linkedin.com/in/pata-chako-2a6a46442', label: 'LinkedIn', color: '#0A66C2' },
    { Icon: FaWhatsapp,  href: 'https://wa.me/255659819040', label: 'WhatsApp', color: '#25D366' },
  ];

  return (
    <footer id="footer" className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">

          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="City Care" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold tracking-tight">
                City<span className="text-primary">Care</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('cc.footer.tagline', 'Report the problems you see in your city and watch them reach the authority responsible.')}
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-200 group"
                  aria-label={label}
                >
                  <Icon size={18} style={{ color }} className="group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="md:pl-8">
            <h4 className="text-xs font-mono font-semibold uppercase text-gray-400 tracking-wider mb-4">
              {t('footer.platformNavigation')}
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  {link.protected ? (
                    <a
                      href={link.path}
                      onClick={(e) => handleProtectedClick(e, link.path)}
                      className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer inline-block"
                    >
                      {link.label}
                    </a>
                  ) : link.isHash ? (
                    <a
                      href={link.path}
                      onClick={(e) => handleHashClick(e, link.path)}
                      className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer inline-block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.path);
                      }}
                      className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer inline-block"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & FAQs */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase text-gray-400 tracking-wider mb-4">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleHashClick(e, '#about')}
                  className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleHashClick(e, '#faq')}
                  className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {t('footer.faqs')}
                </a>
              </li>
            </ul>

            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-primary shrink-0" />
                <span>{t('footer.location')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} City Care. {t('footer.rightsReserved')}
          </p>
          <p className="text-xs text-gray-500">
            {t('footer.builtWith')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;