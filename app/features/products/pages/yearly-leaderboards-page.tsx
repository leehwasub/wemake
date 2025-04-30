import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboards-page";
import { data, isRouteErrorResponse, Link, useLoaderData } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";
import { getProductPagesByDataRange, getProductsByDataRange } from "../queries";
import { PAGE_SIZE } from "../contants";
const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta : Route.MetaFunction = ({params}) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
  });
  return [
    {title: `Best of year ${date.toLocaleString({
          year: "numeric",
        })} | wemake`},
  ]
}


export const loader = async ({params, request} : Route.LoaderArgs) => {
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
    year: parsedData.year,
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
  const today = DateTime.now().setZone("Asia/Seoul").startOf("year");
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
  const products = await getProductsByDataRange({
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") ?? "1"),
  });
  const totalPages = await getProductPagesByDataRange({
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
  });
  return {...parsedData, products, totalPages};
}

export default function YearlyLeaderboardsPage({loaderData} : Route.ComponentProps) {
  const {year} = loaderData; 
  const urlDate = DateTime.fromObject({   
    year: year,
  });
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));
  return (
    <div className="space-y-10">
      <Hero
        title={`Best of year ${urlDate.toLocaleString({
          year: "numeric",
        })}`}
        subtitle=""
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toLocaleString({year: "numeric"})}
          </Link>
        </Button>
        {!isToday &&
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({year: "numeric"})} &rarr;
            </Link> 
          </Button>
        }
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product, index) => (
          <ProductCard
            key={index}
            productId={product.product_id.toString()}
            productName={product.name}
            productDescription={product.description}
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