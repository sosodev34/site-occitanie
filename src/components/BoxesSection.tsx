"use client";
import { useLayoutEffect, useRef, useState } from 'react';
import { BoxCard } from './BoxCard';
import { Box } from '../types';
import { boxes } from '../data/boxes';
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../lib/gsap';
import { Button } from './ui/button';

interface BoxesSectionProps {
  onAddToCart: (box: Box) => void;
}

export function BoxesSection({ onAddToCart }: BoxesSectionProps) {
  type CategoryId = 'tous' | Box['category'];

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('tous');
  const rootRef = useRef<HTMLElement | null>(null);

  const categoryMeta: Record<Box['category'], { label: string; icon: string }> = {
    decouverte: { label: 'Découverte', icon: '✨' },
    charcuterie: { label: 'Terrines', icon: '🥘' },
  };

  const uniqueCategories = Array.from(new Set(boxes.map((box) => box.category)));
  const categories: Array<{ id: CategoryId; label: string; icon: string }> = [
    { id: 'tous', label: 'Toutes les Box', icon: '🎁' },
    ...uniqueCategories.map((id) => ({ id, ...categoryMeta[id] })),
  ];

  // If the previously selected category disappears (hot reload, etc.), fall back to "tous".
  const effectiveSelectedCategory: CategoryId =
    selectedCategory === 'tous'
      ? 'tous'
      : uniqueCategories.includes(selectedCategory)
        ? selectedCategory
        : 'tous';

  const filteredBoxes =
    effectiveSelectedCategory === 'tous'
      ? boxes
      : boxes.filter((box) => box.category === effectiveSelectedCategory);

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap.from(q('[data-gsap="boxes-title"]'), {
        y: 16,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.from(q('[data-gsap="boxes-subtitle"]'), {
        y: 16,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.05,
      });

      const cards = q('[data-gsap="box-card"]');
      gsap.set(cards, { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch(cards, {
        start: 'top 86%',
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
            clearProps: 'transform',
          }),
        once: true,
      });

      const howCard = q('[data-gsap="how-card"]')[0] as HTMLElement | undefined;
      if (howCard) {
        gsap.from(howCard, {
          y: 16,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: howCard, start: 'top 86%', once: true },
        });
      }

      const steps = q('[data-gsap="how-step"]');
      gsap.set(steps, { autoAlpha: 0, y: 16 });
      ScrollTrigger.batch(steps, {
        start: 'top 92%',
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            clearProps: 'transform',
          }),
        once: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 sm:py-20 scroll-mt-24" id="boxes" ref={rootRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2
            data-gsap="boxes-title"
            className="font-sans font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Les box du terroir,{' '}
            <span className="text-gradient animate-shine">pour transmettre</span>
          </h2>
          <p
            data-gsap="boxes-subtitle"
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Précommande en ligne, retrait lors des événements et interventions. Une box{' '}
            <span className="text-foreground">signature</span>, généreuse, locale, pensée pour
            faire découvrir nos producteurs aux jeunes publics.
          </p>
        </div>

        {/* Filtres */}
        {uniqueCategories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={
                  effectiveSelectedCategory === category.id ? 'default' : 'outline'
                }
                className={[
                  'h-auto px-6 py-3 rounded-full transition-all flex items-center gap-2 text-base',
                  effectiveSelectedCategory === category.id
                    ? 'shadow-lg scale-105'
                    : 'bg-card border-border text-foreground hover:border-primary hover:text-primary',
                ].join(' ')}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </Button>
            ))}
          </div>
        )}

        {/* Grille de box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 place-items-center">
          {filteredBoxes.map((box) => (
            <BoxCard key={box.id} box={box} onAddToCart={onAddToCart} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Visuels à caractère promotionnel uniquement. Photos non contractuelles.
        </p>

        {/* Info précommande */}
        <div
          data-gsap="how-card"
          className="mt-16 p-8 surface rounded-3xl border border-accent/30"
        >
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="font-sans font-extrabold tracking-tight text-foreground text-2xl">
              Comment ça marche ?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div data-gsap="how-step" className="space-y-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl mx-auto">
                  1
                </div>
                <h4 className="text-foreground font-semibold">Je commande en ligne</h4>
                <p className="text-sm text-muted-foreground">
                  Sélection de la box et paiement sécurisé en quelques instants.
                </p>
              </div>
              <div data-gsap="how-step" className="space-y-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl mx-auto">
                  2
                </div>
                <h4 className="text-foreground font-semibold">Je me présente sur place</h4>
                <p className="text-sm text-muted-foreground">
                  Accueil lors de l’événement ou de l’intervention, confirmation email en main.
                </p>
              </div>
              <div data-gsap="how-step" className="space-y-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl mx-auto">
                  3
                </div>
                <h4 className="text-foreground font-semibold">Je récupère la box</h4>
                <p className="text-sm text-muted-foreground">
                  Remise sur place puis dégustation en toute simplicité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





