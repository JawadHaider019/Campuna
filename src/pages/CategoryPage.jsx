import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, MapPin, ShieldCheck, Eye, ArrowLeft, SlidersHorizontal, X } from 'lucide-react';
import { buildListingSlug } from '../utils/slugify';
import { navigateTo } from '../utils/navigation';
import { getHomepageProducts } from '../api/bubbleApi';
import { FEATURED_LISTINGS, CATEGORIES } from '../data'
import CategoriesSection from '../components/CategoriesSection';
import { formatLocation } from '../utils/location';


// Map URL slugs → internal category names
const SLUG_TO_CATEGORY = {
    'ausrüstung-und-zubehör': 'Camping Zubehör',
    'fahrzeuge': 'Wohnmobile & Camper',
    'zelte-and-dachzelte': 'Zelte & Dachzelte',
    'fahrräder-träger': 'Fahrräder & Träger',
    'campingplätze-stellplätze': 'Stellplätze & Campingplätze',
    'dienstleistungen': 'Camping Services',
    'tiny-houses': 'Tiny Houses',
    'mieten-vermieten': 'Mieten & Vermieten',
};



// Sort options
const SORT_OPTIONS = [
    { value: 'newest', label: 'Neueste zuerst' },
    { value: 'price_asc', label: 'Preis aufsteigend' },
    { value: 'price_desc', label: 'Preis absteigend' },
];

// Map API listing to the normalized shape
function mapListing(item) {
    // Format images (adding https:) and convert HEIC via Bubble CDN transform
    let images = (item.images && item.images.length > 0 ? item.images : [item['Main Image']])
        .filter(Boolean)
        .map(url => {
            url = url.startsWith('//') ? `https:${url}` : url;
            // Convert HEIC to web-compatible format via Bubble CDN image transformation
            if (/\.heic$/i.test(url.split('?')[0]) && url.includes('cdn.bubble.io')) {
                url = url.replace(
                    /(https:\/\/[^/]+\.cdn\.bubble\.io\/)(f[0-9x]+\/)/,
                    '$1cdn-cgi/image/f=auto,fit=cover/$2'
                );
            }
            return url;
        });

    if (images.length === 0) {
        images.push('hero-campuna.png');
    }

    let category = item.Category || 'Camping Zubehör';
    if (category === 'Ausrüstung und Zubehör') category = 'Camping Zubehör';

    let id = item._id || String(Math.random());
    let sum = 0;
    for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
    const rating = parseFloat((4.5 + (sum % 6) * 0.1).toFixed(1));

    const location = item['location geo']?.address || 'Deutschland';
    const displayLocation = formatLocation(location);
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    let pricePeriod = 'Preis';
    if (category === 'Mieten & Vermieten' || (item['Sub - Category'] && item['Sub - Category'].toLowerCase().includes('mieten'))) {
        pricePeriod = 'pro Tag';
    } else if (category === 'Wohnmobile & Camper' || category === 'Tiny Houses') {
        pricePeriod = 'Kaufpreis';
    }

    const features = [];
    if (item['Condition item']) {
        const condMapping = { 'New': 'Neu', 'Used': 'Gebraucht', 'Good': 'Sehr gut' };
        features.push(condMapping[item['Condition item']] || item['Condition item']);
    }
    if (item['Sub - Category']) features.push(item['Sub - Category']);
    if (item['Type of offer']) features.push(item['Type of offer']);
    if (features.length === 0) features.push('Camping');

    const resolvedSellerType = item['listing user type'] || (category === 'Mieten & Vermieten' || (item['Sub - Category'] && item['Sub - Category'].toLowerCase().includes('mieten')) ? 'Gewerblich' : 'Privat');
    const sellerName = resolvedSellerType === 'Gewerblich' ? 'Gewerblicher Anbieter' : 'Privatverkäufer';

    return {
        id,
        title: item.title || item.description || 'Camping Angebot',
        category,
        price,
        pricePeriod,
        location,
        displayLocation,
        rating,
        reviewsCount: (sum % 15) + 3,
        images,
        seller: {
            name: sellerName,
            verified: true,
            type: resolvedSellerType,
        },
        listing_user_type: resolvedSellerType,
        features,
        isExclusive: sum % 3 === 0,
    };
}

