import { ArrowRight, Calendar } from "lucide-react";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "../lib/gsap";
import { useI18n } from "../lib/i18n";
import { Button } from "./ui/button";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
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

      tl.from(q('[data-gsap="hero-badge"]'), {
        y: 10,
        autoAlpha: 0,
        duration: 0.6,
      })
        .from(q('[data-gsap="hero-title"]'), { y: 18, autoAlpha: 0 }, "-=0.2")
        .from(
          q('[data-gsap="hero-subtitle"]'),
          { y: 18, autoAlpha: 0, duration: 0.7 },
          "-=0.35"
        )
        .from(
          q('[data-gsap="hero-ctas"] > *'),
          { y: 14, autoAlpha: 0, stagger: 0.12, duration: 0.65 },
          "-=0.35"
        )
        .from(
          q('[data-gsap="hero-features"] > *'),
          { y: 12, autoAlpha: 0, stagger: 0.08, duration: 0.6 },
          "-=0.45"
        )
        .from(
          q('[data-gsap="hero-image"]'),
          { scale: 0.985, autoAlpha: 0, duration: 0.9 },
          "-=0.75"
        )
        .from(
          q('[data-gsap="hero-float-card"]'),
          {
            y: 16,
            autoAlpha: 0,
            rotate: -1,
            duration: 0.75,
            clearProps: "transform",
          },
          "-=0.55"
        );

      gsap.to(q('[data-gsap="hero-image"] img'), {
        y: 18,
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
  }, []);

  return (
    <section
      className="relative pt-20 sm:pt-24 pb-12 sm:pb-20 overflow-hidden scroll-mt-24"
      id="accueil"
      ref={rootRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-accent/5 to-transparent" />
      <div className="absolute -top-24 -right-24 h-72 w-72 sm:h-[28rem] sm:w-[28rem] rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute -bottom-28 -left-24 h-72 w-72 sm:h-[30rem] sm:w-[30rem] rounded-full bg-secondary/20 blur-3xl animate-float [animation-delay:1.2s]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contenu texte */}
          <div className="space-y-6 sm:space-y-8">
            <div
              data-gsap="hero-badge"
              className="inline-flex items-center gap-2 px-4 py-2 surface rounded-full text-sm text-foreground border border-border"
            >
              <Calendar className="w-4 h-4" aria-hidden />
              <span data-i18n="hero.badge">{t("hero.badge")}</span>
            </div>

            <h1
              data-gsap="hero-title"
              className="font-sans font-extrabold tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", lineHeight: "1.03" }}
            >
              <span data-i18n="hero.title.line1">{t("hero.title.line1")}</span>{" "}
              <span data-i18n="hero.title.highlight" className="text-gradient animate-shine">
                {t("hero.title.highlight")}
              </span>
            </h1>

            <p
              data-gsap="hero-subtitle"
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl"
              data-i18n="hero.subtitle"
            >
              {t("hero.subtitle")}
            </p>

            <div
              data-gsap="hero-ctas"
              className="flex flex-col sm:flex-row gap-4 items-center sm:items-start"
            >
              <Button
                onClick={() => onNavigate("boxes")}
                className="group h-auto px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
              >
                <span className="inline-flex items-center gap-2">
                  <span data-i18n="hero.ctaPrimary">{t("hero.ctaPrimary")}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden />
                </span>
              </Button>

              <Button
                onClick={() => onNavigate("evenements")}
                variant="outline"
                className="h-auto px-8 py-4 bg-card border-2 border-primary text-primary rounded-full hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-base"
              >
                <Calendar className="w-5 h-5" aria-hidden />
                <span data-i18n="hero.ctaSecondary">{t("hero.ctaSecondary")}</span>
              </Button>
            </div>

            {/* Mini features */}
            <div
              data-gsap="hero-features"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl"
            >
              <div className="surface border border-border rounded-2xl px-4 py-3">
                <div className="text-sm font-semibold text-foreground" data-i18n="hero.features.paymentTitle">
                  {t("hero.features.paymentTitle")}
                </div>
                <div className="text-xs text-muted-foreground" data-i18n="hero.features.paymentDesc">
                  {t("hero.features.paymentDesc")}
                </div>
              </div>
              <div className="surface border border-border rounded-2xl px-4 py-3">
                <div className="text-sm font-semibold text-foreground" data-i18n="hero.features.pickupTitle">
                  {t("hero.features.pickupTitle")}
                </div>
                <div className="text-xs text-muted-foreground" data-i18n="hero.features.pickupDesc">
                  {t("hero.features.pickupDesc")}
                </div>
              </div>
              <div className="surface border border-border rounded-2xl px-4 py-3">
                <div className="text-sm font-semibold text-foreground" data-i18n="hero.features.localTitle">
                  {t("hero.features.localTitle")}
                </div>
                <div className="text-xs text-muted-foreground" data-i18n="hero.features.localDesc">
                  {t("hero.features.localDesc")}
                </div>
              </div>
            </div>
          </div>

          {/* Image hero */}
          <div className="relative">
            <div
              data-gsap="hero-image"
              className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/boxes/box-hero.jpg"
                alt={t("hero.floatCard.title")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] sm:text-xs leading-tight text-white bg-black/55 backdrop-blur-sm px-3 py-2 rounded-full">
                <span data-i18n="hero.imageCaption">{t("hero.imageCaption")}</span>
              </div>
            </div>

            {/* Floating card */}
            <div
              data-gsap="hero-float-card"
              className="absolute -bottom-6 -left-4 sm:-left-6 surface p-4 sm:p-6 rounded-2xl shadow-xl border border-border max-w-[300px]"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl" aria-hidden>
                    🥘
                  </span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground" data-i18n="hero.floatCard.badge">
                    {t("hero.floatCard.badge")}
                  </div>
                  <div className="font-serif text-foreground mt-1" data-i18n="hero.floatCard.title">
                    {t("hero.floatCard.title")}
                  </div>
                  <div className="text-primary mt-2 font-semibold" data-i18n="hero.floatCard.price">
                    {t("hero.floatCard.price")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

