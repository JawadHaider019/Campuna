import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, MessageSquare, Tent, Sparkles } from 'lucide-react';

export default function MarketplaceAdTile({
    type = 'sponsored', // 'sponsored' | 'feedback'
    className = ''
}) {
    const isLoggedIn = false;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // If logged in -> Account Feedback tab; if guest/logged out -> public contact form with feedback preselected
    const feedbackHref = (mounted && isLoggedIn) ? '/mein-konto?tab=feedback' : '/kontakt?thema=feedback';

    if (type === 'feedback') {
        return (
            <div className={`listing-card group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-[20px] bg-[#F0F7F0] border border-forest/15 hover:border-forest/30 p-3 sm:p-3.5 md:p-4 shadow-2xs hover:shadow-md transition-all duration-300 select-none w-full ${className}`}>
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="inline-flex items-center gap-1.5 text-forest text-[11px] sm:text-xs font-semibold">
                            <MessageSquare className="w-3.5 h-3.5 text-forest shrink-0" />
                            <span>Feedback & Wünsche</span>
                        </div>
                    </div>

                    {/* Headline */}
                    <h3 className="font-display font-bold text-xs sm:text-sm text-charcoal leading-snug line-clamp-1">
                        Deine Ideen für Campuna.
                    </h3>
                    <p className="text-[9.5px] sm:text-[10.5px] text-charcoal/70 mt-1 font-normal leading-relaxed line-clamp-2">
                        Fehlt dir eine Funktion oder Kategorie? Wir entwickeln Campuna aktiv mit dir weiter.
                    </p>
                </div>

                {/* Action button */}
                <div className="pt-2 border-t border-forest/10 mt-1.5">
                    <Link
                        to="/about"
                        className="inline-flex items-center justify-center w-full py-1.5 sm:py-2 px-3 rounded-lg sm:rounded-xl border border-forest/40 bg-white hover:bg-forest text-forest hover:text-white text-[10.5px] sm:text-xs font-semibold shadow-2xs hover:shadow-xs transition-all"
                    >
                        Feedback einreichen
                    </Link>
                </div>
            </div>
        );
    }

    // Default: 'sponsored' (Bezahlte Werbung / Werbeplatz auf Campuna)
    return (
        <div className={`listing-card group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-[20px] overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F8F5EC] to-[#F1ECE0] border border-gold/40 hover:border-gold shadow-2xs hover:shadow-md transition-all duration-300 select-none w-full ${className}`}>
            {/* Top Creative Area (Locked to exact 16/10 aspect ratio and shrink-0 matching listing cards) */}
            <div className="relative aspect-[16/8] w-full shrink-0 overflow-hidden bg-gradient-to-br from-forest via-[#051f0b] to-black flex items-center justify-center border-b border-gold/30">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-sm border border-gold/40 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Tent className="w-5 h-5 sm:w-7 sm:h-7 text-forest" />
                </div>

                {/* Legal compliance advertising badge ("Anzeige") */}
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs border border-white/10">
                    Anzeige
                </div>

                <div className="absolute top-2 right-2 text-white/50 group-hover:text-gold transition-colors">
                    <Megaphone className="w-3.5 h-3.5" />
                </div>
            </div>

            {/* Content Body */}
            <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                <div>
                    <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-gold uppercase tracking-wider mb-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Werbeblock</span>
                    </div>

                    <h3 className="font-display text-xs sm:text-sm md:text-[15px] font-bold text-charcoal leading-snug group-hover:text-forest transition-colors line-clamp-1">
                        Dein Werbeplatz auf Campuna
                    </h3>

                    <p className="text-[9.5px] sm:text-[10.5px] text-charcoal/65 mt-0.5 line-clamp-1 sm:line-clamp-2 leading-tight">
                        Präsentiere deine Camping-Angebote gezielt der aktiven Community.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="pt-2 border-t border-gold/20 mt-1.5">
                    <Link
                        to="/all_business"
                        className="inline-flex items-center justify-center gap-1 w-full bg-forest hover:bg-forest/90 text-white text-[10.5px] sm:text-xs font-semibold py-1.5 sm:py-2 px-3 rounded-lg sm:rounded-xl transition-all shadow-2xs hover:shadow-xs"
                    >
                        <span>Jetzt werben</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

