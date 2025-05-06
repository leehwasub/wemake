import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { Form, redirect } from "react-router";
import { claimIdea } from "../mutations";

export const meta : Route.MetaFunction = ({data : { idea: {gpt_idea_id, idea}}} : Route.MetaArgs) => {
  return [
    {title: `IdeasGPT | #${gpt_idea_id} - ${idea}`},
    {name: "description", content: "Find ideas for your next project"},
  ]
}

export const loader = async ({params, request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const idea = await getGptIdea(client, {ideaId: Number(params.ideaId)});
  if (idea.is_claimed) {
    throw redirect(`/ideas`);
  }
  return { idea };
}

export const action = async ({request, params} : Route.ActionArgs) => {
  const {client, headers} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const idea = await getGptIdea(client, {ideaId: Number(params.ideaId)});
  if (idea.is_claimed) {
    return { ok : false}
  }
  await claimIdea(client, {ideaId: Number(params.ideaId), userId});
  return redirect(`/my/dashboard/ideas`);
}

export default function IdeaPage({loaderData} : Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} subtitle="Find ideas for your next project"/>
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">{loaderData.idea.idea}</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-2">
            <EyeIcon className="w-4 h-4" />
            <span>{loaderData.idea.views}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>{DateTime.fromISO(loaderData.idea.created_at).toRelative()}</span>
          <DotIcon className="w-4 h-4" />
          <Button variant="outline">
            <HeartIcon className="w-4 h-4" />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
        {!loaderData.idea.is_claimed && 
          <Form method="post">
            <Button size="lg">
              Claim Idea now &rarr;
            </Button>
          </Form>
        }
      </div>
    </div>
  );
} 