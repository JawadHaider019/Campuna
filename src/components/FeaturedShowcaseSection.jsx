import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ArrowRight,
    MapPin,
    Heart,
    Sparkles,
    ShieldCheck,
    Check,
    RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_LISTINGS } from '../data';
import { SellerAccountBadge } from './ListingBadge';
import { formatPrice, formatListingPrice, formatCondition, formatCleanLocation } from '../utils/formatters';

export default function FeaturedShowcaseSection() {
    const navigate = useNavigate();

    // Pool of featured candidates from static listings
    const pool = useMemo(() => {
        return FEATURED_LISTINGS.filter(l => l.isFeatured || l.Featured || l.isExclusive || l.price > 10000);
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const currentItem = pool[currentIndex] || pool[0];

    const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % pool.length);
    };

    if (!currentItem) return null;

    const primaryImage = currentItem.images?.[0] || 'https://images.unsplash.com/photo-1513313778780-9ae4807465f0?auto=format&fit=crop&w=1200&q=80';
    const targetUrl = `/listing_details/${currentItem.slug || currentItem.id}`;

    return (
        <section id="featured-showcase" className="py-12 sm:py-16 md:py-20 bg-sand/20 scroll-mt-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2 px-2">
                    <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-gold block">
                        Highlights & Entdeckungen
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-forest leading-tight">
                        Campuna Fundstücke der Woche
                    </h2>
                    <p className="font-sans text-xs sm:text-sm md:text-base text-charcoal/70 max-w-xl mx-auto font-light leading-relaxed">
                        Entdecke besondere Camping-Fahrzeuge, Zubehör und Ausrüstung aus unserer Community.
                    </p>
                </div>

                {/* 2-Column Split Hero */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center bg-white rounded-3xl sm:rounded-[36px] p-5 sm:p-7 md:p-8 border border-forest/10 shadow-lg"
                    >
                        {/* Left Column (6 cols): Image Container */}
                        <div
                            className="lg:col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full group cursor-pointer shadow-md border border-forest/10 bg-sand/30"
                            onClick={() => navigate(targetUrl)}
                        >
                            <img
                                src={primaryImage}
                                alt={currentItem.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                                <SellerAccountBadge item={currentItem} size="md" />

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsFavorite(!isFavorite);
                                    }}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer ${
                                        isFavorite ? 'bg-rose-500 text-white' : 'bg-white/90 text-forest hover:text-rose-500'
                                    }`}
                                >
                                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Location tag on image */}
                            <div className="absolute bottom-3 right-3 text-xs text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                                <span>{formatCleanLocation(currentItem.location)}</span>
                            </div>
                        </div>

                        {/* Right Column (6 cols): Product Details & CTA */}
                        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold-dark border border-gold/30">
                                        {currentItem.category}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest/5 text-forest border border-forest/10">
                                        {formatCondition(currentItem.condition || currentItem.features?.[0])}
                                    </span>
                                </div>

                                <h3
                                    onClick={() => navigate(targetUrl)}
                                    className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-forest hover:text-gold transition-colors duration-200 cursor-pointer leading-snug"
                                >
                                    {currentItem.title}
                                </h3>

                                <div className="flex items-baseline gap-3">
                                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                                        {formatListingPrice(currentItem)}
                                    </span>
                                    <span className="text-xs font-mono text-charcoal/50 uppercase tracking-wider">
                                        {currentItem.pricePeriod || 'Kaufpreis'}
                                    </span>
                                </div>

                                <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light line-clamp-3">
                                    {currentItem.description || 'Gepflegtes Camping-Angebot mit hochwertiger Ausstattung und viel Liebe zum Detail. Besichtigung und Probefahrt nach Absprache möglich.'}
                                </p>

                                {/* Feature checklist */}
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    {(currentItem.features || ['4 Schlafplätze', 'Gepflegt', 'Autark']).slice(0, 4).map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-charcoal/80">
                                            <div className="w-4 h-4 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0">
                                                <Check className="w-2.5 h-2.5" />
                                            </div>
                                            <span className="truncate">{formatCondition(f)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Seller Snippet & Buttons */}
                            <div className="pt-4 border-t border-forest/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-10 h-10 rounded-full bg-forest text-gold font-display font-bold flex items-center justify-center text-sm shadow-sm">
                                        {(currentItem.seller?.name || 'P')[0]}
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-forest block">
                                            {currentItem.seller?.name || 'Privatanbieter'}
                                        </span>
                                        <span className="text-[10px] text-charcoal/50 block">
                                            Verifizierter Verkäufer
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleNext}
                                        title="Nächstes Fundstück ansehen"
                                        className="p-3 rounded-full border border-forest/15 hover:border-gold hover:text-gold-dark text-forest transition-colors cursor-pointer"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => navigate(targetUrl)}
                                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-beige hover:brightness-110 text-forest font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                                    >
                                        <span>Inserat ansehen</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
