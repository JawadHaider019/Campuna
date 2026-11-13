import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Sparkles, Check, ArrowRight, ShieldCheck, Gift, Award, ArrowLeft } from 'lucide-react';
import PioneerBadge from '../components/PioneerBadge';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PionierPage() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        total: 300,
        claimed: 47,
        remaining: 253
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        let isMounted = true;
        fetch('/api/profile/pioneer-stats')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data?.success && isMounted) {
                    const total = data.total || 300;
                    const claimed = data.awarded || data.claimed || 0;
                    setStats({
                        total,
                        claimed,
                        remaining: Math.max(0, total - claimed)
                    });
                }
            })
            .catch(() => {});
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-charcoal font-sans flex flex-col pt-20 sm:pt-24">
            <Navbar />

            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal/60 hover:text-forest transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Zurück</span>
                    </button>
                </div>

                {/* Hero Header */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#003809] via-[#004D0C] to-[#012607] text-white p-6 sm:p-10 shadow-xl border border-gold/40 mb-8 sm:mb-12">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(200,169,107,0.22),transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold-light border border-gold/40 text-[11px] font-bold uppercase tracking-wider">
                                <Crown className="w-3.5 h-3.5 text-gold" />
                                <span>CAMPUNA PIONEER PROGRAMM</span>
                            </span>

                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 text-sand/90 border border-white/10 text-[11px] font-semibold">
                                <Sparkles className="w-3 h-3 text-gold" />
                                <span>Noch {stats.remaining} von {stats.total} Plätzen frei</span>
                            </span>
                        </div>

                        <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
                            Werde offizieller Campuna Pionier
                        </h1>

                        <p className="font-sans text-sm sm:text-base text-sand/90 font-light leading-relaxed max-w-2xl">
                            Das Pionier-Programm zeichnet die ersten 300 aktiven Mitglieder unserer Plattform aus. Als Pionier erhältst du dauerhaften Ehrenstatus auf deinen Inseraten und 1.000 Campuna Credits als Dankeschön.
                        </p>

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/auth')}
                                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest font-bold text-xs sm:text-sm py-3 px-6 rounded-xl sm:rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                            >
                                <span>Jetzt kostenlos registrieren</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3 Privileges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-forest/10 shadow-2xs space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold-dark">
                            <Crown className="w-5 h-5" />
                        </div>
                        <h3 className="font-display font-bold text-base text-forest">
                            Dauerhafter Status
                        </h3>
                        <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                            Dein Account und deine Inserate erhalten das goldene Campuna Pioneer-Abzeichen – auf Lebenszeit.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-forest/10 shadow-2xs space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold-dark">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h3 className="font-display font-bold text-base text-forest">
                            1.000 Campuna Credits
                        </h3>
                        <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                            Einmal-Bonus im Gegenwert von 10 €, einsetzbar für optionale Hervorhebungen und Spotlight-Funktionen.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-forest/10 shadow-2xs space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h3 className="font-display font-bold text-base text-forest">
                            Erkennbare Vertrauenswürdigkeit
                        </h3>
                        <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                            Interessenten sehen sofort, dass du ein aktives, verifiziertes Gründungsmitglied bist.
                        </p>
                    </div>
                </div>

                {/* Qualification Roadmap */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest/10 shadow-xs mb-8 sm:mb-12 space-y-6">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold block mb-1">
                            VORAUSSETZUNGEN
                        </span>
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-forest">
                            So wirst du Campuna Pionier
                        </h2>
                        <p className="text-xs sm:text-sm text-charcoal/70 font-light mt-1">
                            Alle bestehenden Regeln bleiben unverändert. Die Auszeichnung wird automatisch vergeben, sobald folgende 3 Kriterien erfüllt sind:
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-sand/40 border border-forest/5">
                            <div className="w-8 h-8 rounded-full bg-forest text-gold flex items-center justify-center font-bold text-sm shrink-0">
                                1
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-forest">Kostenlos registrieren & E-Mail bestätigen</h4>
                                <p className="text-xs text-charcoal/65 mt-0.5">Erstelle dein Campuna-Konto und bestätige deine E-Mail-Adresse.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-sand/40 border border-forest/5">
                            <div className="w-8 h-8 rounded-full bg-forest text-gold flex items-center justify-center font-bold text-sm shrink-0">
                                2
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-forest">Profil vollständig ausfüllen</h4>
                                <p className="text-xs text-charcoal/65 mt-0.5">Für Privatnutzer: Vorname, Nachname und Standort. Für gewerbliche Anbieter: Firmenname, Logo, Beschreibung und Kontakt.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-sand/40 border border-forest/5">
                            <div className="w-8 h-8 rounded-full bg-forest text-gold flex items-center justify-center font-bold text-sm shrink-0">
                                3
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-forest">Mindestens 3 freigegebene Inserate veröffentlichen</h4>
                                <p className="text-xs text-charcoal/65 mt-0.5">Egal ob Wohnmobil, Wohnwagen, Campingzubehör oder Stellplatz – privat 100% kostenlos und ohne Verkaufsprovision.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-forest/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-xs text-charcoal/60">
                            Streng limitiert auf die ersten 300 qualifizierten Accounts.
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/create_listing')}
                            className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest/90 text-white font-semibold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-xs cursor-pointer"
                        >
                            <span>Jetzt Inserat aufgeben</span>
                            <ArrowRight className="w-3.5 h-3.5 text-gold" />
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

