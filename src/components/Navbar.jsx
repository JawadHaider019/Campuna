import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { navigateTo } from '../utils/navigation';

export default function Navbar({ onSearchFocus, onOpenSellModal, onOpenAuthModal, wishlistCount = 0, onOpenWishlist, isLoggedIn, alertCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  const navLinks = [
    { label: 'Startseite', id: 'top' },
    { label: 'Zum Stöbern', id: 'exclusive-offers' },
    { label: 'Spotlight', id: 'campuna-spotlight' },
    { label: 'Ratgeber', id: 'journal' },
    { label: 'Entdecke', id: 'discover-campuna' },
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);

    if (id === 'top') {
      if (isHomepage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigateTo('/');
      }
      return;
    }

    if (isHomepage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigateTo(`/#${id}`);
    }
  };

  // Scrollspy & Scrolled state detection
  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar shrink/fixed position check
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Section scrollspy (only active on homepage)
      if (!isHomepage) {
        setActiveSection('');
        return;
      }

      const scrollPosition = window.scrollY + 180;
      const sectionIds = ['exclusive-offers', 'campuna-spotlight', 'discover-campuna', 'journal'];

      let current = 'top';
      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  // Handle hash scrolling on page load / route change
  useEffect(() => {
    if (isHomepage && window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isHomepage, location]);

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 w-full z-50 transition-all duration-300 bg-white py-4 ${isScrolled || !isHomepage ? 'top-0 shadow-md border-b border-forest/5' : 'top-[70px] sm:top-[64px] md:top-[74px] lg:top-[64px]'
        }`}
    >
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNavClick('top')} className="flex items-center group">
            <img
              src="/logo.png"
              alt="Campuna – Dein Camping-Marktplatz"
              width={120}
              height={38}
              className="w-[120px] h-[38px] object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = isHomepage && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 py-1 ${isActive ? 'text-gold font-semibold' : 'text-forest hover:text-gold'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => navigateTo(isLoggedIn ? '/my_account' : '/signup_login')}
              className="relative flex items-center space-x-2 bg-forest text-sand hover:bg-gold hover:text-forest py-2.5 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg min-w-[135px] justify-center group ml-2"
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-forest/10 shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = isHomepage && activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`font-sans text-base font-medium text-left transition-colors duration-200 flex items-center justify-between py-1.5 ${isActive ? 'text-gold font-bold' : 'text-forest hover:text-gold'
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-gold" />}
                  </button>
                );
              })}

              <hr className="border-forest/10 my-2" />

              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigateTo(isLoggedIn ? '/my_account' : '/signup_login');
                  }}
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
