import { Link, useLocation } from 'react-router';
import { Avatar, AvatarImage, AvatarFallback } from '~/common/components/ui/avatar';
import { SidebarMenuButton, SidebarMenuItem } from '~/common/components/ui/sidebar';

interface MessagesCardProps {
  avatarSrc: string;
  avatarFallback: string;
  userName: string;
  lastMessage: string;
  id: number;
}

export function MessagesCard({
  avatarSrc,
  avatarFallback,
  userName,
  lastMessage,
  id,
}: MessagesCardProps) {
  const location = useLocation();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-14" asChild isActive={location.pathname === `/my/messages/${id}`}>
        <Link to={`my/messages/${id}`}>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={avatarSrc} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">{lastMessage}</span>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
} 