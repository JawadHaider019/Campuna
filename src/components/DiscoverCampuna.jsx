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


const INITIAL_COMMUNITY_QUESTIONS = [
    {
        id: 'q_1',
        question: 'Welche Solartasche mit 100W bis 120W ist aktuell die zuverlässigste für Autarkie?',
        user: 'CamperVince',
        liked: false,
        upvotes: 42,
        tags: ['Elektrik', 'Solar', 'Autarkie'],
        comments: [
            {
                id: 'c1_3',
                user: 'CamperVince',
                text: 'Ich nutze die Wattstunde SunFolder seit 2 Jahren und bin super zufrieden...',
                date: 'Heute'
            },
            {
                id: 'c1_2',
                user: 'OffgridCamper',
                text: 'Ich kann auch die von Offgridtec empfehlen, gute Verarbeitung und robuster Stoff.',
                date: 'Gestern'
            },
            {
                id: 'c1_1',
                user: 'SunSeeker',
                text: 'Ich nutze seit letztem Jahr eine Wattstunde Solartasche. Sie liefert zuverlässig Strom, selbst bei leichter Bewölkung.',
                date: 'Vor 2 Tagen'
            }
        ]
    },
    {
        id: 'q_2',
        question: 'Dachzelt auf Standard-PKW montieren: Wie berechne ich die dynamische Dachlast korrekt?',
        user: 'DachzeltNeuling',
        liked: false,
        upvotes: 27,
        tags: ['Dachzelt', 'Zubehör', 'PKW-Lasten'],
        comments: [
            {
                id: 'c2_3',
                user: 'NeulingGerhard',
                text: 'Du musst im Fahrzeugschein auf die maximale Dachlast achten. Die statische im Stand...',
                date: 'Gestern'
            },
            {
                id: 'c2_2',
                user: 'CampingFreak',
                text: 'Genau, dynamisch ist für die Fahrt relevant. Dachzelt + Träger dürfen das nicht überschreiten.',
                date: 'Vor 2 Tagen'
            },
            {
                id: 'c2_1',
                user: 'RooftopExplorer',
                text: 'Die dynamische Dachlast findest du im Handbuch deines PKWs (meistens 75kg oder 100kg). Die statische im Stand ist viel höher!',
                date: 'Vor 3 Tagen'
            }
        ]
    },
    {
        id: 'q_3',
        question: 'Wie reinigt/desinfiziert ihr euren Wassertank nach einer längeren Standzeit (z.B. Winterpause)?',
        user: 'HappyTrailer',
        liked: false,
        upvotes: 68,
        tags: ['Hygiene', 'Wasserpflege', 'Wartung'],
        comments: [
            {
                id: 'c3_2',
                user: 'HappyTrailer',
                text: 'Am einfachsten geht es mit Chlordioxid-Präparaten, das reinigt geruchslos und gründlich...',
                date: 'Vor 4 Tagen'
            },
            {
                id: 'c3_1',
                user: 'CleanWater',
                text: 'Ich benutze immer biologisch abbaubare Reiniger auf Zitronensäurebasis, danach gut durchspülen.',
                date: 'Vor 5 Tagen'
            }
        ]
    }
];


