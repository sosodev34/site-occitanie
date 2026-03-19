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
    referencePrice: {
      value: 27,
      periodLabel: 'Prix le plus bas des 30 derniers jours',
      startDate: '19 février 2026',
      endDate: '20 mars 2026',
    },
    foodInfo: {
      denomination: 'Coffret dégustation produits du terroir d’Occitanie',
      description:
        "Box contenant des produits alimentaires conditionnés par leurs producteurs. Informations détaillées disponibles par produit.",
      netQuantity: 'Environ 625 g (voir détail par produit)',
      ingredients:
        'Voir détail par produit ci-dessous. Peut contenir : gluten, fruits à coque, arachides, sésame, lait, œufs, soja.',
      allergens: ['Gluten', 'Fruits à coque', 'Arachide', 'Sésame', 'Lait', 'Œufs', 'Soja'],
      storage: 'À conserver dans un endroit frais et sec, à l’abri de la lumière.',
      usageTips: 'Se consomme de préférence avant la date indiquée sur chaque produit.',
      origin: 'Occitanie, France (producteurs partenaires)',
      boxComposition: [
        'Miel de la région 125 g',
        'Tapenade d’olives noires 100 g',
        'Bonbons artisanaux',
        'Croûtons aux herbes',
        'Savon artisanal au miel',
      ],
      items: [
        {
          name: 'Miel de la région',
          netQuantity: '125 g',
          ingredients: '100 % miel de fleurs',
          allergens: [],
          origin: 'Occitanie, France',
        },
        {
          name: 'Tapenade d’olives noires',
          netQuantity: '100 g',
          ingredients: 'Olives noires, huile d’olive, câpres, anchois, sel, poivre.',
          allergens: ['Poisson'],
          origin: 'Occitanie, France',
        },
        {
          name: 'Croûtons aux herbes locales',
          netQuantity: '80 g',
          ingredients:
            'Farine de blé, huile de tournesol, herbes de Provence, sel, levure. Traces éventuelles de sésame et fruits à coque.',
          allergens: ['Gluten', 'Sésame', 'Fruits à coque'],
          origin: 'Occitanie, France',
        },
      ],
    },
  },
];


