import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.isPositive ? "text-success" : "text-error"
            }`}
          >
            {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>

      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </div>
  );
};

export default StatsCard;
