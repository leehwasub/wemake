import { MessageCircleIcon } from "lucide-react";
import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Message Page' },
  ];
};

export default function MessagesPage() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <MessageCircleIcon className="size-12 text-muted-foreground"/>
      <div className="text-xl text-muted-foreground font-semibold">
        Click on a message to start chatting
      </div>
    </div>
  );
} 