import { z } from "zod";
import type { Route } from "./+types/promote-success-page";

const paramsSchema = z.object({
  paymentType: z.string(),
  orderId: z.string().uuid(),
  paymentKey: z.string(),
  amount: z.coerce.number(),
});

export const loader = async ({request}: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const {success, data} = paramsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    return new Response("Invalid parameters", {status: 400});
  }
  const encryptedSecretKey = `Basic ${Buffer.from(
    process.env.TOSS_SECRET_KEY + ":"
  ).toString("base64")}`;
  const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: encryptedSecretKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId: data.orderId,
      paymentKey: data.paymentKey,
      amount: data.amount,
    }),
  });
  const responseData = await response.json();
  return Response.json(responseData);
}
