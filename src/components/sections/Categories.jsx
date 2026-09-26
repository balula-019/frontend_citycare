import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Smartphone, IdCard, Laptop, Wallet, Backpack,
  FileSpreadsheet, FileText, Key, Cpu, Shirt,
  Gem, Watch, Banknote, Book, Car, Headphones,
  BatteryCharging, GlassWater, Gamepad2, Stethoscope,
  Trophy, PawPrint, UtensilsCrossed, Umbrella, MoreHorizontal,
  Calculator,
} from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const Categories = () => {
  const { t } = useTranslation();

  // Each entry: { key -> maps to categoriesGrid.items.<key>, icon }
  const categories = [
    { key: 'phones',           icon: Smartphone },
    { key: 'ids',              icon: IdCard },
    { key: 'laptops',          icon: Laptop },
    { key: 'wallets',          icon: Wallet },
    { key: 'bags',             icon: Backpack },
    { key: 'passports',        icon: FileSpreadsheet },
    { key: 'documents',        icon: FileText },
    { key: 'keys',             icon: Key },
    { key: 'electronics',      icon: Cpu },
    { key: 'clothes',          icon: Shirt },
    { key: 'jewelry',          icon: Gem },
    { key: 'watches',          icon: Watch },
    { key: 'money',            icon: Banknote },
    { key: 'books',            icon: Book },
    { key: 'vehicleItems',     icon: Car },
    { key: 'headphones',       icon: Headphones },
    { key: 'chargers',         icon: BatteryCharging },
    { key: 'waterBottles',     icon: GlassWater },
    { key: 'toys',             icon: Gamepad2 },
    { key: 'medicalItems',     icon: Stethoscope },
    { key: 'sportsItems',      icon: Trophy },
    { key: 'petItems',         icon: PawPrint },
    { key: 'foodContainers',   icon: UtensilsCrossed },
    { key: 'umbrellas',        icon: Umbrella },
    { key: 'calculator',       icon: Calculator },
    { key: 'otherItems',       icon: MoreHorizontal },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t('categoriesSection.badge')}
          title={t('categoriesSection.title')}
          subtitle={t('categoriesSection.subtitle')}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.key}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="group p-6 rounded-2xl border border-border bg-surface hover:bg-white hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-primary group-hover:text-white text-dark flex items-center justify-center mb-4 transition-colors duration-300 shadow-sm">
                <cat.icon size={24} />
              </div>
              <h3 className="font-semibold text-lg">
                {t(`categoriesGrid.items.${cat.key}`)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;