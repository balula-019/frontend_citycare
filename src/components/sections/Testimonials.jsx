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
      name: 'Massoud Rashid',
      role: 'Optometrist',
      text: 'As an optometrist traveling from Kivukoni toward Kigamboni for a clinic visit, I accidentally left my portable eye examination equipment in a vehicle and could not remember where I had dropped it. Fortunately, someone reported the item through PataChako and left it with a nearby organization, making it much easier and safer for me to recover it.',
      avatar: 'MR'
    },
    {
      name: 'Seif Ali',
      role: 'Civil Engineer',
      text: 'As a civil engineer working on construction sites, I travel frequently and often carry important equipment and documents. After leaving my surveying equipment in a transport vehicle, PataChako helped me report it and gave me peace of mind knowing it could be securely recovered.',
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