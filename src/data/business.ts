export interface BusinessInfo {
  name: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroItalic: string;
  heroSubtext: string;
  description: string;
  phone: string;
  phoneFormatted: string;
  phoneHref: string;
  whatsappHref: string;
  instagramUrl: string;
  instagramHandle: string;
  googleMapsUrl: string;
  hours: string;
  rating: number;
  ratingCount: string;
  zomatoUrl: string;
  swiggyUrl: string;
  districtUrl: string;
}

export const businessData: BusinessInfo = {
  name: 'Clubhouse Café',
  shortName: 'Clubhouse',
  tagline: 'Coffee. Food. Company.',
  heroHeadline: 'A PLACE TO',
  heroItalic: 'SLOW DOWN.',
  heroSubtext: 'Coffee, conversations & beautiful plates in good company.',
  description:
    'Nestled in the heart of Jalandhar, Punjab, Clubhouse Cafe is a charming coffee shop that offers a warm and inviting atmosphere. It is the ideal destination for coffee enthusiasts, food lovers and anyone looking for a cozy spot to socialise, read, or simply savour a delightful cup of coffee.',
  phone: '086997 66654',
  phoneFormatted: '+91 86997 66654',
  phoneHref: 'tel:08699766654',
  whatsappHref:
    'https://wa.me/918699766654?text=Hello%20Clubhouse%20Caf%C3%A9%2C%20I%20would%20like%20to%20reserve%20a%20table.',
  instagramUrl: 'https://www.instagram.com/clubhousecafe.in/',
  instagramHandle: '@clubhousecafe.in',
  googleMapsUrl: 'https://maps.app.goo.gl/6p3MRjtao5tJF8ni7',
  zomatoUrl: 'https://www.zomato.com/vi/jalandhar/clubhouse-cafe-model-town',
  swiggyUrl: 'https://www.swiggy.com/city/jalandhar/clubhouse-cafe-abadpura-model-town-rest1080009',
  districtUrl: 'https://www.district.in/dining/jalandhar/clubhouse-cafe-model-town',
  hours: '9:30 AM – 12:00 AM',
  rating: 4.3,
  ratingCount: '240+',
};
