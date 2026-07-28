import React from 'react';
import { ArrowRight, Scale, ChevronRight, Calculator } from 'lucide-react';
import SEO from '../components/SEO';
import PayloadCalculator from '../components/PayloadCalculator';
import { useToolAnalytics } from '../utils/useToolAnalytics';
import { navigateTo, getParentNavigationUrl } from '../utils/navigation';

// JSON-LD Structured Data
const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zuladungsrechner für Wohnmobil & Wohnwagen",
    "description": "Berechne die verbleibende Zuladung deines Wohnmobils oder Wohnwagens. Vermeide Überladung, Bußgelder und gefährliche Situationen im Camping-Urlaub.",
    "url": "https://campuna.de/camping-helfer/zuladungsrechner",
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
            "name": "Warum ist die Zuladung bei Wohnmobilen wichtig?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Eine korrekte Zuladung ist entscheidend für die Fahrsicherheit. Überladung verlängert den Bremsweg erheblich, verschlechtert das Kurvenverhalten und kann zu Reifenplatzern führen. Zudem schützen eingehaltene Gewichtsgrenzen vor empfindlichen Bußgeldern."
            }
        },
        {
            "@type": "Question",
            "name": "Was zählt alles zur Zuladung eines Wohnmobils?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zur Zuladung gehören alle Mitfahrer (abzüglich 75 kg Fahrergewicht), Gepäck, Kleidung, Proviant, Fahrräder, Campingmöbel, Nachrüstungen (Markise, Solar, Klimaanlage) sowie Frischwasser, Abwasser und Gasflaschen."
            }
        },
        {
            "@type": "Question",
            "name": "Wo finde ich das zulässige Gesamtgewicht meines Fahrzeugs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Das zulässige Gesamtgewicht (z.G.G.) steht in deiner Zulassungsbescheinigung Teil I (Fahrzeugschein) unter Feld F.1. Das Leergewicht (Masse im fahrbereiten Zustand) findest du unter Feld G."
            }
        },
        {
            "@type": "Question",
            "name": "Was passiert, wenn das Wohnmobil überladen ist?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bei Kontrollen drohen Bußgelder und Punkte in Flensburg. In Urlaubsländern wie Österreich oder der Schweiz gelten strenge Toleranzen mit Strafen bis in vierstellige Höhen und erzwungenem Entladen vor Ort. Zudem kann die Versicherung die Haftung reduzieren."
            }
        }
    ]
};

const combinedSchema = [webAppSchema, faqSchema];

