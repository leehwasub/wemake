import { Avatar, AvatarImage, AvatarFallback } from '~/common/components/ui/avatar';
import { cn } from '~/lib/utils';

interface MessagesBubbleProps {
  avatarSrc: string;
  avatarFallback: string;
  message: string,
  isCurrentUser?: boolean
}

export function MessageBubble({
  avatarSrc,
  avatarFallback,
  message,
  isCurrentUser = false,
}: MessagesBubbleProps) {
  return (
    <div className={cn("flex items-end gap-4", isCurrentUser ? "flex-row-reverse" : "")}>
      <Avatar>
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className={cn("rounded-md p-4 text-sm w-1/4", isCurrentUser ? "bg-accent rounded-br-none" : "bg-primary text-primary-foreground rounded-bl-none")}>
        <p>{message}</p>
      </div>
    </div>
  );
} 