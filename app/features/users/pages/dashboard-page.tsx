import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard Page' },
  ];
};

export default function DashboardPage() {
  return <div>Dashboard Page</div>;
} 