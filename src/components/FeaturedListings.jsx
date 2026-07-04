import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { Heart, MapPin, ShieldCheck, Eye, ArrowRight } from 'lucide-react';
import { buildListingSlug } from '../utils/slugify';
import { navigateTo } from '../utils/navigation';

export default function FeaturedListings({
  listings,
  wishlistedIds,
  onToggleWishlist,
  selectedCategoryFilter,
  onClearCategoryFilter,
  searchQuery,
  searchLocation
}) {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [row1Constraints, setRow1Constraints] = useState(0);
  const [row2Constraints, setRow2Constraints] = useState(0);

  // Shuffle the input listings whenever they change (e.g. from an API call)
  const shuffledListings = useMemo(() => {
    const arr = [...listings];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [listings]);

  // Filter listings based on category, search queries
  const filteredListings = useMemo(() => {
    return shuffledListings.filter((item) => {
      if (selectedCategoryFilter && item.category !== selectedCategoryFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(query);
        const inFeatures = item.features.some(f => f.toLowerCase().includes(query));
        if (!inTitle && !inFeatures) return false;
      }
      if (searchLocation) {
        const loc = searchLocation.toLowerCase();
        if (!item.location.toLowerCase().includes(loc)) return false;
      }
      return true;
    });
  }, [shuffledListings, selectedCategoryFilter, searchQuery, searchLocation]);

  // Limit display to maximum 10 listings (5 in first row, 5 in second row)
  const displayListings = useMemo(() => {
    return filteredListings.slice(0, Math.min(filteredListings.length, 10));
  }, [filteredListings]);

  // Split into firstRow (up to 5 items) and secondRow (up to 5 items) without any overlaps
  const firstRow = useMemo(() => {
    const midPoint = Math.ceil(displayListings.length / 2);
    return displayListings.slice(0, midPoint);
  }, [displayListings]);

  const secondRow = useMemo(() => {
    const midPoint = Math.ceil(displayListings.length / 2);
    return displayListings.slice(midPoint);
  }, [displayListings]);

  useEffect(() => {
    if (row1Ref.current) {
      setRow1Constraints(row1Ref.current.scrollWidth - row1Ref.current.offsetWidth);
    }
    if (row2Ref.current) {
      setRow2Constraints(row2Ref.current.scrollWidth - row2Ref.current.offsetWidth);
    }
  }, [firstRow, secondRow]);

  const handleCardClick = (item) => {
    const slug = buildListingSlug(item.title, item.id);
    navigateTo(`/listing_details/${slug}`);
  };

  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const [loopTrigger1, setLoopTrigger1] = useState(0);
  const [loopTrigger2, setLoopTrigger2] = useState(0);

  useEffect(() => {
    x1.set(0);
    x2.set(-420 * secondRow.length);
  }, [firstRow.length, secondRow.length]);

  useEffect(() => {
    if (isHovered1 || firstRow.length === 0) return;

    const target = -420 * firstRow.length;
    const currentVal = x1.get();

    const remainingDistance = Math.abs(target - currentVal);
    const totalDistance = Math.abs(target);
    const fraction = totalDistance > 0 ? remainingDistance / totalDistance : 1;
    const duration = 60 * fraction;

    const controls = animate(x1, target, {
      type: "tween",
      ease: "linear",
      duration: duration,
      onComplete: () => {
        x1.set(0);
        setLoopTrigger1(prev => prev + 1);
      }
    });

    return () => controls.stop();
  }, [isHovered1, loopTrigger1, firstRow.length]);

  useEffect(() => {
    if (isHovered2 || secondRow.length === 0) return;

    const target = 0;
    const startVal = -420 * secondRow.length;
    const currentVal = x2.get();

    const remainingDistance = Math.abs(target - currentVal);
    const totalDistance = Math.abs(startVal);
    const fraction = totalDistance > 0 ? remainingDistance / totalDistance : 1;
    const duration = 65 * fraction;

    const controls = animate(x2, target, {
      type: "tween",
      ease: "linear",
      duration: duration,
      onComplete: () => {
        x2.set(startVal);
        setLoopTrigger2(prev => prev + 1);
      }
    });

    return () => controls.stop();
  }, [isHovered2, loopTrigger2, secondRow.length]);

  function ListingCard({ item, isWishlisted }) {
    const [imgIdx, setImgIdx] = useState(0);
    const handleImgError = () => {
      if (imgIdx < item.images.length - 1) {
        setImgIdx(i => i + 1);
      }
    };

    return (
      <div
        onClick={() => handleCardClick(item)}
        className="group relative flex-shrink-0 w-[320px] md:w-[350px] flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-forest/5 hover:border-forest/10 hover:shadow-xl transition-all duration-300 select-none cursor-pointer"
      >
        {/* Image Area */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/20">
          <img
            src={item.images[imgIdx]}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105 pointer-events-none"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={handleImgError}
          />

          {/* Top Bar inside image card */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between">
            <span className="bg-forest flex items-center gap-1 justify-center text-gold text-[8px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 text-gold" />
              {item.listing_user_type}
            </span>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(item.id);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${isWishlisted
                ? 'bg-rose-500 text-white hover:bg-rose-600 scale-110'
                : 'bg-white/70 hover:bg-white text-forest hover:scale-110'
                }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Location overlay */}
          <div className="absolute bottom-4 right-0 inset-x-4 flex items-center justify-end pointer-events-none text-white/90">
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold shrink-0" />
              <span>{item.location}</span>
            </div>
          </div>

          {/* Hover CTA */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white text-forest px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
              <Eye className="w-4 h-4" />
              <span>Inserat ansehen</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            {/* Title */}
            <h3 className="font-display text-lg font-bold text-black group-hover:text-gold transition-colors duration-200 mb-2 line-clamp-2">
              {item.title}
            </h3>

            {/* Features chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {item.features.slice(0, 3).map((feat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-charcoal/60 bg-sand px-2 py-1 rounded-md border border-forest/5"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & CTA Line */}
          <div className="pt-2 border-t border-forest/5 flex items-end justify-between">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-charcoal/40 font-mono">
                {item.pricePeriod}
              </span>
              <span className="font-display text-xl font-extrabold text-forest">
                {item.price.toLocaleString('de-DE')} €
              </span>
            </div>

            <span className="font-sans text-xs font-bold text-forest group-hover:text-gold flex items-center space-x-1 transition-colors">
              <span>Details</span>
              <span className="transform group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="exclusive-offers" className="py-10 sm:py-16 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="space-y-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
              ZUM STÖBERN
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
              Camping-Angebote auf Campuna
            </h2>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
              Entdecke wechselnde Inserate von Campern, Anbietern und Unternehmen.
            </p>
          </div>
          {/* Desktop View All */}
          <div className="hidden lg:block">
            <button onClick={() => navigateTo('/all_listings')} className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-forest cursor-pointer">
              <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Angebote</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-sand/30 rounded-[32px] border border-dashed border-forest/10">
            <p className="font-display text-lg text-forest/70 mb-4">
              Keine Inserate entsprechen Ihren Filterkriterien.
            </p>
            <button
              onClick={onClearCategoryFilter}
              className="bg-forest text-sand text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full hover:bg-gold hover:text-forest transition-colors duration-300"
            >
              Alle Angebote anzeigen
            </button>
          </div>
        ) : (
          <div className="space-y-2 relative">
            {/* Fade Overlays - Hidden on Mobile */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Row 1: Draggable Left to Right */}
            <div className="relative overflow-hidden pb-4 cursor-grab active:cursor-grabbing" ref={row1Ref}>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -row1Constraints }}
                style={{ x: x1 }}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
                className="flex gap-5 w-max "
              >
                {[...firstRow, ...firstRow].map((item, idx) => (
                  <ListingCard key={`${item.id}-${idx}`} item={item} isWishlisted={wishlistedIds.includes(item.id)} />
                ))}
              </motion.div>
            </div>

            {/* Row 2: Draggable Right to Left */}
            <div className="relative overflow-hidden pb-4 cursor-grab active:cursor-grabbing" ref={row2Ref}>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -row2Constraints }}
                style={{ x: x2 }}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
                className="flex gap-5 w-max"
              >
                {[...secondRow, ...secondRow].map((item, idx) => (
                  <ListingCard key={`${item.id}-${idx}`} item={item} isWishlisted={wishlistedIds.includes(item.id)} />
                ))}
              </motion.div>
            </div>

            {/* Mobile & Tablet Only View All - Bottom Center */}
            <div className="mt-12 flex justify-center lg:hidden">
              <button onClick={() => navigateTo('/all_listings')} className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-forest cursor-pointer">
                <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Angebote</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
