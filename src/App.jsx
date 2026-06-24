import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedListings from './components/FeaturedListings';
import SpotlightSection from './components/SpotlightSection';
import BlogSection from './components/BlogSection';
import WhyCampuna from './components/WhyCampuna';
import VideoSection from './components/VideoSection';
import CTASection from './components/CTASection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import SellModal from './components/SellModal';
import WishlistDrawer from './components/WishlistDrawer';
import AuthModal from './components/AuthModal';
import { FEATURED_LISTINGS } from './data';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [wishlistedIds, setWishlistedIds] = useState(['lst_1', 'lst_3']); // Pre-filled with 2 premium favorites
  const [listingsList, setListingsList] = useState(FEATURED_LISTINGS);

  // Modal / Sidebar Panels States
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState({ mode: 'login', type: '' });

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

  // Trigger search focus scroll
  const handleNavbarSearchClick = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = searchRef.current.querySelector('input');
      if (input) input.focus();
    }
  };

  const handleSelectCategoryFromWidget = (categoryName) => {
    setSelectedCategory(categoryName);
    const element = document.getElementById('exclusive-offers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Navbar with full reactive state */}
      <Navbar
        onSearchFocus={handleNavbarSearchClick}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenAuthModal={() => {
          setAuthModalConfig({ mode: 'login', type: '' });
          setIsAuthModalOpen(true);
        }}
        wishlistCount={wishlistedIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* 1. Hero Section */}
      <HeroSection
        onSearch={handleSearch}
        onExploreClick={() => {
          setAuthModalConfig({ mode: 'register', type: 'Camper' });
          setIsAuthModalOpen(true);
        }}
        onSellClick={() => {
          setAuthModalConfig({ mode: 'register', type: 'Anbieter' });
          setIsAuthModalOpen(true);
        }}
        searchRef={searchRef}
      />

      {/* 3. Grid Categories */}
      <CategoriesSection onSelectCategory={handleSelectCategoryFromWidget} />

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
      <SpotlightSection
        onPartnerClick={(name) => {
          const element = document.getElementById('exclusive-offers');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Camping-Ratgeber & Tipps (Blog Section) */}
      <BlogSection />

      {/* 7. Why Campuna Features Section */}
      <WhyCampuna />

      {/* 8. High-End Video Display */}
      <VideoSection />

      {/* 9. Secondary Seller CTA Section */}
      <CTASection onSellClick={() => setIsSellModalOpen(true)} />

      {/* 11. Custom FAQ Accordion */}
      <FAQSection />

      {/* 12. Complete Footer */}
      <Footer />


      {/* Sell Modal Component */}
      <SellModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onCreateListing={handleCreateListing}
      />

      {/* Wishlist Sidebar Drawer Component */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedIds={wishlistedIds}
        listingsList={listingsList}
        onToggleWishlist={handleToggleWishlist}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalConfig.mode}
        initialType={authModalConfig.type}
      />

    </div>
  );
}
