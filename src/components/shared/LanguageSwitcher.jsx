import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'sw', label: 'SW', full: 'Kiswahili' },
];

export default function LanguageSwitcher({ variant = 'pills' }) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || 'en').slice(0, 2);

  const change = (code) => i18n.changeLanguage(code);

  if (variant === 'pills') {
    return (
      <div className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-0.5">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => change(l.code)}
            aria-label={l.full}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              current === l.code
                ? 'bg-[#0f766e] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  // dropdown variant for the navbar
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50">
        <Globe size={14} />
        {current.toUpperCase()}
      </button>
      <div className="absolute right-0 mt-1 hidden group-hover:block bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[130px] z-50">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => change(l.code)}
            className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
              current === l.code ? 'text-[#0f766e] font-bold' : 'text-gray-600'
            }`}
          >
            {l.full}
          </button>
        ))}
      </div>
    </div>
  );
}