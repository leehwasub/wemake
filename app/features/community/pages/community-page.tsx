import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { Form, Link, useSearchParams } from 'react-router';
import { Hero } from '~/common/components/hero';
import { Button } from '~/common/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem } from '~/common/components/ui/dropdown-menu';
import { PERIOD_OPTIONS, SORT_OPTIONS } from '../constants';
import { Input } from '~/common/components/ui/input';
import { PostCard } from '../components/post-card';

export default function CommunityPage() {
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
                <Input type="text" name="search" placeholder="Search for discussions" />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/new">Create Discussion</Link>
            </Button>
          </div>
          <div className="space-y-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCard
                key={index}
                postId={`postId-${index}`}
                avatarSrc="https://github.com/shadcn.png"
                title="What is the best productivity tool?"
                author="Nico On"
                category="Productivity"
                timeAgo="12 hours ago"
                expanded={true}
              />
            ))}
          </div>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">Topics</span>
          <div className="flex flex-col gap-4 items-start">
            {["AI Tools", "Design Tools", "Dev Tools", "Note Taking Apps", "Productivity Tools"].map((category) => (
              <Button asChild variant={"link"} key={category} className="pl-0">
                <Link to={`/community?topic=${category}`} key={category} className="font-semibold">
                  {category}
                </Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
} 