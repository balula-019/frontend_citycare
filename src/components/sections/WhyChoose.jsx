import { motion } from 'framer-motion';
import { Shield, Building2, Lock, Zap, MapPin, EyeOff } from 'lucide-react';

const WhyChoose = () => {
  const features = [
    { title: 'Secure Verification', desc: 'Multi-step identity verification ensures items only go to rightful owners.', icon: Shield },
    { title: 'Trusted Organizations', desc: 'We partner with verified police stations, universities, and transport hubs.', icon: Building2 },
    { title: 'Privacy Protection', desc: 'Your personal data is encrypted and never shared with unauthorized parties.', icon: Lock },
    { title: 'Fast Recovery', desc: 'Real-time notifications alert you the moment a matching item is found.', icon: Zap },
    { title: 'Digital Tracking', desc: 'Track the status of your report and recovery process in real-time.', icon: MapPin },
    { title: 'Fraud Prevention', desc: 'Advanced algorithms and manual reviews prevent fraudulent claims.', icon: EyeOff },
  ];

  return (
    <section className="py-24 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/20 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built on Trust and Security</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">We prioritize your security and peace of mind at every step of the recovery process.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;