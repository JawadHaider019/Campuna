import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import {
    ArrowRight,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Star,
    Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROVIDERS } from '../data';
import PioneerBadge from './PioneerBadge';

const ProviderCard = React.memo(({ partner, onPartnerClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onPartnerClick) {
            onPartnerClick(partner.name);
        } else {
            navigate(`/all_business/${partner.slug || partner.id}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="provider-card group relative flex-shrink-0 w-[290px] sm:w-[320px] md:w-[340px] rounded-[28px] overflow-hidden cursor-pointer bg-white border-2 border-forest/10 hover:border-gold shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 select-none flex flex-col justify-between"
        >
            {/* Top Cover Image Area */}
            <div className="relative h-[145px] sm:h-[160px] w-full bg-sand/30 border-b border-forest/10 overflow-hidden flex items-center justify-center">
                <img
                    src={partner.coverImage}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="bg-forest/90 text-sand border border-gold/40 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-gold" />
                        <span>Verifiziert</span>
                    </span>

                    {partner.isPioneer && (
                        <PioneerBadge size="xs" variant="forest" text="Pioneer" />
                    )}
                </div>

                {/* Location on cover */}
                <div className="absolute bottom-2.5 right-3 text-[10px] text-white/90 bg-black/45 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                    <MapPin className="w-2.5 h-2.5 text-gold shrink-0" />
                    <span className="truncate max-w-[120px]">{partner.location || 'Deutschland'}</span>
                </div>
            </div>

            {/* Profile Info Body */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between relative bg-white">
                {/* Floating Logo */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-forest/10 group-hover:border-gold shadow-md overflow-hidden p-1 absolute -top-8 left-5 transition-transform duration-300 group-hover:scale-105">
                    <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain rounded-xl"
                        loading="lazy"
                    />
                </div>

                {/* Title & Description */}
                <div className="pt-7 space-y-1.5">
                    <h3 className="font-display text-sm sm:text-base font-bold text-forest group-hover:text-gold transition-colors duration-200 line-clamp-1">
                        {partner.name}
                    </h3>
                    <p className="font-sans text-xs text-charcoal/70 line-clamp-2 font-light leading-relaxed">
                        {partner.description}
                    </p>
                </div>

                {/* Bottom Stats */}
                <div className="pt-3.5 mt-3 border-t border-forest/5 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-forest">
                        <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                        <span>{partner.rating || 4.9}</span>
                        <span className="text-charcoal/40 font-normal">/ 5.0</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-charcoal/60 bg-sand px-2.5 py-0.5 rounded-full font-mono">
                        <Layers className="w-3 h-3 text-gold" />
                        <span>{partner.listingsCount || 3} Angebote</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProviderCard.displayName = 'ProviderCard';

export default function PartnersSection({ onPartnerClick }) {
    const navigate = useNavigate();
    const rowRef = useRef(null);
    const [constraints, setConstraints] = useState(0);

    const x = useMotionValue(0);
    const dirRef = useRef(-1);
    const isHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        const measure = () => {
            if (rowRef.current) {
                setConstraints(Math.max(0, rowRef.current.scrollWidth - rowRef.current.offsetWidth));
            }
        };

        const timer = setTimeout(measure, 100);
        window.addEventListener('resize', measure);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', measure);
        };
    }, []);

    useEffect(() => {
        let animationFrameId;
        let lastTime = performance.now();

        const loop = (time) => {
            const delta = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;

            if (constraints > 0 && !isHoveredRef.current && !isDraggingRef.current) {
                let currentX = x.get() + dirRef.current * 16 * delta;
                if (dirRef.current === -1 && currentX <= -constraints) {
                    currentX = -constraints;
                    dirRef.current = 1;
                } else if (dirRef.current === 1 && currentX >= 0) {
                    currentX = 0;
                    dirRef.current = -1;
                }
                x.set(currentX);
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [constraints, x]);

    const handleScrollStep = useCallback((direction) => {
        if (constraints <= 0) return;
        const step = 340;
        const current = x.get();
        const target = direction === 'left' ? Math.min(0, current + step) : Math.max(-constraints, current - step);

        animate(x, target, {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1]
        });
    }, [constraints, x]);

    return (
        <section id="partners" className="py-12 sm:py-16 md:py-20 bg-sand/30 relative overflow-hidden select-none scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
                    <div>
                        <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-gold block mb-2">
                            VERIFIZIERTE PARTNER
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-forest leading-tight">
                            Entdecke Camping-Partner & Experten
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-charcoal/70 max-w-2xl font-light leading-relaxed mt-1">
                            Geprüfte Fachbetriebe, Ausbauer, Werkstätten und Händler aus ganz Deutschland.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/all_business')}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-forest/15 hover:border-gold hover:text-gold-dark text-forest font-bold text-xs uppercase tracking-wider transition-all self-start md:self-auto shrink-0 shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                        <span>Alle Partner ansehen</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </button>
                </div>

                {/* Marquee Row */}
                <div
                    className="group/partner-row relative overflow-hidden pb-2 cursor-grab active:cursor-grabbing"
                    ref={rowRef}
                    onMouseEnter={() => { isHoveredRef.current = true; }}
                    onMouseLeave={() => { isHoveredRef.current = false; }}
                >
                    <button
                        type="button"
                        aria-label="Vorherige Partner"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleScrollStep('left');
                        }}
                        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-forest hover:text-gold shadow-xl border border-forest/10 items-center justify-center transition-all duration-300 opacity-0 group-hover/partner-row:opacity-100 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        aria-label="Nächste Partner"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleScrollStep('right');
                        }}
                        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-forest hover:text-gold shadow-xl border border-forest/10 items-center justify-center transition-all duration-300 opacity-0 group-hover/partner-row:opacity-100 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -constraints }}
                        style={{ x }}
                        onDragStart={() => { isDraggingRef.current = true; isHoveredRef.current = true; }}
                        onDragEnd={() => {
                            setTimeout(() => { isDraggingRef.current = false; }, 150);
                        }}
                        className="flex gap-4 sm:gap-5 w-max"
                    >
                        {PROVIDERS.map((partner) => (
                            <ProviderCard
                                key={partner.id}
                                partner={partner}
                                onPartnerClick={onPartnerClick}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
