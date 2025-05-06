import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const updateUser = async (client: SupabaseClient<Database>, {id, name, role, headline, bio}: {id: string, name: string, role: "developer" | "designer" | "marketer" | "founder" | "product-manager", headline: string, bio: string}) => {
  const {error} = await client.from("profiles").update({name, role, headline, bio}).eq("profile_id", id);
  if (error) {
    throw error;
  }
}

export const updateUserAvatar = async (client: SupabaseClient<Database>, {id, avatar}: {id: string, avatar: string}) => {
  const {error} = await client.from("profiles").update({avatar}).eq("profile_id", id);
  if (error) {
    throw error;
  }
}
