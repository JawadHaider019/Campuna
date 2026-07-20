import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
    Heart,
    MapPin,
    ShieldCheck,
    Eye,
    ArrowLeft,
    SlidersHorizontal,
    X,
    Search,
    Euro,
    Briefcase,
    Grid,
    Tag,
    ChevronRight,
    Filter
} from 'lucide-react';
import { buildListingSlug } from '../utils/slugify';
import { navigateTo } from '../utils/navigation';
import { getHomepageProducts } from '../api/bubbleApi';
import { FEATURED_LISTINGS, CATEGORIES } from '../data';
import { formatLocation } from '../utils/location';
import CategoriesSection from '../components/CategoriesSection';

// Map API subcategory or tags to pre-defined mapping
const CATEGORY_SUBCATEGORIES = {
    'Camping Zubehör': [
        'Vorzelte & Markisen',
        'Campingmöbel',
        'Küche & Grillen',
        'Elektrik & Solar',
        'Sanitär & Wasser',
        'Sonstiges Zubehör'
    ],
    'Wohnmobile & Camper': [
        'Kastenwagen',
        'Alkoven',
        'Teilintegriert',
        'Vollintegriert',
        'Wohnwagen',
        'Sonstige Fahrzeuge'
    ],
    'Zelte & Dachzelte': [
        'Dachzelte',
        'Wurfzelte',
        'Familienzelte',
        'Kuppelzelte',
        'Tunnelzelte'
    ],
    'Fahrräder & Träger': [
        'Fahrradträger',
        'E-Bikes',
        'Mountainbikes',
        'Falträder'
    ],
    'Stellplätze & Campingplätze': [
        'Stellplätze',
        'Campingplätze',
        'Private Stellplätze'
    ],
    'Camping Services': [
        'Reparatur & Wartung',
        'Fahrzeugaufbereitung',
        'Tuning & Ausbau',
        'Transport'
    ],
    'Tiny Houses': [
        'Mobilheime',
        'Tiny Houses',
        'Bauwagen'
    ],
    'Mieten & Vermieten': [
        'Wohnmobil mieten',
        'Wohnwagen mieten',
        'Zubehör mieten'
    ],
    'Boote & Wassersport': [
        'Motorboote',
        'Segelboote',
        'Schlauchboote',
        'Kajaks & SUPs',
        'Wassersportausrüstung',
        'Zubehör & Sonstiges'
    ]
};

// Sort options
const SORT_OPTIONS = [
    { value: 'newest', label: 'Neueste zuerst' },
    { value: 'price_asc', label: 'Preis aufsteigend' },
    { value: 'price_desc', label: 'Preis absteigend' },
];

// Map API listing to the normalized shape
function mapListing(item) {
    // Prioritize Main Image, fallback to images array
    let rawImages = [];
    const mainImg = item['Main Image'] || item.MainImage;
    if (mainImg) {
        rawImages.push(mainImg);
    }
    if (item.images && Array.isArray(item.images)) {
        item.images.forEach(img => {
            if (img && img !== mainImg && !rawImages.includes(img)) {
                rawImages.push(img);
            }
        });
    } else if (item.images && typeof item.images === 'string') {
        if (item.images !== mainImg) {
            rawImages.push(item.images);
        }
    }

    let images = rawImages
        .filter(Boolean)
        .map(url => {
            url = url.startsWith('//') ? `https:${url}` : url;
            if (/\.heic$/i.test(url.split('?')[0]) && url.includes('cdn.bubble.io')) {
                url = url.replace(
                    /(https:\/\/[^/]+\.cdn\.bubble\.io\/)(f[0-9x]+\/)/,
                    '$1cdn-cgi/image/f=auto,fit=cover/$2'
                );
            }
            return url;
        });

    if (images.length === 0) {
        images.push('/hero-campuna.png');
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

    // Check if negotiable via description or title
    const isNegotiable =
        item.title?.toLowerCase().includes('vb') ||
        item.title?.toLowerCase().includes('verhand') ||
        item.description?.toLowerCase().includes('vb') ||
        item.description?.toLowerCase().includes('verhand') ||
        item['Price - type']?.toLowerCase().includes('negotiable') ||
        false;

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
        isNegotiable,
        subCategory: item['Sub - Category'] || ''
    };
}

