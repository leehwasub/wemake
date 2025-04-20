import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "IdeasGPT | wemake"},
    {name: "description", content: "Find ideas for your next project"},
  ]
}

export default function IdeaPage() {
  return (
    <div className="space-y-20">
      <Hero title="Idead 123" subtitle="Find ideas for your next project"/>
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">A startup that creates an AI-powered generated personl trainer, delivering customized fitness recommendations 
          and tracking of progress using a mobile app to track workout s and progress as well as a website to manage the business.</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-2">
            <EyeIcon className="w-4 h-4" />
            <span>20</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>10 days ago</span>
          <DotIcon className="w-4 h-4" />
          <Button variant="outline">
            <HeartIcon className="w-4 h-4" />
            <span>10</span>
          </Button>
        </div>
        <Button size="lg">Claim Idea now &rarr;</Button>
      </div>
    </div>
  );
} 