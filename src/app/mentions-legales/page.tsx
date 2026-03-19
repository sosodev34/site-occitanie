import { LegalLayout } from "@/components/LegalLayout";
import { legalIdentity } from "@/data/legal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales / Legal notice",
  description: "Mentions légales du site e-commerce Cœur d'Occitanie.",
};

const sanitize = (value: string, fallback: string) =>
  !value || value.includes("{{") ? fallback : value;

type PageProps = { searchParams: Promise<{ lang?: string }> };

export default async function MentionsLegalesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = params?.lang === "en" ? "en" : "fr";
  const t = (fr: string, en: string) => (lang === "en" ? en : fr);

  const companyName = sanitize(legalIdentity.companyName, "Nom de la société");
  const legalForm = sanitize(legalIdentity.legalForm, "Forme juridique");
  const shareCapital = sanitize(legalIdentity.shareCapital, "Capital social à compléter");
  const headOffice = sanitize(legalIdentity.headOffice, "Adresse du siège");
  const email = sanitize(legalIdentity.email, "contact@example.com");
  const phone = sanitize(legalIdentity.phone, "Téléphone à compléter");
  const rcs = sanitize(legalIdentity.rcs, "RCS à compléter");
  const publicationDirector = sanitize(
    legalIdentity.publicationDirector,
    "Directeur de publication à compléter"
  );
  const lastUpdate = sanitize(legalIdentity.lastUpdate, "À compléter");

  return (
    <LegalLayout
      title={t("Mentions légales", "Legal notice")}
      description={t(
        "Informations relatives à l'éditeur du site, à l'hébergement et aux contacts officiels.",
        "Information about the site publisher, hosting, and official contacts."
      )}
      updatedAt={lastUpdate}
      action={
        <div className="flex items-center gap-2">
          <Link href={{ pathname: "/mentions-legales", query: { lang: "fr" } }} aria-label="Français">
            <Button variant={lang === "fr" ? "default" : "outline"} size="sm">
              FR
            </Button>
          </Link>
          <Link href={{ pathname: "/mentions-legales", query: { lang: "en" } }} aria-label="English">
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
      <section className="space-y-2" id="editeur">
        <h2 className="text-xl font-semibold">{t("Éditeur du site", "Site publisher")}</h2>
        <p>
          <strong>{t("Raison sociale", "Legal name")} :</strong> {companyName}
          <br />
          <strong>{t("Forme juridique", "Legal form")} :</strong> {legalForm}
          <br />
          <strong>{t("Capital social", "Share capital")} :</strong> {shareCapital}
          <br />
          <strong>{t("Adresse du siège", "Registered address")} :</strong> {headOffice}
          <br />
          <strong>{t("Contact", "Contact")} :</strong> {email} – {phone}
          <br />
          <strong>{t("Immatriculation", "Registration")} :</strong> {rcs}
        </p>
      </section>

      <section className="space-y-2" id="direction">
        <h2 className="text-xl font-semibold">{t("Direction de la publication", "Publishing director")}</h2>
        <p>{publicationDirector}</p>
      </section>

      <section className="space-y-2" id="contact">
        <h2 className="text-xl font-semibold">{t("Contact", "Contact")}</h2>
        <p>
          {t(
            `Pour toute question, vous pouvez nous écrire à ${email} ou nous appeler au ${phone}.`,
            `For any question, email us at ${email} or call us at ${phone}.`
          )}
        </p>
      </section>

      <section className="space-y-2" id="propriete">
        <h2 className="text-xl font-semibold">{t("Propriété intellectuelle", "Intellectual property")}</h2>
        <p>
          {t(
            `L'ensemble des contenus (textes, visuels, logos, illustrations) présents sur ce site sont la propriété de ${companyName} ou de ses partenaires et sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite.`,
            `All content on this site (texts, visuals, logos, illustrations) is the property of ${companyName} or its partners and protected by intellectual property law. Any unauthorized reproduction or use is prohibited.`
          )}
        </p>
      </section>

      <section className="space-y-2" id="donnees">
        <h2 className="text-xl font-semibold">{t("Données personnelles", "Personal data")}</h2>
        <p>
          {t(
            "La collecte et le traitement de vos données sont détaillés dans notre ",
            "Data collection and processing are detailed in our "
          )}
          <a className="text-primary underline" href="/politique-confidentialite">
            {t("Politique de confidentialité", "Privacy Policy")}
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
