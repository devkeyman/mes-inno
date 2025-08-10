import React from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "@/features/auth/hooks/use-auth";
import { useAuthStore } from "@/shared/stores";

const Navigation: React.FC = () => {
  const { user } = useAuthStore();
  const logout = useLogout();
  const handleLogout = async () => {
    try {
      await logout.mutateAsync({ email: user?.email || "" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="main-navigation">
      <div className="nav-header">
        <h1 className="nav-title">Smart Factory MES</h1>
      </div>

      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            end
          >
            대시보드
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/production"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            생산 관리
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/issues"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            이슈 관리
          </NavLink>
        </li>
      </ul>

      <div className="nav-footer">
        <div className="user-info">
          <span className="user-name">{user?.name || "사용자"}</span>
          <span className="user-email">{user?.email || ""}</span>
          <button
            className="logout-btn"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            {logout.isPending ? "로그아웃 중..." : "로그아웃"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
