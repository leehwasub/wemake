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

export const createProduct = async (client: SupabaseClient<Database>, {name, tagline, description, howItWorks, url, iconUrl, categoryId, userId}: {name: string, tagline: string, description: string, howItWorks: string, url: string, iconUrl: string, categoryId: number, userId: string}) => {
  const {data, error} = await client.from("products").insert({
    name,
    tagline,
    url,
    description,
    how_it_works: howItWorks,
    icon: iconUrl,
    category_id: categoryId,
    profile_id: userId,
  }).select("product_id").single();
  if (error) {
    throw error;
  }
  return data.product_id; 
}