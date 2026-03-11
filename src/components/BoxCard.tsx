import { Check, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Box } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface BoxCardProps {
  box: Box;
  onAddToCart: (box: Box) => void;
}

export function BoxCard({ box, onAddToCart }: BoxCardProps) {
  const isPremium = box.tier === 'premium';

  const categoryIcons: Record<Box['category'], string> = {
    charcuterie: '🥘',
    decouverte: '🎁',
  };

  const categoryLabels: Record<Box['category'], string> = {
    charcuterie: 'Terrines',
    decouverte: 'Découverte',
  };

  return (
    <div
      data-gsap="box-card"
      className={[
        'group bg-card rounded-3xl overflow-hidden border transition-shadow transition-transform duration-300 transform-gpu hover:-translate-y-1',
        isPremium
          ? 'border-primary/30 shadow-xl hover:shadow-2xl'
          : 'border-border hover:shadow-2xl',
      ].join(' ')}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={box.image}
          alt={box.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge
          variant="outline"
          className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border-border"
        >
          <span>{categoryIcons[box.category]}</span>
          <span className="text-foreground">{categoryLabels[box.category]}</span>
        </Badge>
        {box.badge && (
          <Badge
            variant="outline"
            className={[
              'absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm border backdrop-blur-sm',
              isPremium
                ? 'bg-primary/15 text-foreground border-primary/30'
                : 'bg-accent/20 text-foreground border-accent/30',
            ].join(' ')}
          >
            {box.badge}
          </Badge>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-4">
        <div>
          <h3
            className={[
              'text-foreground mb-2 tracking-tight',
              isPremium ? 'font-serif' : 'font-sans font-bold',
            ].join(' ')}
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
          >
            {box.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {box.description}
          </p>
        </div>

        {/* Contenu de la box */}
        <div className="space-y-2">
          <div className="text-sm text-foreground">Contient :</div>
          <ul className="space-y-1.5">
            {box.contents.slice(0, 4).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
            {box.contents.length > 4 && (
              <li className="text-sm text-primary pl-6">
                + {box.contents.length - 4} autres produits
              </li>
            )}
          </ul>
        </div>

        {/* Prix et disponibilité */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Retrait le</div>
              <div className="text-sm text-foreground">{box.availableDate}</div>
            </div>
            <div className="text-right">
              <div
                className={[
                  'text-3xl text-primary',
                  isPremium ? 'font-serif' : 'font-sans font-extrabold',
                ].join(' ')}
              >
                {box.price}€
              </div>
            </div>
          </div>

          <Button
            onClick={() => onAddToCart(box)}
            className={[
              'w-full h-auto py-3 px-6 rounded-full transition-all group/btn text-base',
              isPremium
                ? 'shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : '',
            ].join(' ')}
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            <span>Précommander</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

