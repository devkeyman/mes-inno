import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/shared/api/dashboard";
import { DashboardQueryParams } from "@/shared/types";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => dashboardApi.getStats(),
    staleTime: 2 * 60 * 1000, // 2분
  });
};

export const useRecentWorkOrders = (params?: DashboardQueryParams) => {
  return useQuery({
    queryKey: ["dashboard", "recent-work-orders", params],
    queryFn: () => dashboardApi.getRecentWorkOrders(params),
    staleTime: 1 * 60 * 1000, // 1분
  });
};

export const useRecentIssues = (params?: DashboardQueryParams) => {
  return useQuery({
    queryKey: ["dashboard", "recent-issues", params],
    queryFn: () => dashboardApi.getRecentIssues(params),
    staleTime: 1 * 60 * 1000, // 1분
  });
};

export const useRecentActivities = (params?: DashboardQueryParams) => {
  return useQuery({
    queryKey: ["dashboard", "recent-activities", params],
    queryFn: () => dashboardApi.getRecentActivities(params),
    staleTime: 30 * 1000, // 30초
  });
};

export const useProductionSummary = (params?: DashboardQueryParams) => {
  return useQuery({
    queryKey: ["dashboard", "production-summary", params],
    queryFn: () => dashboardApi.getProductionSummary(params),
    staleTime: 2 * 60 * 1000, // 2분
  });
};
