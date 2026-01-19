import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Mapping des prestations formulaire -> Notion
const prestationMapping: Record<string, string> = {
  video: "Vidéos d'entreprise",
  ads: "Campagne Ads",
  identity: "Branding / Identité visuelle",
  social: "Création de contenu",
  web: "Site web",
  other: "Autre",
};

// Mapping des budgets formulaire -> Notion
const budgetMapping: Record<string, string> = {
  "Moins de 1 000€": "< 500 €",
  "1 000€ - 3 000€": "500 - 1000 €",
  "3 000€ - 5 000€": "1000 - 2000 €",
  "5 000€ - 10 000€": "> 2000 €",
  "Plus de 10 000€": "> 2000 €",
};

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  prestation?: string;
  budget?: string;
  message?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  website?: string;
  googleBusiness?: string;
  type: "Contact" | "Demande devis";
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const NOTION_API_KEY = Deno.env.get("NOTION_API_KEY");
    const NOTION_DATABASE_ID = Deno.env.get("NOTION_DATABASE_ID");

    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
      throw new Error("Missing Notion configuration");
    }

    const data: LeadData = await req.json();

    // Build Notion properties
    const properties: Record<string, unknown> = {
      Nom: {
        title: [{ text: { content: data.name } }],
      },
      Email: {
        email: data.email,
      },
      Type: {
        select: { name: data.type },
      },
      Statut: {
        status: { name: "Nouveau" },
      },
      "Date création": {
        date: { start: new Date().toISOString().split("T")[0] },
      },
    };

    // Optional fields
    if (data.phone) {
      properties["Téléphone"] = { phone_number: data.phone };
    }

    if (data.prestation) {
      const notionPrestation = prestationMapping[data.prestation] || data.prestation;
      properties["Prestation"] = { select: { name: notionPrestation } };
    }

    if (data.budget) {
      const notionBudget = budgetMapping[data.budget] || data.budget;
      properties["Budget"] = { select: { name: notionBudget } };
    }

    if (data.message) {
      properties["Message"] = {
        rich_text: [{ text: { content: data.message } }],
      };
    }

    if (data.instagram) {
      properties["Instagram"] = { url: data.instagram.startsWith("http") ? data.instagram : `https://instagram.com/${data.instagram.replace("@", "")}` };
    }

    if (data.tiktok) {
      properties["TikTok"] = { url: data.tiktok.startsWith("http") ? data.tiktok : `https://tiktok.com/@${data.tiktok.replace("@", "")}` };
    }

    if (data.linkedin) {
      properties["LinkedIn"] = { url: data.linkedin.startsWith("http") ? data.linkedin : `https://linkedin.com/in/${data.linkedin}` };
    }

    if (data.website) {
      properties["Site web"] = { url: data.website.startsWith("http") ? data.website : `https://${data.website}` };
    }

    if (data.googleBusiness) {
      // Google Business expects a URL - construct a Google Maps search URL
      const searchQuery = encodeURIComponent(data.googleBusiness);
      properties["Google Business"] = { url: `https://www.google.com/maps/search/${searchQuery}` };
    }

    // Create page in Notion
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", errorData);
      throw new Error(`Notion API error: ${errorData.message || response.statusText}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({ success: true, pageId: result.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
