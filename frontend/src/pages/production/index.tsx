import React, { useState } from "react";
import { WorkOrdersTable } from "@/widgets/production/work-orders-table";
import { WorkOrderForm } from "@/widgets/production/work-order-form";
import { WorkOrderDetail } from "@/widgets/production/work-order-detail";
import {
  useCreateWorkOrder,
  useUpdateWorkOrder,
} from "@/features/production/hooks/use-work-orders";
import {
  WorkOrder,
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
} from "@/entities/production";

type ViewMode = "list" | "create" | "edit" | "detail";

const ProductionPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(
    null
  );

  const createWorkOrder = useCreateWorkOrder();
  const updateWorkOrder = useUpdateWorkOrder();

  const handleCreate = () => {
    setSelectedWorkOrder(null);
    setViewMode("create");
  };

  const handleEdit = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setViewMode("edit");
  };

  const handleView = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setViewMode("detail");
  };

  const handleCancel = () => {
    setViewMode("list");
    setSelectedWorkOrder(null);
  };

  const handleSubmit = (
    data: CreateWorkOrderRequest | UpdateWorkOrderRequest
  ) => {
    if (viewMode === "create") {
      createWorkOrder.mutate(data as CreateWorkOrderRequest, {
        onSuccess: () => {
          setViewMode("list");
        },
      });
    } else if (viewMode === "edit" && selectedWorkOrder) {
      updateWorkOrder.mutate(
        { id: selectedWorkOrder.id, data: data as UpdateWorkOrderRequest },
        {
          onSuccess: () => {
            setViewMode("list");
            setSelectedWorkOrder(null);
          },
        }
      );
    }
  };

  const isLoading = createWorkOrder.isPending || updateWorkOrder.isPending;

  return (
    <div className="production-page">
      <header className="page-header">
        <h1>생산 관리</h1>
        <p>작업 지시서 관리 및 생산 현황</p>
      </header>

      <main className="page-content">
        {viewMode === "list" && (
          <>
            <div className="production-controls">
              <button className="btn-primary" onClick={handleCreate}>
                새 작업 지시서
              </button>
            </div>

            <WorkOrdersTable onEdit={handleEdit} onView={handleView} />
          </>
        )}

        {viewMode === "create" && (
          <WorkOrderForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}

        {viewMode === "edit" && selectedWorkOrder && (
          <WorkOrderForm
            workOrder={selectedWorkOrder}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}

        {viewMode === "detail" && selectedWorkOrder && (
          <WorkOrderDetail
            workOrder={selectedWorkOrder}
            onEdit={() => handleEdit(selectedWorkOrder)}
            onClose={handleCancel}
          />
        )}
      </main>
    </div>
  );
};

export default ProductionPage;
