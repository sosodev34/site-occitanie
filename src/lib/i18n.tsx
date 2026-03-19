"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "fr" | "en";

type TranslationTree = Record<string, any>;

export const translations: Record<Language, TranslationTree> = {
  fr: {
    header: {
      tagline: "Terroir & transmission",
      menu: {
        home: "Accueil",
        boxes: "Les box",
        events: "Événements",
        about: "À propos",
        cart: "Panier",
      },
      switcher: {
        aria: "Changer de langue",
        fr: "FR",
        en: "EN",
      },
    },
    hero: {
      badge: "Prochain événement : 12 mars 2026 • École Jules Ferry, Saint-Pargoire",
      title: {
        line1: "Le terroir occitan,",
        highlight: "à transmettre",
      },
      subtitle:
        "Ateliers, dégustations et interventions pour initier étudiants et plus jeunes aux savoir-faire locaux. Précommande ta box, récupère-la sur place et rencontre celles et ceux qui font vivre notre terroir.",
      ctaPrimary: "Je précommande ma box",
      ctaSecondary: "Voir les événements",
      features: {
        paymentTitle: "Paiement en ligne",
        paymentDesc: "Simple et sécurisé",
        pickupTitle: "Retrait sur place",
        pickupDesc: "Pendant l'événement",
        localTitle: "100% local",
        localDesc: "Producteurs du coin",
      },
      imageCaption: "Visuel promotionnel · Photos non contractuelles",
      floatCard: {
        badge: "Box signature",
        title: "Saveurs Occitanes",
        price: "25€",
      },
    },
    concept: {
      title: "Le concept, en 3 points",
      cards: {
        preorderTitle: "Précommande simple",
        preorderDesc: "Choisis ta box en quelques clics, on prépare le reste.",
        uniqueTitle: "Format unique",
        uniqueDesc:
          "Une box généreuse, pensée pour les événements et interventions, prête à partager.",
        localTitle: "100% Occitanie",
        localDesc:
          "Des producteurs locaux, des produits sincères, des saveurs qui racontent le territoire.",
      },
    },
    boxes: {
      heading: "Les box du terroir, pour transmettre",
      subheading:
        "Précommande en ligne, retrait lors des événements et interventions. Une box signature, généreuse, locale, pensée pour faire découvrir nos producteurs aux jeunes publics.",
      filters: {
        all: "Toutes les Box",
        decouverte: "Découverte",
        charcuterie: "Terrines",
      },
      disclaimer: "Visuels à caractère promotionnel uniquement. Photos non contractuelles.",
      how: {
        title: "Comment ça marche ?",
        step1Title: "Je commande en ligne",
        step1Desc: "Sélection de la box et paiement sécurisé en quelques instants.",
        step2Title: "Je me présente sur place",
        step2Desc:
          "Accueil lors de l’événement ou de l’intervention, confirmation email en main.",
        step3Title: "Je récupère la box",
        step3Desc: "Remise sur place puis dégustation en toute simplicité.",
      },
      card: {
        contains: "Contient :",
        pickup: "Retrait le",
        preorder: "Précommander",
      },
      data: {
        "saveurs-occitanes": {
          name: "Saveurs Occitanes",
          description:
            "Notre box signature : miel de la région, tapenade, savon artisanal, douceurs et croûtons du coin.",
          contents: [
            "Miel de la région (125g)",
            "Savon artisanal au miel",
            "Tapenade d'olives noires (100g)",
            "Bonbons artisanaux",
            "Croûtons aux herbes locales",
          ],
          availableDate: "20 février 2026",
          badge: "",
        },
      },
    },
    events: {
      heading: "Événements & interventions",
      description:
        "Dégustations, ateliers et interventions pour faire découvrir le terroir aux étudiants et aux plus jeunes. On vient goûter, on repart avec des histoires de producteurs locaux.",
      partnerTitle: "En partenariat avec les écoles et associations locales",
      partnerDesc:
        "Nous co-construisons des événements et des interventions pédagogiques pour transmettre la culture du terroir et soutenir les producteurs qui font vivre notre territoire.",
      newsletterTitle: "Reste informé",
      newsletterDesc:
        "Laisse ton email, on te prévient dès qu'un événement ou une intervention est programmée près de toi ou de ton campus.",
      newsletterPlaceholder: "ton@email.com",
      newsletterSubmit: "S'inscrire",
      newsletterSubmitting: "Inscription…",
      newsletterToastMissing: {
        title: "Ajoute ton email",
        desc: "On te prévient dès qu'un event arrive.",
      },
      newsletterToastSuccess: {
        title: "Inscription confirmée",
        desc: "Parfait. On te prévient dès qu’un nouvel event tombe.",
      },
      newsletterToastError: {
        title: "Impossible de t'inscrire",
        desc: "Erreur inconnue",
      },
      cardLabels: {
        date: "Date",
        time: "Horaires",
        location: "Lieu",
        partners: "Partenaires",
      },
      data: {
        "intervention-jules-ferry-2026-03-12": {
          title: "Intervention à l’école Jules Ferry",
          date: "12 mars 2026",
          time: "9h00",
          location: "École élémentaire publique Jules Ferry, Saint-Pargoire",
          description:
            "Intervention pédagogique dans l’école pour faire découvrir les produits du terroir et sensibiliser les élèves à l’anti-gaspi.",
          partnersInfo: "Avec l’équipe enseignante et nos producteurs partenaires",
        },
      },
    },
    about: {
      heading: "Pourquoi transmettre le terroir",
      subtitle:
        "Cœur d'Occitanie est né d'une envie : transmettre la culture du terroir aux jeunes et aux plus jeunes, en la rendant accessible, vivante et abordable.",
      storyTitle: "Transmettre le terroir simplement",
      story: {
        p1: "On s'est donné une mission simple : faire aimer le terroir aux jeunes et aussi aux plus jeunes. Leur montrer que derrière chaque produit, il y a des savoir-faire, des paysages et des personnes qui méritent d'être découverts.",
        p2: "On organise des événements, des dégustations et des interventions en milieu scolaire pour créer ce déclic : goûter, comprendre, échanger directement avec les producteurs qui font vivre notre région.",
        p3: "L'idée : enrichir la culture culinaire de chacun, donner envie de soutenir le local et prouver que tradition et modernité peuvent cohabiter sans perdre ce qui fait la force du terroir.",
      },
      valuesTitle: "Nos Valeurs",
      values: {
        local: {
          title: "Local & Authentique",
          desc: "Nous collaborons avec des producteurs du territoire : des produits sincères, respectueux des savoir-faire.",
        },
        conviviality: {
          title: "Convivialité",
          desc: "On se rassemble autour du terroir et on partage un moment chaleureux. Simple, convivial, efficace.",
        },
        innovation: {
          title: "Innovation",
          desc: "Nous remettons le terroir au goût du jour : accessible, ludique et toujours authentique.",
        },
        quality: {
          title: "Qualité",
          desc: "Chaque produit est sélectionné avec soin pour garantir une dégustation réussie.",
        },
      },
      producersTitle: "Nos Producteurs Partenaires",
      producersSubtitle:
        "Nous sommes fiers de collaborer avec les producteurs locaux présentés ci-dessous, qui incarnent l'excellence et la passion du terroir occitan.",
      producerLink: "Lien producteur",
      statusLabel: "Statut :",
      statuses: {
        partenariat: "Partenariat",
        partenariat_en_cours: "Partenariat (en cours)",
        attente: "Attente de réponse",
        contacte: "Contacté",
        refuse: "Refusé",
        aucune_reponse: "Aucune réponse",
      },
    },
    cart: {
      emptyTitle: "Panier vide",
      emptyDesc:
        "Votre panier est vide pour le moment. Découvrez nos délicieuses box du terroir !",
      emptyCta: "Découvrir les box",
      continue: "Continuer mes achats",
      title: "Mon Panier",
      count: "{{count}} box en précommande",
      countPlural: "{{count}} box en précommande",
      pickupOn: "Retrait le {{date}}",
      remove: "Supprimer",
      decrease: "Diminuer",
      increase: "Augmenter",
      summary: "Récapitulatif",
      subtotal: "Sous-total",
      pickup: "Retrait",
      free: "Gratuit",
      total: "Total",
      pay: "Payer en ligne",
      redirecting: "Redirection…",
      bulletPickup: "Retrait gratuit lors de l'événement",
      bulletSecure: "Paiement sécurisé",
      bulletEmail: "Confirmation par email",
      tip: "Pensez à venir avec votre confirmation de précommande le jour de l'événement",
      checkoutErrorTitle: "Impossible de démarrer le paiement",
    },
    footer: {
      aboutTitle: "Cœur d'Occitanie",
      aboutDesc:
        "Terroir & transmission. Précommande ta box, récupère-la lors de nos événements et rencontres avec les producteurs.",
      navigation: "Navigation",
      contact: "Contact",
      events: "Événements",
      about: "À propos",
      follow: "Suivez-nous",
      join: "Rejoins la team et ne rate aucun event.",
      partners: "Partenaires",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      cgv: "CGV",
      cookies: "Cookies",
      manageCookies: "Gérer mes cookies",
      withdrawal: "Rétractation & retours",
      delivery: "Livraison",
      location: "Montpellier, Occitanie",
      copyright: "© 2026 Cœur d'Occitanie. Tous droits réservés.",
    },
    toasts: {
      paymentConfirmed: {
        title: "Paiement confirmé",
        desc: "Merci ! Votre précommande est enregistrée.",
      },
      emailSent: {
        title: "Email de confirmation envoyé",
        desc: "Envoyé à {{email}}",
      },
      emailSkipped: {
        title: "Paiement confirmé",
        desc: "Email de confirmation non configuré pour l'instant.",
      },
      emailFailed: {
        title: "Paiement confirmé",
        desc: "Échec de l'envoi de l'email de confirmation.",
      },
      paymentCanceled: {
        title: "Paiement annulé",
        desc: "Vous pouvez réessayer quand vous voulez.",
      },
      cartUpdated: {
        title: "Quantité mise à jour : {{name}}",
        desc: "Votre panier a été actualisé",
      },
      cartAdded: {
        title: "Box ajoutée au panier : {{name}}",
        desc: "Continuez vos achats ou passez commande",
      },
      cartRemoved: "Article retiré du panier",
    },
    common: {
      priceSuffix: "€",
    },
  },
  en: {
    header: {
      tagline: "Terroir & storytelling",
      menu: {
        home: "Home",
        boxes: "Boxes",
        events: "Events",
        about: "About",
        cart: "Cart",
      },
      switcher: {
        aria: "Change language",
        fr: "FR",
        en: "EN",
      },
    },
    hero: {
      badge: "Next event: March 12, 2026 • Jules Ferry School, Saint-Pargoire",
      title: {
        line1: "Occitan terroir,",
        highlight: "to pass on",
      },
      subtitle:
        "Workshops, tastings and school visits to introduce students and younger audiences to local know‑how. Preorder your box, pick it up on site, and meet the people behind our terroir.",
      ctaPrimary: "Preorder my box",
      ctaSecondary: "See events",
      features: {
        paymentTitle: "Online payment",
        paymentDesc: "Simple and secure",
        pickupTitle: "Pickup on site",
        pickupDesc: "During the event",
        localTitle: "100% local",
        localDesc: "Local producers",
      },
      imageCaption: "Promotional visuals · Photos not contractual",
      floatCard: {
        badge: "Signature box",
        title: "Occitan Flavours",
        price: "€25",
      },
    },
    concept: {
      title: "The concept in 3 points",
      cards: {
        preorderTitle: "Simple preorder",
        preorderDesc: "Pick your box in a few clicks, we handle the rest.",
        uniqueTitle: "Unique format",
        uniqueDesc:
          "A generous box designed for events and workshops, ready to share.",
        localTitle: "100% Occitanie",
        localDesc:
          "Local producers, honest products, flavours that tell the story of the region.",
      },
    },
    boxes: {
      heading: "Terroir boxes, ready to share",
      subheading:
        "Preorder online, collect during events and school visits. A signature box, generous and local, designed to help young audiences discover our producers.",
      filters: {
        all: "All boxes",
        decouverte: "Discovery",
        charcuterie: "Spreads",
      },
      disclaimer: "Promotional visuals only. Photos are not contractual.",
      how: {
        title: "How it works",
        step1Title: "I order online",
        step1Desc: "Choose your box and pay securely in moments.",
        step2Title: "I show up on site",
        step2Desc: "Welcome at the event or workshop, email confirmation in hand.",
        step3Title: "I pick up the box",
        step3Desc: "Handed over on site, then it’s tasting time.",
      },
      card: {
        contains: "Contains:",
        pickup: "Pickup on",
        preorder: "Preorder",
      },
      data: {
        "saveurs-occitanes": {
          name: "Occitan Flavours",
          description:
            "Our signature box: regional honey, tapenade, artisanal soap, sweets, and local-herb croutons.",
          contents: [
            "Local honey (125g)",
            "Artisanal honey soap",
            "Black olive tapenade (100g)",
            "Artisanal sweets",
            "Croutons with local herbs",
          ],
          availableDate: "February 20, 2026",
          badge: "",
        },
      },
    },
    events: {
      heading: "Events & workshops",
      description:
        "Tastings, workshops and talks to share the terroir with students and younger audiences. Come taste, and leave with stories from local producers.",
      partnerTitle: "In partnership with local schools and associations",
      partnerDesc:
        "We co-design events and educational workshops to pass on the terroir culture and support the producers who keep our region alive.",
      newsletterTitle: "Stay in the loop",
      newsletterDesc:
        "Drop your email and we’ll let you know as soon as an event or workshop is scheduled near you or your campus.",
      newsletterPlaceholder: "your@email.com",
      newsletterSubmit: "Sign up",
      newsletterSubmitting: "Signing up…",
      newsletterToastMissing: {
        title: "Add your email",
        desc: "We’ll ping you as soon as a new event drops.",
      },
      newsletterToastSuccess: {
        title: "Signed up",
        desc: "Great! We’ll let you know when a new event is live.",
      },
      newsletterToastError: {
        title: "Couldn’t sign you up",
        desc: "Unknown error",
      },
      cardLabels: {
        date: "Date",
        time: "Time",
        location: "Location",
        partners: "Partners",
      },
      data: {
        "intervention-jules-ferry-2026-03-12": {
          title: "Workshop at Jules Ferry School",
          date: "March 12, 2026",
          time: "9:00 AM",
          location: "Jules Ferry Public Elementary School, Saint-Pargoire",
          description:
            "Educational workshop to showcase local products and raise awareness among pupils about reducing waste.",
          partnersInfo: "With the teaching team and our partner producers",
        },
      },
    },
    about: {
      heading: "Why pass on the terroir",
      subtitle:
        "Cœur d'Occitanie was born from a desire to share terroir culture with students and younger audiences, making it accessible, vibrant, and affordable.",
      storyTitle: "Passing on the terroir simply",
      story: {
        p1: "Our mission is simple: help young people fall in love with the terroir. Show that behind every product there is know‑how, landscapes, and people worth discovering.",
        p2: "We run events, tastings, and school workshops to spark that moment: taste, understand, and speak directly with the producers who keep our region alive.",
        p3: "The idea: enrich everyone’s food culture, encourage support for local producers, and prove that tradition and modernity can coexist without losing what makes the terroir strong.",
      },
      valuesTitle: "Our Values",
      values: {
        local: {
          title: "Local & Authentic",
          desc: "We work with regional producers: honest products that respect their know‑how.",
        },
        conviviality: {
          title: "Conviviality",
          desc: "We gather around the terroir and share a warm moment. Simple, friendly, effective.",
        },
        innovation: {
          title: "Innovation",
          desc: "We bring the terroir up to date: accessible, playful, and always authentic.",
        },
        quality: {
          title: "Quality",
          desc: "Every product is carefully selected to guarantee a great tasting experience.",
        },
      },
      producersTitle: "Our Partner Producers",
      producersSubtitle:
        "We are proud to work with the local producers below, who embody the excellence and passion of the Occitan terroir.",
      producerLink: "Producer link",
      statusLabel: "Status:",
      statuses: {
        partenariat: "Partnership",
        partenariat_en_cours: "Partnership (in progress)",
        attente: "Awaiting response",
        contacte: "Contacted",
        refuse: "Declined",
        aucune_reponse: "No response",
      },
    },
    cart: {
      emptyTitle: "Empty cart",
      emptyDesc:
        "Your cart is empty for now. Discover our delicious terroir boxes!",
      emptyCta: "Discover the boxes",
      continue: "Continue shopping",
      title: "My Cart",
      count: "{{count}} box in preorder",
      countPlural: "{{count}} boxes in preorder",
      pickupOn: "Pickup on {{date}}",
      remove: "Remove",
      decrease: "Decrease",
      increase: "Increase",
      summary: "Summary",
      subtotal: "Subtotal",
      pickup: "Pickup",
      free: "Free",
      total: "Total",
      pay: "Pay online",
      redirecting: "Redirecting…",
      bulletPickup: "Free pickup at the event",
      bulletSecure: "Secure payment",
      bulletEmail: "Email confirmation",
      tip: "Remember to bring your preorder confirmation on the day of the event",
      checkoutErrorTitle: "Unable to start payment",
    },
    footer: {
      aboutTitle: "Cœur d'Occitanie",
      aboutDesc:
        "Terroir & storytelling. Preorder your box, pick it up during our events and meet the producers.",
      navigation: "Navigation",
      contact: "Contact",
      events: "Events",
      about: "About",
      follow: "Follow us",
      join: "Join the crew and don't miss an event.",
      partners: "Partners",
      legal: "Legal notice",
      privacy: "Privacy policy",
      cgv: "Terms of sale",
      cookies: "Cookies",
      manageCookies: "Manage my cookies",
      withdrawal: "Withdrawal & returns",
      delivery: "Delivery",
      location: "Montpellier, Occitanie",
      copyright: "© 2026 Cœur d'Occitanie. All rights reserved.",
    },
    toasts: {
      paymentConfirmed: {
        title: "Payment confirmed",
        desc: "Thank you! Your preorder is recorded.",
      },
      emailSent: {
        title: "Confirmation email sent",
        desc: "Sent to {{email}}",
      },
      emailSkipped: {
        title: "Payment confirmed",
        desc: "Confirmation email not configured yet.",
      },
      emailFailed: {
        title: "Payment confirmed",
        desc: "Failed to send the confirmation email.",
      },
      paymentCanceled: {
        title: "Payment canceled",
        desc: "You can retry anytime.",
      },
      cartUpdated: {
        title: "Quantity updated: {{name}}",
        desc: "Your cart has been updated",
      },
      cartAdded: {
        title: "Box added to cart: {{name}}",
        desc: "Keep shopping or proceed to checkout",
      },
      cartRemoved: "Item removed from cart",
    },
    common: {
      priceSuffix: "€",
    },
  },
};

type I18nContextValue = {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string, values?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "preferred_language";

function resolvePath(tree: TranslationTree, path: string) {
  return path.split(".").reduce<any>((acc, segment) => {
    if (acc && typeof acc === "object" && segment in acc) {
      return (acc as any)[segment];
    }
    return undefined;
  }, tree);
}

function format(template: string, values?: Record<string, string | number>) {
  if (!values) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : ""
  );
}

function detectInitialLanguage(): Language {
  if (typeof window === "undefined") return "fr";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "fr" || stored === "en") return stored;
  const browser = navigator.language || (navigator.languages && navigator.languages[0]) || "fr";
  return browser.toLowerCase().startsWith("en") ? "en" : "fr";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => detectInitialLanguage());

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(
    () =>
      (key: string, fallback?: string, values?: Record<string, string | number>) => {
        const value =
          resolvePath(translations[lang], key) ??
          resolvePath(translations[lang === "fr" ? "en" : "fr"], key) ??
          fallback ??
          key;
        if (typeof value === "string") {
          return format(value, values);
        }
        return String(value);
      },
    [lang]
  );

  const ctxValue = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLanguage: setLang,
      t,
    }),
    [lang, t]
  );

  return <I18nContext.Provider value={ctxValue}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
