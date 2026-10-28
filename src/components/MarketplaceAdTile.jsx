import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, MessageSquare, ArrowUpRight, Sparkles, Tent } from 'lucide-react';

export default function MarketplaceAdTile({
    type = 'sponsored', // 'sponsored' | 'feedback'
    className = ''
}) {
    if (type === 'feedback') {
        return (
            <div className={`listing-card group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-[20px] bg-[#F0F7F0] border border-forest/15 hover:border-forest/30 p-3.5 sm:p-4 md:p-5 shadow-2xs hover:shadow-md transition-all duration-300 min-h-[250px] sm:min-h-[280px] select-none ${className}`}>
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                        <div className="inline-flex items-center gap-1.5 text-forest text-[11px] sm:text-xs font-semibold">
                            <MessageSquare className="w-3.5 h-3.5 text-forest shrink-0" />
                            <span>Feedback geben</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-forest/50 font-semibold">
                            Campuna
                        </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-display font-bold text-xs sm:text-sm md:text-base text-charcoal leading-snug">
                        Hilf uns, deine Startseite zu verbessern.
                    </h3>
                    <p className="text-[10.5px] sm:text-xs text-charcoal/70 mt-1.5 font-normal leading-relaxed">
                        Wie gefällt dir das neue Marktplatz-Design? Dein Feedback fließt direkt in die Optimierung ein.
                    </p>
                </div>

                {/* Action button */}
                <div className="mt-3 sm:mt-4 pt-2">
                    <Link
                        to="/about"
                        className="inline-flex items-center justify-center w-full py-2 sm:py-2.5 px-4 rounded-full border border-forest/40 bg-white/70 hover:bg-forest text-forest hover:text-white text-[11px] sm:text-xs font-semibold shadow-2xs hover:shadow-sm transition-all"
                    >
                        Zur Umfrage
                    </Link>
                </div>
            </div>
        );
    }

    // Default: 'sponsored' (Bezahlte Werbung / Werbeplatz auf Campuna)
    return (
        <div className={`listing-card group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-[20px] overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F8F5EC] to-[#F1ECE0] border border-gold/40 hover:border-gold shadow-2xs hover:shadow-md transition-all duration-300 min-h-[250px] sm:min-h-[280px] select-none ${className}`}>
            {/* Top Creative Area */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-forest/5 via-gold/10 to-forest/10 flex items-center justify-center border-b border-gold/20">
                {/* Decorative Campuna abstract emblem like Kleinanzeigen screenshot */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/80 backdrop-blur-xs border border-gold/40 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Tent className="w-7 h-7 sm:w-8 sm:h-8 text-forest" />
                </div>

                {/* Legal compliance advertising badge ("Anzeige / Gesponsert") */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
                    Anzeige
                </div>

                <div className="absolute top-2 right-2 text-forest/40 group-hover:text-gold transition-colors">
                    <Megaphone className="w-3.5 h-3.5" />
                </div>
            </div>

            {/* Content Body */}
            <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                <div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-gold uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Werbeblock</span>
                    </div>

                    <h3 className="font-display text-xs sm:text-sm md:text-[15px] font-bold text-charcoal leading-snug group-hover:text-forest transition-colors">
                        Dein Werbeplatz auf Campuna
                    </h3>

                    <p className="text-[10px] sm:text-[11px] text-charcoal/65 mt-1 line-clamp-2 leading-relaxed">
                        Erreiche monatlich tausende aktive Camper, Vanlifer & Outdoor-Fans in ganz Deutschland.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="mt-3">
                    <Link
                        to="/all_business"
                        className="inline-flex items-center justify-center gap-1 w-full bg-forest hover:bg-forest/90 text-white text-[11px] sm:text-xs font-semibold py-2 px-3 rounded-xl transition-all shadow-2xs hover:shadow-xs"
                    >
                        <span>Jetzt werben</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