export default function ZuladungsrechnerPage() {
    const { trackUsage } = useToolAnalytics('zuladungsrechner');

    return (
        <div className="bg-white min-h-screen font-sans text-charcoal">
            {/* SEO Head */}
            <SEO
                title="Zuladungsrechner für Wohnmobil & Wohnwagen | Campuna"
                description="Berechne die verbleibende Zuladung deines Wohnmobils oder Wohnwagens. Vermeide Überladung, Bußgelder und gefährliche Situationen im Camping-Urlaub."
                canonicalPath="camping-helfer/zuladungsrechner"
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
                            <li className="text-forest font-bold">Zuladungsrechner</li>
                        </ol>
                    </nav>

                    {/* Page Title */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-forest/10 rounded-2xl shrink-0 mt-1">
                            <Scale className="w-7 h-7 text-forest" />
                        </div>
                        <div>
                            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest leading-tight">
                                Zuladungsrechner für Wohnmobil & Wohnwagen
                            </h1>
                            <p className="font-sans text-sm sm:text-base text-charcoal/60 font-light mt-2 max-w-2xl leading-relaxed">
                                Berechne in Sekunden, ob dein Fahrzeug korrekt beladen ist. Vermeide teure Bußgelder und gefährliche Überladung auf deiner nächsten Campingreise.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculator Section – Main Focus */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                <div className="bg-white rounded-3xl border border-forest/5 shadow-md p-4 sm:p-8">
                    <PayloadCalculator
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
                            Zuladung beim Camping – was du wissen musst
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Column 1 */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Was bedeutet „zulässiges Gesamtgewicht"?
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                    Das zulässige Gesamtgewicht (z.G.G.) ist das maximale Gewicht, das dein Fahrzeug inklusive aller Insassen, Gepäck und Flüssigkeiten auf die Waage bringen darf. Du findest es im Fahrzeugschein unter Feld <strong className="font-semibold text-charcoal/90">F.1</strong>. Es wird vom Hersteller festgelegt und darf im Straßenverkehr nicht überschritten werden.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    So findest du die richtigen Gewichtsdaten
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                    Deine Zulassungsbescheinigung Teil I (Fahrzeugschein) enthält alle relevanten Gewichte: Feld <strong className="font-semibold text-charcoal/90">F.1</strong> = z.G.G., Feld <strong className="font-semibold text-charcoal/90">G</strong> = Leergewicht (Masse fahrbereit). Die Differenz ist deine theoretische Zuladung. Beachte: Im Leergewicht sind der Fahrer (75 kg Standard), ein zu 90% gefüllter Tank und Basisausrüstung ab Werk bereits enthalten.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Typische Zuladungswerte nach Fahrzeugtyp
                                </h3>
                                <div className="bg-white rounded-2xl border border-forest/10 overflow-hidden">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="bg-forest/5 text-forest">
                                                <th className="text-left p-3 font-bold">Fahrzeugtyp</th>
                                                <th className="text-right p-3 font-bold">Typische Zuladung</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-charcoal/70">
                                            <tr className="border-t border-forest/5">
                                                <td className="p-3">Kastenwagen (3,5 t)</td>
                                                <td className="p-3 text-right font-semibold">300–500 kg</td>
                                            </tr>
                                            <tr className="border-t border-forest/5">
                                                <td className="p-3">Teilintegrierter</td>
                                                <td className="p-3 text-right font-semibold">350–600 kg</td>
                                            </tr>
                                            <tr className="border-t border-forest/5">
                                                <td className="p-3">Vollintegrierter</td>
                                                <td className="p-3 text-right font-semibold">400–700 kg</td>
                                            </tr>
                                            <tr className="border-t border-forest/5">
                                                <td className="p-3">Wohnwagen</td>
                                                <td className="p-3 text-right font-semibold">150–350 kg</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Bußgelder bei Überladung
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                    In Deutschland gelten je nach Überladungsgrad gestaffelte Bußgelder ab 10 € (bis 5% Überladung) bis hin zu 235 € und einem Punkt in Flensburg (über 20%). In Österreich und der Schweiz sind die Strafen deutlich höher – dort drohen Bußen bis über 2.000 € und eine Weiterfahrt kann untersagt werden, bis das Fahrzeug entladen ist.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Tipps zum Gewicht sparen
                                </h3>
                                <ul className="text-sm text-charcoal/70 leading-relaxed font-light space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Frischwassertank nur teilweise füllen – du kannst unterwegs nachfüllen.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Leichtere Campingmöbel aus Aluminium statt Stahl verwenden.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Proviant erst am Zielort einkaufen – spart Transportgewicht.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Nur eine statt zwei Gasflaschen mitnehmen und unterwegs tauschen.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-forest font-bold mt-0.5">•</span>
                                        <span>Alle Gegenstände, die du auf der letzten Reise nicht genutzt hast, zu Hause lassen.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-display text-lg font-bold text-forest mb-3">
                                    Schwere Gegenstände richtig verstauen
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                                    Schwere Lasten gehören möglichst tief und nah an die Achsen. Im Heckstauraum nicht zu viel Gewicht konzentrieren – das verschlechtert das Lenkverhalten spürbar. Lose Gegenstände unbedingt sichern, damit sie bei einer Vollbremsung nicht zu Geschossen werden.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Internal Links / Related Tools Strip */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                    {/* Link to Budget Calculator */}
                    <a
                        href={getParentNavigationUrl('camping-helfer/reisekostenrechner')}
                        target="_parent"
                        className="flex-1 group bg-sand/30 rounded-2xl p-5 border border-forest/10 hover:border-forest/20 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <div className="p-2.5 bg-forest/10 rounded-xl shrink-0 group-hover:bg-forest/15 transition-colors">
                            <Calculator className="w-5 h-5 text-forest" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5">
                                Auch nützlich
                            </span>
                            <span className="font-display text-sm font-bold text-forest group-hover:text-gold transition-colors">
                                Camping-Reisebudget-Rechner
                            </span>
                            <p className="text-[11px] text-charcoal/50 font-light mt-0.5">
                                Berechne Sprit, Stellplatz & Nebenkosten deiner Tour.
                            </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-forest/40 group-hover:text-forest group-hover:translate-x-1 transition-all shrink-0" />
                    </a>

                    {/* Link to Campuna Categories */}
                    <a
                        href={getParentNavigationUrl('category/fahrzeuge')}
                        target="_parent"
                        className="flex-1 group bg-sand/30 rounded-2xl p-5 border border-forest/10 hover:border-forest/20 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <div className="p-2.5 bg-forest/10 rounded-xl shrink-0 group-hover:bg-forest/15 transition-colors">
                            <Scale className="w-5 h-5 text-forest" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5">
                                Auf Campuna entdecken
                            </span>
                            <span className="font-display text-sm font-bold text-forest group-hover:text-gold transition-colors">
                                Wohnmobile & Camper
                            </span>
                            <p className="text-[11px] text-charcoal/50 font-light mt-0.5">
                                Entdecke Fahrzeuge auf dem Campuna-Marktplatz.
                            </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-forest/40 group-hover:text-forest group-hover:translate-x-1 transition-all shrink-0" />
                    </a>
                </div>
            </div>
        </div>
    );
}
