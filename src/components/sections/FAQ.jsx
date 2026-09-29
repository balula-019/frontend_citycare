import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const FAQS = [
  {
    key: 'whatCanIReport',
    q: 'What can I report?',
    a: 'Potholes, flooding, blocked drains, broken streetlights, illegal dumping, damaged roads, sidewalks and bridges, traffic problems, water leaks, sewer problems and other public infrastructure faults.',
  },
  {
    key: 'whyPhoto',
    q: 'Why does a photo matter so much?',
    a: 'The photo is the evidence. It is checked automatically against the problem type and your description, which is what lets an authority trust the report without sending someone to look first.',
  },
  {
    key: 'rejected',
    q: 'My report was rejected. What happened?',
    a: 'The photo did not match what you described, so it was not saved. You will see the reason and the relevance score. Take a clearer photo of the actual problem and submit again.',
  },
  {
    key: 'whoReceives',
    q: 'Who receives my report?',
    a: 'The authority registered for that problem type, and the nearest one when several cover it. They are notified by email as soon as the report is verified.',
  },
  {
    key: 'canIEdit',
    q: 'Can I edit a report after sending it?',
    a: 'Yes, while it is still submitted, verified or assigned. You can fix the description, change the type, adjust the location or replace photos. Once work has started it is locked.',
  },
  {
    key: 'tracking',
    q: 'How do I know anything is happening?',
    a: 'Each report carries a status: verified, assigned, in progress, then resolved. You see it change on your reports page.',
  },
  {
    key: 'anonymous',
    q: 'Is my personal information shown?',
    a: 'The authority sees the report, the photos and the location. Your account details are not published anywhere public.',
  },
  {
    key: 'cost',
    q: 'Does it cost anything?',
    a: 'No. Reporting a problem in your city is free.',
  },
  {
    key: 'organisation',
    q: 'I work for an authority. How do we join?',
    a: 'Get in touch with the City Care administrators. They register your organisation, choose the problem types you are responsible for, and email you a login. Reports of those types then start reaching you.',
  },
];

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t('cc.faq.badge', 'Questions')}
          title={t('cc.faq.title', 'Everything residents ask us')}
          subtitle={t('cc.faq.subtitle', 'Short answers to what comes up before the first report.')}
        />

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/40"
                  aria-expanded={isOpen}
                >
                  <span className="pr-8 font-semibold text-dark">
                    {t(`cc.faq.items.${faq.key}.q`, faq.q)}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={20} className="text-primary" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-6 pb-6 pt-4 leading-relaxed text-muted">
                        {t(`cc.faq.items.${faq.key}.a`, faq.a)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
