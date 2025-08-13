import React from "react";
import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className={`rounded-full p-3 ${iconColor}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const StatsCards: React.FC = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="col-span-full">
        <CardContent className="pt-6">
          <p className="text-center text-destructive">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  const cards = [
    {
      title: "총 작업 지시서",
      value: stats?.totalWorkOrders || 0,
      subtitle: "이번 달",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      iconColor: "bg-blue-100",
    },
    {
      title: "진행 중",
      value: stats?.inProgressWorkOrders || 0,
      subtitle: "현재 작업",
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      iconColor: "bg-yellow-100",
    },
    {
      title: "완료율",
      value: `${stats?.averageCompletionRate || 0}%`,
      subtitle: "목표 대비",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      iconColor: "bg-green-100",
    },
    {
      title: "개선 이슈",
      value: stats?.openIssues || 0,
      subtitle: "해결 대기",
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      iconColor: "bg-red-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  );
};
