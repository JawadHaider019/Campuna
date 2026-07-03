import { Facebook, Instagram, Youtube } from 'lucide-react';
import { getParentNavigationUrl } from '../utils/navigation';

// Custom SVG path for Tiktok matches lucide-react outline
function TiktokIcon({ className, strokeWidth = 1.8 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-sand text-charcoal pt-16 pb-4">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Main Footer Column Grid */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">

          {/* Logo & Manifesto Column */}
          <div className="flex flex-col space-y-4 max-w-xs items-start">
            <img
              src="/logo.png"
              alt="Campuna – Dein Camping-Marktplatz"
              width={130}
              height={30}
              className="h-[40px] w-[140px] object-cover"
            />
            <p className="font-sans text-[15px] text-charcoal/80 font-normal leading-relaxed text-left whitespace-pre-line">
              {`Wir sind da. Nutze es. Wenn du möchtest,
bleib.`}
            </p>
          </div>

          {/* Desktop Columns (hidden on mobile, visible on md and up) */}
          <div className="hidden md:flex md:gap-16">
            {/* Navigation Column */}
            <div className="space-y-4 min-w-[140px]">
              <h4 className="font-sans text-[16px] font-bold text-black/80">
                Navigation
              </h4>
              <ul className="space-y-3 font-sans text-[14.5px] text-charcoal/80">
                <li>
                  <a href={getParentNavigationUrl('')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Startseite
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('my_account')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Mein Konto
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('about_us')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Über uns
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('how_campuna_works')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    So funktioniert Campuna
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="space-y-4 min-w-[140px]">
              <h4 className="font-sans text-[16px] font-bold text-black/80">
                Support
              </h4>
              <ul className="space-y-3 font-sans text-[14.5px] text-charcoal/80">
                <li>
                  <a href={getParentNavigationUrl('faq_hilfe')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Hilfe & FAQ
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('contact_kontakt')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Kontakt
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('act_safely__sicher_handeln')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Sicher handeln
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('missing_anything__fehlt_dir_etwas')} target="_parent" className="hover:text-forest transition-colors font-medium leading-tight block">
                    Fehlt dir etwas?<br />
                    Sag es uns
                  </a>
                </li>
              </ul>
            </div>

            {/* Rechtliches Column */}
            <div className="space-y-4 min-w-[140px]">
              <h4 className="font-sans text-[16px] font-bold text-black/80">
                Rechtliches
              </h4>
              <ul className="space-y-3 font-sans text-[14.5px] text-charcoal/80">
                <li>
                  <a href={getParentNavigationUrl('agb')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    AGB
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('nutzungsbedingungen')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Nutzungsbedingungen
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('datenschutzerkl_rung')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('impressum')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Impressum
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Grid Layout (visible on small screens, hidden on md and up) */}
          <div className="grid grid-cols-2 gap-y-10 gap-x-8 md:hidden w-full">
            {/* Left Stack: Navigation first, then Rechtliches */}
            <div className="flex flex-col space-y-10">
              {/* Navigation */}
              <div className="space-y-4">
                <h4 className="font-sans text-[16px] font-bold text-forest">
                  Navigation
                </h4>
                <ul className="space-y-3 font-sans text-[14.5px] text-charcoal/80">
                  <li>
                    <a href={getParentNavigationUrl('')} target="_parent" className="hover:text-forest transition-colors font-medium">
                      Startseite
                    </a>
                  </li>
                  <li>
                    <a href={getParentNavigationUrl('my_account')} target="_parent" className="hover:text-forest transition-colors font-medium">
                      Mein Konto
                    </a>
                  </li>
                  <li>
                    <a href={getParentNavigationUrl('about_us')} target="_parent" className="hover:text-forest transition-colors font-medium">
                      Über uns
                    </a>
                  </li>
                  <li>
                    <a href={getParentNavigationUrl('how_campuna_works')} target="_parent" className="hover:text-forest transition-colors font-medium leading-snug block">
                      So funktioniert Campuna
                    </a>
                  </li>
                </ul>
              </div>

              {/* Rechtliches */}
              <div className="space-y-4">
                <h4 className="font-sans text-[16px] font-bold text-forest">
                  Rechtliches
                </h4>
                <ul className="space-y-3 font-sans text-[14.5px] text-charcoal/80">
                  <li>
                    <a href={getParentNavigationUrl('agb')} target="_parent" className="hover:text-forest transition-colors font-medium">
                      AGB
                    </a>
                  </li>
                  <li>
                    <a href={getParentNavigationUrl('nutzungsbedingungen')} target="_parent" className="hover:text-forest transition-colors font-medium">
                      Nutzungsbedingungen
                    </a>
                  </li>
                  <li>
                    <a href={getParentNavigationUrl('datenschutzerkl_rung')} target="_parent" className="hover:text-forest transition-colors font-medium">
                      Datenschutz
                    </a>
                  </li>
                  <li>
                    <a href={getParentNavigationUrl('impressum')} target="_parent" className="hover:text-forest transition-colors font-medium">
                      Impressum
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Stack: Support */}
            <div className="space-y-4">
              <h4 className="font-sans text-[16px] font-bold text-forest">
                Support
              </h4>
              <ul className="space-y-3 font-sans text-[14.5px] text-charcoal/80">
                <li>
                  <a href={getParentNavigationUrl('faq_hilfe')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Hilfe & FAQ
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('contact_kontakt')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Kontakt
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('act_safely__sicher_handeln')} target="_parent" className="hover:text-forest transition-colors font-medium">
                    Sicher handeln
                  </a>
                </li>
                <li>
                  <a href={getParentNavigationUrl('missing_anything__fehlt_dir_etwas')} target="_parent" className="hover:text-forest transition-colors font-medium leading-tight block">
                    Fehlt dir etwas?<br />
                    Sag es uns
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Sub-footer Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-7 mt-8  text-[14.5px] text-charcoal/80 font-sans">
          <p className="text-center font-normal">
            © 2026 Campuna. Alle Rechte vorbehalten.
          </p>

          <div className="flex items-center gap-5 justify-center">
            <a href="#" className="hover:opacity-75 transition-opacity" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-forest" strokeWidth={1.8} />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity" aria-label="TikTok">
              <TiktokIcon className="w-5 h-5 text-forest" strokeWidth={1.8} />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-forest" strokeWidth={1.8} />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity" aria-label="YouTube">
              <Youtube className="w-5 h-5 text-forest" strokeWidth={1.8} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
