import React, { useState } from 'react';
import { Search, MapPin, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data';
import { navigateTo } from '../utils/navigation';

export default function HeroSection({ onSearch, onExploreClick, onSellClick, searchRef }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo(`/all_listings?kw=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[48px] mt-30 sm:mt-30 md:mt-30 mb-12 mx-4 md:mx-8 lg:mx-12 shadow-2xl border border-forest/10"
    >
      {/* CSS inject tag for stutter-free native GPU animation */}
      <style>{`
        @keyframes hero-zoom-in {
          0% { transform: scale(1.1); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translate3d(0, 20px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-hero-zoom {
          animation: hero-zoom-in 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>

      {/* Background Cinematic Image with Zoom Animation */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full animate-hero-zoom opacity-0">
          <img
            src="/hero-campuna.png"
            alt="Cinematic luxury camping under starry night"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Deep luxurious multi-layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60  to-black/40" />
      </div>

      {/* Floating Sparkles Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,169,107,0.08),transparent_50%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col justify-between w-full h-full min-h-[70vh] md:min-h-[75vh]">

        {/* Top spacing helper */}
        <div className="hidden lg:block h-6" />

        {/* Central Content Column */}
        <div className="text-center max-w-4xl mx-auto my-auto pt-8">
          {/* Luxury Large Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] animate-fade-in-up opacity-0 animation-delay-200">
            Alles rund ums Camping.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-beige to-white">
              An einem Ort.
            </span>
          </h1>

          {/* Editorial Subheadline */}
          <p className="font-sans text-sm sm:text-md md:text-lg text-sand/85 leading-relaxed max-w-2xl mx-auto mb-10 font-light animate-fade-in-up opacity-0 animation-delay-400">
            Campuna ist deine Camping-Plattform für Deutschland. Entdecke Angebote, Anbieter, Stellplätze, Ratgeber und Services rund ums Camping.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8 animate-fade-in-up opacity-0 animation-delay-400">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto bg-gradient-to-r from-gold to-beige text-forest hover:brightness-110 font-sans font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-[12px]  tracking-wider"
            >
              Ich bin Camper
            </button>
            <button
              onClick={onSellClick}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-sans font-semibold py-3 px-6 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 text-[12px]  tracking-wider"
            >
              Ich bin Anbieter
            </button>
          </div>

          {/* Advanced Search Bar Component */}
          <div
            ref={searchRef}
            className="bg-white/20 backdrop-blur-xl border border-white/15 px-3 py-1 rounded-full shadow-2xl max-w-3xl mx-auto mb-16 relative group animate-fade-in-up opacity-0 animation-delay-600"
          >
            <form onSubmit={handleSubmit} className="flex flex-row items-center gap-1">
              {/* Keyword Search Input */}
              <div className="flex items-center space-x-3 px-4 py-2 flex-1 md:border-r border-white/10">
                <input
                  type="text"
                  placeholder="Z.B. Morelo, Dachzelt, Kabe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-sand/65 focus:outline-none w-full font-sans text-sm"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="text-gold font-sans font-semibold p-2 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 shrink-0"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
