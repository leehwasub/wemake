import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard Ideas Page' },
  ];
};

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            ideaId="ideaId"
            title="A startup that creates an AI-powered generated personl trainer, 
            delivering customized fitness recommendations and tracking of progress using a mobile app to track workout
            s and progress as well as a website to manage the business."
            viewCount={123}
            timeAgo="12 hours ago"
            likeCount={123}
            claimed={false}
            />
        ))}
      </div>
    </div>
  );
} 