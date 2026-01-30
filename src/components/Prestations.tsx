import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Target, Palette, Share2, Globe, Camera, TabletSmartphone, FilePen, Euro} from "lucide-react";
import { PrestationModal } from "./PrestationModal";

const services = [
  {
    id: "video",
    label: "Vidéos d'entreprise",
    icon: Video,
    stat: "150+",
    statLabel: "VIDÉOS RÉALISÉES",
    title: "CAPTER L'ATTENTION À TRAVERS LE CONTENU VIDÉO",
    description: "La vidéo marketing est aujourd’hui le levier le plus puissant pour capter l’attention et générer de la conversion. Nous avons fait du contenu vidéo de qualité le pilier de notre stratégie digitale, car il performe sur toutes les plateformes et touche toutes les audiences. Grâce à des scripts vidéo optimisés, pensés pour convaincre, engager et convertir, nous transformons vos prospects en clients et renforçons durablement votre visibilité en ligne.",
    features: [
      { icon: Camera, label: "Matériels professionnel." },
      { icon: TabletSmartphone, label: "Contenu adapté au support de communication." },
      { icon: FilePen, label: "Écriture de script pensé pour la performance." },
    ],
  },
  {
    id: "ads",
    label: "Campagne Meta aAds",
    icon: Target,
    stat: "50+",
    statLabel: "CAMPAGNES LANCÉES",
    title: "DES CAMPAGNES DE PUBLICITÉ QUI CONVERTISSENT",
    description: "Imaginez, votre service, votre produit qui arrive directement dans le fil d'actualité Facebook, Instagram de votre client cible. L'objectif ? Attirer son attention, susciter son intérêt et le convertir en client fidèle. Grâce à des campagnes publicitaires Meta Ads stratégiquement conçues, nous maximisons votre retour sur investissement publicitaire en ciblant précisément les audiences les plus susceptibles de devenir vos clients.",
    features: [
      { icon: Target, label: "Ciblage Précis" },
      { icon: Share2, label: "Multi-plateforme" },
      { icon: Euro, label: "Retour sur investissement" },
    ],
  },
  {
    id: "identity",
    label: "Identité visuelle",
    icon: Palette,
    stat: "200+",
    statLabel: "IDENTITÉS VISUELLES CRÉÉES",
    title: "UNE IDENTITÉ QUI COLLE À VOTRE IMAGE",
    description: "Développez une identité visuelle forte, cohérente et mémorable, pensée pour traduire vos valeurs, affirmer votre positionnement et renforcer votre image de marque. Grâce à une direction artistique stratégique et un design soigné, vous vous démarquez durablement de la concurrence, captez l’attention de votre audience et installez une reconnaissance immédiate sur l’ensemble de vos supports de communication, digitaux comme print.",
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
    description: "Créez une présence sociale forte et cohérente grâce à des contenus engageants et une stratégie de community management structurée. Nous développons votre visibilité sur les réseaux sociaux, renforçons la relation avec votre communauté et transformons vos plateformes sociales en véritables leviers de notoriété, d’engagement et de conversion..",
    features: [
      { icon: Share2, label: "Stratégie de communication" },
      { icon: Camera, label: "Création Contenu" },
      { icon: Target, label: "Community Mgmt" },
    ],
  },
  {
    id: "web",
    label: "Site Web",
    icon: Globe,
    stat: "80+",
    statLabel: "SITES LIVRÉS",
    title: "VOTRE VITRINE DIGITALE",
    description: "Concevez un site web moderne, performant et pensé pour la conversion, capable d’offrir une expérience utilisateur fluide et efficace. Nous créons des sites web optimisés pour le référencement naturel, conçus pour capter l’attention, valoriser votre activité et transformer vos visiteurs en clients grâce à une structure claire et des parcours utilisateurs maîtrisés.",
    features: [
      { icon: Globe, label: "Design UX/UI" },
      { icon: TabletSmartphone, label: "Responsive" },
      { icon: Target, label: "SEO Optimisé" },
    ],
  },
];

export const Prestations = () => {
  const [activeService, setActiveService] = useState(services[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrestation, setSelectedPrestation] = useState<typeof services[0] | null>(null);

  const handleOpenModal = (service: typeof services[0]) => {
    setSelectedPrestation(service);
    setIsModalOpen(true);
  };

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
            Nos prestations
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            EN QUELQUES MOTS,
            <br />
            <span className="text-gradient">CE QUE NOUS VOUS PROPOSONS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-4xl mx-auto">
            <strong>Plusieurs leviers</strong> pour booster votre communication et atteindre vos objectifs. Parce que chaque entreprise à ces besoins, nous avons des <strong>solutions adaptées</strong>, pour chacune d'entre elles.
            L'identité visuelle doit être le reflet de votre entreprise, de vos <strong>valeurs et de votre vision</strong>. Nous sommes la pour la mettre en avant et la diffuser de manière ciblé, en <strong>optimisant votre budget publicitaire</strong>.
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
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary"
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
            className="bg-card border border-border rounded-3xl p-6 sm:p-8 md:p-12 shadow-card"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left - Stats & Features */}
              <div className="space-y-8">
                <div>
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">PLUS DE</span>
                  <div className="text-gradient font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                    {activeService.stat}
                  </div>
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">
                    {activeService.statLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex">
                  {activeService.features.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex-1 min-w-0"
                    >
                      <div className="rounded-2xl bg-secondary border border-border flex flex-col items-center justify-center p-3 sm:p-4 min-h-[120px] sm:min-h-[140px] hover:border-primary/30 transition-colors text-center">
                        <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary mb-2" />
                        <span className="text-[11px] sm:text-xs text-muted-foreground text-center leading-snug">
                          {feature.label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right - Description */}
              <div className="space-y-6">
                <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl">
                  {activeService.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {activeService.description}
                </p>
                <button 
                  onClick={() => handleOpenModal(activeService)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-foreground font-medium"
                >
                  Ça m'intéresse !
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <PrestationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          prestation={selectedPrestation}
        />
      </div>
    </section>
  );
};
