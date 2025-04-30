import { Button } from "app/common/components/ui/button";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { DotIcon, EyeIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import { ProductCard } from "app/features/products/components/product-card";
import type { MetaFunction } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { PostCard } from "app/features/community/components/post-card";
import { IdeaCard } from "app/features/ideas/components/idea-card";
import { Badge } from "../components/ui/badge";
import { JobCard } from "app/features/jobs/components/job-card";
import { TeamCard } from "app/features/teams/components/team-card";
import type { Route } from "./+types/home-page";
import { DateTime } from "luxon";
import { getProductsByDataRange } from "~/features/products/queries";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
};

export const loader = async () => {
  const products = await getProductsByDataRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });
  const posts = await getPosts({  
    limit: 7,
    sorting: "newest",
  });
  const ideas = await getGptIdeas({
    limit: 7,
  });
  return { products, posts, ideas };
};

export default function HomePage({loaderData}: Route.ComponentProps) {
  return (
    <div className="px-20 space-y-40">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Product
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            productId={product.product_id.toString()}
            productName={product.name}
            productDescription={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            upvotesCount={product.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest Discussions made by our community today.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all Discussions &rarr;</Link>
          </Button>
        </div>
        {loaderData.posts?.map((post) => (
          <PostCard
            key={post.post_id}
            postId={post.post_id}
            avatarSrc={post.author_avatar}
            title={post.title}
            author={post.author}
            category={post.topic}
            timeAgo={post.created_at}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-xl font-light text-foreground">
            Find ideas for your next project.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {loaderData.ideas?.map((idea) => (
        <IdeaCard
          ideaId={idea.gpt_idea_id}
          title={idea.idea}
          viewCount={idea.views}
          timeAgo={idea.created_at}
          likeCount={idea.likes}
          claimed={idea.is_claimed}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            Find your dream job.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <JobCard
            key={index}
            jobId="jobId"
            companyLogo="https://github.com/facebook.png"
            companyName="Tesla"
            timeAgo="12 hours ago"
            jobTitle="Full Stack Engineer"
            salaryRange="$100,000 - $120,000"
            type="Full-time" 
            location="Remote"
            compnayHq="San Francisco, CA"
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a team mate
          </h2>
          <p className="text-xl font-light text-foreground">
            Join a team looking for a new member.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore all teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <TeamCard
            key={index}
            teamId="teamId"
            avatarSrc="https://github.com/inthetiger.png"
            username="nico"
            roles={["React Developer", "Backend Developer", "Product Manager"]}
            projectDescription="a new social media platform"
          />
        ))}
      </div>
    </div>
  );
}
