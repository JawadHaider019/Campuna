import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
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
            // Responsive card sizes: 280px mobile, 360px sm, 440px md, 550px lg+
            className="provider-card group relative flex-shrink-0 w-[360px] sm:w-[360px] md:w-[420px] lg:w-[550px] h-[250px] sm:h-[270px] md:h-[290px] lg:h-[310px] rounded-[24px] sm:rounded-[32px] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 select-none border border-white/10 flex"
        >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={partner.coverImage}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/65 transition-colors duration-500" />
            </div>

            {/* ── LEFT PANEL (35%) — Centered Circular Logo ── */}
            <div className="relative z-10 flex items-center justify-center p-3 sm:p-4 shrink-0" style={{ width: '35%' }}>
                {/* Subtle concentric rings */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-30">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/20" />
                    <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/10" />
                </div>

                {/* Circular logo — scales across breakpoints */}
                <div className="relative z-10 w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white shadow-md border-2 border-white/10 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <img
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            {/* ── RIGHT PANEL (65%) — Text Content ── */}
            <div className="relative z-10 py-4 pr-3 sm:pr-4 pl-0 flex flex-col justify-center items-start text-left shrink-0" style={{ width: '65%' }}>
                {/* Name & Description */}
                <div className="flex flex-col items-start text-left">
                    <h3 className="font-display text-[18px] sm:text-[18px] md:text-xl lg:text-2xl font-extrabold text-white leading-tight tracking-tight group-hover:text-gold transition-colors duration-300">
                        {partner.name}
                    </h3>
                    <p className="font-sans text-[10px] sm:text-xs md:text-sm text-white/75 leading-relaxed font-light mt-1 line-clamp-2 sm:line-clamp-3">
                        {partner.description}
                    </p>
                </div>

                {/* Bottom row: Badge & Arrow */}
                <div className="flex items-center justify-between mt-2 pt-2 w-full">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-1 bg-white/10 backdrop-blur-md px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full text-white shadow-sm shrink-0">
                        <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold" />
                        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wide">
                            {partner.listingsCount} online
                        </span>
                    </div>

                    {/* Arrow button */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-forest flex items-center justify-center transform group-hover:translate-x-1 group-hover:bg-gold transition-all duration-300 shadow-md shrink-0">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                </div>
            </div>

            {/* Visual polish border */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-[24px] sm:rounded-[32px] transition-all duration-500 pointer-events-none z-20" />
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
