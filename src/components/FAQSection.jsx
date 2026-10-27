import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQSection() {
    const [openId, setOpenId] = useState('faq_1');

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const faqList = FAQS || [];

    return (
        <section id="faq" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden scroll-mt-24">
            {/* Decorative background element */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sand/30 rounded-full blur-3xl pointer-events-none opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 space-y-3">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
                        Häufig gestellte Fragen
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-forest">
                        Alles, was du über Campuna wissen musst
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
                        Die häufigsten Fragen zu unserem Camping-Marktplatz, kurz beantwortet.
                    </p>
                </div>

                {/* FAQ Accordion List */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqList.map((faq, idx) => {
                        const isOpen = openId === faq.id;
                        return (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.4 }}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                                    isOpen
                                        ? 'border-gold bg-sand/20 shadow-md'
                                        : 'border-forest/10 bg-white hover:border-forest/30'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                                >
                                    <span className="font-display text-base sm:text-lg font-bold text-forest leading-snug">
                                        {faq.question}
                                    </span>
                                    <div className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                                        isOpen ? 'rotate-180 bg-gold/10 text-gold' : 'bg-sand text-forest'
                                    }`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>

                                {/* Accordion Animated Body */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="px-6 md:px-8 pb-5 font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light whitespace-pre-line border-t border-forest/5 pt-3">
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
        </section>
    );
}
