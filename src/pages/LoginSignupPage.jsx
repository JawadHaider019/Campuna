import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ChevronRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

/* ─── Glass input ─── */
const Field = ({ id, type = 'text', placeholder, value, onChange, autoComplete }) => {
    const [show, setShow] = useState(false);
    const isPass = type === 'password';
    return (
        <div className="relative">
            <input
                id={id}
                type={isPass && show ? 'text' : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="w-full bg-white/20 border border-white/50 rounded-xl px-4 py-2.5 font-sans text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 pr-10"
            />
            {isPass && (
                <button type="button" tabIndex={-1} onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            )}
        </div>
    );
};

/* ─── Glass select ─── */
const SelectField = ({ id, value, onChange, options, placeholder }) => (
    <div className="relative">
        <select id={id} value={value} onChange={onChange}
            className="w-full appearance-none bg-white/20 border border-white/50 rounded-xl px-4 py-2.5 font-sans text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 pr-8 cursor-pointer">
            <option value="" disabled className="text-charcoal bg-white">{placeholder}</option>
            {options.map(o => <option key={o.value} value={o.value} className="text-charcoal bg-white">{o.label}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
    </div>
);

const USER_TYPES = [

    { value: 'seller', label: 'Privatver Nutzer' },
    { value: 'business', label: 'Gewerblicher Nutzer' }

];

/* ═══════════════ PAGE ═══════════════ */
export default function LoginSignupPage() {
    const [mode, setMode] = useState('login');

    const [username, setUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [signupPw, setSignupPw] = useState('');
    const [signupPwConfirm, setSignupPwConfirm] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPw, setLoginPw] = useState('');
    const [loading, setLoading] = useState(false);

    // Business-only fields
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [vatId, setVatId] = useState('');
    const [impressum, setImpressum] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); navigateTo('/my_account'); }, 1200);
    };
    const switchMode = (m) => { setMode(m); setLoading(false); };

    const variants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
        exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
    };

    const labelCls = "font-sans text-[9px] font-semibold text-white/65 uppercase tracking-wider";

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center font-sans overflow-hidden bg-charcoal p-2 sm:p-3 lg:p-4">

            {/* ── Full-screen background image ── */}
            <motion.img
                src="/hero-campuna.png"
                alt="Camping"
                className="absolute inset-0 w-full h-full object-cover z-0"
                initial={{ scale: 1.07, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
            />
            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0 z-[1] bg-black/45" />

            {/* ── CENTRALIZED Frosted Glass Form Card ── */}
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="relative z-10 w-full max-w-[460px]
                           bg-black/70 
                           border border-white/20
                           shadow-[0_24px_64px_-8px_rgba(0,0,0,0.5)]
                           flex flex-col rounded-3xl overflow-hidden"
            >
                {/* Card inner */}
                <div className="px-6 sm:px-8 py-3 sm:py-4 flex flex-col gap-1 sm:gap-2 overflow-y-auto max-h-[95vh]">

                    {/* Logo + mode label row */}
                    <div className="flex items-center justify-between mb-1">
                        <button onClick={() => navigateTo('/')} className="pointer-events-auto">
                            <img src="/logo.png" alt="Campuna"
                                className="w-[110px] h-[32px] object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity" />
                        </button>
                        <span className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                            {mode === 'signup' ? 'Registrieren' : 'Einloggen'}
                        </span>
                    </div>

                    {/* ── Animated form content ── */}
                    <AnimatePresence mode="wait">
                        {mode === 'signup' ? (
                            <motion.form
                                key="signup"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-2"
                            >
                                {/* Headline */}
                                <div>
                                    <h1 className="font-display text-[18px] font-extrabold text-white leading-tight mb-1">
                                        Erstelle dein Campuna-Konto
                                    </h1>
                                    <p className="font-sans text-[10px] text-white/55 leading-relaxed">
                                        Kaufen, verkaufen oder entdecken – alles rund ums Camping, einfach und transparent.
                                    </p>
                                </div>

                                {/* Nutzername */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="reg-username" className={labelCls}>Nutzername</label>
                                    <Field id="reg-username" placeholder="z.B. Ronny" value={username}
                                        onChange={e => setUsername(e.target.value)} autoComplete="username" />
                                    <p className="font-sans text-[9px] text-white/50 px-1 leading-snug">
                                        Wird in deinem Profil und deinen Anzeigen angezeigt.
                                    </p>
                                </div>

                                {/* E-Mail */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="reg-email" className={labelCls}>E-Mail</label>
                                    <Field id="reg-email" type="email" placeholder="deine@email.de" value={signupEmail}
                                        onChange={e => setSignupEmail(e.target.value)} autoComplete="email" />
                                </div>

                                {/* Benutzertyp */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="reg-usertype" className={labelCls}>Benutzertyp</label>
                                    <SelectField id="reg-usertype" value={userType}
                                        onChange={e => setUserType(e.target.value)}
                                        options={USER_TYPES} placeholder="Wählen Sie eine Option..." />
                                </div>

                                {/* Business fields — shown only when Gewerblicher Nutzer */}
                                <AnimatePresence>
                                    {userType === 'business' && (
                                        <motion.div
                                            key="business-fields"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col gap-2 pt-1 border-t border-white/15 mt-1">
                                                <p className="font-sans text-[10px] text-white/40 uppercase tracking-widest">Geschäftliche Angaben</p>

                                                {/* Row 1: Company Name + Company Email */}
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col gap-1">
                                                        <label htmlFor="biz-name" className={labelCls}>Firmenname</label>
                                                        <Field id="biz-name" placeholder="Campuna GmbH" value={companyName}
                                                            onChange={e => setCompanyName(e.target.value)} autoComplete="organization" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <label htmlFor="biz-email" className={labelCls}>Firmen-E-Mail</label>
                                                        <Field id="biz-email" type="email" placeholder="info@firma.de" value={companyEmail}
                                                            onChange={e => setCompanyEmail(e.target.value)} autoComplete="email" />
                                                    </div>
                                                </div>

                                                {/* Full Address — full width */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="biz-address" className={labelCls}>Vollständige Adresse</label>
                                                    <Field id="biz-address" placeholder="Musterstraße 1, 12345 Berlin" value={companyAddress}
                                                        onChange={e => setCompanyAddress(e.target.value)} autoComplete="street-address" />
                                                </div>

                                                {/* Row 2: Phone + VAT ID */}
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col gap-1">
                                                        <label htmlFor="biz-phone" className={labelCls}>Telefon</label>
                                                        <Field id="biz-phone" type="tel" placeholder="+49 123 456" value={companyPhone}
                                                            onChange={e => setCompanyPhone(e.target.value)} autoComplete="tel" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <label htmlFor="biz-vat" className={labelCls}>USt-IdNr.</label>
                                                        <Field id="biz-vat" placeholder="DE123456789" value={vatId}
                                                            onChange={e => setVatId(e.target.value)} />
                                                    </div>
                                                </div>

                                                {/* Impressum — full width */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="biz-impressum" className={labelCls}>Impressum-Link</label>
                                                    <Field id="biz-impressum" type="url" placeholder="https://firma.de/impressum" value={impressum}
                                                        onChange={e => setImpressum(e.target.value)} autoComplete="url" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {/* Passwort */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="reg-pw" className={labelCls}>Passwort</label>
                                    <Field id="reg-pw" type="password" placeholder="Mindestens 8 Zeichen" value={signupPw}
                                        onChange={e => setSignupPw(e.target.value)} autoComplete="new-password" />
                                </div>

                                {/* Passwort bestätigen */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="reg-pw2" className={labelCls}>Passwort bestätigen</label>
                                    <Field id="reg-pw2" type="password" placeholder="Passwort wiederholen" value={signupPwConfirm}
                                        onChange={e => setSignupPwConfirm(e.target.value)} autoComplete="new-password" />
                                </div>

                                {/* CTA */}
                                <motion.button id="signup-submit" type="submit"
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    disabled={loading}
                                    className="w-full bg-white text-forest font-sans font-bold text-sm py-3 rounded-xl hover:bg-forest hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 mt-1">
                                    {loading
                                        ? <span className="w-4 h-4 border-2 border-forest/30 border-t-forest rounded-full animate-spin inline-block" />
                                        : 'Konto erstellen'}
                                </motion.button>

                                {/* Helper Switcher */}
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                                    className="flex items-center justify-center gap-1.5 "
                                >
                                    <span className="font-sans text-xs text-white/50 uppercase tracking-widest">Bereits Mitglied?</span>
                                    <button
                                        type="button"
                                        onClick={() => switchMode('login')}
                                        className="font-sans text-xs font-bold text-white hover:text-gold uppercase tracking-widest flex items-center gap-0.5 transition-colors"
                                    >
                                        Einloggen
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </motion.div>

                                {/* Legal */}
                                <p className="font-sans text-[9px] text-white/50 text-center leading-relaxed ">
                                    Mit der Erstellung stimmst du unseren{' '}
                                    <button type="button" className="text-gold/70 hover:text-gold transition-colors font-medium">AGB</button>
                                    {' '}und der{' '}
                                    <button type="button" className="text-gold/70 hover:text-gold transition-colors font-medium">Datenschutzerklärung</button>
                                    {' '}zu.
                                </p>
                            </motion.form>

                        ) : (

                            /* ── LOGIN ── */
                            <motion.form
                                key="login"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-3"
                            >
                                <div className="mb-1">
                                    <h1 className="font-display text-[20px] font-extrabold text-white leading-tight mb-1">
                                        Schön, dass du wieder da bist
                                    </h1>
                                    <p className="font-sans text-[11px] text-white/55 leading-relaxed">
                                        Melde dich an, um deine Inserate, Nachrichten und Kontoeinstellungen zu sehen.
                                    </p>
                                </div>

                                {/* E-Mail */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="login-email" className={labelCls}>E-Mail Adresse</label>
                                    <Field id="login-email" type="email" placeholder="deine@email.de" value={loginEmail}
                                        onChange={e => setLoginEmail(e.target.value)} autoComplete="email" />
                                </div>

                                {/* Passwort */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="login-pw" className={labelCls}>Passwort</label>
                                    <Field id="login-pw" type="password" placeholder="Dein Passwort" value={loginPw}
                                        onChange={e => setLoginPw(e.target.value)} autoComplete="current-password" />
                                </div>

                                {/* CTA */}
                                <motion.button id="login-submit" type="submit"
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    disabled={loading}
                                    className="w-full bg-white text-forest font-sans font-bold text-sm py-3 rounded-xl hover:bg-forest hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 mt-1">
                                    {loading
                                        ? <span className="w-4 h-4 border-2 border-forest/30 border-t-forest rounded-full animate-spin inline-block" />
                                        : 'Anmelden'}
                                </motion.button>

                                {/* Helper Switcher */}
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                                    className="flex items-center justify-center gap-1.5 mt-2"
                                >
                                    <span className="font-sans text-xs text-white/50 uppercase tracking-widest">Neu hier?</span>
                                    <button
                                        type="button"
                                        onClick={() => switchMode('signup')}
                                        className="font-sans text-xs font-bold text-white hover:text-gold uppercase tracking-widest flex items-center gap-0.5 transition-colors"
                                    >
                                        Registrieren
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </motion.div>

                                {/* Forgot */}
                                <button type="button" className="font-sans text-xs text-white/40 hover:text-white transition-colors text-center mt-1">
                                    Passwort vergessen?
                                </button>

                                {/* DSGVO */}
                                <div className="flex items-center justify-center gap-1.5 pt-1 mt-auto">
                                    <ShieldCheck className="w-3 h-3 text-gold/50 shrink-0" />
                                    <p className="font-sans text-[9px] text-white/50 leading-relaxed">
                                        Sicherer Login. Deine Daten sind DSGVO-konform geschützt.
                                    </p>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

        </div>
    );
}
