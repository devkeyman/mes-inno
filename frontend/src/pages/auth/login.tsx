import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "@/features/auth/hooks/use-auth";
import { useAuthStore } from "@/shared/stores";
import { LoginRequest } from "@/entities/user";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const login = useLogin();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 이미 인증된 사용자는 메인 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 해당 필드 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login.mutateAsync(formData);
    } catch (error) {
      // 에러는 useLogin 훅에서 처리됨
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Smart Factory MES</h1>
          <p>스마트 팩토리 제조 실행 시스템</p>
        </div>

        <div className="login-form-container">
          <h2>로그인</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="이메일을 입력하세요"
                disabled={login.isPending}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? "error" : ""}`}
                placeholder="비밀번호를 입력하세요"
                disabled={login.isPending}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {login.error && (
              <div className="login-error">
                <p>로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.</p>
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={login.isPending}
            >
              {login.isPending ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="login-footer">
            <p>테스트 계정</p>
            <div className="test-accounts">
              <div className="test-account">
                <strong>관리자:</strong> admin@mes.com / password123
              </div>
              <div className="test-account">
                <strong>작업자:</strong> worker@mes.com / password123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
