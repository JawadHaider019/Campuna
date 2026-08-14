import React, { useState, useEffect } from 'react';
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
    Scale,
    X,
    CheckCircle2,
    AlertTriangle,
    ShieldAlert
} from 'lucide-react';
import { navigateTo, getParentNavigationUrl } from '../utils/navigation';
import { buildListingSlug } from '../utils/slugify';
import PayloadCalculator from './PayloadCalculator';
import BudgetCalculator from './BudgetCalculator';


const INITIAL_COMMUNITY_QUESTIONS = [
    {
        id: 'q_1',
        question: 'Welche Solartasche mit 100W bis 120W ist aktuell die zuverlÃssigste fÃr Autarkie?',
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
                text: 'Ich nutze seit letztem Jahr eine Wattstunde Solartasche. Sie liefert zuverlÃssig Strom, selbst bei leichter BewÃlkung.',
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
        tags: ['Dachzelt', 'ZubehÃ¶r', 'PKW-Lasten'],
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
                text: 'Genau, dynamisch ist fÃr die Fahrt relevant. Dachzelt + TrÃger dÃrfen das nicht Ãberschreiten.',
                date: 'Vor 2 Tagen'
            },
            {
                id: 'c2_1',
                user: 'RooftopExplorer',
                text: 'Die dynamische Dachlast findest du im Handbuch deines PKWs (meistens 75kg oder 100kg). Die statische im Stand ist viel hÃ¶her!',
                date: 'Vor 3 Tagen'
            }
        ]
    },
    {
        id: 'q_3',
        question: 'Wie reinigt/desinfiziert ihr euren Wassertank nach einer lÃngeren Standzeit (z.B. Winterpause)?',
        user: 'HappyTrailer',
        liked: false,
        upvotes: 68,
        tags: ['Hygiene', 'Wasserpflege', 'Wartung'],
        comments: [
            {
                id: 'c3_2',
                user: 'HappyTrailer',
                text: 'Am einfachsten geht es mit Chlordioxid-PrÃparaten, das reinigt geruchslos und grÃndlich...',
                date: 'Vor 4 Tagen'
            },
            {
                id: 'c3_1',
                user: 'CleanWater',
                text: 'Ich benutze immer biologisch abbaubare Reiniger auf ZitronensÃurebasis, danach gut durchspÃlen.',
                date: 'Vor 5 Tagen'
            }
        ]
    }
];


