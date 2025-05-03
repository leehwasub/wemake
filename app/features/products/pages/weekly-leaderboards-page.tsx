import { DateTime } from "luxon";
import type { Route } from "./+types/weekly-leaderboards-page";
import { data, isRouteErrorResponse, Link, useLoaderData } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";
import { getProductPagesByDataRange, getProductsByDataRange } from "../queries";
import { PAGE_SIZE } from "../contants";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
});

export const meta : Route.MetaFunction = ({params}) => {
  const date = DateTime.fromObject({
    weekYear: Number(params.year),
    weekNumber: Number(params.week),
  });
  return [
    {title: `Best of week ${date
          .startOf("week")
          .toLocaleString(DateTime.DATE_SHORT)} - ${date
          .endOf("week")
          .toLocaleString(DateTime.DATE_SHORT)} | wemake`},
  ]
}

export const loader = async ({params, request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
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
  const date = DateTime.fromObject({
    weekYear: parsedData.year,
    weekNumber: parsedData.week,
  }).setZone("Asia/Seoul");
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
  const url = new URL(request.url);
  const products = await getProductsByDataRange(client, {
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") ?? "1"),
  });
  const totalPages = await getProductPagesByDataRange(client, {
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
  });
  return {...parsedData, products, totalPages};
}

export default function WeeklyLeaderboardsPage({loaderData} : Route.ComponentProps) {
  const {year, week} = loaderData;
  const urlDate = DateTime.fromObject({ 
    weekYear: year,
    weekNumber: week,
  });
  const previousWeek = urlDate.minus({ weeks: 1 });
  const nextWeek = urlDate.plus({ weeks: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("week"));
  return (
    <div className="space-y-10">
      <Hero
        title={`Best of week ${urlDate
          .startOf("week")
          .toLocaleString(DateTime.DATE_SHORT)} - ${urlDate
          .endOf("week")
          .toLocaleString(DateTime.DATE_SHORT)}`}
        subtitle=""
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}>
            &larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday &&
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}>
              {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link> 
          </Button>
        }
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product, index) => (
          <ProductCard
            key={index}
            productId={product.product_id}
            productName={product.name}
            productDescription={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            upvotesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
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