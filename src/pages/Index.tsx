import { lazy, Suspense, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

const Prestations = lazy(() =>
  import("@/components/Prestations").then((module) => ({ default: module.Prestations }))
);
const Process = lazy(() =>
  import("@/components/Process").then((module) => ({ default: module.Process }))
);
const Contact = lazy(() =>
  import("@/components/Contact").then((module) => ({ default: module.Contact }))
);
const Footer = lazy(() =>
  import("@/components/Footer").then((module) => ({ default: module.Footer }))
);

const Index = () => {
  const [showBelowFold, setShowBelowFold] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedDataQuery = window.matchMedia("(prefers-reduced-data: reduce)");
    const smallScreenQuery = window.matchMedia("(max-width: 1023px)");
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

    if (!smallScreenQuery.matches && !reducedDataQuery.matches && !isSlowConnection()) {
      setShowBelowFold(true);
      return;
    }

    let idleId: number | null = null;
    const reveal = () => setShowBelowFold(true);
    const fallbackTimer = window.setTimeout(reveal, 1200);
    const onFirstScroll = () => {
      reveal();
      window.removeEventListener("scroll", onFirstScroll);
    };

    window.addEventListener("scroll", onFirstScroll, { passive: true });

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(reveal, { timeout: 2000 });
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("scroll", onFirstScroll);
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        {showBelowFold ? (
          <>
            <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
              <Prestations />
            </Suspense>
            <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
              <Process />
            </Suspense>
            <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
              <Contact />
            </Suspense>
          </>
        ) : (
          <>
            <div className="min-h-[60vh]" aria-hidden="true" />
            <div className="min-h-[60vh]" aria-hidden="true" />
            <div className="min-h-[60vh]" aria-hidden="true" />
          </>
        )}
      </main>
      {showBelowFold ? (
        <Suspense fallback={<div className="min-h-[20vh]" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      ) : (
        <div className="min-h-[20vh]" aria-hidden="true" />
      )}
    </div>
  );
};

export default Index;
