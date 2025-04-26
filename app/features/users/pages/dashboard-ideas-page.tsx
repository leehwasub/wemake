import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard Ideas Page' },
  ];
};

export default function DashboardIdeasPage() {
  return <div>Dashboard Ideas Page</div>;
} 