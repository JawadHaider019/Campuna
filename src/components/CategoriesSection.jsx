import { motion } from 'motion/react';
import {
  Backpack,
  Truck,
  Tent,
  Bike,
  Trees,
  Wrench,
  Home,
  Key
} from 'lucide-react';
import { CATEGORIES } from '../data';

const ICON_MAP = {
  'Camping Zubehör': Backpack,
  'Wohnmobile & Camper': Truck,
  'Zelte & Dachzelte': Tent,
  'Fahrräder & Träger': Bike,
  'Stellplätze & Campingplätze': Trees,
  'Camping Services': Wrench,
  'Tiny Houses': Home,
  'Mieten & Vermieten': Key
};

export default function CategoriesSection({ onSelectCategory }) {
  return (
    <section id="categories" className="relative -mt-20 md:-mt-24 z-20 max-w-7xl mx-auto px-4 ">
      {/* Horizontal Scroll on Mobile, Grid on Desktop */}
      <div className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-8 gap-3 md:gap-4 pb-4 lg:pb-1 no-scrollbar snap-x">
        {CATEGORIES.map((cat, index) => {
          const Icon = ICON_MAP[cat.name] || Tent;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => onSelectCategory(cat.name)}
              className="bg-white/80 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center cursor-pointer min-w-[120px] sm:min-w-[140px] lg:min-w-0 flex-shrink-0 snap-center"
            >
              <div className="p-2.5 rounded-xl bg-forest/5 text-forest group-hover:bg-forest group-hover:text-gold transition-all duration-300 mb-3 shrink-0">
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="font-display text-[10px] md:text-xs font-bold text-forest leading-tight tracking-tight group-hover:text-gold transition-colors duration-300 line-clamp-2">
                {cat.name}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
