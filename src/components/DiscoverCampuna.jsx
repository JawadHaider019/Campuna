import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Lightbulb,
    Compass,
    MessageSquare,
    Calculator,
    Plus,
    ArrowRight,
    TrendingUp,
    MapPin,
    Flame,
    ThumbsUp,
    MessageCircle,
    HelpCircle,
    Wrench,
    Fuel,
    Info,
    Euro,
    Scale
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';

// Mock Data for Discover Section
const DISCOVER_TIPS = [
    {
        id: 'tip_1',
        title: 'Wildcamping & Freistehen: Was ist in Deutschland erlaubt?',
        excerpt: 'Lerne die rechtlichen Unterschiede zwischen Biwakieren, Notlanden und illegalem Wildcamping kennen, um Bußgelder zu vermeiden.',
        readTime: '4 Min. Lesezeit',
        category: 'Rechtliches',
        date: 'Heute',
        views: '1.2k views',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
        id: 'tip_2',
        title: 'Wohnmobil winterfest machen: Die 10-Schritte-Checkliste',
        excerpt: 'Wasserleitungen entleeren, Frostschutz prüfen und Polster richtig lagern. Schütze dein Campingfahrzeug vor Frostschäden.',
        readTime: '6 Min. Lesezeit',
        category: 'Fahrzeugpflege',
        date: 'Gestern',
        views: '920 views',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-100'
    },
    {
        id: 'tip_3',
        title: '12 unverzichtbare Camping-Hacks für Regentage',
        excerpt: 'Von Microfaser-Tricks über kreative Belüftungsmethoden bis hin zu den besten Beschäftigungsideen im engen Raum.',
        readTime: '3 Min. Lesezeit',
        category: 'Praxis-Tipps',
        date: 'Vor 3 Tagen',
        views: '2.4k views',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-100'
    }
];

const DISCOVER_INSPIRATION = [
    {
        id: 'insp_1',
        title: 'Route Romantische Straße: Von Würzburg bis Neuschwanstein mit dem Camper',
        location: 'Süddeutschland',
        duration: '5-7 Tage',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        tags: ['Schlösser', 'Historisch', 'Panoramastraße'],
        description: 'Eine der ältesten und beliebtesten Ferienstraßen Deutschlands bietet malerische Stellplätze an Burgen und Weinbergen.'
    },
    {
        id: 'insp_2',
        title: 'Unbekanntes Mecklenburg: Naturcamping abseits der Touristenpfade',
        location: 'Mecklenburg-Vorpommern',
        duration: '3-4 Tage',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
        tags: ['Naturpur', 'Badesee', 'Ruhe'],
        description: 'Versteckte Seen, dichte Wälder und winzige Naturcampingplätze, die absolute Entspannung und Sternenhimmel pur bieten.'
    }
];

const DISCOVER_COMMUNITY = [
    {
        id: 'q_1',
        question: 'Welche Solartasche mit 100W bis 120W ist aktuell die zuverlässigste für Autarkie?',
        user: 'CamperVince',
        replies: 18,
        upvotes: 42,
        latestReply: 'Ich nutze die Wattstunde SunFolder seit 2 Jahren und bin super zufrieden...',
        tags: ['Elektrik', 'Solar', 'Autarkie']
    },
    {
        id: 'q_2',
        question: 'Dachzelt auf Standard-PKW montieren: Wie berechne ich die dynamische Dachlast korrekt?',
        user: 'DachzeltNeuling',
        replies: 9,
        upvotes: 27,
        latestReply: 'Du musst im Fahrzeugschein auf die maximale Dachlast achten. Die statische im Stand...',
        tags: ['Dachzelt', 'Zubehör', 'PKW-Lasten']
    },
    {
        id: 'q_3',
        question: 'Wie reinigt/desinfiziert ihr euren Wassertank nach einer längeren Standzeit (z.B. Winterpause)?',
        user: 'HappyTrailer',
        replies: 31,
        upvotes: 68,
        latestReply: 'Am einfachsten geht es mit Chlordioxid-Präparaten, das reinigt geruchslos und gründlich...',
        tags: ['Hygiene', 'Wasserpflege', 'Wartung']
    }
];

