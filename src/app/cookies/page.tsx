import { LegalLayout } from "@/components/LegalLayout";
import { cookiesPolicy, legalIdentity } from "@/data/legal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique cookies / Cookies policy",
  description: "Informations sur les cookies et gestion du consentement.",
};

type PageProps = { searchParams: Promise<{ lang?: string }> };

export default async function CookiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = params?.lang === "en" ? "en" : "fr";
  const t = (fr: string, en: string) => (lang === "en" ? en : fr);

  return (
    <LegalLayout
      title={t("Politique de cookies", "Cookies policy")}
      description={t(
        "Comprendre comment et pourquoi nous utilisons des cookies et traceurs.",
        "Understand how and why we use cookies and trackers."
      )}
      updatedAt={legalIdentity.lastUpdate}
      action={
        <div className="flex items-center gap-2">
          <Link href={{ pathname: "/cookies", query: { lang: "fr" } }} aria-label="Français">
            <Button variant={lang === "fr" ? "default" : "outline"} size="sm">
              FR
            </Button>
          </Link>
          <Link href={{ pathname: "/cookies", query: { lang: "en" } }} aria-label="English">
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
          <p>This is an English summary; the French version below is the binding text.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Necessary cookies only for site operation; no non-essential cookies without consent.</li>
            <li>Audience: {cookiesPolicy.audience}.</li>
            <li>Personalization: {cookiesPolicy.personalization}.</li>
            <li>Marketing: {cookiesPolicy.marketing}.</li>
            <li>Consent can be changed anytime via “{t("footer.manageCookies", "Manage my cookies")}”.</li>
          </ul>
          <hr className="border-border my-4" />
        </div>
      ) : null}

      <Section title={t("1. Qu'est-ce qu'un cookie ?", "1. What is a cookie?")}>
        <p>
          {t(
            "Un cookie est un fichier déposé sur votre terminal pour stocker des informations. Certains sont nécessaires au fonctionnement du site, d'autres sont facultatifs et soumis à votre consentement.",
            "A cookie is a file stored on your device. Some are required for the site to work; others are optional and need your consent."
          )}
        </p>
      </Section>

      <Section title={t("2. Gestion du consentement", "2. Managing consent")}>
        <p>
          {t(
            `Lors de votre première visite, une bannière vous permet d'accepter, refuser ou personnaliser les cookies par catégorie. Vous pouvez modifier vos choix à tout moment via le lien « ${t("footer.manageCookies", "Gérer mes cookies")} » en bas de page. Aucun cookie non essentiel n'est déposé sans votre action explicite.`,
            `On first visit, a banner lets you accept, refuse, or customize cookies by category. You can change your choices anytime via “${t("footer.manageCookies", "Manage my cookies")}” in the footer. No non-essential cookie is set without your explicit choice.`
          )}
        </p>
      </Section>

      <Section title={t("3. Catégories de cookies", "3. Cookie categories")}>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>{t("Nécessaires", "Necessary")} :</strong> {t("fonctionnement du site, sécurité, maintien du panier.", "site operation, security, cart persistence.")}</li>
          <li><strong>{t("Mesure d'audience", "Analytics")} :</strong> {cookiesPolicy.audience}.</li>
          <li><strong>{t("Personnalisation", "Personalization")} :</strong> {cookiesPolicy.personalization || t("non utilisé par défaut", "not used by default")}.</li>
          <li><strong>{t("Marketing", "Marketing")} :</strong> {cookiesPolicy.marketing || t("non utilisé par défaut", "not used by default")}.</li>
        </ul>
      </Section>

      <Section title={t("4. Durée de conservation", "4. Retention periods")}>
        <p>
          {t(
            "Les consentements sont conservés 6 mois, les cookies d'audience au maximum 13 mois.",
            "Consent choices are stored for 6 months; analytics cookies for up to 13 months."
          )}
        </p>
      </Section>

      <Section title={t("5. Paramétrer votre navigateur", "5. Browser settings")}>
        <p>
          {t(
            "Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies. Attention : le refus des cookies nécessaires peut dégrader l'expérience.",
            "You can configure your browser to block or delete cookies. Note: blocking necessary cookies may degrade the experience."
          )}
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
