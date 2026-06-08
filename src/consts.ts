export const SITE = {
  name: 'Maxindo LED',
  url: 'https://maxindoled.com',
  email: 'info@maxindoled.com',
  whatsapp: '62812000000000',
  phoneDisplay: '+62 812-0000-0000',
  address: {
    street: 'Jl. Gempol Raya No.3A, RT.005/RW.009, Kunciran Indah',
    locality: 'Kec. Pinang, Kota Tangerang',
    region: 'Banten',
    postalCode: '15144',
    country: 'ID',
  },
  geo: { lat: -6.22, lng: 106.68 },
  social: {
    instagram: 'https://instagram.com/maxindoled',
    facebook: 'https://facebook.com/maxindoled',
    tiktok: 'https://tiktok.com/@maxindoled',
    youtube: 'https://youtube.com/@maxindoled',
  },
};

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
