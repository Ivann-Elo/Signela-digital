import { supabase } from "@/integrations/supabase/client";
import type { LeadPayload } from "@/types/lead";

export interface SubmitLeadResult {
  success: boolean;
  error?: string;
}

/**
 * Single entry point for every lead form on the site. Relays to the
 * `submit-lead` Supabase Edge Function, which forwards to the Make webhook
 * server-side (the webhook URL is never exposed to the client).
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const { data, error } = await supabase.functions.invoke("submit-lead", {
      body: payload,
    });

    if (error) {
      console.error("Error calling submit-lead function:", error);
      return { success: false, error: error.message };
    }

    if (!data?.success) {
      return { success: false, error: data?.error ?? "Unknown error" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
