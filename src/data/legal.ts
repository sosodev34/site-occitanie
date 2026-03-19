// Centralise les placeholders et textes légaux modifiables.
// Remplacez les valeurs {{...}} par les informations réelles de votre société.

export const legalIdentity = {
  companyName: "Coeur d'Occitanie",
  legalForm: "Association loi 1901",
  shareCapital: "Sans capital social (association)",
  headOffice: "5 avenue Ronzier Joly, 34800 Clermont-l’Hérault, France",
  email: "contact@coeurdoccitanie.fr",
  phone: "07 81 44 79 77",
  rcs: "RNA W342007687 / SIREN 102115904",
  vat: "",
  publicationDirector: "Adrian Roques (Président)",
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    contact: "support@vercel.com",
  },
  dataProtectionOfficer: "asso.coeurdoccitanie@gmail.com",
  lastUpdate: "18 mars 2026",
};

export const mediation = {
  name: "{{MEDIATOR_NAME}}",
  website: "{{MEDIATOR_WEBSITE}}",
  address: "{{MEDIATOR_ADDRESS}}",
  referralProcess: "{{MEDIATOR_REFERRAL}}", // ex. "Saisine en ligne ou par courrier dans l'année suivant votre réclamation"
};

export const withdrawal = {
  returnEmail: "asso.coeurdoccitanie@gmail.com",
  returnAddress: "5 avenue Ronzier Joly, 34800 Clermont-l’Hérault, France",
  refundDelay: "14 jours après réception ou preuve d'expédition",
  returnShippingCosts: "À la charge du client sauf erreur de préparation",
  exceptions: [
    "{{WITHDRAWAL_EXCEPTION_1}}", // ex. "Produits descellés ne pouvant être renvoyés pour des raisons d'hygiène"
    "{{WITHDRAWAL_EXCEPTION_2}}",
  ],
};

export const delivery = {
  zones: "Retrait sur évènements en Occitanie (pas d’expédition postale)",
  carriers: "Remise en main propre sur place lors de nos événements",
  delays: "Remise le jour de l’événement indiqué lors de la commande",
  fees: "Gratuit (pas de frais de livraison, retrait sur place)",
  damagedParcelPolicy: "Signaler immédiatement sur place tout colis endommagé ou préparation incorrecte",
};

export const customerService = {
  email: "{{SUPPORT_EMAIL}}",
  phone: "{{SUPPORT_PHONE}}",
  hours: "{{SUPPORT_HOURS}}", // ex. "Lun–Ven 9h-18h"
};

export const cookiesPolicy = {
  audience: "Matomo auto-hébergé, désactivé sans consentement",
  marketing: "Non utilisé par défaut, désactivé sans consentement",
  personalization: "Non utilisé par défaut, activable si besoin explicite",
};

export const pricingRules = {
  referencePriceDefinition:
    "Prix de référence = prix le plus bas pratiqué au cours des 30 derniers jours avant la promotion.",
};

export const paymentMethods = [
  "Carte bancaire (Visa, Mastercard, CB)",
  "{{OTHER_PAYMENT_METHOD}}",
];

export const newsletterNotice =
  "Votre email est utilisé uniquement pour vous envoyer des informations sur nos évènements et box. Vous pouvez vous désinscrire à tout moment via le lien présent dans chaque email.";

export const privacyShortNotice =
  "Les données marquées * sont nécessaires au traitement de votre demande. Consultez notre Politique de confidentialité pour en savoir plus (droits d'accès, rectification, effacement, opposition).";
