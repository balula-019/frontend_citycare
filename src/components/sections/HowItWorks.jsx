import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Camera, ScanLine, Building2, BellRing } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const STEPS = [
  {
    step: '01',
    key: 'snap',
    icon: Camera,
    title: 'Snap and describe',
    desc: 'Take up to five photos, choose the problem type, and drop the pin on the map so the exact spot is recorded.',
  },
  {
    step: '02',
    key: 'verify',
    icon: ScanLine,
    title: 'AI checks the photo',
    desc: 'Before anything is saved, the image is compared against your description. A photo that does not match is rejected on the spot.',
  },
  {
    step: '03',
    key: 'route',
    icon: Building2,
    title: 'Routed to the right office',
    desc: 'Every problem type belongs to a registered authority. The verified report goes to the nearest one that handles it.',
  },
  {
    step: '04',
    key: 'track',
    icon: BellRing,
    title: 'Track until resolved',
    desc: 'Follow your report as it moves from verified to assigned, in progress, and finally resolved.',
  },
];

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t('cc.how.badge', 'How it works')}
          title={t('cc.how.title', 'From your phone to the right authority')}
          subtitle={t('cc.how.subtitle', 'Four steps. No forms to collect, no queue at the council office.')}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="relative rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <span className="pointer-events-none absolute -top-3 right-5 select-none text-6xl font-extrabold text-primary/10">
                {item.step}
              </span>
              <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                <item.icon size={26} />
              </div>
              <h3 className="relative z-10 mb-3 text-xl font-bold text-dark">
                {t(`cc.how.steps.${item.key}.title`, item.title)}
              </h3>
              <p className="relative z-10 leading-relaxed text-muted">
                {t(`cc.how.steps.${item.key}.desc`, item.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
