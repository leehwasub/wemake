import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import React, { Suspense } from 'react';
import { Await, data, Form, Link, useSearchParams } from 'react-router';
import { Hero } from '~/common/components/hero';
import { Button } from '~/common/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem } from '~/common/components/ui/dropdown-menu';
import { PERIOD_OPTIONS, SORT_OPTIONS } from '../constants';
import { Input } from '~/common/components/ui/input';
import { PostCard } from '../components/post-card';
import { getPosts, getTopics } from '../queries';
import type { Route } from './+types/community-page';
import { z } from 'zod';
import { makeSSRClient } from '~/supa-client';

const searchParamsSchema = z.object({
  sort: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z.enum(["all", "today", "week", "month", "year"]).optional().default("all"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});

export const loader = async({request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  //await new Promise(resolve => setTimeout(resolve, 1000));
  // const topics = await getTopics();
  // const posts = await getPosts();
  // const [topics, posts] = await Promise.all([getTopics(), getPosts()]);
  //const serverData = await serverLoader();
  const url = new URL(request.url);
  const {success, data: parsedData} = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data(
      {
        message: "Invalid search params",
        error_code: "Invalid search params",
      },
      {
        status: 400,
      }
    );
  }
  const topics = await getTopics(client);
  const posts = await getPosts(client, {
    limit: 20,
    sorting: parsedData.sort,
    period: parsedData.period,
    keyword: parsedData.keyword,
    topic: parsedData.topic,
  });
  return { topics, posts };
}

export default function CommunityPage({loaderData} : Route.ComponentProps) {
  const {topics, posts} = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sort") || "newest";
  const period = searchParams.get("period") || "all";
  return (
    <div>
      <Hero 
        title="Community"
        subtitle="Share your thoughts with other users and help them make the best decision."
      />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sorting}</span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem 
                      className="capitalize cursor-pointer" 
                      key={option}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          searchParams.set("sort", option);
                          setSearchParams(searchParams);
                        }
                      }}>
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span className="text-sm capitalize">{period}</span> 
                      <ChevronDownIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem 
                        className="capitalize cursor-pointer" 
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("period", option);
                            setSearchParams(searchParams);
                          }
                        }}>
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  )
                }
              </div>
              <Form className="w-2/3">
                <Input type="text" name="keyword" placeholder="Search for discussions" />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/submit">Create Discussion</Link>
            </Button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={posts}>
              {(data) => (
                <div className="space-y-5">
                {data?.map((post) => (
                  <PostCard
                    key={post.post_id}
                    postId={post.post_id}
                    avatarSrc={post.author_avatar}  
                    title={post.title}
                    author={post.author}
                    category={post.topic}
                    timeAgo={post.created_at}
                    votesCount={post.upvotes}
                    isUpvoted={post.is_upvoted}
                    expanded={true}
                  />
                ))}
              </div>
              )}
            </Await>
          </Suspense>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">Topics</span>
            <Suspense fallback={<div>Loading...</div>}>
              <Await resolve={topics}>
                {(data) => (
                <div className="flex flex-col gap-4 items-start">
                  {data?.map((topic) => (
                    <Button asChild variant={"link"} key={topic.slug} className="pl-0">
                      <Link to={`/community?topic=${topic.slug}`} className="font-semibold">
                      {topic.name}
                    </Link>
                  </Button>
                  ))}
                </div>
                )}
              </Await>
            </Suspense>
        </aside>
      </div>
    </div>
  );
} 

export function HydrateFallback() {
  return (
    <div>
      <div>Loading...</div>
    </div>
  );
}
