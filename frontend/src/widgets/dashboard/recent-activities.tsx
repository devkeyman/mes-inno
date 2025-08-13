import React from "react";
import { useRecentActivities } from "@/features/dashboard/hooks/use-dashboard";
import { RecentActivity } from "@/shared/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FileText, AlertCircle, User, FileIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const ActivityItem: React.FC<{ activity: RecentActivity }> = ({ activity }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "WORK_ORDER":
        return <FileText className="h-4 w-4" />;
      case "ISSUE":
        return <AlertCircle className="h-4 w-4" />;
      case "USER":
        return <User className="h-4 w-4" />;
      default:
        return <FileIcon className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "WORK_ORDER":
        return "bg-blue-100 text-blue-600";
      case "ISSUE":
        return "bg-red-100 text-red-600";
      case "USER":
        return "bg-cyan-100 text-cyan-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - activityTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "방금 전";
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  return (
    <div className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50">
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          getActivityColor(activity.type)
        )}
      >
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{activity.description}</p>
        <p className="text-xs text-muted-foreground">
          {formatTimeAgo(activity.timestamp)}
        </p>
      </div>
    </div>
  );
};

export const RecentActivities: React.FC = () => {
  const { data: activities, isLoading, error } = useRecentActivities();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">최근 활동</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-destructive">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">최근 활동</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities && activities.length > 0 ? (
            activities
              .slice(0, 5)
              .map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))
          ) : (
            <p className="text-center text-sm text-muted-foreground italic">
              최근 활동이 없습니다.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
