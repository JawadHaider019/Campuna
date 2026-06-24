import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ChevronDown } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', initialType = '' }) {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [userType, setUserType] = useState(initialType);

    // Sync state when props change (e.g. clicking different hero buttons)
    useEffect(() => {
        if (isOpen) {
            setIsLogin(initialMode === 'login');
            setUserType(initialType);
        }
    }, [isOpen, initialMode, initialType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-forest/30 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden z-10 max-h-[95vh] overflow-y-auto no-scrollbar"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-sand hover:bg-forest hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="p-6 md:p-10">
                            {/* Header */}
                            <div className="mb-6">
                                <h3 className="font-display text-xl md:text-2xl font-bold text-forest mb-1 text-center">
                                    {isLogin ? 'Schön, dass du wieder da bist' : 'Erstelle dein Campuna-Konto'}
                                </h3>
                                <p className="text-xs md:text-sm text-charcoal/60 leading-relaxed font-light text-center max-w-sm mx-auto">
                                    {isLogin
                                        ? 'Melde dich an, um deine Inserate, Nachrichten und Kontoeinstellungen zu sehen.'
                                        : 'Kaufen, verkaufen oder entdecken – alles rund ums Camping.'}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3.5">
                                {!isLogin && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-forest/50 ml-1">
                                                Nutzername
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Ronny"
                                                    className="w-full bg-sand border-none p-3.5 pl-11 rounded-xl text-xs focus:ring-1 focus:ring-gold transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-forest/50 ml-1">
                                                Benutzertyp
                                            </label>
                                            <div className="relative">
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none" />
                                                <select
                                                    required
                                                    value={userType}
                                                    onChange={(e) => setUserType(e.target.value)}
                                                    className="w-full bg-sand border-none p-3.5 pl-5 rounded-xl text-xs focus:ring-1 focus:ring-gold transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Wählen Sie eine Option...</option>
                                                    <option value="Camper">Ich bin Camper</option>
                                                    <option value="Anbieter">Ich bin Anbieter</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-forest/50 ml-1">
                                        E-Mail Adresse
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="johnsmith@gmail.com"
                                            className="w-full bg-sand border-none p-3.5 pl-11 rounded-xl text-xs focus:ring-1 focus:ring-gold transition-all"
                                        />
                                    </div>
                                </div>

                                <div className={isLogin ? "space-y-1" : "grid grid-cols-1 md:grid-cols-2 gap-3.5"}>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-forest/50 ml-1">
                                            Passwort
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="***********"
                                                className="w-full bg-sand border-none p-3.5 pl-11 rounded-xl text-xs focus:ring-1 focus:ring-gold transition-all"
                                            />
                                        </div>
                                    </div>

                                    {!isLogin && (
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-forest/50 ml-1">
                                                Bestätigen
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                                                <input
                                                    type="password"
                                                    required
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="***********"
                                                    className="w-full bg-sand border-none p-3.5 pl-11 rounded-xl text-xs focus:ring-1 focus:ring-gold transition-all"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {isLogin && (
                                    <div className="text-right px-1">
                                        <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-gold hover:text-forest transition-colors">
                                            Passwort vergessen?
                                        </button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-forest text-sand hover:bg-gold hover:text-forest py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg mt-4"
                                >
                                    {isLogin ? 'Anmelden' : 'Konto erstellen'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-xs font-medium text-forest hover:text-gold transition-colors"
                                >
                                    {isLogin ? (
                                        <> Neu bei Campuna? <span className="font-bold border-b border-forest/10 ml-1">Registrieren</span> </>
                                    ) : (
                                        <> Hast du ein Konto? <span className="font-bold border-b border-forest/10 ml-1">Einloggen</span> </>
                                    )}
                                </button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-forest/5 text-center">
                                <p className="text-[10px] text-forest/40 leading-relaxed max-w-xs mx-auto">
                                    {isLogin ? (
                                        "Sicherer Login. Deine Daten sind DSGVO-konform geschützt."
                                    ) : (
                                        <>
                                            Konto erstellen bedeutet Zustimmung zu den <a href="#" className="text-forest underline font-semibold">AGB</a> und der <a href="#" className="text-forest underline font-semibold">Datenschutzerklärung</a>.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
