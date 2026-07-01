import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PROVIDERS } from '../data';
import { navigateTo } from '../utils/navigation';

export default function SpotlightSection({ onPartnerClick }) {
    const rowRef = useRef(null);
    const [constraints, setConstraints] = useState(0);
    const [cardWidth, setCardWidth] = useState(320);
    const dragStartX = useRef(0);

    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [loopTrigger, setLoopTrigger] = useState(0);

    const gap = 16; // gap-4 = 16px

    // Measure actual card width + gap from DOM
    const measureCard = useCallback(() => {
        if (!rowRef.current) return;
        const card = rowRef.current.querySelector('.provider-card');
        if (card) {
            const w = card.getBoundingClientRect().width;
            setCardWidth(w);
        }
        setConstraints(rowRef.current.scrollWidth - rowRef.current.offsetWidth);
    }, []);

    useEffect(() => {
        const timer = setTimeout(measureCard, 100);
        window.addEventListener('resize', measureCard);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', measureCard);
        };
    }, [measureCard, loopTrigger]);

    // Auto-scroll loop using measured card width
    useEffect(() => {
        if (isHovered) return;

        const step = cardWidth + gap;
        const target = -step * PROVIDERS.length;
        const currentVal = x.get();

        const remainingDistance = Math.abs(target - currentVal);
        const totalDistance = Math.abs(target);
        const fraction = totalDistance > 0 ? remainingDistance / totalDistance : 1;
        const duration = 90 * fraction;

        const controls = animate(x, target, {
            type: 'tween',
            ease: 'linear',
            duration,
            onComplete: () => {
                x.set(0);
                setLoopTrigger(prev => prev + 1);
            },
        });

        return () => controls.stop();
    }, [isHovered, loopTrigger, cardWidth]);

    useEffect(() => {
        if (rowRef.current) {
            setConstraints(rowRef.current.scrollWidth - rowRef.current.offsetWidth);
        }
    }, [PROVIDERS]);

    const ProviderCard = ({ partner }) => (
        <div
            onClick={(e) => {
                if (Math.abs(e.clientX - dragStartX.current) < 5) {
                    navigateTo(`/${partner.slug}`);
                }
            }}
            className="provider-card group relative flex-shrink-0 w-[320px] sm:w-[350px] md:w-[320px] lg:w-[460px] rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all duration-500 select-none border border-black/8 flex flex-col bg-white"
        >
            {/* ── TOP: Cover Image ── */}
            <div className="relative w-full h-[150px] sm:h-[150px] md:h-[150px] lg:h-[200px]     overflow-hidden flex-shrink-0">
                <img
                    src={partner.coverImage}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                />
                {/* Subtle dark vignette at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* ── BOTTOM: Content Panel ── */}
            <div className="relative flex flex-col  flex-1 px-3 sm:px-4 pt-3 pb-3 bg-white">

                {/* Top row: Logo (left) + Heading & Desc (right) */}
                <div className="flex items-center gap-3">
                    {/* Circular Logo */}
                    <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow border border-black/50 overflow-hidden transition-transform duration-400 group-hover:scale-105  ring-2 ring-white">
                        <img
                            src={partner.logo}
                            alt={`${partner.name} Logo`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    {/* Heading & Description */}
                    <div className="flex flex-col min-w-0 flex-1">
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-tight tracking-tight group-hover:text-forest transition-colors duration-300 truncate">
                            {partner.name}
                        </h3>
                        <p className="font-sans text-sm sm:text-md text-gray-500 leading-snug font-normal mt-0.5 line-clamp-2">
                            {partner.description}
                        </p>
                    </div>
                </div>

                {/* Bottom row: Online badge (left) + Arrow (right) */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                    {/* Online badge */}
                    <div className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px]  sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                            {partner.listingsCount} online
                        </span>
                    </div>

                    {/* Arrow button */}
                    <div className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center transform group-hover:translate-x-0.5 group-hover:bg-gold group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Hover border accent */}
            <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] border-2 border-transparent group-hover:border-forest/20 transition-all duration-500 pointer-events-none z-20" />
        </div>
    );

    return (
        <section id="campuna-spotlight" className="py-10 sm:py-16 bg-sand relative overflow-x-hidden">
            <div className="max-w-8xl mx-auto px-4 md:px-12">

                {/* Section header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 px-4">
                    <div className="space-y-1">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
                            Campuna Spotlight
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">
                            Empfohlene Camping-Anbieter
                        </h2>
                        <div className="w-16 h-0.5 bg-gold rounded-full mt-4" />
                    </div>
                    {/* Desktop View All */}
                    <div className="hidden lg:block">
                        <button onClick={() => navigateTo('/all_business')} className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-forest">
                            <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Partner</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    {/* Side Fades */}
                    <div className="hidden md:block absolute inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-sand via-sand/35 to-transparent z-10 pointer-events-none" />
                    <div className="hidden md:block absolute inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-sand via-sand/35 to-transparent z-10 pointer-events-none" />

                    <div className="relative overflow-x-hidden cursor-grab active:cursor-grabbing" ref={rowRef}>
                        <motion.div
                            drag="x"
                            onPointerDown={(e) => { dragStartX.current = e.clientX; }}
                            dragConstraints={{ right: 0, left: -constraints }}
                            style={{ x }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="flex gap-4 w-max px-4 sm:px-16 md:px-32 pb-3"
                        >
                            {[...PROVIDERS, ...PROVIDERS].map((partner, idx) => (
                                <ProviderCard key={`${partner.id}-${idx}`} partner={partner} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Mobile & Tablet View All */}
                    <div className="mt-10 flex justify-center lg:hidden">
                        <button onClick={() => navigateTo('/all_business')} className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-forest">
                            <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Partner</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
