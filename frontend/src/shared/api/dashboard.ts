import apiClient from "./client";
import {
  DashboardStats,
  ProductionSummary,
  RecentActivity,
  DashboardQueryParams,
} from "@/shared/types";
import { WorkOrder } from "@/entities/production";
import { Issue } from "@/entities/issues";

export const dashboardApi = {
  // 대시보드 통계 조회
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>("/dashboard/stats");
    return response.data;
  },

  // 최근 작업 지시서 조회
  getRecentWorkOrders: async (
    params?: DashboardQueryParams
  ): Promise<WorkOrder[]> => {
    const response = await apiClient.get<WorkOrder[]>(
      "/dashboard/recent-work-orders",
      { params }
    );
    return response.data;
  },

  // 최근 이슈 조회
  getRecentIssues: async (params?: DashboardQueryParams): Promise<Issue[]> => {
    const response = await apiClient.get<Issue[]>("/dashboard/recent-issues", {
      params,
    });
    return response.data;
  },

  // 최근 활동 조회
  getRecentActivities: async (
    params?: DashboardQueryParams
  ): Promise<RecentActivity[]> => {
    const response = await apiClient.get<RecentActivity[]>(
      "/dashboard/recent-activities",
      { params }
    );
    return response.data;
  },

  // 생산 요약 조회
  getProductionSummary: async (
    params?: DashboardQueryParams
  ): Promise<ProductionSummary> => {
    const response = await apiClient.get<ProductionSummary>(
      "/dashboard/production-summary",
      { params }
    );
    return response.data;
  },
};
