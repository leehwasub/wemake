import { PostCard } from "~/features/community/components/post-card";
import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-posts-page";
import { getUserPosts } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({params, request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const posts = await getUserPosts(client, {username: params.username});
  return {posts};
} 

export default function ProfilePostsPage({loaderData} : Route.ComponentProps) {

  return (
    <div className="flex flex-col gap-5">
      {loaderData.posts.map((post) => (
        <PostCard
          key={post.post_id}
          postId={post.post_id}
          avatarSrc={post.author_avatar}
          title={post.title}
          author={post.author}
          category={post.topic}
          timeAgo={post.created_at}
          expanded={true}
        />
      ))}
    </div>
  );
} 