import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { Heart, MapPin, ShieldCheck, Eye, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildListingSlug } from '../utils/slugify';
import { navigateTo } from '../utils/navigation';
import { getHomepageProducts } from '../api/bubbleApi';
import { formatLocation } from '../utils/location';
import { rotateListings } from '../utils/rotation';

function normalizeListing(item) {
  if (!item) return null;
  // If item is already mapped with images array and formatted title, use it
  if (item.id && Array.isArray(item.images) && item.displayLocation) {
    return item;
  }

  const id = item._id || item.id || String(Math.random());

  // Images resolution: Main Image first, then images array
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
    .map(url => {
      url = url.startsWith('//') ? `https:${url}` : url;
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

  let category = item.Category || item.category || 'Camping Zubehör';
  if (category === 'Ausrüstung und Zubehör') {
    category = 'Camping Zubehör';
  }

  const rawLocation = item["location geo"]?.address || item.location || "Deutschland";
  const displayLocation = formatLocation(rawLocation);

  const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
  let pricePeriod = item.pricePeriod || 'Preis';
  if (!item.pricePeriod) {
    if (category === 'Mieten & Vermieten' || (item["Sub - Category"] && item["Sub - Category"].toLowerCase().includes('mieten'))) {
      pricePeriod = 'pro Tag';
    } else if (category === 'Wohnmobile & Camper' || category === 'Tiny Houses' || category === 'Fahrzeuge') {
      pricePeriod = 'Kaufpreis';
    }
  }

  const features = item.features ? [...item.features] : [];
  if (features.length === 0) {
    if (item["Condition item"]) {
      const condMapping = { "New": "Neu", "Used": "Gebraucht", "Good": "Sehr gut", "Like New": "Neuwertig" };
      features.push(condMapping[item["Condition item"]] || item["Condition item"]);
    }
    if (item["Sub - Category"]) {
      features.push(String(item["Sub - Category"]).trim());
    }
    if (item["Type of offer"]) {
      features.push(item["Type of offer"]);
    }
    if (features.length === 0) {
      features.push("Camping");
    }
  }

  const resolvedSellerType = item.listing_user_type || item["listing user type"] || (category === 'Mieten & Vermieten' || (item["Sub - Category"] && item["Sub - Category"].toLowerCase().includes('mieten')) ? 'Gewerblich' : 'Privat');

  return {
    id,
    title: item.title || item.description || "Camping Angebot",
    category,
    price,
    pricePeriod,
    location: rawLocation,
    displayLocation,
    images,
    listing_user_type: resolvedSellerType,
    features
  };
}

const ListingCard = React.memo(({ item: rawItem, isWishlisted, onToggleWishlist, onCardClick }) => {
  const item = useMemo(() => normalizeListing(rawItem), [rawItem]);
  const [imgIdx, setImgIdx] = useState(0);
  const tagsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    if (tagsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tagsRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 200);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [item?.features, checkScroll]);

  if (!item) return null;

  const handleImgError = () => {
    if (imgIdx < item.images.length - 1) {
      setImgIdx(i => i + 1);
    }
  };

  const scrollTags = (e, direction) => {
    e.stopPropagation();
    if (tagsRef.current) {
      const scrollAmount = direction === 'left' ? -90 : 90;
      tagsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={() => onCardClick(item)}
      className="listing-card group relative flex-shrink-0 w-[300px] md:w-[320px] flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-forest/5 hover:border-forest/10 hover:shadow-lg transition-all duration-300 select-none cursor-pointer"
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
          <span className="bg-forest flex items-center gap-1 justify-center text-white text-[8px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-3 h-3 text-white" />
            {item.listing_user_type}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleWishlist) onToggleWishlist(item.id);
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
          <h3 className="font-display text-md font-semibold text-black group-hover:text-gold transition-colors duration-200 mb-2 line-clamp-1">
            {item.title}
          </h3>
          <div className="relative group/tags mb-2" onClick={(e) => e.stopPropagation()}>
            {canScrollLeft && (
              <button
                type="button"
                onClick={(e) => scrollTags(e, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-white/90 hover:bg-white text-forest shadow rounded-full flex items-center justify-center border border-forest/10 transition-all duration-200"
                aria-label="Scroll tags left"
              >
                <ChevronLeft className="w-2.5 h-2.5" />
              </button>
            )}
            <div
              ref={tagsRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto gap-1.5 no-scrollbar scroll-smooth"
            >
              {item.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-charcoal/60 bg-sand px-2 py-1 rounded-md border border-forest/5 whitespace-nowrap shrink-0 select-none"
                >
                  {feat}
                </span>
              ))}
            </div>
            {canScrollRight && (
              <button
                type="button"
                onClick={(e) => scrollTags(e, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-white/90 hover:bg-white text-forest shadow rounded-full flex items-center justify-center border border-forest/10 transition-all duration-200"
                aria-label="Scroll tags right"
              >
                <ChevronRight className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
        <div className="pt-2 border-t border-forest/5 flex items-center justify-between">

          <span className="block text-[10px] uppercase tracking-widest text-charcoal/40 font-mono">
            {item.pricePeriod}
          </span>
          <span className="font-display text-lg font-bold text-forest">
            {item.price.toLocaleString('de-DE')} €
          </span>

        </div>
      </div>
    </div>
  );
});

ListingCard.displayName = 'ListingCard';

export default function FeaturedListings({
  listings: propListings,
  isLoading: propIsLoading,
  wishlistedIds = [],
  onToggleWishlist,
  selectedCategoryFilter,
  onClearCategoryFilter,
  searchQuery,
  searchLocation,
  badge = "ZUM STÖBERN",
  title = "Camping-Angebote auf Campuna",
  subtitle = "Entdecke wechselnde Inserate von Campern, Anbietern und Unternehmen."
}) {
  const rowRef = useRef(null);
  const [rowConstraints, setRowConstraints] = useState(0);
  const [apiListings, setApiListings] = useState([]);
  const [internalLoading, setInternalLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (!propListings || propListings.length === 0) {
      setInternalLoading(true);
      getHomepageProducts()
        .then(data => {
          if (active && data && data.status === "success" && Array.isArray(data.response?.listing)) {
            setApiListings(data.response.listing);
          }
        })
        .catch(err => {
          console.error("Failed to fetch products in FeaturedListings:", err);
        })
        .finally(() => {
          if (active) setInternalLoading(false);
        });
    }
    return () => { active = false; };
  }, [propListings]);

  const activeListings = useMemo(() => {
    if (propListings && propListings.length > 0) {
      return propListings;
    }
    return apiListings;
  }, [propListings, apiListings]);

  const isLoadingState = propIsLoading || (internalLoading && activeListings.length === 0);

  const filteredListings = useMemo(() => {
    return activeListings.filter((rawItem) => {
      const item = normalizeListing(rawItem);
      if (!item) return false;
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
  }, [activeListings, selectedCategoryFilter, searchQuery, searchLocation]);

  const displayListings = useMemo(() => {
    if (!filteredListings || filteredListings.length === 0) {
      return [];
    }
    // Take up to 10 unique random products for display
    return rotateListings(filteredListings, 10);
  }, [filteredListings]);

  const dirRef = useRef(1); // 1 = right (left to right), -1 = left
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const cardWidthRef = useRef(350);

  useEffect(() => {
    const measure = () => {
      if (rowRef.current) {
        const card = rowRef.current.querySelector('.listing-card');
        if (card) {
          cardWidthRef.current = card.getBoundingClientRect().width;
        }
        setRowConstraints(rowRef.current.scrollWidth - rowRef.current.offsetWidth);
      }
    };
    const timer = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, [displayListings]);

  const handleCardClick = useCallback((item) => {
    const slug = buildListingSlug(item.title, item.id);
    navigateTo(`/listing_details/${slug}`);
  }, []);

  const x = useMotionValue(0);

  useEffect(() => {
    if (rowConstraints > 0) {
      x.set(-rowConstraints);
      dirRef.current = 1;
    } else {
      x.set(0);
    }
  }, [displayListings, rowConstraints]);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    const loop = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Ping-pong scrolling for single row
      if (displayListings.length > 0 && !isHoveredRef.current && !isDraggingRef.current && rowConstraints > 0) {
        let currentX = x.get() + dirRef.current * 40 * delta;
        if (dirRef.current === -1 && currentX <= -rowConstraints) {
          currentX = -rowConstraints;
          dirRef.current = 1;
        } else if (dirRef.current === 1 && currentX >= 0) {
          currentX = 0;
          dirRef.current = -1;
        }
        x.set(currentX);
      } else if (rowConstraints <= 0) {
        x.set(0);
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [displayListings, rowConstraints]);

  return (
    <section id="exclusive-offers" className="py-10 sm:py-16 bg-white scroll-mt-24 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div className="space-y-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
              {badge}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-black">
              {title}
            </h2>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
              {subtitle}
            </p>
          </div>
          <div className="hidden lg:block">
            <button onClick={() => navigateTo('/all_listings')} className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-forest cursor-pointer">
              <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Inserate</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {isLoadingState ? (
          <div className="space-y-4 relative">
            <div className="flex gap-5 overflow-hidden">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="flex-shrink-0 w-[320px] md:w-[350px] h-[300px] bg-sand/30 animate-pulse rounded-[24px] border border-forest/5 p-4 flex flex-col justify-between">
                  <div className="w-full h-40 bg-sand/60 rounded-[16px]" />
                  <div className="space-y-2 mt-4">
                    <div className="h-5 bg-sand/60 rounded w-3/4" />
                    <div className="h-4 bg-sand/40 rounded w-1/2" />
                  </div>
                  <div className="h-6 bg-sand/60 rounded w-1/3 mt-4" />
                </div>
              ))}
            </div>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-sand/30 rounded-[32px] border border-dashed border-forest/10">
            <p className="font-display text-lg text-forest/70 mb-4">
              Keine Inserate entsprechen Ihren Filterkriterien.
            </p>
            <button
              onClick={() => navigateTo('/all_listings')}
              className="bg-forest text-sand text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full hover:bg-gold hover:text-forest transition-colors duration-300"
            >
              Alle Inserate ansehen
            </button>
          </div>
        ) : (
          <div className="space-y-2 relative">
            <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Single Row: Draggable & Auto-scrolling */}
            <div className="relative overflow-hidden pb-4 cursor-grab active:cursor-grabbing" ref={rowRef}>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -rowConstraints }}
                style={{ x }}
                onDragStart={() => { isDraggingRef.current = true; }}
                onDragEnd={() => { isDraggingRef.current = false; }}
                onMouseEnter={() => { isHoveredRef.current = true; }}
                onMouseLeave={() => { isHoveredRef.current = false; }}
                className="flex gap-5 w-max"
              >
                {displayListings.map((item, idx) => {
                  const normalized = normalizeListing(item);
                  return (
                    <ListingCard
                      key={`${normalized.id}-${idx}`}
                      item={item}
                      isWishlisted={wishlistedIds.includes(normalized.id)}
                      onToggleWishlist={onToggleWishlist}
                      onCardClick={handleCardClick}
                    />
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-7 flex justify-center lg:hidden">
              <button onClick={() => navigateTo('/all_listings')} className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-forest cursor-pointer">
                <span className="pb-0.5 border-b-2 border-gold/50 group-hover:border-gold transition-colors">Alle Inserate</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
