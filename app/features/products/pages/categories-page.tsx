import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";
import { getCategories } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Categories | wemake"},
    {name: "description", content: "Brose proucts by Category"},
  ]
}

export const loader = async ({request}: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const categories = await getCategories(client);
  return { categories };
};

export default function CategoriesPage({loaderData}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero 
        title="Categories" 
        subtitle="Search fro products by title of description" 
      />
      <div className="grid grid-cols-4 gap-10">
        {loaderData.categories?.map((category) => (
          <CategoryCard 
            key={category.category_id}
            id={category.category_id}
            categoryName={category.name} 
            description={category.description} 
          />
        ))}
      </div>
    </div>
  );
} 