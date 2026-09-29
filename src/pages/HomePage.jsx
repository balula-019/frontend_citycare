import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Camera, ArrowRight, ScanLine, MapPinned, ClipboardCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import ProblemTypes from '../components/sections/ProblemTypes';
import WhyChoose from '../components/sections/WhyChoose';
import FAQ from '../components/sections/FAQ';
import FloatingReportButton from '../components/shared/FloatingReportButton';

const REPORT_PATH = '/owner/report';

/* ──────────────────────────────────────────────
   Closing call to action
────────────────────────────────────────────── */
function HomeCTA({ isOwner, onReport }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <span className="mb-5 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
          {t('cc.cta.badge', 'Your city, your report')}
        </span>
        <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl">
          {t('cc.cta.heading', 'The pothole you pass every morning')}
          <br className="hidden sm:block" />{' '}
          {t('cc.cta.headingLine2', 'can be fixed. Start by reporting it.')}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
          {t(
            'cc.cta.subtext',
            'It takes half a minute: a photo, a sentence, and a pin on the map. City Care does the rest.',
          )}
        </p>

        <div className="flex justify-center">
          <button
            onClick={onReport}
            className="flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-lg shadow-black/20 transition-all hover:bg-primary-soft active:scale-95"
          >
            <Camera size={18} />
            {isOwner
              ? t('cc.cta.reportProblem', 'Report a problem')
              : t('cc.cta.getStarted', 'Create an account')}
            <ArrowRight size={16} />
          </button>
        </div>

        {!isOwner && (
          <p className="mt-6 text-xs text-white/60">
            {t('cc.cta.haveAccount', 'Already registered?')}{' '}
            <button
              onClick={() => navigate('/login')}
              className="underline transition-colors hover:text-white"
            >
              {t('cc.cta.signIn', 'Sign in')}
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   About
────────────────────────────────────────────── */
function AboutSection() {
  const { t } = useTranslation();

  const carries = [
    {
      key: 'photos',
      icon: Camera,
      title: 'Up to five photos',
      desc: 'The evidence, straight from your phone.',
    },
    {
      key: 'location',
      icon: MapPinned,
      title: 'An exact pin',
      desc: 'Coordinates plus region, district and ward.',
    },
    {
      key: 'verification',
      icon: ScanLine,
      title: 'A verification result',
      desc: 'Topic match, description match and a relevance score.',
    },
    {
      key: 'owner',
      icon: ClipboardCheck,
      title: 'An accountable office',
      desc: 'The authority responsible, notified and named.',
    },
  ];

  return (
    <section id="about" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-primary/15 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              {t('cc.about.badge', 'About City Care')}
            </span>
            <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-dark sm:text-5xl">
              {t('cc.about.headingLine1', 'Residents see the problems first.')}{' '}
              <br className="hidden sm:block" />
              {t('cc.about.headingLine2', 'We make sure someone hears about them.')}
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {t(
                'cc.about.para1',
                'Most urban problems are reported by nobody. Not because people do not care, but because there is no simple way to tell the right office, and no way to know whether the message arrived.',
              )}
            </p>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {t(
                'cc.about.para2',
                'City Care closes that gap. A verified photo, an exact location, and a named authority for every report, so a problem stops being everybody and nobody\u2019s business.',
              )}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {carries.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <item.icon size={20} />
                </span>
                <h3 className="mb-1.5 font-bold text-dark">
                  {t(`cc.about.carries.${item.key}.title`, item.title)}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`cc.about.carries.${item.key}.desc`, item.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   HomePage
────────────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();
  const { user, isOwner: checkIsOwner } = useAuth();

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  const isOwner = !!(
    user &&
    ((typeof checkIsOwner === 'function' ? checkIsOwner() : false) ||
      storedUser.user_type === 'OWNER' ||
      user.role === 'OWNER' ||
      user.userType === 'OWNER')
  );

  // Reporting needs an account, so send visitors to register and bring them back.
  const handleReport = useCallback(() => {
    if (isOwner) {
      navigate(REPORT_PATH);
      return;
    }
    navigate(`/register?redirect=${encodeURIComponent(REPORT_PATH)}`);
  }, [isOwner, navigate]);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        <Hero onReport={handleReport} />
        <HowItWorks />
        <ProblemTypes onReport={handleReport} />
        <WhyChoose />
        <FAQ />
        <HomeCTA isOwner={isOwner} onReport={handleReport} />
        <AboutSection />
      </main>

      <Footer />

      {isOwner && <FloatingReportButton onClick={handleReport} />}
    </div>
  );
}
