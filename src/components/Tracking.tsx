import { useEffect } from "react";
import { ConsentState, getConsent, onConsentChange } from "@/lib/consent";

const applyConsent = (consent: ConsentState | null) => {
  if (!consent) return;
  if (consent.categories.analytics) {
    // Ajoutez ici le chargement des scripts analytics apres consentement.
  }
  if (consent.categories.marketing) {
    // Ajoutez ici le chargement des scripts marketing apres consentement.
  }
};

export const Tracking = () => {
  useEffect(() => {
    applyConsent(getConsent());
    return onConsentChange((state) => applyConsent(state));
  }, []);

  return null;
};
