import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { Heart, MapPin, ShieldCheck, Eye, ArrowRight } from 'lucide-react';
import { buildListingSlug } from '../utils/slugify';
import { navigateTo } from '../utils/navigation';

const ListingCard = React.memo(({ item, isWishlisted, onToggleWishlist, onCardClick }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const handleImgError = () => {
    if (imgIdx < item.images.length - 1) {
      setImgIdx(i => i + 1);
    }
  };

  return (
    <div
      onClick={() => onCardClick(item)}
      className="listing-card group relative flex-shrink-0 w-[320px] md:w-[350px] flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-forest/5 hover:border-forest/10 hover:shadow-xl transition-all duration-300 select-none cursor-pointer"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/20">
        <img
          src={item.images[imgIdx]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105 pointer-events-none"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={handleImgError}
        />
        <div className="absolute top-4 inset-x-4 flex items-center justify-between">
          <span className="bg-forest flex items-center gap-1 justify-center text-gold text-[8px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-3 h-3 text-gold" />
            {item.listing_user_type}
          </span>
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
        <div className="absolute bottom-4 right-0 inset-x-4 flex items-center justify-end pointer-events-none text-white/90">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gold shrink-0" />
            <span>{item.displayLocation || item.location}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white text-forest px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
            <Eye className="w-4 h-4" />
            <span>Inserat ansehen</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-black group-hover:text-gold transition-colors duration-200 mb-2 line-clamp-2">
            {item.title}
          </h3>
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
});

ListingCard.displayName = 'ListingCard';

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

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
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
  }, [listings, selectedCategoryFilter, searchQuery, searchLocation]);

  const { firstRow, secondRow } = useMemo(() => {
    const shuffled = [...filteredListings];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const midPoint = Math.ceil(shuffled.length / 2);
    return {
      firstRow: shuffled.slice(0, midPoint),
      secondRow: shuffled.slice(midPoint)
    };
  }, [filteredListings]);

  const dir1Ref = useRef(-1); // -1 = left, 1 = right
  const dir2Ref = useRef(1);  // 1 = right, -1 = left

  const isHovered1Ref = useRef(false);
  const isHovered2Ref = useRef(false);
  const isDragging1Ref = useRef(false);
  const isDragging2Ref = useRef(false);
  const cardWidthRef = useRef(350);
  const gap = 20;

  useEffect(() => {
    const measure = () => {
      if (row1Ref.current) {
        const card = row1Ref.current.querySelector('.listing-card');
        if (card) {
          cardWidthRef.current = card.getBoundingClientRect().width;
        }
        setRow1Constraints(row1Ref.current.scrollWidth - row1Ref.current.offsetWidth);
      }
      if (row2Ref.current) {
        setRow2Constraints(row2Ref.current.scrollWidth - row2Ref.current.offsetWidth);
      }
    };
    const timer = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, [firstRow, secondRow]);

  const handleCardClick = useCallback((item) => {
    const slug = buildListingSlug(item.title, item.id);
    navigateTo(`/listing_details/${slug}`);
  }, []);

  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);

  useEffect(() => {
    x1.set(0);
    x2.set(-row2Constraints);
  }, [firstRow, secondRow, row2Constraints]);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    const loop = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Row 1: ping-pong scrolling
      if (firstRow.length > 0 && !isHovered1Ref.current && !isDragging1Ref.current && row1Constraints > 0) {
        let currentX = x1.get() + dir1Ref.current * 40 * delta;
        if (dir1Ref.current === -1 && currentX <= -row1Constraints) {
          currentX = -row1Constraints;
          dir1Ref.current = 1;
        } else if (dir1Ref.current === 1 && currentX >= 0) {
          currentX = 0;
          dir1Ref.current = -1;
        }
        x1.set(currentX);
      } else if (row1Constraints <= 0) {
        x1.set(0);
      }

      // Row 2: ping-pong scrolling
      if (secondRow.length > 0 && !isHovered2Ref.current && !isDragging2Ref.current && row2Constraints > 0) {
        let currentX = x2.get() + dir2Ref.current * 38 * delta;
        if (dir2Ref.current === -1 && currentX <= -row2Constraints) {
          currentX = -row2Constraints;
          dir2Ref.current = 1;
        } else if (dir2Ref.current === 1 && currentX >= 0) {
          currentX = 0;
          dir2Ref.current = -1;
        }
        x2.set(currentX);
      } else if (row2Constraints <= 0) {
        x2.set(0);
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [firstRow, secondRow, row1Constraints, row2Constraints]);

  return (
    <section id="exclusive-offers" className="py-10 sm:py-16 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="space-y-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
              ZUM STÖBERN
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-black">
              Camping-Angebote auf Campuna
            </h2>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
              Entdecke wechselnde Inserate von Campern, Anbietern und Unternehmen.
            </p>
          </div>
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
            <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Row 1: Draggable Left to Right */}
            <div className="relative overflow-hidden pb-4 cursor-grab active:cursor-grabbing" ref={row1Ref}>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -row1Constraints }}
                style={{ x: x1 }}
                onDragStart={() => { isDragging1Ref.current = true; }}
                onDragEnd={() => { isDragging1Ref.current = false; }}
                onMouseEnter={() => { isHovered1Ref.current = true; }}
                onMouseLeave={() => { isHovered1Ref.current = false; }}
                className="flex gap-5 w-max "
              >
                {firstRow.map((item) => (
                  <ListingCard
                    key={item.id}
                    item={item}
                    isWishlisted={wishlistedIds.includes(item.id)}
                    onToggleWishlist={onToggleWishlist}
                    onCardClick={handleCardClick}
                  />
                ))}
              </motion.div>
            </div>

            {/* Row 2: Draggable Right to Left */}
            <div className="relative overflow-hidden pb-4 cursor-grab active:cursor-grabbing" ref={row2Ref}>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -row2Constraints }}
                style={{ x: x2 }}
                onDragStart={() => { isDragging2Ref.current = true; }}
                onDragEnd={() => { isDragging2Ref.current = false; }}
                onMouseEnter={() => { isHovered2Ref.current = true; }}
                onMouseLeave={() => { isHovered2Ref.current = false; }}
                className="flex gap-5 w-max"
              >
                {secondRow.map((item) => (
                  <ListingCard
                    key={item.id}
                    item={item}
                    isWishlisted={wishlistedIds.includes(item.id)}
                    onToggleWishlist={onToggleWishlist}
                    onCardClick={handleCardClick}
                  />
                ))}
              </motion.div>
            </div>

            <div className="mt-7 flex justify-center lg:hidden">
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
