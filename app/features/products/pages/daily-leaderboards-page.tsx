import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboards-page";
import { data, isRouteErrorResponse, Link, useLoaderData, type MetaFunction } from "react-router";
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
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const meta : Route.MetaFunction = ({params}) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
    day: Number(params.day),
  });
  return [
    {title: `The best of ${date.toLocaleString(DateTime.DATETIME_MED)} | wemake`},
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
  const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");
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
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") ?? "1"),
  });
  const totalPages = await getProductPagesByDataRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });
  return {params, products, totalPages};
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