import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistedIds,
  listingsList,
  onToggleWishlist
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="relative w-full max-w-md bg-sand h-full z-10 shadow-2xl p-6 flex flex-col justify-between border-l border-forest/5"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-forest/10 mb-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                  <h3 className="font-display text-lg font-bold text-forest">Ihre Merkliste</h3>
                  <span className="bg-forest text-white font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {wishlistedIds.length}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-forest hover:text-gold cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Saved list items */}
              {wishlistedIds.length === 0 ? (
                <div className="text-center py-24 space-y-4">
                  <Heart className="w-12 h-12 text-forest/10 mx-auto" />
                  <p className="font-sans text-sm text-charcoal/50 font-light">
                    Ihre Merkliste ist noch leer. Entdecken Sie exklusive Angebote und speichern Sie diese ab.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
                  {listingsList
                    .filter((l) => wishlistedIds.includes(l.id))
                    .map((l) => (
                      <div
                        key={l.id}
                        className="flex gap-4 p-3 bg-white rounded-2xl border border-forest/5 shadow-sm group"
                      >
                        <img
                          src={l.images[0]}
                          alt={l.title}
                          className="w-16 h-16 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block font-mono text-[9px] uppercase tracking-wider text-gold font-bold">
                            {l.category}
                          </span>
                          <h4 className="font-display text-sm font-bold text-forest truncate mb-1">
                            {l.title}
                          </h4>
                          <p className="font-display text-sm font-extrabold text-forest">
                            {l.price.toLocaleString('de-DE')} €
                          </p>
                        </div>
                        
                        {/* Remove button */}
                        <button
                          onClick={() => onToggleWishlist(l.id)}
                          className="p-2 text-charcoal/30 hover:text-rose-500 hover:bg-rose-50 rounded-full shrink-0 h-10 w-10 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Bottom Drawer block */}
            {wishlistedIds.length > 0 && (
              <div className="pt-6 border-t border-forest/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-xs text-charcoal/50 uppercase tracking-widest">Gesamtwert</span>
                  <span className="font-display text-xl font-black text-forest">
                    {listingsList
                      .filter((l) => wishlistedIds.includes(l.id))
                      .reduce((acc, curr) => acc + curr.price, 0)
                      .toLocaleString('de-DE')}{' '}
                    €
                  </span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('exclusive-offers');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-forest text-sand hover:bg-gold hover:text-forest py-4 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  Alle gemerkten Angebote ansehen
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
