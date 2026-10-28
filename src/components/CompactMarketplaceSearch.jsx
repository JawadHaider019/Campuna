import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, MapPin, ChevronDown, Check, X, Layers } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { CATEGORIES, FEATURED_LISTINGS } from '../data';
import { formatCleanLocation, isListingSold } from '../utils/formatters';

const QUICK_SEARCH_LINKS = [
    { label: 'Wohnwagen', to: '/category/wohnmobile-camper' },
    { label: 'Campervan', to: '/category/wohnmobile-camper' },
    { label: 'Vorzelt', to: '/category/camping-zubehoer' },
    { label: 'Dachzelt', to: '/category/zelte-dachzelte' },
    { label: 'Stellplatz', to: '/category/stellplaetze' },
    { label: 'Fahrradträger', to: '/category/fahrraeder-traeger' },
    { label: 'Campingstuhl', to: '/category/camping-zubehoer' }
];

export default function CompactMarketplaceSearch({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    onSearchSubmit
}) {
    const navigate = useNavigate();
    const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
    const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);

    const catRef = useRef(null);
    const locRef = useRef(null);

    // Extract unique German locations that actually have listings in Campuna
    const availableLocations = useMemo(() => {
        const locMap = new Map();
        FEATURED_LISTINGS.forEach(item => {
            if (!isListingSold(item) && item.location) {
                const loc = formatCleanLocation(item.location);
                if (loc && loc !== 'Deutschland') {
                    locMap.set(loc, (locMap.get(loc) || 0) + 1);
                }
            }
        });
        return Array.from(locMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name, 'de'));
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (catRef.current && !catRef.current.contains(e.target)) {
                setIsCatDropdownOpen(false);
            }
            if (locRef.current && !locRef.current.contains(e.target)) {
                setIsLocDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFormSubmit = (e) => {
        if (e) e.preventDefault();
        setIsCatDropdownOpen(false);
        setIsLocDropdownOpen(false);

        if (onSearchSubmit) {
            onSearchSubmit({
                query: searchQuery,
                category: selectedCategory,
                location: selectedLocation
            });
        } else {
            const params = new URLSearchParams();
            if (searchQuery.trim()) params.set('kw', searchQuery.trim());
            if (selectedCategory.trim()) params.set('cat', selectedCategory.trim());
            if (selectedLocation.trim()) params.set('loc', selectedLocation.trim());
            const qs = params.toString();
            navigate(qs ? `/all_listings?${qs}` : '/all_listings');
        }
    };

    const handleSelectCategory = (catName) => {
        setSelectedCategory(catName);
        setIsCatDropdownOpen(false);
        if (onSearchSubmit) {
            onSearchSubmit({
                query: searchQuery,
                category: catName,
                location: selectedLocation
            });
        }
    };

    const handleSelectLocation = (locName) => {
        setSelectedLocation(locName);
        setIsLocDropdownOpen(false);
        if (onSearchSubmit) {
            onSearchSubmit({
                query: searchQuery,
                category: selectedCategory,
                location: locName
            });
        }
    };

    const handleQuickTagClick = (tag) => {
        setSearchQuery(tag);
        if (onSearchSubmit) {
            onSearchSubmit({
                query: tag,
                category: selectedCategory,
                location: selectedLocation
            });
        }
    };

    return (
        <div className="relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-gradient-to-b from-[#FAF8F5] via-[#F6F3EC] to-[#FAF8F5] border border-forest/10 shadow-[0_8px_30px_-10px_rgba(0,40,10,0.05)] z-20">
            {/* Subtle background ambient radial glow contained inside rounded card */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(200,169,107,0.12),transparent_70%)]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(0,99,13,0.05),transparent_70%)]" />
            </div>

            <div className="relative z-10">
                {/* Main Headline (compact) */}
                <h1 className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-charcoal tracking-tight leading-snug mb-2.5 sm:mb-3">
                    Alles rund ums Camping entdecken
                </h1>

                {/* Form Search Console */}
                <form onSubmit={handleFormSubmit}>
                    {/* DESKTOP & TABLET UNIFIED BAR (md and up) */}
                    <div className="hidden md:flex items-center bg-white rounded-4xl border border-gray-200/90 shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10 p-2 transition-all">
                        {/* 1. Main Search Field */}
                        <div className="flex-1 flex items-center px-3.5 py-1 min-w-[200px]">
                            <Search className="w-5 h-5 text-forest shrink-0 mr-3" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/40 leading-none mb-1">
                                    Was suchst du?
                                </label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="z.B. Wohnwagen, Campervan, Vorzelt..."
                                    className="w-full bg-transparent text-sm text-charcoal placeholder-gray-400 font-medium focus:outline-none truncate"
                                />
                            </div>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="p-1 text-gray-400 hover:text-charcoal"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="w-px h-10 bg-gray-200 shrink-0 mx-1" />

                        {/* 2. Category Dropdown */}
                        <div className="relative" ref={catRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCatDropdownOpen(prev => !prev);
                                    setIsLocDropdownOpen(false);
                                }}
                                className="flex items-center px-4 py-1 text-left min-w-[170px] max-w-[210px] hover:bg-sand/40 rounded-xl transition-colors"
                            >
                                <Layers className="w-4 h-4 text-forest shrink-0 mr-2.5" />
                                <div className="flex-1 min-w-0">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/40 leading-none mb-1">
                                        Kategorie
                                    </span>
                                    <span className="block text-sm font-medium text-charcoal truncate">
                                        {selectedCategory || 'Alle Kategorien'}
                                    </span>
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 ml-2 transition-transform ${isCatDropdownOpen ? 'rotate-180 text-forest' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isCatDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-72 overflow-y-auto">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectCategory('')}
                                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-sand/60 transition-colors ${!selectedCategory ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'}`}
                                    >
                                        <span>Alle Kategorien</span>
                                        {!selectedCategory && <Check className="w-4 h-4 text-forest shrink-0" />}
                                    </button>
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => handleSelectCategory(cat.name)}
                                            className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-sand/60 transition-colors ${selectedCategory === cat.name ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'}`}
                                        >
                                            <span className="truncate">{cat.name}</span>
                                            {selectedCategory === cat.name && <Check className="w-4 h-4 text-forest shrink-0" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="w-px h-10 bg-gray-200 shrink-0 mx-1" />

                        {/* 3. Simple Location Dropdown (Germany locations that have listings) */}
                        <div className="relative" ref={locRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLocDropdownOpen(prev => !prev);
                                    setIsCatDropdownOpen(false);
                                }}
                                className="flex items-center px-4 py-1 text-left min-w-[170px] max-w-[220px] hover:bg-sand/40 rounded-xl transition-colors"
                            >
                                <MapPin className="w-4 h-4 text-gold shrink-0 mr-2.5" />
                                <div className="flex-1 min-w-0">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/40 leading-none mb-1">
                                        Standort
                                    </span>
                                    <span className="block text-sm font-medium text-charcoal truncate">
                                        {selectedLocation || 'Ganz Deutschland'}
                                    </span>
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 ml-2 transition-transform ${isLocDropdownOpen ? 'rotate-180 text-forest' : ''}`} />
                            </button>

                            {/* Location Dropdown Menu */}
                            {isLocDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-72 overflow-y-auto">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectLocation('')}
                                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-sand/60 transition-colors ${!selectedLocation ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'}`}
                                    >
                                        <span>Ganz Deutschland</span>
                                        {!selectedLocation && <Check className="w-4 h-4 text-forest shrink-0" />}
                                    </button>
                                    {availableLocations.map(loc => (
                                        <button
                                            key={loc.name}
                                            type="button"
                                            onClick={() => handleSelectLocation(loc.name)}
                                            className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-sand/60 transition-colors ${selectedLocation === loc.name ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'}`}
                                        >
                                            <span className="truncate">{loc.name}</span>
                                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                                <span className="text-[10px] text-charcoal/40 font-mono">({loc.count})</span>
                                                {selectedLocation === loc.name && <Check className="w-3.5 h-3.5 text-forest shrink-0" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-forest hover:bg-forest/90 text-white font-semibold text-sm px-6 py-3 rounded-3xl flex items-center gap-2 shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer ml-1"
                        >
                            <Search className="w-4 h-4 text-gold" />
                            <span>Finden</span>
                        </button>
                    </div>

                    {/* MOBILE CONSOLE (under md) */}
                    <div className="md:hidden bg-white rounded-xl border border-gray-200/90 p-2.5 sm:p-3 shadow-xs space-y-2">
                        {/* 1. Main Search Field */}
                        <div className="relative flex items-center bg-sand/30 rounded-lg border border-gray-200/90 px-3 py-2 focus-within:border-forest/60 focus-within:bg-white transition-all">
                            <Search className="w-4 h-4 text-forest shrink-0 mr-2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Was suchst du?"
                                className="w-full bg-transparent text-sm text-charcoal placeholder-gray-400 font-normal focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="p-1 text-gray-400 hover:text-charcoal"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* 2. Split Row: Category & Simple Location dropdowns */}
                        <div className="grid grid-cols-2 gap-2">
                            {/* Category Dropdown (Mobile) */}
                            <div className="relative" ref={catRef}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCatDropdownOpen(prev => !prev);
                                        setIsLocDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between bg-sand/30 rounded-lg border px-2.5 py-2 text-xs font-medium transition-all ${selectedCategory
                                        ? 'border-forest text-forest bg-forest/5'
                                        : 'border-gray-200/90 text-charcoal'
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5 truncate pr-1">
                                        <Layers className="w-3.5 h-3.5 text-forest shrink-0" />
                                        <span className="truncate">
                                            {selectedCategory || 'Kategorie'}
                                        </span>
                                    </div>
                                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${isCatDropdownOpen ? 'rotate-180 text-forest' : ''}`} />
                                </button>

                                {isCatDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-1.5 w-64 max-w-[90vw] bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-60 overflow-y-auto">
                                        <button
                                            type="button"
                                            onClick={() => handleSelectCategory('')}
                                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${!selectedCategory ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                }`}
                                        >
                                            <span>Alle Kategorien</span>
                                            {!selectedCategory && <Check className="w-3.5 h-3.5 text-forest shrink-0" />}
                                        </button>
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => handleSelectCategory(cat.name)}
                                                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${selectedCategory === cat.name ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                    }`}
                                            >
                                                <span className="truncate">{cat.name}</span>
                                                {selectedCategory === cat.name && <Check className="w-3.5 h-3.5 text-forest shrink-0" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Simple Location Dropdown (Mobile) */}
                            <div className="relative" ref={locRef}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLocDropdownOpen(prev => !prev);
                                        setIsCatDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between bg-sand/30 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${selectedLocation
                                        ? 'border-forest text-forest bg-forest/5'
                                        : 'border-gray-200/90 text-charcoal'
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5 truncate pr-1">
                                        <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                                        <span className="truncate">
                                            {selectedLocation || 'Standort'}
                                        </span>
                                    </div>
                                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${isLocDropdownOpen ? 'rotate-180 text-forest' : ''}`} />
                                </button>

                                {isLocDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-1.5 w-64 max-w-[90vw] bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-60 overflow-y-auto">
                                        <button
                                            type="button"
                                            onClick={() => handleSelectLocation('')}
                                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${!selectedLocation ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'}`}
                                        >
                                            <span>Ganz Deutschland</span>
                                            {!selectedLocation && <Check className="w-3.5 h-3.5 text-forest shrink-0" />}
                                        </button>
                                        {availableLocations.map(loc => (
                                            <button
                                                key={loc.name}
                                                type="button"
                                                onClick={() => handleSelectLocation(loc.name)}
                                                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${selectedLocation === loc.name ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'}`}
                                            >
                                                <span className="truncate">{loc.name}</span>
                                                <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                                                    <span className="text-[10px] text-charcoal/40 font-mono">({loc.count})</span>
                                                    {selectedLocation === loc.name && <Check className="w-3.5 h-3.5 text-forest shrink-0" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. Mobile Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-forest hover:bg-forest/90 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors"
                        >
                            <Search className="w-4 h-4 text-gold" />
                            <span>Inserate finden</span>
                        </button>
                    </div>
                </form>

                {/* Popular Quick Search Chips */}
                <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-charcoal/50 uppercase tracking-wider shrink-0 mr-0.5">
                        Häufig gesucht:
                    </span>
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                        {QUICK_SEARCH_LINKS.map(item => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full border bg-white/90 hover:bg-white text-charcoal/80 hover:text-forest border-gray-200/80 hover:border-forest/30 shadow-2xs transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
