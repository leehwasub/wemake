import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getReviews } from "../queries";

export const meta : Route.MetaFunction = () => {
  return [
    {title: `Product Reviews | wemake`},
    {name: "description", content: "Product Reviews"},
  ]
}

export const loader = async ({params} : Route.LoaderArgs) => {
  const reviews = await getReviews({productId: Number(params.productId)});
  return {reviews};
}

export default function ProductReviewsPage({loaderData} : Route.ComponentProps) {
  const {review_count} = useOutletContext<{review_count: number}>();
  const {reviews} = loaderData;
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{review_count} {review_count === 1 ? "Review" : "Reviews"}</h2>
          <DialogTrigger>
            <Button variant={"secondary"}>Write a Review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              reviewerName={review.user.name}
              username={review.user.username}
              avatarSrc={review.user.avatar}
              reviewText={review.review}
              rating={review.rating}
              postedAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
} 