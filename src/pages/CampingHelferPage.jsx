import React, { useState, useEffect } from 'react';
import { ArrowRight, Scale, Fuel, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import PayloadCalculator from '../components/PayloadCalculator';
import BudgetCalculator from '../components/BudgetCalculator';
import FeaturedListings from '../components/FeaturedListings';
import { useToolAnalytics } from '../utils/useToolAnalytics';
import { getParentNavigationUrl } from '../utils/navigation';

// Structured JSON-LD schemas
const payloadSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zuladungsrechner für Wohnmobil & Wohnwagen",
    "description": "Berechne die verbleibende Zuladung deines Wohnmobils oder Wohnwagens. Vermeide Überladung, Bußgelder und gefährliche Situationen im Camping-Urlaub.",
    "url": "https://campuna.de/camping-helfer/zuladungsrechner",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "provider": { "@type": "Organization", "name": "Campuna", "url": "https://campuna.de" }
};

const budgetSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Camping Reisekosten-Rechner",
    "description": "Berechne die Gesamtkosten deiner Campingreise: Sprit, Stellplatzgebühren, Maut, Fähren und Nebenkosten auf einen Blick.",
    "url": "https://campuna.de/camping-helfer/reisekostenrechner",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "provider": { "@type": "Organization", "name": "Campuna", "url": "https://campuna.de" }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Warum ist die Zuladung bei Wohnmobilen wichtig?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Eine korrekte Zuladung ist entscheidend für die Fahrsicherheit. Überladung verlängert den Bremsweg erheblich, verschlechtert das Kurvenverhalten und kann zu Reifenplatzern führen."
            }
        },
        {
            "@type": "Question",
            "name": "Was kostet ein Campingurlaub typischerweise?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ein Campingurlaub kostet im Durchschnitt zwischen 40 € und 120 € pro Tag für zwei Personen. Die Gesamtkosten setzen sich aus Sprit, Stellplatzgebühren, Maut und Verpflegung zusammen."
            }
        }
    ]
};

const combinedSchema = [payloadSchema, budgetSchema, faqSchema];

