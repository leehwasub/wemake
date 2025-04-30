/*
import db from "~/db"
import { posts, postsUpvotes, topics } from "./schema";
import { count, desc, eq } from "drizzle-orm";
import { profiles } from "../users/schema";

export const getTopics = async() => {
  const allTopics = await db.select({
    name: topics.name,
    slug: topics.slug,
  }).from(topics);
  return allTopics;
}

export const getPosts = async() => {
  const allPosts = await db.select({
    id: posts.post_id,
    title: posts.title,
    createdAt: posts.created_at,
    topics: topics.name,
    author: profiles.name,
    authorAvatarUrl: profiles.avatar,
    username: profiles.username,
    upvotes: count(postsUpvotes.post_id),
  }).from(posts)
  .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
  .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
  .leftJoin(postsUpvotes, eq(posts.post_id, postsUpvotes.post_id))
  .groupBy(posts.post_id, profiles.name, profiles.avatar, profiles.username, topics.name)
  .orderBy(desc(posts.post_id));
  return allPosts;
}
*/

import { DateTime } from "luxon";
import client from "~/supa-client"

export const getTopics = async() => {
  const { data, error } = await client.from("topics").select("name, slug");
  console.log(data, error);
  return data;
}

export const getPosts = async({limit, sorting, period, keyword, topic} : {limit: number, sorting: "newest" | "popular", period?: "all" | "today" | "week" | "month" | "year", keyword?: string, topic?: string}) => {
  const baseQuery = client.from("community_post_list_view").select("*").limit(limit);
  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else if (sorting === "popular") {
    if (period === "all") {
      baseQuery.order("upvotes", { ascending: false });
    } else {
      const today = DateTime.now();
      if (period === "today") {
        baseQuery.gte("created_at", today.startOf("day").toISO());
      } else if (period === "week") {
        baseQuery.gte("created_at", today.startOf("week").toISO());
      } else if (period === "month") {
        baseQuery.gte("created_at", today.startOf("month").toISO());
      } else if (period === "year") {
        baseQuery.gte("created_at", today.startOf("year").toISO());
      }
      baseQuery.order("upvotes", { ascending: false });
    }
  }

  if (keyword) {
    baseQuery.like("title", `%${keyword}%`);
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }

  const { data, error } = await baseQuery;
  console.log(data, error);
  console.log(period);
  return data;
}


