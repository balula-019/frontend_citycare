import { motion } from 'framer-motion';
import { AlertCircle, Search, Loader2 } from 'lucide-react';
import Button from '../shared/Button';
import HeroImageCarousel from './HeroImageCarousel';

const Hero = ({
  onReportClick,
  onSearchClick,
  isLoadingReport = false,
  isLoadingSearch = false,
}) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-surface">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-gray-600"> Lost & Found Platform</span>
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Bringing the lost item and <span className="text-gradient">Back to home</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Tanzania's trusted platform for reporting, searching, and recovering lost items safely and efficiently through verified organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                className="gap-2"
                onClick={onReportClick}
                disabled={isLoadingReport}
              >
                {isLoadingReport ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <AlertCircle size={20} />
                )}
                Report Lost Item
              </Button>

              <Button
                variant="outline"
                className="gap-2"
                onClick={onSearchClick}
                disabled={isLoadingSearch}
              >
                {isLoadingSearch ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Search size={20} />
                )}
                Search Found Items
              </Button>
            </div>
          </motion.div>
        </div>

        {/* ── Illustration carousel replaces floating icons ── */}
        <div className="relative max-w-lg mx-auto">
          <HeroImageCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;