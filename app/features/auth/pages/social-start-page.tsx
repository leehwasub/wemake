import { z } from "zod";
import type { Route } from "./+types/social-start-page";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  provider: z.enum(["github", "kakao"]),
});

export const loader = async ({request, params}: Route.LoaderArgs) => {
  const {success, data} = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const redirectTo = `http://localhost:5173/auth/social/${data.provider}/complete`;
  const { provider } = data;
  const { client, headers } = makeSSRClient(request);
  const {data: {url}, error} = await client.auth.signInWithOAuth({
    provider,
    options:{
      redirectTo,
    }
  });
  if (url) {
    return redirect(url, {headers});
  }
  if (error) {
    throw error;
  }
  return redirect("/auth/login", {headers});
}

export default function SocialStartPage() {
  return <div>Social Start Page</div>;
} 