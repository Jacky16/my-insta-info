import { $instagramUsers } from "@/stores/instagram-users-store";
import { useStore } from "@nanostores/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { checkFollowersIsFollowing } from "@/lib/check-followers";
import { Label, Pie, PieChart } from "recharts";

export function FollowersChart() {
  const { followers, following } = useStore($instagramUsers);

  const peopleIsNotFollowing = checkFollowersIsFollowing(followers, following);

  const chartData = [
    {
      people: "Seguidores",
      quantity: followers.length,
      fill: "hsl(var(--chart-1))",
    },
    {
      people: "Siguiendo",
      quantity: following.length,
      fill: "hsl(var(--chart-3))",
    },
    {
      people: "Que no te siguen",
      quantity: peopleIsNotFollowing.length,
      fill: "hsl(var(--chart-2))",
    },
  ];
  const chartConfig = {
    Seguidores: {
      label: "Seguidores",
      color: "hsl(var(--chart-1))",
    },
    Siguiendo: {
      label: "Siguiendo",
      color: "hsl(var(--chart-2))",
    },
    "Que no te siguen": {
      label: "Que no te siguen",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full flex flex-col md:w-1/3 h-fit md:sticky top-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Resumen</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          className="mx-auto aspect-square max-h-[250px]"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              wrapperClassName="flex items-center gap-2"
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="people"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {followers.length.toString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Seguidores
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="people" />}
              className="w-full flex-wrap gap-2  [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
