import { ProductCard } from '~/features/products/components/product-card';
import type { Route } from './+types/profile-products-page';
import { getUserProducts } from '../queries';

export const loader = async ({params} : Route.LoaderArgs) => {
  const products = await getUserProducts(params.username);
  return {products};
}

export default function ProfileProductsPage({loaderData} : Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
       {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            productId={product.product_id}
            productName={product.name}
            productDescription={product.tagline}
            viewsCount={product.views}
            upvotesCount={product.upvotes}
            reviewsCount={product.reviews}
          />
        ))}
    </div>
  );
} 