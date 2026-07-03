import React, { useState, useRef, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedListings from '../components/FeaturedListings';
import PartnersSection from '../components/PartnersSection';
import BlogSection from '../components/BlogSection';
import WhyCampuna from '../components/WhyCampuna';
import VideoSection from '../components/VideoSection';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import { FEATURED_LISTINGS } from '../data';
import { getHomepageProducts } from '../api/bubbleApi';
import { navigateTo } from '../utils/navigation';

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [wishlistedIds, setWishlistedIds] = useState([]); // Empty wishlist initially, responsive to fetched IDs
    const [listingsList, setListingsList] = useState(FEATURED_LISTINGS);


    useEffect(() => {
        let active = true;
        const fetchListings = async () => {
            try {
                const data = await getHomepageProducts();
                if (data && data.status === "success" && data.response && Array.isArray(data.response.listing)) {
                    const mapped = data.response.listing.map((item) => {
                        // Format images (adding https:) and convert HEIC via Bubble CDN transform
                        let images = (item.images && item.images.length > 0 ? item.images : [item["Main Image"]])
                            .filter(Boolean)
                            .map(url => {
                                url = url.startsWith('//') ? `https:${url}` : url;
                                // Convert HEIC to web-compatible format via Bubble CDN image transformation
                                if (/\.heic$/i.test(url.split('?')[0]) && url.includes('cdn.bubble.io')) {
                                    url = url.replace(
                                        /(https:\/\/[^/]+\.cdn\.bubble\.io\/)(f[0-9x]+\/)/,
                                        '$1cdn-cgi/image/f=auto,fit=cover/$2'
                                    );
                                }
                                return url;
                            });

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
                        const isMietenOrGewerblich = category === 'Mieten & Vermieten' || (item["Sub - Category"] && item["Sub - Category"].toLowerCase().includes('mieten'));
                        const sellerType = isMietenOrGewerblich ? 'Gewerblich' : 'Privat';
                        const sellerName = isMietenOrGewerblich ? 'Gewerblicher Anbieter' : 'Privatverkäufer';

                        return {
                            id,
                            title: item.title || item.description || "Camping Angebot",
                            category,
                            price,
                            pricePeriod,
                            location,
                            rating,
                            reviewsCount: (sum % 15) + 3,
                            images,
                            seller: {
                                name: sellerName,
                                verified: true,
                                type: sellerType
                            },
                            features,
                            isExclusive: sum % 3 === 0
                        };
                    });

                    if (active) {
                        setListingsList(mapped);
                        // Optionally auto-wishlist the first two items for beautiful visual design representation
                        if (mapped.length >= 2) {
                            setWishlistedIds([mapped[0].id, mapped[1].id]);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load listings from Bubble API, keeping local design mock data:", error);
            }
        };

        fetchListings();
        return () => {
            active = false;
        };
    }, []);

    // Ref for scrolling to listings or search
    const searchRef = useRef(null);

    // Handle Search Submission
    const handleSearch = (filters) => {
        setSelectedCategory(filters.category);
        setSearchLocation(filters.location);
        setSearchQuery(filters.query);

        // Smooth scroll down to the Offers section
        const element = document.getElementById('exclusive-offers');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Toggle Wishlist
    const handleToggleWishlist = (id) => {
        setWishlistedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleClearFilters = () => {
        setSelectedCategory('');
        setSearchQuery('');
        setSearchLocation('');
    };

    // Submit new listing
    const handleCreateListing = (newListing) => {
        setListingsList((prev) => [newListing, ...prev]);
        setTimeout(() => {
            const element = document.getElementById('exclusive-offers');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div className="bg-white min-h-screen relative font-sans text-charcoal">


            {/* 1. Hero Section */}
            <HeroSection
                onSearch={handleSearch}
                onExploreClick={() => navigateTo('/signup_login')}
                onSellClick={() => navigateTo('/signup_login')}
                searchRef={searchRef}
            />

            {/* 3. Grid Categories */}
            <CategoriesSection className="-mt-20 md:-mt-24" />

            {/* 4. Exclusive Offers with filters & interactive search */}
            <FeaturedListings
                listings={listingsList}
                wishlistedIds={wishlistedIds}
                onToggleWishlist={handleToggleWishlist}
                selectedCategoryFilter={selectedCategory}
                onClearCategoryFilter={handleClearFilters}
                searchQuery={searchQuery}
                searchLocation={searchLocation}
            />

            {/* 5. Campuna Spotlight - Recommended Providers Marquee */}
            <PartnersSection />

            {/* 6. Camping-Ratgeber & Tipps (Blog Section) */}
            <BlogSection />

            {/* 7. Why Campuna Features Section */}
            <WhyCampuna />

            {/* 8. High-End Video Display */}
            <VideoSection />

            {/* 9. Secondary Seller CTA Section */}
            <CTASection onSellClick={() => navigateTo('/my_account?n=yes')} />

            {/* 11. Custom FAQ Accordion */}
            <FAQSection />
        </div>
    );
}
