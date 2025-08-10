import React, { useState } from "react";
import {
  useWorkOrders,
  useDeleteWorkOrder,
} from "@/features/production/hooks/use-work-orders";
import { WorkOrder, WorkOrderStatus } from "@/entities/production";

interface WorkOrdersTableProps {
  onEdit: (workOrder: WorkOrder) => void;
  onView: (workOrder: WorkOrder) => void;
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

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      <span className="progress-text">{progress}%</span>
    </div>
  );
};

export const WorkOrdersTable: React.FC<WorkOrdersTableProps> = ({
  onEdit,
  onView,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { data: workOrdersResponse, isLoading, error } = useWorkOrders();
  const deleteWorkOrder = useDeleteWorkOrder();

  const workOrders = workOrdersResponse?.data || [];

  const filteredWorkOrders = statusFilter
    ? workOrders.filter((wo: WorkOrder) => wo.status === statusFilter)
    : workOrders;



  const handleDelete = (id: number) => {
    if (window.confirm("정말로 이 작업 지시서를 삭제하시겠습니까?")) {
      deleteWorkOrder.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="work-orders-table">
        <div className="table-loading">
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="work-orders-table">
        <div className="table-error">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="work-orders-table">
      {/* 필터 */}
      <div className="table-filters">
        <div className="filter-group">
          <label htmlFor="status-filter">상태 필터:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">전체</option>
            <option value="PENDING">대기</option>
            <option value="IN_PROGRESS">진행 중</option>
            <option value="COMPLETED">완료</option>
            <option value="CANCELLED">취소</option>
          </select>
        </div>
        <div className="table-info">
          <span>총 {filteredWorkOrders.length}개</span>
        </div>
      </div>

      {/* 테이블 */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>작업 번호</th>
              <th>제품명</th>
              <th>수량</th>
              <th>상태</th>
              <th>진행률</th>
              <th>담당자</th>
              <th>생성일</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkOrders.length > 0 ? (
              filteredWorkOrders.map((workOrder: WorkOrder) => (
                <tr key={workOrder.id} className="table-row">
                  <td className="work-order-id">{workOrder.orderNumber}</td>
                  <td className="product-name">{workOrder.productName}</td>
                  <td className="quantity">
                    {workOrder.quantity.toLocaleString()}개
                  </td>
                  <td className="status">
                    <StatusBadge status={workOrder.status} />
                  </td>
                  <td className="progress">
                    <ProgressBar progress={workOrder.progress || 0} />
                  </td>
                  <td className="assignedTo">{workOrder.assignedToName || "-"}</td>
                  <td className="createdAt">
                    {new Date(workOrder.createdAt).toLocaleDateString()}
                  </td>
                  <td className="actions">
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-view"
                        onClick={() => onView(workOrder)}
                        title="상세보기"
                      >
                        👁️
                      </button>
                      <button
                        className="btn-action btn-edit"
                        onClick={() => onEdit(workOrder)}
                        title="수정"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(workOrder.id)}
                        title="삭제"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-data">
                  작업 지시서가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
