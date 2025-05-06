import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Form, useActionData } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";
import type { action } from "../pages/product-reviews-page";

export default function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const actionData = useActionData<typeof action>();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">What do you think about this product?</DialogTitle>
        <DialogDescription>
          Share your thoughts with other users and help them make the best decision.
        </DialogDescription>
      </DialogHeader>
      <Form className="space-y-4" method="post">
        <div>
          <Label className="flex flex-col gap-1 items-start">
            Rating{" "}
            <small className="text-muted-foreground">
              How would you rate this product?
            </small>
          </Label>
          <div className="flex gap-2 mt-5">
            {[1, 2, 3, 4, 5].map(star => (
              <label 
                key={star} 
                onMouseEnter={() => setHoveredStar(star)} 
                onMouseLeave={() => setHoveredStar(0)}
              >
              <StarIcon className="size-5 text-yellow-400" fill={hoveredStar >= star || rating >= star ? "currentColor" : "none"} />
              <input 
                type="radio" 
                name="rating" 
                value={star} 
                className="opacity-0 h-px w-px absolute" 
                required 
                onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
          {actionData?.FieldErrors?.rating && <p className="text-red-500">{actionData.FieldErrors.rating.join(", ")}</p>}
        </div>

        <InputPair 
          name="review" 
          label="Review" 
          description="Maximum 1000 characters" 
          placeholder="Tell us more about this product" 
          textArea 
          required 
        />
        {actionData?.FieldErrors?.review && <p className="text-red-500">{actionData.FieldErrors.review.join(", ")}</p>}
        <DialogFooter>
          <Button type="submit">Submit Review</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
