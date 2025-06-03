"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}

export function KPICard({ title, value, change, changeLabel }: KPICardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {change && (
          <div
            className={cn(
              "flex items-center text-xs",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isPositive ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {changeLabel && (
          <p className="text-xs text-muted-foreground">{changeLabel}</p>
        )}
      </CardContent>
    </Card>
  );
}
