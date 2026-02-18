import { Box } from '../types';

export const boxes: Box[] = [
  {
    id: 'saveurs-occitanes',
    name: 'Saveurs Occitanes',
    description: "Notre box signature : un voyage gustatif au cœur de l'Occitanie. Terrines artisanales et douceurs locales pour une dégustation généreuse.",
    price: 25,
    image: '/images/boxes/box-hero2.png',
    contents: [
      'Terrine de canard aux cèpes (180g)',
      'Terrine de campagne artisanale (180g)',
      'Miel de lavande local (125g)',
      'Bonbons artisanaux au miel (100g)',
      'Tapenade d\'olives noires (100g)',
      'Pain aux céréales artisanal'
    ],
    availableDate: '20 février 2026',
    category: 'decouverte',
    tier: 'premium',
    badge: 'Signature'
  },
  {
    id: 'decouverte-etudiant',
    name: 'Box Découverte Étudiant',
    description:
      'La box découverte à prix doux : un format accessible, des produits locaux, et tout ce qu’il faut pour grignoter (vraiment) bien.',
    price: 18,
    image: '/images/boxes/box-hero.png',
    contents: [
      'Terrine de campagne artisanale (90g)',
      'Tapenade d\'olives noires (80g)',
      'Bonbons artisanaux locaux (80g)',
      'Mini pot de miel de garrigue (50g)',
      'Crackers artisanaux (90g)',
      'Pain de campagne (portion)'
    ],
    availableDate: '20 février 2026',
    category: 'decouverte',
    tier: 'student',
    badge: 'Prix étudiant'
  }
];


