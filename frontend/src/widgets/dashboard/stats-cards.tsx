import React from "react";
import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <div className="stats-card">
      <div className="stats-card-content">
        <div className="stats-card-info">
          <h3 className="stats-card-title">{title}</h3>
          <p className="stats-card-value">{value}</p>
          <p className="stats-card-subtitle">{subtitle}</p>
        </div>
        <div className={`stats-card-icon ${color}`}>{icon}</div>
      </div>
    </div>
  );
};

export const StatsCards: React.FC = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stats-card loading">
            <div className="stats-card-content">
              <div className="stats-card-info">
                <div className="skeleton-title"></div>
                <div className="skeleton-value"></div>
                <div className="skeleton-subtitle"></div>
              </div>
              <div className="skeleton-icon"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-grid">
        <div className="stats-card error">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "총 작업 지시서",
      value: stats?.totalWorkOrders || 0,
      subtitle: "이번 달",
      icon: "📋",
      color: "primary",
    },
    {
      title: "진행 중",
      value: stats?.inProgressWorkOrders || 0,
      subtitle: "현재 작업",
      icon: "⏳",
      color: "warning",
    },
    {
      title: "완료율",
      value: `${stats?.averageCompletionRate || 0}%`,
      subtitle: "목표 대비",
      icon: "✅",
      color: "success",
    },
    {
      title: "개선 이슈",
      value: stats?.openIssues || 0,
      subtitle: "해결 대기",
      icon: "⚠️",
      color: "error",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  );
};
