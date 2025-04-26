import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Profile Page' },
  ];
};

export default function ProfilePage() {
  return <div>Profile Page</div>;
} 