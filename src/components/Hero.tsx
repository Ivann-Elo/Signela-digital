import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
const videos = [
  { id: 1, src: "/videos/candylips3.mp4" },
  { id: 2, src: "/videos/signela.mp4" },
  { id: 3, src: "/videos/publicite1.mp4" },
  { id: 4, src: "/videos/headSpaWeb.mp4" },
  { id: 5, src: "/videos/publicite1-st2.mp4" },
  { id: 6, src: "/videos/publicite2.mp4" },
  { id: 7, src: "/videos/publicite1-alt.mp4" },
  { id: 8, src: "/videos/publicite1-st3.mp4" },
];
export const Hero = () => {
  const [shouldRenderVideos, setShouldRenderVideos] = useState(false);
  const [isIdleReady, setIsIdleReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let idleId: number | null = null;
    const fallbackTimer = window.setTimeout(() => setIsIdleReady(true), 900);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => setIsIdleReady(true), {
        timeout: 1400,
      });
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const largeScreenQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedDataQuery = window.matchMedia("(prefers-reduced-data: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const connection =
      typeof navigator !== "undefined" && "connection" in navigator
        ? (navigator as Navigator & {
            connection?: { saveData?: boolean; effectiveType?: string; downlink?: number };
          }).connection
        : undefined;

    const isSlowConnection = () => {
      if (!connection) return false;
      if (connection.saveData) return true;
      if (connection.effectiveType && ["slow-2g", "2g", "3g"].includes(connection.effectiveType)) {
        return true;
      }
      if (typeof connection.downlink === "number" && connection.downlink < 1.6) {
        return true;
      }
      return false;
    };

    const update = () => {
      setShouldRenderVideos(
        isIdleReady &&
          largeScreenQuery.matches &&
          hoverQuery.matches &&
          pointerQuery.matches &&
          !reducedMotionQuery.matches &&
          !reducedDataQuery.matches &&
          !isSlowConnection()
      );
    };

    update();

    const addListener = (query: MediaQueryList, handler: () => void) => {
      if ("addEventListener" in query) {
        query.addEventListener("change", handler);
      } else {
        query.addListener(handler);
      }
    };

    const removeListener = (query: MediaQueryList, handler: () => void) => {
      if ("removeEventListener" in query) {
        query.removeEventListener("change", handler);
      } else {
        query.removeListener(handler);
      }
    };

    addListener(largeScreenQuery, update);
    addListener(reducedMotionQuery, update);
    addListener(reducedDataQuery, update);
    addListener(hoverQuery, update);
    addListener(pointerQuery, update);
    if (connection && "addEventListener" in connection) {
      connection.addEventListener("change", update);
    }

    return () => {
      removeListener(largeScreenQuery, update);
      removeListener(reducedMotionQuery, update);
      removeListener(reducedDataQuery, update);
      removeListener(hoverQuery, update);
      removeListener(pointerQuery, update);
      if (connection && "removeEventListener" in connection) {
        connection.removeEventListener("change", update);
      }
    };
  }, [isIdleReady]);

  return <section id="hero" className="relative min-h-screen pt-5 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] hidden md:block" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] hidden md:block" />
      </div>

      <div className="container mx-auto px-6 relative z-10 h-[calc(100vh-6rem)]">
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 h-full items-center">
          {/* Left Content - Centered Text */}
          <div className="flex flex-col items-center justify-center text-center pt-20 space-y-8 max-w-2xl mx-auto lg:mx-0 lg:mr-auto">
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
                VOTRE VISIBILITÉ,
                <br />
                <span className="text-gradient">NOTRE DOMAINE D'EXPERTISE</span>
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
              À <strong>Caen</strong>, nous proposons aux professionnels des solutions complètes de création 
              de <strong>contenu vidéo</strong> et de stratégies digitales sur mesure. Mais aussi des systèmes <strong>d'automatisation 
              marketing</strong> innovants pour maximiser votre réactivité en ligne et attirer plus de clients.
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
              <Button 
                size="lg" 
                className="border-foreground text-foreground bg-gradient-primary hover:bg-foreground px-8"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                PARLER DE MES BESOINS
              </Button>
              <a href="tel:+33771017271"><Button size="lg" variant="outline" className="border-border hover:bg-secondary px-8">
                APPELER-NOUS
              </Button></a>
            </motion.div>
          </div>

          {/* Right Content - Vertical Scrolling Videos */}
          {shouldRenderVideos ? (
          <div className="items-center h-full hidden lg:flex">

            {/* Videos Container */}
            <div 
              className="relative h-[85vh] flex gap-5 overflow-hidden"
              style={{
                transform: "perspective(800px) rotateX(15deg)",
                transformStyle: "preserve-3d",
                transformOrigin: "center bottom"
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
              <div className="w-44 h-full overflow-hidden rounded-2xl">
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
                      className="w-44 aspect-[9/16] rounded-2xl object-cover flex-shrink-0 opacity-70"
                    />
                  ))}
                </motion.div>
              </div>

              {/* Second Video Column - Offset */}
              <div className="w-44 h-[calc(100%-5rem)] overflow-hidden rounded-2xl mt-10 mb-10">
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
                      className="w-44 aspect-[9/16] rounded-2xl object-cover flex-shrink-0 opacity-70"
                    />
                  ))}
                </motion.div>
              </div>

              {/* Third Video Column */}
              <div className="w-44 h-full overflow-hidden rounded-2xl">
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
                      className="w-44 aspect-[9/16] rounded-2xl object-cover flex-shrink-0 opacity-70"
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          ) : null}
        </div>
      </div>
    </section>;
};
