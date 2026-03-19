import { LegalLayout } from "@/components/LegalLayout";
import { delivery, legalIdentity, mediation, paymentMethods, withdrawal } from "@/data/legal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente / Terms of sale",
  description: "CGV applicables aux commandes de coffrets terroir Cœur d'Occitanie.",
};

const sanitize = (value: string, fallback: string) =>
  !value || value.includes("{{") ? fallback : value;

type PageProps = { searchParams: Promise<{ lang?: string }> };

export default async function CgvPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = params?.lang === "en" ? "en" : "fr";
  const t = (fr: string, en: string) => (lang === "en" ? en : fr);

  const company = sanitize(legalIdentity.companyName, "Nom de la structure");
  const lastUpdate = sanitize(legalIdentity.lastUpdate, "À compléter");
  const paymentList =
    paymentMethods
      .map((m) => sanitize(m, ""))
      .filter(Boolean)
      .join(", ") || "Carte bancaire (Visa, Mastercard, CB)";

  const deliveryZones = sanitize(delivery.zones, "Zones précisées au checkout");
  const deliveryCarriers = sanitize(delivery.carriers, "Transporteurs précisés au checkout");
  const deliveryDelays = sanitize(delivery.delays, "Délais indiqués avant paiement");
  const deliveryFees = sanitize(delivery.fees, "Affichés avant paiement");
  const damagedPolicy = sanitize(delivery.damagedParcelPolicy, "Signaler tout colis abîmé sous 48h");

  const returnEmail = sanitize(withdrawal.returnEmail, "contact@example.com");
  const returnAddress = sanitize(withdrawal.returnAddress, "Adresse de retour à compléter");
  const returnCosts = sanitize(
    withdrawal.returnShippingCosts,
    "À la charge du client sauf erreur de préparation"
  );
  const refundDelay = sanitize(withdrawal.refundDelay, "Remboursement sous 14 jours après réception");
  const exceptions = withdrawal.exceptions.filter((ex) => ex && !ex.includes("{{"));

  const mediationName = sanitize(mediation.name, "Médiateur à préciser");
  const mediationAddress = sanitize(mediation.address, "Adresse médiateur");
  const mediationWebsite = sanitize(mediation.website, "Site médiateur");
  const mediationReferral = sanitize(
    mediation.referralProcess,
    "Saisine en ligne ou courrier après contact du service client"
  );

  return (
    <LegalLayout
      title={t("Conditions générales de vente", "Terms of sale")}
      description={t(
        "Les présentes CGV régissent les ventes réalisées sur le site Cœur d'Occitanie.",
        "These terms govern purchases on the Cœur d'Occitanie website."
      )}
      updatedAt={lastUpdate}
      action={
        <div className="flex items-center gap-2">
          <Link href={{ pathname: "/cgv", query: { lang: "fr" } }} aria-label="Français">
            <Button variant={lang === "fr" ? "default" : "outline"} size="sm">
              FR
            </Button>
          </Link>
          <Link href={{ pathname: "/cgv", query: { lang: "en" } }} aria-label="English">
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
          <p>
            This English summary is provided for convenience. The binding version of the Terms of Sale
            is the French text below. Key points:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Seller: {company}, non-VATable French association (art. 293 B CGI).</li>
            <li>Products: terroir boxes; details on each product page.</li>
            <li>Prices: in EUR, no VAT charged; pickup during events (no shipping).</li>
            <li>Payment via Stripe; recap before payment; acceptance checkbox required.</li>
            <li>Right of withdrawal: 14 days; email {returnEmail}; return address {returnAddress}; refund within {refundDelay}.</li>
            <li>Pickup only; no delivery fees; damaged items must be reported on site.</li>
          </ul>
          <p className="text-sm">
            For full terms, see the French version below. In case of discrepancy, French prevails.
          </p>
          <hr className="border-border my-4" />
        </div>
      ) : null}

      <Section id="objet" title="1. Objet">
        <p>
          Les présentes Conditions générales de vente (CGV) définissent les droits et obligations des
          parties dans le cadre de la vente de coffrets et produits du terroir proposés par {company}.
          Toute commande implique l'acceptation pleine et entière des CGV par le client consommateur.
        </p>
      </Section>

      <Section id="produits" title="2. Produits">
        <p>
          Les caractéristiques essentielles des produits (description, composition des box, poids,
          disponibilité, date ou lieu de retrait/livraison) sont présentées sur chaque fiche produit.
          Les visuels ont une valeur illustrative.
        </p>
      </Section>

      <Section id="prix" title="3. Prix">
        <p>
          Les prix sont indiqués en euros. Association non assujettie à la TVA (art. 293 B du CGI) :
          les montants affichés sont nets, aucune TVA n'est applicable. Toute promotion mentionne le
          prix de référence correspondant au prix le plus bas pratiqué au cours des 30 derniers jours.
        </p>
      </Section>

      <Section id="taxes" title="4. Taxes et frais">
        <p>
          Pas de TVA facturée. Les frais de livraison éventuels sont indiqués avant la validation
          finale de commande. Les frais liés au retrait sur évènement sont nuls.
        </p>
      </Section>

      <Section id="commande" title="5. Modalités de commande">
        <ul className="list-disc list-inside space-y-1">
          <li>Choix du produit et ajout au panier.</li>
          <li>Affichage du récapitulatif détaillé (articles, quantités, prix nets, frais).</li>
          <li>Validation des CGV par case à cocher non pré-cochée et confirmation de l'obligation de paiement.</li>
          <li>Redirection vers le paiement sécurisé (Stripe) puis confirmation par email.</li>
        </ul>
      </Section>

      <Section id="disponibilite" title="6. Disponibilité">
        <p>
          Les offres sont valables dans la limite des stocks et capacités de préparation. En cas
          d'indisponibilité après commande, vous serez remboursé intégralement.
        </p>
      </Section>

      <Section id="paiement" title="7. Paiement">
        <p>
          Les paiements sont sécurisés via Stripe. Moyens acceptés : {paymentList}. Aucune donnée
          bancaire n'est conservée sur nos serveurs.
        </p>
      </Section>

      <Section id="livraison" title="8. Livraison / retrait">
        <p>
          Zones et transporteurs : {deliveryZones} — {deliveryCarriers}. Délais indicatifs : {deliveryDelays}.
          Frais : {deliveryFees}. Les colis endommagés doivent être signalés immédiatement ({damagedPolicy}).
          En cas de retrait sur évènement, le client doit se présenter avec son email de confirmation.
        </p>
      </Section>

      <Section id="risques" title="9. Transfert des risques">
        <p>
          Les risques sont transférés au client lors de la remise du colis au transporteur ou lors du
          retrait en main propre sur l'évènement, selon le mode choisi.
        </p>
      </Section>

      <Section id="retractation" title="10. Droit de rétractation">
        <p>
          Vous disposez d'un délai légal de 14 jours à compter de la réception pour exercer votre
          droit de rétractation (hors exceptions listées). Merci d'utiliser le{" "}
          <a className="text-primary underline" href="/retractation-retours#formulaire">
            formulaire type
          </a>{" "}
          et de l'envoyer à {returnEmail}. Adresse de retour : {returnAddress}. Frais de retour : {returnCosts}.
          Remboursement : {refundDelay}. Exceptions :{" "}
          {exceptions.length > 0 ? exceptions.join(", ") : "aucune exception déclarée"}.
        </p>
      </Section>

      <Section id="retours" title="11. Retours et remboursements">
        <p>
          Les retours doivent être complets, dans leur état d'origine. Après réception et contrôle,
          nous remboursons via le moyen de paiement initial dans le délai annoncé ci-dessus.
        </p>
      </Section>

      <Section id="garanties" title="12. Garanties légales">
        <p>
          Les produits bénéficient des garanties légales de conformité (articles L217-3 et suivants du
          Code de la consommation) et des vices cachés (articles 1641 et suivants du Code civil).
        </p>
      </Section>

      <Section id="service-client" title="13. Service client">
        <p>
          Pour toute question ou réclamation : {sanitize(legalIdentity.email, "contact@example.com")} /{" "}
          {sanitize(legalIdentity.phone, "Téléphone à compléter")}.
        </p>
      </Section>

      <Section id="responsabilite" title="14. Responsabilité">
        <p>
          Nous ne saurions être responsables des retards dus à un cas de force majeure ni des
          dommages indirects. Les limitations légales de responsabilité demeurent applicables.
        </p>
      </Section>

      <Section id="force-majeure" title="15. Force majeure">
        <p>
          L'exécution des obligations peut être suspendue en cas d'événement extérieur, irrésistible
          et imprévisible (force majeure) rendant impossible l'exécution du contrat.
        </p>
      </Section>

      <Section id="droit-applicable" title="16. Droit applicable et litiges">
        <p>
          Les CGV sont soumises au droit français. En cas de litige, les tribunaux français seront
          seuls compétents après tentative de médiation.
        </p>
      </Section>

      <Section id="preuve" title="17. Archivage et preuve">
        <p>
          Les registres informatisés conservés dans nos systèmes dans des conditions raisonnables de
          sécurité sont considérés comme preuve des communications, commandes et paiements.
        </p>
      </Section>
    </LegalLayout>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-2 text-muted-foreground">{children}</div>
    </section>
  );
}
