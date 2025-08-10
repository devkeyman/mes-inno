import apiClient from "./client";
import {
  WorkOrder,
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
  CompleteWorkRequest,
  UpdateProgressRequest,
  WorkLog,
  CreateWorkLogRequest,
} from "@/entities/production";
import { WorkOrderQueryParams, WorkLogQueryParams } from "@/shared/types";

export const workOrdersApi = {
  // 모든 작업 지시서 조회
  getAll: async (params?: WorkOrderQueryParams): Promise<{ data: WorkOrder[] }> => {
    const response = await apiClient.get<{ data: WorkOrder[] }>("/work-orders", {
      params,
    });
    return response.data;
  },

  // 작업 지시서 ID로 조회
  getById: async (id: number): Promise<WorkOrder> => {
    const response = await apiClient.get<WorkOrder>(`/work-orders/${id}`);
    return response.data;
  },

  // 작업 지시서 생성
  create: async (workOrderData: CreateWorkOrderRequest): Promise<WorkOrder> => {
    const response = await apiClient.post<WorkOrder>(
      "/work-orders",
      workOrderData
    );
    return response.data;
  },

  // 작업 지시서 수정
  update: async (
    id: number,
    workOrderData: UpdateWorkOrderRequest
  ): Promise<WorkOrder> => {
    const response = await apiClient.put<WorkOrder>(
      `/work-orders/${id}`,
      workOrderData
    );
    return response.data;
  },

  // 작업 지시서 삭제
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/work-orders/${id}`);
  },

  // 작업 시작
  start: async (id: number): Promise<WorkOrder> => {
    const response = await apiClient.put<WorkOrder>(`/work-orders/${id}/start`);
    return response.data;
  },

  // 작업 완료
  complete: async (
    id: number,
    completeData: CompleteWorkRequest
  ): Promise<WorkOrder> => {
    const response = await apiClient.put<WorkOrder>(
      `/work-orders/${id}/complete`,
      completeData
    );
    return response.data;
  },

  // 진행률 업데이트
  updateProgress: async (
    id: number,
    progressData: UpdateProgressRequest
  ): Promise<WorkOrder> => {
    const response = await apiClient.put<WorkOrder>(
      `/work-orders/${id}/progress`,
      progressData
    );
    return response.data;
  },
};

export const workLogsApi = {
  // 모든 작업 로그 조회
  getAll: async (params?: WorkLogQueryParams): Promise<WorkLog[]> => {
    const response = await apiClient.get<WorkLog[]>("/work-logs", { params });
    return response.data;
  },

  // 작업 로그 ID로 조회
  getById: async (id: number): Promise<WorkLog> => {
    const response = await apiClient.get<WorkLog>(`/work-logs/${id}`);
    return response.data;
  },

  // 작업 로그 생성
  create: async (workLogData: CreateWorkLogRequest): Promise<WorkLog> => {
    const response = await apiClient.post<WorkLog>("/work-logs", workLogData);
    return response.data;
  },

  // 작업 지시서별 로그 조회
  getByWorkOrder: async (workOrderId: number): Promise<WorkLog[]> => {
    const response = await apiClient.get<WorkLog[]>(
      `/work-logs/work-order/${workOrderId}`
    );
    return response.data;
  },
};
