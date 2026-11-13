import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { isListingSold } from '../utils/formatters';
import { isListingBoosted } from '../utils/sellerBadge';
import { MarketplaceListingCard } from './MarketplaceNewListings';
import MarketplaceAdTile from './MarketplaceAdTile';

export default function MarketplaceMoreListings({ listings = [], excludeIds = [] }) {
    // Interweave boosted & regular listings naturally across a deeper catalog feed
    const itemsToDisplay = useMemo(() => {
        const excludeSet = new Set(excludeIds.map(String));
        const pool = listings.filter((l) => !isListingSold(l) && !excludeSet.has(String(l.id)));
        const fallbackPool = pool.length > 0 ? pool : listings.filter((l) => !isListingSold(l));
        if (fallbackPool.length === 0) return [];

        const boosted = fallbackPool.filter(isListingBoosted);
        const regular = fallbackPool.filter((item) => !isListingBoosted(item));

        const interleaved = [];
        const b = [...boosted];
        const r = [...regular];

        // Ensure natural alternating cadence: 2-3 regular, 1 boosted
        while (b.length > 0 || r.length > 0) {
            for (let i = 0; i < 2 && r.length > 0; i++) {
                interleaved.push(r.shift());
            }
            if (b.length > 0) {
                interleaved.push(b.shift());
            }
            if (b.length === 0) {
                interleaved.push(...r);
                break;
            }
        }

        // Expanded feed up to 16 items for deeper browsing
        return interleaved.slice(0, 16);
    }, [listings, excludeIds]);

    if (itemsToDisplay.length === 0) return null;

    return (
        <section className="my-5 sm:my-8" id="weitere-camping-inserate">
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

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                {/* 1st Batch of Listings (Items 0 to 3) */}
                {itemsToDisplay.slice(0, 3).map((item) => (
                    <MarketplaceListingCard key={item.id} item={item} />
                ))}

                {/* Werbeblock 1: Bezahlte Werbung / Werbeplatz auf Campuna (Anzeige) */}
                <MarketplaceAdTile type="sponsored" />

                {/* 2nd Batch of Listings (Items 3 to 6) */}
                {itemsToDisplay.slice(3, 6).map((item) => (
                    <MarketplaceListingCard key={item.id} item={item} />
                ))}

                {/* Werbeblock 2: Campuna Pioneer Promotion Card */}
                <MarketplaceAdTile type="pioneer" />

                {/* 3rd Batch of Listings (Items 6 to 9) */}
                {itemsToDisplay.slice(6, 9).map((item) => (
                    <MarketplaceListingCard key={item.id} item={item} />
                ))}

                {/* Werbeblock 3: Feedback & Community Kachel */}
                {itemsToDisplay.length > 9 && (
                    <MarketplaceAdTile type="feedback" />
                )}

                {/* Remaining items (Items 9+) */}
                {itemsToDisplay.slice(9).map((item) => (
                    <MarketplaceListingCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
