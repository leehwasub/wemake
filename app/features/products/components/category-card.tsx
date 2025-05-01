import { Link } from "react-router";

interface CategoryCardProps {
  id: number;
  categoryName: string;
  description: string;
}

export function CategoryCard({ id, categoryName, description }: CategoryCardProps) {
  return (
    <Link to={`/products/categories/${id}`} className="block">
      <div className="p-4 border rounded-md shadow-md">
        <h2 className="text-xl font-bold">{categoryName}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
} 