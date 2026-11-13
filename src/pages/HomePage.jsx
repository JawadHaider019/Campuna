import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';
import CompactMarketplaceSearch from '../components/CompactMarketplaceSearch';
import MarketplaceCategoriesSection from '../components/MarketplaceCategoriesSection';
import CampingAccessoriesCtaCard from '../components/CampingAccessoriesCtaCard';
import MarketplaceNewListings from '../components/MarketplaceNewListings';
import CompactFeaturedGallery from '../components/CompactFeaturedGallery';
import MarketplaceMoreListings from '../components/MarketplaceMoreListings';
import RecentlyViewedSection from '../components/RecentlyViewedSection';
import Providers from '../components/Providers';
import WhyCampuna from '../components/WhyCampuna';
import BlogSection from '../components/BlogSection';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ScrollSectionWrapper from '../components/ScrollSectionWrapper';
import HomePageOriginal from './HomePageOriginal';
import { FEATURED_LISTINGS } from '../data';
import { isListingSold } from '../utils/formatters';
import { isListingBoosted } from '../utils/sellerBadge';

export default function HomePage({ isLoggedIn = false }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlLayout = searchParams.get('layout');

    // Layout toggle state: 'marketplace' (default test) or 'original'
    const [layoutMode, setLayoutMode] = useState(urlLayout === 'original' ? 'original' : 'marketplace');

    // All active listings pool
    const activeListings = useMemo(() => {
        return FEATURED_LISTINGS.filter((l) => !isListingSold(l));
    }, []);

    // Newest listings sorted by date DESC for "Neu auf Campuna"
    const newestListings = useMemo(() => {
        return [...activeListings].sort((a, b) => {
            const timeA = new Date(a.created_at || a.createdAt || a.publishedDate || 0).getTime();
            const timeB = new Date(b.created_at || b.createdAt || b.publishedDate || 0).getTime();
            return timeB - timeA;
        });
    }, [activeListings]);

    // Boosted / featured listings pool for the compact gallery
    const galleryListings = useMemo(() => {
        const boosted = activeListings.filter(isListingBoosted);
        const candidates = boosted.length > 0 ? boosted : activeListings.filter(item => item.featured || item.Featured || item.isExclusive);
        const pool = candidates.length > 0 ? candidates : activeListings;
        return pool.slice(0, 10);
    }, [activeListings]);

    // If user switched to original layout
    if (layoutMode === 'original') {
        return (
            <div className="relative">
                {/* Switcher Banner to return to marketplace layout */}
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                    <div className="bg-charcoal/95 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/20">
                        <span className="font-semibold text-amber-300">Original-Startseite aktiv</span>
                        <button
                            type="button"
                            onClick={() => {
                                setLayoutMode('marketplace');
                                setSearchParams({});
                            }}
                            className="bg-forest hover:bg-forest/90 text-white font-semibold px-3 py-1 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                            <span>Zum Marktplatz-Layout wechseln</span>
                        </button>
                    </div>
                </div>

                <HomePageOriginal isLoggedIn={isLoggedIn} />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen relative font-sans text-charcoal overflow-x-clip pt-20 sm:pt-22 md:pt-24">
            {/* Direct Marketplace Section Container */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 mb-4">
                {/* 1. Clean Search Area without Large Hero Background Image */}
                <CompactMarketplaceSearch />

                {/* 2. Visual Categories Bar */}
                <MarketplaceCategoriesSection />

                {/* 3. Compact Low-Barrier Seller Trigger ("Campingzubehör übrig?") */}
                <CampingAccessoriesCtaCard />

                {/* 4. Listings Grid: "Neu auf Campuna" */}
                <MarketplaceNewListings listings={newestListings && newestListings.length > 0 ? newestListings : activeListings} />

                {/* 5. Horizontal Gallery: "Hervorgehobene Angebote" */}
                {galleryListings.length > 0 && (
                    <CompactFeaturedGallery listings={galleryListings} />
                )}

                {/* 6. On Mobile: Compact Provider & Commercial Directory */}
                <div className="md:hidden my-5">
                    <Providers showMobileOnly={true} />
                </div>

                {/* 7. Extended Two-Column Catalog: "Weitere Camping-Inserate" with In-Feed Pioneer & Ad Tiles */}
                <MarketplaceMoreListings
                    listings={activeListings}
                    excludeIds={(newestListings && newestListings.length > 0 ? newestListings.slice(0, 8) : activeListings.slice(0, 8)).map(l => l.id)}
                />
            </div>

            {/* Desktop Commercial RV Dealers & Verified Campsites */}
            <div className="hidden md:block">
                <ScrollSectionWrapper delay={0.05}>
                    <Providers showDesktopOnly={true} />
                </ScrollSectionWrapper>
            </div>

            {/* Universal Recently Viewed History Slider (Renders ONLY when viewing history exists) */}
            <RecentlyViewedSection />

            {/* Why Campuna (Trust Pillars) */}
            <ScrollSectionWrapper delay={0.05}>
                <WhyCampuna />
            </ScrollSectionWrapper>

            {/* Editorial Advice & Camping Guides (Ratgeber & Tipps) */}
            <ScrollSectionWrapper delay={0.05}>
                <BlogSection />
            </ScrollSectionWrapper>

            {/* Community & Sell Registration CTA */}
            <ScrollSectionWrapper delay={0.05}>
                <CTASection />
            </ScrollSectionWrapper>

            {/* FAQ Section */}
            <ScrollSectionWrapper delay={0.05}>
                <FAQSection />
            </ScrollSectionWrapper>
        </div>
    );
}
