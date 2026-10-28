import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FEATURED_LISTINGS } from '../data';
import { ListingCard } from './FeaturedListings';
import MarketplaceAdTile from './MarketplaceAdTile';
import { isListingSold, formatCleanLocation } from '../utils/formatters';

export default function MarketplaceMoreListings({
    searchQuery = '',
    selectedCategory = '',
    selectedLocation = '',
    onResetFilters
}) {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(['lst_3', 'lst_7']);
    const [isFeedbackDismissed, setIsFeedbackDismissed] = useState(() => {
        try {
            return sessionStorage.getItem('campuna_home_feedback_dismissed') === 'true';
        } catch {
            return false;
        }
    });

    const handleDismissFeedback = () => {
        setIsFeedbackDismissed(true);
        try {
            sessionStorage.setItem('campuna_home_feedback_dismissed', 'true');
        } catch {
            // ignore
        }
    };

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

    // Exclude the first 4 listings (which are displayed in "Neu auf Campuna") to avoid repetition
    const remainingListings = useMemo(() => {
        if (filteredListings.length <= 4) {
            return [];
        }
        return filteredListings.slice(4, 14);
    }, [filteredListings]);

    // If remaining listings is empty because of a specific search query, don't show an empty duplicate section
    if (remainingListings.length === 0) return null;

    return (
        <section className="my-5 sm:my-8" id="weitere-camping-inserate">
            {/* Header: "Weitere Camping-Inserate" matching user mockup Image 3 */}
            <div className="flex items-center justify-between mb-3 px-0.5">
                <h2 className="font-display font-bold text-base sm:text-lg md:text-xl text-charcoal tracking-tight">
                    Weitere Camping-Inserate
                </h2>

                <Link
                    to="/all_listings"
                    className="text-xs sm:text-sm font-semibold text-forest hover:text-gold transition-colors flex items-center gap-1 group"
                >
                    <span>Alle ansehen</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

            {/* Standard 2-Column Mobile Grid with listings and interstitial ad / feedback tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                {/* 1st Batch of Listings */}
                {remainingListings.slice(0, 3).map((item) => (
                    <ListingCard
                        key={item.id}
                        item={item}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onCardClick={handleCardClick}
                        isGrid={true}
                    />
                ))}

                {/* Werbeblock 1: Bezahlte Werbung / Werbeplatz auf Campuna (Anzeige) */}
                <MarketplaceAdTile type="sponsored" />

                {/* 2nd Batch of Listings */}
                {remainingListings.slice(3, 6).map((item) => (
                    <ListingCard
                        key={item.id}
                        item={item}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onCardClick={handleCardClick}
                        isGrid={true}
                    />
                ))}

                {/* Werbeblock 2: Feedback-Kachel zur Startseiten-Verbesserung (Temporary during testing phase) */}
                {!isFeedbackDismissed && remainingListings.length > 5 && (
                    <MarketplaceAdTile type="feedback" onDismiss={handleDismissFeedback} />
                )}

                {/* Remaining Listings */}
                {remainingListings.slice(6).map((item) => (
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

            {/* View All Button */}
            <div className="mt-6 text-center">
                <Link
                    to="/all_listings"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-sand/60 text-forest border border-forest/25 hover:border-forest font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-xs hover:shadow-sm"
                >
                    <span>Alle Camping-Inserate auf Campuna ansehen</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
