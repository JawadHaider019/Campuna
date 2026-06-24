import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Tent, Sparkles } from 'lucide-react';

export default function WelcomeBanner({ onOpenSellModal }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Delay appearance so page loads first
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1800);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        setTimeout(() => setIsVisible(false), 400);
    };

    return (
        <AnimatePresence>
            {isVisible && !isDismissed && (
                <motion.div
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-3xl"
                >
                    <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-forest/95 backdrop-blur-xl border border-white/10 rounded-[28px] px-5 py-4 sm:px-7 sm:py-5 shadow-[0_24px_64px_-12px_rgba(0,99,13,0.45)]">

                        {/* Left glow accent */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-24 h-24 bg-gold/20 rounded-full blur-[32px] pointer-events-none" />

                        {/* Icon */}
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-gold/15 border border-gold/20 flex items-center justify-center shadow-inner">
                            <Tent className="w-6 h-6 text-sand" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-center sm:text-left">
                            <p className="font-display text-base font-bold text-white leading-snug flex items-center justify-center sm:justify-start gap-2">
                                Willkommen bei Campuna
                                <span className="text-lg">👋</span>
                                <span className="hidden sm:inline-flex items-center gap-1 bg-sand/20 text-sand text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/20">
                                    <Sparkles className="w-2.5 h-2.5" /> Neu
                                </span>
                            </p>
                            <p className="font-sans text-xs text-white/60 mt-0.5 leading-relaxed">
                                Entdecke Angebote, finde deinen Stellplatz — oder teile dein Camping-Angebot mit anderen.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => { handleDismiss(); onOpenSellModal?.(); }}
                            className="shrink-0 flex items-center gap-2 bg-sand hover:brightness-110 text-forest font-sans font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03] shadow-lg whitespace-nowrap"
                        >
                            Kostenlos inserieren
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
