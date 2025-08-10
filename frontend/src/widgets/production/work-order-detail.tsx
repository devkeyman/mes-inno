import React from "react";
import {
  WorkOrder,
  WorkOrderStatus,
  WorkOrderPriority,
} from "@/entities/production";

interface WorkOrderDetailProps {
  workOrder: WorkOrder;
  onEdit: () => void;
  onClose: () => void;
}

const StatusBadge: React.FC<{ status: WorkOrderStatus }> = ({ status }) => {
  const getStatusConfig = (status: WorkOrderStatus) => {
    switch (status) {
      case "PENDING":
        return { label: "대기", className: "status-pending" };
      case "IN_PROGRESS":
        return { label: "진행 중", className: "status-progress" };
      case "COMPLETED":
        return { label: "완료", className: "status-completed" };
      case "CANCELLED":
        return { label: "취소", className: "status-cancelled" };
      default:
        return { label: status, className: "status-default" };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`status-badge ${config.className}`}>{config.label}</span>
  );
};

const PriorityBadge: React.FC<{ priority: WorkOrderPriority }> = ({
  priority,
}) => {
  const getPriorityConfig = (priority: WorkOrderPriority) => {
    switch (priority) {
      case "LOW":
        return { label: "낮음", className: "priority-low" };
      case "MEDIUM":
        return { label: "보통", className: "priority-normal" };
      case "HIGH":
        return { label: "높음", className: "priority-high" };
      case "URGENT":
        return { label: "긴급", className: "priority-urgent" };
      default:
        return { label: priority, className: "priority-default" };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <span className={`priority-badge ${config.className}`}>{config.label}</span>
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
    <div className="work-order-detail">
      <div className="detail-header">
        <h2>작업 지시서 상세</h2>
        <div className="detail-actions">
          <button onClick={onEdit} className="btn-secondary">
            수정
          </button>
          <button onClick={onClose} className="btn-close">
            ✕
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>기본 정보</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>작업 번호</label>
              <span>{workOrder.orderNumber}</span>
            </div>
            <div className="detail-item">
              <label>제품명</label>
              <span>{workOrder.productName}</span>
            </div>
            <div className="detail-item">
              <label>수량</label>
              <span>{workOrder.quantity.toLocaleString()}개</span>
            </div>
            <div className="detail-item">
              <label>상태</label>
              <StatusBadge status={workOrder.status} />
            </div>
            <div className="detail-item">
              <label>우선순위</label>
              <PriorityBadge priority={workOrder.priority} />
            </div>
            <div className="detail-item">
              <label>진행률</label>
              <span>{workOrder.progress || 0}%</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>담당 정보</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>담당자</label>
              <span>{workOrder.assignedToName || "미지정"}</span>
            </div>
            <div className="detail-item">
              <label>생성일</label>
              <span>{formatDate(workOrder.createdAt)}</span>
            </div>
            <div className="detail-item">
              <label>수정일</label>
              <span>{formatDate(workOrder.updatedAt)}</span>
            </div>
            {workOrder.dueDate && (
              <div className="detail-item">
                <label>완료 예정일</label>
                <span>{formatDate(workOrder.dueDate)}</span>
              </div>
            )}
          </div>
        </div>

        {workOrder.instructions && (
          <div className="detail-section">
            <h3>설명</h3>
            <div className="detail-description">
              <p>{workOrder.instructions}</p>
            </div>
          </div>
        )}

        <div className="detail-section">
          <h3>진행 상황</h3>
          <div className="progress-overview">
            <div className="progress-bar-large">
              <div
                className="progress-fill-large"
                style={{ width: `${Math.min(workOrder.progress || 0, 100)}%` }}
              ></div>
            </div>
            <div className="progress-info">
              <span className="progress-text">
                {workOrder.progress || 0}% 완료
              </span>
              <span className="progress-remaining">
                {workOrder.progress && workOrder.progress < 100
                  ? `${100 - workOrder.progress}% 남음`
                  : "완료됨"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
