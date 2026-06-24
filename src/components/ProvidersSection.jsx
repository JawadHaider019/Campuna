import { motion } from 'motion/react';
import { Star, ShieldCheck, MapPin, ArrowRight, Award } from 'lucide-react';
import { PROVIDERS } from '../data';

export default function ProvidersSection({ onPartnerClick }) {
  return (
    <section id="partners" className="py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold block">
              Geprüfte Qualität
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-forest">
              Empfohlene Camping-Partner
            </h2>
          </div>
          <p className="font-sans text-sm text-charcoal/60 max-w-md mt-4 md:mt-0 leading-relaxed font-light">
            Entdecken Sie exklusive Händler und Manufakturen, die für höchste Kundenzufriedenheit, exzellenten Service und absolute Zuverlässigkeit stehen.
          </p>
        </div>

        {/* Providers List (Horizontal design) */}
        <div className="space-y-8">
          {PROVIDERS.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-forest/5 hover:border-forest/10 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Cover Image & Hover effect (Left Side) */}
              <div className="relative lg:col-span-5 h-64 lg:h-auto overflow-hidden">
                <img
                  src={partner.coverImage}
                  alt={partner.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-forest/30 to-transparent" />
                
                {/* Float Rating */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center space-x-1 shadow-md">
                  <Star className="w-3.5 h-3.5 text-gold fill-current" />
                  <span className="font-mono text-xs font-bold text-forest">{partner.rating.toFixed(2)}</span>
                </div>
              </div>

              {/* Company details (Right Side) */}
              <div className="p-8 md:p-12 lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Brand Logo Circular */}
                    <div className="w-14 h-14 rounded-full bg-sand/30 border border-forest/10 p-1 overflow-hidden shrink-0">
                      <img
                        src={partner.logo}
                        alt="Logo"
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-forest">
                          {partner.name}
                        </h3>
                        <Award className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-xs text-charcoal/50 flex items-center gap-1 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                        {partner.location}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-charcoal/70 leading-relaxed font-light mb-6">
                    {partner.description}
                  </p>
                </div>

                {/* Footer details inside the card */}
                <div className="pt-6 border-t border-forest/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-gold bg-forest/5 px-3 py-1.5 rounded-full">
                      {partner.listingsCount} aktive Angebote
                    </span>
                    <span className="text-xs text-charcoal/40 font-sans">auf Campuna</span>
                  </div>

                  <button
                    onClick={() => onPartnerClick?.(partner.name)}
                    className="flex items-center justify-center space-x-2 bg-forest hover:bg-gold text-sand hover:text-forest py-3.5 px-6 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0"
                  >
                    <span>Angebote ansehen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
