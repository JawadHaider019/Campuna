import { Scale, Fuel } from 'lucide-react';

export const TOOLS_DATA = {
    zuladungsrechner: {
        id: 'zuladungsrechner',
        slug: 'zuladungsrechner',
        canonicalPath: 'zuladungsrechner',
        title: 'Zuladungsrechner für Wohnmobil & Wohnwagen',
        shortTitle: 'Zuladungsrechner',
        metaTitle: 'Zuladungsrechner für Wohnmobil & Wohnwagen | Campuna',
        metaDescription: 'Berechne die verbleibende Zuladung deines Wohnmobils oder Wohnwagens (z.G.G.). Vermeide Überladung, Bußgelder und Risiken im Camping-Urlaub. Kostenlos & einfach.',
        heroSubtitle: 'Berechne das verbleibende Gewicht deines Fahrzeugs inklusive Insassen, Gepäck und Flüssigkeiten – schnell, exakt und verkehrssicher.',
        iconName: 'Scale',
        icon: Scale,
        analyticsKey: 'zuladungsrechner',
        calculatorType: 'payload',
        relatedCategorySlug: 'ausrüstung-und-zubehör',
        relatedCategoryName: 'Camping Zubehör & Ausrüstung',
        relatedListingsTitle: 'Passende Camping-Ausrüstung & Wohnmobile auf Campuna',
        structuredData: [
            {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Zuladungsrechner für Wohnmobil & Wohnwagen",
                "description": "Berechne die verbleibende Zuladung deines Wohnmobils oder Wohnwagens. Vermeide Überladung, Bußgelder und gefährliche Situationen im Camping-Urlaub.",
                "url": "https://campuna.de/zuladungsrechner",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                "provider": { "@type": "Organization", "name": "Campuna", "url": "https://campuna.de" }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Warum ist die Zuladung bei Wohnmobilen & Wohnwagen so wichtig?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Eine korrekte Zuladung ist entscheidend für die Fahrsicherheit. Überladung verlängert den Bremsweg erheblich, verschlechtert das Kurvenverhalten und kann zu Reifenplatzern führen. Zudem drohen im In- und Ausland hohe Bußgelder."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Wo finde ich das zulässige Gesamtgewicht (z.G.G.) und das Leergewicht?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Das zulässige Gesamtgewicht findest du in der Zulassungsbescheinigung Teil I (Fahrzeugschein) unter Feld F.1 (bzw. F.2). Das Leergewicht steht unter Feld G."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Wie hoch sind die Bußgelder bei Überladung?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "In Deutschland reichen Bußgelder von 10 € bei geringer Überladung bis zu 235 € und Punkten in Flensburg ab 20 % Überladung. In Nachbarländern wie Österreich oder der Schweiz drohen teils vierstellige Strafen und die sofortige Weiterfahrtsperre."
                        }
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Startseite",
                        "item": "https://campuna.de"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Zuladungsrechner",
                        "item": "https://campuna.de/zuladungsrechner"
                    }
                ]
            }
        ],
        guides: [
            {
                title: 'Was bedeutet "Zulässiges Gesamtgewicht"?',
                text: 'Das zulässige Gesamtgewicht (z.G.G.) ist das maximale Gewicht, das dein Fahrzeug inklusive aller Insassen, Gepäck, Vorräte, Gasflaschen und Flüssigkeiten auf die Waage bringen darf. Du findest diesen Wert im Fahrzeugschein unter Feld F.1.'
            },
            {
                title: 'So findest du die richtigen Gewichtsdaten im Fahrzeugschein',
                text: 'Deine Zulassungsbescheinigung Teil I (Fahrzeugschein) enthält alle relevanten Werte: Feld F.1 = zulässiges Gesamtgewicht (z.G.G.), Feld G = Masse des in Betrieb befindlichen Fahrzeugs (Leergewicht). Die Differenz ergibt deine theoretische maximale Zuladung.'
            },
            {
                title: 'Bußgelder & Strafen bei Überladung im In- & Ausland',
                text: 'In Deutschland gelten gestaffelte Bußgelder ab 10 € bis 235 € zzgl. 1 Punkt in Flensburg. In der Schweiz und Österreich wird streng kontrolliert: Hier drohen Strafen im vierstelligen Bereich sowie das strikte Umpacken oder Ablade-Pflicht vor der Weiterfahrt.'
            },
            {
                title: 'Praktische Tipps zum Gewicht sparen im Wohnmobil',
                bulletPoints: [
                    'Frischwassertank nur für die Fahrt füllen (ca. 10–20 Liter) – am Campingplatz auffüllen.',
                    'Campingmöbel & Geschirr aus Leichtbaumaterialien (Aluminium, Melamin, Bamboo) wählen.',
                    'Schwere Vorräte erst am Reiseziel einkaufen.',
                    'Gasflaschen aus Aluminium oder Kunststoff statt Stahl nutzen.'
                ]
            }
        ],
        faqs: [
            {
                question: 'Wie wird die Masse im fahrbereiten Zustand (Feld G) berechnet?',
                answer: 'Das Leergewicht nach EU-Norm beinhaltet das leere Fahrzeug inklusive 90 % gefülltem Kraftstofftank, 75 kg Fahrergewicht sowie gefülltem Frischwassertank und Gasflasche. Nachträglich eingebautes Zubehör (Markise, Mover, Sat-Anlage) geht allerdings vom freien Zuladungsbudget ab!'
            },
            {
                question: 'Was passiert, wenn ich mit dem Wohnwagen überladen gewogen werde?',
                answer: 'Die Polizei stellt das Gespann auf eine mobile Waage. Bei Überladung musst du vor Ort so lange ausladen oder Flüssigkeiten ablassen, bis das zulässige Gesamtgewicht unterschritten ist. Erst dann darfst du weiterfahren.'
            },
            {
                question: 'Kann man ein Wohnmobil auflasten lassen?',
                answer: 'Ja, viele Fahrzeuge lassen sich durch technische Anpassungen (z.B. Zusatzluftfedern, verstärkte Federn oder andere Felgen/Reifen) bei der Prüfstelle (TÜV/DEKRA) auf ein höheres z.G.G. auflasten.'
            }
        ]
    },

    reisekostenrechner: {
        id: 'reisekostenrechner',
        slug: 'reisekostenrechner',
        canonicalPath: 'reisekostenrechner',
        title: 'Camping Reisekosten-Rechner',
        shortTitle: 'Reisekosten-Rechner',
        metaTitle: 'Camping Reisekosten-Rechner – Budget für deine Campingreise | Campuna',
        metaDescription: 'Berechne die Gesamtkosten deiner Campingreise: Sprit, Stellplatzgebühren, Maut, Fähren und Verpflegung auf einen Blick. Kostenloser Online-Rechner.',
        heroSubtitle: 'Plane dein Urlaub budget vor der Abreise: Berechne Spritkosten, Stellplatzpreise, Maut und Verpflegung transparent und verlässlich.',
        iconName: 'Fuel',
        icon: Fuel,
        analyticsKey: 'reisekostenrechner',
        calculatorType: 'costs',
        relatedCategorySlug: 'campingplätze-stellplätze',
        relatedCategoryName: 'Stellplätze & Campingplätze',
        relatedListingsTitle: 'Entdecke Stellplätze & Camping-Services auf Campuna',
        structuredData: [
            {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Camping Reisekosten-Rechner",
                "description": "Berechne die Gesamtkosten deiner Campingreise: Sprit, Stellplatzgebühren, Maut, Fähren und Nebenkosten auf einen Blick.",
                "url": "https://campuna.de/reisekostenrechner",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                "provider": { "@type": "Organization", "name": "Campuna", "url": "https://campuna.de" }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Was kostet ein Campingurlaub durchschnittlich am Tag?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ein Campingurlaub für zwei Personen kostet im Schnitt zwischen 40 € und 120 € pro Tag. Die Kosten hängen stark vom Reiseziel, dem Fahrzeugverbrauch, Stellplatzkategorie und der Maut ab."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Wie berechne ich die Kraftstoffkosten für mein Wohnmobil?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Formel: (Gesamtkilometer / 100) x Verbrauch in Litern x Kraftstoffpreis pro Liter. Ein durchschnittliches Wohnmobil verbraucht ca. 9 bis 13 Litern Diesel auf 100 km."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Welche Nebenkosten werden beim Camping oft vergessen?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Zu den oft unterschätzten Nebenkosten gehören Autobahnmaut & Vignetten, Strompauschalen am Campingplatz (oft 4-8 € / Tag), Kurtaxe, Fährüberfahrten sowie Gasverbrauch zum Kochen und Heizen."
                        }
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Startseite",
                        "item": "https://campuna.de"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Reisekosten-Rechner",
                        "item": "https://campuna.de/reisekostenrechner"
                    }
                ]
            }
        ],
        guides: [
            {
                title: 'Die 4 Haupt-Kostenblöcke einer Campingreise',
                text: 'Campingkosten setzen sich im Wesentlichen zusammen aus: Kraftstoff (Fahrt & Ausflüge), Übernachtungskosten (Campingplatz/Stellplatz), Gebühren (Maut, Vignetten, Fähren) und Verpflegung/Aktivitäten.'
            },
            {
                title: 'Kraftstoffkosten präzise kalkulieren',
                text: 'Verwende die Formel: (Gesamtkilometer ÷ 100) × Verbrauch × Spritpreis. Berücksichtige auch Kilometer für Ausflüge vor Ort. Ein Kastenwagen verbraucht ca. 8–10 l/100km, integrierte Wohnmobile 10–14 l/100km, Gespanne 11–15 l/100km.'
            },
            {
                title: 'Maut, Vignetten & Tunnelgebühren in Europa',
                text: 'In Ländern wie Frankreich, Italien und Spanien wird streckenbezogene Maut erhoben. Österreich, Schweiz und Slowenien verlangen Vignetten (digital oder als Sticker). Für Wohnmobile über 3,5t gelten oft gesonderte Mautboxen (z.B. GO-Box in Österreich).'
            },
            {
                title: 'Effektive Spartipps für den Camping-Urlaub',
                bulletPoints: [
                    'Rabattkarten wie ACSI CampingCard in der Nebensaison nutzen (Übernachtungen oft für 15–25 €).',
                    'Kostenlose Wohnmobilstellplätze oder einfache Naturstellplätze ansteuern.',
                    'Vorausschauend fahren und Sprit sparen (optimal bei 90–100 km/h auf der Autobahn).',
                    'Selbst kochen statt täglich im Restaurant zu essen.'
                ]
            }
        ],
        faqs: [
            {
                question: 'Wie teuer sind Stellplätze in Europa im Durchschnitt?',
                answer: 'Einfache Wohnmobilstellplätze kosten meist 8 € bis 20 € pro Nacht. Komfort-Campingplätze mit Pool und Animation in Top-Lagen verlangen in der Hauptsaison zwischen 35 € und 80 € pro Nacht für ein Fahrzeug mit 2 Personen.'
            },
            {
                question: 'Lohnt sich ein Miet-Wohnmobil gegenüber dem eigenen Fahrzeug?',
                answer: 'Für Urlauber mit 1 bis 3 Wochen Jahresurlaub ist Mieten meist wirtschaftlicher, da Fixkosten für Versicherung, Wartung, Wertverlust und Stellplatz entfallen. Ab etwa 6–8 Wochen Camping pro Jahr lohnt sich die Anschaffung eines eigenen Fahrzeugs.'
            },
            {
                question: 'Wie hoch sind die Stromkosten auf Campingplätzen?',
                answer: 'Manche Plätze berechnen Strom pauschal mit 3 € bis 7 € pro Tag. Andere rechnen exakt nach kWh ab (meist 0,60 € bis 1,00 € pro kWh). Achte bei Nutzung von Elektroheizungen oder Klimaanlagen auf den Verbrauch.'
            }
        ]
    }
};

export const TOOLS_LIST = Object.values(TOOLS_DATA);

export function getToolBySlug(slug) {
    if (!slug) return TOOLS_DATA.zuladungsrechner;
    const cleanSlug = slug.toLowerCase().trim();
    if (cleanSlug.includes('reisekosten') || cleanSlug.includes('budget') || cleanSlug.includes('kosten')) {
        return TOOLS_DATA.reisekostenrechner;
    }
    if (cleanSlug.includes('zuladung') || cleanSlug.includes('payload') || cleanSlug.includes('gewicht')) {
        return TOOLS_DATA.zuladungsrechner;
    }
    return TOOLS_DATA[cleanSlug] || TOOLS_DATA.zuladungsrechner;
}
