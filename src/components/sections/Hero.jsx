import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Camera, ScanLine, Building2, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import VerificationPreview from './VerificationPreview';

const Hero = ({ onReport }) => {
  const { t } = useTranslation();

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    { icon: Camera, key: 'snap', fallback: 'Snap the problem' },
    { icon: ScanLine, key: 'verify', fallback: 'AI checks the photo' },
    { icon: Building2, key: 'route', fallback: 'Reaches the right office' },
  ];

  return (
    <section className="relative overflow-hidden bg-surface pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Ambient brand wash */}
      <div className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-24 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase"
          >
            <ShieldCheck size={14} />
            {t('cc.hero.badge', 'Every photo verified before it is sent')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-dark sm:text-5xl lg:text-6xl"
          >
            {t('cc.hero.headingPart1', 'See a problem in your city?')}{' '}
            <span className="text-gradient">
              {t('cc.hero.headingHighlight', 'Report it in 30 seconds.')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t(
              'cc.hero.subtext',
              'Potholes, floods, blocked drains, broken streetlights. Take a photo, drop the pin on the map, and City Care sends your report straight to the authority responsible for it.',
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={onReport}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-hover hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
            >
              <Camera size={18} />
              {t('cc.hero.reportProblem', 'Report a problem')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={scrollToHowItWorks}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-white px-7 py-3.5 font-semibold text-dark transition-all duration-300 hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
            >
              {t('cc.hero.seeHowItWorks', 'See how it works')}
            </button>
          </motion.div>

          {/* What happens to a report, in three beats */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
          >
            {pillars.map(({ icon: Icon, key, fallback }) => (
              <li key={key} className="flex items-center gap-2 text-sm font-medium text-dark/80">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={14} />
                </span>
                {t(`cc.hero.pillars.${key}`, fallback)}
              </li>
            ))}
          </motion.ul>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <MapPin size={15} className="text-accent" />
            {t('cc.hero.coverage', 'Built for Tanzanian cities, ward by ward.')}
          </p>
        </div>

        {/* Product preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <VerificationPreview />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
