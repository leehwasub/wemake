import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardFooter } from "app/common/components/ui/card";
import { Button } from "app/common/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "app/common/components/ui/avatar";
import { DotIcon } from "lucide-react";

interface PostCardProps {
  postId: string;
  avatarSrc: string;
  title: string;
  author: string;
  category: string;
  timeAgo: string;
}

export function PostCard({
  postId,
  avatarSrc,
  title,
  author,
  category,
  timeAgo,
}: PostCardProps) {
  return (
    <Link to={`/community/${postId}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center gap-2">
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
        <CardFooter className="flex justify-end">
          <Button variant="link">Reply &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 