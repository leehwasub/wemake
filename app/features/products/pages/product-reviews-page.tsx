import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";

export const meta : Route.MetaFunction = () => {
  return [
    {title: `Product Reviews | wemake`},
    {name: "description", content: "Product Reviews"},
  ]
}

export default function ProductReviewsPage({params : {productId}} : Route.ComponentProps) {
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">10 Reviews</h2>
          <DialogTrigger>
            <Button variant={"secondary"}>Write a Review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {Array.from({length: 10}).map((_, index) => (
            <ReviewCard
              key={index}
              reviewerName="John Doe"
              username="username"
              avatarSrc="https://github.com/facebook.png"
            reviewText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui omnis animi deserunt? Quam numquam tenetur eligendi, aliquam, et unde porro, quia facilis modi velit voluptatem voluptatum distinctio? Rem id sit sint labore. Rem consequatur veritatis et aspernatur sunt ducimus deleniti enim nostrum doloribus. Placeat alias cupiditate, obcaecati dolores modi laboriosam!"
            rating={5}
              daysAgo={10}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
} 