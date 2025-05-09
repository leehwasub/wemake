import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/see-notification-page";
import { getLoggedInUserId } from "../queries";
import { seeNotification } from "../mutations";

export const action = async ({request, params}: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {status: 405});
  }
  console.log("see notification page %d", params.notificationId);
  const {client} = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await seeNotification(client, {notificationId: parseInt(params.notificationId), userId});
  return { ok:true };
}

