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

const SIX_MOBILE_CATEGORIES = [
    {
        id: 'dealers',
        shortName: 'Händler & Autohäuser',
        slug: 'wohnmobil-wohnwagenhaendler',
        icon: Building2
    },
    {
        id: 'campsites',
        shortName: 'Campingplätze',
        slug: 'campingplaetze-stellplaetze',
        icon: MapPin
    },
    {
        id: 'rental',
        shortName: 'Vermietung',
        slug: 'vermietung-rental',
        icon: Truck
    },
    {
        id: 'workshops',
        shortName: 'Werkstätten',
        slug: 'werkstatt-service',
        icon: Wrench
    },
    {
        id: 'conversions',
        shortName: 'Camper-Ausbau',
        slug: 'camper-ausbau',
        icon: Hammer
    },
    {
        id: 'accessories',
        shortName: 'Zubehör & Shops',
        slug: 'zubehoer-shop',
        icon: ShoppingBag
    }
];

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

export default function Providers({
    onPartnerClick,
    initialProviders = null,
    showMobileOnly = false,
    showDesktopOnly = false
}) {
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
        if (showMobileOnly) return;

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
    }, [providersList, showMobileOnly]);

    const shouldSlide = !isDesktop || providersList.length > 3;

    useEffect(() => {
        if (showMobileOnly) return;

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
    }, [providersList.length, constraints, x, shouldSlide, showMobileOnly]);

    const handleCategoryNavigation = (slug) => {
        if (!slug || slug === 'all') {
            navigate('/all_business');
        } else {
            navigate(`/all_business?category=${encodeURIComponent(slug)}`);
        }
    };

    // Compact Mobile Provider & Spotlight block (matching Image 2)
    const renderMobileCompactView = () => (
        <div id="anbieter" className="bg-white rounded-2xl border border-forest/10 p-3.5 sm:p-5 shadow-xs scroll-mt-24">
            {/* 1. Header: Short headline and single-line description */}
            <div className="mb-3">
                <h2 className="font-display text-lg sm:text-xl font-bold text-charcoal tracking-tight">
                    Camping-Anbieter entdecken
                </h2>
                <p className="font-sans text-xs text-charcoal/65 font-normal mt-0.5">
                    Händler, Werkstätten, Vermieter und Campingplätze
                </p>
            </div>

            {/* 2. Compact 6 Categories Grid (2 columns x 3 rows) */}
            <div className="grid grid-cols-2 gap-2">
                {SIX_MOBILE_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <div
                            key={cat.id}
                            onClick={() => handleCategoryNavigation(cat.slug)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-sand/35 hover:bg-sand/70 border border-gray-200/80 active:border-gold hover:border-gold transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-2 min-w-0 pr-1">
                                <div className="w-7 h-7 rounded-lg bg-forest/8 text-forest group-hover:bg-forest group-hover:text-gold flex items-center justify-center shrink-0 transition-colors">
                                    <Icon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-semibold text-charcoal group-hover:text-forest transition-colors truncate">
                                    {cat.shortName}
                                </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-forest group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                    );
                })}
            </div>

            {/* 3. Link to All Providers Button */}
            <div className="mt-3">
                <button
                    type="button"
                    onClick={() => navigate('/all_business')}
                    className="w-full py-2.5 px-4 rounded-xl border border-forest/20 hover:border-forest bg-white hover:bg-forest/5 text-forest font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-[0.99] cursor-pointer"
                >
                    <span>Alle Camping-Anbieter ansehen</span>
                    <ArrowRight className="w-3.5 h-3.5 text-forest" />
                </button>
            </div>

            {/* 4. Directly connected Spotlight */}
            {providersList && providersList.length > 0 && (
                <div id="campuna-spotlight" className="mt-5 pt-4 border-t border-forest/10 scroll-mt-24">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display text-sm sm:text-base font-bold text-forest">
                            Camping-Profis im Spotlight
                        </h3>
                        <button
                            type="button"
                            onClick={() => navigate('/all_business')}
                            aria-label="Alle Anbieter im Spotlight"
                            className="text-forest hover:text-gold transition-colors p-1 cursor-pointer"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Horizontal 2-card gallery matching Image 2 */}
                    <div className="flex overflow-x-auto gap-3 pb-1 no-scrollbar snap-x items-stretch">
                        {providersList.map((partner) => {
                            const badgeCategory = partner.providerCategory ||
                                (partner.id === 'prov_4' ? 'Camping-Fachbetrieb' :
                                    partner.id === 'prov_2' ? 'Camper-Ausbau' :
                                        'Wohnmobil-Händler');

                            return (
                                <div
                                    key={partner.id}
                                    onClick={() => {
                                        if (onPartnerClick) onPartnerClick(partner.name);
                                        else navigate(`/all_business/${partner.slug || partner.id}`);
                                    }}
                                    className="group flex flex-col justify-between w-[155px] sm:w-[175px] shrink-0 snap-start cursor-pointer select-none"
                                >
                                    <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-sand/30 border border-forest/10 group-hover:border-gold transition-all shadow-2xs group-hover:shadow-md mb-2">
                                        <img
                                            src={partner.coverImage}
                                            alt={partner.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        {partner.isPioneer && (
                                            <div className="absolute top-1.5 left-1.5">
                                                <PioneerBadge size="xs" text="Pioneer" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="px-0.5">
                                        <p className="font-display text-xs font-bold text-charcoal group-hover:text-forest transition-colors line-clamp-1">
                                            {badgeCategory}
                                        </p>
                                        <p className="font-sans text-[11px] text-charcoal/60 truncate mt-0.5">
                                            {partner.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );

    // Spacious Desktop/iPad View
    const renderDesktopGenerousView = () => (
        <section id="anbieter" className="w-full py-8 sm:py-12 bg-sand relative overflow-x-hidden scroll-mt-24 border-t border-b border-forest/5">
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
                {/* 1. GENERAL PROVIDER DIRECTORY SECTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
                    <div className="space-y-1.5 max-w-2xl">
                        <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gold block">
                            CAMPUNA ANBIETER
                        </span>
                        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-forest leading-tight">
                            Camping-Anbieter entdecken
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                            Finde verifizierte Händler, Werkstätten, Vermieter, Campingplätze und Fachbetriebe in ganz Deutschland oder präsentiere dein eigenes Unternehmen auf Campuna.
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 shrink-0 pb-1">
                        <button
                            type="button"
                            onClick={() => navigate('/all_business')}
                            className="group flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-forest cursor-pointer hover:text-gold transition-colors"
                        >
                            <span className="pb-0.5 border-b border-gold/50 group-hover:border-gold transition-colors">Alle Anbieter</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* 2. GENERAL PROVIDER CATEGORIES - Slimmer, compact cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 mb-8 w-full">
                    {/* "Alle Bereiche" Card */}
                    <div
                        onClick={() => handleCategoryNavigation('all')}
                        className="group relative rounded-xl bg-white border border-forest/10 hover:border-gold p-2.5 sm:p-3 flex items-center justify-between gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer select-none min-h-[64px] sm:min-h-[70px] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Left: Heading on top, Subtitle text below */}
                        <div className="flex flex-col min-w-0 pr-1 relative z-10">
                            <h3 className="font-display text-xs font-bold text-forest leading-snug truncate">
                                Alle Bereiche
                            </h3>
                            <p className="font-sans text-[10px] text-charcoal/50 font-light truncate mt-0.5">
                                Gesamtes Verzeichnis
                            </p>
                        </div>

                        {/* Right: Only the Icon */}
                        <div className="w-8 h-8 rounded-lg bg-forest/5 text-forest flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-forest group-hover:text-gold transition-colors relative z-10">
                            <Building2 className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Individual Provider Category Small Cards */}
                    {PROVIDER_CATEGORIES.map((cat) => {
                        const Icon = getCategoryIcon(cat.iconName);

                        return (
                            <div
                                key={cat.id}
                                onClick={() => handleCategoryNavigation(cat.slug)}
                                className="group relative rounded-xl bg-white border border-forest/10 hover:border-gold p-2.5 sm:p-3 flex items-center justify-between gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer select-none min-h-[64px] sm:min-h-[70px] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Left: Heading on top, Subtitle text below */}
                                <div className="flex flex-col min-w-0 pr-1 relative z-10">
                                    <h3 className="font-display text-xs font-bold text-forest leading-snug truncate">
                                        {cat.shortName || cat.name}
                                    </h3>
                                    <p className="font-sans text-[10px] text-charcoal/50 font-light truncate mt-0.5">
                                        {cat.name}
                                    </p>
                                </div>

                                {/* Right: Only the Icon */}
                                <div className="w-8 h-8 rounded-lg bg-forest/5 text-forest group-hover:bg-forest group-hover:text-gold flex items-center justify-center shrink-0 shadow-2xs transition-colors relative z-10">
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. SPOTLIGHT SUB-SECTION (Shortened non-repetitive headline as requested) */}
                {Boolean(providersList && providersList.length > 0) && (
                    <div id="campuna-spotlight" className="pt-6 border-t border-forest/10 scroll-mt-24">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 text-forest border border-gold/30 text-[10px] font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3 h-3 text-gold" />
                                    <span>IM SPOTLIGHT</span>
                                </div>
                                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-forest">
                                    Camping-Profis im Spotlight
                                </h3>
                                <p className="font-sans text-xs text-charcoal/60 font-light">
                                    Verifizierte Fachbetriebe, Händler und Servicepartner mit besonderer Präsenz auf Campuna.
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

                {/* 4. FOOTER ACTION BAR (Tablet/Mobile fallback) */}
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

    if (showMobileOnly) {
        return renderMobileCompactView();
    }

    if (showDesktopOnly) {
        return renderDesktopGenerousView();
    }

    return (
        <>
            <div className="md:hidden">
                {renderMobileCompactView()}
            </div>
            <div className="hidden md:block">
                {renderDesktopGenerousView()}
            </div>
        </>
    );
}
