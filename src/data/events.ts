import { Event } from '../types';

export const events: Event[] = [
  {
    id: 'intervention-jules-ferry-2026-03-12',
    title: 'Intervention à l’école Jules Ferry',
    date: '12 mars 2026',
    time: '9h00',
    location: 'École élémentaire publique Jules Ferry, Saint-Pargoire',
    description:
      'Intervention pédagogique dans l’école pour faire découvrir les produits du terroir et sensibiliser les élèves à l’anti-gaspi.',
    images: [
      '/images/event/IMG_0628.jpg', // était la 9/9, désormais en première position
      '/images/event/IMG_0607.jpg',
      '/images/event/IMG_0608.jpg',
      '/images/event/IMG_0609.jpg',
      '/images/event/IMG_0610.jpg',
      '/images/event/IMG_0614.jpg',
      '/images/event/IMG_0617.jpg',
      '/images/event/IMG_0623.jpg',
      '/images/event/IMG_0627.jpg',
    ],
    partnersInfo: 'Avec l’équipe enseignante et nos producteurs partenaires'
  }
];
