import { motion } from 'motion/react';
import { Layers, Users, Compass, CheckCircle2 } from 'lucide-react';

export default function WhyCampuna() {
  const FEATURES = [
    {
      id: '01',
      icon: Layers,
      title: 'Kein Plattform-Chaos',
      desc: 'Keine themenfremden Anzeigen. Auf Campuna geht es ausschließlich um Camping.',
    },
    {
      id: '02',
      icon: Users,
      title: 'Von Campern für Camper',
      desc: 'Eine spezialisierte Plattform für private und gewerbliche Camping-Angebote.',
    },
    {
      id: '03',
      icon: Compass,
      title: 'Alles an einem Ort',
      desc: 'Angebote, Anbieter, Stellplätze, Services und Ratgeber auf einer Plattform.',
    }
  ];

  return (
    <section id="why-campuna" className="py-10 sm:py-16 bg-sand relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sand/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-2">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold block">
            The Advantage
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-[1.1]">
            Warum Campuna?
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto rounded-full mt-4" />
        </div>

        {/* Features Cards Grid - Optimized for Tablet/Mobile (1 col) and Desktop (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4 max-w-2xl lg:max-w-none mx-auto">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                className="relative group p-6 bg-white border border-forest/10 rounded-[40px] hover:shadow-[0_48px_80px_-16px_rgba(20,61,41,0.08)] hover:-translate-y-2 transition-all duration-500"
              >
                {/* Decorative background circle on hover */}
                <div className="absolute inset-0 bg-sand/10 opacity-0 group-hover:opacity-100 rounded-[40px] transition-opacity duration-500 -z-10" />

                {/* Icon Container */}
                <div className="w-16 h-16 rounded-[24px] bg-sand text-forest flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-white transition-colors duration-500 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Text Content */}
                <h3 className="font-display text-2xl font-bold text-black mb-2 tracking-tight group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
                  {item.desc}
                </p>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
