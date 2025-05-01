import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import { ProductCard } from "../components/product-card";
import { ProductPagination } from "~/common/components/product-pagination";
import { getCategory, getCategoryPages, getProductsByCategory } from "../queries";
import { z } from "zod";

export const meta : Route.MetaFunction = ({params} : Route.MetaArgs) => {
  return [
    {title: "Developer Tools | wemake"},
    {name: "description", content: "Browse Developer Tools by products"},
  ]
}

const paramsSchema = z.object({
  category: z.coerce.number(),
  page: z.coerce.number().optional().default(1),
});

export const loader = async ({params, request} : Route.LoaderArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const {data, success} = paramsSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid category");
  }
  const category = await getCategory({categoryId: data.category});
  const products = await getProductsByCategory({categoryId: data.category, page});
  const totalPages = await getCategoryPages({categoryId: data.category});
  return { category, products, totalPages };
}

export default function CategoryPage({loaderData}: Route.ComponentProps) {
  const {category, products, totalPages} = loaderData;
  return (
    <div className="space-y-10">
    <Hero title={category.name} subtitle={category.description} />
    <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            productId={product.product_id}
            productName={product.name}
            productDescription={product.tagline}
            viewsCount={product.views}
            reviewsCount={product.reviews}
            upvotesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={totalPages}/>
  </div>
  );
} 