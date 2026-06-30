import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, User, PlusCircle, Compass, Sparkles, Heart } from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onSearchFocus, onOpenSellModal, onOpenAuthModal, wishlistCount = 0, onOpenWishlist }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

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

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-sand text-forest border border-forest/10 hover:border-gold py-2.5 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <User className="w-4 h-4 text-gold" />
                  <span className="max-w-[120px] truncate">{user?.name || user?.email?.split('@')[0] || 'Mein Profil'}</span>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop wrapper to dismiss the dropdown */}
                      <div
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-forest/10 py-3 z-50 origin-top-right overflow-hidden"
                      >
                        <div className="px-4 py-2 border-b border-forest/5 mb-2">
                          <p className="text-[10px] text-forest/40 uppercase font-bold tracking-wider">Angemeldet als</p>
                          <p className="text-xs font-semibold text-forest truncate">{user?.name || user?.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            navigateTo('/profile');
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs text-charcoal hover:bg-sand hover:text-forest transition-colors font-medium flex items-center space-x-2 cursor-pointer"
                        >
                          <User className="w-3.5 h-3.5 text-gold" />
                          <span>Mein Profil</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            navigateTo('/my-listings');
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs text-charcoal hover:bg-sand hover:text-forest transition-colors font-medium flex items-center space-x-2 cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5 text-gold" />
                          <span>Meine Inserate</span>
                        </button>
                        <hr className="border-forest/5 my-1" />
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors font-bold flex items-center space-x-2 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Ausloggen</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('/signup_login')}
                className="flex items-center space-x-2 bg-forest text-sand hover:bg-gold hover:text-forest py-2.5 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                <span>Einloggen</span>
              </button>
            )}
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
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-3 bg-sand rounded-xl border border-forest/10">
                      <p className="text-[10px] text-forest/40 uppercase font-bold tracking-wider">Angemeldet als</p>
                      <p className="text-sm font-bold text-forest truncate">{user?.name || user?.email}</p>
                    </div>
                    <button
                      onClick={() => { setIsOpen(false); navigateTo('/profile'); }}
                      className="w-full bg-sand text-forest border border-forest/10 py-3 rounded-full font-sans text-sm font-semibold hover:bg-gold hover:text-forest transition-colors duration-300 text-center"
                    >
                      <span>Mein Profil</span>
                    </button>
                    <button
                      onClick={() => { setIsOpen(false); navigateTo('/my-listings'); }}
                      className="w-full bg-sand text-forest border border-forest/10 py-3 rounded-full font-sans text-sm font-semibold hover:bg-gold hover:text-forest transition-colors duration-300 text-center"
                    >
                      <span>Meine Inserate</span>
                    </button>
                    <button
                      onClick={() => { setIsOpen(false); logout(); }}
                      className="w-full bg-red-50 text-red-600 py-3 rounded-full font-sans text-sm font-semibold hover:bg-red-100 transition-colors duration-300 text-center"
                    >
                      <span>Ausloggen</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setIsOpen(false); navigateTo('/signup_login'); }}
                    className="w-full bg-forest text-sand py-3 rounded-full font-sans text-sm font-semibold hover:bg-gold hover:text-forest transition-colors duration-300 shadow-md"
                  >
                    <span>Einloggen</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
