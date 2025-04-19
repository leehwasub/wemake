import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Categories | wemake"},
    {name: "description", content: "Brose proucts by Category"},
  ]
}

export default function CategoriesPage() {
  return (
    <div className="space-y-10">
      <Hero 
        title="Categories" 
        subtitle="Search fro products by title of description" 
      />
      <div className="grid grid-cols-4 gap-10">
        {Array.from({length: 10}).map((_, index) => (
          <CategoryCard 
            key={index}
            id={`categoryId-${index}`} 
            categoryName={`Category Name ${index}`} 
            description={`Category Description ${index}`} 
          />
        ))}
      </div>
    </div>
  );
} 