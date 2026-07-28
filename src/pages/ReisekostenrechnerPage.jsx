import React from 'react';
import { ArrowRight, Fuel, ChevronRight, Scale, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import BudgetCalculator from '../components/BudgetCalculator';
import { useToolAnalytics } from '../utils/useToolAnalytics';
import { navigateTo, getParentNavigationUrl } from '../utils/navigation';

// JSON-LD Structured Data
const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Camping Reisekosten-Rechner",
    "description": "Berechne die Gesamtkosten deiner Campingreise: Sprit, Stellplatzgebühren, Maut, Fähren und Nebenkosten auf einen Blick.",
    "url": "https://campuna.de/camping-helfer/reisekostenrechner",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
    },
    "provider": {
        "@type": "Organization",
        "name": "Campuna",
        "url": "https://campuna.de"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Was kostet ein Campingurlaub typischerweise?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ein Campingurlaub kostet im Durchschnitt zwischen 40 € und 120 € pro Tag für zwei Personen. Die Gesamtkosten setzen sich aus Sprit, Stellplatzgebühren, Maut und Verpflegung zusammen."
            }
        },
        {
            "@type": "Question",
            "name": "Wie berechnet man die Kraftstoffkosten richtig?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Formel: (Gesamtkilometer / 100) × Durchschnittsverbrauch × Spritpreis. Rechnen Sie bei voller Beladung, Dachboxen oder gebirgigen Strecken stets etwa 10–15% Mehrverbrauch hinzu."
            }
        },
        {
            "@type": "Question",
            "name": "Welche Reisekosten werden beim Camping oft vergessen?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Häufig übersehen werden Mautgebühren, länderspezifische Vignetten, Fährkosten, Parkgebühren, Strom- und Wasserpauschalen auf Campingplätzen sowie Kurtaxen und Gasverbrauch."
            }
        },
        {
            "@type": "Question",
            "name": "Wie kann man beim Campingurlaub Geld sparen?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nutzen Sie Rabattkarten (z.B. ACSI), reisen Sie in der Nebensaison, buchen Sie Vignetten vorab digital, tanken Sie abseits der Autobahn und kochen Sie öfter selbst im Wohnmobil."
            }
        }
    ]
};

const combinedSchema = [webAppSchema, faqSchema];

