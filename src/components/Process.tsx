import { motion } from "framer-motion";
import { MessageCircle, ClipboardList, Lightbulb, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    icon: MessageCircle,
    title: "PRISE DE CONTACT",
    description:
      "Échangeons sur vos besoins, vos objectifs et votre vision. Un premier rendez-vous pour comprendre votre projet.",
  },
  {
    number: "2",
    icon: ClipboardList,
    title: "PRÉSENTATION DU BESOIN",
    description:
      "Nous analysons votre marché, votre cible et définissons ensemble une stratégie adaptée à vos ambitions.",
  },
  {
    number: "3",
    icon: Lightbulb,
    title: "PRÉSENTATION DES SOLUTIONS",
    description: "Découvrez nos recommandations personnalisées avec un plan d'action clair et des livrables définis.",
  },
  {
    number: "4",
    icon: TrendingUp,
    title: "ÉTUDE DES RÉSULTATS",
    description: "Suivi des performances, analyse des KPIs et optimisation continue pour maximiser votre ROI.",
  },
];

export const Process = () => {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] hidden md:block" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
           <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Comment ça marche ?
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl">
            UN PETIT PAS POUR VOUS,
            <br />
            <span className="text-gradient">UN GRAND POUR VOTRE ENTREPRISE</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-4xl mx-auto mt-6 pb-10">
            Chez Signela Digital, nous plaçons la proximité et la confiance au cœur de notre approche, car pour communiquer sur votre entreprise nous devons nous rendre au centre de votre entreprise. L’échange et la relation de confiance sont essentiels.
            Ensemble, nous formons une véritable équipe pour propulser durablement votre activité.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Large Background Number */}
              <div className="absolute -top-20 -left-2 font-display font-bold text-[140px] leading-none select-none pointer-events-none bg-gradient-to-br from-primary/20 to-accent/20 bg-clip-text text-transparent">
                {step.number}
              </div>

              {/* Card */}
              <div className="relative bg-card border border-border rounded-2xl p-6 pt-16 h-full hover:border-primary/30 transition-all duration-500 group-hover:shadow-glow">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center mb-6 group-hover:border-primary/30 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a href="#contact"><Button
            size="lg"
            className="group bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 px-8"
          >
            Prendre Contact
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
