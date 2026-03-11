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
        'Nous collaborons avec des producteurs du territoire : des produits sincères, respectueux des savoir-faire.'
    },
    {
      icon: Users,
      title: 'Convivialité',
      description:
        'On se rassemble autour du terroir et on partage un moment chaleureux. Simple, convivial, efficace.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description:
        'Nous remettons le terroir au goût du jour : accessible, ludique et toujours authentique.'
    },
    {
      icon: Award,
      title: 'Qualité',
      description:
        'Chaque produit est sélectionné avec soin pour garantir une dégustation réussie.'
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
            Pourquoi transmettre le terroir
          </h2>
          <p
            data-gsap="about-subtitle"
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Cœur d'Occitanie est né d'une envie : transmettre la culture du terroir aux
            jeunes et aux plus jeunes, en la rendant accessible, vivante et abordable.
          </p>
        </div>

        {/* Histoire principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3
              data-gsap="about-story-title"
              className="font-sans font-extrabold tracking-tight text-foreground text-3xl"
            >
              Transmettre le terroir simplement
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p data-gsap="about-story-p">
                On s'est donné une mission simple : faire aimer le terroir aux jeunes et aussi aux
                plus jeunes. Leur montrer que derrière chaque produit, il y a des savoir-faire,
                des paysages et des personnes qui méritent d'être découverts.
              </p>
              <p data-gsap="about-story-p">
                On organise des événements, des dégustations et des interventions en milieu scolaire
                pour créer ce déclic : goûter, comprendre, échanger directement avec les producteurs
                qui font vivre notre région.
              </p>
              <p data-gsap="about-story-p">
                L'idée : enrichir la culture culinaire de chacun, donner envie de soutenir le local
                et prouver que tradition et modernité peuvent cohabiter sans perdre ce qui fait la
                force du terroir.
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              data-gsap="about-story-image"
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/montpellier.jpg"
                alt="Place de la Comédie à Montpellier, Sud de la France"
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
                {
                  product: 'Tapenade',
                  producer: 'Mamili',
                  link: 'https://mamili.square.site/product/olivade-',
                  status: 'Partenariat',
                },
                {
                  product: 'Croûton',
                  producer: 'Mamili',
                  link: 'https://mamili.square.site/product/olivade-',
                  status: 'Partenariat',
                },
                {
                  product: 'Gâteau',
                  producer: "Trésors d'Occitanie",
                  link: 'https://tresorsdoccitanie.fr/',
                  status: 'Attente de réponse',
                },
                {
                  product: 'Savon',
                  producer: 'Olidoc',
                  link: 'https://www.olidoc.com/8-savons',
                  status: 'Partenariat',
                },
                {
                  product: 'Bonbon grisette',
                  producer: 'Bonbons Grisettes',
                  link: 'https://bonbonsgrisettes.fr',
                  status: 'Aucune réponse',
                },
                {
                  product: "Miel (Rucher de l'Estagnol)",
                  producer: "Miellerie Rucher de l'Estagnol, Saussan",
                  status: 'Contacté',
                },
                {
                  product: 'Bonbons (violette)',
                  producer: 'Biscuiterie Saint-Guilhem',
                  link: 'https://biscuiteriesaintguilhem.fr/contact/',
                  status: 'Partenariat (en cours)',
                },
                {
                  product: 'Autre miel',
                  producer: 'Miel Naturel',
                  link: 'https://www.miel-naturel.com/index.php/miels-naturel',
                  status: 'Attente de réponse',
                },
                {
                  product: 'Tisane',
                  producer: 'Douce Réglisse coupée de Montpellier',
                  status: 'Refusé',
                },
                {
                  product: 'Confiture',
                  producer: 'Les confitures de Sophie',
                  status: 'Contacté',
                },
                {
                  product: 'Miel de garrigue sauvage',
                  producer:
                    'Julien Bourrette, apiculteur récoltant (Saint-André-de-Sangonis)',
                  link: 'https://www.tourisme-occitanie.com/fr/fiche/degustation/julien-bourrette-apiculteur-recoltant-saint-andre-de-sangonis_TFODEGLAR034V50MI8F/',
                  status: 'Partenariat',
                },
              ]
                .filter(
                  (producer) =>
                    producer.status &&
                    (producer.status === 'Partenariat' ||
                      producer.status.includes('Partenariat'))
                )
                .map((producer, index) => (
                <div
                  key={index}
                  data-gsap="about-producer-card"
                  className="p-4 surface rounded-xl border border-border text-left"
                >
                  <div className="text-sm text-foreground mb-1">{producer.product}</div>
                  <div className="text-xs text-muted-foreground">{producer.producer}</div>
                  {producer.link && (
                    <a
                      href={producer.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary hover:underline block mt-1"
                    >
                      Lien producteur
                    </a>
                  )}
                  {producer.status && (
                    <div className="text-xs text-foreground mt-1">Statut : {producer.status}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


