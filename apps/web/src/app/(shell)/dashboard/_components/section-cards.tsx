"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { useSummaryCards } from "@/app/(shell)/dashboard/hooks";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SectionCardsSkeleton() {
  return (
    <div
      className="
        grid grid-cols-1 gap-4 px-4
        lg:px-6
        @xl/main:grid-cols-2
        @5xl/main:grid-cols-4
      "
    >
      {["a", "b", "c", "d"].map((id) => (
        <Card key={id} className="@container/card">
          <CardHeader>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-48" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function SectionCards() {
  const { data: cards, isLoading } = useSummaryCards();

  if (isLoading || !cards) return <SectionCardsSkeleton />;

  return (
    <div
      className="
        grid grid-cols-1 gap-4 px-4
        *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5
        *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs
        lg:px-6
        @xl/main:grid-cols-2
        @5xl/main:grid-cols-4
        dark:*:data-[slot=card]:bg-card
      "
    >
      {cards.map((card) => {
        const TrendIcon =
          card.trend === "up" ? IconTrendingUp : IconTrendingDown;
        return (
          <Card key={card.title} className="@container/card">
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle
                className="
                  text-2xl font-semibold tabular-nums
                  @[250px]/card:text-3xl
                "
              >
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon />
                  {card.badge}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.footerText} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{card.footerSub}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
