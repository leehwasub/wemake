import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Message Page' },
  ];
};

export default function MessagePage() {
  return <div>Message Page</div>;
} 