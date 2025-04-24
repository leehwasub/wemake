import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardFooter } from "app/common/components/ui/card";
import { Button } from "app/common/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "app/common/components/ui/avatar";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface PostCardProps {
  postId: string;
  avatarSrc: string;
  title: string;
  author: string;
  category: string;
  timeAgo: string;
  expanded?: boolean;
  votesCount?: number;
}

export function PostCard({
  postId,
  avatarSrc,
  title,
  author,
  category,
  timeAgo,
  expanded = false,
  votesCount = 0,
}: PostCardProps) {
  return (
    <Link to={`/community/${postId}`} className="block">
      <Card className={cn("bg-transparent hover:bg-card/50 transition-colors", expanded ? "flex flex-row items-center justify-between" : "")}>
        <CardHeader className="flex flex-row items-center gap-2 w-full">
          <Avatar className="size-14">
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            <AvatarImage src={avatarSrc} />
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>{author}</span>
              <span>{category}</span>
              <DotIcon className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="link">Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className="flex justify-end pt-0 bg-0">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{votesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
} 