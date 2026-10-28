import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function CompactFeaturedGallery({ listings = [] }) {
    const navigate = useNavigate();

    // If no listings available, don't render empty section
    if (!listings || listings.length === 0) return null;

    const handleCardClick = (item) => {
        const slug = item.slug || item.id;
        navigate(`/listing_details/${slug}`);
    };

    return (
        <section className="my-5 sm:my-7" id="hervorgehobene-angebote">
            {/* Header matching user mockup Image 2 */}
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

            {/* 3 smaller thumbnails visible side by side on mobile, horizontal scroll */}
            <div className="flex overflow-x-auto gap-2.5 sm:gap-3.5 pb-2 no-scrollbar snap-x scroll-smooth items-stretch">
                {listings.map((item) => {
                    const imgUrl = Array.isArray(item.images) && item.images.length > 0
                        ? item.images[0]
                        : (item['Main Image'] || '/hero-campuna.webp');

                    // Simplified short category or title for the compact thumbnail
                    const shortTitle = item.subcategory || item.category?.split('&')[0]?.trim() || item.title;

                    return (
                        <div
                            key={item.id}
                            onClick={() => handleCardClick(item)}
                            className="group flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white border border-forest/10 hover:border-gold/70 shadow-2xs hover:shadow-md transition-all duration-300 p-1.5 sm:p-2 cursor-pointer w-[108px] sm:w-[130px] md:w-[155px] shrink-0 snap-start select-none"
                        >
                            {/* Image Thumbnail */}
                            <div className="relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-sand/20 mb-1.5">
                                <img
                                    src={imgUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                    loading="lazy"
                                />

                                {/* Consistent Official Hervorgehoben Badge */}
                                <div className="absolute top-1 left-1 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-2xs flex items-center gap-0.5 border border-yellow-100/90 select-none pointer-events-none">
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
                        </div>
                    );
                })}
            </div>

            {/* Fair rotation caption */}
            <p className="text-[10px] sm:text-[11px] text-charcoal/45 mt-1 px-0.5">
                Hervorgehobene Inserate mit fairer Rotation für gleichmäßige Sichtbarkeit.
            </p>
        </section>
    );
}
