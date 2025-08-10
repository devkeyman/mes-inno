import React, { useState, useEffect } from "react";
import {
  WorkOrder,
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
} from "@/entities/production";

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
    <div className="work-order-form">
      <div className="form-header">
        <h2>{isEdit ? "작업 지시서 수정" : "새 작업 지시서 생성"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="orderNumber" className="form-label">
              주문번호 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleInputChange}
              className="form-input"
              placeholder="주문번호를 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="productCode" className="form-label">
              제품코드 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="productCode"
              name="productCode"
              value={formData.productCode}
              onChange={handleInputChange}
              className="form-input"
              placeholder="제품코드를 입력하세요"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productName" className="form-label">
              제품명 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="제품명을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity" className="form-label">
              수량 <span className="required">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="form-input"
              placeholder="0"
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              우선순위
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="LOW">낮음</option>
              <option value="NORMAL">보통</option>
              <option value="HIGH">높음</option>
              <option value="URGENT">긴급</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              완료 예정일
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="assignedToId" className="form-label">
              담당자 ID
            </label>
            <input
              type="number"
              id="assignedToId"
              name="assignedToId"
              value={formData.assignedToId}
              onChange={handleInputChange}
              className="form-input"
              placeholder="담당자 ID를 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo" className="form-label">
              담당자명
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              className="form-input"
              placeholder="담당자명을 입력하세요"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="instructions" className="form-label">
            작업 지시사항
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="작업 지시사항을 입력하세요"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="작업 지시서에 대한 상세 설명을 입력하세요"
            rows={4}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "처리 중..." : isEdit ? "수정" : "생성"}
          </button>
        </div>
      </form>
    </div>
  );
};
