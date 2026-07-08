import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, User, PlusCircle, Compass, Sparkles, Heart, Bell } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export default function Navbar({ onSearchFocus, onOpenSellModal, onOpenAuthModal, wishlistCount = 0, onOpenWishlist, isLoggedIn, alertCount = 0 }) {
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
      className={`fixed left-0 w-full z-50 transition-[top,box-shadow] duration-500 ease-in-out bg-white py-5 ${isScrolled ? 'top-0 shadow-md' : 'top-[70px] sm:top-[64px] md:top-[74px] lg:top-[64px] '
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
              onClick={() => navigateTo(isLoggedIn ? '/my_account' : '/signup_login')}
              className="relative flex items-center space-x-2 bg-forest text-sand hover:bg-gold hover:text-forest py-2.5 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg min-w-[135px] justify-center group"
            >
              <User className="w-4 h-4 shrink-0" />

              <div className="relative">
                <span className="whitespace-nowrap flex items-center gap-1">
                  {isLoggedIn ? 'Konto' : 'Einloggen'}
                  {isLoggedIn && alertCount > 0 && (
                    <span className="relative flex items-center justify-center text-gold group-hover:text-forest">
                      <Bell className="w-3.5 h-3.5 shrink-0" />
                      <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    </span>
                  )}
                </span>
              </div>

            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-forest focus:outline-none"
              aria-label="Menü umschalten"
            >
              <div className="relative">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                {isLoggedIn && alertCount > 0 && (
                  <span className="absolute top-0 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
              </div>
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
                  onClick={() => { setIsOpen(false); navigateTo(isLoggedIn ? '/my_account' : '/signup_login'); }}
                  className="w-full bg-forest text-sand py-3 rounded-full font-sans text-sm font-semibold hover:bg-gold hover:text-forest transition-colors duration-300 shadow-md flex items-center justify-center space-x-2 min-h-[48px] group"
                >
                  <User className="w-4 h-4 shrink-0" />
                  <div className="relative">
                    <span className="whitespace-nowrap flex items-center gap-1">
                      {isLoggedIn ? 'Konto' : 'Einloggen'}
                      {isLoggedIn && alertCount > 0 && (
                        <span className="relative flex items-center justify-center text-gold group-hover:text-forest">
                          <Bell className="w-3.5 h-3.5 shrink-0" />
                          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        </span>
                      )}
                    </span>
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
