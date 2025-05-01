import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { DateTime } from "luxon";

interface ReviewCardProps {
  reviewerName: string;
  username: string;
  avatarSrc: string | null;
  reviewText: string;
  rating: number;
  postedAt: string;
}

export function ReviewCard({
  reviewerName,
  username,
  avatarSrc,
  reviewText,
  rating,
  postedAt,
}: ReviewCardProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{reviewerName.charAt(0)}</AvatarFallback>
          {avatarSrc && <AvatarImage src={avatarSrc} className="size-8" />}
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{reviewerName}</h4>
          <p className="text-muted-foreground">
            <span className="text-muted-foreground">
              @{username}
            </span>
          </p>
        </div>
      </div>
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon key={index} className="size-4 fill-current" />
        ))}
      </div>
      <p>{reviewText}</p>
      <span className="text-xs">
        {DateTime.fromISO(postedAt).toRelative() }
      </span>
    </div>
  );
} 