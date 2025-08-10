import apiClient from "./client";
import {
  Issue,
  CreateIssueRequest,
  UpdateIssueRequest,
  ResolveIssueRequest,
} from "@/entities/issues";
import { IssueQueryParams } from "@/shared/types";

export const issuesApi = {
  // 모든 이슈 조회
  getAll: async (params?: IssueQueryParams): Promise<{ data: Issue[] }> => {
    const response = await apiClient.get<{ data: Issue[] }>("/issues", { params });
    return response.data;
  },

  // 이슈 ID로 조회
  getById: async (id: number): Promise<Issue> => {
    const response = await apiClient.get<Issue>(`/issues/${id}`);
    return response.data;
  },

  // 이슈 생성
  create: async (issueData: CreateIssueRequest): Promise<Issue> => {
    const response = await apiClient.post<Issue>("/issues", issueData);
    return response.data;
  },

  // 이슈 수정
  update: async (id: number, issueData: UpdateIssueRequest): Promise<Issue> => {
    const response = await apiClient.put<Issue>(`/issues/${id}`, issueData);
    return response.data;
  },

  // 이슈 삭제
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/issues/${id}`);
  },

  // 이슈 해결
  resolve: async (
    id: number,
    resolveData: ResolveIssueRequest
  ): Promise<Issue> => {
    const response = await apiClient.put<Issue>(
      `/issues/${id}/resolve`,
      resolveData
    );
    return response.data;
  },
};
