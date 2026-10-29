import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, ArrowLeftRight, CheckCircle2, RotateCcw } from 'lucide-react';
import CompactMarketplaceSearch from '../components/CompactMarketplaceSearch';
import MarketplaceCategoriesSection from '../components/MarketplaceCategoriesSection';
import MarketplaceNewListings from '../components/MarketplaceNewListings';
import CompactFeaturedGallery from '../components/CompactFeaturedGallery';
import MarketplaceMoreListings from '../components/MarketplaceMoreListings';
import FeaturedShowcaseSection from '../components/FeaturedShowcaseSection';
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
import { rotateListingsFairly } from '../utils/highlighting';

export default function HomePage({ isLoggedIn = false }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlLayout = searchParams.get('layout');

    // Layout toggle state: 'marketplace' (default test) or 'original'
    const [layoutMode, setLayoutMode] = useState(urlLayout === 'original' ? 'original' : 'marketplace');

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleSearchSubmit = useCallback((filters) => {
        setSearchQuery(filters.query || '');
        setSelectedCategory(filters.category || '');
        setSelectedLocation(filters.location || '');

        // Smooth scroll down to listings
        const element = document.getElementById('neu-auf-campuna');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleResetFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedLocation('');
    }, []);

    // Featured listings for the small horizontal gallery (Hervorgehobene Angebote) with fair rotation
    const featuredGalleryListings = useMemo(() => {
        const featuredPool = FEATURED_LISTINGS.filter(
            l => !isListingSold(l) && (isListingBoosted(l) || l.isFeatured || l.Featured || l.isExclusive)
        );
        const activePool = featuredPool.length >= 3 ? featuredPool : FEATURED_LISTINGS.slice(4, 12);
        // Fair rotation engine: rotates offset so all featured sellers receive equal visibility
        const rotated = rotateListingsFairly(activePool, 'campuna_home_featured_gallery');
        return rotated.slice(0, 6);
    }, []);

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
                            className="bg-forest hover:bg-forest/90 text-white font-semibold px-3 py-1 rounded-full transition-colors flex items-center gap-1.5"
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
        <div className="bg-white min-h-screen relative font-sans text-charcoal overflow-x-clip pt-20 sm:pt-24 md:pt-28">
            {/* Design Test Preview Switcher Pill */}
            {/* <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 mb-2.5">
                <div className="flex items-center justify-between bg-sand/60 border border-gold/30 rounded-xl px-3 sm:px-4 py-1.5 text-xs text-charcoal/80">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="font-medium text-forest">
                            Design-Test: <strong>Direktes Marktplatz-Layout</strong>
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setLayoutMode('original');
                            setSearchParams({ layout: 'original' });
                        }}
                        className="text-xs font-semibold text-charcoal hover:text-forest underline transition-colors flex items-center gap-1"
                    >
                        <RotateCcw className="w-3 h-3" />
                        <span>Original anzeigen</span>
                    </button>
                </div>
            </div> */}

            {/* Direct Marketplace Section Container */}
            <div className="max-w-7xl mx-auto pt-6  px-3 sm:px-6 md:px-8">


                {/* 2. Compact Search Area */}
                <CompactMarketplaceSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    onSearchSubmit={handleSearchSubmit}
                />
                {/* 1. Categories at the very top (Compact Mini-Icon Bar) */}
                <MarketplaceCategoriesSection
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat) => setSelectedCategory(cat)}
                />

                {/* 3. Listings Grid: "Neu auf Campuna" (2-Columns on Mobile) */}
                <MarketplaceNewListings
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    selectedLocation={selectedLocation}
                    onResetFilters={handleResetFilters}
                />

                {/* 4. Optional: Small Featured Listing Gallery ("Hervorgehobene Angebote") */}
                <CompactFeaturedGallery
                    listings={featuredGalleryListings}
                />

                {/* 4.5. On Mobile: Compact Provider & Spotlight Block directly visible earlier */}
                <div className="md:hidden my-5">
                    <Providers showMobileOnly={true} />
                </div>

                {/* 5. Second Two-Column Grid: "Weitere Camping-Inserate" with in-feed Werbeblock */}
                <MarketplaceMoreListings
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    selectedLocation={selectedLocation}
                    onResetFilters={handleResetFilters}
                />
            </div>

            {/* Additional Sections further down the page */}
            <div className="mt-8 sm:mt-12">
                {/* Provider / Commercial Spotlight (Desktop/iPad generous layout preserved) */}
                <div className="hidden md:block">
                    <ScrollSectionWrapper delay={0.05}>
                        <Providers showDesktopOnly={true} />
                    </ScrollSectionWrapper>
                </div>

                {/* Why Campuna (Trust Pillars) */}
                <ScrollSectionWrapper delay={0.05}>
                    <WhyCampuna />
                </ScrollSectionWrapper>

                {/* Blog & Camping Guides (Ratgeber & Tipps) */}
                <ScrollSectionWrapper delay={0.05}>
                    <BlogSection />
                </ScrollSectionWrapper>

                {/* Community & Sell CTA */}
                <ScrollSectionWrapper delay={0.05}>
                    <CTASection />
                </ScrollSectionWrapper>

                {/* FAQ Section */}
                <ScrollSectionWrapper delay={0.05}>
                    <FAQSection />
                </ScrollSectionWrapper>
            </div>
        </div>
    );
}
