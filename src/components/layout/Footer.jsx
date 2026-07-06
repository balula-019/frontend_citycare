import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import logoSrc from '/src/assets/pata-logo.png';

const Footer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProtectedClick = (e, path) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const footerColumns = [
    {
      title: 'Platform',
      links: [
        { label: 'Search Items', path: '/owner/search', protected: true },
        { label: 'Report Lost Item', path: '/owner/report', protected: true },
        { label: 'How it Works', path: '/#how-it-works', protected: false },
        { label: 'Pricing', path: '/pricing', protected: false },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/#about', protected: false },   // ← now scrolls to #about
        { label: 'Contact', path: '/#footer', protected: false },
        { label: 'Careers', path: '/careers', protected: false },
        { label: 'Blog', path: '/blog', protected: false },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy', protected: false },
        { label: 'Terms of Service', path: '/terms', protected: false },
        { label: 'Cookie Policy', path: '/cookies', protected: false },
        { label: 'FAQs', path: '/faqs', protected: false },
      ],
    },
  ];

  const socialLinks = [
    { Icon: FaInstagram, href: 'https://instagram.com/yudhassif_0019', label: 'Instagram', color: '#E1306C' },
    { Icon: FaFacebook, href: 'https://facebook.com/YussufAli', label: 'Facebook', color: '#1877F2' },
    { Icon: FaWhatsapp, href: 'https://wa.me/255659819040', label: 'WhatsApp', color: '#25D366' },
  ];

  return (
    <footer id="footer" className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logoSrc} alt="PataChako" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold">
                Pata<span className="text-primary">Chako</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Tanzania's most trusted platform for reporting, searching, and recovering lost items safely and efficiently.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} style={{ color }} />
                </a>
              ))}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-4 text-white">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.protected ? (
                      <a
                        href={link.path}
                        onClick={(e) => handleProtectedClick(e, link.path)}
                        className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm text-gray-400 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PataChako. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Designed with trust and security in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;