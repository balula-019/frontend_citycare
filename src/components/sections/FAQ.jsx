import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqs = [
    { q: 'How I can partner with PataChako?', a: 'Click on "Partner with Us" on navigation menu and fill the partner form .You can partner with patachako only if its organizations such as universities, owner of the weeding hall, owner of mall and other places where there is collection of many people' },

    { q: 'How do I report a lost item?', a: 'Click on "Report Lost Item" in the navigation menu. Fill out the secure form with details about the your item. then wait for matching once your item is found.' },
    { q: 'How do I search for my item?', a: 'Use the "Search Found Items" feature. to search for the region where you lost your item. If you find your item belong to particular region you can continue to report your item.and if you dont found but you are sure you lost your valuable item just go to ReportLostItem button to report.' },
    { q: 'Can anyone claim my item?', a: 'No. All claims require strict verification. You must provide proof of ownership, such as lostReportId. then you can share even with your friend for pick off' },
    { q: 'How is ownership verified?', a: 'Our partnered organizations conduct a multi-step verification process, which may include ID checks, matching serial numbers, or answering specific questions about the item.' },
    { q: 'Is my information secure?', a: 'Absolutely. We use end-to-end encryption for all data transmissions and adhere to strict privacy policies. Your contact details are never publicly displayed.' },
    { q: 'What if I don\'t know the exact location?', a: 'Provide the last known location or general area. Our system uses geolocation matching to alert you if an item is found nearby.' },
    { q: 'How long are items kept?', a: 'Retention periods vary by partnering organization, but typically items are held securely for 30 to 90 days before being processed according to local regulations.' },
    { q: 'How l can be organisation on PataChako?', a: 'You can be organisation on patachako only if you are owner of the mall or hall or Universities or any place where there is collection of many people or different event happen frequently.' },

    { q: 'Is PataChako free to use?', a: 'Reporting and searching are completely free for individuals. We sustain the platform through premium verification services for large organizations.' },
  ];

  return (
    <section id="faq" className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about recovering your lost items safely."
        />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
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
                <span className="font-semibold text-dark pr-8">{faq.q}</span>
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
                      {faq.a}
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