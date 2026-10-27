import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, Bell, ChevronDown, ArrowRight, MessageSquare } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import WelcomeBar from './WelcomeBar';

const TOOLS_ITEMS = [
  {
    title: 'Zuladungsrechner',
    subtitle: 'Zuladung für Wohnmobil & Wohnwagen berechnen',
    path: '/zuladungsrechner'
  },
  {
    title: 'Reisekostenrechner',
    subtitle: 'Sprit-, Maut- und Campingkosten kalkulieren',
    path: '/reisekostenrechner'
  }
];

export default function Navbar({ isLoggedIn = false, alertCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [toolsHovered, setToolsHovered] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isHomepage = pathname === '/';

  const navLinks = useMemo(() => {
    if (isHomepage) {
      return [
        { id: 'offers', label: 'Inserate', path: '/all_listings' },
        { id: 'categories', label: 'Kategorien', path: '/category' },
        { id: 'providers', label: 'Anbieter', path: '/all_business' },
        { id: 'tool', label: 'Tools & Rechner' },
        { id: 'about', label: 'Über uns', path: '/about' },
        { id: 'how-it-works', label: "So funktioniert's", idTarget: 'why-campuna' },
      ];
    }

    const allItems = [
      { id: 'home', label: 'Startseite', path: '/' },
      { id: 'offers', label: 'Inserate', path: '/all_listings', isCurrent: pathname.startsWith('/all_listings') },
      { id: 'categories', label: 'Kategorien', path: '/category', isCurrent: pathname.startsWith('/category') },
      { id: 'providers', label: 'Anbieter', path: '/all_business', isCurrent: pathname.startsWith('/all_business') },
      { id: 'tool', label: 'Tools & Rechner' },
      { id: 'about', label: 'Über uns', path: '/about', isCurrent: pathname.startsWith('/about') || pathname.startsWith('/uber_campuna') },
    ];

    return allItems.filter((item) => !item.isCurrent);
  }, [pathname, isHomepage]);

  const scrollToSection = (id, behavior = 'smooth') => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior });
      return true;
    }
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const navHeaderOffset = isMobile ? 80 : 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navHeaderOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior
      });
      return true;
    }
    return false;
  };

  const handleNavClick = (id, path, idTarget) => {
    setIsOpen(false);

    if (id === 'tool') {
      window.dispatchEvent(new CustomEvent('open-campuna-tools-modal', { detail: { tool: 'payload' } }));
      return;
    }

    if (idTarget) {
      if (isHomepage) {
        scrollToSection(idTarget, 'smooth');
      } else {
        navigate(`/#${idTarget}`);
      }
      return;
    }

    if (path) {
      navigate(path);
      return;
    }

    if (id === 'top') {
      if (isHomepage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.replaceState(null, '', window.location.pathname);
        setActiveSection('top');
      } else {
        navigate('/');
      }
      return;
    }

    if (isHomepage) {
      scrollToSection(id, 'smooth');
      window.history.replaceState(null, '', `#${id}`);
      setActiveSection(id);
    } else {
      navigate(`/#${id}`);
    }
  };

  // Scrollspy & Scrolled state detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      if (!isHomepage) {
        setActiveSection('');
        return;
      }

      const scrollY = window.scrollY;
      const navOffset = 140;
      const navSectionIds = ['exclusive-offers', 'anbieter', 'campuna-spotlight', 'tool', 'why-campuna', 'faq'];
      let current = 'top';

      for (const id of navSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY + navOffset >= top && scrollY + navOffset < top + height) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  return (
    <>
      {/* Welcome Bar at top on homepage */}
      {isHomepage && <WelcomeBar isLoggedIn={isLoggedIn} />}

      <nav
        id="main-navbar"
        className={`fixed left-0 w-full z-40 transition-all duration-300 bg-white py-3.5 sm:py-4 ${
          !isHomepage || isScrolled ? 'top-0 shadow-xs' : 'top-9 sm:top-10'
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => handleNavClick('top')} className="flex items-start group relative cursor-pointer">
              <img
                src="/logo.webp"
                alt="Campuna® – Dein Camping-Marktplatz"
                width={120}
                height={38}
                className="w-[120px] h-[38px] object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
              <span className="text-2xl sm:text-3xl font-normal text-forest ml-0.5 -mt-1 select-none leading-none">®</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3.5 xl:space-x-6 text-[13.5px] xl:text-sm">
              {navLinks.map((link) => {
                if (link.id === 'tool') {
                  const isToolActive = pathname === '/zuladungsrechner' || pathname === '/reisekostenrechner';
                  return (
                    <div
                      key="tools-nav-dropdown"
                      className="relative py-1"
                      onMouseEnter={() => setToolsHovered(true)}
                      onMouseLeave={() => setToolsHovered(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setToolsHovered(!toolsHovered)}
                        className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 py-1 flex items-center gap-1 cursor-pointer ${
                          isToolActive ? 'text-gold font-semibold' : 'text-forest hover:text-gold'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsHovered ? 'rotate-180 text-gold' : 'text-forest/60'}`} />
                        {isToolActive && (
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0.6 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleX: 0.6 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full origin-center"
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {toolsHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-forest/10 p-2 z-50"
                          >
                            <div className="space-y-1">
                              {TOOLS_ITEMS.map((tool) => {
                                const isCurrentTool = pathname === tool.path;
                                return (
                                  <button
                                    key={tool.path}
                                    type="button"
                                    onClick={() => {
                                      setToolsHovered(false);
                                      navigate(tool.path);
                                    }}
                                    className={`w-full flex flex-col p-2.5 rounded-xl transition-all duration-200 group/toolitem text-left cursor-pointer ${
                                      isCurrentTool ? 'bg-sand/70 text-forest' : 'hover:bg-sand/60 text-charcoal'
                                    }`}
                                  >
                                    <div className="font-display text-xs font-bold text-forest group-hover/toolitem:text-gold transition-colors flex items-center justify-between">
                                      <span>{tool.title}</span>
                                      <ArrowRight className="w-3 h-3 text-charcoal/30 group-hover/toolitem:text-forest group-hover/toolitem:translate-x-0.5 transition-all opacity-0 group-hover/toolitem:opacity-100" />
                                    </div>
                                    <p className="font-sans text-[11px] text-charcoal/60 leading-tight font-light line-clamp-1 mt-0.5">
                                      {tool.subtitle}
                                    </p>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = link.path
                  ? (pathname === link.path || (link.path === '/about' && pathname === '/uber_campuna'))
                  : (isHomepage && activeSection === link.id);

                return (
                  <button
                    key={link.id || link.path}
                    type="button"
                    onClick={() => handleNavClick(link.id, link.path, link.idTarget)}
                    className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 py-1 cursor-pointer ${
                      isActive ? 'text-gold font-semibold' : 'text-forest hover:text-gold'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.6 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full origin-center"
                      />
                    )}
                  </button>
                );
              })}

              {/* User Account / Login Button */}
              <button
                type="button"
                onClick={() => navigate(isLoggedIn ? '/my_account' : '/auth')}
                className="relative flex items-center space-x-2 bg-forest text-sand hover:bg-gold hover:text-forest py-2.5 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg min-w-[135px] justify-center group ml-1 cursor-pointer"
              >
                <User className="w-4 h-4 shrink-0" />
                <div className="relative">
                  <span className="whitespace-nowrap flex items-center gap-1.5">
                    {isLoggedIn ? 'Konto' : 'Einloggen'}
                    {isLoggedIn && alertCount > 0 && (
                      <span className="relative flex items-center justify-center text-gold group-hover:text-forest" title="Ungelesene Chat-Nachrichten">
                        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
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
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-forest focus:outline-none cursor-pointer"
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
              className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-forest/10 shadow-xl max-h-[85vh] overflow-y-auto"
            >
              <div className="px-6 py-6 flex flex-col space-y-4">
                {navLinks.map((link) => {
                  if (link.id === 'tool') {
                    return (
                      <div key="mobile-tools-accordion" className="flex flex-col py-1">
                        <button
                          type="button"
                          onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                          className="font-sans text-base font-medium text-left transition-colors duration-200 flex items-center justify-between py-1.5 text-forest hover:text-gold cursor-pointer"
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180 text-gold' : 'text-forest/60'}`} />
                        </button>
                        <AnimatePresence>
                          {mobileToolsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-3 py-1 space-y-1.5 overflow-hidden"
                            >
                              {TOOLS_ITEMS.map((tool) => (
                                <button
                                  key={tool.path}
                                  type="button"
                                  onClick={() => {
                                    setIsOpen(false);
                                    navigate(tool.path);
                                  }}
                                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer hover:bg-sand/60 text-charcoal/80 bg-sand/30"
                                >
                                  <div className="flex-1 min-w-0 pr-2">
                                    <span className="font-display text-xs font-semibold text-forest block truncate">{tool.title}</span>
                                    <span className="font-sans text-[10px] text-charcoal/60 font-light block truncate">{tool.subtitle}</span>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-charcoal/40 shrink-0" />
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isActive = link.path
                    ? (pathname === link.path || (link.path === '/about' && pathname === '/uber_campuna'))
                    : (isHomepage && activeSection === link.id);

                  return (
                    <button
                      key={link.id || link.path}
                      type="button"
                      onClick={() => handleNavClick(link.id, link.path, link.idTarget)}
                      className={`font-sans text-base font-medium text-left transition-colors duration-200 flex items-center justify-between py-1.5 cursor-pointer ${
                        isActive ? 'text-gold font-bold' : 'text-forest hover:text-gold'
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
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate(isLoggedIn ? '/my_account' : '/auth');
                    }}
                    className="w-full bg-forest text-sand py-3 rounded-full font-sans text-sm font-semibold hover:bg-gold hover:text-forest transition-colors duration-300 shadow-md flex items-center justify-center space-x-2 min-h-[48px] group cursor-pointer"
                  >
                    <User className="w-4 h-4 shrink-0" />
                    <div className="relative">
                      <span className="whitespace-nowrap flex items-center gap-1.5">
                        {isLoggedIn ? 'Konto' : 'Einloggen'}
                        {isLoggedIn && alertCount > 0 && (
                          <span className="relative flex items-center justify-center text-gold group-hover:text-forest">
                            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
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
    </>
  );
}
