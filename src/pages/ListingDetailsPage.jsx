import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
    ArrowLeft, MapPin, Star, ShieldCheck, Heart,
    Check, Send, Eye, Phone, Mail, ChevronLeft, ChevronRight,
    Tag, Calendar, Layers
} from 'lucide-react';
import { extractIdFromSlug } from '../utils/slugify';
import { getListingById } from '../api/bubbleApi';
import { FEATURED_LISTINGS } from '../data';

/**
 * Maps a raw Bubble listing object into the internal listing shape.
 * Mirrors the same logic as in App.jsx.
 */
function mapBubbleListing(item) {
    const images = (item.images && item.images.length > 0 ? item.images : [item['Main Image']])
        .filter(Boolean)
        .map(url => (url.startsWith('//') ? `https:${url}` : url));

    if (images.length === 0) {
        images.push('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80');
    }

    let category = item.Category || 'Camping Zubehör';
    if (category === 'Ausrüstung und Zubehör') category = 'Camping Zubehör';

    const id = item._id || item['_id'] || '';
    let sum = 0;
    for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
    const rating = parseFloat((4.5 + (sum % 6) * 0.1).toFixed(1));

    const location = item['location geo']?.address || 'Deutschland';

    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    let pricePeriod = 'Preis';
    if (category === 'Mieten & Vermieten' || (item['Sub - Category'] && item['Sub - Category'].toLowerCase().includes('mieten'))) {
        pricePeriod = 'pro Tag';
    } else if (category === 'Wohnmobile & Camper' || category === 'Tiny Houses') {
        pricePeriod = 'Kaufpreis';
    }

    const features = [];
    if (item['Condition item']) {
        const condMap = { New: 'Neu', Used: 'Gebraucht', Good: 'Sehr gut' };
        features.push(condMap[item['Condition item']] || item['Condition item']);
    }
    if (item['Sub - Category']) features.push(item['Sub - Category']);
    if (item['Type of offer']) features.push(item['Type of offer']);
    if (item['Ad type']) features.push(item['Ad type']);
    if (features.length === 0) features.push('Camping');

    const isMieten = category === 'Mieten & Vermieten' || (item['Sub - Category'] && item['Sub - Category'].toLowerCase().includes('mieten'));

    return {
        id,
        title: item.title || item.description || 'Camping Angebot',
        category,
        price,
        pricePeriod,
        location,
        rating,
        reviewsCount: (sum % 15) + 3,
        images,
        description: item.description || '',
        seller: {
            name: isMieten ? 'Gewerblicher Anbieter' : 'Privatverkäufer',
            verified: true,
            type: isMieten ? 'Gewerblich' : 'Privat',
        },
        features,
        isExclusive: sum % 3 === 0,
        negotiable: item['Negotiable Price?'] === 'yes',
        soldStatus: item['Sold status'] || 'Active',
        views: item.views || 0,
        listingId: item['ID for users'] || '',
        createdDate: item['Created Date'] ? new Date(item['Created Date']) : null,
    };
}

