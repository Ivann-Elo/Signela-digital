import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoBlanc from "@/assets/logo-blanc.png";

const navItems = [
  { label: "Accueil", href: "#hero", active: true },
  { label: "Prestations", href: "#prestations", active: false },
  { label: "Comment ca marche ?", href: "#process", active: false },
  { label: "Contact", href: "#contact", active: false },
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Accueil");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
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
    setIsOpen(false);

    if (location.pathname !== "/") {
      setPendingScroll(item.href);
      navigate("/", { replace: false });
      return;
    }

    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
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
              {/* <ExternalLink className="w-3 h-3" /> */}
            </a>
            <div className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
              <span className="text-primary text-xs font-medium">Bientôt disponible</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className={`transition-colors py-2 ${
                    activeItem === item.label
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};
