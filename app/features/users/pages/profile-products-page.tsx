import { ProductCard } from '~/features/products/components/product-card';

export default function ProfileProductsPage() {
  return (
    <div className="flex flex-col gap-5">
       {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            productId={index}
            productName={`Product Name ${index}`}
            productDescription={`Product Description ${index}`}
            messageCount={12}
            viewCount={12}
            upvoteCount={120}
          />
        ))}
    </div>
  );
} 