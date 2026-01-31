import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { siteUrl } from "@/lib/seo";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Politique de cookies"
        description="Politique de cookies de Signela Digital : finalités, catégories, durée de conservation et gestion du consentement."
        canonical={`${siteUrl}/politique-de-cookies`}
      />
      <Header />
      <main className="relative pb-24 md:pb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
        <section className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mt-6 bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card">
              <div className="flex flex-col gap-2 mb-10">
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                  Politique de cookies
                </h1>
                <p className="text-muted-foreground text-sm">Dernière mise à jour : 31 janvier 2026</p>
              </div>

              <div className="space-y-8 text-muted-foreground">
                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Qu'est-ce qu'un cookie ?</h2>
                  <p>
                    Un cookie est un petit fichier texte déposé sur votre terminal lors de la consultation d'un site.
                    Il permet, par exemple, de mémoriser vos préférences ou de mesurer l'audience.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Catégories de cookies</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Essentiels</strong> : nécessaires au fonctionnement du site.</li>
                    <li><strong>Mesure d'audience</strong> : statistiques de visite et performance.</li>
                    <li><strong>Marketing</strong> : publicité, remarketing, pixels.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Cookies utilisés</h2>
                  <p>
                    À ce jour, aucun cookie non essentiel n'est déposé sans votre consentement. Si vous activez une
                    catégorie, les outils correspondants pourront déposer des cookies.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground">Essentiels</p>
                      <p>Aucun cookie de suivi. Cookies techniques strictement nécessaires au fonctionnement.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Mesure d'audience</p>
                      <p>Aucun outil actif par défaut. Ajout possible après consentement.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Marketing</p>
                      <p>Aucun outil actif par défaut. Ajout possible après consentement.</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Durée de conservation</h2>
                  <p>
                    Votre choix de consentement est conservé pendant 6 mois. Vous pouvez le modifier à tout moment via
                    le lien "Gérer mes cookies" disponible en pied de page.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Gestion du consentement</h2>
                  <p>
                    Lors de votre première visite, un bandeau vous permet d'accepter, de refuser ou de personnaliser les
                    cookies non essentiels. Aucun cookie non essentiel n'est déposé avant votre consentement.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Contact</h2>
                  <p>
                    Pour toute question relative aux cookies, contactez-nous à{" "}
                    <a className="text-foreground hover:underline" href="mailto:marketing@signela.fr">
                      marketing@signela.fr
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
