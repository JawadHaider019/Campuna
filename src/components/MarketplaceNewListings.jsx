import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin } from 'lucide-react';
import { ListingBadgesRow } from './ListingBadge';
import { formatCondition, formatListingPrice, formatCleanLocation, isListingSold } from '../utils/formatters';
import { isListingBoosted } from '../utils/sellerBadge';
import { getImageUrl } from '../utils/imageUrl';

export function MarketplaceListingCard({ item, priority = false }) {
    const [localFav, setLocalFav] = useState(false);
    const isFavorite = localFav;
    const toggleFavorite = () => setLocalFav(prev => !prev);
    const [imgIdx, setImgIdx] = useState(0);
    const [imgFailed, setImgFailed] = useState(false);

    const isBoosted = isListingBoosted(item);
    const isSold = isListingSold(item);
    const images = Array.isArray(item.images) && item.images.length > 0 ? item.images : (item['Main Image'] ? [item['Main Image']] : []);
    const hasImage = images.length > 0 && !imgFailed;
    const targetSlug = item.slug || item.id;
    const location = formatCleanLocation(item.location || item.displayLocation || 'Deutschland');

    return (
        <Link
            to={`/listing_details/${encodeURIComponent(targetSlug)}`}
            className="block h-full no-underline text-inherit focus:outline-none"
        >
            <div
                className={`listing-card group relative flex flex-col h-full rounded-2xl sm:rounded-[20px] overflow-hidden transition-all duration-300 select-none cursor-pointer w-full ${
                    isSold
                        ? 'bg-slate-50 border border-slate-200 opacity-80 hover:opacity-100'
                        : isBoosted
                        ? 'bg-gradient-to-b from-[#fdfbf7] to-[#fbf7ee] border border-amber-300/60 hover:border-amber-400/80 shadow-[0_4px_18px_-4px_rgba(202,152,43,0.18)] hover:shadow-[0_6px_24px_-4px_rgba(202,152,43,0.28)]'
                        : 'bg-white border border-forest/5 hover:border-forest/10 hover:shadow-md'
                }`}
            >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-sand/20">
                    {hasImage ? (
                        <img
                            src={getImageUrl(images[imgIdx], null, { width: 480, quality: 75 })}
                            alt={item.title}
                            loading={priority ? 'eager' : 'lazy'}
                            className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105 pointer-events-none"
                            onError={() => {
                                if (imgIdx < images.length - 1) {
                                    setImgIdx((i) => i + 1);
                                } else {
                                    setImgFailed(true);
                                }
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-sand/30 text-forest/40 text-xs">
                            Kein Bild
                        </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-2 inset-x-2 sm:top-2.5 sm:inset-x-2.5 flex items-center justify-between z-20 gap-1.5">
                        <ListingBadgesRow item={item} size="xs" />

                        <button
                            type="button"
                            aria-label={isFavorite ? 'Von Merkzettel entfernen' : 'Auf den Merkzettel'}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(item.id);
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
                            <span className="truncate max-w-[110px]">{location}</span>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                    <div>
                        <h3 className="font-display text-xs sm:text-sm md:text-[15px] font-semibold text-black group-hover:text-gold transition-colors duration-200 mb-1.5 line-clamp-1">
                            {item.title}
                        </h3>

                        {/* Features chips */}
                        <div className="flex overflow-x-auto gap-1 no-scrollbar scroll-smooth mb-1.5">
                            {(item.features && item.features.length > 0 ? item.features : [item.category || 'Camping']).slice(0, 3).map((feat, idx) => (
                                <span
                                    key={idx}
                                    className="text-[9px] sm:text-[10px] text-charcoal/60 bg-sand px-1.5 sm:px-2 py-0.5 rounded-md border border-forest/5 whitespace-nowrap shrink-0 select-none"
                                >
                                    {formatCondition(feat)}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2 border-t border-forest/5 flex items-center justify-between">
                        <span className="block text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-charcoal/40 font-mono">
                            {item.pricePeriod || (item.type_of_offer === 'RENTAL' ? 'pro Tag' : 'Kaufpreis')}
                        </span>
                        <span className="font-display text-sm sm:text-base font-bold text-forest">
                            {formatListingPrice(item)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function MarketplaceNewListings({ listings = [] }) {
    const activeListings = useMemo(() => {
        return listings
            .filter((l) => !isListingSold(l))
            .sort((a, b) => {
                const dateA = new Date(a.created_at || a.createdAt || a.publishedDate || 0).getTime();
                const dateB = new Date(b.created_at || b.createdAt || b.publishedDate || 0).getTime();
                return dateB - dateA;
            })
            .slice(0, 4);
    }, [listings]);

    if (activeListings.length === 0) return null;

    return (
        <section className="my-4 sm:my-6 md:my-8" id="neu-auf-campuna">
            <div className="flex items-center justify-between mb-3 px-0.5">
                <div>
                    <h2 className="font-display font-bold text-base sm:text-lg md:text-xl text-charcoal tracking-tight">
                        Neu auf Campuna
                    </h2>
                </div>

                <Link
                    to="/all_listings"
                    className="text-xs sm:text-sm font-semibold text-forest hover:text-gold transition-colors flex items-center gap-1 group"
                >
                    <span>Alle ansehen</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                {activeListings.map((item, idx) => (
                    <MarketplaceListingCard key={item.id} item={item} priority={idx < 2} />
                ))}
            </div>
        </section>
    );
}

