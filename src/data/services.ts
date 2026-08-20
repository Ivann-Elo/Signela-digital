import {
  Video,
  Target,
  Palette,
  Share2,
  Globe,
  Camera,
  TabletSmartphone,
  FilePen,
  Euro,
  Sparkles,
  Zap,
  Wand2,
  MessageCircle,
  Search,
  Rocket,
  TrendingUp,
  Lightbulb,
  Eye,
  Send,
  CheckCircle2,
  Package,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export interface ServiceProcessStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  label: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  title: string;
  description: string;
  features: { icon: LucideIcon; label: string }[];
  processSteps: ServiceProcessStep[];
}

export const services: Service[] = [
  {
    id: "video",
    label: "Production vidéo",
    icon: Video,
    stat: "150+",
    statLabel: "VIDÉOS RÉALISÉES",
    title: "CAPTER L'ATTENTION À TRAVERS LE CONTENU VIDÉO",
    description:
      "La vidéo marketing est aujourd’hui le levier le plus puissant pour capter l’attention et générer de la conversion. De l’écriture du script au montage final, en passant par le tournage et le motion design, nous maîtrisons toute la chaîne de production pour livrer des vidéos pensées pour convaincre, engager et convertir. Un contenu qui performe sur toutes les plateformes et touche toutes les audiences.",
    features: [
      { icon: Camera, label: "Tournage professionnel (demi-journée à journée complète)." },
      { icon: FilePen, label: "Script & storyboard pensés pour la performance." },
      { icon: Wand2, label: "Montage, motion design & sous-titres." },
    ],
    processSteps: [
      {
        number: "1",
        icon: MessageCircle,
        title: "BRIEF & SCRIPT",
        description: "On définit ensemble le message, le ton et le script pensé pour convertir.",
      },
      {
        number: "2",
        icon: Camera,
        title: "TOURNAGE",
        description: "Séance de tournage professionnelle, sur votre site ou en studio.",
      },
      {
        number: "3",
        icon: Wand2,
        title: "MONTAGE & MOTION DESIGN",
        description: "Montage, habillage graphique et sous-titres pour un rendu impactant.",
      },
      {
        number: "4",
        icon: Send,
        title: "LIVRAISON & RETOURS",
        description: "Vidéos livrées prêtes à publier, avec des retouches incluses.",
      },
    ],
  },
  {
    id: "ads",
    label: "Media Buying",
    icon: Target,
    stat: "50+",
    statLabel: "CAMPAGNES LANCÉES",
    title: "DES CAMPAGNES PUBLICITAIRES QUI CONVERTISSENT",
    description:
      "Imaginez votre offre qui arrive directement dans le fil d'actualité de votre client cible, au bon moment. Nous pilotons vos campagnes Meta, Google et TikTok Ads avec un niveau de gestion adapté à votre budget publicitaire, du démarrage au sur-mesure. Ciblage précis, optimisation continue et reporting détaillé : nous maximisons votre retour sur investissement à chaque euro dépensé.",
    features: [
      { icon: Target, label: "Ciblage précis" },
      { icon: Share2, label: "Multi-plateforme" },
      { icon: Euro, label: "Retour sur investissement" },
    ],
    processSteps: [
      {
        number: "1",
        icon: Search,
        title: "AUDIT & TRACKING",
        description: "Analyse de votre présence actuelle, mise en place du Pixel/GTM et des conversions.",
      },
      {
        number: "2",
        icon: Target,
        title: "CONFIGURATION DES CAMPAGNES",
        description: "Structuration des campagnes, audiences et créas sur les plateformes choisies.",
      },
      {
        number: "3",
        icon: Rocket,
        title: "LANCEMENT & A/B TESTS",
        description: "Mise en ligne progressive avec tests d'audiences et de créas.",
      },
      {
        number: "4",
        icon: TrendingUp,
        title: "OPTIMISATION & REPORTING",
        description: "Suivi des KPIs, ajustements et reporting régulier pour maximiser le ROI.",
      },
    ],
  },
  {
    id: "content",
    label: "Contenu IA & plan réel",
    icon: Sparkles,
    stat: "1M+",
    statLabel: "IMPRESSIONS GÉNÉRÉES",
    title: "DU CONTENU QUI PERFORME, EN IA OU EN RÉEL",
    description:
      "Reels, vidéos courtes, formats signature ou visuels statiques : nous produisons votre contenu clé en main selon le mode le plus adapté à votre besoin. 100 % généré par IA pour la rapidité et le volume, tourné en plan réel pour l'authenticité, ou mixte pour combiner les deux. Chaque contenu est livré prêt à publier, aux formats de vos réseaux sociaux.",
    features: [
      { icon: Sparkles, label: "Contenu généré par IA" },
      { icon: Camera, label: "Plan réel tourné" },
      { icon: TabletSmartphone, label: "Formats prêts à publier" },
    ],
    processSteps: [
      {
        number: "1",
        icon: Lightbulb,
        title: "BRIEF CRÉATIF",
        description: "On cadre les formats, le ton et les objectifs de chaque contenu.",
      },
      {
        number: "2",
        icon: Sparkles,
        title: "PRODUCTION",
        description: "Génération IA, tournage réel ou mixte, selon le mode choisi.",
      },
      {
        number: "3",
        icon: Eye,
        title: "VALIDATION",
        description: "Vous validez ou demandez des ajustements avant livraison finale.",
      },
      {
        number: "4",
        icon: Send,
        title: "LIVRAISON",
        description: "Contenus livrés prêts à publier, aux formats de vos réseaux.",
      },
    ],
  },
  {
    id: "identity",
    label: "Identité de marque",
    icon: Palette,
    stat: "200+",
    statLabel: "IDENTITÉS VISUELLES CRÉÉES",
    title: "UNE IDENTITÉ QUI COLLE À VOTRE IMAGE",
    description:
      "Développez une identité visuelle forte, cohérente et mémorable, pensée pour traduire vos valeurs, affirmer votre positionnement et renforcer votre image de marque. Du logo à la charte graphique complète, jusqu’au rebranding total, nous adaptons l’accompagnement à votre stade de croissance et installons une reconnaissance immédiate sur l’ensemble de vos supports de communication, digitaux comme print.",
    features: [
      { icon: Palette, label: "Logo Design" },
      { icon: Globe, label: "Charte Graphique" },
      { icon: Camera, label: "Direction Artistique" },
    ],
    processSteps: [
      {
        number: "1",
        icon: MessageCircle,
        title: "DÉCOUVERTE",
        description: "Échange sur vos valeurs, votre positionnement et vos inspirations.",
      },
      {
        number: "2",
        icon: Palette,
        title: "PISTES CRÉATIVES",
        description: "Présentation de 2 à 3 directions graphiques à explorer.",
      },
      {
        number: "3",
        icon: CheckCircle2,
        title: "CHOIX & DÉCLINAISONS",
        description: "Sélection de la piste retenue et déclinaison sur l'ensemble des supports.",
      },
      {
        number: "4",
        icon: Package,
        title: "LIVRAISON DES FICHIERS",
        description: "Remise des fichiers finaux (vectoriels, charte) avec cession de droits.",
      },
    ],
  },
  {
    id: "web",
    label: "Web & Automatisation",
    icon: Globe,
    stat: "80+",
    statLabel: "SITES LIVRÉS",
    title: "VOTRE VITRINE DIGITALE, CONNECTÉE",
    description:
      "Concevez un site web moderne, performant et pensé pour la conversion, de la landing page au site vitrine complet. Nous y intégrons le tracking et connectons vos outils grâce à des scénarios d'automatisation sur-mesure (leads publicitaires vers votre CRM, Notion ou WhatsApp), pour que chaque visiteur devienne une opportunité suivie automatiquement.",
    features: [
      { icon: Globe, label: "Design UX/UI" },
      { icon: TabletSmartphone, label: "Responsive & SEO" },
      { icon: Zap, label: "Automatisation Make.com" },
    ],
    processSteps: [
      {
        number: "1",
        icon: ClipboardList,
        title: "CADRAGE",
        description: "Définition de l'arborescence, des objectifs de conversion et du contenu.",
      },
      {
        number: "2",
        icon: Globe,
        title: "DESIGN & INTÉGRATION",
        description: "Création des maquettes et intégration responsive, optimisée SEO.",
      },
      {
        number: "3",
        icon: Zap,
        title: "TRACKING & AUTOMATISATION",
        description: "Intégration du tracking et connexion de vos outils (CRM, Notion, WhatsApp).",
      },
      {
        number: "4",
        icon: Rocket,
        title: "MISE EN LIGNE & RECETTE",
        description: "Vérifications finales, mise en ligne et recette avec vous.",
      },
    ],
  },
];
