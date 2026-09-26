import { useTranslation } from 'react-i18next';
import Button from '../shared/Button';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('ctaSection.heading')}
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t('ctaSection.subtext')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-primary hover:bg-gray-100 shadow-xl">
            {t('ctaSection.reportLostItem')}
          </Button>
          <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10">
            {t('ctaSection.searchFoundItems')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;