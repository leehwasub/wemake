import { z } from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { ProductPagination } from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    {title: `Search Proudcts | wemake`},
    {name: "description", content: "Search for products on wemake"},
  ]
}

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export function loader({request} : Route.LoaderArgs) {
  const url = new URL(request.url);
  const {success, data: parsedData} = paramsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw new Error("InValid params");
  }
  console.log(parsedData);
}

export default function SearchPage({loaderData} : Route.ComponentProps) {
  return (
  <div className="space-y-20">
    <Hero title="Search" subtitle="Search for products on wemake" />
    <Form className="flex justify-center max-w-screen-sm items-center gap-2 mx-auto">
      <Input name="query" placeholder="Search for products" className="text-lg" />
      <Button type="submit">Search</Button>
    </Form>
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
      <ProductPagination totalPages={10}/>
  </div>
  );
} 