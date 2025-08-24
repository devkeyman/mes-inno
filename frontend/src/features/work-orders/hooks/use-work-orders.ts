import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workOrderApi } from "@/shared/api/work-orders";
import {
  WorkOrder,
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
  WorkOrderPageParams,
} from "@/entities/work-order";
import { useState } from "react";

export const useWorkOrders = (initialParams?: WorkOrderPageParams) => {
  const [params, setParams] = useState<WorkOrderPageParams>(initialParams || {
    page: 1,
    limit: 10,
    sort: "createdAt",
    order: "desc",
  });

  const query = useQuery({
    queryKey: ["work-orders", params],
    queryFn: () => workOrderApi.getAll(params),
    staleTime: 30000,
  });

  const updateParams = (newParams: Partial<WorkOrderPageParams>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
      filters: {
        ...prev.filters,
        ...newParams.filters,
      },
    }));
  };

  return {
    workOrders: query.data?.data || [],
    total: query.data?.total || 0,
    totalPages: query.data?.totalPages || 0,
    currentPage: query.data?.page || 1,
    isLoading: query.isLoading,
    error: query.error,
    params,
    updateParams,
    refetch: query.refetch,
  };
};

export const useWorkOrder = (id: number) => {
  return useQuery({
    queryKey: ["work-orders", id],
    queryFn: () => workOrderApi.getById(id),
    enabled: !!id,
    staleTime: 30000,
  });
};

export const useCreateWorkOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkOrderRequest) => workOrderApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
    },
  });
};

export const useUpdateWorkOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateWorkOrderRequest }) =>
      workOrderApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      queryClient.setQueryData(["work-orders", data.id], data);
    },
  });
};

export const useUpdateWorkOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: WorkOrder["status"] }) =>
      workOrderApi.updateStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      queryClient.setQueryData(["work-orders", data.id], data);
    },
  });
};

export const useDeleteWorkOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => workOrderApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
    },
  });
};