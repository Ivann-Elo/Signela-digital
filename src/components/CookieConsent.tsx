import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  CONSENT_MAX_AGE_DAYS,
  getConsent,
  onOpenPreferences,
  saveConsent,
} from "@/lib/consent";

const defaultPreferences = {
  analytics: false,
  marketing: false,
};

export const CookieConsent = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setIsBannerVisible(true);
      setPreferences(defaultPreferences);
      return;
    }
    setPreferences(existing.categories);
  }, []);

  useEffect(() => {
    return onOpenPreferences(() => setIsDialogOpen(true));
  }, []);

  const acceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
    setPreferences({ analytics: true, marketing: true });
    setIsBannerVisible(false);
    setIsDialogOpen(false);
  };

  const refuseAll = () => {
    saveConsent({ analytics: false, marketing: false });
    setPreferences({ analytics: false, marketing: false });
    setIsBannerVisible(false);
    setIsDialogOpen(false);
  };

  const savePreferences = () => {
    saveConsent(preferences);
    setIsBannerVisible(false);
    setIsDialogOpen(false);
  };

  const bannerDescription = useMemo(
    () =>
      `Nous utilisons des cookies pour assurer le bon fonctionnement du site et, avec votre accord, pour mesurer l'audience et améliorer nos services. Vous pouvez modifier votre choix à tout moment.`,
    [],
  );

  return (
    <>
      {isBannerVisible ? (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-card p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Gestion des cookies</h3>
                <p className="text-sm text-muted-foreground">
                  {bannerDescription}{" "}
                  <a className="text-primary hover:underline" href="/politique-de-cookies">
                    En savoir plus
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button variant="outline" onClick={refuseAll} className="sm:min-w-[150px]">
                  Tout refuser
                </Button>
                <Button variant="ghost" onClick={() => setIsDialogOpen(true)} className="sm:min-w-[150px]">
                  Personnaliser
                </Button>
                <Button variant="outline" onClick={acceptAll} className="sm:min-w-[150px]">
                  Tout accepter
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Préférences de cookies</DialogTitle>
            <DialogDescription>
              Vous pouvez activer ou désactiver les cookies non essentiels. Votre choix est conservé pendant{" "}
              {Math.floor(CONSENT_MAX_AGE_DAYS / 30)} mois.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-4 py-3">
              <div>
                <p className="font-medium text-foreground">Essentiels</p>
                <p className="text-sm text-muted-foreground">
                  Nécessaires au fonctionnement du site (sécurité, accessibilité, préférences de base).
                </p>
              </div>
              <Switch checked disabled />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="font-medium text-foreground">Mesure d'audience</p>
                <p className="text-sm text-muted-foreground">
                  Permet de mesurer les visites et d'améliorer la performance du site.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(value) => setPreferences((prev) => ({ ...prev, analytics: value }))}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="font-medium text-foreground">Marketing</p>
                <p className="text-sm text-muted-foreground">
                  Autorise les outils marketing (publicité, remarketing, pixels).
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(value) => setPreferences((prev) => ({ ...prev, marketing: value }))}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button variant="outline" onClick={refuseAll} className="sm:min-w-[140px]">
              Tout refuser
            </Button>
            <Button variant="ghost" onClick={savePreferences} className="sm:min-w-[140px]">
              Enregistrer
            </Button>
            <Button variant="outline" onClick={acceptAll} className="sm:min-w-[140px]">
              Tout accepter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
