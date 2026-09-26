import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../shared/SectionHeading';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t('testimonialsSection.items.shinuna.name'),
      role: t('testimonialsSection.items.shinuna.role'),
      text: t('testimonialsSection.items.shinuna.text'),
      avatar: 'SH',
    },
    {
      name: t('testimonialsSection.items.massoud.name'),
      role: t('testimonialsSection.items.massoud.role'),
      text: t('testimonialsSection.items.massoud.text'),
      avatar: 'MR',
    },
    {
      name: t('testimonialsSection.items.seif.name'),
      role: t('testimonialsSection.items.seif.role'),
      text: t('testimonialsSection.items.seif.text'),
      avatar: 'SA',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t('testimonialsSection.badge')}
          title={t('testimonialsSection.title')}
          subtitle={t('testimonialsSection.subtitle')}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-surface border border-border relative"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-8 italic">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-semibold text-dark">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;