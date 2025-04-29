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

import client from "~/supa-client"

export const getTopics = async() => {
  const { data, error } = await client.from("topics").select("name, slug");
  console.log(data, error);
  return data;
}

export const getPosts = async() => {
  const { data, error } = await client.from("posts").select(`
    post_id, 
    title, 
    created_at,
    topic:topics!inner (
      name
    ),
    author:profiles!posts_profile_id_profiles_profile_id_fk!inner (
      name,
      avatar,
      username
    ),
    upvotes:posts_upvotes(
      count
    )
  `);
  console.log(error);
  if (error) throw new Error(error.message);
  return data;
}


