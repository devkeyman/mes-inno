import React, { useState, useEffect } from "react";
import {
  WorkOrder,
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
} from "@/entities/production";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card } from "@/shared/components/ui/card";

interface WorkOrderFormProps {
  workOrder?: WorkOrder;
  onSubmit: (data: CreateWorkOrderRequest | UpdateWorkOrderRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const WorkOrderForm: React.FC<WorkOrderFormProps> = ({
  workOrder,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const isEdit = !!workOrder;

  const [formData, setFormData] = useState<CreateWorkOrderRequest>({
    orderNumber: "",
    productName: "",
    productCode: "",
    quantity: 0,
    priority: "NORMAL",
    instructions: "",
    description: "",
    assignedToId: 0,
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
    if (workOrder) {
      setFormData({
        orderNumber: workOrder.orderNumber,
        productName: workOrder.productName,
        productCode: workOrder.productCode,
        quantity: workOrder.quantity,
        priority: workOrder.priority,
        instructions: workOrder.instructions,
        description: workOrder.description || "",
        assignedToId: workOrder.assignedToId,
        assignedTo: workOrder.assignedToName || "",
        dueDate: workOrder.dueDate
          ? new Date(workOrder.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [workOrder]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.productName.trim() && formData.quantity > 0;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? "작업 지시서 수정" : "새 작업 지시서 생성"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="orderNumber">
              주문번호 <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleInputChange}
              placeholder="주문번호를 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productCode">
              제품코드 <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="productCode"
              name="productCode"
              value={formData.productCode}
              onChange={handleInputChange}
              placeholder="제품코드를 입력하세요"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="productName">
              제품명 <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="제품명을 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">
              수량 <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="0"
              min="1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">
              우선순위
            </Label>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="LOW">낮음</option>
              <option value="NORMAL">보통</option>
              <option value="HIGH">높음</option>
              <option value="URGENT">긴급</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">
              완료 예정일
            </Label>
            <Input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="assignedToId">
              담당자 ID
            </Label>
            <Input
              type="number"
              id="assignedToId"
              name="assignedToId"
              value={formData.assignedToId}
              onChange={handleInputChange}
              placeholder="담당자 ID를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">
              담당자명
            </Label>
            <Input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              placeholder="담당자명을 입력하세요"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructions">
            작업 지시사항
          </Label>
          <Textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            placeholder="작업 지시사항을 입력하세요"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            설명
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="작업 지시서에 대한 상세 설명을 입력하세요"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "처리 중..." : isEdit ? "수정" : "생성"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
