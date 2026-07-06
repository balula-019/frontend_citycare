import { motion } from 'framer-motion';
import { FileText, CheckCircle, Building2, Shield } from 'lucide-react';

const TrustStats = () => {
  const stats = [
    { value: '1,000+', label: 'Items Reported', icon: FileText },
    { value: '500+', label: 'Successful Recoveries', icon: CheckCircle },
    { value: '50+', label: 'Trusted Organizations', icon: Building2 },
    { value: '100%', label: 'Trusted Community', icon: Shield },
  ];

  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-dark mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;