import React from "react";
import { useProductionSummary } from "@/features/dashboard/hooks/use-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

export const ProductionStatus: React.FC = () => {
  const { data: summary, isLoading, error } = useProductionSummary();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg font-semibold">생산 현황</CardTitle>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
            <span className="text-sm text-muted-foreground">로딩 중...</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">생산 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-destructive">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  const targetProduction = summary?.totalQuantityOrdered || 1000;
  const currentProduction = summary?.totalQuantityProduced || 0;
  const completionRate = summary?.productionRate || 0;
  const isRunning = (summary?.productionRate || 0) > 0; // 생산률이 0보다 크면 가동 중으로 판단

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold">생산 현황</CardTitle>
        <Badge
          variant={isRunning ? "success" : "destructive"}
          className="flex items-center gap-1"
        >
          <div
            className={`h-2 w-2 rounded-full ${
              isRunning ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {isRunning ? "정상 가동" : "정지"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">목표 생산량</span>
          <span className="font-medium">
            {targetProduction.toLocaleString()}개
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">현재 생산량</span>
          <span className="font-medium text-blue-600">
            {currentProduction.toLocaleString()}개
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">달성률</span>
          <span className="font-medium text-green-600">{completionRate}%</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
              style={{ width: `${Math.min(completionRate, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
