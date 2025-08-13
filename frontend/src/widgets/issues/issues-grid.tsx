import React, { useState } from "react";
import { useIssues, useDeleteIssue } from "@/features/issues/hooks/use-issues";
import {
  Issue,
  IssueStatus,
  IssuePriority,
  IssueType,
} from "@/entities/issues";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Select } from "@/shared/components/ui/select";
import { Card } from "@/shared/components/ui/card";

interface IssuesGridProps {
  onEdit: (issue: Issue) => void;
  onView: (issue: Issue) => void;
}

const StatusBadge: React.FC<{ status: IssueStatus }> = ({ status }) => {
  const getStatusConfig = (status: IssueStatus) => {
    switch (status) {
      case "OPEN":
        return { label: "대기", variant: "secondary" as const };
      case "IN_PROGRESS":
        return { label: "진행 중", variant: "default" as const };
      case "RESOLVED":
        return { label: "해결됨", variant: "success" as const };
      case "CLOSED":
        return { label: "종료", variant: "outline" as const };
      default:
        return { label: status, variant: "outline" as const };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant}>{config.label}</Badge>
  );
};

const PriorityBadge: React.FC<{ priority: IssuePriority }> = ({ priority }) => {
  const getPriorityConfig = (priority: IssuePriority) => {
    switch (priority) {
      case "LOW":
        return { label: "낮음", variant: "secondary" as const };
      case "MEDIUM":
        return { label: "보통", variant: "warning" as const };
      case "HIGH":
        return { label: "높음", variant: "destructive" as const };
      case "CRITICAL":
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

const TypeBadge: React.FC<{ type: IssueType }> = ({ type }) => {
  const getTypeConfig = (type: IssueType) => {
    switch (type) {
      case "EQUIPMENT":
        return { label: "설비", variant: "default" as const };
      case "QUALITY":
        return { label: "품질", variant: "secondary" as const };
      case "SAFETY":
        return { label: "안전", variant: "destructive" as const };
      case "PROCESS":
        return { label: "공정", variant: "outline" as const };
      case "OTHER":
        return { label: "기타", variant: "outline" as const };
      default:
        return { label: type, variant: "outline" as const };
    }
  };

  const config = getTypeConfig(type);

  return (
    <Badge variant={config.variant}>{config.label}</Badge>
  );
};

const IssueCard: React.FC<{
  issue: Issue;
  onEdit: (issue: Issue) => void;
  onView: (issue: Issue) => void;
  onDelete: (id: number) => void;
}> = ({ issue, onEdit, onView, onDelete }) => {
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const issueTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - issueTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "방금 전";
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <PriorityBadge priority={issue.priority} />
          <TypeBadge type={issue.type} />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(issue)}
            title="상세보기"
          >
            👁️
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(issue)}
            title="수정"
          >
            ✏️
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(issue.id)}
            title="삭제"
          >
            🗑️
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{issue.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusBadge status={issue.status} />
        </div>
        <div className="flex flex-col items-end text-xs text-gray-500">
          <span>담당: {issue.assignedToName || "미지정"}</span>
          <span>{formatTimeAgo(issue.reportedAt)}</span>
        </div>
      </div>
    </Card>
  );
};

export const IssuesGrid: React.FC<IssuesGridProps> = ({ onEdit, onView }) => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const { data: issuesResponse, isLoading, error } = useIssues();
  const deleteIssue = useDeleteIssue();

  const issues = issuesResponse?.data || [];

  const filteredIssues = issues.filter((issue: Issue) => {
    if (statusFilter && issue.status !== statusFilter) return false;
    if (priorityFilter && issue.priority !== priorityFilter) return false;
    if (typeFilter && issue.type !== typeFilter) return false;
    return true;
  });

  const handleDelete = (id: number) => {
    if (window.confirm("정말로 이 이슈를 삭제하시겠습니까?")) {
      deleteIssue.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-6 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
              상태:
            </label>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-32"
            >
              <option value="">전체</option>
              <option value="OPEN">대기</option>
              <option value="IN_PROGRESS">진행 중</option>
              <option value="RESOLVED">해결됨</option>
              <option value="CLOSED">종료</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="priority-filter" className="text-sm font-medium text-gray-700">
              우선순위:
            </label>
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-32"
            >
              <option value="">전체</option>
              <option value="LOW">낮음</option>
              <option value="MEDIUM">보통</option>
              <option value="HIGH">높음</option>
              <option value="CRITICAL">긴급</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="type-filter" className="text-sm font-medium text-gray-700">
              유형:
            </label>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-32"
            >
              <option value="">전체</option>
              <option value="EQUIPMENT">설비</option>
              <option value="QUALITY">품질</option>
              <option value="SAFETY">안전</option>
              <option value="PROCESS">공정</option>
              <option value="OTHER">기타</option>
            </Select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          총 {filteredIssues.length}개
        </div>
      </div>

      {/* 이슈 카드 그리드 */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue: Issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onEdit={onEdit}
              onView={onView}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Card className="p-8 col-span-full">
            <div className="text-center text-gray-500">
              <p>이슈가 없습니다.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
