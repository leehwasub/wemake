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

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
};

//run on server side before HomePage is rendered
export const loader = () => {
  return {
    
  };
};

export default function HomePage() {
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
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            productId={`productId-${index}`}
            productName={`Product Name ${index}`}
            productDescription={`Product Description ${index}`}
            messageCount={12}
            viewCount={12}
            upvoteCount={120}
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
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            postId={`postId-${index}`}
            avatarSrc="https://github.com/shadcn.png"
            title="What is the best productivity tool?"
            author="Nico On"
            category="Productivity"
            timeAgo="12 hours ago"
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
        {Array.from({ length: 10 }).map((_, index) => (
        <IdeaCard
          ideaId="ideaId"
          title="A startup that creates an AI-powered generated personl trainer, 
          delivering customized fitness recommendations and tracking of progress using a mobile app to track workout
          s and progress as well as a website to manage the business."
          viewCount={123}
          timeAgo="12 hours ago"
          likeCount={123}
          claimed={index % 2 === 0}
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
