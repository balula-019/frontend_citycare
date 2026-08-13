import { motion } from 'framer-motion';
import { FileText, Building2, Search, ShieldCheck } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const HowItWorks = () => {
  const steps = [
    { step: '01', title: 'Report Lost Item', desc: 'Submit details about your lost item securely through our encrypted platform.', icon: FileText },
    { step: '02', title: 'Organizations Publish', desc: 'Verified partners and organizations publish found items to the secure database.', icon: Building2 },
    { step: '03', title: 'Search Published Items', desc: 'Use our advanced search to find matches for your lost belongings.', icon: Search },
    { step: '04', title: 'Verify & Recover', desc: 'Complete our secure verification process to safely reclaim your item.', icon: ShieldCheck },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          badge="How It Works"
          title="Simple, Secure, and Effective"
          subtitle="Our streamlined process ensures your lost items are recovered safely without exposing your personal information."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -top-4 -left-2 text-6xl font-bold text-primary/10 select-none">{item.step}</div>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 relative z-10">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;