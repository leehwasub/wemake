import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "app/common/components/ui/card";
import { Button } from "app/common/components/ui/button";
import { MessageCircleIcon, EyeIcon, ChevronUpIcon } from "lucide-react";

interface ProductCardProps {
  productId: string;
  productName: string;
  productDescription: string;
  reviewsCount: string;
  viewsCount: string;
  upvotesCount: string;
}

export function ProductCard({
  productId,
  productName,
  productDescription,
  reviewsCount,
  viewsCount,
  upvotesCount,
}: ProductCardProps) {
  return (
    <Link to={`/products/${productId}`} className="block">
      <Card className="w-full flex flex-row items-center justify-between bg-transparent hover:bg-primary/10">
        <CardHeader className="w-full">
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            {productName}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {productDescription}
          </CardDescription>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-px text-xs text-primary-foreground">
              <MessageCircleIcon className="w-4 h-4" />
              <span>{reviewsCount}</span>
            </div>
            <div className="flex items-center gap-px text-xs text-primary-foreground">
              <EyeIcon className="w-4 h-4" />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="py-0">
          <Button variant="outline" className="flex flex-col h-14">
            <ChevronUpIcon className="size-4 shrink-0" />
            <span>{upvotesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 