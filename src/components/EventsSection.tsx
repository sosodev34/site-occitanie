import { EventCard } from "./EventCard";
import { events } from "../data/events";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../lib/gsap";
import { toast } from "sonner";
import { useI18n } from "../lib/i18n";

export function EventsSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterCompany, setNewsletterCompany] = useState(""); // honeypot
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const { t } = useI18n();

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingNewsletter) return;

    const email = newsletterEmail.trim();
    if (!email) {
      toast.error(t("events.newsletterToastMissing.title"), {
        description: t("events.newsletterToastMissing.desc"),
      });
      return;
    }

    setIsSubmittingNewsletter(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: newsletterCompany }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      toast.success(t("events.newsletterToastSuccess.title"), {
        description: t("events.newsletterToastSuccess.desc"),
      });
      setNewsletterEmail("");
    } catch (err) {
      console.error(err);
      toast.error(t("events.newsletterToastError.title"), {
        description:
          err instanceof Error ? err.message : t("events.newsletterToastError.desc"),
      });
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap.from(q('[data-gsap="events-title"]'), {
        y: 16,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(q('[data-gsap="events-subtitle"]'), {
        y: 16,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.05,
      });

      const cards = q('[data-gsap="event-card"]');
      gsap.set(cards, { autoAlpha: 0, y: 26 });
      ScrollTrigger.batch(cards, {
        start: "top 86%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.12,
            clearProps: "transform",
          }),
        once: true,
      });

      const partner = q('[data-gsap="events-partner"]')[0] as HTMLElement | undefined;
      if (partner) {
        gsap.from(partner, {
          y: 16,
          autoAlpha: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: partner, start: "top 86%", once: true },
        });
      }

      const newsletter = q('[data-gsap="events-newsletter"]')[0] as HTMLElement | undefined;
      if (newsletter) {
        gsap.from(newsletter, {
          y: 16,
          autoAlpha: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: newsletter, start: "top 90%", once: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [t]);

  return (
    <section className="py-16 sm:py-20 scroll-mt-24" id="evenements" ref={rootRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2
            data-gsap="events-title"
            data-i18n="events.heading"
            className="font-sans font-extrabold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            {t("events.heading")}
          </h2>
          <p
            data-gsap="events-subtitle"
            data-i18n="events.description"
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("events.description")}
          </p>
        </div>

        {/* Grille d'événements */}
        <div className="flex flex-col items-center gap-6 lg:gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Partenariat */}
        <div
          data-gsap="events-partner"
          className="mt-16 p-8 surface rounded-3xl border border-border"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-4xl" aria-hidden>
                  🤝
                </span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3
                  className="font-sans font-extrabold tracking-tight text-foreground text-xl mb-2"
                  data-i18n="events.partnerTitle"
                >
                  {t("events.partnerTitle")}
                </h3>
                <p className="text-muted-foreground" data-i18n="events.partnerDesc">
                  {t("events.partnerDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div
          data-gsap="events-newsletter"
          className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl border border-primary/20"
        >
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3
              className="font-sans font-extrabold tracking-tight text-foreground text-2xl"
              data-i18n="events.newsletterTitle"
            >
              {t("events.newsletterTitle")}
            </h3>
            <p className="text-muted-foreground" data-i18n="events.newsletterDesc">
              {t("events.newsletterDesc")}
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto"
            >
              {/* Honeypot (invisible) */}
              <div
                className="absolute left-[-10000px] top-auto w-1 h-1 overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  value={newsletterCompany}
                  onChange={(e) => setNewsletterCompany(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={t("events.newsletterPlaceholder")}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={isSubmittingNewsletter}
                className="flex-1 h-auto px-4 py-3 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
              <Button
                type="submit"
                disabled={isSubmittingNewsletter}
                className="h-auto px-8 py-3 rounded-full whitespace-nowrap text-base"
              >
                {isSubmittingNewsletter
                  ? t("events.newsletterSubmitting")
                  : t("events.newsletterSubmit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

