import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { isListingBoosted } from '../utils/sellerBadge';

export default function CompactFeaturedGallery({ listings = [] }) {
    // 1. Initial stable list matching SSR to prevent React 418 hydration mismatch
    const baseListings = useMemo(() => {
        return (listings || []).filter((item) => isListingBoosted(item) || item.featured);
    }, [listings]);

    const [rotatedListings, setRotatedListings] = useState(baseListings);

    // 2. Client-only rotation after hydration has cleanly completed
    useEffect(() => {
        if (baseListings.length <= 1) {
            setRotatedListings(baseListings);
            return;
        }

        const shuffled = [...baseListings];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setRotatedListings(shuffled);
    }, [baseListings]);

    if (!rotatedListings || rotatedListings.length === 0) return null;

    return (
        <section className="my-5 sm:my-7" id="hervorgehobene-angebote">
            {/* Header matching d:/projects/campuna */}
            <div className="flex items-center justify-between mb-2.5 px-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Sparkles className="w-4 h-4 text-gold shrink-0" />
                    <h2 className="font-display font-bold text-base sm:text-lg text-charcoal tracking-tight">
                        Hervorgehobene Angebote
                    </h2>
                </div>

                <Link
                    to="/all_listings"
                    aria-label="Alle Angebote ansehen"
                    className="text-charcoal/50 hover:text-forest transition-colors p-1"
                >
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Smaller thumbnails visible side by side, horizontal scroll */}
            <div className="flex overflow-x-auto gap-2.5 sm:gap-3.5 pb-2 no-scrollbar snap-x scroll-smooth items-stretch">
                {rotatedListings.map((item) => {
                    const imgUrl = Array.isArray(item.images) && item.images.length > 0
                        ? item.images[0]
                        : (item['Main Image'] || item.main_image || '/hero-campuna.webp');

                    const shortTitle = item.subcategory || item.subCategory || item.category?.split('&')[0]?.trim() || item.title;
                    const slug = item.slug || item.id;

                    return (
                        <Link
                            key={item.id}
                            to={`/listing_details/${encodeURIComponent(slug)}`}
                            className="group flex flex-col justify-between rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#fdfbf7] via-[#faf6ea] to-[#f6f0dd] border border-amber-300/60 hover:border-amber-400 shadow-[0_2px_12px_-2px_rgba(202,152,43,0.18)] hover:shadow-[0_4px_18px_-2px_rgba(202,152,43,0.28)] transition-all duration-300 p-1.5 sm:p-2 cursor-pointer w-[112px] sm:w-[135px] md:w-[160px] shrink-0 snap-start select-none no-underline text-inherit"
                        >
                            {/* Image Thumbnail */}
                            <div className="relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-sand/20 mb-1.5">
                                <img
                                    src={imgUrl}
                                    alt={item.title || 'Camping Angebot'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                    loading="lazy"
                                />

                                {/* Consistent Official Hervorgehoben Badge */}
                                <div className="absolute top-1 left-1 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-2xs flex items-center gap-0.5 border border-yellow-100/90 select-none pointer-events-none z-10">
                                    <Sparkles className="w-2 h-2 text-slate-950 shrink-0" />
                                    <span>Hervorgehoben</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-0.5">
                                <p className="font-display text-[11px] sm:text-xs font-semibold text-charcoal truncate group-hover:text-gold transition-colors">
                                    {shortTitle}
                                </p>
                                <p className="font-bold text-xs sm:text-sm text-forest mt-0.5">
                                    {formatPrice(item.price)}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Fair rotation caption */}
            <p className="text-[10px] sm:text-[11px] text-charcoal/45 mt-1 px-0.5 font-light">
                Hervorgehobene Inserate mit fairer Rotation für gleichmäßige Sichtbarkeit.
            </p>
        </section>
    );
}

