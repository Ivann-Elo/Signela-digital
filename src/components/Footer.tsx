import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logoBlanc from "@/assets/logo-blanc.png";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border pt-16 pb-24 md:pb-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
             <a href="#" className="flex items-center">
            <img src={logoBlanc} alt="Signela Digital" className="h-10 w-auto" />
          </a>
            </div>
            <p className="text-muted-foreground text-sm">
              Communication vidéo & Marketing digital.
              <br />
              Votre partenaire pour booster vos ventes.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {["Vidéos d'entreprise", "Campagne Ads", "Identité visuelle", "Social Media", "Site Web"].map((item) => (
                <li key={item}>
                  <a href="#prestations" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:marketing@signela.fr">marketing@signela.fr</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +33 7 71 01 72 71
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                Caen, Normandie
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  <social.icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Signela Digital. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
