import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "medium",
  text = "로딩 중...",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className={`loading-container ${className}`}>
      <div className={`loading-spinner ${sizeClasses[size]}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};
