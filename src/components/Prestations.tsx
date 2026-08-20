import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, type Service } from "@/data/services";
import { PrestationModal } from "./PrestationModal";

interface PrestationsProps {
  activeServiceId: string;
  onServiceChange: (id: string) => void;
}

export const Prestations = ({ activeServiceId, onServiceChange }: PrestationsProps) => {
  const activeService = services.find((service) => service.id === activeServiceId) ?? services[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrestation, setSelectedPrestation] = useState<Service | null>(null);

  const handleOpenModal = (service: Service) => {
    setSelectedPrestation(service);
    setIsModalOpen(true);
  };

  return (
    <section id="prestations" className="pt-8 pb-16 md:py-24 relative overflow-hidden"
>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
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
            <strong>Plusieurs leviers</strong> pour booster votre communication et atteindre vos objectifs. Parce que chaque entreprise a ses besoins, nous avons des <strong>solutions adaptées</strong> pour chacune d'entre elles.
            L'identité visuelle doit être le reflet de votre entreprise, de vos <strong>valeurs et de votre vision</strong>. Nous sommes là pour la mettre en avant et la diffuser de manière ciblée, en <strong>optimisant votre budget publicitaire</strong>.
          </p>
        </motion.div>

        {/* Service Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
        >
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceChange(service.id)}
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
