import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const videoPlaceholders = [
  { id: 1, delay: 0 },
  { id: 2, delay: 0.2 },
  { id: 3, delay: 0.4 },
];

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                VOTRE PARTENAIRE
                <br />
                <span className="text-gradient">POUR BOOSTER</span>
                <br />
                VOS VENTES
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Nous créons des contenus vidéo percutants et des stratégies digitales 
              qui transforment votre audience en clients fidèles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group bg-gradient-primary hover:opacity-90 text-primary-foreground border-0">
                Parler de mes besoins
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                <Phone className="w-4 h-4 mr-2" />
                Appeler-nous
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Video Showcase */}
          <div className="relative">
            <div className="flex flex-col gap-4 items-end">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-right mb-4"
              >
                <h3 className="font-display text-sm uppercase tracking-widest text-primary mb-1">
                  Vidéos Réalisées
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Découvrez quelques-unes de nos réalisations vidéo en lecture automatique
                </p>
              </motion.div>

              {/* Video Cards */}
              <div className="flex gap-4 overflow-hidden">
                {videoPlaceholders.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + video.delay }}
                    className="relative group"
                  >
                    <div className="w-40 md:w-48 aspect-[9/16] rounded-2xl bg-card border border-border overflow-hidden shadow-card group-hover:shadow-glow transition-shadow duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                          <div className="w-0 h-0 border-l-8 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-primary rounded-full"
                            style={{ width: `${30 + index * 25}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-primary/30">
                <path d="M50 30H10M10 30L25 15M10 30L25 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
