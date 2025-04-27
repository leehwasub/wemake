import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/notifications-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { NotificationCard } from '../components/notification-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Notifications Page' },
  ];
};

export default function NotificationsPage() {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          avatarSrc="https://github.com/stevejobs.png"
          avatarFallback="S"
          userName="Steve Jobs"
          actionText="followed you."
          timeAgo="2 days ago"
          seen={false}
        />
      </div>
    </div>
  );
} 