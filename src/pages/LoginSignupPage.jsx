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
    { value: 'camper', label: 'Camper / Käufer' },
    { value: 'seller', label: 'Privatverkäufer' },
    { value: 'business', label: 'Gewerblicher Anbieter' },
    { value: 'campsite', label: 'Campingplatz-Betreiber' },
];

/* ─── Social icon ─── */
const SocialIcon = ({ children, label }) => (
    <button type="button" aria-label={label}
        className="w-9 h-9 rounded-full bg-white/20 border border-white/50 hover:bg-white/35 flex items-center justify-center transition-all duration-200">
        {children}
    </button>
);

/* ═══════════════ PAGE ═══════════════ */
export default function LoginSignupPage() {
    const [mode, setMode] = useState('signup');

    const [username, setUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [signupPw, setSignupPw] = useState('');
    const [signupPwConfirm, setSignupPwConfirm] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPw, setLoginPw] = useState('');
    const [loading, setLoading] = useState(false);

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

    const labelCls = "font-sans text-[11px] font-semibold text-white/65 uppercase tracking-wider";

    return (
        <div className="min-h-screen w-full relative flex items-center lg:items-stretch justify-center lg:justify-end font-sans overflow-hidden">

            {/* ── Full-screen background image ── */}
            <motion.img
                src="/hero-campuna.png"
                alt="Camping"
                className="absolute inset-0 w-full h-full object-cover z-0"
                initial={{ scale: 1.07, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
            />
            {/* Cinematic gradient overlay — darker on right to help the card */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-black/25 to-black/55" />

            {/* ── LEFT: tagline + sign-in pill ── */}
            <div className="hidden lg:flex relative z-10 flex-1 flex-col justify-end px-12 xl:px-20 py-16 min-h-screen pointer-events-none select-none">
                <div />
                <img src="/logo.png" alt="" className='w-[140px] h-[40px] absolute top-12 left-12 lg:left-16 object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity' />
                {/* Big tagline */}
                <motion.div
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
                    className="max-w-[90%] lg:max-w-[85%] mb-2"
                >
                    <h2 className="font-display text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight drop-shadow-xl">
                        {mode === 'signup' ? (
                            <>Erstelle dein Campuna-Konto</>
                        ) : (
                            <>Schön, dass du wieder dabei bist.</>
                        )}
                    </h2>
                </motion.div>
                <p className="font-sans text-sm text-white/55 tracking-wider mt-2">  {mode === 'signup' ? (
                    <>Kaufen, verkaufen oder entdecken – alles rund ums Camping, einfach und transparent.</>
                ) : (
                    <>Melde dich an, um deine Inserate, Nachrichten und Kontoeinstellungen zu sehen.</>
                )}</p>

            </div>

            {/* ── RIGHT: floating frosted glass form card ── */}
            <motion.div
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
                className="relative z-10 w-full sm:max-w-[460px] lg:max-w-[480px] xl:max-w-[540px]
                           bg-black/40 lg:bg-white/10 backdrop-blur-[12px]
                           border-none sm:border border-white/20 lg:border-t-0 lg:border-b-0 lg:border-r-0 lg:border-l
                           shadow-[-24px_0_64px_-8px_rgba(0,0,0,0.4)]
                           flex flex-col min-h-screen sm:min-h-0 lg:min-h-screen
                           sm:my-8 lg:my-0 sm:rounded-3xl lg:rounded-none"
            >
                {/* Card inner */}
                <div className="px-7 pt-8 pb-8 flex flex-col gap-4 overflow-y-auto flex-1 justify-center">

                    {/* Logo + mode label row */}
                    <div className="flex items-center justify-between mb-2">
                        <button onClick={() => navigateTo('/')} className="lg:hidden pointer-events-auto">
                            <img src="/logo.png" alt="Campuna"
                                className="w-[110px] h-[32px] object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity" />
                        </button>
                        <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
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
                                className="flex flex-col gap-3"
                            >
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
                                    className="flex items-s justify-center gap-1.5 mt-2"
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
                                <p className="font-sans text-[9px] text-white/50 text-center leading-relaxed">
                                    Mit der Erstellung stimmst du unseren{' '}
                                    <button type="button" className="text-gold/70 hover:text-gold transition-colors">AGB</button>
                                    {' '}und der{' '}
                                    <button type="button" className="text-gold/70 hover:text-gold transition-colors">Datenschutzerklärung</button>
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
                                <p className="font-sans text-[12px] text-white/50 leading-relaxed -mt-1">
                                    Melde dich an, um deine Inserate, Nachrichten und Kontoeinstellungen zu sehen.
                                </p>

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
                                <button type="button" className="font-sans text-xs text-white/40 hover:text-white transition-colors text-center">
                                    Passwort vergessen?
                                </button>

                                {/* DSGVO */}
                                <div className="flex items-center justify-center gap-1.5 pt-1">
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
