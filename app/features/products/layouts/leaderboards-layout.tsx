import { data, Outlet } from "react-router";
import { z } from "zod";
import type { Route } from "../layouts/+types/leaderboards-layout";

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({request} : Route.LoaderArgs) => {
  const url = new URL(request.url);
  const {success, data: parsedData} = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {

    throw data({error_code: "invalid_page", message: "invalid page", status: 400});
  }
  return parsedData;
}

export default function LeaderboardsLayout() {
  return <Outlet />;
}