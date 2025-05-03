import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/leaderboards-page";
import { Hero } from "~/common/components/hero";
import { Link } from "react-router";
import { DateTime } from "luxon";
import { getProductsByDataRange } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
      { title: "Leaderboard | wemake"},
      { name: "description", content: "Top Prouects leaderboard"},
  ];
};

export const loader = async({request}: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all(
    [getProductsByDataRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }), 
    getProductsByDataRange(client, {
      startDate: DateTime.now().startOf("week"),
      endDate: DateTime.now().endOf("week"),
      limit: 7,
    }), 
    getProductsByDataRange(client, { 
      startDate: DateTime.now().startOf("month"),
      endDate: DateTime.now().endOf("month"),
      limit: 7,
    }), 
    getProductsByDataRange(client, { 
      startDate: DateTime.now().startOf("year"),
      endDate: DateTime.now().endOf("year"),
      limit: 7,
    })]);
  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
}

export default function LeaderboardsPage({loaderData}: Route.ComponentProps) {
  return (  
    <div className="space-y-20">
      <Hero
        title="Leaderboard"
        subtitle="The most popular products on wemake"
      />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by day.
          </p>
        </div>
        {loaderData.dailyProducts.map((product, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/daily">Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by weekly.
          </p>
        </div>
        {loaderData.weeklyProducts.map((product, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/weekly">Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by monthly.
          </p>
        </div>
        {loaderData.monthlyProducts.map((product, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/monthly">Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by yearly.
          </p>
        </div>
        {loaderData.yearlyProducts.map((product, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">Explore all products &rarr;</Link>
        </Button>
      </div>
    </div>
  );
} 