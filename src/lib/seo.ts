export const siteUrl = "https://signela-digital.fr";
export const siteName = "Signela Digital";
export const defaultTitle = "Signela Digital | Agence marketing vidéo à Caen";
export const defaultDescription =
  "Agence de marketing vidéo et communication à Caen (Normandie). Production vidéo, media buying, contenu IA & plan réel, identité de marque et automatisation.";
export const defaultOgImage = `${siteUrl}/og-default.svg`;
export const defaultLocale = "fr_FR";
export const defaultLanguage = "fr-FR";

export const buildTitle = (title?: string) => {
  if (!title) return defaultTitle;
  if (title.includes(siteName)) return title;
  return `${title} | ${siteName}`;
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  url: siteUrl,
  areaServed: "Caen, Normandie",
  address: {
    "@type": "PostalAddress",
    streetAddress: "31P av des carrières",
    addressLocality: "Caen",
    addressRegion: "Normandie",
    addressCountry: "FR",
  },
  telephone: "+33771017271",
  email: "marketing@signela.fr",
  serviceType: [
    "Marketing vidéo",
    "Production vidéo",
    "Media buying",
    "Contenu IA & plan réel",
    "Identité de marque",
    "Web & automatisation",
  ],
  image: defaultOgImage,
};
