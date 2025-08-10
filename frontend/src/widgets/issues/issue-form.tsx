import React, { useState, useEffect } from "react";
import {
  Issue,
  CreateIssueRequest,
  UpdateIssueRequest,
} from "@/entities/issues";

interface IssueFormProps {
  issue?: Issue;
  onSubmit: (data: CreateIssueRequest | UpdateIssueRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const IssueForm: React.FC<IssueFormProps> = ({
  issue,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const isEdit = !!issue;

  const [formData, setFormData] = useState<CreateIssueRequest>({
    title: "",
    description: "",
    type: "OTHER",
    priority: "MEDIUM",
    workOrderId: 0, // 기본값 추가
  });

  useEffect(() => {
    if (issue) {
      setFormData({
        title: issue.title,
        description: issue.description,
        type: issue.type,
        priority: issue.priority,
        workOrderId: issue.workOrderId,
      });
    }
  }, [issue]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.title.trim() && formData.description.trim();

  return (
    <div className="issue-form">
      <div className="form-header">
        <h2>{isEdit ? "이슈 수정" : "새 이슈 등록"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            제목 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="이슈 제목을 입력하세요"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type" className="form-label">
              유형
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="EQUIPMENT">설비</option>
              <option value="QUALITY">품질</option>
              <option value="SAFETY">안전</option>
              <option value="PROCESS">공정</option>
              <option value="OTHER">기타</option>
            </select>
          </div>

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
              <option value="MEDIUM">보통</option>
              <option value="HIGH">높음</option>
              <option value="CRITICAL">긴급</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="workOrderId" className="form-label">
            작업 지시서 ID <span className="required">*</span>
          </label>
          <input
            type="number"
            id="workOrderId"
            name="workOrderId"
            value={formData.workOrderId}
            onChange={handleInputChange}
            className="form-input"
            placeholder="작업 지시서 ID를 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            설명 <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="이슈에 대한 상세 설명을 입력하세요"
            rows={6}
            required
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
            {isLoading ? "처리 중..." : isEdit ? "수정" : "등록"}
          </button>
        </div>
      </form>
    </div>
  );
};