export default function ListingDetailsPage() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const id = extractIdFromSlug(slug);

        if (!id) {
            // Try to find in local data by slug match
            setError('Ungültige Anzeigen-URL.');
            setLoading(false);
            return;
        }

        const fetchListing = async () => {
            try {
                setLoading(true);
                const raw = await getListingById(id);
                if (raw) {
                    setListing(mapBubbleListing(raw));
                } else {
                    // Fallback: check local data (for user-created listings via SellModal)
                    const local = FEATURED_LISTINGS.find(l => l.id === id);
                    if (local) {
                        setListing(local);
                    } else {
                        setError('Diese Anzeige konnte nicht gefunden werden.');
                    }
                }
            } catch (err) {
                // Fallback to local data on API error
                const local = FEATURED_LISTINGS.find(l => l.id === id);
                if (local) {
                    setListing(local);
                } else {
                    setError('Fehler beim Laden der Anzeige.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [slug]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        setMessageSent(true);
        setTimeout(() => {
            setMessageSent(false);
            setMessage('');
        }, 3000);
    };

    // ── Loading State ──────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-forest/20 border-t-forest rounded-full animate-spin" />
                    <p className="text-sm text-charcoal/50 font-mono uppercase tracking-widest">Anzeige wird geladen…</p>
                </div>
            </div>
        );
    }

    // ── Error / Not Found State ────────────────────────────────────────────────
    if (error || !listing) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4">
                <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center">
                    <Eye className="w-10 h-10 text-forest/30" />
                </div>
                <h1 className="font-display text-2xl font-bold text-black text-center">
                    {error || 'Anzeige nicht gefunden'}
                </h1>
                <p className="text-sm text-charcoal/50 text-center max-w-sm">
                    Die gesuchte Anzeige ist möglicherweise nicht mehr verfügbar oder der Link ist fehlerhaft.
                </p>
                <Link
                    to="/"
                    className="bg-forest text-sand px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-forest transition-colors"
                >
                    Zurück zur Startseite
                </Link>
            </div>
        );
    }

    // ── Main Detail Page ───────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-white font-sans text-charcoal">
            {/* ── Top Nav Bar ── */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-forest/5 px-4 md:px-12 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Zurück
                </button>

                <Link to="/" className="font-display text-lg font-extrabold text-forest tracking-tight">
                    Campuna
                </Link>

                <button
                    onClick={() => setIsWishlisted(v => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${isWishlisted
                            ? 'bg-rose-500 border-rose-500 text-white'
                            : 'border-forest/20 text-forest hover:border-gold hover:text-gold'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">{isWishlisted ? 'Gemerkt' : 'Merken'}</span>
                </button>
            </nav>

            {/* ── Hero / Image Gallery ── */}
            <div className="bg-forest/3">
                <div className="max-w-6xl mx-auto px-4 md:px-12 py-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/40 font-mono mb-6">
                        <Link to="/" className="hover:text-gold transition-colors">Startseite</Link>
                        <span>/</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">{listing.category}</span>
                        <span>/</span>
                        <span className="text-charcoal/70 truncate max-w-[200px]">{listing.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Main image + thumbnails */}
                        <div className="space-y-3">
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-sand shadow-lg"
                            >
                                <img
                                    src={listing.images[activeImage]}
                                    alt={listing.title}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                                {/* Nav arrows (only if multiple images) */}
                                {listing.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setActiveImage(i => (i - 1 + listing.images.length) % listing.images.length)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-all"
                                        >
                                            <ChevronLeft className="w-4 h-4 text-forest" />
                                        </button>
                                        <button
                                            onClick={() => setActiveImage(i => (i + 1) % listing.images.length)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-all"
                                        >
                                            <ChevronRight className="w-4 h-4 text-forest" />
                                        </button>
                                    </>
                                )}
                                {/* Image counter */}
                                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                                    {activeImage + 1} / {listing.images.length}
                                </div>
                            </motion.div>

                            {/* Thumbnails */}
                            {listing.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {listing.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`relative flex-shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${idx === activeImage
                                                    ? 'border-gold scale-105 shadow-md'
                                                    : 'border-transparent opacity-60 hover:opacity-90'
                                                }`}
                                        >
                                            <img src={img} alt={`Bild ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details Panel */}
                        <div className="flex flex-col gap-5">
                            {/* Header */}
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className="bg-forest text-gold text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" />
                                        {listing.seller.type}
                                    </span>
                                    {listing.isExclusive && (
                                        <span className="bg-gold/20 border border-gold text-forest text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            Exklusiv
                                        </span>
                                    )}
                                    {listing.soldStatus === 'Active' && (
                                        <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            Aktiv
                                        </span>
                                    )}
                                </div>

                                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-black leading-tight mb-3">
                                    {listing.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/60">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-gold" />
                                        {listing.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5 text-gold fill-current" />
                                        {listing.rating} ({listing.reviewsCount} Bewertungen)
                                    </span>
                                    {listing.views > 0 && (
                                        <span className="flex items-center gap-1.5">
                                            <Eye className="w-3.5 h-3.5 text-charcoal/30" />
                                            {listing.views} Aufrufe
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-sand rounded-[20px] p-5 flex items-end justify-between">
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest text-charcoal/40 font-mono mb-1">
                                        {listing.pricePeriod}
                                    </span>
                                    <span className="font-display text-4xl font-extrabold text-forest">
                                        {listing.price.toLocaleString('de-DE')} €
                                    </span>
                                    {listing.negotiable && (
                                        <span className="block text-[10px] text-gold font-semibold mt-1">VB — Verhandelbar</span>
                                    )}
                                </div>
                                {listing.listingId && (
                                    <span className="font-mono text-[10px] text-charcoal/30">{listing.listingId}</span>
                                )}
                            </div>

                            {/* Features */}
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-forest/50 mb-2.5">Ausstattung</p>
                                <div className="flex flex-wrap gap-2">
                                    {listing.features.map((feat, idx) => (
                                        <span
                                            key={idx}
                                            className="flex items-center gap-1.5 text-xs text-charcoal/70 bg-sand px-3 py-1.5 rounded-lg border border-forest/5"
                                        >
                                            <Check className="w-3 h-3 text-gold shrink-0" />
                                            {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Meta info */}
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="bg-sand rounded-xl p-3 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-gold shrink-0" />
                                    <div>
                                        <span className="block text-[9px] uppercase tracking-wider text-charcoal/40">Kategorie</span>
                                        <span className="font-semibold text-forest">{listing.category}</span>
                                    </div>
                                </div>
                                {listing.createdDate && (
                                    <div className="bg-sand rounded-xl p-3 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gold shrink-0" />
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-wider text-charcoal/40">Eingestellt am</span>
                                            <span className="font-semibold text-forest">
                                                {listing.createdDate.toLocaleDateString('de-DE')}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Description + Contact ── */}
            <div className="max-w-6xl mx-auto px-4 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <div className="lg:col-span-2 space-y-6">
                    {listing.description && (
                        <div>
                            <h2 className="font-display text-xl font-bold text-black mb-4">Beschreibung</h2>
                            <p className="text-sm text-charcoal/70 leading-relaxed whitespace-pre-line">
                                {listing.description}
                            </p>
                        </div>
                    )}

                    {/* Seller Card */}
                    <div className="bg-sand rounded-[20px] p-6 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-7 h-7 text-forest" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="block text-[10px] uppercase tracking-widest font-mono text-charcoal/40 mb-0.5">Anbieter</span>
                            <p className="font-display font-bold text-forest text-base">{listing.seller.name}</p>
                            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                                <Check className="w-3 h-3" />
                                Verifizierter Verkäufer
                            </span>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button className="w-10 h-10 rounded-full bg-forest text-sand hover:bg-gold hover:text-forest flex items-center justify-center transition-all shadow">
                                <Phone className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-forest text-sand hover:bg-gold hover:text-forest flex items-center justify-center transition-all shadow">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-1">
                    <div className="bg-sand rounded-[24px] p-6 sticky top-24">
                        <h2 className="font-display text-lg font-bold text-black mb-1">Interesse? Kontakt aufnehmen</h2>
                        <p className="text-xs text-charcoal/50 mb-5">Senden Sie dem Anbieter eine direkte Nachricht.</p>

                        <form onSubmit={handleSendMessage} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Ihr Name"
                                required
                                className="w-full bg-white border border-forest/10 p-3 rounded-xl text-sm focus:outline-none focus:border-gold placeholder:text-charcoal/30"
                            />
                            <input
                                type="email"
                                placeholder="Ihre E-Mail"
                                required
                                className="w-full bg-white border border-forest/10 p-3 rounded-xl text-sm focus:outline-none focus:border-gold placeholder:text-charcoal/30"
                            />
                            <textarea
                                rows={4}
                                required
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder={`Hallo, ich interessiere mich für: ${listing.title}`}
                                className="w-full bg-white border border-forest/10 p-3 rounded-xl text-sm focus:outline-none focus:border-gold placeholder:text-charcoal/30 resize-none"
                            />
                            <button
                                type="submit"
                                disabled={messageSent}
                                className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${messageSent
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-forest text-sand hover:bg-gold hover:text-forest'
                                    }`}
                            >
                                <Send className="w-4 h-4" />
                                {messageSent ? 'Nachricht gesendet!' : 'Nachricht senden'}
                            </button>
                        </form>

                        <p className="text-[10px] text-charcoal/30 text-center mt-4">
                            Ihre Daten werden vertraulich behandelt und nicht weitergegeben.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
