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
    hours: '10:30 AM to 12 AM',
    mapsUrl: 'https://maps.app.goo.gl/6p3MRjtao5tJF8ni7',
    description:
      'Our main café in Model Town, Jalandhar. A warm and inviting space to enjoy fresh coffee, delicious bakery treats, and great food with family and friends.',
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
      'We are bringing Clubhouse to Amritsar soon. Opening dates, exact location, and timings will be announced shortly.',
  },
];
