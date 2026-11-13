import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight, Check } from 'lucide-react';

export default function CampingAccessoriesCtaCard({ className = '' }) {
    const navigate = useNavigate();

    return (
        <div className={`my-2.5 sm:my-3 ${className}`} id="zubehoer-verkaufen-trigger">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#03260c] via-[#043310] to-[#03260c] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xs border border-forest/25">
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                    {/* Left: Icon + Compact Text */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                            <Package className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-display font-bold text-xs sm:text-sm text-white tracking-tight leading-none">
                                    Campingzubehör übrig?
                                </h3>
                                <span className="hidden md:inline-flex items-center gap-1 text-[10.5px] text-emerald-300 font-medium">
                                    <Check className="w-3 h-3" /> Privat kostenlos
                                </span>
                            </div>
                            <p className="font-sans text-[11px] sm:text-xs text-sand/80 font-light truncate mt-0.5">
                                Vorzelt, Campingmöbel oder Zubehör inserieren und direkt Interessenten finden.
                            </p>
                        </div>
                    </div>

                    {/* Right: Compact Action Button */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <span className="sm:hidden inline-flex items-center gap-1 text-[10px] text-emerald-300 font-medium mr-1">
                            <Check className="w-3 h-3" /> Kostenlos
                        </span>
                        <button
                            type="button"
                            onClick={() => navigate('/create_listing')}
                            className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl shadow-2xs hover:shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                        >
                            <span>Jetzt inserieren</span>
                            <ArrowRight className="w-3 h-3 text-emerald-100" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
