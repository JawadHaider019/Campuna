import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight, Check } from 'lucide-react';

export default function CampingAccessoriesCtaCard({ className = '' }) {
    const navigate = useNavigate();

    return (
        <section className={`my-4 sm:my-6 ${className}`} id="zubehoer-verkaufen-trigger">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#03260c] text-white p-4 sm:p-6 shadow-md border border-forest/30">
                {/* Background decorative subtle gradient */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Visual Cue + Copy */}
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0 shadow-inner">
                            <Package className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-display font-bold text-base sm:text-lg md:text-xl text-white tracking-tight leading-tight">
                                Campingzubehör übrig?
                            </h2>
                            <p className="font-sans text-xs sm:text-sm text-sand/85 font-light leading-relaxed mt-1 line-clamp-2">
                                Dein Vorzelt, deine Campingmöbel oder dein Wohnwagen verdienen neue Interessenten.
                            </p>
                        </div>
                    </div>

                    {/* Right: CTA Button & Risk Reversal */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-sand/80 font-medium order-2 sm:order-1">
                            <span className="inline-flex items-center gap-1 text-emerald-300">
                                <Check className="w-3.5 h-3.5" /> Privat kostenlos
                            </span>
                            <span className="text-sand/40">•</span>
                            <span>Keine Verkaufsprovision</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/create_listing')}
                            className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                        >
                            <span>Jetzt kostenlos inserieren</span>
                            <ArrowRight className="w-4 h-4 text-emerald-100" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

