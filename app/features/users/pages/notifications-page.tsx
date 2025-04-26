import type { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Notifications Page' },
  ];
};

export default function NotificationsPage() {
  return <div>Notifications Page</div>;
} 