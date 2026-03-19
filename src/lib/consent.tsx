"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  personalization: boolean;
  marketing: boolean;
};

export type ConsentState = {
  categories: ConsentCategories;
  updatedAt: string | null;
  version: number;
};

const STORAGE_KEY = "cookie_consent_v1";

type ConsentContextValue = {
  consent: ConsentState | null;
  isBannerVisible: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: Partial<ConsentCategories>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  canUse: (category: keyof ConsentCategories) => boolean;
};

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed?.categories) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(() => loadConsent());
  const [isPreferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    if (consent) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    }
  }, [consent]);

  const acceptAll = () => {
    setConsent({
      categories: {
        necessary: true,
        analytics: true,
        personalization: true,
        marketing: true,
      },
      updatedAt: new Date().toISOString(),
      version: 1,
    });
    setPreferencesOpen(false);
  };

  const rejectAll = () => {
    setConsent({
      categories: {
        necessary: true,
        analytics: false,
        personalization: false,
        marketing: false,
      },
      updatedAt: new Date().toISOString(),
      version: 1,
    });
    setPreferencesOpen(false);
  };

  const savePreferences = (categories: Partial<ConsentCategories>) => {
    setConsent((prev) => ({
      categories: {
        necessary: true,
        analytics: categories.analytics ?? prev?.categories.analytics ?? false,
        personalization: categories.personalization ?? prev?.categories.personalization ?? false,
        marketing: categories.marketing ?? prev?.categories.marketing ?? false,
      },
      updatedAt: new Date().toISOString(),
      version: 1,
    }));
    setPreferencesOpen(false);
  };

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      isBannerVisible: !consent,
      isPreferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      canUse: (category) => {
        if (category === "necessary") return true;
        return Boolean(consent?.categories?.[category]);
      },
    }),
    [consent, isPreferencesOpen]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
