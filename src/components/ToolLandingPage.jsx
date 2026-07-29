import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, ChevronDown, Scale, Fuel, HelpCircle, BookOpen, Layers } from 'lucide-react';
import SEO from './SEO';
import PayloadCalculator from './PayloadCalculator';
import BudgetCalculator from './BudgetCalculator';
import { TOOLS_LIST } from '../data/toolsData';
import { useToolAnalytics } from '../utils/useToolAnalytics';
import { getParentNavigationUrl, navigateTo } from '../utils/navigation';

export default function ToolLandingPage({ tool }) {
    const { trackUsage } = useToolAnalytics(tool.analyticsKey);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleToolSwitch = (targetSlug) => {
        navigateTo(targetSlug);
    };

    return (
        <div className="bg-white min-h-screen font-sans text-charcoal">
            {/* 1. SEO Head Management */}
            <SEO
                title={tool.metaTitle}
                description={tool.metaDescription}
                canonicalPath={tool.canonicalPath}
                structuredData={tool.structuredData}
            />

            {/* 2. Top Header & Hero Area */}
            <div className="bg-gradient-to-b from-sand/50 via-sand/20 to-white border-b border-forest/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 pb-8">

                    {/* Breadcrumbs Navigation */}
                    <nav className="flex items-center space-x-2 text-xs text-charcoal/60 mb-6 overflow-x-auto">
                        <a
                            href={getParentNavigationUrl('')}
                            target="_parent"
                            className="hover:text-forest transition-colors font-medium shrink-0"
                        >
                            Startseite
                        </a>
                        <ChevronRight className="w-3.5 h-3.5 text-charcoal/40 shrink-0" />
                        <span className="text-forest font-bold shrink-0">{tool.shortTitle}</span>
                    </nav>

                    {/* Header Title & Tool Selector Tabs */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 sm:p-4 bg-forest text-gold rounded-2xl shrink-0 shadow-md">
                                {tool.calculatorType === 'payload' ? (
                                    <Scale className="w-7 h-7 sm:w-8 sm:h-8" />
                                ) : (
                                    <Fuel className="w-7 h-7 sm:w-8 sm:h-8" />
                                )}
                            </div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold block mb-1">
                                    Kostenloses Camping-Tool
                                </span>
                                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest leading-tight">
                                    {tool.title}
                                </h1>
                                <p className="font-sans text-xs sm:text-sm text-charcoal/70 font-light mt-1.5 max-w-2xl leading-relaxed">
                                    {tool.heroSubtitle}
                                </p>
                            </div>
                        </div>

                        {/* Switcher Tabs to other tools */}
                        <div className="flex shrink-0 self-start lg:self-auto">
                            {TOOLS_LIST.filter(t => t.id !== tool.id).map((t) => {
                                const IconComp = t.icon || Scale;
                                return (
                                    <button
                                        key={t.id}
                                        onClick={() => handleToolSwitch(t.slug)}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold bg-forest text-gold hover:bg-gold hover:text-forest transition-all duration-300 shadow-md hover:shadow-lg border border-forest/10"
                                    >
                                        <IconComp className="w-4 h-4" />
                                        <span>Zum {t.shortTitle}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Calculator Workspace */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10">
                <div className="bg-white rounded-3xl border border-forest/10 shadow-xl p-4 sm:p-8 md:p-10">
                    {tool.calculatorType === 'payload' ? (
                        <PayloadCalculator
                            onCalculation={(data) => trackUsage('calculate', data)}
                        />
                    ) : (
                        <BudgetCalculator
                            onCalculation={(data) => trackUsage('calculate', data)}
                        />
                    )}
                </div>
            </div>

            {/* 4. Integrated Guides & FAQ Section */}
            <div className="bg-sand/15 border-t border-b border-forest/5 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    {/* Section Header */}
                    <div className="mb-10 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-gold/15 text-forest px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <BookOpen className="w-3.5 h-3.5 text-gold" />
                            <span>Ratgeber & Expertenwissen</span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest">
                            Alles was du zu {tool.shortTitle} wissen musst
                        </h2>
                    </div>

                    {/* Guides Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
                        {tool.guides.map((guide, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 sm:p-8 border border-forest/10 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-display text-lg sm:text-xl font-bold text-forest mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gold" />
                                    {guide.title}
                                </h3>
                                {guide.text && (
                                    <p className="text-sm text-charcoal/70 leading-relaxed font-light mb-3">
                                        {guide.text}
                                    </p>
                                )}
                                {guide.bulletPoints && (
                                    <ul className="space-y-2 mt-3">
                                        {guide.bulletPoints.map((pt, pIdx) => (
                                            <li key={pIdx} className="flex items-start gap-2.5 text-sm text-charcoal/75">
                                                <span className="text-forest font-bold text-base mt-0.5">•</span>
                                                <span className="leading-snug">{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* FAQ Accordion Section */}
                    {tool.faqs && tool.faqs.length > 0 && (
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
                                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
                                    Häufig gestellte Fragen
                                </span>
                                <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-forest">
                                    FAQ zum {tool.shortTitle}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {tool.faqs.map((faq, idx) => {
                                    const isOpen = openFaqIndex === idx;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05 }}
                                            className={`group border rounded-[24px] transition-all duration-500 overflow-hidden ${isOpen
                                                    ? 'border-forest/20 bg-sand/10 shadow-xl shadow-forest/5'
                                                    : 'border-forest/5 bg-white hover:border-forest/15 hover:shadow-lg'
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleFaq(idx)}
                                                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-forest text-white' : 'bg-sand text-forest group-hover:bg-forest/5 text-forest/40 group-hover:text-forest'
                                                        }`}>
                                                        <HelpCircle className="w-5 h-5" />
                                                    </div>
                                                    <span className={`font-display text-md md:text-lg font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-forest' : 'text-forest/70 group-hover:text-forest'
                                                        }`}>
                                                        {faq.question}
                                                    </span>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-gold text-forest' : 'bg-sand/50 text-forest/30'
                                                        }`}
                                                >
                                                    <ChevronDown className="w-5 h-5" />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    >
                                                        <div className="px-8 md:px-10 pb-6 pt-1 font-sans text-base text-charcoal/70 leading-relaxed font-light whitespace-pre-line border-t border-forest/5">
                                                            {faq.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* 6. Scalable Cross-Internal Links Footer */}
            <div className="bg-sand/30 py-10 border-t border-forest/10 text-charcoal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="font-display font-bold text-forest text-base mb-1">
                                Entdecke weitere Camping-Helfer Tools & Marktplatz-Kategorien
                            </h4>
                            <p className="text-xs text-charcoal/60">
                                Wir erweitern unsere Tools stetig für deinen perfekten Campingurlaub.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            {TOOLS_LIST.filter(t => t.id !== tool.id).map((t) => (
                                <a
                                    key={t.id}
                                    href={getParentNavigationUrl(t.slug)}
                                    target="_parent"
                                    className="px-4 py-2 bg-white rounded-full border border-forest/10 text-xs font-bold text-forest hover:bg-forest hover:text-gold transition-all duration-300 shadow-sm"
                                >
                                    {t.shortTitle}
                                </a>
                            ))}
                            <a
                                href={getParentNavigationUrl('all_listings')}
                                target="_parent"
                                className="px-4 py-2 bg-forest text-gold rounded-full text-xs font-bold hover:bg-gold hover:text-forest transition-all duration-300 shadow-sm"
                            >
                                Alle Inserate
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
