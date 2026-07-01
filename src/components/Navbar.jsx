import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, User, PlusCircle, Compass, Sparkles, Heart } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export default function Navbar({ onSearchFocus, onOpenSellModal, onOpenAuthModal, wishlistCount = 0, onOpenWishlist }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [toggleText, setToggleText] = useState(true); // true = 'Konto', false = 'Einloggen'

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

  useEffect(() => {
    const interval = setInterval(() => {
      setToggleText(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 w-full z-50 transition-all duration-300 bg-white py-2 ${isScrolled ? 'top-0 shadow-md' : 'top-12 sm:top-14'
        }`}
    >
      <div className="max-w-8xl mx-auto px-2 md:px-14 ">
        <div className="flex items-center justify-between">
          <button onClick={() => navigateTo('/')} className="flex  items-center group">
            <img
              src="/logo.png"
              alt="Campuna – Dein Camping-Marktplatz"
              width={120}
              height={38}
              className="w-[120px] h-[38px] object-contain transition-opacity duration-300 group-hover:opacity-80"
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
              onClick={() => {
                const element = document.getElementById('journal');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="font-sans text-sm font-medium text-forest hover:text-gold tracking-wide transition-colors duration-200"
            >
              Ratgeber
            </button>

            <button
              onClick={() => navigateTo('/my_account?n=yes')}
              className="flex items-center space-x-2 bg-forest text-sand hover:bg-gold hover:text-forest py-2.5 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg min-w-[135px] justify-center overflow-hidden group"
            >
              <motion.div
                key={toggleText}
                animate={{ scale: [1, 1.25, 1], rotate: [0, -12, 12, 0] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="z-10 flex items-center"
              >
                <User className="w-4 h-4 shrink-0" />
              </motion.div>
              <div className="relative h-4 overflow-hidden min-w-[75px] flex items-center justify-center [perspective:400px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={toggleText ? 'konto' : 'einloggen'}
                    initial={{ y: 12, opacity: 0, rotateX: -75, skewX: -20, rotateY: -15 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0, skewX: 0, rotateY: 0 }}
                    exit={{ y: -12, opacity: 0, rotateX: 75, skewX: 20, rotateY: 15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute whitespace-nowrap origin-center"
                  >
                    {toggleText ? 'Konto' : 'Einloggen'}
                  </motion.span>
                </AnimatePresence>
              </div>
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
                onClick={() => {
                  setIsOpen(false);
                  const element = document.getElementById('journal');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="font-sans text-lg font-medium text-forest hover:text-gold text-left"
              >
                Ratgeber
              </button>

              <hr className="border-forest/10" />

              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => { setIsOpen(false); navigateTo('/my_account?n=yes'); }}
                  className="w-full bg-forest text-sand py-3 rounded-full font-sans text-sm font-semibold hover:bg-gold hover:text-forest transition-colors duration-300 shadow-md flex items-center justify-center space-x-2 relative min-h-[48px] overflow-hidden"
                >
                  <motion.div
                    key={toggleText}
                    animate={{ scale: [1, 1.25, 1], rotate: [0, -12, 12, 0] }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="z-10 flex items-center"
                  >
                    <User className="w-4 h-4 shrink-0" />
                  </motion.div>
                  <div className="relative h-5 overflow-hidden min-w-[75px] flex items-center justify-center [perspective:400px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={toggleText ? 'konto' : 'einloggen'}
                        initial={{ y: 12, opacity: 0, rotateX: -75, skewX: -20, rotateY: -15 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0, skewX: 0, rotateY: 0 }}
                        exit={{ y: -12, opacity: 0, rotateX: 75, skewX: 20, rotateY: 15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute whitespace-nowrap origin-center"
                      >
                        {toggleText ? 'Konto' : 'Einloggen'}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
