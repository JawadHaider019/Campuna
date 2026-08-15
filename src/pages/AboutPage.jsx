import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Users, Layers, ShieldCheck, Heart, Sparkles, Send, CheckCircle2, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { navigateTo } from '../utils/navigation';

export default function AboutPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        className="relative min-h-[380px] sm:min-h-[420px] mt-20 py-10 sm:py-16 px-6 sm:px-12 mx-4 overflow-hidden rounded-4xl flex items-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 60%, rgba(0, 0, 0, 1) 100%), url('/hero-campuna.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col justify-center">
          {/* Back button */}
          <button
            onClick={() => navigateTo('/')}
            className="mb-4 sm:mb-6 self-start flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors group cursor-pointer bg-transparent border-none outline-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </button>

        

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight animate-text-shine mb-2 sm:mb-3 drop-shadow-lg leading-tight"
          >
            Wir wollen Camping an einem Ort zusammenbringen.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-sm sm:text-base  font-sans leading-relaxed drop-shadow-md"
          >
            Campuna ist entstanden, weil wir selbst einen spezialisierten Ort vermisst haben, an dem Angebote, Anbieter, Campingplätze, Wissen und hilfreiche Funktionen rund ums Camping zusammenkommen.
          </motion.p>
        </div>
      </section>

      {/* SEO Marketplace Strip */}
      <section className=" pt-12 text-white relative z-20 ">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 ">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-forest animate-ping" />
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
      <section className="py-10 sm:py-16 bg-white relative">
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
                <div className="w-12 h-0.5 bg-gold rounded-full" />
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

              <div className="pt-2">
                <div className="flex items-center gap-3 py-3 px-6 rounded-2xl bg-sand/65 border border-forest/10 inline-block font-sans text-forest font-bold tracking-wide uppercase text-xs">
                  <span>Campuna wächst mit euch.</span>
                </div>
              </div>
            </motion.div>

            {/* Visual element (the generated image) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="absolute inset-0 bg-gold/10 rounded-[32px] sm:rounded-[40px] transform rotate-3 translate-x-2 translate-y-2 -z-10" />
              <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] shadow-2xl border border-forest/10 aspect-[1/1]">
                <img
                  src="/about_personal.jpg"
                  alt="Campuna outdoor lifestyle sunset on a boat"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
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
            <div className="w-16 h-0.5 bg-gold mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Today Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-[32px] bg-white border border-forest/10 shadow-[0_16px_40px_-10px_rgba(20,61,41,0.04)] flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-forest mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-forest" />
                  Heute auf Campuna
                </h3>
                <ul className="space-y-4 font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                    <span><strong>Spezialisierter Marktplatz</strong> für den Kauf und Verkauf von Fahrzeugen und Camping-Zubehör.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                    <span><strong>Anbieter-Verzeichnis</strong> für gewerbliche Werkstätten, Vermieter und Dienstleister.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                    <span><strong>Campingplätze</strong> mit Filtermöglichkeiten und Beschreibungen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                    <span><strong>Camping-Wissen & Tools</strong> wie der Zuladungsrechner und Reisekostenrechner für unbeschwerte Reisen.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-[32px] bg-gradient-to-br from-forest to-[#143d29] text-white border border-white/5 shadow-xl flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-gold mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold animate-pulse" />
                  Unsere Vision
                </h3>
                <ul className="space-y-4 font-sans text-sm text-sand/85 leading-relaxed font-light">
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span><strong>Immer mehr Bereiche</strong> der Campingwelt sinnvoll und digital an einem einzigen, modernen Ort zusammenbringen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span><strong>Eine faire & transparente Gemeinschaft</strong>, in der gewerbliche Partner, Händler und private Camper partnerschaftlich interagieren.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span><strong>Gemeinsames Wachstum</strong>. Jede neue Funktion und jeder neue Anbieter wird passgenau auf das Feedback der Community abgestimmt.</span>
                  </li>
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
            <div className="w-16 h-0.5 bg-gold mx-auto rounded-full mt-4" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUE_CARDS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative group p-8 bg-white border border-forest/10 rounded-[32px] hover:shadow-[0_32px_60px_-15px_rgba(20,61,41,0.06)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-[18px] bg-sand text-forest flex items-center justify-center mb-5 group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-charcoal mb-3 tracking-tight group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/65 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column: Headline, Description and Subscription Form */}
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start">
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
                      <motion.form
                        id="newsletter-form"
                        key="form"
                        onSubmit={handleSubscribe}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start w-full max-w-lg"
                      >
                        <input
                          id="email-input"
                          type="email"
                          required
                          placeholder="Deine E-Mail-Adresse"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 font-sans text-sm font-light disabled:opacity-50"
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
                    ) : (
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
