import React, { useEffect, useRef } from 'react';
import type { Route } from './+types/post-page';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '~/common/components/ui/breadcrumb';
import { Form, Link, useFetcher, useOutletContext } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from 'lucide-react';
import InputPair from '~/common/components/input-pair';
import { Textarea } from '~/common/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Badge } from '~/common/components/ui/badge';
import { Reply } from '../components/reply';
import { getPostById, getReplies } from '../queries';
import { DateTime } from 'luxon';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId } from '~/features/users/queries';
import { z } from 'zod';
import { createReply } from '../mutations';

export const meta : Route.MetaFunction = ({params} : Route.MetaArgs) => {
  return [
    {title: `${params.postId} | wemake`}
  ]
}

export const loader = async ({params, request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const post = await getPostById(client, {postId: Number(params.postId)});
  const replies = await getReplies(client, {postId: Number(params.postId)});
  return {post, replies};
}

const formSchema = z.object({
  reply: z.string().min(1),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({request, params} : Route.ActionArgs) => {
  const {client, headers} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  console.log("topLevelIdTest");
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {fieldErrors: error.flatten().fieldErrors};
  }
  const {reply, topLevelId} = data;
  console.log("topLevelId : %d", topLevelId);
  await createReply(client, {postId: Number(params.postId), reply, userId, topLevelId});
  return {ok: true};
}

export default function PostPage({loaderData, actionData} : Route.ComponentProps) {
  const fetcher = useFetcher();
  const {post, replies} = loaderData;
  const {isLoggedIn, name, username, avatar} = useOutletContext<{isLoggedIn: boolean, name?: string, username?: string, avatar?: string}>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);
  return (
    <div className="space-y-10">
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/community">Community</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={`/community?topic=${post.topic_slug}`}>{post.topic_name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={`/community/postId`}>{post.title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-center">
        <div className="col-span-4 space-y-10">
          <div className="flex w-ull items-start gap-10">
            <fetcher.Form method="post" action={`/community/${loaderData.post.post_id}/upvote`}>
              <Button variant="outline" className="flex flex-col h-14">
                <ChevronUpIcon className="size-4 shrink-0" />
                <span>{post.upvotes}</span>
              </Button>
            </fetcher.Form>
            <div className="space-y-20 w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{post.title}</h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>
                    {post.author_name}
                  </span>
                  <DotIcon className="size-5" />
                  <span>{DateTime.fromISO(post.author_created_at).toRelative()}</span>
                  <DotIcon className="size-5" />
                  <span>{post.replies} replies</span>
                </div>
                <p className="text-muted-foreground max-w-2/3">
                  {post.content}
                </p>
              </div>
              {isLoggedIn && 
              <Form ref={formRef} className="flex items-start gap-5 w-3/4" method="post">
                <Avatar className="size-14">
                  <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                  <AvatarImage src={avatar ?? ""} />
                </Avatar>
                <div className="flex flex-col gap-5 items-end w-full">
                  <Textarea 
                    name="reply"
                    placeholder="Write a reply" 
                    className="w-full resize-none"
                    rows={10} 
                  />
                  <Button type="submit">Reply</Button>
                </div>
              </Form>}
              <div className="space-y-10">
                <h4 className="font-semibold">{post.replies} Replies</h4>
                <div className="flex flex-col gap-5">
                  {replies.map((reply) => (
                    <Reply
                      avatarSrc={reply.profiles.avatar}
                      userName={reply.profiles.name}
                      userLink={`/user/@${reply.profiles.username}`}
                      timeAgo={reply.created_at}
                      message={reply.reply}
                      topLevel={true}
                      topLevelId={reply.post_reply_id}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>{post.author_name.charAt(0)}</AvatarFallback>
              <AvatarImage src={post.author_avatar ?? ""} />
            </Avatar>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-medium">{post.author_name}</h4>
              <Badge variant="secondary">{post.author_role}</Badge>
            </div>
          </div>
          <div className="space-y-2 text-sm flex flex-col">
            <span>Joined {DateTime.fromISO(post.author_created_at).toRelative()}</span>
            <span>Launched {post.products} products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
} 