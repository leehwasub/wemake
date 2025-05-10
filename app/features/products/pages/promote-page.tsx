import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "@radix-ui/react-label";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";
import { loadTossPayments, type TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

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
  const widgets = useRef<TossPaymentsWidgets|null>(null);
  useEffect(() => {
    const initToss = async () => {
      const toss = await loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");
      widgets.current = (await toss).widgets({
        customerKey: "111111111",
      });
      await widgets.current?.setAmount({
        value: 1000,
        currency: "KRW",
      });
      await widgets.current?.renderPaymentMethods({
        selector: "#toss-payment-methods",
      });
      await widgets.current?.renderAgreement({
        selector: "#toss-payment-agreement",
      });
    }
    initToss();
  }, []);
  useEffect(() => {
    if (widgets.current) {
      widgets.current.setAmount({
        value: totalDays * 20000,
        currency: "KRW",
      });
    }
  }, [promotionPeriod]);
  return (
    <div className="space-y-10">
      <Hero 
        title="Promote Your Product" 
        subtitle="Boost your product visibility and drive more traffic with our promotion services." 
      />
      <div className="grid grid-cols-6 gap-10">
        <Form className="col-span-3 mx-auto w-1/2 flex flex-col gap-10 items-start">
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
        </Form>
        <aside className="col-span-3 px-20 flex flex-col gap-10 items-center">
          <div id="toss-payment-methods" className="w-full" />
          <div id="toss-payment-agreement" />
          <Button className="w-full" disabled={totalDays === 0}>
            Go to checkout ({(totalDays * 20000).toLocaleString("ko-KR", {style: "currency", currency: "KRW"})})
          </Button>
        </aside>
     </div>
    </div>
  );
} 