import { Facebook, Instagram, Youtube, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-sand text-forest py-12 sm:py-10 border-t border-forest/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">

          {/* Logo & Manifesto Column */}
          <div className="space-y-8 lg:col-span-1 items-start">
            <div className="flex flex-col space-y-3 items-start">
              <img
                src="/logo.png"
                alt="Campuna – Dein Camping-Marktplatz"
                className="h-16 w-auto object-contain"
              />
              <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed max-w-xs italic text-left">
                "Wir sind da. Nutze es. Wenn du möchtest, bleib."
              </p>
            </div>


          </div>

          {/* Navigation Column */}
          <div className="space-y-6">
            <h4 className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-forest">
              Navigation
            </h4>
            <ul className="space-y-3 font-sans text-[13px] font-light text-charcoal/60">
              <li><a href="https://campuna.de/" className="hover:text-gold transition-colors">Startseite</a></li>
              <li><a href="https://campuna.de/my_account" className="hover:text-gold transition-colors">Mein Konto</a></li>
              <li><a href="https://campuna.de/about_us" className="hover:text-gold transition-colors">Über uns</a></li>
              <li><a href="https://campuna.de/how_campuna_works" className="hover:text-gold transition-colors">So funktioniert Campuna</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-6">
            <h4 className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-forest">
              Support
            </h4>
            <ul className="space-y-3 font-sans text-[13px] font-light text-charcoal/60">
              <li><a href="https://campuna.de/faq_hilfe" className="hover:text-gold transition-colors">Hilfe & FAQ</a></li>
              <li><a href="https://campuna.de/contact_kontakt" className="hover:text-gold transition-colors">Kontakt</a></li>
              <li><a href="https://campuna.de/act_safely__sicher_handeln" className="hover:text-gold transition-colors">Sicher handeln</a></li>
              <li><a href="https://campuna.de/missing_anything__fehlt_dir_etwas" className="hover:text-gold transition-colors leading-snug block">Fehlt dir etwas? Sag es uns</a></li>
            </ul>
          </div>

          {/* Rechtliches Column */}
          <div className="space-y-6">
            <h4 className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-forest">
              Rechtliches
            </h4>
            <ul className="space-y-3 font-sans text-[13px] font-light text-charcoal/60">
              <li><a href="https://campuna.de/agb" className="hover:text-gold transition-colors">AGB</a></li>
              <li><a href="https://campuna.de/nutzungsbedingungen" className="hover:text-gold transition-colors">Nutzungsbedingungen</a></li>
              <li><a href="https://campuna.de/datenschutzerkl_rung" className="hover:text-gold transition-colors">Datenschutz</a></li>
              <li><a href="https://campuna.de/impressum" className="hover:text-gold transition-colors">Impressum</a></li>
            </ul>
          </div>

        </div>

        {/* Separator line */}
        <hr className="border-forest/5 my-6" />

        {/* Sub-footer metadata */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-charcoal/40 font-mono gap-4">
          <p>© 2026 Campuna. Alle Rechte vorbehalten.</p>

          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full border text-white border-forest/5 bg-forest hover:bg-forest/80 hover:text-white flex items-center justify-center transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border text-white border-forest/5 bg-forest hover:bg-forest/80 hover:text-white flex items-center justify-center transition-all duration-300">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border text-white border-forest/5 bg-forest hover:bg-forest/80 hover:text-white flex items-center justify-center transition-all duration-300">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
