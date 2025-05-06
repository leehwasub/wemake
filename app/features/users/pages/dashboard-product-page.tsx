import { Area, AreaChart, Line } from "recharts";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { ChartTooltip } from "~/common/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-product-page";
import { ChartContainer, type ChartConfig } from "~/common/components/ui/chart";
import { XAxis } from "recharts";
import { CartesianGrid } from "recharts";
import { LineChart } from "recharts";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import { redirect } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard Product Page' },
  ];
};

export const loader = async ({request, params} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const {error} = await client.from("products").select("product_id").eq("profile_id", userId).eq("product_id", Number(params.productId)).single();
  if (error) {
    throw redirect("/my/dashboard/products");
  }
  const {data, error: rcpError} = await client.rpc("get_product_stats", {product_id: params.productId});
  if (rcpError) {
    throw rcpError;
  }
  return {chartData: data};
}

const chartConfig = {
  views: {
    label: "Page Views",
    color: "var(--chart-1)",
  },
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;


export default function DashboardProductPage({loaderData} : Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={loaderData.chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{left: 15, right: 15}}
              />
              <ChartTooltip
                cursor={false}
                wrapperStyle={{minWidth: "150px"}}
                content={<ChartTooltipContent indicator="dot"/>}
              />
              <Area
                dataKey="product_views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="product_visits"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
    </div>
  );
} 