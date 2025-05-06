import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createProductReview = async (client: SupabaseClient<Database>, {productId, userId, review, rating}: {productId: number, userId: string, review: string, rating: number}) => {
  const {data, error} = await client.from("reviews").insert({
    product_id: productId,
    profile_id: userId,
    review,
    rating,
  });
  if (error) {
    throw error;
  }
  return data;
}

