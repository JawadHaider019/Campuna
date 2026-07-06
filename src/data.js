export const CATEGORIES = [
  {
    id: '1',
    name: 'Camping Zubehör',
    count: 31,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    slug: 'camping-zubehoer',
    iconName: 'Tent'
  },
  {
    id: '2',
    name: 'Wohnmobile & Camper',
    count: 24,
    image: 'https://images.unsplash.com/photo-1523987355122-83482224058b?auto=format&fit=crop&w=600&q=80',
    slug: 'wohnmobile-camper',
    iconName: 'Truck'
  },
  {
    id: '3',
    name: 'Zelte & Dachzelte',
    count: 3,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
    slug: 'zelte-dachzelte',
    iconName: 'Mountain'
  },
  {
    id: '4',
    name: 'Fahrräder & Träger',
    count: 3,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
    slug: 'fahrraeder-traeger',
    iconName: 'Bike'
  },
  {
    id: '5',
    name: 'Stellplätze & Campingplätze',
    count: 15,
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
    slug: 'stellplaetze',
    iconName: 'MapPin'
  },
  {
    id: '6',
    name: 'Camping Services',
    count: 9,
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=600&q=80',
    slug: 'camping-services',
    iconName: 'Wrench'
  },
  {
    id: '7',
    name: 'Tiny Houses',
    count: 4,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
    slug: 'tiny-houses',
    iconName: 'Home'
  },
  {
    id: '8',
    name: 'Mieten & Vermieten',
    count: 7,
    image: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?auto=format&fit=crop&w=600&q=80',
    slug: 'mieten-vermieten',
    iconName: 'Key'
  }
];

