import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Crown, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PioneerBadge from './PioneerBadge';

export default function CampunaPioneerCard({ className = '' }) {
    const navigate = useNavigate();

    // Default to realistic live availability based on 300 hard limit
    const [stats, setStats] = useState({
        total: 300,
        claimed: 47, // default active community pioneers baseline
        remaining: 253
    });

    useEffect(() => {
        // Fetch live pioneer status if API available
        let isMounted = true;
        const fetchPioneerStats = async () => {
            try {
                const res = await fetch('/api/profile/pioneer-stats');
                if (res.ok) {
                    const data = await res.json();
                    if (data?.success && isMounted) {
                        const total = data.total || 300;
                        const claimed = data.awarded || data.claimed || 0;
                        setStats({
                            total,
                            claimed,
                            remaining: Math.max(0, total - claimed)
                        });
                    }
                }
            } catch {
                // Keep realistic baseline
            }
        };
        fetchPioneerStats();
        return () => { isMounted = false; };
    }, []);

    return (
        <section className={`my-6 sm:my-9 ${className}`} id="campuna-pionier-aktion">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#003809] via-[#004D0C] to-[#012607] text-white p-5 sm:p-7 md:p-8 shadow-xl border border-gold/40">
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(200,169,107,0.22),transparent_70%)] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[radial-gradient(circle,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
                    {/* Left Column: Headline, Scarcity & Value Hook */}
                    <div className="space-y-3 max-w-xl">
                        {/* Eyebrow Pill with Scarcity Badge */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold-light border border-gold/40 text-[10.5px] font-bold uppercase tracking-wider">
                                <Crown className="w-3.5 h-3.5 text-gold" />
                                <span>DEIN STARTVORTEIL BEI CAMPUNA</span>
                            </span>

                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 text-sand/90 border border-white/10 text-[10.5px] font-semibold">
                                <Sparkles className="w-3 h-3 text-gold" />
                                <span>Noch {stats.remaining} von {stats.total} Plätzen frei</span>
                            </span>
                        </div>

                        {/* Main Title */}
                        <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight">
                            Werde Campuna Pionier!
                        </h2>

                        {/* Copy */}
                        <p className="font-sans text-xs sm:text-sm text-sand/90 font-light leading-relaxed">
                            Gehöre zu den Ersten, die Campuna aktiv mitgestalten – und sichere dir ein dauerhaftes <span className="font-semibold text-gold">Pioneer-Abzeichen</span> auf deinen Inseraten sowie <span className="font-semibold text-white">1.000 Credits</span> für kostenlose Hervorhebungen.
                        </p>

                        {/* 1.000 Credits Highlight Box */}
                        <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xs border border-gold/30 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 border border-gold/40">
                                    <Sparkles className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <span className="block font-display font-bold text-sm sm:text-base text-gold leading-none">
                                        1.000 Credits Prämie
                                    </span>
                                    <span className="block font-sans text-[10.5px] sm:text-xs text-sand/80 mt-0.5">
                                        Für die kostenlose Hervorhebung deiner Inserate
                                    </span>
                                </div>
                            </div>
                            <PioneerBadge size="xs" variant="forest" text="Pioneer" />
                        </div>
                    </div>

                    {/* Right Column: 3-Step Milestone Stepper & Direct Action Button */}
                    <div className="lg:w-[380px] shrink-0 bg-white/[0.08] backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/15 space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                            In 3 Schritten zum Pionier-Status
                        </span>

                        {/* Stepper Roadmap */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-forest border border-gold/50 text-gold flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                    1
                                </div>
                                <div className="min-w-0">
                                    <span className="block text-xs sm:text-sm font-semibold text-white leading-snug">
                                        Kostenlos registrieren
                                    </span>
                                    <span className="block text-[10.5px] text-sand/70 font-light mt-0.5">
                                        In 1 Minute unverbindlich starten
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-forest border border-gold/50 text-gold flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                    2
                                </div>
                                <div className="min-w-0">
                                    <span className="block text-xs sm:text-sm font-semibold text-white leading-snug">
                                        Profil ausfüllen & 3 Inserate schalten
                                    </span>
                                    <span className="block text-[10.5px] text-sand/70 font-light mt-0.5">
                                        Fahrzeuge, Zubehör oder Stellplätze
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-gold text-forest flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                                    3
                                </div>
                                <div className="min-w-0">
                                    <span className="block text-xs sm:text-sm font-semibold text-gold leading-snug">
                                        1.000 Credits & Abzeichen erhalten
                                    </span>
                                    <span className="block text-[10.5px] text-sand/70 font-light mt-0.5">
                                        Dauerhafter Status auf Lebenszeit
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Target */}
                        <div className="pt-2 border-t border-white/10 space-y-2">
                            <button
                                type="button"
                                onClick={() => navigate('/auth')}
                                className="w-full bg-gold hover:bg-gold-light active:scale-[0.99] text-forest font-bold text-xs sm:text-sm py-3 px-4 rounded-xl sm:rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Jetzt Pionier werden</span>
                                <ArrowRight className="w-4 h-4 text-forest" />
                            </button>

                            <p className="text-[10px] text-center text-sand/60 font-light">
                                Streng limitiert auf die ersten 300 qualifizierten Mitglieder.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

