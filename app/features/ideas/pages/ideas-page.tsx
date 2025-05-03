import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";
import { makeSSRClient } from "~/supa-client";


export const meta : Route.MetaFunction = () => {
  return [
    {title: "IdeasGPT | wemake"},
    {name: "description", content: "Find ideas for your next project"},
  ]
}

export const loader = async ({request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const ideas = await getGptIdeas(client, {
    limit: 20,
  });
  return { ideas };
}

export default function IdeasPage({loaderData} : Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="IdeasGPT" subtitle="Find ideas for your next project"/>
      <div className="grid grid-cols-4 gap-4">
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
    </div>
  );
}
