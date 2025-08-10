import React from "react";
import {
  StatsCards,
  ProductionStatus,
  RecentActivities,
} from "@/widgets/dashboard";

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1>대시보드</h1>
        <p>스마트 팩토리 MES 시스템 현황</p>
      </header>

      <main className="page-content">
        {/* 통계 카드 */}
        <div className="dashboard-section">
          <StatsCards />
        </div>

        {/* 생산 현황 및 최근 활동 */}
        <div className="dashboard-grid">
          <ProductionStatus />
          <RecentActivities />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
