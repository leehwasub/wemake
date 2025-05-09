import { EyeIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Link, useFetcher } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  notificationId: number;
  avatarSrc: string;
  avatarFallback: string;
  userName: string;
  type: "reviews" | "follow" | "reply" | "mention";
  productName: string;
  postTitle: string;
  timeAgo: string;
  seen: boolean;
  payloadId?: number;
}

export function NotificationCard({
  notificationId,
  avatarSrc,
  avatarFallback,
  userName,
  type,
  productName,
  postTitle,
  timeAgo,
  seen,
  payloadId,
}: NotificationCardProps) {
  const getMessage = (type: "reviews" | "follow" | "reply" | "mention") => {
    switch (type) {
      case "reviews":
        return "reviewed your product.";
      case "follow":
        return "followed you.";
      case "reply":
        return "replied to your post.";
      case "mention":
        return "mentioned you in a post.";
    }
  }
  const fetcher = useFetcher();
  const optimiscitSeen = fetcher.state === "idle" ? seen : true;
  return (
    <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-500/60")}>
      <CardHeader className="flex flex-row gap-5 items-start">
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{userName} </span>
            <span>{getMessage(type)}</span>
            {productName && <Button variant="ghost" asChild className="text-lg"> 
              <Link to={`/products/${payloadId}`}>{productName}</Link>
            </Button>}
            {postTitle && <Button variant="ghost" asChild className="text-lg"> 
              <Link to={`/community/${payloadId}`}>{postTitle}</Link>
            </Button>}
          </CardTitle>
          <small className="text-muted-foreground text-sm">{DateTime.fromISO(timeAgo).toRelative()}</small>
        </div>
      </CardHeader>
      <CardFooter className="justify-end">
        {!optimiscitSeen && <fetcher.Form method="post" action={`/my/notifications/${notificationId}/see`}>
          <Button variant="outline" size="icon">
            <EyeIcon className="size-4" />
          </Button>
        </fetcher.Form>}
      </CardFooter>
    </Card>
  );
} 