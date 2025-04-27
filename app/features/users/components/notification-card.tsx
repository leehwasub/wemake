import { EyeIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  avatarSrc: string;
  avatarFallback: string;
  userName: string;
  actionText: string;
  timeAgo: string;
  seen: boolean;
}

export function NotificationCard({
  avatarSrc,
  avatarFallback,
  userName,
  actionText,
  timeAgo,
  seen,
}: NotificationCardProps) {
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
            <span>{actionText}</span>
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timeAgo}</small>
        </div>
      </CardHeader>
      <CardFooter className="justify-end">
        <Button variant="outline" size="icon">
          <EyeIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
} 