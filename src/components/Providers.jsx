import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue } from 'motion/react';
import {
    ArrowRight,
    ShieldCheck,
    Building2,
    Truck,
    MapPin,
    Compass,
    Wrench,
    Hammer,
    ShoppingBag,
    Building,
    Home,
    Anchor,
    Sparkles,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROVIDERS, PROVIDER_CATEGORIES } from '../data';
import PioneerBadge from './PioneerBadge';

const CATEGORY_ICONS = {
    Truck,
    MapPin,
    Compass,
    Wrench,
    Hammer,
    ShoppingBag,
    Building,
    Home,
    Anchor,
    Building2
};

function getCategoryIcon(iconName) {
    return CATEGORY_ICONS[iconName] || Building2;
}

const ProviderCard = React.memo(({ partner, onPartnerClick, navigate }) => {
    const hasCover = Boolean(partner.coverImage && partner.coverImage.trim());
    const hasLogo = Boolean(partner.logo && partner.logo.trim());

    const handleCardClick = () => {
        if (onPartnerClick) {
            onPartnerClick(partner.name);
        } else {
            navigate(`/all_business/${partner.slug || partner.id}`);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            className="provider-card group relative flex-shrink-0 w-[290px] sm:w-[320px] md:w-[340px] rounded-[28px] overflow-hidden cursor-pointer bg-white border-2 border-forest/10 hover:border-gold shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 select-none flex flex-col justify-between"
        >
            {/* Top Cover Image Area */}
            <div className="relative h-[145px] sm:h-[160px] w-full bg-sand/30 border-b border-forest/10 overflow-hidden flex items-center justify-center">
                {hasCover ? (
                    <img
                        src={partner.coverImage}
                        alt={`${partner.name} Cover`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-sand/15 p-4 text-center">
                        <Building2 className="w-10 h-10 text-forest/25 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest/40">
                            {partner.providerCategory || 'Gewerblicher Partner'}
                        </span>
                    </div>
                )}
            </div>

            {/* Overlapping Floating Circular Brand Avatar */}
            <div className="relative px-5 -mt-8 sm:-mt-9 md:-mt-10 z-10 flex items-end">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-white p-1 shadow-md border-2 border-forest/15 group-hover:border-gold group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden shrink-0 relative">
                    {hasLogo ? (
                        <img
                            src={partner.logo}
                            alt={`${partner.name} Logo`}
                            loading="lazy"
                            className="w-full h-full object-contain rounded-full bg-white"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-sand/30 text-forest flex items-center justify-center font-display font-bold text-lg sm:text-xl">
                            {partner.name?.slice(0, 2).toUpperCase() || 'CP'}
                        </div>
                    )}
                </div>
            </div>

            {/* Card Body */}
            <div className="px-5 pt-3 pb-5 flex flex-col justify-between flex-1 space-y-3">
                <div className="space-y-1.5">
                    {partner.providerCategory && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold block truncate">
                            {partner.providerCategory}
                        </span>
                    )}

                    <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-display text-base sm:text-lg font-bold text-forest group-hover:text-gold transition-colors line-clamp-1 leading-snug">
                            {partner.name}
                        </h3>
                        {partner.isPioneer && (
                            <PioneerBadge size="xs" text="Pioneer" />
                        )}
                    </div>

                    <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light line-clamp-2">
                        {partner.description || 'Dein verifizierter Partner für Camping und Caravaning auf Campuna.'}
                    </p>
                </div>

                {/* Footer Action Row */}
                <div className="pt-3 border-t border-forest/10 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest">
                        <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                        <span>
                            {partner.listingsCount === 1 ? '1 Inserat' : `${partner.listingsCount || 0} Inserate`}
                        </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest text-sand group-hover:bg-gold group-hover:text-forest text-xs font-bold transition-all duration-300 shadow-sm">
                        <span>Profil ansehen</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
});

ProviderCard.displayName = 'ProviderCard';

export default function Providers({ onPartnerClick, initialProviders = null }) {
    const navigate = useNavigate();
    const rowRef = useRef(null);
    const [constraints, setConstraints] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    const providersList = initialProviders || PROVIDERS;

    const x = useMotionValue(0);
    const dirRef = useRef(-1);
    const isHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        const measureCard = () => {
            if (!rowRef.current) return;
            setConstraints(Math.max(0, rowRef.current.scrollWidth - rowRef.current.offsetWidth));
            setIsDesktop(window.innerWidth >= 1024);
        };

        const timer = setTimeout(measureCard, 100);
        window.addEventListener('resize', measureCard);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', measureCard);
        };
    }, [providersList]);

    const shouldSlide = !isDesktop || providersList.length > 3;

    useEffect(() => {
        let animationFrameId;
        let lastTime = performance.now();

        const loop = (time) => {
            const delta = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;

            if (shouldSlide && constraints > 0 && providersList.length > 0) {
                if (!isHoveredRef.current && !isDraggingRef.current) {
                    let currentX = x.get() + dirRef.current * 25 * delta;
                    if (dirRef.current === -1 && currentX <= -constraints) {
                        currentX = -constraints;
                        dirRef.current = 1;
                    } else if (dirRef.current === 1 && currentX >= 0) {
                        currentX = 0;
                        dirRef.current = -1;
                    }
                    x.set(currentX);
                }
            } else {
                x.set(0);
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [providersList.length, constraints, x, shouldSlide]);

    const handleCategoryNavigation = (slug) => {
        if (!slug || slug === 'all') {
            navigate('/all_business');
        } else {
            navigate(`/all_business?category=${encodeURIComponent(slug)}`);
        }
    };

    return (
        <section id="anbieter" className="py-10 sm:py-16 bg-sand relative overflow-x-hidden scroll-mt-24 border-t border-forest/5">
            <div className="max-w-8xl mx-auto px-6 md:px-12">

                {/* 1. GENERAL PROVIDER DIRECTORY SECTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-5">
                    <div className="space-y-2 max-w-3xl">
                        <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-gold block">
                            CAMPUNA ANBIETER
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
                            Camping-Anbieter entdecken
                        </h2>
                        <p className="font-sans text-sm text-charcoal/65 leading-relaxed font-light">
                            Finde verifizierte Händler, Werkstätten, Vermieter, Campingplätze und Fachbetriebe in ganz Deutschland oder präsentiere dein eigenes Unternehmen auf Campuna.
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 shrink-0 pb-1">
                        <button
                            type="button"
                            onClick={() => navigate('/all_business')}
                            className="group flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-forest cursor-pointer"
                        >
                            <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Anbieter</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* 2. GENERAL PROVIDER CATEGORIES */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-10 sm:mb-12 max-w-8xl mx-auto">
                    {/* "Alle Bereiche" Card */}
                    <div
                        onClick={() => handleCategoryNavigation('all')}
                        className="group relative rounded-2xl bg-white border border-forest/10 hover:border-gold p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none min-h-[96px] sm:min-h-[106px] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="flex items-center justify-between gap-2 relative z-10">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-forest/5 text-forest flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                                <Building2 className="w-4 h-4" />
                            </div>
                            <div className="w-5 h-5 rounded-full bg-forest/5 group-hover:bg-gold/20 text-charcoal/40 group-hover:text-forest flex items-center justify-center transition-colors">
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>

                        <div className="relative z-10 pt-2">
                            <h3 className="font-display text-xs sm:text-[13px] font-bold text-forest leading-snug line-clamp-1">
                                Alle Bereiche
                            </h3>
                            <p className="font-sans text-[10px] text-charcoal/50 font-light truncate mt-0.5">
                                Gesamtes Verzeichnis
                            </p>
                        </div>
                    </div>

                    {/* Individual Provider Category Small Cards */}
                    {PROVIDER_CATEGORIES.map((cat) => {
                        const Icon = getCategoryIcon(cat.iconName);

                        return (
                            <div
                                key={cat.id}
                                onClick={() => handleCategoryNavigation(cat.slug)}
                                className="group relative rounded-2xl bg-white border border-forest/10 hover:border-gold p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none min-h-[96px] sm:min-h-[106px] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="flex items-center justify-between gap-2 relative z-10">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-forest/5 text-forest group-hover:bg-forest group-hover:text-gold flex items-center justify-center shadow-2xs group-hover:scale-105 transition-all duration-300">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-forest/5 group-hover:bg-gold/20 text-charcoal/40 group-hover:text-forest flex items-center justify-center transition-colors">
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>

                                <div className="relative z-10 pt-2">
                                    <h3 className="font-display text-xs sm:text-[13px] font-bold text-forest leading-snug line-clamp-1">
                                        {cat.shortName || cat.name}
                                    </h3>
                                    <p className="font-sans text-[10px] text-charcoal/50 font-light truncate mt-0.5">
                                        {cat.name}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. SPOTLIGHT SUB-SECTION */}
                {Boolean(providersList && providersList.length > 0) && (
                    <div id="campuna-spotlight" className="pt-8 border-t border-forest/10 scroll-mt-24">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 text-forest border border-gold/30 text-[10px] font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3 h-3 text-gold" />
                                    <span>IM SPOTLIGHT</span>
                                </div>
                                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-forest">
                                    Ausgewählte Anbieter mit besonderer Präsenz auf Campuna
                                </h3>
                                <p className="font-sans text-xs sm:text-sm text-charcoal/60 font-light">
                                    Ausgewählte Anbieter und Betriebe mit besonderer Präsenz auf Campuna.
                                </p>
                            </div>
                        </div>

                        {/* Spotlight Sliding Carousel / Cards */}
                        <div className="relative">
                            {shouldSlide && (
                                <>
                                    <div className="hidden md:block absolute inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-sand via-sand/80 to-transparent z-10 pointer-events-none" />
                                    <div className="hidden md:block absolute inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-sand via-sand/80 to-transparent z-10 pointer-events-none" />
                                </>
                            )}

                            <div
                                className={`relative overflow-x-hidden ${shouldSlide ? 'cursor-grab active:cursor-grabbing' : ''}`}
                                ref={rowRef}
                                onMouseEnter={() => { isHoveredRef.current = true; }}
                                onMouseLeave={() => { isHoveredRef.current = false; }}
                                onPointerEnter={() => { isHoveredRef.current = true; }}
                                onPointerLeave={() => { isHoveredRef.current = false; }}
                            >
                                <motion.div
                                    drag={shouldSlide ? "x" : false}
                                    dragConstraints={shouldSlide ? { right: 0, left: -constraints } : { right: 0, left: 0 }}
                                    style={shouldSlide ? { x } : { x: 0 }}
                                    onDragStart={() => { isDraggingRef.current = true; isHoveredRef.current = true; }}
                                    onDragEnd={() => { isDraggingRef.current = false; }}
                                    className={shouldSlide
                                        ? "flex gap-5 sm:gap-6 w-max px-4 sm:px-16 md:px-32 py-2 sm:py-4"
                                        : "flex gap-5 sm:gap-6 justify-center w-full py-2 sm:py-4"
                                    }
                                >
                                    {providersList.map((partner, idx) => (
                                        <ProviderCard
                                            key={`${partner.id}-${idx}`}
                                            partner={partner}
                                            onPartnerClick={onPartnerClick}
                                            navigate={navigate}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. FOOTER ACTION BAR (Mobile Only) */}
                <div className="mt-8 pt-4 flex md:hidden items-center justify-center text-xs">
                    <button
                        type="button"
                        onClick={() => navigate('/all_business')}
                        className="group flex items-center space-x-1.5 font-bold uppercase tracking-widest text-forest cursor-pointer"
                    >
                        <span className="pb-0.5 border-b border-gold/50 group-hover:border-gold transition-colors">Alle Anbieter ansehen</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
