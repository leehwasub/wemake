import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/notifications-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { NotificationCard } from '../components/notification-card';
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getNotifications } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Notifications Page' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const {client} = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications = await getNotifications(client, {userId});
  return {notifications};
};

export default function NotificationsPage({loaderData} : Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        {loaderData.notifications.map((notification) => (
          <NotificationCard
            key={notification.notification_id}
            avatarSrc={notification.source?.avatar || ""}
            avatarFallback={notification.source?.name?.charAt(0) || ""}
            userName={notification.source?.name || ""}
            type={notification.type as "reviews" | "follow" | "reply" | "mention"}
            productName={notification.product?.name || ""}
            postTitle={notification.post?.title || ""}
            payloadId={notification.product?.product_id ?? notification.post?.post_id}
            timeAgo={notification.created_at}
            seen={notification.seen}
          />
        ))}
      </div>
    </div>
  );
} 