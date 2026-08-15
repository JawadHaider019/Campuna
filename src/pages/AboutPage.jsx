import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Users, Layers, ShieldCheck, Heart, Sparkles, Send, CheckCircle2, ArrowRight, Mail, ChevronsDown } from 'lucide-react';
import SEO from '../components/SEO';
import { navigateTo } from '../utils/navigation';

// Variants for timeline animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6
    }
  }
};

const numberVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.6
    }
  }
};

const leftCardVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    rotateY: -15
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.8
    }
  }
};

const rightCardVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    rotateY: 15
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.8
    }
  }
};

export default function AboutPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  const VALUE_CARDS = [
    {
      title: 'Camping im Mittelpunkt',
      icon: Compass,
      desc: 'Bei Campuna ist Camping keine Kategorie unter vielen – die gesamte Plattform dreht sich darum.',
    },
    {
      title: 'Alles an einem Ort',
      icon: Layers,
      desc: 'Angebote, Anbieter, Plätze, Vermietung, Services, Wissen und praktische Helfer sollen Schritt für Schritt zusammenkommen.',
    },
    {
      title: 'Von Campern gedacht',
      icon: Heart,
      desc: 'Wir bauen die Campingplattform, die wir selbst vermisst haben.',
    },
    {
      title: 'Offen für alle Seiten',
      icon: Users,
      desc: 'Private Camper, Händler, Campingplätze, Vermieter und Dienstleister gehören zur gleichen Campingwelt.',
    },
    {
      title: 'Einfach und transparent',
      icon: ShieldCheck,
      desc: 'Campuna soll übersichtlich bleiben und ohne unnötige Hürden funktionieren.',
    },
    {
      title: 'Campuna wächst mit euch',
      icon: Sparkles,
      desc: 'Jedes Inserat, jeder Anbieter und jeder aktive Camper macht die Plattform ein Stück wertvoller.',
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-charcoal overflow-hidden">
      {/* Page-Specific SEO Metadata */}
      <SEO
        title="Über uns – Warum es Campuna gibt | Der Camping-Marktplatz"
        description="Erfahre mehr über die Vision von Campuna, warum wir die Campingplattform aufbauen, die wir selbst vermisst haben, und wie wir Camping an einem Ort zusammenbringen."
        canonicalPath="about_us"
      />

      {/* 1. HERO SECTION */}
      <section
        className="relative min-h-[60vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[48px] mt-20 sm:mt-20  mx-4 md:mx-8 lg:mx-12 shadow-2xl border border-forest/10"
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
              src="/about_camping_together.jpg"
              alt="Campers enjoying camping together outdoors"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Deep luxurious multi-layered gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        {/* Floating Sparkles Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,169,107,0.08),transparent_50%)] pointer-events-none" />



        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col justify-center items-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl  font-bold tracking-tight animate-text-shine mb-6 drop-shadow-lg leading-tight text-center"
          >
            Wir wollen Camping an einem Ort zusammenbringen.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-md md:text-lg text-sand/85 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-md text-center"
          >
            Campuna ist entstanden, weil wir selbst einen spezialisierten Ort vermisst haben, an dem Angebote, Anbieter, Campingplätze, Wissen und hilfreiche Funktionen rund ums Camping zusammenkommen.
          </motion.p>

          {/* Scroll Down Arrow */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: [0, 6, 0]
            }}
            transition={{
              opacity: { delay: 0.4, duration: 0.6 },
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            onClick={() => {
              const nextSection = document.getElementById('about-story');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="mt-8 flex   items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-forest/80 text-white hover:text-gold hover:border-gold/50 transition-all cursor-pointer shadow-lg outline-none group font-sans text-[11px] sm:text-xs uppercase tracking-widest font-semibold"
            aria-label="Mehr über uns erfahren"
          >
            <span>Mehr über uns erfahren</span>
            <ChevronsDown className="w-4 h-4 transition-colors" />
          </motion.button>
        </div>
      </section>

      {/* SEO Marketplace Strip */}
      <section className=" pt-12 text-white relative z-20 ">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 ">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-forest"></span>
            </span>
            <h3 className="font-display text-lg font-bold tracking-wide text-forest">
              Dein Camping-Marktplatz in Deutschland
            </h3>
          </div>
          <p className="pl-5 sm:pl-0 font-sans text-sm text-black font-light  leading-relaxed">
            Die spezialisierte Plattform für Wohnmobile, Wohnwagen, Campingzubehör, Stellplätze, Vermietung und Dienstleistungen rund ums Camping.
          </p>
        </div>
      </section>

      {/* 2. "WARUM ES CAMPUNA GIBT" SECTION */}
      <section id="about-story" className="py-10 sm:py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-13 gap-4 items-center">
            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              <div className="space-y-2">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
                  Die Geschichte
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-forest leading-tight">
                  Warum es Campuna gibt
                </h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-0.5 bg-gold rounded-full"
                />
              </div>

              <div className="font-sans text-[15px] sm:text-[16px] text-charcoal/80 space-y-6 leading-relaxed font-light">
                <p>
                  Camping ist riesig – aber digital verteilt sich vieles auf unterschiedliche Orte. Fahrzeuge auf allgemeinen Marktplätzen, Tipps in Gruppen und Foren, Campingplätze auf eigenen Portalen, Zubehör und Dienstleistungen wieder woanders.
                </p>
                <p className="font-medium text-forest">
                  Wir wollten einen Ort schaffen, an dem Camping nicht nur eine Kategorie unter vielen ist. Einen Ort, an dem sich alles ums Camping dreht. Deshalb haben wir Campuna aufgebaut.
                </p>
                <p>
                  Heute findest du bereits private und gewerbliche Angebote, Campingplätze, Vermietungen, Dienstleistungen, Wissen und praktische Camping-Helfer auf Campuna.
                </p>
                <p>
                  Aber unsere Idee geht weiter. Wir bauen die Campingplattform, die wir selbst vermisst haben. Das Grundgerüst steht. Jetzt wächst Campuna mit jedem Camper, jedem Inserat, jedem Anbieter und jedem Campingplatz weiter.
                </p>
              </div>


            </motion.div>

            {/* Visual element (the generated image) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative group cursor-pointer"
            >
              {/* Interactive background shadow */}
              <div className="absolute inset-0 bg-gold/10 rounded-[32px] sm:rounded-[40px] transform rotate-3 translate-x-2 translate-y-2 -z-10 group-hover:rotate-1 group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-500" />

              <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] shadow-2xl border border-forest/10 aspect-[1/1] bg-sand/5">
                <img
                  src="/about_founder.jpg"
                  alt="Campuna outdoor lifestyle sunset on a boat"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />

                {/* Auto-looping Shine effect (starts after page loads, runs every 4s) */}
                <motion.div
                  className="absolute top-0 h-full w-[45%] pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{ skewX: -25 }}
                  animate={{
                    left: ['-60%', '140%'],
                  }}
                  transition={{
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 4.5,
                  }}
                />

                {/* Instant Hover Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-out" />
                </div>

                {/* Sparkling Badge Overlay */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="inline-flex items-center gap-2 py-2 px-4 sm:py-3 sm:px-6 rounded-2xl bg-sand/85 backdrop-blur-sm border border-forest/10 font-sans text-forest font-bold tracking-wide uppercase text-[10px] sm:text-xs hover:bg-sand transition-colors duration-300 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold animate-pulse" />
                    <span>Campuna wächst mit euch.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TODAY / VISION COMPARISON */}
      <section className="py-10 sm:py-16 bg-sand/40 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
              Status & Zukunft
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-forest leading-tight">
              Heute & Morgen
            </h2>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
              Wie Campuna aufgebaut ist und wohin wir die Reise fortsetzen.
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-gold mx-auto rounded-full mt-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Today Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 rounded-[32px] bg-white border border-forest/10 shadow-[0_16px_40px_-10px_rgba(20,61,41,0.04)] hover:shadow-[0_20px_50px_-8px_rgba(20,61,41,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-forest mb-6 flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-forest"></span>
                  </span>
                  Heute auf Campuna
                </h3>

                <ul className="space-y-5 font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                  <motion.li
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-start gap-3.5 group/item"
                  >
                    <div className="p-1 rounded-lg bg-forest/5 text-forest group-hover/item:bg-forest group-hover/item:text-white transition-all duration-300 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span><strong>Spezialisierter Marktplatz</strong> für den Kauf und Verkauf von Fahrzeugen und Camping-Zubehör.</span>
                  </motion.li>

                  <motion.li
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start gap-3.5 group/item"
                  >
                    <div className="p-1 rounded-lg bg-forest/5 text-forest group-hover/item:bg-forest group-hover/item:text-white transition-all duration-300 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span><strong>Anbieter-Verzeichnis</strong> für gewerbliche Werkstätten, Vermieter und Dienstleister.</span>
                  </motion.li>

                  <motion.li
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start gap-3.5 group/item"
                  >
                    <div className="p-1 rounded-lg bg-forest/5 text-forest group-hover/item:bg-forest group-hover/item:text-white transition-all duration-300 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span><strong>Campingplätze</strong> mit Filtermöglichkeiten und Beschreibungen.</span>
                  </motion.li>

                  <motion.li
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start gap-3.5 group/item"
                  >
                    <div className="p-1 rounded-lg bg-forest/5 text-forest group-hover/item:bg-forest group-hover/item:text-white transition-all duration-300 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span><strong>Camping-Wissen & Tools</strong> wie der Zuladungsrechner und Reisekostenrechner für unbeschwerte Reisen.</span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="p-8 rounded-[32px] bg-gradient-to-br from-forest to-[#143d29] text-white border border-white/5 shadow-xl hover:shadow-[0_20px_50px_-8px_rgba(20,61,41,0.2)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              {/* Moving shine effect for Vision Card */}
              <motion.div
                className="absolute top-0 h-full w-[45%] pointer-events-none bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                style={{ skewX: -25 }}
                animate={{
                  left: ['-60%', '140%'],
                }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              />

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-gold mb-6 flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
                  </span>
                  Unsere Vision
                </h3>

                <ul className="space-y-5 font-sans text-sm text-sand/85 leading-relaxed font-light">
                  <motion.li
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start gap-3.5 group/item"
                  >
                    <div className="p-1 rounded-lg bg-white/5 text-gold group-hover/item:bg-gold group-hover/item:text-forest transition-all duration-300 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span><strong>Immer mehr Bereiche</strong> der Campingwelt sinnvoll und digital an einem einzigen, modernen Ort zusammenbringen.</span>
                  </motion.li>

                  <motion.li
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start gap-3.5 group/item"
                  >
                    <div className="p-1 rounded-lg bg-white/5 text-gold group-hover/item:bg-gold group-hover/item:text-forest transition-all duration-300 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span><strong>Eine faire & transparente Gemeinschaft</strong>, in der gewerbliche Partner, Händler und private Camper partnerschaftlich interagieren.</span>
                  </motion.li>

                  <motion.li
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start gap-3.5 group/item"
                  >
                    <div className="p-1 rounded-lg bg-white/5 text-gold group-hover/item:bg-gold group-hover/item:text-forest transition-all duration-300 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span><strong>Gemeinsames Wachstum</strong>. Jede neue Funktion und jeder neue Anbieter wird passgenau auf das Feedback der Community abgestimmt.</span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SIX VALUE CARDS */}
      <section className="py-10 sm:py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Section Title */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
              Unsere Werte
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-forest leading-tight">
              Was uns wichtig ist
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-gold mx-auto rounded-full mt-4"
            />
          </div>

          {/* Interactive Timeline Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px", amount: 0.1 }}
            className="relative mt-8 md:mt-16"
          >
            {/* Vertical Line - Desktop only */}
            {!isMobile && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full hidden md:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-forest via-gold to-forest" />
                <div className="absolute inset-0 blur-[2px] bg-forest/30" />
              </motion.div>
            )}

            {/* Mobile vertical line */}
            {isMobile && (
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-forest/20 via-forest to-forest/20 md:hidden" />
            )}

            {VALUE_CARDS.map((item, index) => {
              const Icon = item.icon;
              const isLeft = !isMobile && index % 2 === 0;
              const stepNumber = `0${index + 1}`;
              const stepLabel = `Wert ${index + 1}`;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col ${isMobile
                    ? 'ml-12 mb-8'
                    : `md:flex-row items-start gap-8 mb-8 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`
                    }`}
                >
                  {/* Number Circle with Icon */}
                  <motion.div
                    className={`${isMobile
                      ? 'absolute -left-12 top-0 z-10'
                      : 'absolute left-0 md:left-1/2 md:-translate-x-1/2 -top-2 md:top-1/2 md:-translate-y-1/2'
                      }`}
                    variants={numberVariants}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg cursor-default bg-white"
                    >
                      {/* Gradient Border */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-forest via-gold to-forest p-[2px]">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 md:w-5 md:h-5 text-forest" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Content Card */}
                  <div className={`w-full ${isMobile
                    ? ''
                    : `md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-8' : 'md:pl-8 md:text-right'}`
                    }`}>
                    <motion.div
                      variants={isMobile ? cardVariants : (isLeft ? leftCardVariants : rightCardVariants)}
                      whileHover={!isMobile ? {
                        y: -5,
                        boxShadow: "0 20px 40px rgba(20,61,41,0.08)"
                      } : {}}
                      className="relative bg-white p-5 md:p-6 rounded-[32px] border border-forest/10 shadow-sm transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      {/* Value Index Badge - Positioned based on card side */}
                      {!isMobile && (
                        <div className={`absolute top-4 ${isLeft ? 'right-6' : 'left-6'}`}>
                          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#a98a4b]">
                            {stepLabel}
                          </span>
                        </div>
                      )}

                      {/* Mobile Title with Icon */}
                      {isMobile && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-sans text-gold font-bold uppercase tracking-wider">
                            {stepLabel}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className={`font-display text-lg sm:text-xl font-bold text-forest mb-2 ${!isMobile && isLeft ? 'pr-20' : !isMobile && !isLeft ? 'pl-20' : ''
                        }`}>
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className={`font-sans text-sm text-charcoal/65 leading-relaxed font-light ${!isMobile && isLeft ? 'pr-20' : !isMobile && !isLeft ? 'pl-20' : ''
                        }`}>
                        {item.desc}
                      </p>

                      {/* Bottom Accent Line */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-forest to-gold"
                        initial={{ width: 0 }}
                        whileInView={{ width: '30%' }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      />

                      {/* Watermark Step Number - Positioned based on card side */}
                      {!isMobile && (
                        <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'left-6' : 'right-6'
                          } opacity-20`}>
                          <span className="font-display text-6xl md:text-7xl font-black text-forest/[0.04]">
                            {stepNumber}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Empty space for desktop alignment */}
                  {!isMobile && <div className="hidden md:block md:w-[calc(50%-40px)]" />}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 text-center space-y-4 "
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-forest leading-tight">
              Das Fundament steht.{' '}
              <span className="text-gold font-medium block sm:inline">
                Was daraus wird, entsteht mit euch.
              </span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-charcoal/70 max-w-2xl mx-auto leading-relaxed font-light">
              Campuna ist noch nicht am Ziel. Genau deshalb ist jetzt der richtige Zeitpunkt, von Anfang an dabei zu sein.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. NEWSLETTER / UPDATE SECTION */}
      <section id="newsletter-section" className="pb-16 bg-white relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-[40px] overflow-hidden bg-gradient-to-br from-forest via-forest to-[#143d29] px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-16 shadow-lg border border-white/5"
          >
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-black/40 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-13 gap-4 items-center relative z-10">

              {/* Left Column: Headline, Description and Subscription Form */}
              <div className="lg:col-span-9 space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
                  Newsletter
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  Begleite Campuna  auf dem Weg.
                </h2>

                <p className="font-sans text-sm sm:text-base text-sand/85 font-light leading-relaxed max-w-xl pb-2">
                  Neue Funktionen, neue Anbieter und neue Möglichkeiten – erfahre, wie Campuna Schritt für Schritt wächst.
                </p>

                <div className="w-full">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full max-w-3xl">
                        <motion.form
                          id="newsletter-form"
                          key="form"
                          onSubmit={handleSubscribe}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto max-w-xl"
                        >
                          <input
                            id="email-input"
                            type="email"
                            required
                            placeholder="Deine E-Mail-Adresse"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full sm:w-60 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 font-sans text-sm font-light disabled:opacity-50"
                          />
                          <button
                            id="subscribe-button"
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-gold to-beige hover:brightness-110 active:scale-98 text-forest font-sans font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                          >
                            {isSubmitting ? (
                              <div className="w-4 h-4 border-2 border-forest border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <span>Updates erhalten</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </motion.form>

                        <button
                          onClick={() => navigateTo('/create-listing')}
                          className="w-full sm:w-auto shrink-0 bg-transparent hover:bg-white/10 active:scale-95 text-white border border-white/30 hover:border-gold hover:text-gold transition-all duration-300 font-sans font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md cursor-pointer"
                        >
                          <span>Inserat erstellen</span>
                          <Sparkles className="w-3.5 h-3.5 text-gold" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start w-full">
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center lg:items-start justify-center space-y-3 text-gold"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-gold" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-white">Vielen Dank!</h3>
                          </div>
                          <p className="font-sans text-sm text-sand/85 font-light">
                            Du bist erfolgreich eingetragen. Wir halten dich auf dem Laufenden!
                          </p>
                        </motion.div>

                        <button
                          onClick={() => navigateTo('/create-listing')}
                          className="w-full sm:w-auto shrink-0 bg-transparent hover:bg-white/10 active:scale-95 text-white border border-white/30 hover:border-gold hover:text-gold transition-all duration-300 font-sans font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md cursor-pointer sm:ml-6"
                        >
                          <span>Inserat erstellen</span>
                          <Sparkles className="w-3.5 h-3.5 text-gold" />
                        </button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Floating Mail Icons matching CTASection */}
              <div className="relative lg:col-span-4 hidden lg:block items-center justify-center lg:justify-end">
                <div className="absolute top-0 -right-30 flex items-center justify-center text-gold/80 transform -rotate-12 group-hover:scale-110 transition-all duration-700">
                  <Mail className="w-40 h-40 sm:w-80 sm:h-80 stroke-[1.5]" />
                </div>
                <div className="absolute bottom-30 -right-25 flex items-center justify-center text-gold/80 transform -rotate-12 group-hover:scale-110 transition-all duration-700">
                  <Mail className="w-40 h-40 sm:w-80 sm:h-80 stroke-[1.5]" />
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
