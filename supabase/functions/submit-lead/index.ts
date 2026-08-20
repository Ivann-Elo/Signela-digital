// @deno-types="https://deno.land/std@0.168.0/http/server.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Body shape sent by <LeadForm /> (src/components/LeadForm.tsx). Kept loose
// (all optional) because it comes straight from an untrusted client request.
interface LeadRequestBody {
  nom?: unknown;
  email?: unknown;
  telephone?: unknown;
  message?: unknown;
  service?: unknown;
  source?: unknown;
  consentement?: unknown;
  hp?: unknown;
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const asTrimmedString = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  let data: LeadRequestBody;
  try {
    data = await req.json();
  } catch (error) {
    console.error("submit-lead: invalid JSON body:", error);
    return jsonResponse({ success: false, error: "Invalid request body" }, 500);
  }

  // Honeypot: real users never fill this hidden field. Bots that blindly
  // fill every input do. Pretend everything went fine and drop it silently
  // so the bot doesn't learn to look for a different signal.
  if (asTrimmedString(data.hp).length > 0) {
    console.log("submit-lead: honeypot triggered, discarding submission silently.");
    return jsonResponse({ success: true });
  }

  const nom = asTrimmedString(data.nom);
  const email = asTrimmedString(data.email);
  const consentement = data.consentement === true;

  if (!nom || !email || !EMAIL_REGEX.test(email) || !consentement) {
    return jsonResponse(
      {
        success: false,
        error: "Champs obligatoires manquants ou invalides (nom, email, consentement).",
      },
      400,
    );
  }

  const MAKE_WEBHOOK_URL = Deno.env.get("MAKE_WEBHOOK_URL");
  if (!MAKE_WEBHOOK_URL) {
    console.error("submit-lead: missing MAKE_WEBHOOK_URL configuration");
    return jsonResponse({ success: false, error: "Server misconfiguration" }, 500);
  }

  const relayPayload = {
    nom,
    email,
    telephone: asTrimmedString(data.telephone) || undefined,
    message: asTrimmedString(data.message) || undefined,
    service: asTrimmedString(data.service) || undefined,
    source: asTrimmedString(data.source) || undefined,
    recu_le: new Date().toISOString(),
  };

  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(relayPayload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("submit-lead: Make webhook responded with an error:", response.status, errorText);
      return jsonResponse({ success: false, error: "Le relais vers Make a échoué." }, 502);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("submit-lead: error relaying lead to Make:", error);
    return jsonResponse({ success: false, error: "Le relais vers Make a échoué." }, 502);
  }
});
