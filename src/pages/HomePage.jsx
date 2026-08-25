import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import { getHomepageProducts } from '../api/bubbleApi';
import { navigateTo } from '../utils/navigation';
import { formatLocation } from '../utils/location';
import { optimizeBubbleImageUrl } from '../utils/image';

// Lazy load below-the-fold components for code splitting & initial render performance boost
const VisionBridgeSection = lazy(() => import('../components/VisionBridgeSection'));
const CategoriesSection = lazy(() => import('../components/CategoriesSection'));
const DiscoverCampuna = lazy(() => import('../components/DiscoverCampuna'));
const PartnersSection = lazy(() => import('../components/PartnersSection'));
const BlogSection = lazy(() => import('../components/BlogSection'));
const WhyCampuna = lazy(() => import('../components/WhyCampuna'));
const VideoSection = lazy(() => import('../components/VideoSection'));
const CTASection = lazy(() => import('../components/CTASection'));
const FAQSection = lazy(() => import('../components/FAQSection'));
const WelcomeBanner = lazy(() => import('../components/WelcomeBanner'));

// Light fallback placeholder to prevent layout shifts during section loading
const SectionFallback = () => <div className="py-12 bg-gray-50/50 min-h-[120px] animate-pulse rounded-lg my-4" />;

export default function HomePage({ isLoggedIn: propIsLoggedIn }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [wishlistedIds, setWishlistedIds] = useState([]);
    const [listingsList, setListingsList] = useState([]);
    const [isLoadingListings, setIsLoadingListings] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (propIsLoggedIn !== undefined) {
            setIsLoggedIn(propIsLoggedIn);
        }
    }, [propIsLoggedIn]);

    useEffect(() => {
        let active = true;
        const fetchListings = async () => {
            try {
                const data = await getHomepageProducts();
                if (data && data.status === "success" && data.response && Array.isArray(data.response.listing)) {
                    const mapped = data.response.listing.map((item) => {
                        // Prioritize Main Image, fallback to images array
                        let rawImages = [];
                        const mainImg = item["Main Image"] || item.MainImage;
                        if (mainImg) {
                            rawImages.push(mainImg);
                        }
                        if (item.images && Array.isArray(item.images)) {
                            item.images.forEach(img => {
                                if (img && img !== mainImg && !rawImages.includes(img)) {
                                    rawImages.push(img);
                                }
                            });
                        } else if (item.images && typeof item.images === 'string') {
                            if (item.images !== mainImg) {
                                rawImages.push(item.images);
                            }
                        }

                        let images = rawImages
                            .filter(Boolean)
                            .map(url => optimizeBubbleImageUrl(url, 600, 80));

                        if (images.length === 0) {
                            images.push('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80');
                        }

                        // Categories mapping
                        let category = item.Category || 'Camping Zubehör';
                        if (category === 'Ausrüstung und Zubehör') {
                            category = 'Camping Zubehör';
                        }

                        // Stable rating/reviews based on _id
                        let id = item._id || String(Math.random());
                        let sum = 0;
                        for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
                        const rating = parseFloat((4.5 + (sum % 6) * 0.1).toFixed(1));

                        // Location
                        const location = item["location geo"]?.address || "Deutschland";
                        const displayLocation = formatLocation(location);

                        // Price & Price Period
                        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
                        let pricePeriod = 'Preis';
                        if (category === 'Mieten & Vermieten' || (item["Sub - Category"] && item["Sub - Category"].toLowerCase().includes('mieten'))) {
                            pricePeriod = 'pro Tag';
                        } else if (category === 'Wohnmobile & Camper' || category === 'Tiny Houses') {
                            pricePeriod = 'Kaufpreis';
                        }

                        // Features description
                        const features = [];
                        if (item["Condition item"]) {
                            const condMapping = { "New": "Neu", "Used": "Gebraucht", "Good": "Sehr gut" };
                            features.push(condMapping[item["Condition item"]] || item["Condition item"]);
                        }
                        if (item["Sub - Category"]) {
                            features.push(item["Sub - Category"]);
                        }
                        if (item["Type of offer"]) {
                            features.push(item["Type of offer"]);
                        }
                        if (features.length === 0) {
                            features.push("Camping");
                        }

                        // Seller info
                        const resolvedSellerType = item["listing user type"] || (category === 'Mieten & Vermieten' || (item["Sub - Category"] && item["Sub - Category"].toLowerCase().includes('mieten')) ? 'Gewerblich' : 'Privat');
                        const sellerName = resolvedSellerType === 'Gewerblich' ? 'Gewerblicher Anbieter' : 'Privatverkäufer';

                        return {
                            id,
                            title: item.title || item.description || "Camping Angebot",
                            category,
                            price,
                            pricePeriod,
                            location,
                            displayLocation,
                            rating,
                            reviewsCount: (sum % 15) + 3,
                            images,
                            seller: {
                                name: sellerName,
                                verified: true,
                                type: resolvedSellerType
                            },
                            listing_user_type: resolvedSellerType,
                            features,
                            isExclusive: sum % 3 === 0
                        };
                    });

                    if (active) {
                        setListingsList(mapped);
                        if (mapped.length >= 2) {
                            setWishlistedIds([mapped[0].id, mapped[1].id]);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load listings from Bubble API:", error);
            } finally {
                if (active) {
                    setIsLoadingListings(false);
                }
            }
        };

        fetchListings();
        return () => {
            active = false;
        };
    }, []);

    // Ref for scrolling to listings or search
    const searchRef = useRef(null);

    // Memoized navigation handlers
    const handleExploreClick = useCallback(() => navigateTo('/signup_login'), []);
    const handleSellClick = useCallback(() => navigateTo('/signup_login'), []);
    const handleCTASellClick = useCallback(() => navigateTo('/my_account?n=yes'), []);

    // Memoized Search Submission
    const handleSearch = useCallback((filters) => {
        setSelectedCategory(filters.category);
        setSearchLocation(filters.location);
        setSearchQuery(filters.query);

        // Smooth scroll down to the Offers section
        const element = document.getElementById('exclusive-offers');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Memoized Toggle Wishlist
    const handleToggleWishlist = useCallback((id) => {
        setWishlistedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }, []);

    const handleClearFilters = useCallback(() => {
        setSelectedCategory('');
        setSearchQuery('');
        setSearchLocation('');
    }, []);

    return (
        <div className="bg-white min-h-screen relative font-sans text-charcoal">

            {/* 1. Hero Section (Eager load critical initial render) */}
            <HeroSection
                onSearch={handleSearch}
                onExploreClick={handleExploreClick}
                onSellClick={handleSellClick}
                searchRef={searchRef}
                isLoggedIn={isLoggedIn}
            />

            <Suspense fallback={<SectionFallback />}>
                {/* 2. Vision Bridge Section */}
                <VisionBridgeSection />

                {/* 3. Grid Categories */}
                <div>
                    <CategoriesSection />
                </div>
                {/* 4. Exclusive Offers with filters & interactive search */}
                <FeaturedListings
                    listings={listingsList}
                    isLoading={isLoadingListings}
                    wishlistedIds={wishlistedIds}
                    onToggleWishlist={handleToggleWishlist}
                    selectedCategoryFilter={selectedCategory}
                    onClearCategoryFilter={handleClearFilters}
                    searchQuery={searchQuery}
                    searchLocation={searchLocation}
                />
                {/* 5. Campuna Spotlight - Recommended Providers Marquee */}
                <PartnersSection isLoggedIn={isLoggedIn} />
                {/* Discover Campuna - Dynamic Knowledge, Inspiration, and Tools */}
                <DiscoverCampuna />


            </Suspense>



            <Suspense fallback={<SectionFallback />}>

                {/* 7. Why Campuna Features Section */}
                <WhyCampuna />
                {/* 6. Camping-Ratgeber & Tipps (Blog Section) */}
                <BlogSection />

                {/* 8. High-End Video Display */}
                <VideoSection />

                {/* 9. Secondary Seller CTA Section */}
                <CTASection onSellClick={handleCTASellClick} />

                {/* 11. Custom FAQ Accordion */}
                <FAQSection />

                <WelcomeBanner isLoggedIn={isLoggedIn} />
            </Suspense>
        </div>
    );
}
