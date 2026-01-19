import { supabase } from "@/integrations/supabase/client";

export interface LeadData {
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

export async function createLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: result, error } = await supabase.functions.invoke("create-notion-lead", {
      body: data,
    });

    if (error) {
      console.error("Error calling edge function:", error);
      return { success: false, error: error.message };
    }

    if (!result.success) {
      return { success: false, error: result.error || "Unknown error" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating lead:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
