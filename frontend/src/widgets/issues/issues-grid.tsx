import React, { useState } from "react";
import { useIssues, useDeleteIssue } from "@/features/issues/hooks/use-issues";
import {
  Issue,
  IssueStatus,
  IssuePriority,
  IssueType,
} from "@/entities/issues";

interface IssuesGridProps {
  onEdit: (issue: Issue) => void;
  onView: (issue: Issue) => void;
}

const StatusBadge: React.FC<{ status: IssueStatus }> = ({ status }) => {
  const getStatusConfig = (status: IssueStatus) => {
    switch (status) {
      case "OPEN":
        return { label: "대기", className: "status-open" };
      case "IN_PROGRESS":
        return { label: "진행 중", className: "status-progress" };
      case "RESOLVED":
        return { label: "해결됨", className: "status-resolved" };
      case "CLOSED":
        return { label: "종료", className: "status-closed" };
      default:
        return { label: status, className: "status-default" };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`status-badge ${config.className}`}>{config.label}</span>
  );
};

const PriorityBadge: React.FC<{ priority: IssuePriority }> = ({ priority }) => {
  const getPriorityConfig = (priority: IssuePriority) => {
    switch (priority) {
      case "LOW":
        return { label: "낮음", className: "priority-low" };
      case "MEDIUM":
        return { label: "보통", className: "priority-medium" };
      case "HIGH":
        return { label: "높음", className: "priority-high" };
      case "CRITICAL":
        return { label: "긴급", className: "priority-critical" };
      default:
        return { label: priority, className: "priority-default" };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <span className={`priority-badge ${config.className}`}>{config.label}</span>
  );
};

const TypeBadge: React.FC<{ type: IssueType }> = ({ type }) => {
  const getTypeConfig = (type: IssueType) => {
    switch (type) {
      case "EQUIPMENT":
        return { label: "설비", className: "type-equipment" };
      case "QUALITY":
        return { label: "품질", className: "type-quality" };
      case "SAFETY":
        return { label: "안전", className: "type-safety" };
      case "PROCESS":
        return { label: "공정", className: "type-process" };
      case "OTHER":
        return { label: "기타", className: "type-other" };
      default:
        return { label: type, className: "type-default" };
    }
  };

  const config = getTypeConfig(type);

  return (
    <span className={`type-badge ${config.className}`}>{config.label}</span>
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
    <div className="issue-card">
      <div className="issue-header">
        <div className="issue-badges">
          <PriorityBadge priority={issue.priority} />
          <TypeBadge type={issue.type} />
        </div>
        <div className="issue-actions">
          <button
            className="btn-action btn-view"
            onClick={() => onView(issue)}
            title="상세보기"
          >
            👁️
          </button>
          <button
            className="btn-action btn-edit"
            onClick={() => onEdit(issue)}
            title="수정"
          >
            ✏️
          </button>
          <button
            className="btn-action btn-delete"
            onClick={() => onDelete(issue.id)}
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="issue-content">
        <h3 className="issue-title">{issue.title}</h3>
        <p className="issue-description">{issue.description}</p>
      </div>

      <div className="issue-footer">
        <div className="issue-meta">
          <div className="issue-status">
            <StatusBadge status={issue.status} />
          </div>
          <div className="issue-info">
            <span className="issue-assigned">
              담당: {issue.assignedToName || "미지정"}
            </span>
            <span className="issue-time">{formatTimeAgo(issue.reportedAt)}</span>
          </div>
        </div>
      </div>
    </div>
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
      <div className="issues-grid">
        <div className="grid-loading">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="issue-card loading">
              <div className="skeleton-header"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-description"></div>
              </div>
              <div className="skeleton-footer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="issues-grid">
        <div className="grid-error">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="issues-grid">
      {/* 필터 */}
      <div className="grid-filters">
        <div className="filter-group">
          <label htmlFor="status-filter">상태:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">전체</option>
            <option value="OPEN">대기</option>
            <option value="IN_PROGRESS">진행 중</option>
            <option value="RESOLVED">해결됨</option>
            <option value="CLOSED">종료</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter">우선순위:</label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">전체</option>
            <option value="LOW">낮음</option>
            <option value="MEDIUM">보통</option>
            <option value="HIGH">높음</option>
            <option value="CRITICAL">긴급</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="type-filter">유형:</label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">전체</option>
            <option value="EQUIPMENT">설비</option>
            <option value="QUALITY">품질</option>
            <option value="SAFETY">안전</option>
            <option value="PROCESS">공정</option>
            <option value="OTHER">기타</option>
          </select>
        </div>

        <div className="grid-info">
          <span>총 {filteredIssues.length}개</span>
        </div>
      </div>

      {/* 이슈 카드 그리드 */}
      <div className="issues-cards">
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
          <div className="no-issues">
            <p>이슈가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