export const FEATURED_LISTINGS = [
  {
    id: 'lst_1',
    title: 'VW T6 Camper Van Bulli, G...',
    category: 'Wohnmobile & Camper',
    price: 36900,
    pricePeriod: 'Kaufpreis',
    location: 'Erfurt, Thüringen',
    rating: 4.8,
    reviewsCount: 12,
    images: [
      '/collection/vw t6.avif'
    ],
    seller: {
      name: 'Privatverkäufer',
      verified: true,
      type: 'Privat'
    },
    features: ['Diesel', 'Schaltgetriebe', 'Küche', '4 Schlafplätze'],
    isExclusive: true
  },
  {
    id: 'lst_2',
    title: 'Hindermann Four Seasons A...',
    category: 'Camping Zubehör',
    price: 75,
    pricePeriod: 'Preis',
    location: 'Trebbin, Brandenburg',
    rating: 4.9,
    reviewsCount: 8,
    images: [
      '/collection/Hindemann.avif'
    ],
    seller: {
      name: 'Privatverkäufer',
      verified: true,
      type: 'Privat'
    },
    features: ['Thermovorhang', 'Winterfest', 'Fenstermatte'],
    isExclusive: false
  },
  {
    id: 'lst_3',
    title: 'Ford Transit Randger R 53...',
    category: 'Wohnmobile & Camper',
    price: 43500,
    pricePeriod: 'Kaufpreis',
    location: 'Dausenau, Rheinland-Pfalz',
    rating: 4.7,
    reviewsCount: 5,
    images: [
      '/collection/ford transit.avif'
    ],
    seller: {
      name: 'Privatverkäufer',
      verified: true,
      type: 'Privat'
    },
    features: ['Autark', 'Randger Ausbau', 'Standheizung'],
    isExclusive: true
  },
  {
    id: 'lst_4',
    title: '9 Sitzer Bus mieten...',
    category: 'Mieten & Vermieten',
    price: 100,
    pricePeriod: 'pro Tag',
    location: 'Bruchsal, BW',
    rating: 5.0,
    reviewsCount: 20,
    images: [
      '/collection/9 sitzer.avif'
    ],
    seller: {
      name: 'Gewerblicher Anbieter',
      verified: true,
      type: 'Gewerblich'
    },
    features: ['9 Sitzplätze', 'Viel Stauraum', 'Klimaanlage'],
    isExclusive: false
  },
  {
    id: 'lst_5',
    title: 'Carado T-447 mieten...',
    category: 'Mieten & Vermieten',
    price: 115,
    pricePeriod: 'pro Tag',
    location: 'Bruchsal, BW',
    rating: 4.9,
    reviewsCount: 15,
    images: [
      '/collection/carado.avif'
    ],
    seller: {
      name: 'Gewerblicher Anbieter',
      verified: true,
      type: 'Gewerblich'
    },
    features: ['Teintegrierter Camper', 'Einzelbetten', 'Große Heckgarage'],
    isExclusive: true
  },
  {
    id: 'lst_6',
    title: 'Camper Bus Vivaro zu verm...',
    category: 'Mieten & Vermieten',
    price: 100,
    pricePeriod: 'pro Tag',
    location: 'Bruchsal, BW',
    rating: 4.8,
    reviewsCount: 9,
    images: [
      '/collection/camper bus.avif'
    ],
    seller: {
      name: 'Gewerblicher Anbieter',
      verified: true,
      type: 'Gewerblich'
    },
    features: ['Kompakter Ausbau', 'Ideal für Paare', 'Anhängerkupplung'],
    isExclusive: false
  },
  {
    id: 'lst_7',
    title: 'Sonnenschirmständer für S...',
    category: 'Camping Zubehör',
    price: 40,
    pricePeriod: 'Preis',
    location: 'Trebbin, Brandenburg',
    rating: 5.0,
    reviewsCount: 3,
    images: [
      '/collection/sonnenschirmstander.avif'
    ],
    seller: {
      name: 'Privatverkäufer',
      verified: true,
      type: 'Privat'
    },
    features: ['Stabil', 'Wetterfest'],
    isExclusive: false
  },
  {
    id: 'lst_8',
    title: 'Kompakter Outdoortisch we...',
    category: 'Camping Zubehör',
    price: 50,
    pricePeriod: 'Preis',
    location: 'Trebbin, Brandenburg',
    rating: 4.6,
    reviewsCount: 7,
    images: [
      '/collection/kompakter.avif'
    ],
    seller: {
      name: 'Privatverkäufer',
      verified: true,
      type: 'Privat'
    },
    features: ['Klappbar', 'Leichtgewicht'],
    isExclusive: false
  },
  {
    id: 'lst_9',
    title: 'Westfield Ambassador 2 Be...',
    category: 'Camping Zubehör',
    price: 22,
    pricePeriod: 'Preis',
    location: 'Trebbin, Brandenburg',
    rating: 4.4,
    reviewsCount: 4,
    images: [
      '/collection/westfield.avif'
    ],
    seller: {
      name: 'Privatverkäufer',
      verified: true,
      type: 'Privat'
    },
    features: ['Gebraucht', 'Top Zustand'],
    isExclusive: false
  },
  {
    id: 'lst_10',
    title: 'Weinsberg Cara two...',
    category: 'Wohnmobile & Camper',
    price: 11500,
    pricePeriod: 'Kaufpreis',
    location: 'Erfurt, Thüringen',
    rating: 4.9,
    reviewsCount: 11,
    images: [
      '/collection/weinsberg.avif'
    ],
    seller: {
      name: 'Privatverkäufer',
      verified: true,
      type: 'Privat'
    },
    features: ['Gepflegt', 'Scheckheftgepflegt'],
    isExclusive: true
  },
  {
    id: 'lst_11',
    title: 'Wohnwagen Knaus Deseo TR...',
    category: 'Wohnmobile & Camper',
    price: 13800,
    pricePeriod: 'Kaufpreis',
    location: 'Riegelsberg, Saarland',
    rating: 4.8,
    reviewsCount: 6,
    images: [
      '/collection/wohnwagen.avif'
    ],
    seller: {
      name: 'Privatverkäufer',
      verified: true,
      type: 'Privat'
    },
    features: ['Transport-Caravan', 'Zusatzfenster', 'Kompakt'],
    isExclusive: true
  }
];

