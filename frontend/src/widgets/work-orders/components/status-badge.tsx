import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { WorkOrderStatus, WorkOrderPriority } from "@/entities/work-order";
import { cn } from "@/shared/lib/utils";

interface StatusBadgeProps {
  status: WorkOrderStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusColor = (status: WorkOrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "COMPLETED":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: WorkOrderStatus) => {
    switch (status) {
      case "PENDING":
        return "대기중";
      case "IN_PROGRESS":
        return "진행중";
      case "COMPLETED":
        return "완료";
      case "CANCELLED":
        return "취소됨";
      default:
        return status;
    }
  };

  return (
    <Badge className={cn(getStatusColor(status), className)}>
      {getStatusLabel(status)}
    </Badge>
  );
};

interface PriorityBadgeProps {
  priority: WorkOrderPriority;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const getPriorityColor = (priority: WorkOrderPriority) => {
    switch (priority) {
      case "LOW":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "NORMAL":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "HIGH":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "URGENT":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority: WorkOrderPriority) => {
    switch (priority) {
      case "LOW":
        return "낮음";
      case "NORMAL":
        return "보통";
      case "MEDIUM":
        return "중간";
      case "HIGH":
        return "높음";
      case "URGENT":
        return "긴급";
      default:
        return priority;
    }
  };

  return (
    <Badge className={cn(getPriorityColor(priority), className)}>
      {getPriorityLabel(priority)}
    </Badge>
  );
};