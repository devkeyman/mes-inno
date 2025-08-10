import React from "react";
import { useRecentActivities } from "@/features/dashboard/hooks/use-dashboard";
import { RecentActivity } from "@/shared/types";

const ActivityItem: React.FC<{ activity: RecentActivity }> = ({ activity }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "WORK_ORDER":
        return "📋";
      case "ISSUE":
        return "⚠️";
      case "USER":
        return "👤";
      default:
        return "📝";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "WORK_ORDER":
        return "primary";
      case "ISSUE":
        return "error";
      case "USER":
        return "info";
      default:
        return "info";
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
    <div className="activity-item">
      <div className={`activity-icon ${getActivityColor(activity.type)}`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="activity-content">
        <p className="activity-message">{activity.description}</p>
        <p className="activity-time">{formatTimeAgo(activity.timestamp)}</p>
      </div>
    </div>
  );
};

export const RecentActivities: React.FC = () => {
  const { data: activities, isLoading, error } = useRecentActivities();

  if (isLoading) {
    return (
      <div className="recent-activities-card">
        <h3>최근 활동</h3>
        <div className="activities-list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="activity-item loading">
              <div className="skeleton-icon"></div>
              <div className="activity-content">
                <div className="skeleton-message"></div>
                <div className="skeleton-time"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-activities-card">
        <h3>최근 활동</h3>
        <div className="activities-list">
          <p className="error-message">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-activities-card">
      <h3>최근 활동</h3>
      <div className="activities-list">
        {activities && activities.length > 0 ? (
          activities
            .slice(0, 5)
            .map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))
        ) : (
          <p className="no-activities">최근 활동이 없습니다.</p>
        )}
      </div>
    </div>
  );
};