export const PROVIDERS = [
  {
    id: 'prov_1',
    name: 'VTMCAMPING',
    logo: '/partners/vtmcamping-logo.avif',
    coverImage: '/partners/vtmcamping-cover.avif',
    description: 'Wir lieben, was wir tun...',
    slug: '?uid=1776803829229x189417462630120600',
    listingsCount: 3,
    rating: 4.9,
    location: 'Deutschland'
  },
  {
    id: 'prov_2',
    name: 'CUBE4LIFE Campingboxen',
    logo: '/partners/cube4life-logo.avif',
    coverImage: '/partners/cube4life-cover.avif',
    description: 'CUBE4LIFE – Dein Auto. Deine Freiheit. Dein System.',
    slug: '?uid=1776160822121x699323185804907400',
    listingsCount: 3,
    rating: 4.95,
    location: 'Bielefeld'
  },
  {
    id: 'prov_3',
    name: 'DümmerMobile',
    logo: '/partners/dummermobile-logo.avif',
    coverImage: '/partners/dummermobile-cover.avif',
    description: 'Expertise in Wohnmobilen und Campern.',
    slug: '?uid=1776869525532x299821018455849200',
    listingsCount: 3,
    rating: 4.85,
    location: 'Dümmer'
  },
  {
    id: 'prov_4',
    name: 'CVB',
    logo: '/partners/cvb-logo.png',
    coverImage: '/partners/cvb-cover.png',
    slug: '?uid=1776687522610x609488749931111700',
    listingsCount: 1,
  },
  {
    id: 'prov_5',
    name: 'Team Lorenz Wohnmobile',
    logo: '/partners/teamlorenz-logo.png',
    coverImage: '/partners/teamlorenz-cover.png',
    slug: '?uid=1780250702063x648952957542537000',
    listingsCount: 3,
  },
  {
    id: 'prov_6',
    name: 'Björn Lindemann',
    logo: '/partners/björnlindemann-cover.png',
    coverImage: '/partners/björnlindemann-cover.png',
    slug: '?uid=1776890947085x969286827362994400',
    listingsCount: 1,
  },
  {
    id: 'prov_7',
    name: 'Casamaki',
    logo: '/partners/casamaki-logo.avif',
    coverImage: '/partners/casemaki-cover.avif',
    description: 'Nr. 1 Partner für Wohnkabinen 🚐 Festaufbau &...',
    slug: '?uid=1774612775285x928668539058932000',
    listingsCount: 3,
    rating: 4.9,
    location: 'Deutschland'
  },
  {
    id: 'prov_8',
    name: 'ProVerDa GmbH',
    logo: '/partners/proverdaGmbh-logo.avif',
    coverImage: '/partners/proverdaGmbh-cover.avif',
    description: 'Professionelle Verkaufsdatenbank für Camper.',
    slug: '?uid=1775591052758x777492336252758700',
    listingsCount: 1,
    rating: 4.7,
    location: 'Gewerblich'
  },
  {
    id: 'prov_9',
    name: 'LuckyBoxOWL',
    logo: '/partners/luckyboxowl-logo.avif',
    coverImage: '/partners/luckbowlowl-cover.avif',
    description: 'Wir sind ein kleines, familiengeführtes Unternehmen...',
    slug: '?uid=1776402781762x371166055146309600',
    listingsCount: 3,
    rating: 4.8,
    location: 'OWL'
  },
  {
    id: 'prov_10',
    name: 'NALUX | Professionelle ..',
    logo: '/partners/nalux-logo.avif',
    coverImage: '/partners/nalux-cover.avif',
    description: 'Fahrzeugveredelung - Wohnmobil &...',
    slug: '?uid=1776108717846x665627376733133800',
    listingsCount: 3,
    rating: 4.9,
    location: 'Deutschland'
  },
  {
    id: 'prov_11',
    name: 'Trailer Manufaktur NRW',
    logo: '/partners/trailer-logo.avif',
    coverImage: '/partners/trailer-cover.jpg',
    description: 'Umbauten von PKW Anhänger in...',
    slug: '?uid=1774805620399x549661505373624900',
    listingsCount: 1,
    rating: 4.8,
    location: 'NRW'
  },
  {
    id: 'prov_12',
    name: 'LivianEssence',
    logo: '/partners/LivianEssense-logo.avif',
    coverImage: '/partners/LivianEssense-cover.avif',
    description: 'Livianessence | Tiny House...',
    slug: '?uid=1775565921784x138051037995865710',
    listingsCount: 3,
    rating: 4.95,
    location: 'Tiny Living'
  },
  {
    id: 'prov_13',
    name: 'TS Caravanverleih',
    logo: '/partners/tsCaravanverleih-logo.avif',
    coverImage: '/partners/tsCaravanverleih-cover.avif',
    description: 'Ihre Wohnwagenvermietung in und um Erfurt...',
    slug: '?uid=1774108990415x175532623183632930',
    listingsCount: 4,
    rating: 4.95,
    location: 'Erfurt'
  }
];

