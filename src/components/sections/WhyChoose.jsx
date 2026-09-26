import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Building2, Lock, Zap, MapPin, EyeOff } from 'lucide-react';

const WhyChoose = () => {
  const { t } = useTranslation();

  const features = [
    { key: 'secureVerification', icon: Shield },
    { key: 'trustedOrganizations', icon: Building2 },
    { key: 'privacyProtection', icon: Lock },
    { key: 'fastRecovery', icon: Zap },
    { key: 'digitalTracking', icon: MapPin },
    { key: 'fraudPrevention', icon: EyeOff },
  ];

  return (
    <section className="py-24 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/20 rounded-full">
            {t('whyChoose.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('whyChoose.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('whyChoose.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t(`whyChoose.items.${feature.key}.title`)}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t(`whyChoose.items.${feature.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;