import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Tent, Sparkles } from 'lucide-react';

export default function WelcomeBanner({ onOpenSellModal }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        // Initial check
        toggleVisibility();
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const isTop = !scrolled;

    return (
        <AnimatePresence mode="wait">
            {isTop ? (
                // TOP BAR VERSION
                <motion.div
                    key="top-banner"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed top-0 left-0 w-full z-[100] bg-forest text-sand py-2 sm:py-3 px-4 shadow-lg border-b border-white/10"
                >
                    <div className="max-w-8xl mx-auto flex items-center justify-between gap-0">
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex shrink-0 w-8 h-8 rounded-lg bg-white/10 items-center justify-center">
                                <Tent className="w-4 h-4 text-gold" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                <p className="font-display text-[10px] sm:text-sm font-bold leading-none flex items-center gap-2">
                                    Willkommen bei Campuna 👋
                                    <span className="bg-gold/20 text-gold text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded border border-gold/20">
                                        Neu
                                    </span>
                                </p>
                                <p className="font-sans text-[9px] sm:text-xs text-white/70">
                                    Entdecke Angebote, finde deinen Stellplatz oder teile dein Camping-Angebot.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onOpenSellModal}
                            className="shrink-0 flex items-center gap-1 bg-sand hover:bg-white text-forest font-sans font-bold text-[8px] sm:text-[10px] uppercase tracking-wider px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 hover:scale-[1.03] shadow-md whitespace-nowrap"
                        >
                            Kostenlos inserieren
                            <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </motion.div>
            ) : (
                // BOTTOM CARD VERSION (original style)
                <motion.div
                    key="bottom-banner"
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-4xl"
                >
                    <div className="relative flex flex-row items-center gap-2 sm:gap-4 bg-forest/80 backdrop-blur-xl border border-white/10 rounded-[20px] sm:rounded-[28px] px-4 py-3 sm:px-7 sm:py-5 shadow-[0_24px_64px_-12px_rgba(0,99,13,0.45)]">

                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-24 h-24 bg-gold/20 rounded-full blur-[32px] pointer-events-none" />

                        <div className="sm:flex hidden shrink-0 w-12 h-12 rounded-2xl bg-forest border border-gold/20 flex items-center justify-center shadow-inner">
                            <Tent className="w-6 h-6 text-sand" />
                        </div>

                        <div className="flex-1 text-left">
                            <p className="font-display text-xs sm:text-base font-bold text-white leading-snug flex items-center justify-start gap-2">
                                Willkommen bei Campuna
                                <span className="text-base sm:text-lg hidden sm:block">👋</span>
                                <span className="hidden sm:inline-flex items-center gap-1 bg-sand/20 text-sand text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/20">
                                    <Sparkles className="w-2.5 h-2.5" /> Neu
                                </span>
                            </p>
                            <p className="font-sans text-[10px] sm:text-xs text-white/80 leading-relaxed">
                                Entdecke Angebote, finde deinen Stellplatz  oder teile dein Camping-Angebot mit anderen.
                            </p>
                        </div>

                        <button
                            onClick={onOpenSellModal}
                            className="shrink-0 flex items-center gap-1 bg-sand hover:brightness-110 text-forest font-sans font-bold text-[8px] sm:text-[10px] uppercase tracking-wider px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03] shadow-lg whitespace-nowrap"
                        >
                            Kostenlos inserieren
                            <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
