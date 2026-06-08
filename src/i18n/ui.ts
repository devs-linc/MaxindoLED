export const languages = {
  id: 'Bahasa Indonesia',
  en: 'English',
} as const;

export const defaultLang = 'id';

export const ui = {
  id: {
    'nav.home': 'Beranda',
    'nav.services': 'Layanan',
    'nav.equipment': 'Peralatan',
    'nav.calculator': 'Kalkulator',
    'nav.events': 'Acara',
    'nav.portfolio': 'Portofolio',
    'nav.articles': 'Artikel',
    'nav.about': 'Tentang',
    'nav.contact': 'Kontak',
    'cta.whatsapp': 'Hubungi via WhatsApp',
    'hero.title': 'Sewa LED Screen & Audio Visual untuk Acara Anda',
    'hero.subtitle':
      'Penyewaan layar LED, sound system, dan multimedia profesional di Tangerang & Jakarta. Hasil maksimal, harga bersahabat.',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.equipment': 'Equipment',
    'nav.calculator': 'Calculator',
    'nav.events': 'Events',
    'nav.portfolio': 'Portfolio',
    'nav.articles': 'Articles',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'cta.whatsapp': 'Chat on WhatsApp',
    'hero.title': 'LED Screen & Audio Visual Rental for Your Event',
    'hero.subtitle':
      'Professional LED screen, sound system, and multimedia rental in Tangerang & Jakarta. Maximum impact, friendly pricing.',
  },
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)['id'];
