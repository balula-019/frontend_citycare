
import { motion } from 'framer-motion';
import {
  Smartphone, IdCard, Laptop, Wallet, Backpack,
  FileSpreadsheet, FileText, Key, Cpu, Shirt,
  Gem, Watch, Banknote, Book, Car, Headphones,
  BatteryCharging, GlassWater, Gamepad2, Stethoscope,
  Trophy, PawPrint, UtensilsCrossed, Umbrella, MoreHorizontal,
  Calculator,   // ← new import
} from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const Categories = () => {
  const categories = [
    { name: 'Phones',             icon: Smartphone },
    { name: 'IDs',                icon: IdCard },
    { name: 'Laptops',            icon: Laptop },
    { name: 'Wallets',            icon: Wallet },
    { name: 'Bags',               icon: Backpack },
    { name: 'Passports',          icon: FileSpreadsheet },
    { name: 'Documents',          icon: FileText },
    { name: 'Keys',               icon: Key },
    { name: 'Electronics',        icon: Cpu },
    { name: 'Clothes',            icon: Shirt },
    { name: 'Jewelry',            icon: Gem },
    { name: 'Watches',            icon: Watch },
    { name: 'Money',              icon: Banknote },
    { name: 'Books',              icon: Book },
    { name: 'Vehicle Items',      icon: Car },
    { name: 'Headphones',         icon: Headphones },
    { name: 'Chargers',           icon: BatteryCharging },
    { name: 'Water Bottles',      icon: GlassWater },
    { name: 'Toys',               icon: Gamepad2 },
    { name: 'Medical Items',      icon: Stethoscope },
    { name: 'Sports Items',       icon: Trophy },
    { name: 'Pet Items',          icon: PawPrint },
    { name: 'Food Containers',    icon: UtensilsCrossed },
    { name: 'Umbrellas',          icon: Umbrella },
    { name: 'Calculator',         icon: Calculator },    // ← new entry
    { name: 'Other Items',        icon: MoreHorizontal },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Categories"
          title="What Can You Recover?"
          subtitle="From essential documents to valuable electronics, we help you recover a wide range of personal belongings."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="group p-6 rounded-2xl border border-border bg-surface hover:bg-white hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-primary group-hover:text-white text-dark flex items-center justify-center mb-4 transition-colors duration-300 shadow-sm">
                <cat.icon size={24} />
              </div>
              <h3 className="font-semibold text-lg">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;