import React, { useState, useEffect } from "react";
import {
  Issue,
  CreateIssueRequest,
  UpdateIssueRequest,
} from "@/entities/issues";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card } from "@/shared/components/ui/card";

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
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? "이슈 수정" : "새 이슈 등록"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">
            제목 <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="이슈 제목을 입력하세요"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">
              유형
            </Label>
            <Select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="EQUIPMENT">설비</option>
              <option value="QUALITY">품질</option>
              <option value="SAFETY">안전</option>
              <option value="PROCESS">공정</option>
              <option value="OTHER">기타</option>
            </Select>
          </div>

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
              <option value="MEDIUM">보통</option>
              <option value="HIGH">높음</option>
              <option value="CRITICAL">긴급</option>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workOrderId">
            작업 지시서 ID <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            id="workOrderId"
            name="workOrderId"
            value={formData.workOrderId}
            onChange={handleInputChange}
            placeholder="작업 지시서 ID를 입력하세요"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            설명 <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="이슈에 대한 상세 설명을 입력하세요"
            rows={6}
            required
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
            {isLoading ? "처리 중..." : isEdit ? "수정" : "등록"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