export const BLOG_POSTS = [
  {
    id: 'blog_1',
    title: 'Was ist Campuna? | Der Camping-Marktplatz für...',
    excerpt: 'Campuna ist der spezialisierte Camping-Marktplatz für private und gewerbliche Angebote in Deutschland.',
    category: 'Campuna blogs',
    image: '/blogs/Was ist Campuna blog.avif',
    readTime: '6 Min.',
    date: '09.05.2026',
    updateDate: 'Mai 9, 2026',
    slug: 'was-ist-campuna',
    author: {
      name: 'Campuna Team',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 'blog_2',
    title: 'Wohnwagen gebraucht kaufen: 10 wichtige Tipps vor dem Kauf',
    excerpt: 'Du möchtest einen Wohnwagen gebraucht kaufen? Beachte diese 10 essentiellen Tipps...',
    category: 'Campuna blogs',
    image: '/blogs/Wohnwagen gebraucht 10  blog.avif',
    readTime: '5 Min.',
    date: '09.06.2026',
    updateDate: 'Juni 9, 2026',
    slug: 'wohnwagen-gebraucht-kaufen-tipps',
    author: {
      name: 'Experten-Tipp',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 'blog_3',
    title: 'Dachzelt kaufen: Worauf Anfänger wirklich achten...',
    excerpt: 'Dachzelte liegen voll im Trend. Aber worauf kommt es beim Kauf wirklich an?',
    category: 'Campuna blogs',
    image: '/blogs/Dachzelt kaufen blog.avif',
    readTime: '7 Min.',
    date: '16.06.2026',
    updateDate: 'Juni 16, 2026',
    slug: 'dachzelt-kaufen-tipps',
    author: {
      name: 'Campuna Guide',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 'blog_4',
    title: 'Wohnwagen gebraucht kaufen: Die wichtigste Checkliste für...',
    excerpt: 'Mit unserer Checkliste bist du beim Kauf eines gebrauchten Wohnwagens auf der sicheren Seite.',
    category: 'Campuna blogs',
    image: '/blogs/Wohnwagen gebraucht Die blog.avif',
    readTime: '10 Min.',
    date: '02.06.2026',
    updateDate: 'Juni 2, 2026',
    slug: 'wohnwagen-gebraucht-kaufen',
    author: {
      name: 'Checklisten-Profi',
      avatar: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=100&q=80'
    }
  }
];

export const FAQS = [
  {
    id: 'faq_1',
    question: 'Was ist Campuna?',
    answer: 'Campuna ist Deutschlands spezialisierter Marktplatz für gebrauchte Camping-Ausrüstung. Hier können Camper ihre gebrauchten Zelte, Schlafsäcke, Kocher und Wohnwagen-Zubehör kaufen und verkaufen – einfach, sicher und kostenlos.'
  },
  {
    id: 'faq_2',
    question: 'Für wen ist Campuna geeignet?',
    answer: 'Campuna ist ideal für alle Camping-Begeisterten in Deutschland – egal ob Anfänger oder erfahrene Camper. Wer hochwertige Ausrüstung günstig kaufen oder gebrauchte Artikel verkaufen möchte, ist bei uns genau richtig.'
  },
  {
    id: 'faq_3',
    question: 'Wie kann ich auf Campuna verkaufen?',
    answer: 'Das Inserieren auf Campuna ist ganz einfach: Registriere dich kostenlos, erstelle dein Inserat mit Fotos und Beschreibung, und schon können Interessenten dich kontaktieren.'
  },
  {
    id: 'faq_4',
    question: 'Kostet das Inserieren auf Campuna etwas?',
    answer: 'Nein! Das Einstellen von Inseraten auf Campuna ist komplett kostenlos. Wir glauben daran, dass Camper ohne versteckte Gebühren handeln können sollen.'
  },
  {
    id: 'faq_5',
    question: 'Welche Camping-Artikel kann ich auf Campuna verkaufen?',
    answer: 'Du kannst nahezu alle Camping-Artikel verkaufen: Zelte, Schlafsäcke, Isomatten, Campingkocher, Laternen, Rucksäcke, Wohnwagen-Zubehör, Campingmöbel und vieles mehr.'
  },
  {
    id: 'faq_6',
    question: 'Wie finde ich günstige Camping-Ausrüstung auf Campuna?',
    answer: 'Nutze einfach die Suchfunktion und filtere nach Kategorie, Preis oder Standort. So findest du schnell das passende Angebot in deiner Nähe oder deutschlandweit.'
  }
];
