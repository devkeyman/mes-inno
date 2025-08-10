import React, { useState } from "react";
import { LoginRequest } from "@/entities/user";

interface LoginFormProps {
  onLogin: (credentials: LoginRequest) => Promise<void>;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading = false }) => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      
      <button 
        type="submit" 
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
};

export default LoginForm;
