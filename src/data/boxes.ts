import { Box } from '../types';

export const boxes: Box[] = [
  {
    id: 'saveurs-occitanes',
    name: 'Saveurs Occitanes',
    description:
      "Notre box signature : miel de la région, tapenade, savon artisanal, douceurs et croûtons du coin.",
    price: 25,
    image: '/images/boxes/box-hero.jpg',
    contents: [
      'Miel de la région (125g)',
      'Savon artisanal au miel',
      "Tapenade d'olives noires (100g)",
      'Bonbons artisanaux',
      'Croûtons aux herbes locales',
    ],
    availableDate: '20 février 2026',
    category: 'decouverte',
    tier: 'premium',
    badge: undefined,
  },
];


