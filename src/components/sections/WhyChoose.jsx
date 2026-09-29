import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ScanLine, MapPinned, Building2, Bell, BarChart3, Languages } from 'lucide-react';

const FEATURES = [
  {
    key: 'verifiedPhotos',
    icon: ScanLine,
    title: 'Verified photos only',
    desc: 'Every image is checked against the description before the report is stored, so authorities stop drowning in noise and fake reports.',
  },
  {
    key: 'exactLocation',
    icon: MapPinned,
    title: 'Exact location',
    desc: 'Pick the spot on the map and the report carries the coordinates, region, district and ward with it.',
  },
  {
    key: 'rightAuthority',
    icon: Building2,
    title: 'The right authority',
    desc: 'Roads, water, waste and streetlights all belong to different offices. Each report is routed to the one registered for that problem type.',
  },
  {
    key: 'staysInformed',
    icon: Bell,
    title: 'Nobody is left guessing',
    desc: 'The assigned office is notified by email the moment a report lands, and you see every status change on your side.',
  },
  {
    key: 'cityInsight',
    icon: BarChart3,
    title: 'Insight for the city',
    desc: 'Reports become statistics: which problems dominate, where they cluster, and how many residents are reporting them.',
  },
  {
    key: 'swahiliFirst',
    icon: Languages,
    title: 'Swahili and English',
    desc: 'The whole platform works in both languages, because reporting a pothole should not require English.',
  },
];

const WhyChoose = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-dark py-24 text-white">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-25" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-soft">
            {t('cc.why.badge', 'Why City Care')}
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {t('cc.why.title', 'Reports that authorities can actually act on')}
          </h2>
          <p className="text-lg leading-relaxed text-white/60">
            {t(
              'cc.why.subtitle',
              'A complaint on social media disappears. A verified, located, routed report does not.',
            )}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <feature.icon size={22} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                {t(`cc.why.items.${feature.key}.title`, feature.title)}
              </h3>
              <p className="leading-relaxed text-white/60">
                {t(`cc.why.items.${feature.key}.desc`, feature.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
