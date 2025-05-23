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
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createProductReview } from "../mutations";
import { useEffect, useState } from "react";

export const meta : Route.MetaFunction = () => {
  return [
    {title: `Product Reviews | wemake`},
    {name: "description", content: "Product Reviews"},
  ]
}

export const loader = async ({params, request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const reviews = await getReviews(client, {productId: Number(params.productId)});
  return {reviews};
}

const formSchema = z.object({ 
  review: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
})

export const action = async ({request, params} : Route.ActionArgs) => {
  const {client, headers} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { FieldErrors: error.flatten().fieldErrors };
  }
  const review = await createProductReview(client, {
    productId: Number(params.productId),
    userId,
    review: data.review,
    rating: data.rating,
  });
  return { ok : true};
}

export default function ProductReviewsPage({loaderData, actionData} : Route.ComponentProps) {
  const {review_count} = useOutletContext<{review_count: number}>();
  const {reviews} = loaderData;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (actionData?.ok) {
      setOpen(false);
    }
  }, [actionData]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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