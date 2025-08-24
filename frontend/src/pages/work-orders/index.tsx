import React from "react";
import { WorkOrderList, WorkOrderForm, WorkOrderDetail } from "@/widgets/work-orders";

export const WorkOrdersPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">작업지시서 관리</h1>
        <p className="text-gray-600 mt-1">
          생산 작업지시서를 관리하고 진행 상황을 모니터링합니다.
        </p>
      </div>
      
      <WorkOrderList />
      <WorkOrderForm />
      <WorkOrderDetail />
    </div>
  );
};