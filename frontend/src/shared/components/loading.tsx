import React from "react";
import { cn } from "@/shared/lib/utils";

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
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-gray-200 border-t-primary",
          sizeClasses[size]
        )}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
