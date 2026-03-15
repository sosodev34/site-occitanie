import { Heart, Sparkles, Users, Award } from "lucide-react";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../lib/gsap";
import { useI18n } from "../lib/i18n";

export function AboutSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { t } = useI18n();

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.from(q('[data-gsap="about-title"]'), { y: 16, autoAlpha: 0, duration: 0.7 })
        .from(
          q('[data-gsap="about-subtitle"]'),
          { y: 16, autoAlpha: 0, duration: 0.7 },
          "-=0.45"
        )
        .from(
          q('[data-gsap="about-story-title"]'),
          { y: 16, autoAlpha: 0, duration: 0.7 },
          "-=0.35"
        )
        .from(
          q('[data-gsap="about-story-p"]'),
          { y: 12, autoAlpha: 0, duration: 0.65, stagger: 0.08 },
          "-=0.35"
        )
        .from(
          q('[data-gsap="about-story-image"]'),
          { scale: 0.985, autoAlpha: 0, duration: 0.9 },
          "-=0.65"
        );

      const valueCards = q('[data-gsap="about-value-card"]');
      gsap.set(valueCards, { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(valueCards, {
        start: "top 86%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "transform",
          }),
        once: true,
      });

      const producerCards = q('[data-gsap="about-producer-card"]');
      gsap.set(producerCards, { autoAlpha: 0, y: 18 });
      ScrollTrigger.batch(producerCards, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            clearProps: "transform",
          }),
        once: true,
      });

      const storyImage = q('[data-gsap="about-story-image"] img');
      gsap.to(storyImage, {
        y: 16,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [t]);

  const values = [
    {
      icon: Heart,
      title: t("about.values.local.title"),
      description: t("about.values.local.desc"),
      key: "local",
    },
    {
      icon: Users,
      title: t("about.values.conviviality.title"),
      description: t("about.values.conviviality.desc"),
      key: "conviviality",
    },
    {
      icon: Sparkles,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.desc"),
      key: "innovation",
    },
    {
      icon: Award,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.desc"),
      key: "quality",
    },
  ];

  const producers = [
    {
      product: "Tapenade",
      producer: "Mamili",
      link: "https://mamili.square.site/product/olivade-",
      status: "Partenariat",
    },
    {
      product: "Croûton",
      producer: "Mamili",
      link: "https://mamili.square.site/product/olivade-",
      status: "Partenariat",
    },
    {
      product: "Gâteau",
      producer: "Trésors d'Occitanie",
      link: "https://tresorsdoccitanie.fr/",
      status: "Attente de réponse",
    },
    {
      product: "Savon",
      producer: "Olidoc",
      link: "https://www.olidoc.com/8-savons",
      status: "Partenariat",
    },
    {
      product: "Bonbon grisette",
      producer: "Bonbons Grisettes",
      link: "https://bonbonsgrisettes.fr",
      status: "Aucune réponse",
    },
    {
      product: "Miel (Rucher de l'Estagnol)",
      producer: "Miellerie Rucher de l'Estagnol, Saussan",
      status: "Contacté",
    },
    {
      product: "Bonbons (violette)",
      producer: "Biscuiterie Saint-Guilhem",
      link: "https://biscuiteriesaintguilhem.fr/contact/",
      status: "Partenariat (en cours)",
    },
    {
      product: "Autre miel",
      producer: "Miel Naturel",
      link: "https://www.miel-naturel.com/index.php/miels-naturel",
      status: "Attente de réponse",
    },
    {
      product: "Tisane",
      producer: "Douce Réglisse coupée de Montpellier",
      status: "Refusé",
    },
    {
      product: "Confiture",
      producer: "Les confitures de Sophie",
      status: "Contacté",
    },
    {
      product: "Miel de garrigue sauvage",
      producer:
        "Julien Bourrette, apiculteur récoltant (Saint-André-de-Sangonis)",
      link: "https://www.tourisme-occitanie.com/fr/fiche/degustation/julien-bourrette-apiculteur-recoltant-saint-andre-de-sangonis_TFODEGLAR034V50MI8F/",
      status: "Partenariat",
    },
  ]
    .filter(
      (producer) =>
        producer.status &&
        (producer.status === "Partenariat" || producer.status.includes("Partenariat"))
    );

  const statusKey = (status: string) => {
    if (status === "Partenariat") return "partenariat";
    if (status === "Partenariat (en cours)") return "partenariat_en_cours";
    if (status === "Attente de réponse") return "attente";
    if (status === "Contacté") return "contacte";
    if (status === "Refusé") return "refuse";
    if (status === "Aucune réponse") return "aucune_reponse";
    return status;
  };

  return (
    <section className="py-16 sm:py-20 scroll-mt-24" id="a-propos" ref={rootRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2
            data-gsap="about-title"
            data-i18n="about.heading"
            className="font-sans font-extrabold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            {t("about.heading")}
          </h2>
          <p
            data-gsap="about-subtitle"
            data-i18n="about.subtitle"
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("about.subtitle")}
          </p>
        </div>

        {/* Histoire principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3
              data-gsap="about-story-title"
              data-i18n="about.storyTitle"
              className="font-sans font-extrabold tracking-tight text-foreground text-3xl"
            >
              {t("about.storyTitle")}
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p data-gsap="about-story-p" data-i18n="about.story.p1">
                {t("about.story.p1")}
              </p>
              <p data-gsap="about-story-p" data-i18n="about.story.p2">
                {t("about.story.p2")}
              </p>
              <p data-gsap="about-story-p" data-i18n="about.story.p3">
                {t("about.story.p3")}
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
          <h3
            className="font-sans font-extrabold tracking-tight text-foreground text-3xl text-center mb-12"
            data-i18n="about.valuesTitle"
          >
            {t("about.valuesTitle")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.key}
                data-gsap="about-value-card"
                className="p-6 surface rounded-2xl border border-border hover:shadow-2xl transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" aria-hidden />
                </div>
                <h4 className="text-foreground mb-2 font-semibold" data-i18n={`about.values.${value.key}.title`}>
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed" data-i18n={`about.values.${value.key}.desc`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Nos producteurs */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3
              className="font-sans font-extrabold tracking-tight text-foreground text-3xl"
              data-i18n="about.producersTitle"
            >
              {t("about.producersTitle")}
            </h3>
            <p className="text-lg text-muted-foreground" data-i18n="about.producersSubtitle">
              {t("about.producersSubtitle")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
              {producers.map((producer, index) => {
                const statusTranslation = t(
                  `about.statuses.${statusKey(producer.status)}`,
                  producer.status
                );
                return (
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
                        data-i18n="about.producerLink"
                      >
                        {t("about.producerLink")}
                      </a>
                    )}
                    {producer.status && (
                      <div className="text-xs text-foreground mt-1">
                        <span data-i18n="about.statusLabel">{t("about.statusLabel")}</span>{" "}
                        <span data-i18n={`about.statuses.${statusKey(producer.status)}`}>
                          {statusTranslation}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

