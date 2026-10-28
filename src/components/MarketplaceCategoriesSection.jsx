import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    Backpack,
    Truck,
    Tent,
    Bike,
    Trees,
    Wrench,
    Home,
    Key,
    Sailboat,
    ChevronRight
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
    'Mieten & Vermieten': Key,
    'Boote & Wassersport': Sailboat
};

const CATEGORY_SLUGS = {
    'Camping Zubehör': 'camping-zubehoer',
    'Wohnmobile & Camper': 'wohnmobile-camper',
    'Zelte & Dachzelte': 'zelte-dachzelte',
    'Fahrräder & Träger': 'fahrraeder-traeger',
    'Stellplätze & Campingplätze': 'stellplaetze',
    'Camping Services': 'camping-services',
    'Tiny Houses': 'tiny-houses',
    'Mieten & Vermieten': 'mieten-vermieten',
    'Boote & Wassersport': 'boote-wassersport'
};

export default function MarketplaceCategoriesSection({
    selectedCategory,
    onSelectCategory
}) {
    const handleCategoryClick = (catName) => {
        if (onSelectCategory) {
            // Toggle selection if already selected
            onSelectCategory(selectedCategory === catName ? '' : catName);
        }
    };

    return (
        <section className="my-4 sm:my-6 md:my-8" id="marketplace-categories">
            {/* Header: Headline + "Alle ansehen" Link */}
            <div className="flex items-center justify-between mb-3.5 px-0.5">
                <div className="flex items-center gap-2">
                    <h2 className="font-display font-bold text-base sm:text-lg md:text-xl text-charcoal tracking-tight">
                        Kategorien entdecken
                    </h2>
                    {selectedCategory && (
                        <button
                            type="button"
                            onClick={() => onSelectCategory('')}
                            className="text-[11px] font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded-full transition-colors"
                        >
                            Filter aufheben ✕
                        </button>
                    )}
                </div>

                <Link
                    to="/category"
                    className="text-xs sm:text-sm font-semibold text-forest hover:text-gold transition-colors flex items-center gap-1 group"
                >
                    <span>Alle ansehen</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

            {/* All 9 Categories using the EXACT Card Design from the old design */}
            <div className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-9 gap-2.5 sm:gap-3 pb-3 lg:pb-0 no-scrollbar snap-x items-stretch">
                {CATEGORIES.map((cat, index) => {
                    const Icon = ICON_MAP[cat.name] || Tent;
                    const slug = CATEGORY_SLUGS[cat.name] || cat.slug || '';
                    const isSelected = selectedCategory === cat.name;

                    return (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.02, duration: 0.3 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            onClick={() => handleCategoryClick(cat.name)}
                            className={`p-2.5 sm:p-3 xl:p-2.5 rounded-2xl transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-pointer min-w-[104px] sm:min-w-[120px] lg:min-w-0 lg:w-full min-h-[105px] sm:min-h-[115px] xl:min-h-[110px] shrink-0 lg:shrink snap-start relative overflow-hidden select-none border ${
                                isSelected
                                    ? 'bg-forest/5 border-forest ring-2 ring-forest/20 shadow-md'
                                    : 'bg-white border-forest/10 hover:border-gold shadow-xs hover:shadow-lg'
                            }`}
                        >
                            {/* Subtle gold gradient hover overlay from old card design */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="flex flex-col items-center justify-center text-center w-full h-full relative z-10">
                                {/* Icon box matching old design 1:1 with green/gold hover */}
                                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 mb-2 shrink-0 flex items-center justify-center shadow-2xs group-hover:scale-105 ${
                                    isSelected
                                        ? 'bg-forest text-gold scale-105'
                                        : 'bg-forest/5 text-forest group-hover:bg-forest group-hover:text-gold'
                                }`}>
                                    <Icon className="w-5 h-5 transition-transform duration-300" />
                                </div>

                                {/* Typography matching old design 1:1 */}
                                <span className={`font-display text-[10.5px] sm:text-xs font-semibold leading-tight tracking-tight transition-colors duration-300 line-clamp-2 h-[2.2em] flex items-center justify-center text-center ${
                                    isSelected ? 'text-forest font-bold' : 'text-charcoal group-hover:text-forest'
                                }`}>
                                    {cat.name}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
