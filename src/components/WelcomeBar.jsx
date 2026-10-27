import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeBar({ isLoggedIn = false }) {
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-r from-black via-forest to-black text-white border-b border-white/10 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 sm:py-0 min-h-[38px] sm:h-10 flex items-center justify-between gap-2 sm:gap-4 text-xs">
                
                {/* Left & Center: Announcement text */}
                <div className="flex items-center min-w-0 flex-1">
                    <p className="font-sans text-[10px] sm:text-xs text-sand/90 font-medium leading-tight sm:leading-normal">
                        <span>Private Inserate sind kostenlos.</span>{' '}
                        <button
                            type="button"
                            onClick={() => navigate(isLoggedIn ? '/create_listing' : '/auth')}
                            className="underline hover:text-gold transition-colors cursor-pointer"
                        >
                            Jetzt inserieren
                        </button>{' '}
                        oder{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/all_listings')}
                            className="underline hover:text-gold transition-colors cursor-pointer"
                        >
                            Angebote entdecken
                        </button>
                        .
                    </p>
                </div>

                {/* Right: Quick Action CTA */}
                <div className="flex items-center shrink-0">
                    <button
                        type="button"
                        onClick={() => navigate(isLoggedIn ? '/create_listing' : '/auth')}
                        className="inline-flex items-center gap-1 bg-white hover:bg-gold text-forest hover:text-forest font-sans font-extrabold text-[9px] sm:text-[11px] uppercase tracking-wider px-3 py-1 sm:px-4 sm:py-1 rounded-full transition-all duration-200 shadow-sm whitespace-nowrap cursor-pointer active:scale-95"
                    >
                        <span>{isLoggedIn ? 'Inserieren' : 'Kostenlos inserieren'}</span>
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </button>
                </div>

            </div>
        </motion.div>
    );
}
