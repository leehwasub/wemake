import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboards-page";
import { data, isRouteErrorResponse, useLoaderData } from "react-router";
import { z } from "zod";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const loader = ({params} : Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success)
  {
    throw data(
      {
        message: "Invalid params",
        error_code: "INVALID_PARAMS",
      },
      {
        status: 400,
      }
    )
  }
  const date = DateTime.fromObject({ year: parsedData?.year, month: parsedData?.month, day: parsedData?.day }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data(
      {
        message: "Invalid date",
        error_code: "INVALID_DATE",
      },
      {
        status: 400,
      }
    )
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
  if (date > today) {
    throw data(
      {
        message: "future_date",
        error_code: "Future date",
      },
      {
        status: 400,
      }
    )
  }
  return {params};
}

export default function DailyLeaderboardsPage({loaderData} : Route.ComponentProps) {
  const {params} = loaderData;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">{params.year}년 {params.month}월 {params.day}일 일간 리더보드</h1>
    </div>  
  );
} 

export function ErrorBoundary({error} : Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return <div>{error.data.message} / {error.data.error_code}</div>
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown Error</div>;
}