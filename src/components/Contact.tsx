import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export const Contact = () => {
  return (
    <section id="contact" className="pt-10 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] hidden md:block" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] hidden md:block" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Contactez-nous
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            PRÊT À DONNER VIE
            <br />
            <span className="text-gradient">À VOS PROJETS ?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Parlez-nous de votre vision et laissez-nous vous accompagner dans
            la réalisation de vos ambitions digitales.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            <LeadForm source="Section Contact" defaultService="autre" />
          </div>
        </motion.div>

        {/* Contact Info - Horizontal below form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-8 mt-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground font-medium">
                <a href="mailto:contact@signela-digital.fr">contact@signela-digital.fr</a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="text-foreground font-medium">+33 7 71 01 72 71</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
