import { Resend } from "resend";
import type { Route } from "./+types/welcome-page";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({params}: Route.LoaderArgs) => {
  const {data, error} = await client.emails.send({
    from: "wemake <wemake@mail.wemake.beauty>",
    to: ["test@naver.com"],
    subject: "Welcome to wemake",
    html: "<p>Welcome</p>",
  });
  return Response.json({data, error});
}