import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { Heart, MapPin, Eye, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_LISTINGS } from '../data';
import { ListingBadgesRow } from './ListingBadge';
import ListingImagePlaceholder from './ListingImagePlaceholder';
import { formatCondition, formatListingPrice, formatCleanLocation, isListingSold } from '../utils/formatters';
import { isListingBoosted } from '../utils/sellerBadge';
import { rotateListingsFairly, shuffleArray } from '../utils/highlighting';

export function normalizeListing(item) {
    if (!item) return null;

    const id = item.id || item._id || item.slug || item.title || 'listing-item';
    const slug = item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : id);
    const title = item.title || item.description || "Camping Angebot";
    const category = item.category || item.Category || 'Camping Zubehör';
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    const type_of_offer = item.type_of_offer || (category === 'Mieten & Vermieten' ? 'RENTAL' : (category === 'Camping Services' ? 'SERVICE' : 'SALE'));
    const pricePeriod = item.pricePeriod || (type_of_offer === 'RENTAL' ? 'pro Tag' : (type_of_offer === 'SERVICE' ? 'Service' : 'Kaufpreis'));
    const location = formatCleanLocation(item.location || item.displayLocation || "Deutschland");

    let images = [];
    if (Array.isArray(item.images) && item.images.length > 0) {
        images = item.images;
    } else if (typeof item.images === 'string' && item.images.trim()) {
        images = [item.images];
    } else if (item["Main Image"]) {
        images = [item["Main Image"]];
    }

    const sellerType = item.seller?.type || item.listing_user_type || item.seller_type || 'Privat';
    const sellerTier = item.seller?.tier || item.company_tier || 'FREE';

    let features = [];
    if (Array.isArray(item.features) && item.features.length > 0) {
        features = item.features;
    } else {
        if (item.condition) features.push(formatCondition(item.condition));
        if (item.subcategory) features.push(item.subcategory);
    }
    if (features.length === 0) {
        features = ['Camping'];
    }

    const isBoosted = isListingBoosted(item);

    return {
        id,
        slug,
        title,
        category,
        price,
        negotiable: Boolean(item.negotiable),
        type_of_offer,
        pricePeriod,
        location,
        images,
        sellerType,
        seller: {
            name: item.seller?.name || (sellerType === 'Gewerblich' ? 'Gewerblicher Anbieter' : 'Privatverkäufer'),
            type: sellerType,
            tier: sellerTier,
            verified: true
        },
        features,
        featured: Boolean(item.featured || item.Featured || isBoosted),
        is_boosted: isBoosted,
        isExclusive: Boolean(item.isExclusive),
        is_sold: isListingSold(item)
    };
}

