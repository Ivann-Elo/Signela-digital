import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { siteUrl } from "@/lib/seo";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Politique de confidentialité"
        description="Politique de confidentialité de Signela Digital. Informations sur la collecte, l’usage et la protection des données."
        canonical={`${siteUrl}/politique-de-confidentialite`}
      />
      <Header />
      <main className="relative pb-24 md:pb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
        <section className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mt-6 bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card">
              <div className="flex flex-col gap-2 mb-10">
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                  Politique de confidentialité
                </h1>
                <p className="text-muted-foreground text-sm">Dernière mise à jour : 31 janvier 2026</p>
                <p className="text-muted-foreground text-xs">
                  À personnaliser selon vos traitements et outils (analytics, CRM, emailing, etc.).
                </p>
              </div>

              <div className="space-y-8 text-muted-foreground">
                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Responsable du traitement</h2>
                  <p>Signela Digital (coordonnées légales à compléter).</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Données collectées</h2>
                  <p>
                    Lorsque vous nous contactez via les formulaires du site, nous collectons les données suivantes :
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Identité : nom, prénom.</li>
                    <li>Coordonnées : email, téléphone.</li>
                    <li>Informations de projet : prestation souhaitée, budget, message.</li>
                    <li>Liens sociaux et site web (optionnel) : Instagram, TikTok, LinkedIn, site, fiche Google Business.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Finalités</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Répondre à vos demandes et vous recontacter.</li>
                    <li>Élaborer un devis ou une proposition commerciale.</li>
                    <li>Assurer le suivi de la relation client.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Base légale</h2>
                  <p>
                    Le traitement de vos données repose sur votre consentement et/ou l'intérêt légitime à répondre à vos
                    demandes.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Destinataires et sous-traitants</h2>
                  <p>
                    Les données sont traitées par Signela Digital et ses prestataires techniques pour la gestion des
                    demandes. Les formulaires du site transitent via notre infrastructure technique et peuvent être
                    enregistrés dans nos outils de gestion et de notification (ex. base de données, CRM, email).
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Durée de conservation</h2>
                  <p>
                    Les données sont conservées pendant une durée n'excédant pas celle nécessaire aux finalités. À titre
                    indicatif : jusqu'à 3 ans après le dernier contact.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Vos droits</h2>
                  <p>
                    Vous disposez de droits d'accès, de rectification, d'effacement, d'opposition, de limitation et de
                    portabilité. Pour exercer vos droits, contactez-nous à
                    <a className="text-foreground hover:underline" href="mailto:marketing@signela.fr"> marketing@signela.fr</a>.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Cookies</h2>
                  <p>
                    Le site peut utiliser des cookies techniques nécessaires à son fonctionnement. Si des outils de
                    mesure d'audience ou marketing sont ajoutés, un bandeau de consentement sera mis en place. Pour en
                    savoir plus, consultez notre{" "}
                    <a className="text-foreground hover:underline" href="/politique-de-cookies">
                      politique de cookies
                    </a>
                    .
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Contact</h2>
                  <p>
                    Pour toute question relative à la protection des données, contactez-nous à
                    <a className="text-foreground hover:underline" href="mailto:marketing@signela.fr"> marketing@signela.fr</a>.
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

export default PrivacyPolicy;
