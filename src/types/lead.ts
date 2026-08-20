// Shared shapes for the unified lead-capture flow (LeadForm -> submit-lead Edge Function -> Make webhook).

export type ServiceOption = "video" | "publicite" | "site-web" | "identite" | "autre";

export const SERVICE_OPTIONS: { value: ServiceOption; label: string }[] = [
  { value: "video", label: "Vidéo" },
  { value: "publicite", label: "Publicité" },
  { value: "site-web", label: "Site web" },
  { value: "identite", label: "Identité" },
  { value: "autre", label: "Autre" },
];

export interface LeadPayload {
  nom: string;
  email: string;
  telephone?: string;
  message?: string;
  service: ServiceOption;
  source: string;
  consentement: boolean;
  /** Honeypot value — the hidden `company` field. Non-empty means a bot filled it in. */
  hp: string;
}
