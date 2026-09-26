import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  // Each item is just an index → translated at render time
  const faqs = [
    { qKey: 'faqSection.items.partner.q',         aKey: 'faqSection.items.partner.a' },
    { qKey: 'faqSection.items.report.q',          aKey: 'faqSection.items.report.a' },
    { qKey: 'faqSection.items.search.q',          aKey: 'faqSection.items.search.a' },
    { qKey: 'faqSection.items.claim.q',           aKey: 'faqSection.items.claim.a' },
    { qKey: 'faqSection.items.verify.q',          aKey: 'faqSection.items.verify.a' },
    { qKey: 'faqSection.items.secure.q',          aKey: 'faqSection.items.secure.a' },
    { qKey: 'faqSection.items.noLocation.q',      aKey: 'faqSection.items.noLocation.a' },
    { qKey: 'faqSection.items.retention.q',       aKey: 'faqSection.items.retention.a' },
    { qKey: 'faqSection.items.beOrganisation.q',  aKey: 'faqSection.items.beOrganisation.a' },
    { qKey: 'faqSection.items.free.q',            aKey: 'faqSection.items.free.a' },
  ];

  return (
    <section id="faq" className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t('faqSection.badge')}
          title={t('faqSection.title')}
          subtitle={t('faqSection.subtitle')}
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.qKey}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/50"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-dark pr-8">{t(faq.qKey)}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-gray-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-border pt-4">
                      {t(faq.aKey)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;