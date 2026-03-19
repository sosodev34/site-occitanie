"use client";

import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Shield } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CartItem } from "../types";
import { useI18n } from "../lib/i18n";
import { delivery, paymentMethods, privacyShortNotice } from "../data/legal";
import { useConsent } from "../lib/consent";

interface CartSectionProps {
  cartItems: CartItem[];
  onUpdateQuantity: (boxId: string, newQuantity: number) => void;
  onRemoveItem: (boxId: string) => void;
  onNavigate: (section: string) => void;
}

export function CartSection({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}: CartSectionProps) {
  const total = cartItems.reduce((sum, item) => sum + item.box.price * item.quantity, 0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cgvAccepted, setCgvAccepted] = useState(false);
  const { t } = useI18n();
  const { openPreferences } = useConsent();
  const priceSuffix = t("common.priceSuffix", "€");

  const sanitize = (value: string, fallback: string) =>
    !value || value.includes("{{") ? fallback : value;

  const friendlyDeliveryFees = sanitize(delivery.fees, "Affichés avant paiement");
  const friendlyDeliveryDelays = sanitize(delivery.delays, "Précisés avant paiement");
  const friendlyDeliveryZones = sanitize(delivery.zones, "Zones précisées lors du checkout");
  const friendlyPayments =
    paymentMethods
      .map((m) => sanitize(m, ""))
      .filter(Boolean)
      .join(", ") || "Carte bancaire (Visa, Mastercard, CB)";

  const handleCheckout = async () => {
    if (isCheckingOut || !cgvAccepted) return;
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            boxId: item.box.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;

      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      if (!data?.url) {
        throw new Error("Missing checkout url");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      toast.error(t("cart.checkoutErrorTitle"), {
        description: error instanceof Error ? error.message : undefined,
      });
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section
        className="py-16 sm:py-20 min-h-[60vh] flex items-center scroll-mt-24"
        id="panier"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" aria-hidden />
            </div>
            <h2
              className="font-sans font-extrabold tracking-tight text-foreground text-3xl"
              data-i18n="cart.emptyTitle"
            >
              {t("cart.emptyTitle")}
            </h2>
            <p className="text-muted-foreground" data-i18n="cart.emptyDesc">
              {t("cart.emptyDesc")}
            </p>
            <Button
              onClick={() => onNavigate("boxes")}
              className="h-auto px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
            >
              <span data-i18n="cart.emptyCta">{t("cart.emptyCta")}</span>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const countLabel =
    cartItems.length > 1
      ? t("cart.countPlural", undefined, { count: cartItems.length })
      : t("cart.count", undefined, { count: cartItems.length });

  return (
    <section className="py-16 sm:py-20 scroll-mt-24" id="panier">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate("boxes")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden />
            <span data-i18n="cart.continue">{t("cart.continue")}</span>
          </button>
          <h2
            className="font-sans font-extrabold tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            data-i18n="cart.title"
          >
            {t("cart.title")}
          </h2>
          <p className="text-muted-foreground mt-2" data-i18n="cart.count">
            {countLabel}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.box.id}
                className="surface rounded-2xl border border-border p-4 sm:p-6 hover:shadow-2xl transition-all"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.box.image}
                      alt={t(`boxes.data.${item.box.id}.name`, item.box.name)}
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                      className="object-cover"
                    />
                  </div>

                  {/* Détails */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={[
                            "text-foreground text-lg sm:text-xl mb-1 tracking-tight",
                            item.box.tier === "premium" ? "font-serif" : "font-sans font-bold",
                          ].join(" ")}
                          data-i18n={`boxes.data.${item.box.id}.name`}
                        >
                          {t(`boxes.data.${item.box.id}.name`, item.box.name)}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2" data-i18n="cart.pickupOn">
                          {t("cart.pickupOn", undefined, {
                            date: t(
                              `boxes.data.${item.box.id}.availableDate`,
                              item.box.availableDate
                            ),
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.box.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        aria-label={t("cart.remove")}
                      >
                        <Trash2 className="w-5 h-5" aria-hidden />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantité */}
                      <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.box.id, Math.max(1, item.quantity - 1))
                          }
                          className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                          aria-label={t("cart.decrease")}
                        >
                          <Minus className="w-4 h-4" aria-hidden />
                        </button>
                        <span className="w-8 text-center text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.box.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                          aria-label={t("cart.increase")}
                        >
                          <Plus className="w-4 h-4" aria-hidden />
                        </button>
                      </div>

                      {/* Prix */}
                      <div className="text-right">
                        <div
                          className={[
                            "text-2xl text-primary",
                            item.box.tier === "premium" ? "font-serif" : "font-sans font-extrabold",
                          ].join(" ")}
                        >
                          {(item.box.price * item.quantity).toFixed(2)}
                          {priceSuffix}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-muted-foreground">
                            {item.box.price}
                            {priceSuffix} × {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="surface rounded-2xl border border-border p-6 sticky top-24 space-y-6 shadow-lg">
              <h3
                className="font-sans font-extrabold tracking-tight text-foreground text-xl"
                data-i18n="cart.summary"
              >
                {t("cart.summary")}
              </h3>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span data-i18n="cart.subtotal">{t("cart.subtotal")}</span>
                  <span>
                    {total.toFixed(2)}
                    {priceSuffix}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span data-i18n="cart.pickup">{t("cart.pickup")}</span>
                  <span className="text-secondary" data-i18n="cart.free">
                    {t("cart.free")}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>TVA incluse</span>
                  <span>Prix affichés TTC</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-foreground" data-i18n="cart.total">
                  {t("cart.total")}
                </span>
                <span className="text-3xl font-sans font-extrabold text-primary">
                  {total.toFixed(2)}
                  {priceSuffix}
                </span>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border"
                    checked={cgvAccepted}
                    onChange={(e) => setCgvAccepted(e.target.checked)}
                  />
                  <span>
                    J'ai lu et j'accepte les{" "}
                    <a href="/cgv" className="text-primary underline">
                      Conditions générales de vente
                    </a>
                    .
                  </span>
                </label>
                <p className="text-xs text-muted-foreground">
                  En validant, vous confirmez votre obligation de paiement. Vous pourrez corriger vos
                  informations tant que le paiement n'est pas confirmé.
                </p>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut || !cgvAccepted}
                className="w-full h-auto py-4 px-6 rounded-full shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-base"
              >
                {isCheckingOut ? "Redirection…" : "Payer maintenant — commande avec obligation de paiement"}
              </Button>

              <div className="space-y-3 pt-4 text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-secondary" aria-hidden>
                    ✓
                  </span>
                  <span data-i18n="cart.bulletPickup">{t("cart.bulletPickup")}</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-secondary" aria-hidden>
                    ✓
                  </span>
                  <span data-i18n="cart.bulletSecure">{t("cart.bulletSecure")}</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-secondary" aria-hidden>
                    ✓
                  </span>
                  <span data-i18n="cart.bulletEmail">{t("cart.bulletEmail")}</span>
                </div>
              </div>

              <div className="p-4 bg-accent/10 rounded-xl text-sm text-muted-foreground" data-i18n="cart.tip">
                {t("cart.tip")}
              </div>
            </div>
          </div>
        </div>

        {/* Informations précontractuelles obligatoires */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="surface rounded-2xl border border-border p-5">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-4 h-4" aria-hidden />
                Informations précontractuelles
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Détail des produits : nom, quantité, prix unitaire TTC, sous-total affichés ci-dessus.</li>
                <li>Frais de livraison : {friendlyDeliveryFees}.</li>
                <li>Délais estimatifs : {friendlyDeliveryDelays}.</li>
                <li>Moyens de paiement acceptés : {friendlyPayments}.</li>
                <li>Restrictions éventuelles de livraison : {friendlyDeliveryZones}.</li>
                <li>Vous pouvez corriger vos choix avant paiement et revenir en arrière tant que la transaction n'est pas confirmée.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="surface rounded-2xl border border-border p-5 space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Vie privée</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {privacyShortNotice}
              </p>
              <a href="/politique-confidentialite" className="text-sm text-primary underline">
                Lire la politique de confidentialité
              </a>
            </div>

            <div className="surface rounded-2xl border border-border p-5 space-y-2">
              <h4 className="text-lg font-semibold text-foreground">Liens utiles</h4>
              <div className="flex flex-col gap-2 text-sm">
                <a className="text-primary underline" href="/cgv">
                  Conditions générales de vente
                </a>
                <a className="text-primary underline" href="/mentions-legales">
                  Mentions légales
                </a>
                <a className="text-primary underline" href="/retractation-retours">
                  Rétractation & retours
                </a>
                <a className="text-primary underline" href="/mediation-consommation">
                  Médiation de la consommation
                </a>
                <button
                  type="button"
                  onClick={openPreferences}
                  className="text-left text-primary underline"
                >
                  {t("footer.manageCookies", "Gérer mes cookies")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
