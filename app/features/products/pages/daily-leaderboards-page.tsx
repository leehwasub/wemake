import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboards-page";
import { data, isRouteErrorResponse, Link, useLoaderData } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";

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
  const urlDate = DateTime.fromObject({ 
    year: Number(params?.year,), 
    month: Number(params?.month), 
    day: Number(params?.day)
  });
  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("day"));
  return (
    <div className="space-y-10">
      <Hero
        title={`The best of ${urlDate.toLocaleString(DateTime.DATETIME_MED)}`}
        subtitle=""
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}>
            &larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday &&
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}>
              {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link> 
          </Button>
        }
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            productId={`productId-${index}`}
            productName={`Product Name ${index}`}
            productDescription={`Product Description ${index}`}
            messageCount={12}
            viewCount={12}
            upvoteCount={120}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
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