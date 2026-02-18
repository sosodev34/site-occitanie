import { Heart, Sparkles, Users, Award } from 'lucide-react';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../lib/gsap';

export function AboutSection() {
  const rootRef = useRef<HTMLElement | null>(null);

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

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
      });

      tl.from(q('[data-gsap="about-title"]'), { y: 16, autoAlpha: 0, duration: 0.7 })
        .from(
          q('[data-gsap="about-subtitle"]'),
          { y: 16, autoAlpha: 0, duration: 0.7 },
          '-=0.45'
        )
        .from(
          q('[data-gsap="about-story-title"]'),
          { y: 16, autoAlpha: 0, duration: 0.7 },
          '-=0.35'
        )
        .from(
          q('[data-gsap="about-story-p"]'),
          { y: 12, autoAlpha: 0, duration: 0.65, stagger: 0.08 },
          '-=0.35'
        )
        .from(
          q('[data-gsap="about-story-image"]'),
          { scale: 0.985, autoAlpha: 0, duration: 0.9 },
          '-=0.65'
        );

      const valueCards = q('[data-gsap="about-value-card"]');
      gsap.set(valueCards, { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(valueCards, {
        start: 'top 86%',
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            clearProps: 'transform',
          }),
        once: true,
      });

      const producerCards = q('[data-gsap="about-producer-card"]');
      gsap.set(producerCards, { autoAlpha: 0, y: 18 });
      ScrollTrigger.batch(producerCards, {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.06,
            clearProps: 'transform',
          }),
        once: true,
      });

      const storyImage = q('[data-gsap="about-story-image"] img');
      gsap.to(storyImage, {
        y: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Local & Authentique',
      description:
        "On bosse avec des producteurs du coin : du vrai, du bon, et pas de blabla."
    },
    {
      icon: Users,
      title: 'Convivialité',
      description:
        "On vient pour le terroir, on reste pour l'ambiance. Simple, convivial, efficace."
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description:
        "On remet le terroir au goût du jour : accessible, fun, et toujours authentique."
    },
    {
      icon: Award,
      title: 'Qualité',
      description:
        "Chaque produit est choisi avec soin pour te garantir une dégustation vraiment réussie."
    }
  ];

  return (
    <section className="py-16 sm:py-20 scroll-mt-24" id="a-propos" ref={rootRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2
            data-gsap="about-title"
            className="font-sans font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Pourquoi on fait ça
          </h2>
          <p
            data-gsap="about-subtitle"
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Cœur d'Occitanie est né d'une idée simple : ramener les meilleurs produits
            du coin sur le campus, sans que ça explose le budget.
          </p>
        </div>

        {/* Histoire principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3
              data-gsap="about-story-title"
              className="font-sans font-extrabold tracking-tight text-foreground text-3xl"
            >
              Le terroir, mais sans prise de tête
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p data-gsap="about-story-p">
                Tout a commencé lors d'une soirée étudiante à Montpellier : on voulait du local,
                du quali, et pas juste "un truc vite fait". Alors on a créé un pont entre des
                producteurs passionnés et la communauté étudiante.
              </p>
              <p data-gsap="about-story-p">
                Aujourd'hui, on organise des événements festifs autour des produits du terroir,
                avec nos box en précommande à récupérer sur place.
              </p>
              <p data-gsap="about-story-p">
                Notre mission : prouver que tradition et modernité peuvent coexister — et que le
                terroir peut aussi être une vibe.
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              data-gsap="about-story-image"
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1765457458572-32674f854e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjBuaWdodCUyMGxpZ2h0cyUyMGZlc3RpdmFsfGVufDF8fHx8MTc3MDMwMTQxNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Notre foodtruck"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Nos valeurs */}
        <div className="mb-20">
          <h3 className="font-sans font-extrabold tracking-tight text-foreground text-3xl text-center mb-12">
            Nos Valeurs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                data-gsap="about-value-card"
                className="p-6 surface rounded-2xl border border-border hover:shadow-2xl transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-foreground mb-2 font-semibold">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Nos producteurs */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="font-sans font-extrabold tracking-tight text-foreground text-3xl">
              Nos Producteurs Partenaires
            </h3>
            <p className="text-lg text-muted-foreground">
              Nous sommes fiers de collaborer avec plus de 12 producteurs locaux 
              qui incarnent l'excellence et la passion du terroir occitan.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
              {[
                { name: 'Maison des Terrines', product: 'Terrines artisanales' },
                { name: 'Conserverie du Sud', product: 'Terrines & recettes du coin' },
                { name: 'Rucher des Garrigues', product: 'Miels de lavande' },
                { name: 'Conserverie Lou', product: 'Terrines & pâtés' },
                { name: 'Confiserie du Pic', product: 'Bonbons locaux' },
                { name: 'Biscuiterie des Cévennes', product: 'Biscuits & croquants' },
                { name: 'Crackers & Co', product: 'Crackers artisanaux' },
                { name: 'Oliveraie du Sud', product: 'Huiles & tapenades' },
              ].map((producer, index) => (
                <div
                  key={index}
                  data-gsap="about-producer-card"
                  className="p-4 surface rounded-xl border border-border text-left"
                >
                  <div className="text-sm text-foreground mb-1">{producer.name}</div>
                  <div className="text-xs text-muted-foreground">{producer.product}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