export default function DiscoverCampuna() {
    const [activeTab, setActiveTab] = useState('tips');

    // ── Community Q&A State ──
    const [questions, setQuestions] = useState(INITIAL_COMMUNITY_QUESTIONS);
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setExpandedQuestionId(null);
        setIsQuestionFormOpen(false);
    };
    const [newCommentUser, setNewCommentUser] = useState('');
    const [newCommentText, setNewCommentText] = useState('');
    const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionTags, setNewQuestionTags] = useState('');
    const [newQuestionUser, setNewQuestionUser] = useState('');

    // Toggle like/upvote
    const handleToggleLike = (questionId) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                const liked = !q.liked;
                return {
                    ...q,
                    liked,
                    upvotes: liked ? q.upvotes + 1 : q.upvotes - 1
                };
            }
            return q;
        }));
    };

    // Add comment/reply
    const handleAddComment = (e, questionId) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        const commenter = newCommentUser.trim() || 'Gast-Camper';
        const newComment = {
            id: `c_${Date.now()}`,
            user: commenter,
            text: newCommentText.trim(),
            date: 'Gerade eben'
        };

        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    comments: [newComment, ...q.comments]
                };
            }
            return q;
        }));

        setNewCommentText('');
    };

    // Add new question
    const handleAddQuestion = (e) => {
        e.preventDefault();
        if (!newQuestionText.trim()) return;

        const author = newQuestionUser.trim() || 'NeuerCamper';
        const tagsArray = newQuestionTags
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0);

        const newQ = {
            id: `q_${Date.now()}`,
            question: newQuestionText.trim(),
            user: author,
            liked: false,
            upvotes: 0,
            tags: tagsArray.length > 0 ? tagsArray : ['Allgemein'],
            comments: []
        };

        setQuestions(prev => [newQ, ...prev]);
        setNewQuestionText('');
        setNewQuestionUser('');
        setNewQuestionTags('');
        setIsQuestionFormOpen(false);
    };

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
                        {/* Ask a Question Bar */}
                        <div className="bg-sand/30 border border-forest/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h4 className="font-display text-sm sm:text-base font-bold text-forest">
                                    Haben Sie eine eigene Frage an die Community?
                                </h4>
                                <p className="font-sans text-[11px] sm:text-xs text-charcoal/60 leading-relaxed font-light">
                                    Erstelle einen neuen Beitrag, um wertvolles Feedback von erfahrenen Campern zu erhalten.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsQuestionFormOpen(!isQuestionFormOpen)}
                                className="bg-forest hover:bg-gold text-white hover:text-forest text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0 grow-0 cursor-pointer self-start sm:self-auto"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                {isQuestionFormOpen ? 'Schließen' : 'Frage stellen'}
                            </button>
                        </div>

                        {/* Add Question Form Drawer */}
                        <AnimatePresence>
                            {isQuestionFormOpen && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleAddQuestion}
                                    className="bg-white border border-forest/10 rounded-2xl p-5 shadow-inner space-y-4 overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-forest uppercase tracking-widest">
                                                Dein Name / Username *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={newQuestionUser}
                                                onChange={e => setNewQuestionUser(e.target.value)}
                                                placeholder="z.B. CamperJoe"
                                                className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-forest uppercase tracking-widest">
                                                Tags/Kategorien (Kommagetrennt)
                                            </label>
                                            <input
                                                type="text"
                                                value={newQuestionTags}
                                                onChange={e => setNewQuestionTags(e.target.value)}
                                                placeholder="z.B. Zubehör, Elektrik"
                                                className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-forest uppercase tracking-widest">
                                            Deine Frage *
                                        </label>
                                        <textarea
                                            required
                                            value={newQuestionText}
                                            onChange={e => setNewQuestionText(e.target.value)}
                                            placeholder="Beschreibe deine Frage möglichst präzise..."
                                            rows="3"
                                            className="w-full bg-sand/30 border border-forest/10 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-forest text-charcoal resize-none"
                                        />
                                    </div>
                                    <div className="flex justify-end pt-1">
                                        <button
                                            type="submit"
                                            className="bg-forest hover:bg-gold text-white hover:text-forest text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-colors cursor-pointer"
                                        >
                                            Frage veröffentlichen
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Questions List */}
                        {questions.map((q) => {
                            const totalComments = q.comments.length;
                            const latestComment = totalComments > 0 ? q.comments[0] : null;
                            const isExtended = expandedQuestionId === q.id;

                            return (
                                <div
                                    key={q.id}
                                    className="bg-white rounded-2xl p-5 border border-forest/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-sans text-[11px] font-bold py-0.5 px-2 rounded-md ${totalComments > 0
                                                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                                                    : 'text-amber-700 bg-amber-50 border border-amber-100'
                                                    }`}>
                                                    {totalComments > 0 ? 'Beantwortet' : 'Offen'}
                                                </span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {q.tags.map((t, idx) => (
                                                        <span key={idx} className="text-[10px] text-charcoal/40 font-mono">#{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <h4
                                                onClick={() => setExpandedQuestionId(isExtended ? null : q.id)}
                                                className="font-display text-sm sm:text-base font-bold text-forest hover:text-gold cursor-pointer leading-snug transition-colors"
                                            >
                                                {q.question}
                                            </h4>

                                            {/* Show latest reply snippet (if exists) & clickable to open answers */}
                                            {latestComment ? (
                                                <div
                                                    onClick={() => setExpandedQuestionId(isExtended ? null : q.id)}
                                                    className="bg-sand/35 hover:bg-sand/50 rounded-xl p-3 flex items-start gap-2 border border-forest/5 cursor-pointer transition-colors"
                                                >
                                                    <span className="bg-forest/10 p-1 rounded-lg text-forest shrink-0 mt-0.5">
                                                        <HelpCircle className="w-3.5 h-3.5" />
                                                    </span>
                                                    <p className="font-sans text-[12.5px] text-charcoal/80 leading-relaxed font-light">
                                                        <strong className="font-semibold text-forest">{latestComment.user}</strong>: "{latestComment.text}"
                                                    </p>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => setExpandedQuestionId(isExtended ? null : q.id)}
                                                    className="bg-sand/35 hover:bg-sand/50 rounded-xl p-3 flex items-center justify-center gap-2 border border-forest/5 cursor-pointer text-xs text-charcoal/50 font-light italic"
                                                >
                                                    Noch keine Antworten. Klicke auf "Helfen", um die erste Antwort zu schreiben!
                                                </div>
                                            )}
                                        </div>

                                        {/* Engagement Numbers */}
                                        <div className="flex md:flex-col items-center justify-between md:justify-center md:items-end gap-3 self-stretch border-t md:border-t-0 md:border-l border-forest/5 pt-3 md:pt-0 md:pl-5 shrink-0 min-w-[120px]">
                                            <div className="flex items-center gap-4 text-xs font-mono text-charcoal/50">
                                                <button
                                                    onClick={() => handleToggleLike(q.id)}
                                                    className={`flex items-center gap-1 shrink-0 transition-all active:scale-95 group hover:text-forest ${q.liked ? 'text-forest font-bold' : ''}`}
                                                >
                                                    <ThumbsUp className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${q.liked ? 'fill-forest text-forest' : 'text-forest/65'}`} />
                                                    {q.upvotes}
                                                </button>
                                                <button
                                                    onClick={() => setExpandedQuestionId(isExtended ? null : q.id)}
                                                    className="flex items-center gap-1 shrink-0 hover:text-forest"
                                                >
                                                    <MessageCircle className="w-3.5 h-3.5 text-forest/65" />
                                                    {totalComments}
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setExpandedQuestionId(isExtended ? null : q.id)}
                                                className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm transition-all duration-300 cursor-pointer ${isExtended
                                                    ? 'bg-gold text-forest hover:bg-forest hover:text-white'
                                                    : 'bg-forest hover:bg-gold text-white hover:text-forest'
                                                    }`}
                                            >
                                                {isExtended ? 'Ausblenden' : 'Helfen'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Comments / Replies Section */}
                                    <AnimatePresence>
                                        {isExtended && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-t border-forest/10 pt-4 mt-2 overflow-hidden space-y-4"
                                            >
                                                {/* List of comments */}
                                                <div className="space-y-3">
                                                    <h5 className="text-[11px] font-bold text-forest uppercase tracking-widest">
                                                        Diskussion ({totalComments})
                                                    </h5>
                                                    {totalComments > 0 ? (
                                                        <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                                                            {q.comments.map((comment) => (
                                                                <div
                                                                    key={comment.id}
                                                                    className="bg-sand/20 rounded-xl p-3 border border-forest/5 flex flex-col gap-1.5"
                                                                >
                                                                    <div className="flex items-center justify-between border-b border-forest/5 pb-1">
                                                                        <span className="text-xs font-semibold text-forest flex items-center gap-1.5">
                                                                            <span className="w-4 h-4 rounded-full bg-forest/10 text-forest flex items-center justify-center text-[9px] uppercase font-bold">
                                                                                {comment.user.charAt(0)}
                                                                            </span>
                                                                            {comment.user}
                                                                        </span>
                                                                        <span className="text-[10px] text-charcoal/45 font-mono">{comment.date}</span>
                                                                    </div>
                                                                    <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                                                                        {comment.text}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-charcoal/50 italic pl-1">Noch keine Antworten. Sei der Erste, der antwortet!</p>
                                                    )}
                                                </div>

                                                {/* Comment input form */}
                                                <form
                                                    onSubmit={(e) => handleAddComment(e, q.id)}
                                                    className="bg-sand/30 border border-forest/5 p-4 rounded-xl space-y-3"
                                                >
                                                    <div className="flex  items-center gap-2">
                                                        <span className="bg-forest/10 text-forest p-1 rounded-md">
                                                            <HelpCircle className="w-3.5 h-3.5" />
                                                        </span>
                                                        <span className="text-[11px] font-bold text-forest uppercase tracking-wider">Antworten</span>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        <div className="sm:col-span-1 space-y-1">
                                                            <input
                                                                type="text"
                                                                value={newCommentUser}
                                                                onChange={e => setNewCommentUser(e.target.value)}
                                                                placeholder="Dein Name"
                                                                className="w-full bg-white border border-forest/10 p-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-2 flex sm:flex-row flex-col space-y-1 relative flex gap-2">
                                                            <input
                                                                type="text"
                                                                required
                                                                value={newCommentText}
                                                                onChange={e => setNewCommentText(e.target.value)}
                                                                placeholder="Schreibe eine hilfreiche Antwort..."
                                                                className="flex-1 bg-white border border-forest/10 p-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-forest text-charcoal"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="bg-forest hover:bg-gold hover:text-forest text-white text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
                                                            >
                                                                Antworten
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
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

                        <div className="min-h-[250px] flex flex-col items-center justify-center text-center p-8 bg-sand/20 rounded-3xl border border-forest/10 mt-6 md:p-12">
                            <div className="bg-forest/10 p-4 rounded-full text-forest mb-4 animate-pulse">
                                <Wrench className="w-8 h-8" />
                            </div>
                            <h4 className="font-display text-lg font-bold text-forest mb-2">
                                Tool in Entwicklung
                            </h4>
                            <p className="font-sans text-xs sm:text-sm text-charcoal/60 max-w-sm leading-relaxed font-light">
                                Unser {activeTool === 'payload' ? 'Zuladungsrechner (z.G.G.)' : 'Sprit- & Reisekostenrechner'} befindet sich aktuell in der Entwicklung und steht Ihnen in Kürze mit erweiterten Funktionen zur Verfügung.
                            </p>
                        </div>
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
                        onClick={() => handleTabChange('tips')}
                        className={`flex items-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${activeTab === 'tips'
                            ? 'border-forest text-forest'
                            : 'border-transparent text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <Lightbulb className="w-4 h-4" /> Camping-Tipps
                    </button>
                    <button
                        onClick={() => handleTabChange('inspiration')}
                        className={`flex items-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${activeTab === 'inspiration'
                            ? 'border-forest text-forest'
                            : 'border-transparent text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <Compass className="w-4 h-4" /> Inspirationen
                    </button>
                    <button
                        onClick={() => handleTabChange('community')}
                        className={`flex items-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${activeTab === 'community'
                            ? 'border-forest text-forest'
                            : 'border-transparent text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" /> Community-Fragen
                    </button>
                    <button
                        onClick={() => handleTabChange('tools')}
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
