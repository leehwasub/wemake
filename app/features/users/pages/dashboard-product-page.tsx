import { Area, AreaChart, Line } from "recharts";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { ChartTooltip } from "~/common/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-product-page";
import { ChartContainer, type ChartConfig } from "~/common/components/ui/chart";
import { XAxis } from "recharts";
import { CartesianGrid } from "recharts";
import { LineChart } from "recharts";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard Product Page' },
  ];
};

const chartData = [
  { month: "January", views: 186, visitors: 100 },
  { month: "February", views: 305, visitors: 342 },
  { month: "March", views: 237, visitors: 300 },
  { month: "April", views: 73, visitors: 294 },
  { month: "May", views: 209, visitors: 500 },
  { month: "June", views: 214, visitors: 423 },
]
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


export default function DashboardProductPage() {
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
              data={chartData}
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                wrapperStyle={{minWidth: "150px"}}
                content={<ChartTooltipContent indicator="dot"/>}
              />
              <Area
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="visitors"
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