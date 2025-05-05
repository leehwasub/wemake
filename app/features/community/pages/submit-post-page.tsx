import React from 'react';
import { Form, redirect } from 'react-router';
import { Hero } from '~/common/components/hero';
import InputPair from '~/common/components/input-pair';
import SelectPair from '~/common/components/select-pair';
import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/submit-post-page';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId } from '~/features/users/queries';
import { getTopics } from '../queries';
import { z } from 'zod';
import { createPost } from '../mutations';

export const loader = async ({request}: Route.LoaderArgs) => {
  const {client} = makeSSRClient(request);
  await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return {topics};
}

const formSchema = z.object({
  title: z.string().min(1).max(40),
  category: z.string().min(1),
  content: z.string().min(1).max(1000),
});

export const action = async ({request}: Route.ActionArgs) => {
  const {client} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {fieldErrors: error.flatten().fieldErrors};
  }
  const {title, category, content} = data;
  const {post_id} = await createPost(client, {title, category, content, userId});
  return redirect(`/community/${post_id}`);
}

export default function SubmitPostPage({loaderData, actionData}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero 
        title={"Submit a Post"} 
        subtitle={"Share your thoughts and ideas with the community"} 
      />
      <Form method="post" className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair 
          label="Title" 
          name="title" 
          id="title" 
          description="(40 characters or less)"
          required
          placeholder="i.e What is the best productivity tool?" 
        />
        {actionData?.fieldErrors?.title && <p className="text-red-500">{actionData.fieldErrors.title}</p>}
        <SelectPair 
          name="category" 
          label="Category" 
          description="Select a category" 
          placeholder="Select a category" 
          options={loaderData.topics?.map((topic) => ({
            label: topic.name,
            value: topic.slug,
          })) ?? []}
        />
        {actionData?.fieldErrors?.category && <p className="text-red-500">{actionData.fieldErrors.category}</p>}
        <InputPair 
          label="Content" 
          name="content" 
          id="content" 
          description="(1000 characters or less)"
          required
          placeholder="i.e I'm looking for a tool that can help me manage my time and tasks. What are some good tools out there?"
          textArea
        />
        {actionData?.fieldErrors?.content && <p className="text-red-500">{actionData.fieldErrors.content}</p>}
        <Button className="mx-auto" type="submit">Create Discussion</Button>
      </Form>
    </div>
  );
} 