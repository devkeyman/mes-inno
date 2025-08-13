import React, { useState } from "react";
import {
  useWorkOrders,
  useDeleteWorkOrder,
} from "@/features/production/hooks/use-work-orders";
import { WorkOrder, WorkOrderStatus } from "@/entities/production";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Select } from "@/shared/components/ui/select";
import { Card } from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

interface WorkOrdersTableProps {
  onEdit: (workOrder: WorkOrder) => void;
  onView: (workOrder: WorkOrder) => void;
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

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-600 min-w-[2.5rem]">{progress}%</span>
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
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 필터 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
            상태 필터:
          </label>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40"
          >
            <option value="">전체</option>
            <option value="PENDING">대기</option>
            <option value="IN_PROGRESS">진행 중</option>
            <option value="COMPLETED">완료</option>
            <option value="CANCELLED">취소</option>
          </Select>
        </div>
        <div className="text-sm text-gray-600">
          총 {filteredWorkOrders.length}개
        </div>
      </div>

      {/* 테이블 */}
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>작업 번호</TableHead>
                <TableHead>제품명</TableHead>
                <TableHead>수량</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>진행률</TableHead>
                <TableHead>담당자</TableHead>
                <TableHead>생성일</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkOrders.length > 0 ? (
                filteredWorkOrders.map((workOrder: WorkOrder) => (
                  <TableRow key={workOrder.id}>
                    <TableCell className="font-medium">{workOrder.orderNumber}</TableCell>
                    <TableCell>{workOrder.productName}</TableCell>
                    <TableCell>{workOrder.quantity.toLocaleString()}개</TableCell>
                    <TableCell>
                      <StatusBadge status={workOrder.status} />
                    </TableCell>
                    <TableCell className="w-40">
                      <ProgressBar progress={workOrder.progress || 0} />
                    </TableCell>
                    <TableCell>{workOrder.assignedToName || "-"}</TableCell>
                    <TableCell>
                      {new Date(workOrder.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(workOrder)}
                          title="상세보기"
                        >
                          👁️
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(workOrder)}
                          title="수정"
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(workOrder.id)}
                          title="삭제"
                        >
                          🗑️
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    작업 지시서가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