export default function ReisekostenrechnerPage() {
    const { trackUsage } = useToolAnalytics('reisekostenrechner');

    return (
        <div className="bg-white min-h-screen font-sans text-charcoal">
            {/* SEO Head */}
            <SEO
                title="Camping Reisekosten-Rechner – Budget für deine Campingreise | Campuna"
                description="Berechne die Gesamtkosten deiner Campingreise: Sprit, Stellplatzgebühren, Maut, Fähren und Nebenkosten auf einen Blick."
                canonicalPath="camping-helfer/reisekostenrechner"
                structuredData={combinedSchema}
            />

            {/* Compact Hero / Intro Strip */}
            <div className="bg-gradient-to-b from-sand/40 to-white border-b border-forest/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-6">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-5">
                        <ol className="flex items-center gap-1.5 text-[11px] font-mono text-charcoal/50">
                            <li>
                                <a
                                    href={getParentNavigationUrl('')}
                                    target="_parent"
                                    className="hover:text-forest transition-colors"
                                >
                                    Startseite
                                </a>
                            </li>
                            <li><ChevronRight className="w-3 h-3" /></li>
                            <li className="text-charcoal/40">Camping-Helfer</li>
                            <li><ChevronRight className="w-3 h-3" /></li>
                            <li className="text-forest font-bold">Reisekosten-Rechner</li>
                        </ol>
                    </nav>

                    {/* Page Title */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-forest/10 rounded-2xl shrink-0 mt-1">
                            <Fuel className="w-7 h-7 text-forest" />
                        </div>
                        <div>
                            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest leading-tight">
                                Camping Reisekosten-Rechner
                            </h1>
                            <p className="font-sans text-sm sm:text-base text-charcoal/60 font-light mt-2 max-w-2xl leading-relaxed">
                                Plane dein Reisebudget: Berechne Spritkosten, Stellplatzgebühren und Nebenkosten deiner nächsten Campingreise auf einen Blick.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculator Section – Main Focus */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                <div className="bg-white rounded-3xl border border-forest/5 shadow-md p-4 sm:p-8">
                    <BudgetCalculator
                        onCalculation={(data) => trackUsage('calculate', data)}
                    />
                </div>
            </div>

            {/* Detailed Guide Section */}
            <div className="bg-sand/15 border-t border-b border-forest/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
                    <div className="mb-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold block mb-2">
                            Ratgeber
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                            Was kostet ein Campingurlaub wirklich?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Column 1 */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Die drei größten Kostenfaktoren
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                    Die Reisekosten beim Camping setzen sich im Wesentlichen aus drei Posten zusammen: <strong className="font-semibold text-charcoal/90">Kraftstoff</strong> (oft 30–50% der Gesamtkosten bei weiten Strecken), <strong className="font-semibold text-charcoal/90">Stellplatz- bzw. Campingplatzgebühren</strong> (15–45 € pro Nacht in der Hauptsaison) und <strong className="font-semibold text-charcoal/90">Nebenkosten</strong> wie Maut, Vignetten, Fähren und Verpflegung.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Kraftstoffkosten richtig berechnen
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                    Die Grundformel: <strong className="font-semibold text-charcoal/90">(Kilometer ÷ 100) × Verbrauch × Spritpreis</strong>. Ein Wohnmobil verbraucht typischerweise zwischen 9 und 14 Liter Diesel pro 100 km. Plane bei Bergen, Gegenwind oder voll beladenem Fahrzeug 10–15% Aufschlag ein. Wer abseits der Autobahn tankt, spart schnell 5–10 Cent pro Liter.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Stellplatz vs. Campingplatz – Preisunterschiede
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                    Einfache Wohnmobil-Stellplätze kosten zwischen 8 und 20 € pro Nacht. Campingplätze mit Sanitäranlagen, Strom und WLAN liegen bei 25–50 €. In Skandinavien und der Schweiz sind die Preise oft höher, in Südeuropa außerhalb der Hauptsaison dagegen deutlich günstiger.
                                </p>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Versteckte Kosten, die oft vergessen werden
                                </h3>
                                <ul className="text-sm text-charcoal/70 leading-relaxed font-light space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span><strong className="font-semibold text-charcoal/90">Maut & Vignetten:</strong> In Frankreich, Italien, Spanien und Österreich können Mautgebühren schnell 50–150 € pro Strecke ausmachen.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span><strong className="font-semibold text-charcoal/90">Fähren:</strong> Überfahrten (z.B. nach Sardinien oder Skandinavien) kosten für Wohnmobile oft 200–500 € hin und zurück.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span><strong className="font-semibold text-charcoal/90">Strom & Wasser:</strong> Auf manchen Plätzen wird der Stromverbrauch separat abgerechnet (ca. 0,50–0,80 €/kWh).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span><strong className="font-semibold text-charcoal/90">Kurtaxe:</strong> In vielen Urlaubsorten wird pro Person und Nacht eine Kurtaxe von 1–3 € erhoben.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span><strong className="font-semibold text-charcoal/90">Gas:</strong> Eine 11-kg-Gasflasche kostet ca. 15–30 € und reicht je nach Nutzung 2–4 Wochen.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Spartipps für deine Campingreise
                                </h3>
                                <ul className="text-sm text-charcoal/70 leading-relaxed font-light space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Rabattkarten wie ACSI oder ADAC nutzen – bis zu 50% Ersparnis auf Campingplätzen.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Nebensaison reisen (Mai/Juni oder September/Oktober) – weniger Betrieb, niedrigere Preise.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Vignetten vorab online kaufen – häufig günstiger als an der Grenze.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Selbst kochen statt essen gehen – mit einer guten Campingküche sparst du erheblich.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Internal Links / Related Tools Strip */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                    {/* Link to Payload Calculator */}
                    <a
                        href={getParentNavigationUrl('camping-helfer/zuladungsrechner')}
                        target="_parent"
                        className="flex-1 group bg-sand/30 rounded-2xl p-5 border border-forest/10 hover:border-forest/20 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <div className="p-2.5 bg-forest/10 rounded-xl shrink-0 group-hover:bg-forest/15 transition-colors">
                            <Scale className="w-5 h-5 text-forest" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5">
                                Auch nützlich
                            </span>
                            <span className="font-display text-sm font-bold text-forest group-hover:text-gold transition-colors">
                                Zuladungsrechner
                            </span>
                            <p className="text-[11px] text-charcoal/50 font-light mt-0.5">
                                Berechne die verbleibende Zuladung deines Fahrzeugs.
                            </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-forest/40 group-hover:text-forest group-hover:translate-x-1 transition-all shrink-0" />
                    </a>

                    {/* Link to Campuna Categories */}
                    <a
                        href={getParentNavigationUrl('category/campingplätze-stellplätze')}
                        target="_parent"
                        className="flex-1 group bg-sand/30 rounded-2xl p-5 border border-forest/10 hover:border-forest/20 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <div className="p-2.5 bg-forest/10 rounded-xl shrink-0 group-hover:bg-forest/15 transition-colors">
                            <MapPin className="w-5 h-5 text-forest" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5">
                                Auf Campuna entdecken
                            </span>
                            <span className="font-display text-sm font-bold text-forest group-hover:text-gold transition-colors">
                                Stellplätze & Campingplätze
                            </span>
                            <p className="text-[11px] text-charcoal/50 font-light mt-0.5">
                                Finde den perfekten Stellplatz auf Campuna.
                            </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-forest/40 group-hover:text-forest group-hover:translate-x-1 transition-all shrink-0" />
                    </a>
                </div>
            </div>
        </div>
    );
}