// ─── The Card component (identical to FeaturedListings.ListingCard) ────────────
function ListingCard({ item, isWishlisted, onToggleWishlist }) {
    const [imgIdx, setImgIdx] = React.useState(0);
    const handleImgError = () => {
        if (imgIdx < item.images.length - 1) {
            setImgIdx(i => i + 1);
        }
    };

    const handleCardClick = () => {
        const slug = buildListingSlug(item.title, item.id);
        navigateTo(`/listing_details/${slug}`);
    };

    const displayLoc = item.displayLocation || item.location || '';
    const cityOnly = displayLoc.split(',')[0].trim();

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleCardClick}
            className="group relative flex flex-col bg-white rounded-[16px] sm:rounded-[24px] overflow-hidden border border-forest/5 hover:border-forest/10 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
            {/* Image Area */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/20">
                <img
                    src={item.images[imgIdx]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105 pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={handleImgError}
                />

                {/* Top badge row */}
                <div className="absolute top-2 sm:top-4 inset-x-2 sm:inset-x-4 flex items-center justify-between">
                    <span className="bg-forest flex items-center gap-0.5 sm:gap-1 justify-center text-gold text-[7px] sm:text-[8px] font-semibold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg backdrop-blur-md">
                        <ShieldCheck className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gold" />
                        {item.listing_user_type || item.seller?.type || 'Privat'}
                    </span>

                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleWishlist(item.id); }}
                        className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${isWishlisted
                            ? 'bg-rose-500 text-white hover:bg-rose-600 scale-110'
                            : 'bg-white/70 hover:bg-white text-forest hover:scale-110'
                            }`}
                    >
                        <Heart className={`w-3 sm:w-4 h-3 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Location overlay */}
                <div className="absolute bottom-2 sm:bottom-4 right-0 inset-x-2 sm:inset-x-4 flex items-center justify-end pointer-events-none text-white/90 max-w-full">
                    <div className="bg-black/40 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[9px] flex items-center gap-1 truncate max-w-[90%]">
                        <MapPin className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gold shrink-0" />
                        <span className="truncate">
                            <span className="inline md:hidden">{cityOnly}</span>
                            <span className="hidden md:inline">{displayLoc}</span>
                        </span>
                    </div>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white text-forest px-4 sm:px-5 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
                        <Eye className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        <span>Inserat ansehen</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="font-display text-xs sm:text-base lg:text-lg font-bold text-black group-hover:text-gold transition-colors duration-200 mb-1.5 sm:mb-2 line-clamp-2 leading-tight">
                        {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                        {item.features.slice(0, 2).map((feat, idx) => (
                            <span
                                key={idx}
                                className="text-[8px] sm:text-[10px] text-charcoal/60 bg-sand px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-forest/5"
                            >
                                {feat}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pt-1.5 sm:pt-2 border-t border-forest/5 flex items-end justify-between">
                    <div>
                        <span className="block text-[8px] sm:text-[10px] uppercase tracking-widest text-charcoal/40 font-mono">
                            {item.pricePeriod}
                        </span>
                        <span className="font-display text-sm sm:text-xl font-extrabold text-forest">
                            {item.price.toLocaleString('de-DE')} €
                        </span>
                    </div>
                    <span className="font-sans text-[8px] sm:text-xs font-bold text-forest group-hover:text-gold flex items-center space-x-1 transition-colors">
                        <span>Details</span>
                        <span className="transform group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main CategoryPage ──────────────────────────────────────────────────────────
export default function CategoryPage() {
    const { slug } = useParams();
    const categoryName = SLUG_TO_CATEGORY[slug] || '';

    const categoryInfo = CATEGORIES.find(c => c.name === categoryName) || {};

    const heroTitle = categoryInfo.heroTitle || categoryName || 'Alle Angebote';
    const heroSubtitle = categoryInfo.heroSubtitle || '';

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlistedIds, setWishlistedIds] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(20);

    // Reset pagination when category, query, or sorting changes
    useEffect(() => {
        setVisibleCount(20);
    }, [slug, searchQuery, sortBy]);

    useEffect(() => {
        let active = true;
        setLoading(true);

        const fetch = async () => {
            try {
                const data = await getHomepageProducts();
                if (data && data.status === 'success' && data.response && Array.isArray(data.response.listing)) {
                    const all = data.response.listing.map(mapListing);
                    const filtered = categoryName
                        ? all.filter(l => l.category === categoryName)
                        : all;
                    if (active) setListings(filtered);
                }
            } catch {
                // fall back to local mock data
                const filtered = categoryName
                    ? FEATURED_LISTINGS.filter(l => l.category === categoryName)
                    : FEATURED_LISTINGS;
                const mappedMock = filtered.map(l => ({ ...l, displayLocation: formatLocation(l.location) }));
                if (active) setListings(mappedMock);
            } finally {
                if (active) setLoading(false);
            }
        };

        fetch();
        return () => { active = false; };
    }, [slug, categoryName]);

    const handleToggleWishlist = (id) => {
        setWishlistedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Filter by search query
    const filtered = listings.filter(item => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.features.some(f => f.toLowerCase().includes(q));
    });

    // Sort
    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return 0; // newest = API order
    });

    return (
        <>
            <div className="bg-white min-h-screen relative font-sans text-charcoal ">
                {/* ── Hero Banner ── */}
                <section
                    className="relative mt-34 sm:mt-34 md:mt-36 pt-10 pb-14 px-4 overflow-hidden"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 60%, rgba(0, 0, 0, 1) 100%), url('/hero-campuna.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="max-w-7xl mx-auto">
                        {/* Back button */}
                        <button
                            onClick={() => navigateTo('/')}
                            className="mb-6 flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Zurück zur Startseite
                        </button>

                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block mb-2">
                            {categoryName ? 'Kategorie' : 'Alle Angebote'}
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 drop-shadow-lg">
                            {heroTitle}
                        </h1>
                        {heroSubtitle && (
                            <p className="text-white/90 text-sm sm:text-base max-w-7xl mt-3 mb-4 font-sans leading-relaxed drop-shadow-md">
                                {heroSubtitle}
                            </p>
                        )}

                    </div>
                </section>

                {/* ── Filter & Sort Bar ── */}
                <div className="sticky top-[64px] z-30 bg-white/90 backdrop-blur-md border-b border-forest/5 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        {/* Search within category */}
                        <div className="relative flex-1 max-w-sm">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="In dieser Kategorie suchen…"
                                className="w-full pl-4 pr-10 py-2 text-sm rounded-full border border-forest/15 bg-sand/30 focus:outline-none focus:ring-2 focus:ring-forest/20 placeholder:text-charcoal/40"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Sort */}
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-charcoal/50 shrink-0" />
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="text-sm border border-forest/15 rounded-full px-3 py-2 bg-sand/30 focus:outline-none focus:ring-2 focus:ring-forest/20 text-charcoal"
                                >
                                    {SORT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            <span className="hidden sm:block text-xs text-charcoal/40 font-mono whitespace-nowrap">
                                {sorted.length} Ergebnisse
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Products Grid ── */}
                <section className="max-w-7xl mx-auto px-4 py-10">
                    {loading ? (
                        // Skeleton
                        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="rounded-[16px] sm:rounded-[24px] overflow-hidden border border-forest/5 animate-pulse">
                                    <div className="aspect-[16/9] bg-sand/40" />
                                    <div className="p-3 sm:p-4 space-y-3">
                                        <div className="h-5 bg-sand/60 rounded-full w-3/4" />
                                        <div className="h-3 bg-sand/40 rounded-full w-1/2" />
                                        <div className="h-6 bg-sand/60 rounded-full w-1/3 mt-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : sorted.length === 0 ? (
                        <div className="text-center py-24 bg-sand/30 rounded-[32px] border border-dashed border-forest/10">
                            <p className="font-display text-lg text-forest/70 mb-4">
                                Keine Inserate in dieser Kategorie gefunden.
                            </p>
                            <button
                                onClick={() => navigateTo('/')}
                                className="bg-forest text-sand text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full hover:bg-gold hover:text-forest transition-colors duration-300"
                            >
                                Zur Startseite
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 min-[350px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                                {sorted.slice(0, visibleCount).map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.04, duration: 0.4 }}
                                    >
                                        <ListingCard
                                            item={item}
                                            isWishlisted={wishlistedIds.includes(item.id)}
                                            onToggleWishlist={handleToggleWishlist}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {sorted.length > visibleCount && (
                                <div className="flex justify-center mt-12 mb-4">
                                    <button
                                        onClick={() => setVisibleCount(prev => prev + 20)}
                                        className="bg-forest text-white text-xs font-semibold uppercase tracking-wider py-4 px-8 rounded-full border border-forest/10 shadow-md hover:bg-gold hover:text-forest hover:border-gold hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer font-sans"
                                    >
                                        Mehr Angebote laden
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>

                {/* ── Category Description / SEO Section ── */}
                {categoryInfo.seoHeading && categoryInfo.seoParagraphs && categoryInfo.seoParagraphs.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 py-8">
                        <div className="bg-gradient-to-br from-sand/50 to-beige/30 rounded-[32px] border border-forest/10 p-8 md:p-12 shadow-sm font-sans">
                            <h2 className="font-display text-2xl  font-extrabold text-forest mb-2">
                                {categoryInfo.seoHeading}
                            </h2>
                            <div className="space-y-2 text-charcoal/85 text-xs md:text-sm leading-relaxed font-light">
                                {categoryInfo.seoParagraphs.map((para, idx) => (
                                    <p key={idx} className={idx === 0 ? "font-semibold text-forest/90" : ""}>
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

            </div>
            <div className="py-16 px-4 bg-white border-t border-forest/5">
                <div className="max-w-7xl mx-auto mb-10 text-center">
                    <span className="font-sans text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.4em] text-gold block mb-2">
                        ENTDECKEN
                    </span>
                    <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-black">
                        Beliebte Bereiche
                    </h2>
                </div>
                <CategoriesSection excludeCategory={categoryName} />
            </div>
        </>
    );
}
