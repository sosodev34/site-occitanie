"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useConsent } from "@/lib/consent";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export function CookieBanner() {
  const {
    isBannerVisible,
    acceptAll,
    rejectAll,
    openPreferences,
    isPreferencesOpen,
    closePreferences,
    savePreferences,
    consent,
  } = useConsent();
  const [mounted, setMounted] = useState(false);
  const [localPrefs, setLocalPrefs] = useState({
    analytics: false,
    personalization: false,
    marketing: false,
  });

  useEffect(() => {
    if (consent?.categories) {
      setLocalPrefs({
        analytics: consent.categories.analytics,
        personalization: consent.categories.personalization,
        marketing: consent.categories.marketing,
      });
    }
  }, [consent]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Évite le rendu côté serveur pour prévenir tout décalage d'hydratation
  if (!mounted) return null;

  return (
    <>
      {isBannerVisible && (
        <div className="fixed inset-x-4 bottom-4 z-50 md:inset-x-auto md:right-6 md:max-w-xl">
          <div className="rounded-2xl border border-border bg-card shadow-2xl p-4 sm:p-5 space-y-3">
            <p className="text-sm font-semibold text-foreground">Cookies & consentement</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nous utilisons des cookies nécessaires au fonctionnement du site et, avec votre accord,
              des cookies de mesure d'audience, personnalisation et marketing. Aucun cookie non
              essentiel n'est déposé sans votre consentement.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="px-4" onClick={acceptAll}>
                Accepter tout
              </Button>
              <Button size="sm" variant="outline" className="px-4" onClick={rejectAll}>
                Refuser tout
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="px-4 underline-offset-4 underline"
                onClick={openPreferences}
              >
                Personnaliser
              </Button>
              <Link href="/cookies" className="text-sm text-primary underline ml-auto">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      )}

      {isPreferencesOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Préférences cookies</h2>
                <p className="text-sm text-muted-foreground">
                  Activez ou désactivez les catégories facultatives. Vos choix sont conservés 6 mois.
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={closePreferences} aria-label="Fermer">
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <PreferenceRow
                title="Nécessaires"
                description="Indispensables au fonctionnement du site et à la sécurité."
                checked
                disabled
              />
              <PreferenceRow
                title="Mesure d'audience"
                description="Aide à améliorer le site (statistiques anonymisées)."
                checked={localPrefs.analytics}
                onChange={(value) => setLocalPrefs((p) => ({ ...p, analytics: value }))}
              />
              <PreferenceRow
                title="Personnalisation"
                description="Souvenirs de vos préférences et recommandations."
                checked={localPrefs.personalization}
                onChange={(value) => setLocalPrefs((p) => ({ ...p, personalization: value }))}
              />
              <PreferenceRow
                title="Marketing"
                description="Publicités personnalisées et mesure des campagnes."
                checked={localPrefs.marketing}
                onChange={(value) => setLocalPrefs((p) => ({ ...p, marketing: value }))}
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <Button variant="outline" onClick={rejectAll}>
                Refuser
              </Button>
              <Button
                onClick={() =>
                  savePreferences({
                    analytics: localPrefs.analytics,
                    personalization: localPrefs.personalization,
                    marketing: localPrefs.marketing,
                  })
                }
              >
                Enregistrer mes choix
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border p-3">
      <Switch
        id={title}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(v) => onChange?.(Boolean(v))}
        aria-label={title}
      />
      <div className="space-y-1">
        <Label htmlFor={title} className="text-foreground font-medium">
          {title}
        </Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
