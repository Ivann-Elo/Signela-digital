import { useEffect } from "react";
import {
  buildTitle,
  defaultDescription,
  defaultLanguage,
  defaultLocale,
  defaultOgImage,
  siteName,
  siteUrl,
} from "@/lib/seo";

type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: Record<string, unknown>;
};

const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
  if (!content) return;
  let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setLinkTag = (rel: string, href: string) => {
  if (!href) return;
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

export const Seo = ({
  title,
  description,
  canonical,
  robots = "index,follow",
  ogType = "website",
  ogImage,
  twitterCard = "summary_large_image",
  jsonLd,
}: SeoProps) => {
  useEffect(() => {
    const resolvedTitle = buildTitle(title);
    const resolvedDescription = description || defaultDescription;
    const resolvedCanonical = canonical || siteUrl;
    const resolvedImage = ogImage || defaultOgImage;

    document.title = resolvedTitle;
    document.documentElement.lang = defaultLanguage;

    setMetaTag("name", "description", resolvedDescription);
    setMetaTag("name", "robots", robots);
    setMetaTag("property", "og:title", resolvedTitle);
    setMetaTag("property", "og:description", resolvedDescription);
    setMetaTag("property", "og:url", resolvedCanonical);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", siteName);
    setMetaTag("property", "og:locale", defaultLocale);
    setMetaTag("property", "og:image", resolvedImage);
    setMetaTag("name", "twitter:card", twitterCard);
    setMetaTag("name", "twitter:title", resolvedTitle);
    setMetaTag("name", "twitter:description", resolvedDescription);
    setMetaTag("name", "twitter:image", resolvedImage);
    setLinkTag("canonical", resolvedCanonical);

    const existingJsonLd = document.querySelector<HTMLScriptElement>("#seo-jsonld");
    if (jsonLd) {
      const script = existingJsonLd || document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      if (!existingJsonLd) {
        document.head.appendChild(script);
      }
    } else if (existingJsonLd) {
      existingJsonLd.remove();
    }
  }, [canonical, description, jsonLd, ogImage, ogType, robots, title, twitterCard]);

  return null;
};
