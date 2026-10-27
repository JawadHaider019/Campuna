import React from 'react';
import { motion } from 'motion/react';
import { Compass, Search, Plus, Building2, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MobileBottomNav({ isLoggedIn = false, user = null }) {
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === '/';
    const isInserate = location.pathname.startsWith('/all_listings') || location.pathname.startsWith('/listing_details');
    const isCreateListing = location.pathname.startsWith('/create_listing') || location.pathname.startsWith('/create-listing');
    const isAnbieter = location.pathname.startsWith('/all_business');
    const isAccount = location.pathname.startsWith('/my_account') || location.pathname.startsWith('/auth');

    const handleTabClick = (target) => {
        if (target === 'home') {
            if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                navigate('/');
            }
        } else if (target === 'inserate') {
            navigate('/all_listings');
        } else if (target === 'create') {
            navigate('/create_listing');
        } else if (target === 'anbieter') {
            navigate('/all_business');
        } else if (target === 'account') {
            navigate(isLoggedIn ? '/my_account' : '/auth');
        }
    };

    return (
        <nav
            aria-label="Mobile Navigation"
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-forest/10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] select-none"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.35rem)' }}
        >
            <div className="flex items-center justify-between px-3 pt-1.5 pb-1 max-w-md mx-auto">
                {/* 1. Entdecken / Home */}
                <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleTabClick('home')}
                    className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative cursor-pointer ${
                        isHome ? 'text-forest font-black' : 'text-charcoal/70 hover:text-charcoal/90 font-medium'
                    }`}
                >
                    <div className="relative">
                        <Compass className={`w-5 h-5 transition-transform duration-200 ${isHome ? 'scale-110 text-forest' : ''}`} />
                    </div>
                    <span className="text-[10px] mt-1 tracking-tight">Entdecken</span>
                </motion.button>

                {/* 2. Inserate / Suchen */}
                <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleTabClick('inserate')}
                    className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative cursor-pointer ${
                        isInserate ? 'text-forest font-black' : 'text-charcoal/70 hover:text-charcoal/90 font-medium'
                    }`}
                >
                    <div className="relative">
                        <Search className={`w-5 h-5 transition-transform duration-200 ${isInserate ? 'scale-110 text-forest' : ''}`} />
                    </div>
                    <span className="text-[10px] mt-1 tracking-tight">Inserate</span>
                </motion.button>

                {/* 3. Inserieren (Hero Raised Center Button) */}
                <div className="flex-1 flex flex-col items-center justify-center relative -mt-4">
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTabClick('create')}
                        aria-label="Inserat erstellen"
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border-[3px] border-white cursor-pointer relative ${
                            isCreateListing
                                ? 'bg-gradient-to-tr from-gold via-[#dfbe7f] to-[#c8a96b] text-forest shadow-[0_6px_20px_rgba(200,169,107,0.45)]'
                                : 'bg-gradient-to-tr from-[#004709] via-forest to-[#1b5e20] text-sand shadow-[0_6px_20px_rgba(0,47,20,0.35)]'
                        }`}
                    >
                        <div
                            className={`absolute inset-0 rounded-full blur-md -z-10 ${
                                isCreateListing ? 'bg-gold/40' : 'bg-forest/30'
                            }`}
                        />
                        <Plus className={`w-6 h-6 stroke-[2.5] ${isCreateListing ? 'text-forest' : 'text-gold'}`} />
                    </motion.button>
                    <span className={`text-[10px] mt-0.5 tracking-tight font-bold ${
                        isCreateListing ? 'text-forest font-black' : 'text-charcoal/80'
                    }`}>
                        Inserieren
                    </span>
                </div>

                {/* 4. Anbieter */}
                <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleTabClick('anbieter')}
                    className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative cursor-pointer ${
                        isAnbieter ? 'text-forest font-black' : 'text-charcoal/70 hover:text-charcoal/90 font-medium'
                    }`}
                >
                    <div className="relative">
                        <Building2 className={`w-5 h-5 transition-transform duration-200 ${isAnbieter ? 'scale-110 text-forest' : ''}`} />
                    </div>
                    <span className="text-[10px] mt-1 tracking-tight">Anbieter</span>
                </motion.button>

                {/* 5. Konto / Profil */}
                <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleTabClick('account')}
                    className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative cursor-pointer ${
                        isAccount ? 'text-forest font-black' : 'text-charcoal/70 hover:text-charcoal/90 font-medium'
                    }`}
                >
                    <div className="relative">
                        {isLoggedIn && user?.avatar ? (
                            <div className={`w-5 h-5 rounded-full overflow-hidden border transition-all ${
                                isAccount ? 'border-forest ring-2 ring-forest/20' : 'border-forest/20'
                            }`}>
                                <img
                                    src={user.avatar}
                                    alt="Profil"
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-white" />
                            </div>
                        ) : (
                            <User className={`w-5 h-5 transition-transform duration-200 ${isAccount ? 'scale-110 text-forest' : ''}`} />
                        )}
                    </div>
                    <span className="text-[10px] mt-1 tracking-tight">
                        {isLoggedIn ? 'Mein Konto' : 'Anmelden'}
                    </span>
                </motion.button>
            </div>
        </nav>
    );
}
