import React from "react";
import { useProductionSummary } from "@/features/dashboard/hooks/use-dashboard";

export const ProductionStatus: React.FC = () => {
  const { data: summary, isLoading, error } = useProductionSummary();

  if (isLoading) {
    return (
      <div className="production-status-card">
        <div className="production-status-header">
          <h3>생산 현황</h3>
          <div className="status-indicator">
            <div className="status-dot loading"></div>
            <span>로딩 중...</span>
          </div>
        </div>
        <div className="production-status-content">
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="production-status-card">
        <div className="production-status-header">
          <h3>생산 현황</h3>
        </div>
        <div className="production-status-content">
          <p className="error-message">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      </div>
    );
  }

  const targetProduction = summary?.totalQuantityOrdered || 1000;
  const currentProduction = summary?.totalQuantityProduced || 0;
  const completionRate = summary?.productionRate || 0;
  const isRunning = (summary?.productionRate || 0) > 0; // 생산률이 0보다 크면 가동 중으로 판단

  return (
    <div className="production-status-card">
      <div className="production-status-header">
        <h3>생산 현황</h3>
        <div className="status-indicator">
          <div
            className={`status-dot ${isRunning ? "success" : "error"}`}
          ></div>
          <span>{isRunning ? "정상 가동" : "정지"}</span>
        </div>
      </div>
      <div className="production-status-content">
        <div className="production-row">
          <span className="production-label">목표 생산량</span>
          <span className="production-value">
            {targetProduction.toLocaleString()}개
          </span>
        </div>
        <div className="production-row">
          <span className="production-label">현재 생산량</span>
          <span className="production-value current">
            {currentProduction.toLocaleString()}개
          </span>
        </div>
        <div className="production-row">
          <span className="production-label">달성률</span>
          <span className="production-value completion">{completionRate}%</span>
        </div>
        <div className="production-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(completionRate, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
