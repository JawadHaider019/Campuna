import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getRecentlyViewedIds } from '../utils/recentlyViewed';
import { FEATURED_LISTINGS } from '../data';
import { isListingSold, formatListingPrice } from '../utils/formatters';
import { isListingBoosted } from '../utils/sellerBadge';
import { ListingBadgesRow } from './ListingBadge';

export default function RecentlyViewedSection({ maxItems = 10, className = '' }) {
    const [listings, setListings] = useState([]);
    const sliderRef = useRef(null);

    const loadHistory = () => {
        const ids = getRecentlyViewedIds();
        if (!ids || ids.length === 0) {
            setListings([]);
            return;
        }

        const map = new Map();
        FEATURED_LISTINGS.forEach(item => {
            if (item && item.id && !isListingSold(item)) {
                map.set(String(item.id), item);
                if (item.slug) map.set(String(item.slug), item);
            }
        });

        const ordered = [];
        for (const id of ids) {
            const match = map.get(String(id));
            if (match && !ordered.some(x => x.id === match.id)) {
                ordered.push(match);
            }
            if (ordered.length >= maxItems) break;
        }
        setListings(ordered);
    };

    useEffect(() => {
        loadHistory();
        const handleUpdate = () => loadHistory();
        window.addEventListener('campuna-history-updated', handleUpdate);
        return () => window.removeEventListener('campuna-history-updated', handleUpdate);
    }, [maxItems]);

    if (!listings || listings.length === 0) {
        return null;
    }

    const scrollSlider = (direction) => {
        if (!sliderRef.current) return;
        const scrollAmount = 300;
        sliderRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <section className={`my-8 sm:my-12 ${className}`} id="zuletzt-angesehen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="font-display font-bold text-base sm:text-lg md:text-xl text-charcoal tracking-tight leading-tight">
                                Zuletzt angesehen
                            </h2>
                            <p className="font-sans text-[11px] sm:text-xs text-charcoal/60 mt-0.5">
                                Deine kürzlich aufgerufenen Inserate
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => scrollSlider('left')}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-forest/10 hover:border-gold text-forest flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                            aria-label="Nach links scrollen"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollSlider('right')}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-forest/10 hover:border-gold text-forest flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                            aria-label="Nach rechts scrollen"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Slider */}
                <div
                    ref={sliderRef}
                    className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                    {listings.map((item) => {
                        const targetSlug = item.slug || item.id;
                        const mainImage = item.images?.[0] || item['Main Image'] || item.MainImage;
                        const isBoosted = isListingBoosted(item);

                        return (
                            <Link
                                key={item.id}
                                to={`/listing_details/${encodeURIComponent(targetSlug)}`}
                                className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 w-[220px] sm:w-[260px] shrink-0 snap-start select-none shadow-2xs hover:shadow-md ${
                                    isBoosted
                                        ? 'bg-gradient-to-b from-[#fdfbf7] to-[#fbf7ee] border-amber-300/60 hover:border-amber-400'
                                        : 'bg-white border-forest/10 hover:border-forest/30'
                                }`}
                            >
                                <div className="relative aspect-[16/10] w-full bg-sand/20 overflow-hidden">
                                    {mainImage ? (
                                        <img
                                            src={mainImage}
                                            alt={item.title || 'Camping Inserat'}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-forest/40 text-xs">
                                            Kein Bild
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 right-2 z-10">
                                        <ListingBadgesRow item={item} size="xs" />
                                    </div>
                                </div>

                                <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 space-y-2">
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-gold-dark block truncate">
                                            {item.category || 'Camping'}
                                        </span>
                                        <h3 className="font-display text-xs sm:text-sm font-bold text-forest line-clamp-1 group-hover:text-gold transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-baseline justify-between pt-2 border-t border-forest/5">
                                        <span className="text-xs sm:text-sm font-bold text-forest">
                                            {formatListingPrice(item)}
                                        </span>
                                        <span className="text-[10px] text-charcoal/50 truncate max-w-[110px]">
                                            {item.location || 'Deutschland'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

