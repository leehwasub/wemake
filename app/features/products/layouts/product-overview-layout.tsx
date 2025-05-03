import { ChevronUpIcon } from "lucide-react";
import { StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/product-overview-layout";
import { getProductById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta : Route.MetaFunction = ({data} : Route.MetaArgs) => {
  return [
    {title: `${data.product.name} | wemake`},
    {name: "description", content: data.product.tagline},
  ]
}

export const loader = async ({request, params} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const product = await getProductById(client, {productId: Number(params.productId)});
  return {product};
}

export default function ProductOverviewLayout({loaderData} : Route.ComponentProps) {
  const {product} = loaderData;
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <p className="text-2xl font-light text-muted-foreground">{product.tagline}</p>
            <div className="mt-2 flex items-center gap-5">
              <div className="flex text-yellow-400">
                {Array.from({length: 5}).map((_, index) => (
                  <StarIcon key={index} className="size-4 fill-current" fill={index < Math.floor(product.avarage_rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-muted-foreground">{product.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={"secondary"} size={"lg"} className="text-lg h-14 px-10" asChild>
            <Link to={`/products/${loaderData.product.product_id}/visit`}>Visit Website</Link>
          </Button>
          <Button size={"lg"} className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
              Upvote ({product.upvotes})
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <NavLink className={({isActive}) => cn([buttonVariants({variant: "outline"}), isActive && "bg-red-500 text-foreground font-bold"])} to={`/products/${product.product_id}/overview`}>Overview</NavLink>
        <NavLink className={({isActive}) => cn([buttonVariants({variant: "outline"}), isActive && "bg-red-500 text-foreground font-bold"])} to={`/products/${product.product_id}/reviews`}>Reviews</NavLink>
      </div>
      <div>
        <Outlet context={{
          productId: product.product_id, 
          description: product.description, 
          how_it_works: product.how_it_works,
          review_count: product.reviews,
        }}/>
      </div>
    </div>
  );
}

