import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, ShieldCheck, Eye, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getHomepageProducts } from '../api/bubbleApi';
import { FEATURED_LISTINGS } from '../data';
import { formatLocation } from '../utils/location';
import { buildListingSlug } from '../utils/slugify';
import { navigateTo } from '../utils/navigation';

// Category mapping helper
const CATEGORY_MAPPINGS = {
    'ausrüstung-und-zubehör': ['Camping Zubehör', 'Ausrüstung und Zubehör', 'Wohnmobile & Camper'],
    'campingplätze-stellplätze': ['Stellplätze & Campingplätze', 'Camping Services', 'Mieten & Vermieten'],
    'fahrzeuge': ['Wohnmobile & Camper', 'Fahrzeuge'],
};

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80';

function normalizeProduct(item) {
    if (!item) return null;
    if (item.id && Array.isArray(item.images) && item.displayLocation) {
        const existingImages = [...item.images];
        if (!existingImages.includes(DEFAULT_FALLBACK_IMAGE)) {
            existingImages.push(DEFAULT_FALLBACK_IMAGE);
        }
        return { ...item, images: existingImages };
    }

    const id = item._id || item.id || String(Math.random());

    let rawImages = [];
    const mainImg = item["Main Image"] || item.MainImage;
    if (mainImg) rawImages.push(mainImg);
    if (item.images && Array.isArray(item.images)) {
        item.images.forEach(img => {
            if (img && img !== mainImg && !rawImages.includes(img)) rawImages.push(img);
        });
    } else if (item.images && typeof item.images === 'string') {
        if (item.images !== mainImg) rawImages.push(item.images);
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

    if (!images.includes(DEFAULT_FALLBACK_IMAGE)) {
        images.push(DEFAULT_FALLBACK_IMAGE);
    }

    let category = item.Category || item.category || 'Camping Zubehör';
    if (category === 'Ausrüstung und Zubehör') category = 'Camping Zubehör';

    const rawLocation = item["location geo"]?.address || item.location || "Deutschland";
    const displayLocation = formatLocation(rawLocation);
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;

    let pricePeriod = item.pricePeriod || 'Preis';
    if (!item.pricePeriod) {
        if (category === 'Mieten & Vermieten' || (item["Sub - Category"] && item["Sub - Category"].toLowerCase().includes('mieten'))) {
            pricePeriod = 'pro Tag';
        } else if (category === 'Wohnmobile & Camper' || category === 'Tiny Houses' || category === 'Fahrzeuge') {
            pricePeriod = 'Kaufpreis';
        }
    }

    const features = item.features ? [...item.features] : [];
    if (features.length === 0) {
        if (item["Condition item"]) {
            const condMapping = { "New": "Neu", "Used": "Gebraucht", "Good": "Sehr gut", "Like New": "Neuwertig" };
            features.push(condMapping[item["Condition item"]] || item["Condition item"]);
        }
        if (item["Sub - Category"]) features.push(String(item["Sub - Category"]).trim());
        if (item["Type of offer"]) features.push(item["Type of offer"]);
        if (features.length === 0) features.push("Camping");
    }

    const resolvedSellerType = item.listing_user_type || item["listing user type"] || (category === 'Mieten & Vermieten' ? 'Gewerblich' : 'Privat');

    return {
        id,
        title: item.title || item.description || "Camping Angebot",
        category,
        price,
        pricePeriod,
        location: rawLocation,
        displayLocation,
        images,
        listing_user_type: resolvedSellerType,
        features
    };
}

const RelatedListingCard = React.memo(({ item, isWishlisted, onToggleWishlist, onCardClick }) => {
    const [imgIdx, setImgIdx] = useState(0);
    const tagsRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        if (tagsRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = tagsRef.current;
            setCanScrollLeft(scrollLeft > 2);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
        }
    }, []);

    useEffect(() => {
        checkScroll();
        const timer = setTimeout(checkScroll, 200);
        window.addEventListener('resize', checkScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScroll);
        };
    }, [item?.features, checkScroll]);

    const handleImgError = () => {
        if (imgIdx < item.images.length - 1) {
            setImgIdx(prev => prev + 1);
        }
    };

    const scrollTags = (e, direction) => {
        e.stopPropagation();
        if (tagsRef.current) {
            const scrollAmount = direction === 'left' ? -90 : 90;
            tagsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div
            onClick={() => onCardClick(item)}
            className="listing-card group relative flex-shrink-0 w-[300px] md:w-[320px] flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-forest/5 hover:border-forest/10 hover:shadow-xl transition-all duration-300 select-none cursor-pointer snap-start"
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/20">
                <img
                    src={item.images[imgIdx]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105 pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={handleImgError}
                />
                <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                    <span className="bg-forest flex items-center gap-1 justify-center text-white text-[8px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                        <ShieldCheck className="w-3 h-3 text-white" />
                        {item.listing_user_type}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleWishlist) onToggleWishlist(item.id, e);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${isWishlisted
                            ? 'bg-rose-500 text-white hover:bg-rose-600 scale-110'
                            : 'bg-white/70 hover:bg-white text-forest hover:scale-110'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>
                <div className="absolute bottom-4 right-0 inset-x-4 flex items-center justify-end pointer-events-none text-white/90">
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold shrink-0" />
                        <span>{item.displayLocation || item.location}</span>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white text-forest px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
                        <Eye className="w-4 h-4" />
                        <span>Inserat ansehen</span>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="font-display text-md font-bold text-black group-hover:text-gold transition-colors duration-200 mb-2 line-clamp-1">
                        {item.title}
                    </h3>
                    <div className="relative group/tags mb-2" onClick={(e) => e.stopPropagation()}>
                        {canScrollLeft && (
                            <button
                                type="button"
                                onClick={(e) => scrollTags(e, 'left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-white/90 hover:bg-white text-forest shadow rounded-full flex items-center justify-center border border-forest/10 transition-all duration-200"
                                aria-label="Scroll tags left"
                            >
                                <ChevronLeft className="w-2.5 h-2.5" />
                            </button>
                        )}
                        <div
                            ref={tagsRef}
                            onScroll={checkScroll}
                            className="flex overflow-x-auto gap-1.5 no-scrollbar scroll-smooth"
                        >
                            {item.features.map((feat, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] text-charcoal/60 bg-sand px-2 py-1 rounded-md border border-forest/5 whitespace-nowrap shrink-0 select-none"
                                >
                                    {feat}
                                </span>
                            ))}
                        </div>
                        {canScrollRight && (
                            <button
                                type="button"
                                onClick={(e) => scrollTags(e, 'right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-white/90 hover:bg-white text-forest shadow rounded-full flex items-center justify-center border border-forest/10 transition-all duration-200"
                                aria-label="Scroll tags right"
                            >
                                <ChevronRight className="w-2.5 h-2.5" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="pt-2 border-t border-forest/5 flex items-center justify-between">
                    <span className="block text-[10px] uppercase tracking-widest text-charcoal/40 font-mono">
                        {item.pricePeriod}
                    </span>
                    <span className="font-display text-lg font-bold text-forest">
                        {item.price.toLocaleString('de-DE')} €
                    </span>
                </div>
            </div>
        </div>
    );
});

RelatedListingCard.displayName = 'RelatedListingCard';

export default function RelatedListings({ tool }) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlistedIds, setWishlistedIds] = useState([]);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        let active = true;
        setLoading(true);

        const fetchListings = async () => {
            try {
                let allProducts = [];
                const data = await getHomepageProducts();
                if (data && data.status === "success" && Array.isArray(data.response?.listing)) {
                    allProducts = data.response.listing;
                } else {
                    allProducts = FEATURED_LISTINGS;
                }

                const normalized = allProducts.map(normalizeProduct).filter(Boolean);

                // Filter logic based on tool relatedCategorySlug or keywords
                const targetSlug = tool?.relatedCategorySlug || '';
                const allowedCategories = CATEGORY_MAPPINGS[targetSlug] || [];

                let matched = [];
                if (allowedCategories.length > 0) {
                    matched = normalized.filter(item => allowedCategories.includes(item.category));
                }

                // If not enough matches, fallback to adding remaining normalized products
                if (matched.length < 4) {
                    const matchedIds = new Set(matched.map(m => m.id));
                    const remaining = normalized.filter(item => !matchedIds.has(item.id));
                    matched = [...matched, ...remaining];
                }

                if (active) {
                    setListings(matched.slice(0, 10)); // Top 10 related items in 1 row
                }
            } catch (err) {
                console.error("Failed to load related listings:", err);
                const fallback = FEATURED_LISTINGS.map(normalizeProduct).filter(Boolean);
                if (active) setListings(fallback.slice(0, 10));
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchListings();
        return () => { active = false; };
    }, [tool?.id, tool?.relatedCategorySlug]);

    const handleToggleWishlist = (id, e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setWishlistedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleCardClick = (item) => {
        const slug = buildListingSlug(item.title, item.id);
        navigateTo(`/listing_details/${slug}`);
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -340 : 340;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const sectionTitle = tool?.relatedListingsTitle || "Passende Campuna Inserate";

    if (loading) {
        return (
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    <div className="h-6 w-48 bg-sand/60 rounded-full animate-pulse mb-6" />
                    <div className="flex gap-5 overflow-hidden">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="shrink-0 w-[280px] sm:w-[310px] h-[280px] bg-sand/30 animate-pulse rounded-[24px] border border-forest/5 p-4 flex flex-col justify-between">
                                <div className="w-full h-36 bg-sand/60 rounded-[16px]" />
                                <div className="space-y-2 mt-4">
                                    <div className="h-4 bg-sand/60 rounded w-3/4" />
                                    <div className="h-3 bg-sand/40 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!listings || listings.length === 0) return null;

    return (
        <section className="py-12 sm:py-16 bg-white border-t border-forest/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                {/* Header Row */}
                <div className="flex items-end justify-between mb-8">
                    <div className="w-full sm:w-auto text-center sm:text-left">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block mb-1">
                            CAMPUNA MARKTPLATZ
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-forest">
                            {sectionTitle}
                        </h2>
                    </div>

                    <div className="hidden sm:flex items-center space-x-2">
                        {/* Scroll Arrows for Desktop */}
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full bg-sand/40 hover:bg-forest hover:text-white text-forest flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full bg-sand/40 hover:bg-forest hover:text-white text-forest flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Single Horizontal Row of Products */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x scroll-smooth no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {listings.map((item) => (
                        <RelatedListingCard
                            key={item.id}
                            item={item}
                            isWishlisted={wishlistedIds.includes(item.id)}
                            onToggleWishlist={handleToggleWishlist}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>

                {/* Mobile Scroll Arrows at Bottom */}
                <div className="flex sm:hidden justify-center items-center space-x-3 mt-4">
                    <button
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-full bg-sand/40 hover:bg-forest hover:text-white text-forest flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-full bg-sand/40 hover:bg-forest hover:text-white text-forest flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
