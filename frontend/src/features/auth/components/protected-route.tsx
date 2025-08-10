import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/shared/stores";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();

  // 로딩 중일 때는 로딩 표시
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>인증 확인 중...</p>
      </div>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 특정 역할이 필요한 경우 권한 확인
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="unauthorized-container">
        <h2>접근 권한이 없습니다</h2>
        <p>이 페이지에 접근할 권한이 없습니다.</p>
        <button onClick={() => window.history.back()}>
          이전 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
