import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard Product Page' },
  ];
};

export default function DashboardProductPage() {
  return <div>Dashboard Product Page</div>;
} 