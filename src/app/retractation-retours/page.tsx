import { LegalLayout } from "@/components/LegalLayout";
import { legalIdentity, withdrawal } from "@/data/legal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rétractation et retours / Withdrawal & returns",
  description: "Modalités d'exercice du droit de rétractation et politique de retour.",
};

const sanitize = (value: string, fallback: string) =>
  !value || value.includes("{{") ? fallback : value;

type PageProps = { searchParams: Promise<{ lang?: string }> };

export default async function RetractationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = params?.lang === "en" ? "en" : "fr";
  const t = (fr: string, en: string) => (lang === "en" ? en : fr);

  const returnEmail = sanitize(withdrawal.returnEmail, "asso.coeurdoccitanie@gmail.com");
  const returnAddress = sanitize(
    withdrawal.returnAddress,
    "5 avenue Ronzier Joly, 34800 Clermont-l’Hérault, France"
  );
  const refundDelay = sanitize(withdrawal.refundDelay, "14 jours après réception ou preuve d'expédition");
  const returnShippingCosts = sanitize(
    withdrawal.returnShippingCosts,
    "À la charge du client sauf erreur de préparation"
  );
  const exceptions = withdrawal.exceptions.filter((ex) => ex && !ex.includes("{{"));
  const companyName = sanitize(legalIdentity.companyName, "Nom de la société");
  const companyEmail = sanitize(legalIdentity.email, "email@societe.fr");
  const lastUpdate = sanitize(legalIdentity.lastUpdate, "À compléter");

  return (
    <LegalLayout
      title={t("Rétractation et retours", "Withdrawal and returns")}
      description={t(
        "Comment exercer votre droit de rétractation de 14 jours et nous retourner un produit.",
        "How to use your 14-day withdrawal right and return a product."
      )}
      updatedAt={lastUpdate}
      action={
        <div className="flex items-center gap-2">
          <Link href={{ pathname: "/retractation-retours", query: { lang: "fr" } }} aria-label="Français">
            <Button variant={lang === "fr" ? "default" : "outline"} size="sm">
              FR
            </Button>
          </Link>
          <Link href={{ pathname: "/retractation-retours", query: { lang: "en" } }} aria-label="English">
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
          <p>English summary (French text is binding):</p>
          <ul className="list-disc list-inside space-y-1">
            <li>14-day withdrawal from receipt/pickup.</li>
            <li>Email notice to {returnEmail}; send returns to {returnAddress}.</li>
            <li>Return shipping: {returnShippingCosts}; refund within {refundDelay}.</li>
            <li>Use the template form below.</li>
          </ul>
          <hr className="border-border my-4" />
        </div>
      ) : null}

      <Section title={t("1. Délai légal", "1. Legal period")}>
        <p>
          {t(
            "Vous disposez d'un délai de 14 jours à compter de la réception de votre commande (ou du retrait sur évènement) pour exercer votre droit de rétractation sans motif.",
            "You have 14 days from receipt/pickup to exercise your withdrawal right without reason."
          )}
        </p>
      </Section>

      <Section title={t("2. Exceptions possibles", "2. Possible exceptions")}>
        {exceptions.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {exceptions.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            {t("Aucune exception particulière n'est appliquée pour le moment.", "No specific exceptions currently apply.")}
          </p>
        )}
      </Section>

      <Section title={t("3. Procédure", "3. Process")}>
        <ol className="list-decimal list-inside space-y-1">
          <li>{t("Envoyer le formulaire ci-dessous à", "Send the form below to")} {returnEmail}.</li>
          <li>{t("Préparer le colis complet, non ouvert lorsque l'hygiène l'exige.", "Prepare the full parcel, unopened where hygiene requires.")}</li>
          <li>{t("Expédier à l'adresse :", "Ship to:")} {returnAddress}.</li>
        </ol>
        <p className="mt-2">
          {t("Frais de retour :", "Return shipping:")} {returnShippingCosts}. {t("Remboursement :", "Refund:")} {refundDelay}.
        </p>
      </Section>

      <Section id="formulaire" title={t("4. Formulaire type de rétractation", "4. Sample withdrawal form")}>
        <div className="rounded-xl border border-border bg-muted p-4 text-sm leading-relaxed">
          <p>{t("À copier/coller puis compléter et envoyer à", "Copy/paste, fill in, and send to")} {returnEmail}</p>
          <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm mt-3">
{`${t("À l'attention de", "To") } ${companyName} (${companyEmail})

${t("Je vous notifie par la présente ma rétractation du contrat portant sur la vente suivante :", "I hereby notify withdrawal from the following sale:")}
- ${t("Commande n°", "Order #")} : ________
- ${t("Date de commande / réception", "Order / receipt date")} : ________
- ${t("Nom du client", "Customer name")} : ________
- ${t("Adresse", "Address")} : ________
- ${t("Téléphone / Email", "Phone / Email")} : ________

${t("Date", "Date")} : ________
${t("Signature (si format papier)", "Signature (if paper)") } : __________`}
          </pre>
        </div>
      </Section>

      <Section title={t("5. Remboursement", "5. Refund")}>
        <p>
          {t(
            "Après réception et vérification des produits retournés, nous procédons au remboursement via le moyen de paiement initial dans le délai indiqué ci-dessus.",
            "After receiving and checking returned items, we refund via the original payment method within the stated timeframe."
          )}
        </p>
      </Section>
    </LegalLayout>
  );
}

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section className="space-y-2" id={id}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-2 text-muted-foreground">{children}</div>
    </section>
  );
}
