import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative pb-24 md:pb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
        <section className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mt-6 bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card">
              <div className="flex flex-col gap-2 mb-10">
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                  Mentions legales
                </h1>
                <p className="text-muted-foreground text-sm">Dernière mise à jour : 29 janvier 2026</p>
                <p className="text-muted-foreground text-xs">
                  À personnaliser avec vos informations légales et sociétaires.
                </p>
              </div>

              <div className="space-y-8 text-muted-foreground">
                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Editeur du site</h2>
                  <p>Signela Digital</p>
                  <p>Forme juridique : Micro entreprise
                  </p>
                  <p>Capital social : 5 000€</p>
                  <p>RCS / SIREN / SIRET : A completer</p>
                  <p>TVA intracommunautaire : A completer</p>
                  <p>Siege social : 31P av des carrières</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Directeur de la publication</h2>
                  <p>Ivann Elore</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Contact</h2>
                  <p>Email : <a className="text-foreground hover:underline" href="mailto:marketing@signela.fr">marketing@signela.fr</a></p>
                  <p>Telephone : +33 7 71 07 72 71</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Hebergeur</h2>
                  <p>Hebergeur : IONOS</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Propriété intellectuelle</h2>
                  <p>
                    L'ensemble des contenus (textes, images, videos, graphismes, logos, icones) est protegee par le
                    droit de la propriete intellectuelle et demeure la propriete de Signela Digital ou de ses
                    partenaires. Toute reproduction, representation ou diffusion, totale ou partielle, est interdite
                    sans autorisation prealable ecrite.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Responsabilite</h2>
                  <p>
                    Signela Digital met en oeuvre tous les moyens raisonnables pour assurer l'exactitude des
                    informations presentes sur ce site. Toutefois, des erreurs ou omissions peuvent survenir. L'utilisateur
                    est invite a verifier l'information et a signaler toute inexactitude.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-foreground font-semibold text-lg">Donnees personnelles</h2>
                  <p>
                    Pour en savoir plus sur la collecte et le traitement de vos donnees, veuillez consulter notre
                    politique de confidentialite.
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

export default LegalNotice;
