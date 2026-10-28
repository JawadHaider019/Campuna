import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FEATURED_LISTINGS } from '../data';
import { ListingCard } from './FeaturedListings';
import { isListingSold, formatCleanLocation } from '../utils/formatters';

export default function MarketplaceNewListings({
    searchQuery = '',
    selectedCategory = '',
    selectedLocation = '',
    onResetFilters
}) {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(['lst_1', 'lst_5']);

    const handleToggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleCardClick = (item) => {
        const slug = item.slug || item.id;
        navigate(`/listing_details/${slug}`);
    };

    // Filter listings based on current search & category
    const filteredListings = useMemo(() => {
        let pool = FEATURED_LISTINGS.filter(l => !isListingSold(l));

        return pool.filter(item => {
            // Category filter
            if (selectedCategory) {
                if (selectedCategory === 'Wohnwagen') {
                    // Match listings with Wohnwagen in title/category/features
                    const isWohnwagen = item.title?.toLowerCase().includes('wohnwagen') ||
                                        item.features?.some(f => f.toLowerCase().includes('wohnwagen')) ||
                                        item.category === 'Wohnmobile & Camper';
                    if (!isWohnwagen) return false;
                } else if (item.category !== selectedCategory) {
                    return false;
                }
            }

            // Search query filter
            if (searchQuery && searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const inTitle = item.title?.toLowerCase().includes(q);
                const inCat = item.category?.toLowerCase().includes(q);
                const inLoc = item.location?.toLowerCase().includes(q);
                const inFeat = item.features?.some(f => f.toLowerCase().includes(q));
                if (!inTitle && !inCat && !inLoc && !inFeat) return false;
            }

            // Location filter
            if (selectedLocation && selectedLocation.trim()) {
                const loc = selectedLocation.toLowerCase().trim();
                const itemLoc = (item.location || '').toLowerCase();
                const cleanLoc = formatCleanLocation(item.location || '').toLowerCase();
                if (!itemLoc.includes(loc) && !cleanLoc.includes(loc) && !loc.includes(itemLoc) && !loc.includes(cleanLoc)) return false;
            }

            return true;
        });
    }, [searchQuery, selectedCategory, selectedLocation]);

    // Show initial 4 listings for the top section (2 rows on mobile)
    const displayListings = filteredListings.slice(0, 4);

    return (
        <section className="my-4 sm:my-6 md:my-8" id="neu-auf-campuna">
            {/* Header: Headline matching user idea: "Neu auf Campuna" */}
            <div className="flex items-center justify-between mb-3 px-0.5">
                <div>
                    <h2 className="font-display font-bold text-base sm:text-lg md:text-xl text-charcoal tracking-tight">
                        Neu auf Campuna
                    </h2>
                    {(searchQuery || selectedCategory || selectedLocation) && (
                        <p className="text-xs text-charcoal/60 mt-0.5">
                            {filteredListings.length} {filteredListings.length === 1 ? 'Ergebnis' : 'Ergebnisse'} gefunden
                        </p>
                    )}
                </div>

                <Link
                    to="/all_listings"
                    className="text-xs sm:text-sm font-semibold text-forest hover:text-gold transition-colors flex items-center gap-1 group"
                >
                    <span>Alle ansehen</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

            {/* Empty state if filtered */}
            {displayListings.length === 0 ? (
                <div className="bg-[#F2F4F5] rounded-2xl p-8 text-center my-4">
                    <p className="text-sm font-medium text-charcoal/80 mb-2">
                        Keine passenden Inserate für deine Suchkriterien gefunden.
                    </p>
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="text-xs font-semibold text-forest hover:underline"
                    >
                        Filter zurücksetzen
                    </button>
                </div>
            ) : (
                /* 2-Column Mobile Grid using identical ListingCard from FeaturedListings */
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                    {displayListings.map((item) => (
                        <ListingCard
                            key={item.id}
                            item={item}
                            isFavorite={favorites.includes(item.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onCardClick={handleCardClick}
                            isGrid={true}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
