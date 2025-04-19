import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { Form } from "react-router";
import { ProductPagination } from "~/common/components/product-pagination";

export const meta : Route.MetaFunction = ({params} : Route.MetaArgs) => {
  return [
    {title: "Developer Tools | wemake"},
    {name: "description", content: "Browse Developer Tools by products"},
  ]
}


export default function CategoryPage() {
  return (
    <div className="space-y-10">
    <Hero title="Developer Tools" subtitle="Tools for developers to build products faster" />
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