import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    {title: `Promote Your Product | wemake`},
    {name: "description", content: "Promote your product on wemake"},
  ]
}

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>();
  const totalDays = (promotionPeriod?.from && promotionPeriod?.to) ? 
    DateTime.fromJSDate(promotionPeriod.to).diff(DateTime.fromJSDate(promotionPeriod.from), "days").days
  : 0;
  return (
    <div className="space-y-10">
      <Hero 
        title="Promote Your Product" 
        subtitle="Boost your product visibility and drive more traffic with our promotion services." 
      />
      <Form className="max-w-sm mx-auto flex flex-col gap-10 items-center">
        <SelectPair 
          name="product"
          label="Select a Promotion Type"
          description="Select the type product you want to promote"
          placeholder="Select a product"
          required
          options={[
            {label: "Post", value: "post"},
            {label: "Story", value: "story"},
            {label: "Reel", value: "reel"},
            {label: "Instagram", value: "instagram"},
            {label: "Facebook", value: "facebook"},
          ]}
        />
        <div className="flex flex-col gap-2 items-center">
          <Label className="flex flex-col">
            Select a range of dates for promotion{" "}
            <small className="text-muted-foreground text-center">
              Minimum duration is 3 days.
            </small>
          </Label>
          <Calendar 
            mode="range" 
            selected={promotionPeriod} 
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{before: new Date()}}
          />
        </div>
        <Button disabled={totalDays === 0}>
          Go to checkout (${totalDays * 20})
        </Button>
      </Form>
    </div>
  );
} 