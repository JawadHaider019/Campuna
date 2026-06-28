import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Star, ShieldCheck, Eye, X, Send, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { slugifyListing } from '../utils/slugify';


export default function FeaturedListings({
  listings,
  wishlistedIds,
  onToggleWishlist,
  selectedCategoryFilter,
  onClearCategoryFilter,
  searchQuery,
  searchLocation
}) {
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [row1Constraints, setRow1Constraints] = useState(0);
  const [row2Constraints, setRow2Constraints] = useState(0);

  // Filter listings based on category, search queries
  const filteredListings = listings.filter((item) => {
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

  useEffect(() => {
    if (row1Ref.current) {
      setRow1Constraints(row1Ref.current.scrollWidth - row1Ref.current.offsetWidth);
    }
    if (row2Ref.current) {
      setRow2Constraints(row2Ref.current.scrollWidth - row2Ref.current.offsetWidth);
    }
  }, [filteredListings]);

  const handleSendInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryMessage('');
      setSelectedQuickView(null);
    }, 2500);
  };

  // Split listings into two rows
  const midPoint = Math.ceil(filteredListings.length / 2);
  const firstRow = filteredListings.slice(0, midPoint);
  const secondRow = filteredListings.slice(midPoint);

  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/listing_details/${slugifyListing(item.title, item.id)}`);
  };

  const ListingCard = ({ item, isWishlisted }) => (
    <div
      className="group relative flex-shrink-0 w-[320px] md:w-[350px] flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-forest/5 hover:border-forest/10 hover:shadow-lg transition-all duration-300 select-none"
    >
      {/* Image Area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/20">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105 pointer-events-none"
          referrerPolicy="no-referrer"
        />

        {/* Top Bar inside image card */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between">
          <span className="bg-forest flex items-center gap-1 justify-center text-gold text-[8px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-3 h-3 text-gold" />
            {item.seller.type}
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

        {/* Location & Rating overlay */}
        <div className="absolute bottom-4 right-0 inset-x-4 flex items-center justify-end pointer-events-none text-white/90">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gold shrink-0" />
            <span>{item.location}</span>
          </div>

        </div>

        {/* Quick view / navigate button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => handleCardClick(item)}
            className="bg-white text-forest hover:bg-gold hover:text-forest px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-lg scale-95 group-hover:scale-100 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            <span>Anzeige ansehen</span>
          </button>
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

          <button
            onClick={() => handleCardClick(item)}
            className="font-sans text-xs font-bold text-forest group-hover:text-gold flex items-center space-x-1"
          >
            <span>Details</span>
            <span className="transform group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="exclusive-offers" className="py-10 sm:py-16 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="space-y-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block"
            >   Frisch eingestellt
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
              Neue Anzeigen auf Campuna
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-charcoal/50 font-mono">
              {filteredListings.length} Inserate gefunden
            </span>
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
                animate={{ x: [0, -420 * firstRow.length] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 60,
                    ease: "linear",
                  },
                }}
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
                animate={{ x: [-420 * secondRow.length, 0] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 65,
                    ease: "linear",
                  },
                }}
                className="flex gap-5 w-max"
              >
                {[...secondRow, ...secondRow].map((item, idx) => (
                  <ListingCard key={`${item.id}-${idx}`} item={item} isWishlisted={wishlistedIds.includes(item.id)} />
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedQuickView && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedQuickView(null)}
                className="absolute inset-0 bg-forest/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-sand w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedQuickView(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-forest text-white hover:bg-gold hover:text-forest flex items-center justify-center transition-all shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-6 md:p-8 flex flex-col justify-between bg-black/20">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-inner">
                    <img
                      src={selectedQuickView.images[activeImageIndex]}
                      alt={selectedQuickView.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex gap-2">
                    {selectedQuickView.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${idx === activeImageIndex ? 'border-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-between bg-sand">
                  <div>
                    <span className="bg-gold/25 border border-gold text-forest text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-4 inline-block">
                      {selectedQuickView.seller.type}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-2">
                      {selectedQuickView.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-charcoal/70 mb-6">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gold" />
                        {selectedQuickView.location}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Star className="w-4 h-4 text-gold fill-current" />
                        {selectedQuickView.rating}
                      </span>
                    </div>
                    <hr className="border-forest/10 mb-6" />
                    <p className="font-sans text-xs uppercase font-bold tracking-wider text-forest/50 mb-3">Ausstattung</p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {selectedQuickView.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-charcoal/80">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <form onSubmit={handleSendInquiry} className="space-y-3">
                    <textarea
                      required
                      placeholder="Nachricht schreiben..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-white border border-forest/15 rounded-xl p-3 text-xs focus:outline-none focus:border-gold"
                      rows={3}
                    />
                    <button
                      type="submit"
                      disabled={inquirySent}
                      className={`w-full py-3.5 px-4 rounded-full font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${inquirySent ? 'bg-emerald-600 text-white' : 'bg-forest text-sand hover:bg-gold hover:text-forest'}`}
                    >
                      {inquirySent ? <span>Gesendet!</span> : <span>Anfrage senden</span>}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
