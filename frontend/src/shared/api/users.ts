import apiClient from "./client";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
} from "@/entities/user";

export const usersApi = {
  // 모든 사용자 조회
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  },

  // 사용자 ID로 조회
  getById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  // 사용자 생성
  create: async (userData: CreateUserRequest): Promise<User> => {
    const response = await apiClient.post<User>("/users", userData);
    return response.data;
  },

  // 사용자 수정
  update: async (id: number, userData: UpdateUserRequest): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, userData);
    return response.data;
  },

  // 사용자 삭제
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  // 비밀번호 변경
  changePassword: async (
    id: number,
    passwordData: ChangePasswordRequest
  ): Promise<{ message: string }> => {
    const response = await apiClient.put<{ message: string }>(
      `/users/${id}/password`,
      passwordData
    );
    return response.data;
  },
};
