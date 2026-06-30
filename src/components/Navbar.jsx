import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, User, PlusCircle, Compass, Sparkles, Heart } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export default function Navbar({ onSearchFocus, onOpenSellModal, onOpenAuthModal, wishlistCount = 0, onOpenWishlist }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 w-full z-50 transition-all duration-300 bg-white py-3 ${isScrolled ? 'top-0 shadow-md' : 'top-[52px] sm:top-14'
        }`}
    >
      <div className="max-w-8xl mx-auto px-2 md:px-12 ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigateTo('/')} className="flex items-center group">
            <img
              src="/logo.png"
              alt="Campuna – Dein Camping-Marktplatz"
              className="h-10 w-auto object-cover transition-opacity duration-300 group-hover:opacity-80"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">


            <button
              onClick={() => navigateTo('/')}
              className="font-sans text-sm font-medium text-forest hover:text-gold tracking-wide transition-colors duration-200"
            >
              Startseite
            </button>
            <button
              onClick={() => navigateTo('/all_blogs')}
              className="font-sans text-sm font-medium text-forest hover:text-gold tracking-wide transition-colors duration-200"
            >
              Ratgeber
            </button>




            <button
              onClick={() => navigateTo('/signup_login')}
              className="flex items-center space-x-2 bg-forest text-sand hover:bg-gold hover:text-forest py-2.5 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <User className="w-4 h-4" />
              <span>Einloggen</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-4">


            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-forest focus:outline-none"
              aria-label="Menü umschalten"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-forest/10 shadow-xl"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              <button
                onClick={() => { setIsOpen(false); navigateTo('/'); }}
                className="font-sans text-lg font-medium text-forest hover:text-gold text-left"
              >
                Startseite
              </button>
              <button
                onClick={() => { setIsOpen(false); navigateTo('/all_blogs'); }}
                className="font-sans text-lg font-medium text-forest hover:text-gold text-left"
              >
                Ratgeber
              </button>

              <hr className="border-forest/10" />

              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => { setIsOpen(false); navigateTo('/signup_login'); }}
                  className="w-full bg-forest text-sand py-3 rounded-full font-sans text-sm font-semibold hover:bg-gold hover:text-forest transition-colors duration-300 shadow-md"
                >
                  <span>Einloggen</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
