import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
        <section className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mt-6 bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card">
              <div className="flex flex-col gap-2 mb-10">
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                  Politique de confidentialite
                </h1>
                <p className="text-muted-foreground text-sm">Derniere mise a jour : 29 janvier 2026</p>
                <p className="text-muted-foreground text-xs">
                  A personnaliser selon vos traitements et outils (analytics, CRM, emailing, etc.).
                </p>
              </div>

              <div className="space-y-8 text-muted-foreground">
                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Responsable du traitement</h2>
                  <p>Signela Digital (coordonnees legales a completer).</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Donnees collectees</h2>
                  <p>
                    Lorsque vous nous contactez via les formulaires du site, nous collectons les donnees suivantes :
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Identite : nom, prenom.</li>
                    <li>Coordonnees : email, telephone.</li>
                    <li>Informations de projet : prestation souhaitee, budget, message.</li>
                    <li>Liens sociaux et site web (optionnel) : Instagram, TikTok, LinkedIn, site, fiche Google Business.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Finalites</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Repondre a vos demandes et vous recontacter.</li>
                    <li>Elaborer un devis ou une proposition commerciale.</li>
                    <li>Assurer le suivi de la relation client.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Base legale</h2>
                  <p>
                    Le traitement de vos donnees repose sur votre consentement et/ou l'interet legitime a repondre a vos
                    demandes.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Destinataires et sous-traitants</h2>
                  <p>
                    Les donnees sont traitees par Signela Digital et ses prestataires techniques pour la gestion des
                    demandes. Les formulaires du site transitent via notre infrastructure technique et peuvent etre
                    enregistres dans nos outils de gestion et de notification (ex. base de donnees, CRM, email).
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Duree de conservation</h2>
                  <p>
                    Les donnees sont conservees pendant une duree n'excedant pas celle necessaire aux finalites. A titre
                    indicatif : jusqu'a 3 ans apres le dernier contact.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Vos droits</h2>
                  <p>
                    Vous disposez de droits d'acces, de rectification, d'effacement, d'opposition, de limitation et de
                    portabilite. Pour exercer vos droits, contactez-nous a
                    <a className="text-foreground hover:underline" href="mailto:marketing@signela.fr"> marketing@signela.fr</a>.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Cookies</h2>
                  <p>
                    Le site peut utiliser des cookies techniques necessaires a son fonctionnement. Si des outils de
                    mesure d'audience ou marketing sont ajoutes, un bandeau de consentement sera mis en place.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Contact</h2>
                  <p>
                    Pour toute question relative a la protection des donnees, contactez-nous a
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
