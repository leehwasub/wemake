import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Message Page' },
  ];
};

export default function MessagePage() {
  return <div>Message Page</div>;
} 