import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import { makeSSRClient } from "~/supa-client";
import { getClaimedIdeas } from "~/features/ideas/queries";
import { getLoggedInUserId } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard Ideas Page' },
  ];
};

export const loader = async ({request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getClaimedIdeas(client, {userId});
  return {ideas};
}

export default function DashboardIdeasPage({loaderData} : Route.ComponentProps) {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-6">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            ideaId={idea.gpt_idea_id}
            title={idea.idea}
            viewCount={123}
            owner={true}
            />
        ))}
      </div>
    </div>
  );
} 