// ─── Individual Listing Card Component ────────────
function ListingCard({ item, isWishlisted, onToggleWishlist }) {
    const [imgIdx, setImgIdx] = useState(0);
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCardClick}
            className="group relative flex flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-forest/5 hover:border-forest/10 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/20">
                <img
                    src={item.images[imgIdx]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105 pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={handleImgError}
                />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="bg-forest flex items-center gap-1 justify-center text-gold text-[8px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md">
                        <ShieldCheck className="w-2.5 h-2.5 text-gold shrink-0" />
                        {item.listing_user_type || item.seller?.type || 'Privat'}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(item.id);
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${isWishlisted
                            ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105'
                            : 'bg-white/75 hover:bg-white text-forest hover:scale-105'
                            }`}
                    >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Location Tag */}
                <div className="absolute bottom-3 right-3 flex items-center pointer-events-none text-white/95 max-w-[85%] z-10">
                    <div className="bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full text-[8.5px] flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5 text-gold shrink-0" />
                        <span className="truncate">
                            <span className="inline md:hidden">{cityOnly}</span>
                            <span className="hidden md:inline">{displayLoc}</span>
                        </span>
                    </div>
                </div>

                {/* Hover overlay button */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-0">
                    <div className="bg-white text-forest px-4.5 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inserat ansehen</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-3.5 md:p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                    <h3 className="font-display text-xs md:text-sm lg:text-base font-bold text-black group-hover:text-gold transition-colors duration-200 mb-1.5 line-clamp-2 leading-snug">
                        {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                        {item.features?.slice(0, 2).map((feat, idx) => (
                            <span
                                key={idx}
                                className="text-[8px] md:text-[9.5px] text-charcoal/65 bg-sand px-2 py-0.5 rounded-md border border-forest/5 whitespace-nowrap"
                            >
                                {feat}
                            </span>
                        ))}
                        {item.isNegotiable && (
                            <span className="text-[8px] md:text-[9.5px] text-forest bg-beige/40 px-2 py-0.5 rounded-md border border-forest/5 font-semibold">
                                VB
                            </span>
                        )}
                    </div>
                </div>

                <div className="pt-2 border-t border-forest/5 flex items-end justify-between">
                    <div>
                        <span className="block text-[8px] md:text-[9.5px] uppercase tracking-widest text-charcoal/40 font-mono leading-none mb-1">
                            {item.pricePeriod}
                        </span>
                        <span className="font-display text-xs md:text-base lg:text-lg font-extrabold text-forest">
                            {item.price > 0 ? `${item.price.toLocaleString('de-DE')} €` : 'Preis VB'}
                        </span>
                    </div>
                    <span className="font-sans text-[9px] md:text-xs font-bold text-forest group-hover:text-gold flex items-center space-x-0.5 transition-colors">
                        <span>Details</span>
                        <span className="transform group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main AllListingsPage Component ──────────────────────────────────────────────────
export default function AllListingsPage() {
    const location = useLocation();

    // Search state variables (filters)
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isVerhandelbar, setIsVerhandelbar] = useState(false);
    const [anbieter, setAnbieter] = useState('all'); // 'all', 'privat', 'gewerblich'
    const [kategorie, setKategorie] = useState('');
    const [unterkategorie, setUnterkategorie] = useState('');
    const [keyword, setKeyword] = useState('');
    const [standort, setStandort] = useState('');

    // Applied filter state (triggered only on Suchen click or load)
    const [appliedFilters, setAppliedFilters] = useState({
        minPrice: '',
        maxPrice: '',
        isVerhandelbar: false,
        anbieter: 'all',
        kategorie: '',
        unterkategorie: '',
        keyword: '',
        standort: '',
    });

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlistedIds, setWishlistedIds] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(12);

    // Initialize filters from search parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const kw = params.get('kw') || '';
        const cat = params.get('cat') || '';
        const loc = params.get('loc') || '';

        let resolvedCatName = '';
        if (cat) {
            // Find matching category by slug or name
            const matched = CATEGORIES.find(c => c.slug === cat || c.name.toLowerCase() === cat.toLowerCase());
            if (matched) resolvedCatName = matched.name;
        }

        setKeyword(kw);
        setKategorie(resolvedCatName);
        setStandort(loc);

        // Apply immediately on first load
        setAppliedFilters(prev => ({
            ...prev,
            keyword: kw,
            kategorie: resolvedCatName,
            standort: loc
        }));
    }, [location.search]);

    // Fetch listings (API with fallback)
    useEffect(() => {
        let active = true;
        setLoading(true);

        const fetchData = async () => {
            try {
                const data = await getHomepageProducts();
                if (data && data.status === 'success' && data.response && Array.isArray(data.response.listing)) {
                    const mapped = data.response.listing.map(mapListing);
                    if (active) setListings(mapped);
                } else {
                    throw new Error('Invalid response form');
                }
            } catch (err) {
                console.warn("Falling back to local static mock data for AllListingsPage:", err);
                const mappedMock = FEATURED_LISTINGS.map(l => ({
                    ...l,
                    displayLocation: formatLocation(l.location),
                    isNegotiable: l.title.toLowerCase().includes('vb') || l.pricePeriod === 'Preis' || false
                }));
                if (active) setListings(mappedMock);
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchData();
        return () => { active = false; };
    }, []);

    // Handle Search Submission
    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        setAppliedFilters({
            minPrice,
            maxPrice,
            isVerhandelbar,
            anbieter,
            kategorie,
            unterkategorie,
            keyword,
            standort
        });
        setVisibleCount(12);
        setIsMobileFilterOpen(false);
    };

    // Reset all filters
    const handleResetFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setIsVerhandelbar(false);
        setAnbieter('all');
        setKategorie('');
        setUnterkategorie('');
        setKeyword('');
        setStandort('');

        setAppliedFilters({
            minPrice: '',
            maxPrice: '',
            isVerhandelbar: false,
            anbieter: 'all',
            kategorie: '',
            unterkategorie: '',
            keyword: '',
            standort: '',
        });
        setVisibleCount(12);
    };

    // Dynamically update subcategory list based on category
    const subcategoriesList = appliedFilters.kategorie ? (CATEGORY_SUBCATEGORIES[appliedFilters.kategorie] || []) : [];
    const currentCategorySelected = kategorie;
    const currentSubcategories = currentCategorySelected ? (CATEGORY_SUBCATEGORIES[currentCategorySelected] || []) : [];

    // Watch for category change to reset subcategory input if it is no longer valid
    useEffect(() => {
        setUnterkategorie('');
    }, [kategorie]);

    // Wishlist toggle
    const handleToggleWishlist = (id) => {
        setWishlistedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Filter listings list based on appliedFilters
    const filteredListings = listings.filter((item) => {
        // 1. Min Price
        if (appliedFilters.minPrice) {
            const min = parseFloat(appliedFilters.minPrice);
            if (!isNaN(min) && item.price < min) return false;
        }
        // 2. Max Price
        if (appliedFilters.maxPrice) {
            const max = parseFloat(appliedFilters.maxPrice);
            if (!isNaN(max) && item.price > max) return false;
        }
        // 3. Preis Verhandelbar
        if (appliedFilters.isVerhandelbar && !item.isNegotiable) {
            return false;
        }
        // 4. Anbieter (Privat vs Gewerblich)
        if (appliedFilters.anbieter !== 'all') {
            const filterType = appliedFilters.anbieter.toLowerCase();
            const sellerType = (item.listing_user_type || item.seller?.type || '').toLowerCase();
            if (filterType === 'privat' && !sellerType.includes('privat')) return false;
            if (filterType === 'gewerblich' && !sellerType.includes('gewerb')) return false;
        }
        // 5. Kategorie
        if (appliedFilters.kategorie && item.category !== appliedFilters.kategorie) {
            return false;
        }
        // 6. Unterkategorie
        if (appliedFilters.unterkategorie) {
            const sub = appliedFilters.unterkategorie.toLowerCase();
            // Check features or specific subcategory mapping
            const matchesSub =
                (item.subCategory && item.subCategory.toLowerCase() === sub) ||
                item.features.some(f => f.toLowerCase() === sub);
            if (!matchesSub) return false;
        }
        // 7. Keyword search (Title, Description, Category, Features)
        if (appliedFilters.keyword) {
            const kw = appliedFilters.keyword.toLowerCase();
            const inTitle = item.title?.toLowerCase().includes(kw);
            const inFeatures = item.features?.some(f => f.toLowerCase().includes(kw));
            const inCat = item.category?.toLowerCase().includes(kw);
            if (!inTitle && !inFeatures && !inCat) return false;
        }
        // 8. Location
        if (appliedFilters.standort) {
            const loc = appliedFilters.standort.toLowerCase();
            const inLoc = item.location?.toLowerCase().includes(loc) || item.displayLocation?.toLowerCase().includes(loc);
            if (!inLoc) return false;
        }

        return true;
    });

    // Sort filtered listings
    const sortedListings = [...filteredListings].sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return 0; // Newest / default order (API returns newest first)
    });

    return (
        <div className="bg-white min-h-screen relative font-sans text-charcoal">

            {/* ── Hero Banner ── */}
            <section
                className="relative mt-20 pt-12 pb-16 px-4 mx-4 md:mx-6 lg:mx-8 overflow-hidden rounded-3xl md:rounded-4xl"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,61,3,0.7) 0%, rgba(0,0,0,0.45) 50%, rgba(0, 0, 0, 0.9) 100%), url('/hero-campuna.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    {/* Back button */}
                    <button
                        onClick={() => navigateTo('/')}
                        className="mb-8 self-start flex items-center gap-2 text-xs md:text-sm font-semibold text-white/80 hover:text-white transition-colors group cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Zurück zur Startseite
                    </button>

                    <span className="font-sans text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-gold block mb-2">
                        Camping Marktplatz Deutschland
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-xl leading-tight">
                        Camping-Anzeigen aus ganz Deutschland
                    </h1>
                    <p className="text-white/90 text-sm md:text-base max-w-3xl leading-relaxed mt-2 font-sans font-light drop-shadow-md">
                        Entdecke aktuelle Camping-Anzeigen aus den Bereichen Wohnmobile, Wohnwagen, Campingzubehör, Stellplätze, Dienstleistungen, Tiny Houses und mehr. Finde Angebote von privaten und gewerblichen Anbietern auf Campuna.
                    </p>
                </div>
            </section>

            {/* ── Main content grid ── */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* ── Filters: Desktop Sidebar ── */}
                    <aside className="hidden lg:block lg:col-span-1 self-start sticky top-24 bg-sand/30 border border-forest/10 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between pb-4 border-b border-forest/10 mb-6">
                            <span className="font-display text-base font-bold text-forest flex items-center gap-2">
                                <Filter className="w-4 h-4 text-gold shrink-0" />
                                Filter anpassen
                            </span>
                            <button
                                onClick={handleResetFilters}
                                className="text-[11px] font-semibold text-charcoal/50 hover:text-gold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                                Zurücksetzen
                            </button>
                        </div>

                        <form onSubmit={handleSearchSubmit} className="space-y-6">

                            {/* Keyword / Stichwort */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                    Marke, Modell, Stichwort...
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                                    <input
                                        type="text"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="Z.B. Morelo, Zelt, Solar..."
                                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Price range */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                    Preis
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-charcoal/40">Min</span>
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            placeholder="€ 8"
                                            className="w-full pl-9 pr-2 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all"
                                            min="0"
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-charcoal/40">Max</span>
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            placeholder="€ 65.000"
                                            className="w-full pl-9 pr-2 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <label className="mt-3 flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={isVerhandelbar}
                                        onChange={(e) => setIsVerhandelbar(e.target.checked)}
                                        className="w-3.5 h-3.5 rounded border-forest/15 text-forest focus:ring-transparent focus:ring-offset-0 transition-colors cursor-pointer accent-forest"
                                    />
                                    <span className="text-[11px] font-semibold text-charcoal/70 hover:text-charcoal">
                                        Preis verhandelbar (VB)
                                    </span>
                                </label>
                            </div>

                            {/* Provider (Anbieter) */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                    Anbieter
                                </label>
                                <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-full border border-forest/15">
                                    {[
                                        { key: 'all', label: 'Alle' },
                                        { key: 'privat', label: 'Privat' },
                                        { key: 'gewerblich', label: 'Gewerblich' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.key}
                                            type="button"
                                            onClick={() => setAnbieter(opt.key)}
                                            className={`py-1.5 px-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${anbieter === opt.key
                                                ? 'bg-forest text-white'
                                                : 'text-charcoal/65 hover:text-charcoal hover:bg-sand/40'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category (Kategorie) */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                    Kategorie
                                </label>
                                <select
                                    value={kategorie}
                                    onChange={(e) => setKategorie(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all font-medium cursor-pointer"
                                >
                                    <option value="">Kategorie wählen</option>
                                    {CATEGORIES.map((c) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sub-Category (Unterkategorie) */}
                            <div>
                                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${kategorie ? 'text-forest/90' : 'text-charcoal/30'
                                    }`}>
                                    Unterkategorie
                                </label>
                                <select
                                    value={unterkategorie}
                                    onChange={(e) => setUnterkategorie(e.target.value)}
                                    disabled={!kategorie}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-full border border-forest/15 bg-white disabled:bg-sand/30 disabled:text-charcoal/30 text-charcoal focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all font-medium cursor-pointer"
                                >
                                    <option value="">Kategorie wählen</option>
                                    {currentSubcategories.map((sub, i) => (
                                        <option key={i} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location (Standort) */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                    Standort
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                                    <input
                                        type="text"
                                        value={standort}
                                        onChange={(e) => setStandort(e.target.value)}
                                        placeholder="Ort oder PLZ..."
                                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Submit searching */}
                            <button
                                type="submit"
                                className="w-full bg-forest hover:bg-gold text-white hover:text-forest transition-colors duration-300 font-sans font-bold py-3.5 px-6 rounded-full shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                            >
                                <Search className="w-4 h-4" />
                                Suchen
                            </button>

                        </form>
                    </aside>

                    {/* ── Results Area ── */}
                    <section className="lg:col-span-3">

                        {/* Filter Toggle, Search count & Sort bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-forest/5 mb-8">
                            <div className="space-y-1.5">
                                <h2 className="font-display text-xl sm:text-2xl font-black text-forest uppercase tracking-tight">
                                    Alle Anzeigen
                                </h2>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[11px] font-mono text-charcoal/50 uppercase tracking-widest">
                                        {sortedListings.length} {sortedListings.length === 1 ? 'Anzeige' : 'Anzeigen'} gefunden
                                    </span>

                                    {loading && (
                                        <span className="inline-block w-2.5 h-2.5 border-2 border-forest border-t-transparent rounded-full animate-spin ml-2" />
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Mobile Filter Trigger */}
                                <button
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="lg:hidden flex items-center justify-center gap-2 px-4.5 py-2.5 border border-forest/15 bg-sand/30 hover:bg-sand/65 text-charcoal rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5 text-forest" />
                                    Filter
                                </button>

                                {/* Sorting Select */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2.5 border border-forest/15 rounded-full bg-sand/30 text-xs font-bold uppercase tracking-wide focus:outline-none focus:ring-1.5 focus:ring-forest/20 text-charcoal cursor-pointer"
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Active filters display */}
                        {(appliedFilters.keyword ||
                            appliedFilters.kategorie ||
                            appliedFilters.unterkategorie ||
                            appliedFilters.standort ||
                            appliedFilters.anbieter !== 'all' ||
                            appliedFilters.minPrice ||
                            appliedFilters.maxPrice ||
                            appliedFilters.isVerhandelbar) && (
                                <div className="flex flex-wrap items-center gap-2 mb-6">
                                    <span className="text-[10px] font-bold text-forest uppercase tracking-widest py-1">
                                        Aktive Filter:
                                    </span>

                                    {appliedFilters.keyword && (
                                        <span className="inline-flex items-center gap-1 bg-sand border border-forest/10 rounded-full px-3 py-1 text-[10px] font-semibold text-charcoal/70">
                                            "{appliedFilters.keyword}"
                                            <X className="w-3 h-3 text-charcoal/40 hover:text-forest cursor-pointer" onClick={() => { setKeyword(''); setAppliedFilters(p => ({ ...p, keyword: '' })); }} />
                                        </span>
                                    )}

                                    {appliedFilters.kategorie && (
                                        <span className="inline-flex items-center gap-1 bg-sand border border-forest/10 rounded-full px-3 py-1 text-[10px] font-semibold text-charcoal/70">
                                            Kategorie: {appliedFilters.kategorie}
                                            <X className="w-3 h-3 text-charcoal/40 hover:text-forest cursor-pointer" onClick={() => { setKategorie(''); setAppliedFilters(p => ({ ...p, kategorie: '', unterkategorie: '' })); }} />
                                        </span>
                                    )}

                                    {appliedFilters.unterkategorie && (
                                        <span className="inline-flex items-center gap-1 bg-sand border border-forest/10 rounded-full px-3 py-1 text-[10px] font-semibold text-charcoal/70">
                                            Unterkategorie: {appliedFilters.unterkategorie}
                                            <X className="w-3 h-3 text-charcoal/40 hover:text-forest cursor-pointer" onClick={() => { setUnterkategorie(''); setAppliedFilters(p => ({ ...p, unterkategorie: '' })); }} />
                                        </span>
                                    )}

                                    {appliedFilters.standort && (
                                        <span className="inline-flex items-center gap-1 bg-sand border border-forest/10 rounded-full px-3 py-1 text-[10px] font-semibold text-charcoal/70">
                                            Ort: {appliedFilters.standort}
                                            <X className="w-3 h-3 text-charcoal/40 hover:text-forest cursor-pointer" onClick={() => { setStandort(''); setAppliedFilters(p => ({ ...p, standort: '' })); }} />
                                        </span>
                                    )}

                                    {appliedFilters.anbieter !== 'all' && (
                                        <span className="inline-flex items-center gap-1 bg-sand border border-forest/10 rounded-full px-3 py-1 text-[10px] font-semibold text-charcoal/70">
                                            Anbieter: {appliedFilters.anbieter === 'privat' ? 'Privat' : 'Gewerblich'}
                                            <X className="w-3 h-3 text-charcoal/40 hover:text-forest cursor-pointer" onClick={() => { setAnbieter('all'); setAppliedFilters(p => ({ ...p, anbieter: 'all' })); }} />
                                        </span>
                                    )}

                                    {(appliedFilters.minPrice || appliedFilters.maxPrice) && (
                                        <span className="inline-flex items-center gap-1 bg-sand border border-forest/10 rounded-full px-3 py-1 text-[10px] font-semibold text-charcoal/70">
                                            Preis: {appliedFilters.minPrice || '0'}€ – {appliedFilters.maxPrice || '∞'}€
                                            <X className="w-3 h-3 text-charcoal/40 hover:text-forest cursor-pointer" onClick={() => { setMinPrice(''); setMaxPrice(''); setAppliedFilters(p => ({ ...p, minPrice: '', maxPrice: '' })); }} />
                                        </span>
                                    )}

                                    {appliedFilters.isVerhandelbar && (
                                        <span className="inline-flex items-center gap-1 bg-sand border border-forest/10 rounded-full px-3 py-1 text-[10px] font-semibold text-charcoal/70">
                                            VB
                                            <X className="w-3 h-3 text-charcoal/40 hover:text-forest cursor-pointer" onClick={() => { setIsVerhandelbar(false); setAppliedFilters(p => ({ ...p, isVerhandelbar: false })); }} />
                                        </span>
                                    )}

                                    <button
                                        onClick={handleResetFilters}
                                        className="text-[10px] font-bold text-gold hover:text-forest uppercase tracking-wider py-1 ml-1 cursor-pointer"
                                    >
                                        Alle löschen
                                    </button>
                                </div>
                            )}

                        {/* Products Grid */}
                        {loading && listings.length === 0 ? (
                            // Skeleton Loader
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="rounded-3xl overflow-hidden border border-forest/5 animate-pulse bg-white">
                                        <div className="aspect-[16/10] bg-sand/45" />
                                        <div className="p-4 space-y-3">
                                            <div className="h-5 bg-sand/50 rounded-full w-3/4 animate-pulse" />
                                            <div className="h-3.5 bg-sand/35 rounded-full w-1/2 animate-pulse" />
                                            <div className="h-6 bg-sand/50 rounded-full w-1/3 mt-4 animate-pulse" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : sortedListings.length === 0 ? (
                            // Empty State
                            <div className="text-center py-20 px-4 bg-sand/20 rounded-[32px] border border-dashed border-forest/10 flex flex-col items-center justify-center">
                                <Search className="w-12 h-12 text-forest/45 mb-4" />
                                <p className="font-display text-lg font-bold text-forest mb-2">
                                    Keine Inserate gefunden
                                </p>
                                <p className="font-sans text-xs text-charcoal/60 max-w-sm mb-6 font-light">
                                    Es gibt keine Camping-Anzeigen, die deinen aktuellen Filtern entsprechen. Probiere aus, einige Suchkriterien zu lockern.
                                </p>
                                <button
                                    onClick={handleResetFilters}
                                    className="bg-forest hover:bg-gold text-white hover:text-forest transition-colors duration-300 text-xs font-bold uppercase tracking-wider py-3.5 px-7 rounded-full shadow-md cursor-pointer"
                                >
                                    Alle Inserate laden
                                </button>
                            </div>
                        ) : (
                            // Listings Grid
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                                    {sortedListings.slice(0, visibleCount).map((item) => (
                                        <div key={item.id} className="h-full">
                                            <ListingCard
                                                item={item}
                                                isWishlisted={wishlistedIds.includes(item.id)}
                                                onToggleWishlist={handleToggleWishlist}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Load More Button */}
                                {sortedListings.length > visibleCount && (
                                    <div className="flex justify-center mt-12">
                                        <button
                                            onClick={() => setVisibleCount(prev => prev + 12)}
                                            className="bg-forest text-white text-xs font-semibold uppercase tracking-wider py-4 px-10 rounded-full border border-forest/10 shadow-md hover:bg-gold hover:text-forest hover:border-gold hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer font-sans"
                                        >
                                            Mehr Angebote laden
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>

                </div>
            </main>

            {/* ── Category Description / SEO Section ── */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 mb-4">
                <div className="bg-gradient-to-br from-sand/50 to-beige/35 rounded-3xl border border-forest/10 p-8 md:p-12 shadow-sm font-sans">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-forest mb-4">
                        Camping-Anzeigen auf Campuna entdecken
                    </h2>
                    <div className="space-y-4 text-xs md:text-sm text-charcoal/80 leading-relaxed font-light">
                        <p className="font-medium text-forest/90">
                            Campuna ist dein Camping-Marktplatz für Fahrzeuge, Zubehör, Dienstleistungen, Stellplätze, Vermietung und vieles mehr.
                        </p>
                        <p>
                            Hier findest du aktuelle Anzeigen von privaten Verkäufern und gewerblichen Anbietern aus ganz Deutschland. Suchst du einen Camper oder brauchst du die passende Ausrüstung für deine nächste Reise? Möchtest du deinen Stellplatz inserieren oder suchst du spezielle Camping-Handwerker?
                        </p>
                        <p>
                            Dank der differenzierten Filtermöglichkeiten nach Preis, Bundesland, Anbieter, Kategorie und Unterkategorie findest du schnell genau das Angebot, das perfekt zu deinem Urlaub passt. Registriere dich und inseriere noch heute.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Categories Section Carousel ── */}
            <section className="py-16 px-4 bg-white border-t border-forest/5">
                <div className="max-w-7xl mx-auto mb-10 text-center">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-gold block mb-2">
                        STÖBERN
                    </span>
                    <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-black">
                        Nach Kategorie filtern
                    </h2>
                </div>
                <CategoriesSection />
            </section>

            {/* ── Mobile Filter slide-in drawer ── */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-55 flex flex-col lg:hidden border-l border-forest/10"
                        >
                            {/* Header */}
                            <div className="p-5 border-b border-forest/10 flex items-center justify-between bg-sand/30">
                                <span className="font-display text-base font-bold text-forest flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-gold" />
                                    Filter filtern
                                </span>
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="p-1 px-2 rounded-full border border-forest/10 hover:bg-forest hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Scrollable Filters */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Keyword */}
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                        Marke, Modell, Stichwort...
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            placeholder="Z.B. Morelo, Zelt, Solar..."
                                            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Price range */}
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                        Preis
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-charcoal/40">Min</span>
                                            <input
                                                type="number"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                placeholder="€ 8"
                                                className="w-full pl-9 pr-2 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal focus:outline-none tracking-tight"
                                                min="0"
                                            />
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-charcoal/40">Max</span>
                                            <input
                                                type="number"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                placeholder="€ 65.000"
                                                className="w-full pl-9 pr-2 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal focus:outline-none tracking-tight"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <label className="mt-3 flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={isVerhandelbar}
                                            onChange={(e) => setIsVerhandelbar(e.target.checked)}
                                            className="w-3.5 h-3.5 rounded border-forest/15 text-forest focus:ring-transparent focus:ring-offset-0 transition-colors accent-forest"
                                        />
                                        <span className="text-[11px] font-semibold text-charcoal/70">
                                            Preis verhandelbar (VB)
                                        </span>
                                    </label>
                                </div>

                                {/* Provider (Anbieter) */}
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                        Anbieter
                                    </label>
                                    <div className="grid grid-cols-3 gap-1 bg-sand/30 p-1 rounded-full border border-forest/15">
                                        {[
                                            { key: 'all', label: 'Alle' },
                                            { key: 'privat', label: 'Privat' },
                                            { key: 'gewerblich', label: 'Gewerblich' }
                                        ].map((opt) => (
                                            <button
                                                key={opt.key}
                                                type="button"
                                                onClick={() => setAnbieter(opt.key)}
                                                className={`py-1.5 px-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${anbieter === opt.key
                                                    ? 'bg-forest text-white'
                                                    : 'text-charcoal/65 hover:text-charcoal hover:bg-sand/40'
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category (Kategorie) */}
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                        Kategorie
                                    </label>
                                    <select
                                        value={kategorie}
                                        onChange={(e) => setKategorie(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all font-medium cursor-pointer"
                                    >
                                        <option value="">Kategorie wählen</option>
                                        {CATEGORIES.map((c) => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sub-Category (Unterkategorie) */}
                                <div>
                                    <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${kategorie ? 'text-forest/90' : 'text-charcoal/30'
                                        }`}>
                                        Unterkategorie
                                    </label>
                                    <select
                                        value={unterkategorie}
                                        onChange={(e) => setUnterkategorie(e.target.value)}
                                        disabled={!kategorie}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-full border border-forest/15 bg-white disabled:bg-sand/30 disabled:text-charcoal/30 text-charcoal focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all font-medium cursor-pointer"
                                    >
                                        <option value="">Kategorie wählen</option>
                                        {currentSubcategories.map((sub, i) => (
                                            <option key={i} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Location (Standort) */}
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-forest/90 mb-2">
                                        Standort
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                                        <input
                                            type="text"
                                            value={standort}
                                            onChange={(e) => setStandort(e.target.value)}
                                            placeholder="Ort oder PLZ..."
                                            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-forest/15 bg-white text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:ring-1.5 focus:ring-forest/20 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Drawer Actions */}
                            <div className="p-5 border-t border-forest/10 bg-sand/30 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="flex-1 whitespace-nowrap bg-white border border-forest/20 hover:border-forest/40 text-charcoal text-[11px] font-bold uppercase tracking-wider py-3.5 rounded-full text-center transition-all cursor-pointer"
                                >
                                    Zurücksetzen
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSearchSubmit}
                                    className="flex-1 whitespace-nowrap bg-forest hover:bg-gold hover:text-forest text-white text-[11px] font-bold uppercase tracking-wider py-3.5 rounded-full text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                    <Search className="w-3.5 h-3.5" />
                                    Suchen
                                </button>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}
