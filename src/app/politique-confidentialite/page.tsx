import { LegalLayout } from "@/components/LegalLayout";
import { cookiesPolicy, legalIdentity } from "@/data/legal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité / Privacy Policy",
  description: "Politique de protection des données personnelles (RGPD).",
};

type PageProps = { searchParams: Promise<{ lang?: string }> };

export default async function PrivacyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = params?.lang === "en" ? "en" : "fr";
  const t = (fr: string, en: string) => (lang === "en" ? en : fr);

  return (
    <LegalLayout
      title={t("Politique de confidentialité", "Privacy Policy")}
      description={t(
        "Nous expliquons comment vos données personnelles sont collectées, utilisées et protégées.",
        "How we collect, use, and protect your personal data."
      )}
      updatedAt={legalIdentity.lastUpdate}
      action={
        <div className="flex items-center gap-2">
          <Link href={{ pathname: "/politique-confidentialite", query: { lang: "fr" } }} aria-label="Français">
            <Button variant={lang === "fr" ? "default" : "outline"} size="sm">
              FR
            </Button>
          </Link>
          <Link href={{ pathname: "/politique-confidentialite", query: { lang: "en" } }} aria-label="English">
            <Button variant={lang === "en" ? "default" : "outline"} size="sm">
              EN
            </Button>
          </Link>
          <Link href="/" aria-label={t("Fermer et revenir au site", "Close and go back to site")}>
            <Button variant="outline" size="sm" className="px-2">
              ×
            </Button>
          </Link>
        </div>
      }
    >
      {lang === "en" ? (
        <div className="space-y-3 text-muted-foreground">
          <p>English summary (French text below is binding):</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Controller: {legalIdentity.companyName}, {legalIdentity.legalForm}, {legalIdentity.headOffice}</li>
            <li>Contact/DPO: {legalIdentity.dataProtectionOfficer}</li>
            <li>Purposes: contract (orders), legal obligations, legitimate interest (fraud), consent (newsletter, analytics, marketing disabled by default).</li>
            <li>Hosting: {legalIdentity.host.name}; Payment: Stripe; Audience: {cookiesPolicy.audience}; Marketing: {cookiesPolicy.marketing}.</li>
            <li>Rights: access/rectify/delete/object/limit/portability; email {legalIdentity.dataProtectionOfficer}.</li>
          </ul>
          <hr className="border-border my-4" />
        </div>
      ) : null}

      <Section title="1. Responsable de traitement">
        <p>
          {legalIdentity.companyName} ({legalIdentity.legalForm}) – {legalIdentity.headOffice}. Contact
          : {legalIdentity.email} / {legalIdentity.phone}. DPO / contact RGPD : {legalIdentity.dataProtectionOfficer}.
        </p>
      </Section>

      <Section title="2. Données collectées">
        <ul className="list-disc list-inside space-y-1">
          <li>Données d'identité et de contact (nom, email, téléphone) pour les commandes et le support.</li>
          <li>Données de commande et de paiement (montants, références Stripe – aucune donnée bancaire stockée chez nous).</li>
          <li>Données de navigation et de mesure d'audience (après consentement).</li>
          <li>Données fournies via le formulaire newsletter (email).</li>
        </ul>
      </Section>

      <Section title="3. Finalités et bases légales">
        <ul className="list-disc list-inside space-y-1">
          <li>Exécution du contrat : gestion des commandes, paiements, retrait/livraison.</li>
          <li>Obligation légale : facturation, comptabilité, gestion des garanties.</li>
          <li>Intérêt légitime : amélioration du site et prévention de la fraude.</li>
          <li>Consentement : newsletter, mesures d'audience facultatives, cookies marketing/personalisation.</li>
        </ul>
      </Section>

      <Section title="4. Durées de conservation">
        <p>
          Données clients : durée de la relation contractuelle + archivage légal. Données de facturation
          : 10 ans. Données newsletter : jusqu'au désabonnement. Cookies : durée selon la catégorie et
          votre consentement (max 13 mois pour l'audience selon CNIL).
        </p>
      </Section>

      <Section title="5. Destinataires et sous-traitants">
        <p className="space-y-1">
          Vos données peuvent être transmises aux prestataires suivants strictement pour les finalités décrites :
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Paiement :</strong> Stripe (traitement des paiements, aucune donnée bancaire stockée chez nous).</li>
          <li><strong>Hébergement :</strong> Vercel Inc. (hébergement de l’application web).</li>
          <li><strong>Emailing / newsletter :</strong> envoi via notre messagerie interne (pas de prestataire tiers dédié à ce jour).</li>
          <li><strong>Mesure d'audience :</strong> {cookiesPolicy.audience}.</li>
          <li><strong>Marketing :</strong> {cookiesPolicy.marketing}.</li>
        </ul>
        <p className="mt-2">
          Aucun transfert à des tiers à des fins commerciales sans votre consentement.
        </p>
      </Section>

      <Section title="6. Hébergement et sécurité">
        <p>
          Les données sont hébergées auprès de {legalIdentity.host.name}. Mesures mises en place : HTTPS,
          contrôle d'accès, journalisation, minimisation des données, limitation des accès par rôle.
        </p>
      </Section>

      <Section title="7. Transferts hors UE">
        <p>
          Par défaut, nous privilégions des services hébergés dans l'UE. Si un transfert hors UE est
          nécessaire (ex. certains sous-traitants), il est encadré par des clauses contractuelles types
          et mesures complémentaires.
        </p>
      </Section>

      <Section title="8. Vos droits">
        <p>
          Vous pouvez exercer vos droits d'accès, rectification, effacement, limitation, opposition,
          portabilité et définir le sort de vos données après décès en écrivant à{" "}
          {legalIdentity.dataProtectionOfficer}. Une preuve d'identité peut être demandée.
        </p>
      </Section>

      <Section title="9. Réclamation">
        <p>
          Vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr) si vous estimez que vos
          droits ne sont pas respectés.
        </p>
      </Section>

      <Section title="10. Cookies et traceurs">
        <p>
          Notre bannière vous permet de refuser ou personnaliser les cookies par catégorie (nécessaires,
          mesure d'audience, personnalisation, marketing). Aucun cookie non essentiel n'est déposé sans
          votre consentement. Vous pouvez modifier vos choix à tout moment via le lien « {t("footer.manageCookies", "Manage my cookies")} »
          en bas de page.
        </p>
      </Section>
    </LegalLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-2 text-muted-foreground">{children}</div>
    </section>
  );
}
