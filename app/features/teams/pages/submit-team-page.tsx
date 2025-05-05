import React from 'react';
import type { Route } from './+types/submit-team-page';
import { Hero } from '~/common/components/hero';
import { Form, redirect } from 'react-router';
import InputPair from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';
import SelectPair from '~/common/components/select-pair';
import { PRODUCT_STAGES } from '../constants';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId } from '~/features/users/queries';
import { z } from 'zod';
import { createTeam } from '../mutations';
export const meta: Route.MetaFunction = () => {
  return [
    { title: `Submit Team | wemake` }
  ];
};

export const loader = async ({request}: Route.LoaderArgs) => {
  const {client} = makeSSRClient(request);
  await getLoggedInUserId(client);
}

export const formSchema = z.object({
  name: z.string().min(1).max(20),
  stage: z.enum(PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]]),
  size: z.coerce.number().min(1).max(1000),
  equity: z.coerce.number().min(1).max(100),
  roles: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
});

export const action = async ({request}: Route.ActionArgs) => {
  const {client} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {fieldErrors: error.flatten().fieldErrors};
  }
  const {team_id} = await createTeam(client, data, userId);
  return redirect(`/teams/${team_id}`);
}

export default function SubmitTeamPage({actionData}: Route.ComponentProps) {
  return (
    <div>
    <Hero 
    title="Create a Team" 
    subtitle="Create a team to start hiring" 
    />
    <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto" method="post">
      <div className="grid grid-cols-3 gap-10">
        <InputPair 
          label="What is the name of your product?" 
          name="name" 
          description="(20 characters max)"
          placeholder="i.e. wemake"
          maxLength={20}
          type="text"
          id="name"
          required
        />
        {actionData?.fieldErrors?.name && <p className="text-red-500">{actionData.fieldErrors.name}</p>}

        <SelectPair 
          name="stage" 
          label="What is the stage of your product?" 
          description="Select the stage of your product" 
          placeholder="Select a stage" 
          options={PRODUCT_STAGES} 
          required
        />
        {actionData?.fieldErrors?.stage && <p className="text-red-500">{actionData.fieldErrors.stage}</p>}

        <InputPair 
          label="What is the size of your team?" 
          name="size" 
          description="(1-1000)"
          max={1000}
          min={1}
          type="number"
          id="size"
          required
        />
        {actionData?.fieldErrors?.size && <p className="text-red-500">{actionData.fieldErrors.size}</p>}

        <InputPair 
          label="How much equity are you willing to give?" 
          name="equity" 
          description="(1-100)"
          max={100}
          min={1}
          type="number"
          id="equity"
          required
        />
        {actionData?.fieldErrors?.equity && <p className="text-red-500">{actionData.fieldErrors.equity}</p>}

        <InputPair 
          label="what roles are you looking for?" 
          placeholder='i.e. React Developer, Backend Developer, etc'
          name="roles" 
          description="(comma separated)"
          maxLength={100}
          type="text"
          id="roles"
          required
        />
        {actionData?.fieldErrors?.roles && <p className="text-red-500">{actionData.fieldErrors.roles}</p>}

        <InputPair 
          label="what is the description of your product?" 
          placeholder='i.e. We are looking for a React Developer who is proficient in TypeScript and React'
          name="description" 
          description="(200 characters max)"
          maxLength={200}
          type="text"
          id="description"
          required
          textArea
        />
        {actionData?.fieldErrors?.description && <p className="text-red-500">{actionData.fieldErrors.description}</p>}
      </div>
      <Button type="submit" className="w-full max-w-sm" size="lg">Create Team</Button>
    </Form>
  </div>
  );
} 