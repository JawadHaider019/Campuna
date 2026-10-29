import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, Award, Play, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TRUST_PILLARS = [
    {
        id: '01',
        icon: Sparkles,
        title: 'Camping an einem Ort',
        desc: 'Fahrzeuge, Ausrüstung, Stellplätze, Vermietung, Services und Anbieter: Du musst nicht mehr zwischen fünf Portalen springen. Auf Campuna findest du die ganze Camping-Welt gebündelt an einem Ort.'
    },
    {
        id: '02',
        icon: ShieldCheck,
        title: 'Von Campern gemacht',
        desc: 'Hinter Campuna steht ein Team, das selbst campt. Deshalb bauen wir genau die Funktionen, die uns unterwegs gefehlt haben, von der Umkreissuche bis zum Zuladungsrechner.'
    },
    {
        id: '03',
        icon: Award,
        title: 'Campuna wächst mit dir',
        desc: 'Mit jedem Inserat, jedem Anbieter und jedem Ratgeber-Artikel wird die Plattform nützlicher. Deine Angebote und dein Feedback machen Campuna jeden Tag ein Stück besser.'
    }
];

export default function WhyCampuna() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent background scrolling while video modal is open
    useEffect(() => {
        if (isPlaying) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isPlaying]);

    return (
        <section id="why-campuna" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden scroll-mt-24 border-t border-forest/10 text-charcoal">
            {/* Ambient Background Radial Glows */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-forest/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-forest text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-3">
                        <span className="text-gold">✦</span>
                        <span>Vertrauen & Vorteile</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-forest leading-tight mb-3">
                        Warum Campuna?
                    </h2>
                    <p className="text-charcoal/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
                        Camping findet heute an vielen verschiedenen Orten statt. Wir bringen alles an einem zentralen Ort zusammen.
                    </p>

                    {/* 3 Quick Benefit Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] sm:text-xs">
                        <span className="px-3 py-1 rounded-full bg-sand/50 border border-forest/10 text-charcoal/80 shadow-2xs">
                            ✓ 100% kostenlos inserieren
                        </span>
                        <span className="px-3 py-1 rounded-full bg-sand/50 border border-forest/10 text-charcoal/80 shadow-2xs">
                            ✓ Geprüfte Camping-Inserate
                        </span>
                        <span className="px-3 py-1 rounded-full bg-forest text-gold font-medium shadow-2xs">
                            ✓ Wächst mit der Community
                        </span>
                    </div>
                </div>

                {/* 2-Column Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
                    {/* Left Column (7 cols): Core Trust Pillars */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            {TRUST_PILLARS.map((pillar, index) => {
                                const Icon = pillar.icon;
                                return (
                                    <motion.div
                                        key={pillar.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="bg-white border border-forest/10 hover:border-gold p-5 sm:p-6 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5 group"
                                    >
                                        <div className="p-3 sm:p-3.5 rounded-xl bg-forest/5 text-forest group-hover:bg-forest group-hover:text-gold transition-all duration-300 shrink-0 shadow-2xs">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="font-display text-base sm:text-lg font-bold text-forest group-hover:text-forest transition-colors">
                                                    {pillar.title}
                                                </h3>
                                                <span className="font-mono text-xs font-bold text-charcoal/30 group-hover:text-forest transition-colors">
                                                    {pillar.id}
                                                </span>
                                            </div>
                                            <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column (5 cols): Video Card + Mission Statement */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                        {/* Video Showcase Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-video lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-forest/10 bg-black group cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                        >
                            <img
                                src="https://img.youtube.com/vi/7VLlgt1Rgr4/maxresdefault.jpg"
                                alt="Campuna Vorstellungsvideo"
                                loading="lazy"
                                className="w-full h-full object-cover brightness-85 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                            <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 z-10">
                                <div className="self-center my-auto">
                                    <motion.button
                                        type="button"
                                        aria-label="Campuna Video abspielen"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white text-forest hover:bg-gold hover:text-forest flex items-center justify-center transition-all duration-300 shadow-xl group/btn cursor-pointer"
                                    >
                                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                                    </motion.button>
                                </div>

                                <div className="text-left">
                                    <p className="font-display font-bold text-white text-sm sm:text-base leading-snug drop-shadow-sm">
                                        Camping an einem Ort zusammenbringen.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Dedicated Mission & Story Card */}
                        <div className="bg-white border border-forest/10 hover:border-gold rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-300 space-y-3">
                            <p className="font-sans text-xs sm:text-sm text-charcoal/75 font-light leading-relaxed">
                                Vom Wohnmobil-Kauf über praktisches Zubehör bis hin zu Ratgebern und Stellplätzen: <span className="text-forest font-semibold">Campuna vereint die gesamte Camping-Community</span> auf einer modernen, transparenten Plattform: von Campern für Camper entwickelt.
                            </p>
                            <div className="pt-2 border-t border-forest/5">
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors group"
                                >
                                    <span>Mehr über uns erfahren</span>
                                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-gold" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal Player */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            key="video-modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-12"
                        >
                            <div
                                onClick={() => setIsPlaying(false)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative w-full max-w-5xl aspect-video rounded-[28px] overflow-hidden shadow-2xl z-10 bg-black border border-white/10"
                            >
                                <button
                                    onClick={() => setIsPlaying(false)}
                                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-forest flex items-center justify-center transition-all border border-white/20 cursor-pointer"
                                    aria-label="Modal schließen"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <iframe
                                    src="https://www.youtube.com/embed/7VLlgt1Rgr4?autoplay=1"
                                    title="Campuna Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full border-0"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}
