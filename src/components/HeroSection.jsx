import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data';
import { navigateTo } from '../utils/navigation';

export default function HeroSection({ onSearch, onExploreClick, onSellClick, searchRef }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 1. Initial check of localStorage / sessionStorage / URL Params
    const checkStorageOrUrl = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const loggedInParam = urlParams.get('loggedIn');
        if (loggedInParam === 'true') return true;
        if (loggedInParam === 'false') return false;

        const localVal = localStorage.getItem('loggedIn');
        if (localVal === 'true') return true;
        if (localVal === 'false') return false;

        const sessionVal = sessionStorage.getItem('loggedIn');
        if (sessionVal === 'true') return true;
        if (sessionVal === 'false') return false;
      } catch (e) {
        // ignore storage errors
      }
      return null;
    };

    const initialVal = checkStorageOrUrl();
    if (initialVal !== null) {
      setIsLoggedIn(initialVal);
    }

    // 2. Intercept console logs
    const originalLog = console.log;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    const parseLogText = (logText) => {
      const normalized = logText.toLowerCase().replace(/\s+/g, '');
      if (normalized.includes('loggedin:true') || normalized.includes('loggedin=true')) {
        setIsLoggedIn(true);
      } else if (normalized.includes('loggedin:false') || normalized.includes('loggedin=false')) {
        setIsLoggedIn(false);
      }
    };

    const interceptor = (originalFunc) => {
      return function (...args) {
        originalFunc.apply(console, args);
        try {
          if (args[0] === 'loggedIn') {
            if (args[1] === true || args[1] === 'true') {
              setIsLoggedIn(true);
              return;
            } else if (args[1] === false || args[1] === 'false') {
              setIsLoggedIn(false);
              return;
            }
          }

          for (const arg of args) {
            if (arg && typeof arg === 'object' && arg.loggedIn !== undefined) {
              setIsLoggedIn(!!arg.loggedIn);
              return;
            }
          }

          const logText = args
            .map((arg) => {
              try {
                return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
              } catch (e) {
                return '';
              }
            })
            .join(' ');
          parseLogText(logText);
        } catch (e) {
          // ignore
        }
      };
    };

    console.log = interceptor(originalLog);
    console.info = interceptor(originalInfo);
    console.warn = interceptor(originalWarn);
    console.error = interceptor(originalError);

    // 3. Listen to window message events (e.g. from Bubble iframe)
    const handleMsg = (event) => {
      try {
        if (event.data) {
          if (typeof event.data === 'string') {
            parseLogText(event.data);
          } else if (typeof event.data === 'object') {
            if (event.data.loggedIn !== undefined) {
              setIsLoggedIn(!!event.data.loggedIn);
            } else if (event.data.type === 'loggedIn' || event.data.event === 'loggedIn') {
              setIsLoggedIn(!!event.data.value);
            }
          }
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('message', handleMsg);

    // 4. Poll storage
    const interval = setInterval(() => {
      const currentVal = checkStorageOrUrl();
      if (currentVal !== null) {
        setIsLoggedIn(currentVal);
      }
    }, 1000);

    return () => {
      console.log = originalLog;
      console.info = originalInfo;
      console.warn = originalWarn;
      console.error = originalError;
      window.removeEventListener('message', handleMsg);
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo(`/all_listings?kw=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[48px] mt-34 sm:mt-34 md:mt-36 mb-12 mx-4 md:mx-8 lg:mx-12 shadow-2xl border border-forest/10"
    >
      {/* Background Cinematic Image with Zoom Animation */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="/hero-campuna.png"
            alt="Cinematic luxury camping under starry night"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        {/* Deep luxurious multi-layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60  to-black/40" />
        {/* <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/30" /> */}
      </div>

      {/* Floating Sparkles Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,169,107,0.08),transparent_50%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col justify-between w-full h-full min-h-[70vh] md:min-h-[75vh]">

        {/* Top spacing helper */}
        <div className="hidden lg:block h-6" />

        {/* Central Content Column */}
        <div className="text-center max-w-4xl mx-auto my-auto pt-8">
          {/* Subtle Premium Badge */}


          {/* Luxury Large Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Alles rund ums Camping.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-beige to-white">
              An einem Ort.
            </span>
          </motion.h1>

          {/* Editorial Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-sans text-sm sm:text-md md:text-lg text-sand/85 leading-relaxed max-w-2xl mx-auto mb-10 font-light"
          >
            Campuna ist deine Camping-Plattform für Deutschland. Entdecke Angebote, Anbieter, Stellplätze, Ratgeber und Services rund ums Camping.
          </motion.p>

          {/* Action Buttons */}
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8"
            >
              <motion.button
                onClick={onExploreClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-gradient-to-r from-gold to-beige text-forest hover:brightness-110 font-sans font-semibold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 text-[12px]  tracking-wider"
              >
                Ich bin Camper
              </motion.button>
              <motion.button
                onClick={onSellClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-sans font-semibold py-3 px-6 rounded-full transition-all duration-300 text-[12px]  tracking-wider"
              >
                Ich bin Anbieter
              </motion.button>
            </motion.div>
          )}

          {/* Advanced Search Bar Component */}
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white/20 backdrop-blur-xl border border-white/15 px-3 py-1 rounded-full shadow-2xl max-w-3xl mx-auto mb-16 relative group"
          >
            <form onSubmit={handleSubmit} className="flex flex-row items-center gap-1">
              {/* Keyword Search Input */}
              <div className="flex items-center space-x-3 px-4 py-2 flex-1 md:border-r border-white/10">

                <input
                  type="text"
                  placeholder="Z.B. Morelo, Dachzelt, Kabe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-sand/65 focus:outline-none w-full font-sans text-sm"
                />
              </div>


              {/* Search Button */}
              <button
                type="submit"
                className="text-gold font-sans font-semibold p-2 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 shrink-0"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>



      </div>
    </section>
  );
}
