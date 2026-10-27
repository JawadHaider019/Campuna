import React, { useState, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, ArrowLeftRight, CheckCircle2, RotateCcw } from 'lucide-react';
import CompactMarketplaceSearch from '../components/CompactMarketplaceSearch';
import MarketplaceCategoriesSection from '../components/MarketplaceCategoriesSection';
import MarketplaceNewListings from '../components/MarketplaceNewListings';
import FeaturedShowcaseSection from '../components/FeaturedShowcaseSection';
import Providers from '../components/Providers';
import FeaturedListings from '../components/FeaturedListings';
import WhyCampuna from '../components/WhyCampuna';
import BlogSection from '../components/BlogSection';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ScrollSectionWrapper from '../components/ScrollSectionWrapper';
import HomePageOriginal from './HomePageOriginal';
import { FEATURED_LISTINGS } from '../data';

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
        <div className="bg-white min-h-screen relative font-sans text-charcoal overflow-x-clip pt-24 sm:pt-28 md:pt-32">
            {/* Design Test Preview Switcher Pill */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 mb-3">
                <div className="flex items-center justify-between bg-sand/60 border border-gold/30 rounded-xl px-3 sm:px-4 py-2 text-xs text-charcoal/80">
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
            </div>

            {/* Direct Marketplace Section Container */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
                {/* 1. Compact Search Area */}
                <CompactMarketplaceSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    onSearchSubmit={handleSearchSubmit}
                />

                {/* 2. Categories directly below search */}
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
            </div>

            {/* 4. Additional Sections further down the page */}
            <div className="mt-12 sm:mt-16 space-y-12 sm:space-y-16">
                {/* Featured Weekly Showcase (Highlights & Entdeckungen) */}
                <ScrollSectionWrapper delay={0.05}>
                    {/* <FeaturedShowcaseSection /> */}
                </ScrollSectionWrapper>

                {/* Provider / Commercial Spotlight */}
                <ScrollSectionWrapper delay={0.05}>
                    <Providers />
                </ScrollSectionWrapper>

                {/* Draggable Live Offers Marquee */}
                <ScrollSectionWrapper delay={0.05}>
                    <FeaturedListings
                        listings={FEATURED_LISTINGS}
                        selectedCategoryFilter={selectedCategory}
                        searchQuery={searchQuery}
                        badge="WEITERE ANGEBOTE"
                        title="Camping-Inserate entdecken"
                        subtitle="Stöbere durch hunderte weitere Angebote aus ganz Deutschland."
                    />
                </ScrollSectionWrapper>

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
