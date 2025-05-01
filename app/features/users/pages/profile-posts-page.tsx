import { PostCard } from "~/features/community/components/post-card";
import { ProductCard } from "~/features/products/components/product-card";

export default function ProfilePostsPage() {

  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <PostCard
          key={index}
          postId={index}
          avatarSrc="https://github.com/shadcn.png"
          title="What is the best productivity tool?"
          author="Nico On"
          category="Productivity"
          timeAgo="12 hours ago"
          expanded={true}
        />
      ))}
    </div>
  );
} 