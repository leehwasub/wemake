import React from 'react';
import type { Route } from './+types/post-page';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '~/common/components/ui/breadcrumb';
import { Form, Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from 'lucide-react';
import InputPair from '~/common/components/input-pair';
import { Textarea } from '~/common/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Badge } from '~/common/components/ui/badge';
import { Reply } from '../components/reply';
import { getPostById } from '../queries';
import { DateTime } from 'luxon';

export const meta : Route.MetaFunction = ({params} : Route.MetaArgs) => {
  return [
    {title: `${params.postId} | wemake`}
  ]
}

export const loader = async ({params} : Route.LoaderArgs) => {
  const post = await getPostById({postId: Number(params.postId)});
  return {post};
}

export default function PostPage({loaderData} : Route.ComponentProps) {
  const {post} = loaderData;
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
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{post.upvotes}</span>
            </Button>
            <div className="space-y-20">
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
              <Form className="flex items-start gap-5 w-3/4">
                <Avatar className="size-14">
                  <AvatarFallback>N</AvatarFallback>
                  <AvatarImage src="https://github.com/microsoft.png" />
                </Avatar>
                <div className="flex flex-col gap-5 items-end w-full">
                  <Textarea 
                    placeholder="Write a reply" 
                    className="w-full resize-none"
                    rows={10} 
                  />
                  <Button>Reply</Button>
                </div>
              </Form>
              <div className="space-y-10">
                <h4 className="font-semibold">{post.replies} Replies</h4>
                <div className="flex flex-col gap-5">
                  <Reply
                    avatarSrc="https://github.com/microsoft.png"
                    userName="Nicolas"
                    userLink="/user/@nico"
                    timeAgo="12 hours ago"
                    message="I've been using Todoist for a while now and it's great. It's easy to use and has a lot of features."
                    topLevel={true}
                  />
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