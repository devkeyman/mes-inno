import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/api/auth";
import { useAuthStore } from "@/shared/stores";
import {
  LoginRequest,
  RefreshTokenRequest,
  LogoutRequest,
} from "@/entities/user";

// 로그인 훅
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setTokens, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      setLoading(true);
      try {
        const response = await authApi.login(credentials);
        return response;
      } finally {
        setLoading(false);
      }
    },
    onSuccess: (data) => {
      // 사용자 정보와 토큰 저장
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

// 토큰 갱신 훅
export const useRefreshToken = () => {
  const { setTokens } = useAuthStore();

  return useMutation({
    mutationFn: async (refreshToken: RefreshTokenRequest) => {
      const response = await authApi.refresh(refreshToken);
      return response;
    },
    onSuccess: (data) => {
      // 새로운 토큰 저장
      setTokens(data.accessToken, data.refreshToken);
    },
    onError: (error) => {
      console.error("Token refresh failed:", error);
    },
  });
};

// 로그아웃 훅
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async (logoutData: LogoutRequest) => {
      const response = await authApi.logout(logoutData);
      return response;
    },
    onSuccess: () => {
      // 로컬 상태 정리
      logout();

      // 모든 쿼리 캐시 무효화
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // 에러가 발생해도 로컬 상태는 정리
      logout();
      queryClient.clear();
    },
  });
};
