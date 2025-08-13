import React from "react";
import {
  WorkOrder,
  WorkOrderStatus,
  WorkOrderPriority,
} from "@/entities/production";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

interface WorkOrderDetailProps {
  workOrder: WorkOrder;
  onEdit: () => void;
  onClose: () => void;
}

const StatusBadge: React.FC<{ status: WorkOrderStatus }> = ({ status }) => {
  const getStatusConfig = (status: WorkOrderStatus) => {
    switch (status) {
      case "PENDING":
        return { label: "대기", variant: "secondary" as const };
      case "IN_PROGRESS":
        return { label: "진행 중", variant: "default" as const };
      case "COMPLETED":
        return { label: "완료", variant: "success" as const };
      case "CANCELLED":
        return { label: "취소", variant: "destructive" as const };
      default:
        return { label: status, variant: "outline" as const };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant}>{config.label}</Badge>
  );
};

const PriorityBadge: React.FC<{ priority: WorkOrderPriority }> = ({
  priority,
}) => {
  const getPriorityConfig = (priority: WorkOrderPriority) => {
    switch (priority) {
      case "LOW":
        return { label: "낮음", variant: "secondary" as const };
      case "MEDIUM":
        return { label: "보통", variant: "secondary" as const };
      case "HIGH":
        return { label: "높음", variant: "warning" as const };
      case "URGENT":
        return { label: "긴급", variant: "destructive" as const };
      default:
        return { label: priority, variant: "outline" as const };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <Badge variant={config.variant}>{config.label}</Badge>
  );
};

export const WorkOrderDetail: React.FC<WorkOrderDetailProps> = ({
  workOrder,
  onEdit,
  onClose,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR");
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">작업 지시서 상세</h2>
        <div className="flex items-center gap-2">
          <Button onClick={onEdit} variant="outline">
            수정
          </Button>
          <Button onClick={onClose} variant="ghost" size="sm">
            ✕
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">작업 번호</label>
              <span className="block text-gray-900">{workOrder.orderNumber}</span>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">제품명</label>
              <span className="block text-gray-900">{workOrder.productName}</span>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">수량</label>
              <span className="block text-gray-900">{workOrder.quantity.toLocaleString()}개</span>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">상태</label>
              <StatusBadge status={workOrder.status} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">우선순위</label>
              <PriorityBadge priority={workOrder.priority} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">진행률</label>
              <span className="block text-gray-900">{workOrder.progress || 0}%</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">담당 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">담당자</label>
              <span className="block text-gray-900">{workOrder.assignedToName || "미지정"}</span>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">생성일</label>
              <span className="block text-gray-900">{formatDate(workOrder.createdAt)}</span>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">수정일</label>
              <span className="block text-gray-900">{formatDate(workOrder.updatedAt)}</span>
            </div>
            {workOrder.dueDate && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">완료 예정일</label>
                <span className="block text-gray-900">{formatDate(workOrder.dueDate)}</span>
              </div>
            )}
          </div>
        </div>

        {workOrder.instructions && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">설명</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800">{workOrder.instructions}</p>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">진행 상황</h3>
          <div className="space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(workOrder.progress || 0, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-900">
                {workOrder.progress || 0}% 완료
              </span>
              <span className="text-gray-600">
                {workOrder.progress && workOrder.progress < 100
                  ? `${100 - workOrder.progress}% 남음`
                  : "완료됨"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
