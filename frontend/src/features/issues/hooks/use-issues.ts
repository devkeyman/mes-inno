import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { issuesApi } from "@/shared/api/issues";
import {
  CreateIssueRequest,
  UpdateIssueRequest,
  ResolveIssueRequest,
} from "@/entities/issues";
import { IssueQueryParams } from "@/shared/types";

// 이슈 목록 조회
export const useIssues = (params?: IssueQueryParams) => {
  return useQuery({
    queryKey: ["issues", params],
    queryFn: () => issuesApi.getAll(params),
    staleTime: 1 * 60 * 1000, // 1분
  });
};

// 이슈 상세 조회
export const useIssue = (id: number) => {
  return useQuery({
    queryKey: ["issue", id],
    queryFn: () => issuesApi.getById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2분
  });
};

// 이슈 생성
export const useCreateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIssueRequest) => issuesApi.create(data),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

// 이슈 수정
export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateIssueRequest }) =>
      issuesApi.update(id, data),
    onSuccess: (_, { id }) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["issue", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

// 이슈 삭제
export const useDeleteIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => issuesApi.delete(id),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

// 이슈 해결
export const useResolveIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ResolveIssueRequest }) =>
      issuesApi.resolve(id, data),
    onSuccess: (_, { id }) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["issue", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
