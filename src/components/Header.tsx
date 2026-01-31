import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Home, Phone, Workflow } from "lucide-react";
import logoBlanc from "@/assets/logo-blanc.png";

const navItems = [
  { label: "Accueil", shortLabel: "Accueil", href: "#hero", active: true, icon: Home },
  { label: "Prestations", shortLabel: "Prestations", href: "#prestations", active: false, icon: Briefcase },
  { label: "Comment ca marche ?", shortLabel: "Etapes", href: "#process", active: false, icon: Workflow },
  { label: "Contact", shortLabel: "Contact", href: "#contact", active: false, icon: Phone },
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Accueil");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({ left: 0, width: 0 });
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileItemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Update indicator position
  useEffect(() => {
    const activeRef = itemRefs.current.get(activeItem);
    if (activeRef && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeRef.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }, [activeItem]);

  useEffect(() => {
    const activeRef = mobileItemRefs.current.get(activeItem);
    if (activeRef && mobileNavRef.current) {
      const navRect = mobileNavRef.current.getBoundingClientRect();
      const itemRect = activeRef.getBoundingClientRect();
      setMobileIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }, [activeItem]);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        label: item.label,
        element: document.querySelector(item.href) as HTMLElement
      })).filter(section => section.element);

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveItem(section.label);
          break;
        }
      }
    };

    const scrollOptions: AddEventListenerOptions = { passive: true };
    window.addEventListener('scroll', handleScroll, scrollOptions);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll, scrollOptions);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || !pendingScroll) {
      return;
    }

    const targetSelector = pendingScroll;
    setPendingScroll(null);

    requestAnimationFrame(() => {
      document.querySelector(targetSelector)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname, pendingScroll]);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) {
      return;
    }

    requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname, location.hash]);

  const handleNavClick = (item: (typeof navItems)[number]) => {
    setActiveItem(item.label);

    if (location.pathname !== "/") {
      setPendingScroll(item.href);
      navigate("/", { replace: false });
      return;
    }

    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 py-4 bg-black/85 backdrop-blur-md md:bg-transparent"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center md:justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(navItems[0]);
              }}
              className="flex items-center"
            >
              <img src={logoBlanc} alt="Signela Digital" className="h-10 w-auto" />
            </a>

            {/* Desktop Navigation */}
            <nav 
              ref={navRef}
              className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border/50 relative"
            >
              {/* Animated indicator */}
              <motion.div
                className="absolute top-2 bottom-2 bg-gradient-primary rounded-full shadow-glow"
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  mass: 0.8,
                }}
                style={{
                  height: "calc(100% - 16px)",
                }}
              />
              
              {navItems.map((item) => (
                <a
                  key={item.label}
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.label, el);
                  }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className="relative px-4 py-2 rounded-full text-sm font-medium z-10"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    activeItem === item.label
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Signela Print
              </a>
              <div className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                <span className="text-primary text-xs font-medium">Bientôt disponible</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Navigation principale"
      >
        <div className="mx-4 mb-2 rounded-2xl bg-card/90 backdrop-blur-md border border-border/60 shadow-card">
          <div
            ref={mobileNavRef}
            className="relative grid grid-cols-4 gap-1 px-2 py-2"
          >
            <motion.div
              className="absolute inset-y-2 bg-gradient-primary rounded-xl shadow-glow"
              initial={false}
              animate={{
                left: mobileIndicatorStyle.left,
                width: mobileIndicatorStyle.width,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
              }}
              style={{
                height: "calc(100% - 16px)",
              }}
            />
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;
              return (
                <a
                  key={item.label}
                  ref={(el) => {
                    if (el) mobileItemRefs.current.set(item.label, el);
                  }}
                  href={item.href}
                  title={item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className="relative z-10 flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs font-medium"
                >
                  <Icon className={isActive ? "h-5 w-5 text-primary-foreground" : "h-5 w-5 text-muted-foreground"} />
                  <span className={isActive ? "text-primary-foreground" : "text-muted-foreground"}>
                    {item.shortLabel ?? item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
