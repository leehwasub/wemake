import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "app/common/components/ui/card";
import { Button } from "app/common/components/ui/button";
import { EyeIcon, DotIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
  ideaId: number;
  title: string;
  owner?: boolean;
  viewCount?: number;
  timeAgo?: string;
  likeCount?: number;  
  claimed?: boolean;
}

export function IdeaCard({
  ideaId,
  title,
  owner,
  viewCount,
  timeAgo,
  likeCount,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={claimed || owner ? "" : `/ideas/${ideaId}`}>
          <CardTitle className="text-xl">
            <span className={cn(claimed ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground break-all" : "")}>{title}</span>
          </CardTitle>
        </Link>
      </CardHeader>
      {!owner && <CardContent className="flex items-center text-sm">
        <div className="flex items-center gap-1">
          <EyeIcon className="w-4 h-4" />
          <span>{viewCount}</span>
        </div>
        <DotIcon className="w-4 h-4" />
        {timeAgo && <span>{DateTime.fromISO(timeAgo).toRelative()}</span>}
      </CardContent>}
      <CardFooter className="flex justify-end gap-2">
        {!claimed && !owner ? (
          <>
            <Button variant="outline">
              <HeartIcon className="w-4 h-4" />
              <span>{likeCount}</span>
            </Button>
            <Button asChild>
              <Link to={`/ideas/${ideaId}/claim`}>Claim idea now &rarr;</Link>
            </Button>
          </>
        ) :  <Button variant="outline" disabled className="cursor-not-allowed">
        <LockIcon className="w-4 h-4" />
        Claimed
      </Button> }
      </CardFooter>
    </Card>
  );
} 