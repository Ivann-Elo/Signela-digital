import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Target, Palette, Share2, Globe, Camera, Smartphone, Lightbulb } from "lucide-react";

const services = [
  {
    id: "video",
    label: "Vidéos d'entreprise",
    icon: Video,
    stat: "15000",
    statLabel: "HEURES DE VIDÉOS TOURNÉES",
    title: "MONTRER VOS PLUS BEAU VISAGE",
    description: "Nous réalisons des vidéos corporate, des spots publicitaires et des contenus engageants qui captent l'attention de votre audience et renforcent votre image de marque.",
    features: [
      { icon: Camera, label: "Tournage Pro" },
      { icon: Smartphone, label: "Stabilisation 4K" },
      { icon: Lightbulb, label: "Éclairage Studio" },
    ],
  },
  {
    id: "ads",
    label: "Campagne Ads",
    icon: Target,
    stat: "500+",
    statLabel: "CAMPAGNES LANCÉES",
    title: "DES CAMPAGNES QUI CONVERTISSENT",
    description: "Optimisez votre retour sur investissement avec des campagnes publicitaires ciblées sur Google, Meta, TikTok et LinkedIn.",
    features: [
      { icon: Target, label: "Ciblage Précis" },
      { icon: Share2, label: "Multi-plateforme" },
      { icon: Lightbulb, label: "A/B Testing" },
    ],
  },
  {
    id: "identity",
    label: "Identité visuelle",
    icon: Palette,
    stat: "200+",
    statLabel: "MARQUES CRÉÉES",
    title: "UNE IDENTITÉ QUI MARQUE",
    description: "Développez une identité visuelle unique et mémorable qui reflète vos valeurs et vous distingue de la concurrence.",
    features: [
      { icon: Palette, label: "Logo Design" },
      { icon: Globe, label: "Charte Graphique" },
      { icon: Camera, label: "Direction Artistique" },
    ],
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    stat: "1M+",
    statLabel: "IMPRESSIONS GÉNÉRÉES",
    title: "ENGAGEZ VOTRE COMMUNAUTÉ",
    description: "Créez une présence sociale impactante avec du contenu engageant et une stratégie de community management efficace.",
    features: [
      { icon: Share2, label: "Content Strategy" },
      { icon: Camera, label: "Création Contenu" },
      { icon: Target, label: "Community Mgmt" },
    ],
  },
  {
    id: "web",
    label: "Site Web",
    icon: Globe,
    stat: "150+",
    statLabel: "SITES LIVRÉS",
    title: "VOTRE VITRINE DIGITALE",
    description: "Concevez un site web moderne, performant et optimisé pour convertir vos visiteurs en clients.",
    features: [
      { icon: Globe, label: "Design UX/UI" },
      { icon: Smartphone, label: "Responsive" },
      { icon: Target, label: "SEO Optimisé" },
    ],
  },
];

export const Prestations = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section id="prestations" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            PRESTATIONS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            En quelques mots
            <br />
            <span className="text-gradient">nos solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des services complets pour développer votre présence digitale et 
            atteindre vos objectifs commerciaux.
          </p>
        </motion.div>

        {/* Service Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeService.id === service.id
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {service.label}
            </button>
          ))}
        </motion.div>

        {/* Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left - Stats & Features */}
              <div className="space-y-8">
                <div>
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">PLUS DE</span>
                  <div className="text-gradient font-display font-bold text-6xl md:text-7xl lg:text-8xl">
                    {activeService.stat}
                  </div>
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">
                    {activeService.statLabel}
                  </span>
                </div>

                <div className="flex gap-4">
                  {activeService.features.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex-1"
                    >
                      <div className="aspect-square rounded-2xl bg-secondary border border-border flex flex-col items-center justify-center p-4 hover:border-primary/30 transition-colors">
                        <feature.icon className="w-8 h-8 text-primary mb-2" />
                        <span className="text-xs text-muted-foreground text-center">{feature.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right - Description */}
              <div className="space-y-6">
                <h3 className="font-display font-bold text-2xl md:text-3xl">
                  {activeService.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {activeService.description}
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-foreground font-medium">
                  Ça m'intéresse !
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
