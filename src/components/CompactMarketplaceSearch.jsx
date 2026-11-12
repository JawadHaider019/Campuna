import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Search, MapPin, ChevronDown, Check, X, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data';
import { formatCleanLocation, isListingSold } from '../utils/formatters';

const QUICK_SEARCH_LINKS = [
    { label: 'Wohnwagen', to: '/kategorie/wohnmobile-camper' },
    { label: 'Campervan', to: '/kategorie/wohnmobile-camper' },
    { label: 'Vorzelt', to: '/kategorie/camping-zubehoer' },
    { label: 'Dachzelt', to: '/kategorie/zelte-dachzelte' },
    { label: 'Stellplatz', to: '/kategorie/stellplaetze' },
    { label: 'Wohnmobil mieten', to: '/kategorie/mieten-vermieten' },
    { label: 'Fahrradträger', to: '/kategorie/fahrraeder-traeger' },
    { label: 'Campingstuhl', to: '/kategorie/camping-zubehoer' },
];

export default function CompactMarketplaceSearch({
    searchQuery: controlledSearchQuery,
    setSearchQuery: setControlledSearchQuery,
    selectedCategory: controlledCategory,
    setSelectedCategory: setControlledCategory,
    selectedLocation: controlledLocation,
    setSelectedLocation: setControlledLocation,
    onSearchSubmit,
    listings = []
}) {
    const navigate = useNavigate();

    // Internal state if not controlled from parent
    const [internalSearchQuery, setInternalSearchQuery] = useState('');
    const [internalCategory, setInternalCategory] = useState('');
    const [internalLocation, setInternalLocation] = useState('');

    const searchQuery = controlledSearchQuery !== undefined ? controlledSearchQuery : internalSearchQuery;
    const setSearchQuery = setControlledSearchQuery || setInternalSearchQuery;

    const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;
    const setSelectedCategory = setControlledCategory || setInternalCategory;

    const selectedLocation = controlledLocation !== undefined ? controlledLocation : internalLocation;
    const setSelectedLocation = setControlledLocation || setInternalLocation;

    const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
    const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);

    const catRef = useRef(null);
    const locRef = useRef(null);

    // Dynamic locations extracted from active listings or German cities
    const availableLocations = useMemo(() => {
        const locMap = new Map();

        if (Array.isArray(listings) && listings.length > 0) {
            listings.forEach((item) => {
                if (!isListingSold(item) && item.location) {
                    const loc = formatCleanLocation(item.location);
                    if (loc && loc !== 'Deutschland') {
                        locMap.set(loc, (locMap.get(loc) || 0) + 1);
                    }
                }
            });
        }

        // Fallback popular cities if listings pool is small
        if (locMap.size === 0) {
            const fallbackCities = ['Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Leipzig', 'Nürnberg'];
            fallbackCities.forEach(city => locMap.set(city, 1));
        }

        return Array.from(locMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name, 'de'));
    }, [listings]);

    // Close dropdowns on outside click
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

    const executeSearch = useCallback((overrideQuery, overrideCategory, overrideLoc) => {
        const q = overrideQuery !== undefined ? overrideQuery : searchQuery;
        const c = overrideCategory !== undefined ? overrideCategory : selectedCategory;
        const l = overrideLoc !== undefined ? overrideLoc : selectedLocation;

        if (onSearchSubmit) {
            onSearchSubmit({ query: q, category: c, location: l });
            return;
        }

        const params = new URLSearchParams();
        if (q?.trim()) params.set('kw', q.trim());
        if (c?.trim()) params.set('cat', c.trim());
        if (l?.trim()) params.set('loc', l.trim());

        const qs = params.toString();
        navigate(qs ? `/all_listings?${qs}` : '/all_listings');
    }, [searchQuery, selectedCategory, selectedLocation, onSearchSubmit, navigate]);

    const handleFormSubmit = (e) => {
        if (e) e.preventDefault();
        setIsCatDropdownOpen(false);
        setIsLocDropdownOpen(false);
        executeSearch();
    };

    const handleSelectCategory = (catName) => {
        setSelectedCategory(catName);
        setIsCatDropdownOpen(false);
        executeSearch(searchQuery, catName, selectedLocation);
    };

    const handleSelectLocation = (locName) => {
        setSelectedLocation(locName);
        setIsLocDropdownOpen(false);
        executeSearch(searchQuery, selectedCategory, locName);
    };

    return (
        <div className="relative rounded-2xl sm:rounded-3xl mt-10 p-2 sm:p-3.5 md:p-4 border border-forest/15 shadow-[0_4px_20px_-8px_rgba(0,40,10,0.06)] z-30">
            {/* Background hero image layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
                <img src="/hero.webp" alt="Camping Hintergrund" className="w-full h-full object-cover object-[center_50%]" />
                {/* Soft natural tint: keeps the camping landscape visible while ensuring the text has strong contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/35" />
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]" />
            </div>

            <div className="relative z-10">
                {/* Main Headline & Subtitle */}
                <div className="mb-2 sm:mb-2.5 text-center sm:text-left">
                    <h1 className="font-display font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-tight leading-tight drop-shadow-xs">
                        Dein Marktplatz rund ums Camping
                    </h1>
                    <p className="font-sans text-[11px] sm:text-xs md:text-sm text-white/85 tracking-normal leading-relaxed mt-1 max-w-3xl drop-shadow-xs font-normal">
                        Kaufen, verkaufen, mieten: Fahrzeuge, Zubehör, Stellplätze und Anbieter an einem Ort. Angebote von privat und von Profis aus ganz Deutschland.
                    </p>
                </div>

                {/* Form Search Console */}
                <form onSubmit={handleFormSubmit}>
                    {/* DESKTOP UNIFIED BAR (lg and up) - Frosted Glass & Transparency */}
                    <div className="hidden lg:flex items-center bg-white/70 hover:bg-white/80 focus-within:bg-white/90 backdrop-blur-md rounded-4xl border border-white/60 shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-forest/40 focus-within:ring-2 focus-within:ring-forest/15 p-2 transition-all">
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
                                    className="p-1 text-gray-400 hover:text-charcoal cursor-pointer"
                                    aria-label="Eingabe löschen"
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
                                    setIsCatDropdownOpen((prev) => !prev);
                                    setIsLocDropdownOpen(false);
                                }}
                                className="flex items-center px-4 py-1 text-left min-w-[170px] max-w-[210px] hover:bg-sand/40 rounded-xl transition-colors cursor-pointer"
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
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-gray-400 shrink-0 ml-2 transition-transform ${isCatDropdownOpen ? 'rotate-180 text-forest' : ''
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isCatDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-72 overflow-y-auto">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectCategory('')}
                                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-sand/60 transition-colors ${!selectedCategory ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                            }`}
                                    >
                                        <span>Alle Kategorien</span>
                                        {!selectedCategory && <Check className="w-4 h-4 text-forest shrink-0" />}
                                    </button>
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => handleSelectCategory(cat.name)}
                                            className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-sand/60 transition-colors ${selectedCategory === cat.name ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                }`}
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

                        {/* 3. Location Dropdown */}
                        <div className="relative" ref={locRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLocDropdownOpen((prev) => !prev);
                                    setIsCatDropdownOpen(false);
                                }}
                                className="flex items-center px-4 py-1 text-left min-w-[170px] max-w-[220px] hover:bg-sand/40 rounded-xl transition-colors cursor-pointer"
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
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-gray-400 shrink-0 ml-2 transition-transform ${isLocDropdownOpen ? 'rotate-180 text-forest' : ''
                                        }`}
                                />
                            </button>

                            {/* Location Dropdown Menu */}
                            {isLocDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-72 overflow-y-auto">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectLocation('')}
                                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-sand/60 transition-colors ${!selectedLocation ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                            }`}
                                    >
                                        <span>Ganz Deutschland</span>
                                        {!selectedLocation && <Check className="w-4 h-4 text-forest shrink-0" />}
                                    </button>
                                    {availableLocations.map((loc) => (
                                        <button
                                            key={loc.name}
                                            type="button"
                                            onClick={() => handleSelectLocation(loc.name)}
                                            className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-sand/60 transition-colors ${selectedLocation === loc.name ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                }`}
                                        >
                                            <span className="truncate">{loc.name}</span>
                                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                                {loc.count > 1 && (
                                                    <span className="text-[10px] text-charcoal/40 font-mono">({loc.count})</span>
                                                )}
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
                            className="bg-forest hover:bg-forest/90 text-white font-semibold text-sm px-6 py-3 rounded-3xl flex items-center gap-2 shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer ml-1"
                        >
                            <Search className="w-4 h-4 text-gold" />
                            <span>Finden</span>
                        </button>
                    </div>

                    {/* TABLET CONSOLE (md to lg): Frosted glass console */}
                    <div className="hidden md:flex lg:hidden flex-col bg-white/70 hover:bg-white/80 focus-within:bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 p-2.5 shadow-md space-y-2">
                        {/* Row 1: Search Query Input with Search Icon */}
                        <div className="flex items-center bg-[#FAF8F5] rounded-xl border border-gray-200/90 px-3.5 py-2 focus-within:border-forest/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-forest/10 transition-all">
                            <Search className="w-4 h-4 text-forest shrink-0 mr-2.5" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[9.5px] font-bold uppercase tracking-wider text-charcoal/40 leading-none mb-0.5">
                                    Was suchst du?
                                </label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="z.B. Wohnwagen, Campervan, Vorzelt..."
                                    className="w-full bg-transparent text-sm text-charcoal placeholder-gray-400 font-medium focus:outline-none"
                                />
                            </div>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="p-1 text-gray-400 hover:text-charcoal cursor-pointer"
                                    aria-label="Eingabe löschen"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Row 2: Category, Location & Action Button */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                            {/* Category Dropdown */}
                            <div className="col-span-5 relative" ref={catRef}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCatDropdownOpen((prev) => !prev);
                                        setIsLocDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between bg-[#FAF8F5] rounded-xl border px-3 py-2 text-xs font-medium transition-all cursor-pointer ${selectedCategory
                                        ? 'border-forest text-forest bg-forest/5 font-semibold'
                                        : 'border-gray-200/90 text-charcoal/80 hover:bg-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 truncate pr-1">
                                        <Layers className="w-3.5 h-3.5 text-forest shrink-0" />
                                        <div className="text-left truncate">
                                            <span className="block text-[9px] font-bold uppercase text-charcoal/40 leading-none">Kategorie</span>
                                            <span className="truncate text-xs">{selectedCategory || 'Alle Kategorien'}</span>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${isCatDropdownOpen ? 'rotate-180 text-forest' : ''
                                            }`}
                                    />
                                </button>

                                {isCatDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-64 overflow-y-auto">
                                        <button
                                            type="button"
                                            onClick={() => handleSelectCategory('')}
                                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${!selectedCategory ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                }`}
                                        >
                                            <span>Alle Kategorien</span>
                                            {!selectedCategory && <Check className="w-3.5 h-3.5 text-forest shrink-0" />}
                                        </button>
                                        {CATEGORIES.map((cat) => (
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

                            {/* Location Dropdown */}
                            <div className="col-span-4 relative" ref={locRef}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLocDropdownOpen((prev) => !prev);
                                        setIsCatDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between bg-[#FAF8F5] rounded-xl border px-3 py-2 text-xs font-medium transition-all cursor-pointer ${selectedLocation
                                        ? 'border-forest text-forest bg-forest/5 font-semibold'
                                        : 'border-gray-200/90 text-charcoal/80 hover:bg-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 truncate pr-1">
                                        <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                                        <div className="text-left truncate">
                                            <span className="block text-[9px] font-bold uppercase text-charcoal/40 leading-none">Standort</span>
                                            <span className="truncate text-xs">{selectedLocation || 'Ganz Deutschland'}</span>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${isLocDropdownOpen ? 'rotate-180 text-forest' : ''
                                            }`}
                                    />
                                </button>

                                {isLocDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-64 overflow-y-auto">
                                        <button
                                            type="button"
                                            onClick={() => handleSelectLocation('')}
                                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${!selectedLocation ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                }`}
                                        >
                                            <span>Ganz Deutschland</span>
                                            {!selectedLocation && <Check className="w-3.5 h-3.5 text-forest shrink-0" />}
                                        </button>
                                        {availableLocations.map((loc) => (
                                            <button
                                                key={loc.name}
                                                type="button"
                                                onClick={() => handleSelectLocation(loc.name)}
                                                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${selectedLocation === loc.name ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                    }`}
                                            >
                                                <span className="truncate">{loc.name}</span>
                                                <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                                                    {loc.count > 1 && (
                                                        <span className="text-[10px] text-charcoal/40 font-mono">({loc.count})</span>
                                                    )}
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
                                className="col-span-3 h-full bg-forest hover:bg-forest/90 text-white font-semibold text-xs sm:text-sm py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
                            >
                                <Search className="w-3.5 h-3.5 text-gold shrink-0" />
                                <span>Finden</span>
                            </button>
                        </div>
                    </div>

                    {/* MOBILE CONSOLE (under md): Frosted glass, compact & elegant */}
                    <div className="md:hidden bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 p-2.5 shadow-md space-y-2">
                        {/* 1. Main Search Field */}
                        <div className="relative flex items-center bg-[#FAF8F5] rounded-xl border border-gray-200/90 px-3 py-1.5 focus-within:border-forest/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-forest/10 transition-all">
                            <Search className="w-4 h-4 text-forest shrink-0 mr-2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Was suchst du? (z.B. Wohnwagen...)"
                                className="w-full bg-transparent text-xs sm:text-sm text-charcoal placeholder-gray-400 font-medium focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="p-1 text-gray-400 hover:text-charcoal cursor-pointer"
                                    aria-label="Löschen"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* 2. Split Row: Category & Location dropdowns */}
                        <div className="grid grid-cols-2 gap-2">
                            {/* Category Dropdown (Mobile) */}
                            <div className="relative" ref={catRef}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCatDropdownOpen((prev) => !prev);
                                        setIsLocDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between bg-[#FAF8F5] rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${selectedCategory
                                        ? 'border-forest text-forest bg-forest/5 font-semibold'
                                        : 'border-gray-200/90 text-charcoal/80 hover:bg-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5 truncate pr-1">
                                        <Layers className="w-3.5 h-3.5 text-forest shrink-0" />
                                        <span className="truncate">
                                            {selectedCategory || 'Kategorie'}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${isCatDropdownOpen ? 'rotate-180 text-forest' : ''
                                            }`}
                                    />
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
                                        {CATEGORIES.map((cat) => (
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

                            {/* Location Dropdown (Mobile) */}
                            <div className="relative" ref={locRef}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLocDropdownOpen((prev) => !prev);
                                        setIsCatDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between bg-[#FAF8F5] rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${selectedLocation
                                        ? 'border-forest text-forest bg-forest/5 font-semibold'
                                        : 'border-gray-200/90 text-charcoal/80 hover:bg-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5 truncate pr-1">
                                        <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                                        <span className="truncate">
                                            {selectedLocation || 'Standort'}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${isLocDropdownOpen ? 'rotate-180 text-forest' : ''
                                            }`}
                                    />
                                </button>

                                {isLocDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-1.5 w-64 max-w-[90vw] bg-white rounded-xl shadow-xl border border-gray-150 py-1.5 z-50 max-h-60 overflow-y-auto">
                                        <button
                                            type="button"
                                            onClick={() => handleSelectLocation('')}
                                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${!selectedLocation ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                }`}
                                        >
                                            <span>Ganz Deutschland</span>
                                            {!selectedLocation && <Check className="w-3.5 h-3.5 text-forest shrink-0" />}
                                        </button>
                                        {availableLocations.map((loc) => (
                                            <button
                                                key={loc.name}
                                                type="button"
                                                onClick={() => handleSelectLocation(loc.name)}
                                                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-sand/60 ${selectedLocation === loc.name ? 'text-forest font-semibold bg-forest/5' : 'text-charcoal'
                                                    }`}
                                            >
                                                <span className="truncate">{loc.name}</span>
                                                <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                                                    {loc.count > 1 && (
                                                        <span className="text-[10px] text-charcoal/40 font-mono">({loc.count})</span>
                                                    )}
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
                            className="w-full bg-forest hover:bg-forest/90 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm py-2 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                        >
                            <Search className="w-3.5 h-3.5 text-gold" />
                            <span>Inserate finden</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

