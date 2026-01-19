import { motion } from "framer-motion";
import { ArrowRight, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
const videos = [
  { id: 1, src: "/videos/candylips3.mp4" },
  { id: 2, src: "/videos/candylips3.mp4" },
  { id: 3, src: "/videos/candylips3.mp4" },
  { id: 4, src: "/videos/candylips3.mp4" },
  { id: 5, src: "/videos/candylips3.mp4" },
  { id: 6, src: "/videos/candylips3.mp4" },
];
export const Hero = () => {
  return <section id="hero" className="relative min-h-screen pt-24 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 h-[calc(100vh-6rem)]">
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 h-full items-center">
          {/* Left Content - Centered Text */}
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto lg:mx-0 lg:mr-auto">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                VOTRE PARTENAIRE
                <br />
                <span className="text-gradient">POUR BOOSTER VOS VENTES</span>
              </h1>
            </motion.div>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
              Nous créons des contenus vidéo percutants et des stratégies digitales 
              qui transforment votre audience en clients fidèles.
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8">
                PARLER DE MES BESOINS
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary px-8">
                APPELER-NOUS
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Vertical Scrolling Videos */}
          <div className="hidden lg:flex items-center gap-6 h-full">
            {/* Arrow pointing to videos */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }} className="flex-shrink-0">
              <ArrowLeft className="w-10 h-10 text-muted-foreground" />
            </motion.div>

            {/* Videos Container */}
            <div 
              className="relative h-[80vh] flex gap-4 overflow-hidden"
              style={{
                transform: "perspective(800px) rotateY(-12deg)",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Gradient overlays for smooth fade */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
              {/* Label */}
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6,
              delay: 0.3
            }} className="absolute -top-16 right-0 text-right z-10">
                
                
              </motion.div>

              {/* First Video Column */}
              <div className="w-36 h-full overflow-hidden rounded-2xl">
                <motion.div animate={{
                y: [0, "-50%"]
              }} transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }} className="flex flex-col gap-4">
                  {[...videos, ...videos].map((video, index) => (
                    <video
                      key={`col1-${index}`}
                      src={video.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-36 aspect-[9/16] rounded-2xl object-cover flex-shrink-0"
                    />
                  ))}
                </motion.div>
              </div>

              {/* Second Video Column - Offset */}
              <div className="w-36 h-[calc(100%-5rem)] overflow-hidden rounded-2xl mt-10 mb-10">
                <motion.div animate={{
                y: ["-50%", 0]
              }} transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }} className="flex flex-col gap-4">
                  {[...videos, ...videos].map((video, index) => (
                    <video
                      key={`col2-${index}`}
                      src={video.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-36 aspect-[9/16] rounded-2xl object-cover flex-shrink-0"
                    />
                  ))}
                </motion.div>
              </div>

              {/* Third Video Column */}
              <div className="w-36 h-full overflow-hidden rounded-2xl">
                <motion.div animate={{
                y: [0, "-50%"]
              }} transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear"
              }} className="flex flex-col gap-4">
                  {[...videos, ...videos].map((video, index) => (
                    <video
                      key={`col3-${index}`}
                      src={video.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-36 aspect-[9/16] rounded-2xl object-cover flex-shrink-0"
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};