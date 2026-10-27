import React, { useState, useRef, useCallback } from 'react';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedListings from '../components/FeaturedListings';
import Providers from '../components/Providers';
import FeaturedShowcaseSection from '../components/FeaturedShowcaseSection';
import WhyCampuna from '../components/WhyCampuna';
import BlogSection from '../components/BlogSection';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ScrollSectionWrapper from '../components/ScrollSectionWrapper';
import { FEATURED_LISTINGS } from '../data';

export default function HomePage({ isLoggedIn = false }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef(null);

    // Search submission scrolls to live listings
    const handleSearch = useCallback((filters) => {
        setSelectedCategory(filters.category || '');
        setSearchQuery(filters.query || '');

        const element = document.getElementById('exclusive-offers');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="bg-white min-h-screen relative font-sans text-charcoal overflow-x-clip">
            {/* 1. Luxury Cinematic Hero Section */}
            <HeroSection
                onSearch={handleSearch}
                searchRef={searchRef}
                isLoggedIn={isLoggedIn}
            />

            {/* 2. Docked Categories Carousel & Grid */}
            <ScrollSectionWrapper delay={0.1}>
                <CategoriesSection isDocked={true} showHeader={false} />
            </ScrollSectionWrapper>

            {/* 3. Marketplace Live Listings (2-Row Draggable Marquee) */}
            <ScrollSectionWrapper delay={0.05}>
                <FeaturedListings
                    listings={FEATURED_LISTINGS}
                    selectedCategoryFilter={selectedCategory}
                    searchQuery={searchQuery}
                />
            </ScrollSectionWrapper>

            {/* 4. Provider / Partner Spotlight (Verified Marquee & Category Directory) */}
            <ScrollSectionWrapper delay={0.05}>
                <Providers />
            </ScrollSectionWrapper>

            {/* 5. Featured Weekly Showcase (Highlights & Entdeckungen) */}
            <ScrollSectionWrapper delay={0.05}>
                <FeaturedShowcaseSection />
            </ScrollSectionWrapper>



            {/* 6. Why Campuna (USP & Trust Pillars with Video Modal) */}
            <ScrollSectionWrapper delay={0.05}>
                <WhyCampuna />
            </ScrollSectionWrapper>

            {/* 7. Blog & Camping Guides (Ratgeber & Tipps) */}
            <ScrollSectionWrapper delay={0.05}>
                <BlogSection />
            </ScrollSectionWrapper>

            {/* 8. Registration / Community CTA */}
            <ScrollSectionWrapper delay={0.05}>
                <CTASection />
            </ScrollSectionWrapper>

            {/* 9. FAQ Section (Expandable Accordion) */}
            <ScrollSectionWrapper delay={0.05}>
                <FAQSection />
            </ScrollSectionWrapper>
        </div>
    );
}
