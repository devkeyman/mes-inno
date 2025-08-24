import apiClient from "./client";
import {
  WorkOrder,
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
  WorkOrderPageParams,
  WorkOrderPageResponse,
} from "@/entities/work-order";

export const workOrderApi = {
  getAll: async (params?: WorkOrderPageParams): Promise<WorkOrderPageResponse> => {
    const response = await apiClient.get<WorkOrderPageResponse>("/work-orders", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        sort: params?.sort || "createdAt",
        order: params?.order || "desc",
        ...params?.filters,
      },
    });
    return response.data;
  },

  getById: async (id: number): Promise<WorkOrder> => {
    const response = await apiClient.get<WorkOrder>(`/work-orders/${id}`);
    return response.data;
  },

  create: async (data: CreateWorkOrderRequest): Promise<WorkOrder> => {
    const response = await apiClient.post<WorkOrder>("/work-orders", data);
    return response.data;
  },

  update: async (id: number, data: UpdateWorkOrderRequest): Promise<WorkOrder> => {
    const response = await apiClient.put<WorkOrder>(`/work-orders/${id}`, data);
    return response.data;
  },

  updateStatus: async (id: number, status: WorkOrder['status']): Promise<WorkOrder> => {
    const response = await apiClient.patch<WorkOrder>(`/work-orders/${id}/status`, {
      status,
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/work-orders/${id}`);
  },
};