export default function DiscoverCampuna() {
    const [activeTab, setActiveTab] = useState('tips');

    // Custom tools state variables
    const [activeTool, setActiveTool] = useState('payload'); // 'payload' or 'costs'

    // ── Tool 1: Payload Calculator State ──
    const [maxWeight, setMaxWeight] = useState(3500);
    const [emptyWeight, setEmptyWeight] = useState(2850);
    const [driverWeight, setDriverWeight] = useState(75);
    const [passengers, setPassengers] = useState(1);
    const [passengersWeight, setPassengersWeight] = useState(75);
    const [waterWater, setWaterWater] = useState(80);
    const [gasWeight, setGasWeight] = useState(22);
    const [baggage, setBaggage] = useState(150);
    const [equipment, setEquipment] = useState(80);

    // Calculations for Payload
    const totalPassengersWeight = passengers * passengersWeight;
    const currentTotalWeight = emptyWeight + driverWeight + totalPassengersWeight + waterWater + gasWeight + baggage + equipment;
    const remainingPayload = maxWeight - currentTotalWeight;
    const payloadPercentage = Math.min(((currentTotalWeight - emptyWeight) / (maxWeight - emptyWeight)) * 100, 100);

    // ── Tool 2: Trip Cost Calculator State ──
    const [distance, setDistance] = useState(600);
    const [consumption, setConsumption] = useState(10.5);
    const [fuelPrice, setFuelPrice] = useState(1.75);
    const [campsiteCost, setCampsiteCost] = useState(35);
    const [nights, setNights] = useState(5);
    const [otherBudget, setOtherBudget] = useState(100);

    // Calculations for Cost
    const fuelCostTotal = (distance / 100) * consumption * fuelPrice;
    const campsiteCostTotal = campsiteCost * nights;
    const totalCost = fuelCostTotal + campsiteCostTotal + otherBudget;

    // Render content according to active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'tips':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {DISCOVER_TIPS.map((tip) => (
                            <div
                                key={tip.id}
                                className="bg-white rounded-3xl p-6 border border-forest/5 shadow-md hover:shadow-xl hover:border-forest/10 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${tip.badgeColor}`}>
                                            {tip.category}
                                        </span>
                                        <span className="text-[11px] text-charcoal/40 font-mono">{tip.date}</span>
                                    </div>
                                    <h3 className="font-display text-base sm:text-lg font-bold text-forest hover:text-gold transition-colors duration-200 mb-2.5 leading-snug cursor-pointer">
                                        {tip.title}
                                    </h3>
                                    <p className="font-sans text-[13px] text-charcoal/70 leading-relaxed font-light mb-4">
                                        {tip.excerpt}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-forest/5 flex items-center justify-between">
                                    <span className="text-[11px] text-charcoal/45 font-sans font-medium flex items-center gap-1">
                                        <Lightbulb className="w-3.5 h-3.5 text-gold" />
                                        {tip.readTime}
                                    </span>
                                    <button className="text-[11px] font-bold text-forest hover:text-gold uppercase tracking-wider flex items-center gap-1 transition-colors">
                                        Lesen <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                );

            case 'inspiration':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {DISCOVER_INSPIRATION.map((insp) => (
                            <div
                                key={insp.id}
                                className="group bg-white rounded-3xl overflow-hidden border border-forest/5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
                            >
                                <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-sand/10">
                                    <img
                                        src={insp.image}
                                        alt={insp.title}
                                        className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-gold" /> {insp.location}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-wrap gap-1 mb-2.5">
                                            {insp.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-sand text-forest font-mono text-[9px] font-bold py-0.5 px-2 rounded">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="font-display text-base font-bold text-forest leading-snug mb-2 group-hover:text-gold transition-colors duration-200 cursor-pointer">
                                            {insp.title}
                                        </h3>
                                        <p className="font-sans text-[12.5px] text-charcoal/70 leading-relaxed font-light mb-4 line-clamp-2">
                                            {insp.description}
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-forest/5 flex items-center justify-between">
                                        <span className="text-[11px] font-mono text-charcoal/50">Dauer: {insp.duration}</span>
                                        <button className="text-[11px] font-bold text-forest hover:text-gold uppercase tracking-wider flex items-center gap-1 transition-colors">
                                            Route laden <Compass className="w-3.5 h-3.5 text-forest group-hover:text-gold" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                );

            case 'community':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                    >
                        {DISCOVER_COMMUNITY.map((q) => (
                            <div
                                key={q.id}
                                className="bg-white rounded-2xl p-5 border border-forest/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-4"
                            >
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="font-sans text-[11px] font-bold text-forest/70 bg-forest/5 py-0.5 px-2 rounded-md">
                                            Gelöst
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {q.tags.map((t, idx) => (
                                                <span key={idx} className="text-[10px] text-charcoal/40 font-mono">#{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <h4 className="font-display text-sm sm:text-base font-bold text-forest hover:text-gold cursor-pointer leading-snug">
                                        {q.question}
                                    </h4>
                                    <div className="bg-sand/35 hover:bg-sand/50 rounded-xl p-3 flex items-start gap-2 border border-forest/5 transition-colors">
                                        <span className="bg-forest/10 p-1 rounded-lg text-forest shrink-0 mt-0.5">
                                            <HelpCircle className="w-3.5 h-3.5" />
                                        </span>
                                        <p className="font-sans text-[12.5px] text-charcoal/80 leading-relaxed font-light">
                                            <strong className="font-semibold text-forest">{q.user}</strong>: "{q.latestReply}"
                                        </p>
                                    </div>
                                </div>

                                {/* Engagement Numbers */}
                                <div className="flex md:flex-col items-center justify-between md:justify-center md:items-end gap-3 self-stretch border-t md:border-t-0 md:border-l border-forest/5 pt-3 md:pt-0 md:pl-5 shrink-0 min-w-[120px]">
                                    <div className="flex items-center gap-4 text-xs font-mono text-charcoal/50">
                                        <span className="flex items-center gap-1 shrink-0">
                                            <ThumbsUp className="w-3.5 h-3.5 text-forest/65" />
                                            {q.upvotes}
                                        </span>
                                        <span className="flex items-center gap-1 shrink-0">
                                            <MessageCircle className="w-3.5 h-3.5 text-forest/65" />
                                            {q.replies}
                                        </span>
                                    </div>
                                    <button className="bg-forest hover:bg-gold text-white hover:text-forest text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer">
                                        Helfen
                                    </button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                );

            case 'tools':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-3xl border border-forest/5 shadow-md p-6 sm:p-8"
                    >
                        {/* Tool Selection Tabs */}
                        <div className="flex border-b border-forest/10 pb-4 mb-6 gap-4">
                            <button
                                onClick={() => setActiveTool('payload')}
                                className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTool === 'payload'
                                        ? 'bg-forest text-gold shadow-md'
                                        : 'text-charcoal/60 hover:bg-sand hover:text-forest'
                                    }`}
                            >
                                <Scale className="w-4 h-4" /> Zuladungsrechner (z.G.G.)
                            </button>
                            <button
                                onClick={() => setActiveTool('costs')}
                                className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTool === 'costs'
                                        ? 'bg-forest text-gold shadow-md'
                                        : 'text-charcoal/60 hover:bg-sand hover:text-forest'
                                    }`}
                            >
                                <Fuel className="w-4 h-4" /> Sprit- & Reisekostenrechner
                            </button>
                        </div>

                        {activeTool === 'payload' ? (
                            // Option A: Payload Calculator
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Inputs */}
                                <div className="lg:col-span-7 space-y-5">
                                    <div className="flex items-center gap-2 text-forest mb-2">
                                        <Scale className="w-5 h-5 text-forest" />
                                        <h4 className="font-display text-base font-bold">Wohnmobil / Wohnwagen Zuladung</h4>
                                    </div>
                                    <p className="font-sans text-[12.5px] text-charcoal/60 leading-relaxed font-light mb-4">
                                        Berechne das verbleibende Gewicht deines Fahrzeugs, um Überladung und hohe Bußgelder im Camping-Urlaub zu vermeiden.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Max Weight */}
                                        <div className="space-y-1.5">
                                            <label className="block text-[11px] font-bold text-forest uppercase tracking-widest">
                                                Zul. Gesamtgewicht (kg)
                                            </label>
                                            <input
                                                type="number"
                                                value={maxWeight}
                                                onChange={e => setMaxWeight(Number(e.target.value))}
                                                className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                            />
                                        </div>
                                        {/* Empty Weight */}
                                        <div className="space-y-1.5">
                                            <label className="block text-[11px] font-bold text-forest uppercase tracking-widest">
                                                Masse fahrbereit (kg)
                                            </label>
                                            <input
                                                type="number"
                                                value={emptyWeight}
                                                onChange={e => setEmptyWeight(Number(e.target.value))}
                                                className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                            />
                                        </div>
                                    </div>

                                    {/* Cargo Sliders */}
                                    <div className="space-y-4 pt-3">
                                        {/* Driver, Passengers */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Fahrer (kg)</span>
                                                    <span>{driverWeight} kg</span>
                                                </div>
                                                <input
                                                    type="range" min="50" max="150" step="1"
                                                    value={driverWeight} onChange={e => setDriverWeight(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Beifahrer / Mitf.</span>
                                                    <span>{passengers} Pers.</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="6" step="1"
                                                    value={passengers} onChange={e => setPassengers(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Gew. je Beif. (kg)</span>
                                                    <span>{passengersWeight} kg</span>
                                                </div>
                                                <input
                                                    type="range" min="40" max="120" step="1"
                                                    value={passengersWeight} onChange={e => setPassengersWeight(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>
                                        </div>

                                        {/* Water and Gas */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Wasser (Liter/kg)</span>
                                                    <span>{waterWater} kg</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="250" step="5"
                                                    value={waterWater} onChange={e => setWaterWater(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Gasflaschen (kg)</span>
                                                    <span>{gasWeight} kg</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="60" step="1"
                                                    value={gasWeight} onChange={e => setGasWeight(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>
                                        </div>

                                        {/* Baggage and Equipment */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Gepäck & Vorräte (kg)</span>
                                                    <span>{baggage} kg</span>
                                                </div>
                                                <input
                                                    type="range" min="20" max="500" step="5"
                                                    value={baggage} onChange={e => setBaggage(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Ausrüstung / Stühle (kg)</span>
                                                    <span>{equipment} kg</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="300" step="5"
                                                    value={equipment} onChange={e => setEquipment(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Results Screen */}
                                <div className="lg:col-span-5 bg-sand/30 rounded-3xl p-6 border border-forest/10 flex flex-col justify-between font-sans">
                                    <div>
                                        <h5 className="text-xs font-bold text-forest uppercase tracking-[0.2em] mb-4">Ergebnis</h5>

                                        <div className="space-y-4">
                                            {/* Current Total */}
                                            <div className="flex justify-between items-baseline border-b border-forest/5 pb-2">
                                                <span className="text-xs text-charcoal/60">Aktuelles Gesamtgewicht:</span>
                                                <span className="text-xl font-bold text-forest">{currentTotalWeight} kg</span>
                                            </div>

                                            {/* Max Limit */}
                                            <div className="flex justify-between items-baseline border-b border-forest/5 pb-2">
                                                <span className="text-xs text-charcoal/60">Zulässiges Limit:</span>
                                                <span className="text-sm font-semibold text-charcoal/80">{maxWeight} kg</span>
                                            </div>

                                            {/* Remaining capacity */}
                                            <div className="flex justify-between items-baseline pt-2">
                                                <span className="text-xs text-charcoal/60">Verbleibende Reserve:</span>
                                                <span className={`text-xl font-extrabold ${remainingPayload < 0 ? 'text-rose-600 animate-pulse' : 'text-forest'}`}>
                                                    {remainingPayload} kg
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress Bar visual indicator */}
                                        <div className="mt-6 space-y-1">
                                            <div className="h-3 w-full bg-sand rounded-full overflow-hidden border border-forest/5">
                                                <div
                                                    className={`h-full transition-all duration-300 rounded-full ${remainingPayload < 0
                                                            ? 'bg-rose-500'
                                                            : remainingPayload < 50
                                                                ? 'bg-amber-500'
                                                                : 'bg-forest'
                                                        }`}
                                                    style={{ width: `${payloadPercentage}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[9px] font-mono text-charcoal/40">
                                                <span>Leergewicht ({emptyWeight}kg)</span>
                                                <span>{payloadPercentage.toFixed(0)}% Kapazität</span>
                                                <span>Max ({maxWeight}kg)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Warning Info box */}
                                    <div className={`mt-6 p-4 rounded-xl flex items-start gap-2 border text-xs leading-relaxed ${remainingPayload < 0
                                            ? 'bg-rose-50 border-rose-100 text-rose-800'
                                            : remainingPayload < 50
                                                ? 'bg-amber-50 border-amber-100 text-amber-800'
                                                : 'bg-emerald-50 border-emerald-100 text-emerald-800'
                                        }`}>
                                        <Info className={`w-4 h-4 shrink-0 mt-0.5 ${remainingPayload < 0 ? 'text-rose-500' : 'text-forest'}`} />
                                        <div>
                                            {remainingPayload < 0 ? (
                                                <strong>Achtung: Dein Fahrzeug ist überladen!</strong>
                                            ) : remainingPayload < 50 ? (
                                                <strong>Vorsicht: Sehr knappe Zuladungsreserve!</strong>
                                            ) : (
                                                <strong>Gute Fahrt!</strong>
                                            )}
                                            <p className="mt-1 font-light opacity-90">
                                                {remainingPayload < 0
                                                    ? 'Du überschreitest das zulässige Gesamtgewicht. In Deutschland und Europa drohen bei Kontrollen empfindliche Bußgelder.'
                                                    : remainingPayload < 50
                                                        ? 'Die Reserve ist sehr gering. Wenn Personen zusteigen oder Gepäck hinzukommt, riskierst du eine Überladung.'
                                                        : 'Deine Zuladung liegt im grünen Bereich. Achte trotzdem auf eine gleichmäßige Gewichtsverteilung.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Option B: Fuel & Trip Costs Calculator
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Inputs */}
                                <div className="lg:col-span-7 space-y-5">
                                    <div className="flex items-center gap-2 text-forest mb-2">
                                        <Fuel className="w-5 h-5 text-forest" />
                                        <h4 className="font-display text-base font-bold">Fahrt- & Stellplatzbudget planen</h4>
                                    </div>
                                    <p className="font-sans text-[12.5px] text-charcoal/60 leading-relaxed font-light mb-4">
                                        Berechne unkompliziert die Treibstoffkosten und Campingkosten für deine nächste Autoreise.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Distance */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Reiseentfernung (km)</span>
                                                    <span>{distance} km</span>
                                                </div>
                                                <input
                                                    type="range" min="50" max="4000" step="50"
                                                    value={distance} onChange={e => setDistance(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>

                                            {/* Nights */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs text-charcoal/80 font-mono">
                                                    <span>Anzahl Nächte</span>
                                                    <span>{nights} Nächte</span>
                                                </div>
                                                <input
                                                    type="range" min="1" max="60" step="1"
                                                    value={nights} onChange={e => setNights(Number(e.target.value))}
                                                    className="w-full accent-forest"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                                            {/* Fuel Consumption */}
                                            <div className="space-y-1.5">
                                                <label className="block text-[11px] font-bold text-forest uppercase tracking-widest">
                                                    Verbrauch (l/100km)
                                                </label>
                                                <input
                                                    type="number" step="0.1"
                                                    value={consumption}
                                                    onChange={e => setConsumption(Number(e.target.value))}
                                                    className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                                />
                                            </div>

                                            {/* Spritpreis */}
                                            <div className="space-y-1.5">
                                                <label className="block text-[11px] font-bold text-forest uppercase tracking-widest">
                                                    Spritpreis (€/l)
                                                </label>
                                                <input
                                                    type="number" step="0.01"
                                                    value={fuelPrice}
                                                    onChange={e => setFuelPrice(Number(e.target.value))}
                                                    className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                                />
                                            </div>

                                            {/* Campsite charge */}
                                            <div className="space-y-1.5">
                                                <label className="block text-[11px] font-bold text-forest uppercase tracking-widest">
                                                    Stellplatz / Nacht (€)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={campsiteCost}
                                                    onChange={e => setCampsiteCost(Number(e.target.value))}
                                                    className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                                />
                                            </div>
                                        </div>

                                        {/* Other reserves */}
                                        <div className="space-y-1.5 pt-2 max-w-xs">
                                            <label className="block text-[11px] font-bold text-forest uppercase tracking-widest">
                                                Sonstiges Budget (Vignetten, Maut, Essen)
                                            </label>
                                            <input
                                                type="number"
                                                value={otherBudget}
                                                onChange={e => setOtherBudget(Number(e.target.value))}
                                                className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Results Screen */}
                                <div className="lg:col-span-5 bg-sand/30 rounded-3xl p-6 border border-forest/10 flex flex-col justify-between font-sans">
                                    <div>
                                        <h5 className="text-xs font-bold text-forest uppercase tracking-[0.2em] mb-4">Kostenschätzung</h5>

                                        <div className="space-y-4">
                                            {/* Fuel costs */}
                                            <div className="flex justify-between items-baseline border-b border-forest/5 pb-2">
                                                <span className="text-xs text-charcoal/60">Kraftstoffkosten:</span>
                                                <span className="text-sm font-semibold text-charcoal/80">{fuelCostTotal.toFixed(2)} €</span>
                                            </div>

                                            {/* Camping costs */}
                                            <div className="flex justify-between items-baseline border-b border-forest/5 pb-2">
                                                <span className="text-xs text-charcoal/60">Übernachtungskosten:</span>
                                                <span className="text-sm font-semibold text-charcoal/80">{campsiteCostTotal.toFixed(2)} €</span>
                                            </div>

                                            {/* Other */}
                                            <div className="flex justify-between items-baseline border-b border-forest/5 pb-2">
                                                <span className="text-xs text-charcoal/60">Maut & Nebenkosten:</span>
                                                <span className="text-sm font-semibold text-charcoal/80">{otherBudget.toFixed(2)} €</span>
                                            </div>

                                            {/* Total cost */}
                                            <div className="flex justify-between items-baseline pt-2">
                                                <span className="text-xs text-forest font-bold uppercase tracking-wider">Gesamtbedarf:</span>
                                                <span className="text-2xl font-extrabold text-forest">
                                                    {totalCost.toFixed(2)} €
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary Box */}
                                    <div className="mt-6 p-4 rounded-xl flex items-start gap-2 border bg-emerald-50 border-emerald-100 text-emerald-800 text-xs leading-relaxed">
                                        <Euro className="w-4 h-4 shrink-0 mt-0.5 text-forest" />
                                        <div>
                                            <strong>Budgetübersicht bereit!</strong>
                                            <p className="mt-1 font-light opacity-90">
                                                Für deine {distance} km lange Reise mit {nights} Übernachtungen benötigst du ca. <strong className="font-semibold">{totalCost.toFixed(0)} €</strong>.
                                                Tipp: Rechne immer etwa 10% Reserve für unvorhergesehene Tankstopps oder erhöhte Platzgebühren ein.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <section id="discover-campuna" className="py-16 bg-sand/15 border-t border-b border-forest/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div className="space-y-3">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
                            Entdecke Campuna
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-forest">
                            Camping-Wissen & Nützliche Tools
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-charcoal/70 max-w-xl font-light">
                            Finde hilfreiche Tipps, lass dich für deine nächste Route inspirieren, diskutiere mit der Community oder plane dein Fahrzeuggewicht.
                        </p>
                    </div>
                </div>

                {/* Categories Tab Navigation */}
                <div className="flex flex-wrap border-b border-forest/10 mb-8 gap-1">
                    <button
                        onClick={() => setActiveTab('tips')}
                        className={`flex items-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${activeTab === 'tips'
                                ? 'border-forest text-forest'
                                : 'border-transparent text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <Lightbulb className="w-4 h-4" /> Camping-Tipps
                    </button>
                    <button
                        onClick={() => setActiveTab('inspiration')}
                        className={`flex items-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${activeTab === 'inspiration'
                                ? 'border-forest text-forest'
                                : 'border-transparent text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <Compass className="w-4 h-4" /> Inspirationen
                    </button>
                    <button
                        onClick={() => setActiveTab('community')}
                        className={`flex items-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${activeTab === 'community'
                                ? 'border-forest text-forest'
                                : 'border-transparent text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" /> Community-Fragen
                    </button>
                    <button
                        onClick={() => setActiveTab('tools')}
                        className={`flex items-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${activeTab === 'tools'
                                ? 'border-forest text-forest'
                                : 'border-transparent text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <Calculator className="w-4 h-4" /> Interaktive Camping-Tools
                    </button>
                </div>

                {/* Tab Content Window */}
                <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {renderTabContent()}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