export default function DiscoverCampuna() {
    const [activeTab, setActiveTab] = useState('tools');

    // â”€â”€ Pre-fetched Tips and Inspiration State â”€â”€
    const [tips, setTips] = useState([]);
    const [inspirations, setInspirations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTip, setSelectedTip] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 640px)');
        setIsMobile(media.matches);
        const listener = (e) => setIsMobile(e.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, []);

    useEffect(() => {
        const fetchTipsAndInspirations = async () => {
            setIsLoading(true);
            try {
                // Fetch Tips from homepage_tips
                const tipsPromise = fetch('https://simoneasalvo.bubbleapps.io/api/1.1/wf/homepage_tips/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.ok ? res.json() : null).catch(err => {
                    console.error("Error fetching tips:", err);
                    return null;
                });

                // Fetch Products from homepage-products
                const productsPromise = fetch('https://simoneasalvo.bubbleapps.io/api/1.1/wf/homepage-products/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.ok ? res.json() : null).catch(err => {
                    console.error("Error fetching products:", err);
                    return null;
                });

                const [tipsData, productsData] = await Promise.all([tipsPromise, productsPromise]);

                // Map Tips
                if (tipsData && tipsData.status === 'success' && tipsData.response && tipsData.response.Tips) {
                    const activeTips = tipsData.response.Tips.filter(tip => tip.Active === 'Yes');
                    const mappedTips = activeTips.map((tip, idx) => {
                        const category = tip.Category || 'Allgemein';
                        let badgeColor = 'bg-amber-50 text-amber-700 border-amber-100';
                        if (category.toLowerCase().includes('recht')) {
                            badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                        } else if (category.toLowerCase().includes('pflege') || category.toLowerCase().includes('fzg') || category.toLowerCase().includes('wartung') || category.toLowerCase().includes('fahrzeug')) {
                            badgeColor = 'bg-blue-50 text-blue-700 border-blue-100';
                        }

                        let formattedDate = 'Heute';
                        if (tip['Modified Date'] || tip['Created Date']) {
                            const timestamp = tip['Modified Date'] || tip['Created Date'];
                            const dateObj = new Date(timestamp);
                            if (!isNaN(dateObj.getTime())) {
                                const now = new Date();
                                const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                                const d2 = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
                                const diffTime = d1 - d2;
                                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

                                if (diffDays <= 0) {
                                    formattedDate = 'Heute';
                                } else if (diffDays === 1) {
                                    formattedDate = 'Gestern';
                                } else if (diffDays > 1 && diffDays < 7) {
                                    formattedDate = `Vor ${diffDays} Tagen`;
                                } else if (diffDays === 7) {
                                    formattedDate = 'Vor einer Woche';
                                } else if (diffDays > 7 && diffDays <= 30) {
                                    formattedDate = `Vor ${diffDays} Tagen`;
                                } else {
                                    formattedDate = dateObj.toLocaleDateString('de-DE', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    });
                                }
                            }
                        }

                        return {
                            id: tip._id || `api_tip_${idx}`,
                            title: tip.Title || 'Kein Titel',
                            excerpt: tip.Desc || tip.desc || '',
                            category: category,
                            date: formattedDate,
                            badgeColor: badgeColor
                        };
                    });
                    setTips(mappedTips);
                }

                // Helper to get time value of a listing for sorting
                const getListingTime = (item) => {
                    const dateStr = item['Created Date'] || item['Modified Date'] || item.CreatedDate || item.ModifiedDate;
                    if (!dateStr) return 0;
                    const time = new Date(dateStr).getTime();
                    return isNaN(time) ? 0 : time;
                };

                // Helper to sort listings by latest first and limit to max 2
                const getLatestOneListing = (list) => {
                    return [...list]
                        .sort((a, b) => getListingTime(b) - getListingTime(a))
                        .slice(0, 1);
                };

                // Map products/listing to inspirations state
                let targetListings = [];
                let useFallback = true;

                // 1. Try to use the listing from homepage_tips response (tipsData)
                if (tipsData && tipsData.status === 'success' && tipsData.response && tipsData.response.listing && tipsData.response.listing.length > 0) {
                    targetListings = getLatestOneListing(tipsData.response.listing);
                    useFallback = false;
                }

                // 2. If no listing in it, fallback to 2 latest listings from product listing (productsData)
                if (useFallback && productsData && productsData.status === 'success' && productsData.response && productsData.response.listing && productsData.response.listing.length > 0) {
                    targetListings = getLatestOneListing(productsData.response.listing);
                }

                if (targetListings.length > 0) {
                    const mappedInspirations = targetListings.map((item, idx) => {
                        const id = item._id || item.id || `api_insp_${idx}`;
                        const title = item.title || item.Title || 'Kein Titel';
                        const description = item.description || item.Description || item.desc || item.Desc || '';
                        const locationGeo = item['location geo'];
                        const location = locationGeo?.address || item.location || 'Deutschland';

                        // Prioritize Main Image, fallback to images array
                        let image = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80';
                        const mainImg = item['Main Image'] || item.MainImage;
                        const imagesArray = item.images;

                        if (mainImg && typeof mainImg === 'string') {
                            image = mainImg.startsWith('//') ? `https:${mainImg}` : mainImg;
                        } else if (Array.isArray(imagesArray) && imagesArray.length > 0 && typeof imagesArray[0] === 'string') {
                            image = imagesArray[0].startsWith('//') ? `https:${imagesArray[0]}` : imagesArray[0];
                        } else if (typeof imagesArray === 'string') {
                            image = imagesArray.startsWith('//') ? `https:${imagesArray}` : imagesArray;
                        } else {
                            const fallbackObj = item.image || item.Image;
                            if (typeof fallbackObj === 'string') {
                                image = fallbackObj.startsWith('//') ? `https:${fallbackObj}` : fallbackObj;
                            }
                        }

                        // Convert HEIC to web-compatible format via Bubble CDN image transformation
                        if (/\.heic$/i.test(image.split('?')[0]) && image.includes('cdn.bubble.io')) {
                            image = image.replace(
                                /(https:\/\/[^/]+\.cdn\.bubble\.io\/)(f[0-9x]+\/)/,
                                '$1cdn-cgi/image/f=auto,fit=cover/$2'
                            );
                        }

                        // Tags from Category & Sub-Category
                        const tags = [];
                        if (item.Category) tags.push(item.Category);
                        if (item['Sub - Category']) tags.push(item['Sub - Category']);
                        if (tags.length === 0) tags.push('Entdecken');

                        return {
                            id,
                            title,
                            location,
                            image,
                            tags,
                            description,
                            price: item.price || 0,
                            isFeatured: item.Featured || false
                        };
                    });
                    setInspirations(mappedInspirations);
                }

            } catch (err) {
                console.error("Error fetching tips and inspiration:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTipsAndInspirations();
    }, []);

    // â”€â”€ Community Q&A State â”€â”€
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

    // Render content according to active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'tips':
                return (
                    <motion.div
                        key="tips"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {tips.map((tip) => (
                            <div
                                key={tip.id}
                                onClick={() => setSelectedTip(tip)}
                                className="bg-white rounded-3xl p-4 border border-forest/5 shadow-md hover:shadow-xl hover:border-forest/10 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:scale-[1.01] h-[190px]"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-[10px]  font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${tip.badgeColor}`}>
                                            {tip.category}
                                        </span>
                                        <span className="text-[11px] text-charcoal/40 font-mono">{tip.date}</span>
                                    </div>
                                    <h3
                                        title={tip.title}
                                        className="font-display text-base sm:text-lg font-bold text-forest transition-colors duration-200 mb-2.5 leading-snug truncate"
                                    >
                                        {tip.title}
                                    </h3>
                                    <p className="font-sans text-[13px] text-charcoal/70 leading-relaxed font-light mb-4 line-clamp-3">
                                        {tip.excerpt}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                );

            case 'inspiration':
                return (
                    <motion.div
                        key="inspiration"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 px-4 gap-6"
                    >
                        {inspirations.map((insp) => (
                            <motion.div
                                key={insp.id}
                                onClick={() => {
                                    const slug = buildListingSlug(insp.title, insp.id);
                                    navigateTo(`/listing_details/${slug}`);
                                }}
                                className="group bg-white  rounded-3xl overflow-hidden border border-forest/5 flex flex-col sm:flex-row cursor-pointer h-[450px] sm:h-[300px] w-full subpixel-antialiased relative"
                                style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,0,0)' }}
                                initial={{
                                    scale: 1,
                                    boxShadow: "0 4px 6px -1px rgba(26, 54, 38, 0.08), 0 2px 4px -1px rgba(26, 54, 38, 0.04)"
                                }}
                                whileHover={{
                                    scale: 1.008,
                                    boxShadow: "0 20px 25px -5px rgba(26, 54, 38, 0.12), 0 10px 10px -5px rgba(26, 54, 38, 0.06)"
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }}
                            >
                                {/* Premium Glassmorphic Shine Overlay */}
                                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-20">
                                    <motion.div
                                        className="absolute -inset-y-16 w-[35%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                                        animate={{
                                            left: ["-150%", "150%"]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatDelay: 3
                                        }}
                                    />

                                </div>
                                <div className="relative w-full sm:w-[40%] h-48 sm:h-full overflow-hidden bg-sand/10">
                                    <motion.img
                                        src={insp.image}
                                        alt={insp.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        animate={{
                                            scale: [1, 1.05]
                                        }}
                                        transition={{
                                            duration: 10,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    />

                                    {insp.isFeatured && (
                                        <motion.div
                                            className="absolute top-3 left-3 rounded-3xl bg-gradient-to-r from-forest to-black/80 backdrop-blur-sm  text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10 flex items-center gap-2"
                                            animate={{
                                                y: isMobile ? 0 : [0, -4],
                                                scale: [1, 1.05]
                                            }}
                                            transition={{
                                                duration: 2,
                                                ease: "easeInOut",
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                        >
                                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                                            </span>
                                            <span>
                                                Ausgewählt
                                            </span>
                                        </motion.div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between relative">
                                    <div>
                                        {insp.isFeatured && (
                                            <motion.div
                                                className="absolute opacity-30 top-24 right-[-110px] rotate-[-90deg] text-[28px] font-bold px-3 py-1 uppercase tracking-widest z-10 flex items-center gap-2"
                                                animate={{
                                                    WebkitTextStrokeColor: ["#000", "#00630D"]
                                                }}
                                                transition={{
                                                    duration: 6,
                                                    ease: "easeInOut",
                                                    repeat: Infinity
                                                }}
                                                style={{
                                                    WebkitTextFillColor: "transparent",
                                                    WebkitTextStrokeWidth: "1px",
                                                    color: "transparent"
                                                }}
                                            >
                                                Ausgewählt
                                            </motion.div>
                                        )}
                                        <h3 className="font-display sm:text-xl text-lg font-bold text-forest leading-snug mb-2 group-hover:text-gold transition-colors duration-200 line-clamp-3">
                                            {insp.title}
                                        </h3>
                                        <p className="font-sans sm:text-sm text-xs text-charcoal/70 leading-relaxed font-light mb-4 line-clamp-2 sm:line-clamp-3">
                                            {insp.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mb-2.5">
                                            {insp.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-sand text-forest font-mono text-[10px] font-bold py-0.5 px-2 rounded">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-3  flex items-center justify-between mt-auto">
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-charcoal/40 font-mono">
                                                Preis
                                            </span>
                                            <span className="font-display text-base font-extrabold text-forest">
                                                {insp.price ? `${insp.price.toLocaleString('de-DE')} €` : ''}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const slug = buildListingSlug(insp.title, insp.id);
                                                navigateTo(`/ listing_details / ${slug}`);
                                            }}
                                            className="group/btn flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors duration-200 cursor-pointer"
                                        >
                                            <span>Zum Inserat</span>
                                            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform text-gold" style={{ display: 'inline-block' }} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                );

            case 'community':
                return (
                    <motion.div
                        key="community"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="min-h-[250px] flex flex-col items-center justify-center text-center p-8 bg-sand/20 rounded-3xl border border-forest/10 mt-6 md:p-12">
                            <div className="bg-forest/10 p-4 rounded-full text-forest mb-4 animate-pulse">
                                <Wrench className="w-8 h-8" />
                            </div>
                            <h4 className="font-display text-lg font-bold text-forest mb-2">
                                Tool in Entwicklung
                            </h4>
                            <p className="font-sans text-xs sm:text-sm text-charcoal/60 max-w-sm leading-relaxed font-light">
                                Unser Community-Fragen Bereich befindet sich aktuell in der Entwicklung und steht Ihnen in Kürze zur Verfügung.
                            </p>
                        </div>
                    </motion.div>
                );

            case 'tools':
                return (
                    <motion.div
                        key="tools"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-3xl border border-forest/5 shadow-md p-4 sm:p-6"
                    >
                        {/* Tool Selection Tabs */}
                        <div className="flex border-b border-forest/10 pb-4 mb-4 gap-3 sm:gap-4">
                            <button
                                onClick={() => setActiveTool('payload')}
                                className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTool === 'payload'
                                    ? 'bg-forest text-white shadow-md'
                                    : 'text-charcoal/60 hover:bg-sand hover:text-forest'
                                    }`}
                            >
                                <Scale className="w-4 h-4 shrink-0" />
                                <span className="block sm:hidden">Zuladung </span>
                                <span className="hidden sm:block">Zuladungsrechner (z.G.G.)</span>
                            </button>
                            <button
                                onClick={() => setActiveTool('costs')}
                                className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTool === 'costs'
                                    ? 'bg-forest text-white shadow-md'
                                    : 'text-charcoal/60 hover:bg-sand hover:text-forest'
                                    }`}
                            >
                                <Fuel className="w-4 h-4 shrink-0" />
                                <span className="block sm:hidden">Camping-Budget</span>
                                <span className="hidden sm:block">Camping-Reisebudget-Rechner</span>
                            </button>
                        </div>

                        {activeTool === 'payload' ? (
                            <div className="mt-4">
                                <PayloadCalculator compact={true} />
                                {/* Link to dedicated page */}
                                <div className="mt-6  pt-4 border-t border-forest/10 flex justify-center">
                                    <a
                                        href={getParentNavigationUrl('zuladungsrechner')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors"
                                    >
                                        <span>Zur Vollversion</span>
                                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-gold" />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 ">
                                <BudgetCalculator compact={true} />
                                {/* Link to dedicated page */}
                                <div className="mt-6 pt-4  border-t border-forest/10 flex justify-center">
                                    <a
                                        href={getParentNavigationUrl('reisekostenrechner')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors"
                                    >
                                        <span>Zur Vollversion</span>
                                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-gold" />
                                    </a>
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
        <section id="tool" className="py-10 sm:py-16 bg-sand/15 border-t border-b border-forest/5 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div className="space-y-3">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
                            Entdecke Campuna®
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-forest">
                            Camping-Wissen & Nützliche Tools
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-charcoal/70 max-w-xl font-light">
                            Praktische Helfer, Empfehlungen und Wissen für deinen Campingalltag – weil Campuna mehr sein soll als nur Kaufen und Verkaufen.
                        </p>
                    </div>
                </div>

                {/* Categories Tab Navigation */}
                <div className="flex flex-nowrap border-b border-forest/10 mb-8 gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
                    <button
                        onClick={() => handleTabChange('tools')}
                        className={`relative flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3.5 px-2.5 sm:px-5 text-[11px] sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 shrink-0 ${activeTab === 'tools'
                            ? 'text-forest'
                            : 'text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="block sm:hidden">Helfer</span>
                        <span className="hidden sm:block">Camping-Helfer</span>
                        {activeTab === 'tools' && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </button>
                    <button
                        onClick={() => handleTabChange('inspiration')}
                        className={`relative flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3.5 px-2.5 sm:px-5 text-[11px] sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 shrink-0 ${activeTab === 'inspiration'
                            ? 'text-forest'
                            : 'text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="block sm:hidden">Empfehlung</span>
                        <span className="hidden sm:block">Campuna-Empfehlung</span>
                        {activeTab === 'inspiration' && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </button>
                    {/* Commented out as requested by user to hide this tab */}
                    {/* <button
                        onClick={() => handleTabChange('community')}
                        className={`relative flex items-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${activeTab === 'community'
                            ? 'text-forest'
                            : 'text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" /> Community-Fragen
                        {activeTab === 'community' && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </button> */}
                    <button
                        onClick={() => handleTabChange('tips')}
                        className={`relative flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3.5 px-2.5 sm:px-5 text-[11px] sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 shrink-0 ${activeTab === 'tips'
                            ? 'text-forest'
                            : 'text-charcoal/50 hover:text-forest'
                            }`}
                    >
                        <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="block sm:hidden">Tipps</span>
                        <span className="hidden sm:block">Camping-Tipps</span>
                        {activeTab === 'tips' && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </button>
                </div>

                {/* Tab Content Window */}
                <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {renderTabContent()}
                    </AnimatePresence>
                </div>
            </div>

            {/* Premium Tip Popup Modal */}
            <AnimatePresence>
                {selectedTip && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedTip(null)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-forest/10 flex flex-col gap-5 overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedTip(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-sand/50 text-forest hover:bg-forest hover:text-gold transition-all duration-300 animate-none cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Badge and Date */}
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${selectedTip.badgeColor}`}>
                                    {selectedTip.category}
                                </span>
                                <span className="text-xs text-charcoal/40 font-mono">{selectedTip.date}</span>
                            </div>

                            {/* Full Heading */}
                            <h3 className="font-display text-xl sm:text-2xl font-bold text-forest leading-snug pr-8 mt-1">
                                {selectedTip.title}
                            </h3>

                            {/* Text / Description */}
                            <div className="border-t border-forest/5 pt-4">
                                <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed font-light whitespace-pre-line">
                                    {selectedTip.excerpt}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
