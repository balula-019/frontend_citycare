import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';

const Testimonials = () => {
  const testimonials = [
    { 
      name: 'Shinuna Khamis', 
      role: 'University Student', 
      text: 'I lost my student ID and laptop bag on the bus. Within 24 hours, I found it listed on PataChako by the transport company. The verification was smooth and secure.',
      avatar: 'SH'
    },
    { 
      name: 'David Mwakasege', 
      role: 'Parent', 
      text: 'My daughter lost her passport right before a trip. Thanks to the airport partnership on this platform, we recovered it in time. Truly a lifesaver!',
      avatar: 'DM'
    },
    { 
      name: 'Seif Ali', 
      role: 'Business Professional', 
      text: 'As someone who travels frequently, losing a wallet is a nightmare. PataChako\'s secure verification gave me peace of mind that my sensitive documents were protected.',
      avatar: 'SA'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          badge="Testimonials"
          title="Trusted by the Community"
          subtitle="Hear from people who have successfully recovered their valuable belongings."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-surface border border-border relative"
            >
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <span key={i} className="text-primary">★</span>)}
              </div>
              <p className="text-gray-700 leading-relaxed mb-8 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-dark">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
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