import { PostCard } from "~/features/community/components/post-card";
import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-posts-page";
import { getUserPosts } from "../queries";

export const loader = async ({params} : Route.LoaderArgs) => {
  const posts = await getUserPosts(params.username);
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