export default function CampingHelferPage({ initialTool }) {
    const location = useLocation();

    // Determine initial tool tab based on URL or prop
    const getInitialTab = () => {
        if (initialTool) return initialTool;
        if (location.pathname.includes('reisekostenrechner')) return 'costs';
        if (location.pathname.includes('zuladungsrechner')) return 'payload';
        return 'payload';
    };

    const [activeTool, setActiveTool] = useState(getInitialTab());
    const { trackUsage: trackPayload } = useToolAnalytics('zuladungsrechner');
    const { trackUsage: trackBudget } = useToolAnalytics('reisekostenrechner');

    useEffect(() => {
        if (location.pathname.includes('reisekostenrechner')) {
            setActiveTool('costs');
        } else if (location.pathname.includes('zuladungsrechner')) {
            setActiveTool('payload');
        }
    }, [location.pathname]);

    return (
        <div className="bg-white min-h-screen font-sans text-charcoal">
            {/* SEO Head */}
            <SEO
                title={
                    activeTool === 'payload'
                        ? 'Zuladungsrechner für Wohnmobil & Wohnwagen | Campuna'
                        : 'Camping Reisekosten-Rechner – Budget für deine Campingreise | Campuna'
                }
                description="Unsere nützlichen Camping-Helfer Tools: Berechne Zuladung (z.G.G.) und dein Urlaub budget für deine nächste Reise."
                canonicalPath={
                    activeTool === 'payload'
                        ? 'camping-helfer/zuladungsrechner'
                        : 'camping-helfer/reisekostenrechner'
                }
                structuredData={combinedSchema}
            />

            {/* Top Compact Header */}
            <div className="bg-gradient-to-b from-sand/40 to-white border-b border-forest/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-20 pb-5">
                    {/* Page Title & Tool Switcher */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2.5 sm:p-3 bg-forest/10 rounded-2xl shrink-0">
                                {activeTool === 'payload' ? (
                                    <Scale className="w-6 h-6 sm:w-7 sm:h-7 text-forest" />
                                ) : (
                                    <Fuel className="w-6 h-6 sm:w-7 sm:h-7 text-forest" />
                                )}
                            </div>
                            <div>
                                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest leading-tight">
                                    Camping-Helfer Tools
                                </h1>
                                <p className="font-sans text-xs sm:text-sm text-charcoal/60 font-light mt-0.5 max-w-2xl leading-relaxed">
                                    Nützliche Rechner zur Urlaubsplanung: Berechne das zulässige Gesamtgewicht deines Fahrzeugs und deine Reisekosten.
                                </p>
                            </div>
                        </div>

                        {/* Top Selector Tabs */}
                        <div className="flex bg-sand/40 p-1.5 rounded-2xl border border-forest/10 shrink-0 self-start md:self-auto">
                            <button
                                onClick={() => setActiveTool('payload')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${activeTool === 'payload'
                                    ? 'bg-forest text-gold shadow-md'
                                    : 'text-charcoal/70 hover:text-forest hover:bg-white/50'
                                    }`}
                            >
                                <Scale className="w-4 h-4" />
                                <span>Zuladungsrechner</span>
                            </button>
                            <button
                                onClick={() => setActiveTool('costs')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${activeTool === 'costs'
                                    ? 'bg-forest text-gold shadow-md'
                                    : 'text-charcoal/70 hover:text-forest hover:bg-white/50'
                                    }`}
                            >
                                <Fuel className="w-4 h-4" />
                                <span>Reisekosten-Rechner</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1. Calculator Display Section (Main Focus, Visible Immediately Near Top) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8">
                <div className="bg-white rounded-3xl border border-forest/10 shadow-lg p-4 sm:p-8">
                    {activeTool === 'payload' ? (
                        <PayloadCalculator
                            onCalculation={(data) => trackPayload('calculate', data)}
                        />
                    ) : (
                        <BudgetCalculator
                            onCalculation={(data) => trackBudget('calculate', data)}
                        />
                    )}
                </div>
            </div>

            {/* 2. Detailed Guides & FAQ Section (Follows Underneath) */}
            <div className="bg-sand/15 border-t border-b border-forest/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
                    {activeTool === 'payload' ? (
                        <div>
                            <div className="mb-8">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold block mb-2">
                                    Ratgeber & FAQ
                                </span>
                                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                                    Zuladung beim Camping – was du wissen musst
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-forest mb-3">
                                            Was bedeutet "Zulässiges Gesamtgewicht"?
                                        </h3>
                                        <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                            Das zulässige Gesamtgewicht (z.G.G.) ist das maximale Gewicht, das dein Fahrzeug inklusive aller Insassen, Gepäck und Flüssigkeiten auf die Waage bringen darf. Du findest es im Fahrzeugschein unter Feld <strong className="font-semibold text-charcoal/90">F.1</strong>.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-forest mb-3">
                                            So findest du die richtigen Gewichtsdaten
                                        </h3>
                                        <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                            Deine Zulassungsbescheinigung Teil I (Fahrzeugschein) enthält alle relevanten Gewichte: Feld <strong className="font-semibold text-charcoal/90">F.1</strong> = z.G.G., Feld <strong className="font-semibold text-charcoal/90">G</strong> = Leergewicht. Die Differenz ist deine theoretische Zuladung.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-forest mb-3">
                                            Bußgelder bei Überladung
                                        </h3>
                                        <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                            In Deutschland gelten gestaffelte Bußgelder ab 10 € bis hin zu 235 € und Punkten in Flensburg. In Österreich und der Schweiz drohen Vierstellige Bußgelder und Weiterfahrverbot.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-forest mb-3">
                                            Tipps zum Gewicht sparen
                                        </h3>
                                        <ul className="text-sm text-charcoal/70 leading-relaxed font-light space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-forest font-bold mt-0.5">•</span>
                                                <span>Frischwassertank nur teilweise füllen – unterwegs nachfüllen.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-forest font-bold mt-0.5">•</span>
                                                <span>Leichtere Campingmöbel aus Aluminium statt Stahl verwenden.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-forest font-bold mt-0.5">•</span>
                                                <span>Proviant erst am Zielort einkaufen – spart Transportgewicht.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-8">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold block mb-2">
                                    Ratgeber & FAQ
                                </span>
                                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                                    Was kostet ein Campingurlaub wirklich?
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-forest mb-3">
                                            Die drei größten Kostenfaktoren
                                        </h3>
                                        <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                            Die Reisekosten beim Camping setzen sich im Wesentlichen aus <strong className="font-semibold text-charcoal/90">Kraftstoff</strong>, <strong className="font-semibold text-charcoal/90">Stellplatz- bzw. Campingplatzgebühren</strong> und <strong className="font-semibold text-charcoal/90">Nebenkosten</strong> wie Maut, Vignetten und Verpflegung zusammen.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-forest mb-3">
                                            Kraftstoffkosten richtig berechnen
                                        </h3>
                                        <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                            Die Grundformel: <strong className="font-semibold text-charcoal/90">(Kilometer ÷ 100) × Verbrauch × Spritpreis</strong>. Ein Wohnmobil verbraucht typischerweise 9 bis 14 Liter Diesel pro 100 km.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-forest mb-3">
                                            Versteckte Kosten
                                        </h3>
                                        <ul className="text-sm text-charcoal/70 leading-relaxed font-light space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-forest font-bold mt-0.5">•</span>
                                                <span><strong className="font-semibold text-charcoal/90">Maut & Vignetten:</strong> In Frankreich, Italien und Österreich oft 50–150 € pro Strecke.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-forest font-bold mt-0.5">•</span>
                                                <span><strong className="font-semibold text-charcoal/90">Strom & Wasser:</strong> Strom pauschal oder ca. 0,50–0,80 €/kWh.</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-forest mb-3">
                                            Spartipps
                                        </h3>
                                        <ul className="text-sm text-charcoal/70 leading-relaxed font-light space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-forest font-bold mt-0.5">•</span>
                                                <span>Rabattkarten wie ACSI nutzen – bis zu 50% Ersparnis auf Plätzen.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-forest font-bold mt-0.5">•</span>
                                                <span>Nebensaison reisen – günstigere Übernachtungspreise.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
}

