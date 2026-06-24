import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare, ShieldCheck, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQSection() {
  const [openId, setOpenId] = useState('faq_1');

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="pb-16 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sand/30 rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
            Häufig gestellte Fragen
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-forest">
            Alles, was du wissen musst
          </h2>

        </div>

        {/* FAQ Accordion List - Refined Design */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group border rounded-[24px] transition-all duration-500 ${isOpen
                  ? 'border-forest/20 bg-sand/10 shadow-xl shadow-forest/5'
                  : 'border-forest/5 bg-white hover:border-forest/15 hover:shadow-lg'
                  }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-5">
                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-forest text-white' : 'bg-sand text-forest group-hover:bg-forest/5 text-forest/40 group-hover:text-forest'
                      }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className={`font-display text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-forest' : 'text-forest/70 group-hover:text-forest'
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

                {/* Accordion Animated Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 md:px-10 pb-4 font-sans text-base text-charcoal/70 leading-relaxed font-light max-w-3xl">
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
