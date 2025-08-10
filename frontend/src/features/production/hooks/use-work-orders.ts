import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workOrdersApi } from "@/shared/api/workOrders";
import {
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
  WorkOrderStatus,
} from "@/entities/production";
import { WorkOrderQueryParams } from "@/shared/types";

// 작업 지시서 목록 조회
export const useWorkOrders = (params?: WorkOrderQueryParams) => {
  return useQuery({
    queryKey: ["work-orders", params],
    queryFn: () => workOrdersApi.getAll(params),
    staleTime: 1 * 60 * 1000, // 1분
  });
};

// 작업 지시서 상세 조회
export const useWorkOrder = (id: number) => {
  return useQuery({
    queryKey: ["work-order", id],
    queryFn: () => workOrdersApi.getById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2분
  });
};

// 작업 지시서 생성
export const useCreateWorkOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkOrderRequest) => workOrdersApi.create(data),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

// 작업 지시서 수정
export const useUpdateWorkOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateWorkOrderRequest }) =>
      workOrdersApi.update(id, data),
    onSuccess: (_, { id }) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      queryClient.invalidateQueries({ queryKey: ["work-order", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

// 작업 지시서 삭제
export const useDeleteWorkOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => workOrdersApi.delete(id),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

// 작업 지시서 상태 변경 (start 메서드 사용)
export const useUpdateWorkOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: WorkOrderStatus }) => {
      if (status === "IN_PROGRESS") {
        return workOrdersApi.start(id);
      }
      // 다른 상태 변경은 update 메서드 사용
      return workOrdersApi.update(id, { status });
    },
    onSuccess: (_, { id }) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      queryClient.invalidateQueries({ queryKey: ["work-order", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
