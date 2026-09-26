import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search, AlertCircle, RefreshCw, FileText, Megaphone, ArrowLeft,
  Smartphone, Laptop, FileText as DocIcon, CreditCard, BookOpen,
  ShoppingBag, Wallet, Key, Headphones, Shirt, Gem, Watch,
  Banknote, Car, Zap, Droplets, Baby, Heart, Dog, UtensilsCrossed,
  Umbrella, Package, Globe
} from 'lucide-react';
import { searchPublicItems } from '../../api/items';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';

/* ── Region enum ─────────────────────────────────────────────── */
const REGIONS = [
  'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
  'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
  'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
  'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI','PEMBA',
];

/* ── Category → { icon, bg, color } map ─────────────────────── */
const CATEGORY_ICON_MAP = {
  PHONES:           { icon: Smartphone,      bg: '#dbeafe', color: '#1d4ed8' },
  LAPTOPS:          { icon: Laptop,          bg: '#ede9fe', color: '#7c3aed' },
  DOCUMENTS:        { icon: DocIcon,         bg: '#fef9c3', color: '#b45309' },
  IDS:              { icon: CreditCard,      bg: '#fef9c3', color: '#b45309' },
  PASSPORTS:        { icon: Globe,           bg: '#fef9c3', color: '#b45309' },
  BAGS:             { icon: ShoppingBag,     bg: '#f3e8ff', color: '#9333ea' },
  WALLETS:          { icon: Wallet,          bg: '#dcfce7', color: '#15803d' },
  KEYS:             { icon: Key,             bg: '#ffedd5', color: '#c2410c' },
  ELECTRONICS:      { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
  CLOTHES:          { icon: Shirt,           bg: '#fce7f3', color: '#be185d' },
  JEWELRY:          { icon: Gem,             bg: '#fdf4ff', color: '#a21caf' },
  WATCHES:          { icon: Watch,           bg: '#fdf4ff', color: '#a21caf' },
  MONEY:            { icon: Banknote,        bg: '#dcfce7', color: '#15803d' },
  BOOKS:            { icon: BookOpen,        bg: '#fef3c7', color: '#d97706' },
  VEHICLE_ITEMS:    { icon: Car,             bg: '#f1f5f9', color: '#475569' },
  HEADPHONES:       { icon: Headphones,      bg: '#dbeafe', color: '#1d4ed8' },
  CHARGERS_PHONE:   { icon: Smartphone,      bg: '#e0f2fe', color: '#0369a1' },
  CHARGERS_OTHERS:  { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
  WATER_BOTTLES:    { icon: Droplets,        bg: '#e0f2fe', color: '#0284c7' },
  TOYS:             { icon: Baby,            bg: '#fce7f3', color: '#db2777' },
  MEDICAL_ITEMS:    { icon: Heart,           bg: '#fee2e2', color: '#dc2626' },
  SPORTS_ITEMS:     { icon: Heart,           bg: '#dcfce7', color: '#16a34a' },
  PET_ITEMS:        { icon: Dog,             bg: '#fef9c3', color: '#ca8a04' },
  FOOD_CONTAINERS:  { icon: UtensilsCrossed, bg: '#ffedd5', color: '#ea580c' },
  UMBRELLAS:        { icon: Umbrella,        bg: '#e0f2fe', color: '#0369a1' },
  OTHERS:           { icon: Package,         bg: '#f1f5f9', color: '#475569' },
};

const DEFAULT_CATEGORY = { icon: Package, bg: '#f1f5f9', color: '#475569' };

/* ── Map backend category (UPPER_SNAKE) → i18n key ──────────── */
const CATEGORY_KEY_MAP = {
  PHONES: 'phones',
  LAPTOPS: 'laptops',
  DOCUMENTS: 'documents',
  IDS: 'ids',
  PASSPORTS: 'passports',
  BAGS: 'bags',
  WALLETS: 'wallets',
  KEYS: 'keys',
  ELECTRONICS: 'electronics',
  CLOTHES: 'clothes',
  JEWELRY: 'jewelry',
  WATCHES: 'watches',
  MONEY: 'money',
  BOOKS: 'books',
  VEHICLE_ITEMS: 'vehicleItems',
  HEADPHONES: 'headphones',
  CHARGERS_PHONE: 'chargers',
  CHARGERS_OTHERS: 'chargers',
  WATER_BOTTLES: 'waterBottles',
  TOYS: 'toys',
  MEDICAL_ITEMS: 'medicalItems',
  SPORTS_ITEMS: 'sportsItems',
  PET_ITEMS: 'petItems',
  FOOD_CONTAINERS: 'foodContainers',
  UMBRELLAS: 'umbrellas',
  CALCULATOR: 'calculator',
  OTHERS: 'otherItems',
};

/* ── Skeleton card ───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
      <div
        className="h-44"
        style={{
          background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
          backgroundSize: '400px 100%',
          animation: 'shimmer 1.4s ease-in-out infinite',
        }}
      />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-100" style={{ animation: 'shimmer 1.4s ease-in-out infinite' }} />
        <div className="h-3 w-1/2 rounded bg-gray-100" style={{ animation: 'shimmer 1.4s ease-in-out 0.2s infinite' }} />
      </div>
    </div>
  );
}

/* ── Item card ───────────────────────────────────────────────── */
function ItemCard({ item }) {
  const { t } = useTranslation();
  const cfg = CATEGORY_ICON_MAP[item.category] || DEFAULT_CATEGORY;
  const IconComp = cfg.icon;

  const catKey = CATEGORY_KEY_MAP[item.category];
  const catLabel = catKey
    ? t(`categoriesGrid.items.${catKey}`)
    : (item.category || 'ITEM').replace(/_/g, ' ');

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden
                    transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div
        className="h-44 flex flex-col items-center justify-center gap-2"
        style={{ backgroundColor: cfg.bg }}
      >
        <IconComp size={44} strokeWidth={1.4} style={{ color: cfg.color }} />
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: cfg.color, opacity: 0.75 }}
        >
          {catLabel}
        </span>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export default function SearchItems() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const stored   = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = stored.name || user?.name || t('searchPage.defaultName');
  const firstName = userName.split(' ')[0];

  const [region,   setRegion]   = useState('');
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      setSearched(true);
      const result = await searchPublicItems({
        region: region || undefined,
        page: 0,
        size: 20,
      });
      setItems(result?.data?.content ?? result?.content ?? []);
    } catch (err) {
      setError(t('searchPage.errorLoad'));
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const regionLabel = region ? t(`regions.${region}`, region.replace(/_/g, ' ')) : '';

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.35s ease-out forwards; }
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] flex flex-col">

        {/* ── Scrollable content ─────────────────────────────── */}
        <div className="flex-1 pb-32">
          <div className="max-w-7xl mx-auto px-4 py-8">

            {/* ── Top row ──────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => navigate('/')}
                  aria-label={t('searchPage.backToHome')}
                  className="shrink-0 w-10 h-10 flex items-center justify-center
                             rounded-xl border border-[#e2e8f0] bg-white text-gray-500
                             hover:text-[#0f172a] hover:bg-gray-50 hover:border-gray-300
                             transition-all active:scale-95"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] truncate">
                    {t('searchPage.greeting', { name: firstName })}
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">
                    {t('searchPage.subtitle')}
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => navigate('/owner/reports')}
                className="shrink-0"
              >
                <FileText size={16} className="mr-1.5" />
                {t('searchPage.myReports')}
              </Button>
            </div>

            {/* ── Filter bar ───────────────────────────────────── */}
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {t('searchPage.filterLabel')}
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
                               focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
                               outline-none bg-white text-gray-800 text-sm transition-all"
                  >
                    <option value="">{t('searchPage.allRegions')}</option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {t(`regions.${r}`, r.replace(/_/g, ' '))}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:self-end">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2
                               px-6 py-2.5 rounded-xl bg-[#1a56db] text-white font-semibold
                               text-sm transition-all hover:bg-[#1547c0] active:scale-95
                               disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ minWidth: 140 }}
                  >
                    {loading ? (
                      <><RefreshCw size={15} className="animate-spin" /> {t('searchPage.searching')}</>
                    ) : (
                      <><Search size={15} /> {t('searchPage.search')}</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Error ────────────────────────────────────────── */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200
                              text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                <span className="flex-1">{error}</span>
                <button
                  onClick={handleSearch}
                  className="text-xs font-semibold underline hover:no-underline shrink-0"
                >
                  {t('common.retry')}
                </button>
              </div>
            )}

            {/* ── Skeleton ─────────────────────────────────────── */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* ── Results ──────────────────────────────────────── */}
            {!loading && items.length > 0 && (
              <div className="fade-up">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {region
                    ? t('searchPage.itemsFoundInRegion', { count: items.length, region: regionLabel })
                    : t('searchPage.itemsFoundAllRegions', { count: items.length })}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      className="fade-up"
                      style={{ animationDelay: `${i * 25}ms` }}
                    >
                      <ItemCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Empty state ───────────────────────────────────── */}
            {!loading && searched && items.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center py-20
                              bg-white border border-dashed border-[#e2e8f0]
                              rounded-2xl text-center px-4 fade-up">
                <div className="w-14 h-14 rounded-full bg-[#f8fafc] border border-[#e2e8f0]
                                flex items-center justify-center mb-4">
                  <Search size={26} className="text-gray-300" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a] mb-1">
                  {t('searchPage.noItemsTitle')}
                </h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  {t('searchPage.noItemsHint')}
                </p>
              </div>
            )}

            {/* ── Idle state ────────────────────────────────────── */}
            {!loading && !searched && !error && (
              <div className="flex flex-col items-center justify-center py-24
                              bg-white border border-[#e2e8f0] rounded-2xl
                              text-center px-4 fade-up">
                <div className="w-16 h-16 rounded-full bg-[#eff6ff] border border-[#bfdbfe]
                                flex items-center justify-center mb-4">
                  <Search size={28} className="text-[#1a56db]" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-1">
                  {t('searchPage.idleTitle')}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  {t('searchPage.idleHint')}
                </p>
              </div>
            )}

          </div>
        </div>

        {/* ── Fixed bottom CTA bar ─────────────────────────────── */}
        <div
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#e2e8f0]
                     py-4 px-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row
                          items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm sm:text-base">
              <Megaphone size={20} className="text-[#1a56db] shrink-0" />
              <span>{t('searchPage.ctaText')}</span>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate('/owner/report')}
              className="whitespace-nowrap shrink-0"
            >
              <Megaphone size={16} className="mr-1.5" />
              {t('searchPage.reportLostItem')}
            </Button>
          </div>
        </div>

      </div>
    </>
  );
}