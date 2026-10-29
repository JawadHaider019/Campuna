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
        <section className="mt-2 mb-3 sm:mt-3 sm:mb-4" id="marketplace-categories">
            {/* Header: Headline + "Alle ansehen" Link */}
            <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                    <h2 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-charcoal/70">
                        Kategorien
                    </h2>
                    {selectedCategory && (
                        <button
                            type="button"
                            onClick={() => onSelectCategory('')}
                            className="text-[11px] font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded-full transition-colors"
                        >
                            {selectedCategory} ✕
                        </button>
                    )}
                </div>

                <Link
                    to="/category"
                    className="text-[11px] sm:text-xs font-semibold text-forest hover:text-gold transition-colors flex items-center gap-0.5 group"
                >
                    <span>Alle</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

            {/* Compact Mini-Icon Bar: Horizontal snap scroll on mobile, sleek 9-col on desktop */}
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-9 gap-2 sm:gap-2.5 pb-1 sm:pb-0 no-scrollbar snap-x items-start">
                {CATEGORIES.map((cat, index) => {
                    const Icon = ICON_MAP[cat.name] || Tent;
                    const isSelected = selectedCategory === cat.name;

                    return (
                        <motion.button
                            key={cat.id}
                            type="button"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.015, duration: 0.25 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCategoryClick(cat.name)}
                            className={`group flex flex-col items-center justify-start text-center shrink-0 w-[72px] sm:w-[84px] lg:w-full snap-start cursor-pointer transition-all duration-200 select-none ${
                                isSelected ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                            }`}
                        >
                            {/* Compact Icon Bubble */}
                            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-200 mb-1.5 shadow-2xs ${
                                isSelected
                                    ? 'bg-forest text-gold ring-2 ring-forest/30 shadow-sm scale-105'
                                    : 'bg-white border border-forest/10 text-forest group-hover:border-forest/30 group-hover:bg-sand/40'
                            }`}>
                                <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 group-hover:scale-110" />
                            </div>

                            {/* Crisp Compact Label */}
                            <span className={`text-[10px] sm:text-[11px] leading-tight text-center line-clamp-2 px-0.5 transition-colors ${
                                isSelected
                                    ? 'font-bold text-forest underline underline-offset-2'
                                    : 'font-medium text-charcoal/80 group-hover:text-forest'
                            }`}>
                                {cat.name}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
}
