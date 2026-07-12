import { TbBrandFacebook, TbBrandTiktok, TbBrandInstagram, TbBrandYoutube } from 'react-icons/tb';
import { getParentNavigationUrl } from '../utils/navigation';

export default function Footer() {
  return (
    <footer id="footer" className="bg-sand text-charcoal pt-16 pb-4">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="mb-8">
          <p className="font-sans text-[13px] text-charcoal/70 italic leading-relaxed text-center">
            Campuna ist Deutschlands Camping-Marktplatz für Wohnmobile, Wohnwagen, Campingbusse, Campingzubehör, Stellplätze, Campingplätze, Vermietungen und Dienstleistungen rund ums Camping. Entdecke Angebote von privaten und gewerblichen Anbietern – alles an einem Ort.
          </p>
        </div>
        {/* Main Footer Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">

          {/* Logo & Manifesto Column */}
          <div className="flex flex-col space-y-4 max-w-xs items-start h-auto">
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

          {/* Navigation Column */}
          <div className="space-y-4 min-w-[150px] h-auto">
            <h4 className="font-sans text-[16px] font-bold text-forest tracking-[0.2em] uppercase">
              Navigation
            </h4>
            <ul className="space-y-3 font-sans text-[14px] text-charcoal/80">
              <li>
                <a href={getParentNavigationUrl('')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Startseite
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('my_account')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Mein Konto
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('about_us')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Über uns
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('how_campuna_works')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  So funktioniert Campuna
                </a>
              </li>
            </ul>
          </div>

          {/* Camping-Marktplatz Column */}
          <div className="space-y-4 min-w-[180px] h-auto">
            <h4 className="font-sans text-[16px] font-bold text-forest tracking-[0.2em] uppercase">
              Marktplatz
            </h4>
            <ul className="space-y-3 font-sans text-[14px] text-charcoal/80">
              <li>
                <a href={getParentNavigationUrl('all_listings?cat=fahrzeuge&kw=Wohnmobil')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Wohnmobile
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('all_listings?cat=fahrzeuge&kw=Wohnwagen')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Wohnwagen
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('all_listings?cat=fahrzeuge&kw=Campingbus')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Campingbusse
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('category/ausrüstung-und-zubehör')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Campingzubehör
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('all_listings?cat=campingplätze-stellplätze&kw=Campingplatz')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Campingplätze
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('all_listings?cat=campingplätze-stellplätze&kw=Stellplatz')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Stellplätze
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('category/mieten-vermieten')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Vermietung
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('category/dienstleistungen')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Dienstleistungen
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('all_business')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Anbieter
                </a>
              </li>

            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4 min-w-[150px]">
            <h4 className="font-sans text-[16px] font-bold text-forest tracking-[0.2em] uppercase">
              Support
            </h4>
            <ul className="space-y-3 font-sans text-[14px] text-charcoal/80">
              <li>
                <a href={getParentNavigationUrl('faq_hilfe')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Hilfe & FAQ
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('contact_kontakt')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Kontakt
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('act_safely__sicher_handeln')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Sicher handeln
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('missing_anything__fehlt_dir_etwas')} target="_parent" className="hover:text-forest transition-colors font-[400] leading-tight block">
                  Fehlt dir etwas?
                  Sag es uns
                </a>
              </li>
            </ul>
          </div>

          {/* Rechtliches Column */}
          <div className="space-y-4 min-w-[150px]">
            <h4 className="font-sans text-[16px] font-bold text-forest tracking-[0.2em] uppercase">
              Rechtliches
            </h4>
            <ul className="space-y-3 font-sans text-[14px]  text-charcoal/80">
              <li>
                <a href={getParentNavigationUrl('agb')} target="_parent" className="hover:text-forest transition-colors font-[400] ">
                  AGB
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('nutzungsbedingungen')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Nutzungsbedingungen
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('datenschutzerkl_rung')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href={getParentNavigationUrl('impressum')} target="_parent" className="hover:text-forest transition-colors font-[400]">
                  Impressum
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-7 mt-8 text-[12px] text-charcoal/80 font-sans">
          <p className="text-center font-normal">
            © 2026 Campuna. Alle Rechte vorbehalten.
          </p>

          <div className="flex items-center gap-5 justify-center">
            <a href="#" className="hover:opacity-75 transition-opacity" aria-label="Facebook">
              <TbBrandFacebook className="w-6 h-6 text-forest" strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity" aria-label="TikTok">
              <TbBrandTiktok className="w-6 h-6 text-forest" strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity" aria-label="Instagram">
              <TbBrandInstagram className="w-6 h-6 text-forest" strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity" aria-label="YouTube">
              <TbBrandYoutube className="w-6 h-6 text-forest" strokeWidth={1.5} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
