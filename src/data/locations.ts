export interface LocationItem {
  id: string;
  city: string;
  state: string;
  badge: string;
  isAvailable: boolean;
  addressLine1: string;
  addressLine2?: string;
  fullAddress: string;
  phone?: string;
  phoneHref?: string;
  hours?: string;
  mapsUrl?: string;
  description?: string;
}

export const locationsData: LocationItem[] = [
  {
    id: 'jalandhar',
    city: 'Jalandhar',
    state: 'Punjab',
    badge: 'Flagship Destination',
    isAvailable: true,
    addressLine1: 'Ground Floor, The Elite City Center',
    addressLine2: 'Model Town Rd, Abadpura, Model Town, Jalandhar, Punjab 144001',
    fullAddress: 'Ground Floor, The Elite City Center, Model Town Rd, Abadpura, Model Town, Jalandhar, Punjab 144001',
    phone: '086997 66654',
    phoneHref: 'tel:08699766654',
    hours: '9:30 AM – 12:00 AM',
    mapsUrl: 'https://maps.app.goo.gl/6p3MRjtao5tJF8ni7',
    description:
      'Our flagship sanctuary in Model Town, thoughtfully designed with fluted sage seating, Carrara marble, warm timber and tranquil daylight.',
  },
  {
    id: 'amritsar',
    city: 'Amritsar',
    state: 'Punjab',
    badge: 'Coming Soon',
    isAvailable: false,
    addressLine1: 'Address Coming Soon',
    addressLine2: 'Details will be announced shortly',
    fullAddress: 'Amritsar, Punjab',
    description:
      'We are crafting our second home in the holy city of Amritsar. Address, hours, and opening dates will be announced soon.',
  },
];