export const ListingCard = React.memo(({ item: rawItem, onCardClick, isParentDragging, isFavorite, onToggleFavorite, className = '', isGrid = false }) => {
    const item = useMemo(() => normalizeListing(rawItem), [rawItem]);
    const [imgIdx, setImgIdx] = useState(0);
    const [imgFailed, setImgFailed] = useState(false);
    const tagsRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Suppress accidental clicks during drag (> 6px threshold)
    const pointerStartRef = useRef(null);
    const hasDraggedRef = useRef(false);

    const handlePointerDown = (e) => {
        pointerStartRef.current = { x: e.clientX, y: e.clientY };
        hasDraggedRef.current = false;
    };

    const handlePointerMove = (e) => {
        if (pointerStartRef.current) {
            const dx = Math.abs(e.clientX - pointerStartRef.current.x);
            const dy = Math.abs(e.clientY - pointerStartRef.current.y);
            if (dx > 6 || dy > 6) {
                hasDraggedRef.current = true;
            }
        }
    };

    const handleCardClick = (e) => {
        if (hasDraggedRef.current || (isParentDragging && isParentDragging())) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (onCardClick) onCardClick(item);
    };

    const checkScroll = useCallback(() => {
        if (tagsRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = tagsRef.current;
            setCanScrollLeft(scrollLeft > 2);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
        }
    }, []);

    const handleMouseEnterTags = () => {
        if (item?.features && item.features.length > 2) {
            checkScroll();
        }
    };

    const scrollTags = (e, direction) => {
        e.stopPropagation();
        if (tagsRef.current) {
            const scrollAmount = direction === 'left' ? -90 : 90;
            tagsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!item) return null;

    const hasImage = item.images && item.images.length > 0 && !imgFailed;

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onClick={handleCardClick}
            className={`listing-card group relative flex flex-col h-full rounded-2xl sm:rounded-[20px] overflow-hidden transition-all duration-300 select-none cursor-pointer ${
                isGrid ? 'w-full' : 'flex-shrink-0 w-[220px] sm:w-[245px] md:w-[270px] lg:w-[280px]'
            } ${
                item.is_boosted
                    ? 'bg-gradient-to-b from-[#fdfbf7] to-[#fbf7ee] border border-amber-300/60 hover:border-amber-400/80 shadow-[0_4px_18px_-4px_rgba(202,152,43,0.18)] hover:shadow-[0_6px_24px_-4px_rgba(202,152,43,0.28)]'
                    : 'bg-white border border-forest/5 hover:border-forest/10 hover:shadow-md'
            } ${className}`}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/20">
                {hasImage ? (
                    <img
                        src={item.images[imgIdx]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                        onError={() => {
                            if (imgIdx < item.images.length - 1) {
                                setImgIdx(i => i + 1);
                            } else {
                                setImgFailed(true);
                            }
                        }}
                    />
                ) : (
                    <ListingImagePlaceholder category={item.category} />
                )}

                {/* Top Badges */}
                <div className="absolute top-2 inset-x-2 sm:top-2.5 sm:inset-x-2.5 flex items-center justify-between z-20 gap-1.5">
                    <ListingBadgesRow item={item} size="xs" />

                    <button
                        type="button"
                        aria-label={isFavorite ? "Von Merkzettel entfernen" : "Auf den Merkzettel"}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleFavorite) onToggleFavorite(item.id);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md cursor-pointer pointer-events-auto shrink-0 ${
                            isFavorite
                                ? 'bg-rose-500 text-white hover:bg-rose-600 scale-110'
                                : 'bg-white/85 hover:bg-white text-forest hover:text-rose-500 hover:scale-110'
                        }`}
                    >
                        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-current text-white' : ''}`} />
                    </button>
                </div>

                {/* Location Chip */}
                <div className="absolute bottom-2.5 right-0 inset-x-2.5 sm:bottom-3 sm:inset-x-3 flex items-center justify-end pointer-events-none text-white/90 z-10">
                    <div className="bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] flex items-center gap-1 font-medium">
                        <MapPin className="w-2.5 h-2.5 text-gold shrink-0" />
                        <span className="truncate max-w-[110px]">{item.location}</span>
                    </div>
                </div>

                {/* Hover Eye Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                    <div className="bg-white text-forest px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inserat ansehen</span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="font-display text-xs sm:text-sm md:text-[15px] font-semibold text-black group-hover:text-gold transition-colors duration-200 mb-1.5 line-clamp-1">
                        {item.title}
                    </h3>
                    <div className="relative group/tags mb-1.5" onMouseEnter={handleMouseEnterTags} onClick={(e) => e.stopPropagation()}>
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
                            className="flex overflow-x-auto gap-1 no-scrollbar scroll-smooth"
                        >
                            {item.features.map((feat, idx) => (
                                <span
                                    key={idx}
                                    className="text-[9px] sm:text-[10px] text-charcoal/60 bg-sand px-1.5 sm:px-2 py-0.5 rounded-md border border-forest/5 whitespace-nowrap shrink-0 select-none"
                                >
                                    {formatCondition(feat)}
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
                    <span className="block text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-charcoal/40 font-mono">
                        {item.pricePeriod || 'Preis'}
                    </span>
                    <span className="font-display text-sm sm:text-base font-bold text-forest">
                        {formatListingPrice(item)}
                    </span>
                </div>
            </div>
        </div>
    );
});

ListingCard.displayName = 'ListingCard';

export default function FeaturedListings({
    listings: propListings,
    selectedCategoryFilter,
    searchQuery,
    searchLocation,
    badge = "ANGEBOTE",
    title = "Camping-Angebote auf Campuna",
    subtitle = "Stöbere durch gebrauchte und neue Camping-Angebote aus ganz Deutschland, von privat und vom Händler. Täglich kommen neue Inserate dazu."
}) {
    const navigate = useNavigate();
    const rowRef1 = useRef(null);
    const rowRef2 = useRef(null);
    const [rowConstraints1, setRowConstraints1] = useState(0);
    const [rowConstraints2, setRowConstraints2] = useState(0);
    const [favorites, setFavorites] = useState(['lst_1', 'lst_5']);

    const toggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    // Static pool of listings: prop or FEATURED_LISTINGS (zero database / zero Bubble API)
    const baseListings = useMemo(() => {
        const pool = (propListings && propListings.length > 0) ? propListings : FEATURED_LISTINGS;
        return pool.filter(l => !isListingSold(l));
    }, [propListings]);

    const filteredListings = useMemo(() => {
        return baseListings.filter((item) => {
            if (selectedCategoryFilter && item.category !== selectedCategoryFilter) return false;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const inTitle = item.title?.toLowerCase().includes(query);
                const inFeatures = item.features?.some(f => f.toLowerCase().includes(query));
                if (!inTitle && !inFeatures) return false;
            }
            if (searchLocation) {
                const loc = searchLocation.toLowerCase();
                if (!item.location?.toLowerCase().includes(loc)) return false;
            }
            return true;
        });
    }, [baseListings, selectedCategoryFilter, searchQuery, searchLocation]);

    // Split listings into Row 1 & Row 2
    const { row1Listings, row2Listings } = useMemo(() => {
        if (filteredListings.length === 0) return { row1Listings: [], row2Listings: [] };
        if (filteredListings.length === 1) return { row1Listings: filteredListings, row2Listings: [] };

        const mid = Math.ceil(filteredListings.length / 2);
        return {
            row1Listings: filteredListings.slice(0, mid),
            row2Listings: filteredListings.slice(mid)
        };
    }, [filteredListings]);

    const dirRef1 = useRef(-1);
    const dirRef2 = useRef(-1);
    const isHoveredRef1 = useRef(false);
    const isHoveredRef2 = useRef(false);
    const isDraggingRef1 = useRef(false);
    const isDraggingRef2 = useRef(false);
    const lastDragEndTimeRef1 = useRef(0);
    const lastDragEndTimeRef2 = useRef(0);

    const x1 = useMotionValue(0);
    const x2 = useMotionValue(0);

    // Measure row scroll widths
    useEffect(() => {
        const measure = () => {
            if (rowRef1.current) {
                const c1 = Math.max(0, rowRef1.current.scrollWidth - rowRef1.current.offsetWidth);
                setRowConstraints1(c1);
            }
            if (rowRef2.current) {
                const c2 = Math.max(0, rowRef2.current.scrollWidth - rowRef2.current.offsetWidth);
                setRowConstraints2(c2);
            }
        };

        const timer = setTimeout(measure, 100);
        window.addEventListener('resize', measure);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', measure);
        };
    }, [row1Listings, row2Listings]);

    // Smooth auto-scroll animation loop
    useEffect(() => {
        let animationFrameId;
        let lastTime = performance.now();
        let isVisible = true;

        const loop = (time) => {
            if (isVisible) {
                const delta = Math.min((time - lastTime) / 1000, 0.1);
                lastTime = time;

                const isPaused1 = isHoveredRef1.current || isDraggingRef1.current;
                if (row1Listings.length > 0 && !isPaused1 && rowConstraints1 > 0) {
                    let currentX1 = x1.get() + dirRef1.current * 18 * delta;
                    if (dirRef1.current === -1 && currentX1 <= -rowConstraints1) {
                        currentX1 = -rowConstraints1;
                        dirRef1.current = 1;
                    } else if (dirRef1.current === 1 && currentX1 >= 0) {
                        currentX1 = 0;
                        dirRef1.current = -1;
                    }
                    x1.set(currentX1);
                }

                const isPaused2 = isHoveredRef2.current || isDraggingRef2.current;
                if (row2Listings.length > 0 && !isPaused2 && rowConstraints2 > 0) {
                    let currentX2 = x2.get() + dirRef2.current * 18 * delta;
                    if (dirRef2.current === -1 && currentX2 <= -rowConstraints2) {
                        currentX2 = -rowConstraints2;
                        dirRef2.current = 1;
                    } else if (dirRef2.current === 1 && currentX2 >= 0) {
                        currentX2 = 0;
                        dirRef2.current = -1;
                    }
                    x2.set(currentX2);
                }
            } else {
                lastTime = time;
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [row1Listings, row2Listings, rowConstraints1, rowConstraints2, x1, x2]);

    const handleScrollStep = useCallback((rowNum, direction) => {
        const motionVal = rowNum === 1 ? x1 : x2;
        const constraints = rowNum === 1 ? rowConstraints1 : rowConstraints2;
        if (constraints <= 0) return;

        const step = 280;
        const current = motionVal.get();
        let target = direction === 'left' ? Math.min(0, current + step) : Math.max(-constraints, current - step);

        animate(motionVal, target, {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1]
        });
    }, [rowConstraints1, rowConstraints2, x1, x2]);

    const handleCardClick = (item) => {
        navigate(`/listing_details/${item.slug || item.id}`);
    };

    return (
        <section id="exclusive-offers" className="pt-0 pb-10 sm:pt-6 sm:pb-16 bg-white scroll-mt-24 overflow-hidden select-none w-full">
            {/* Header Container */}
            <div className="max-w-8xl mx-auto px-6 md:px-12 mb-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
                            {badge}
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
                            {title}
                        </h2>
                        <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
                            {subtitle}
                        </p>
                    </div>

                    <div className="hidden lg:block">
                        <button
                            onClick={() => navigate('/all_listings')}
                            className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-forest cursor-pointer"
                        >
                            <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Inserate</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2 Marquee Rows - Full Width */}
            <div className="w-full space-y-3.5 sm:space-y-4 md:space-y-5 relative overflow-hidden">
                <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Row 1 */}
                {row1Listings.length > 0 && (
                    <div
                        className="group/row relative overflow-hidden pb-1 cursor-grab active:cursor-grabbing w-full px-4 sm:px-6 md:px-8"
                        ref={rowRef1}
                        onMouseEnter={() => { isHoveredRef1.current = true; }}
                        onMouseLeave={() => { isHoveredRef1.current = false; }}
                    >
                        <button
                            type="button"
                            aria-label="Vorherige Inserate anzeigen"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleScrollStep(1, 'left');
                            }}
                            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-forest hover:text-gold shadow-xl border border-forest/10 items-center justify-center transition-all duration-300 opacity-0 group-hover/row:opacity-100 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            type="button"
                            aria-label="Nächste Inserate anzeigen"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleScrollStep(1, 'right');
                            }}
                            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-forest hover:text-gold shadow-xl border border-forest/10 items-center justify-center transition-all duration-300 opacity-0 group-hover/row:opacity-100 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -rowConstraints1 }}
                            style={{ x: x1 }}
                            onDragStart={() => { isDraggingRef1.current = true; isHoveredRef1.current = true; }}
                            onDragEnd={() => {
                                lastDragEndTimeRef1.current = Date.now();
                                setTimeout(() => { isDraggingRef1.current = false; }, 150);
                            }}
                            className="flex gap-3 sm:gap-4 md:gap-5 w-max"
                        >
                            {row1Listings.map((item) => (
                                <ListingCard
                                    key={item.id}
                                    item={item}
                                    onCardClick={handleCardClick}
                                    isParentDragging={() => isDraggingRef1.current}
                                    isFavorite={favorites.includes(item.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            ))}
                        </motion.div>
                    </div>
                )}

                {/* Row 2 */}
                {row2Listings.length > 0 && (
                    <div
                        className="group/row relative overflow-hidden pb-1 cursor-grab active:cursor-grabbing w-full px-4 sm:px-6 md:px-8"
                        ref={rowRef2}
                        onMouseEnter={() => { isHoveredRef2.current = true; }}
                        onMouseLeave={() => { isHoveredRef2.current = false; }}
                    >
                        <button
                            type="button"
                            aria-label="Vorherige Inserate anzeigen"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleScrollStep(2, 'left');
                            }}
                            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-forest hover:text-gold shadow-xl border border-forest/10 items-center justify-center transition-all duration-300 opacity-0 group-hover/row:opacity-100 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            type="button"
                            aria-label="Nächste Inserate anzeigen"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleScrollStep(2, 'right');
                            }}
                            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-forest hover:text-gold shadow-xl border border-forest/10 items-center justify-center transition-all duration-300 opacity-0 group-hover/row:opacity-100 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -rowConstraints2 }}
                            style={{ x: x2 }}
                            onDragStart={() => { isDraggingRef2.current = true; isHoveredRef2.current = true; }}
                            onDragEnd={() => {
                                lastDragEndTimeRef2.current = Date.now();
                                setTimeout(() => { isDraggingRef2.current = false; }, 150);
                            }}
                            className="flex gap-3 sm:gap-4 md:gap-5 w-max"
                        >
                            {row2Listings.map((item) => (
                                <ListingCard
                                    key={item.id}
                                    item={item}
                                    onCardClick={handleCardClick}
                                    isParentDragging={() => isDraggingRef2.current}
                                    isFavorite={favorites.includes(item.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            ))}
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Mobile Footer Action Button */}
            <div className="mt-7 flex justify-center lg:hidden px-6">
                <button
                    onClick={() => navigate('/all_listings')}
                    className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-forest cursor-pointer"
                >
                    <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Inserate</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
}
