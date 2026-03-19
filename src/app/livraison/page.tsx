import { LegalLayout } from "@/components/LegalLayout";
import { delivery, legalIdentity } from "@/data/legal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison et retrait / Delivery & pickup",
  description: "Zones desservies, délais, transporteurs et prise en charge des colis.",
};

type PageProps = { searchParams: Promise<{ lang?: string }> };

export default async function LivraisonPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = params?.lang === "en" ? "en" : "fr";
  const t = (fr: string, en: string) => (lang === "en" ? en : fr);

  return (
    <LegalLayout
      title={t("Livraison et retrait", "Delivery & pickup")}
      description={t(
        "Toutes les informations pratiques sur la livraison ou le retrait de votre box.",
        "Practical information about delivery or pickup."
      )}
      updatedAt={legalIdentity.lastUpdate}
      action={
        <div className="flex items-center gap-2">
          <Link href={{ pathname: "/livraison", query: { lang: "fr" } }} aria-label="Français">
            <Button variant={lang === "fr" ? "default" : "outline"} size="sm">
              FR
            </Button>
          </Link>
          <Link href={{ pathname: "/livraison", query: { lang: "en" } }} aria-label="English">
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
            <li>Pickup only during events in Occitanie; no postal shipping.</li>
            <li>Hand delivery on site; show your confirmation email.</li>
            <li>Pickup date = event date shown at purchase.</li>
            <li>Fees: free (pickup).</li>
            <li>Damaged items: report immediately on site.</li>
          </ul>
          <hr className="border-border my-4" />
        </div>
      ) : null}

      <Section title={t("Zones desservies", "Service areas")}>
        <p>{delivery.zones}</p>
      </Section>
      <Section title={t("Transporteurs et modes de remise", "Carriers and handover")}>
        <p>
          {delivery.carriers}.{" "}
          {t(
            "Retrait possible lors de nos évènements sur présentation de l'email de confirmation.",
            "Pickup available during our events upon presentation of the confirmation email."
          )}
        </p>
      </Section>
      <Section title={t("Délais indicatifs", "Indicative timelines")}>
        <p>{delivery.delays}</p>
      </Section>
      <Section title={t("Frais de livraison", "Delivery fees")}>
        <p>{delivery.fees}</p>
      </Section>
      <Section title={t("Colis endommagé", "Damaged parcel")}>
        <p>{delivery.damagedParcelPolicy}</p>
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
