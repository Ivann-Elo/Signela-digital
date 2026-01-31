export type ConsentCategory = "analytics" | "marketing";

export type ConsentState = {
  version: number;
  updatedAt: string;
  categories: Record<ConsentCategory, boolean>;
};

export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180;
const CONSENT_STORAGE_KEY = "sd_cookie_consent";
const CONSENT_COOKIE_KEY = "sd_cookie_consent";
const CONSENT_EVENT = "consent:updated";
const CONSENT_OPEN_EVENT = "consent:open";

const toTimestamp = (value: string) => {
  const ts = Date.parse(value);
  return Number.isNaN(ts) ? 0 : ts;
};

const isExpired = (updatedAt: string) => {
  const now = Date.now();
  const updated = toTimestamp(updatedAt);
  if (!updated) return true;
  const maxAgeMs = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  return now - updated > maxAgeMs;
};

const encodeConsent = (state: ConsentState) =>
  `v=${state.version}&ts=${encodeURIComponent(state.updatedAt)}&a=${state.categories.analytics ? 1 : 0}&m=${state.categories.marketing ? 1 : 0}`;

const decodeConsent = (raw: string | null): ConsentState | null => {
  if (!raw) return null;
  const parts = raw.split("&").reduce<Record<string, string>>((acc, item) => {
    const [key, value] = item.split("=");
    if (key && value) acc[key] = value;
    return acc;
  }, {});
  const version = Number(parts.v || "0");
  if (!version || version !== CONSENT_VERSION) return null;
  const updatedAt = decodeURIComponent(parts.ts || "");
  if (!updatedAt || isExpired(updatedAt)) return null;
  return {
    version,
    updatedAt,
    categories: {
      analytics: parts.a === "1",
      marketing: parts.m === "1",
    },
  };
};

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

const setCookie = (name: string, value: string, maxAgeDays: number) => {
  if (typeof document === "undefined") return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
};

export const getConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as ConsentState;
      if (parsed.version !== CONSENT_VERSION || !parsed.updatedAt || isExpired(parsed.updatedAt)) {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }
  return decodeConsent(getCookie(CONSENT_COOKIE_KEY));
};

export const saveConsent = (categories: ConsentState["categories"]) => {
  if (typeof window === "undefined") return null;
  const state: ConsentState = {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    categories,
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  setCookie(CONSENT_COOKIE_KEY, encodeConsent(state), CONSENT_MAX_AGE_DAYS);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  return state;
};

export const onConsentChange = (handler: (state: ConsentState) => void) => {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<ConsentState>).detail;
    if (detail) handler(detail);
  };
  window.addEventListener(CONSENT_EVENT, listener);
  return () => window.removeEventListener(CONSENT_EVENT, listener);
};

export const openCookiePreferences = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
};

export const onOpenPreferences = (handler: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_OPEN_EVENT, handler);
  return () => window.removeEventListener(CONSENT_OPEN_EVENT, handler);
};
