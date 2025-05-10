import { Outlet, useOutletContext } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "~/common/components/ui/sidebar";
import { MessagesCard } from "../components/messages-card";
import type { Route } from "./+types/messages-layout";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getMessages } from "../queries";

export const loader = async ({request}: Route.LoaderArgs) => {
  const {client} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessages(client, {userId});
  return {messages};
}

export default function MessagesLayout({loaderData}: Route.ComponentProps) {
  const {userId} = useOutletContext<{userId: string}>();
  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] overflow-hidden min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {loaderData.messages.map((message) => (
                <MessagesCard
                  key={message.message_room_id}
                  id={message.message_room_id}
                  avatarSrc={message.avatar}
                  avatarFallback={message.name.charAt(0)}
                  userName={message.name}
                  lastMessage={message.last_message}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full">
        <Outlet context= {{userId}}/>
      </div>
    </SidebarProvider>
  );
} 