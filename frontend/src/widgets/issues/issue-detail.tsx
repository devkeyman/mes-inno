import React, { useState } from "react";
import {
  Issue,
  IssueStatus,
  IssuePriority,
  IssueType,
} from "@/entities/issues";
import { useResolveIssue } from "@/features/issues/hooks/use-issues";

interface IssueDetailProps {
  issue: Issue;
  onEdit: () => void;
  onClose: () => void;
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

export const IssueDetail: React.FC<IssueDetailProps> = ({
  issue,
  onEdit,
  onClose,
}) => {
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [resolution, setResolution] = useState("");

  const resolveIssue = useResolveIssue();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR");
  };

  const handleResolve = () => {
    if (resolution.trim()) {
      resolveIssue.mutate(
        { id: issue.id, data: { resolution: resolution.trim() } },
        {
          onSuccess: () => {
            setShowResolveForm(false);
            setResolution("");
          },
        }
      );
    }
  };

  const canResolve = issue.status === "OPEN" || issue.status === "IN_PROGRESS";

  return (
    <div className="issue-detail">
      <div className="detail-header">
        <h2>이슈 상세</h2>
        <div className="detail-actions">
          {canResolve && (
            <button
              onClick={() => setShowResolveForm(true)}
              className="btn-success"
            >
              해결
            </button>
          )}
          <button onClick={onEdit} className="btn-secondary">
            수정
          </button>
          <button onClick={onClose} className="btn-close">
            ✕
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>기본 정보</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>제목</label>
              <span className="issue-title-text">{issue.title}</span>
            </div>
            <div className="detail-item">
              <label>상태</label>
              <StatusBadge status={issue.status} />
            </div>
            <div className="detail-item">
              <label>우선순위</label>
              <PriorityBadge priority={issue.priority} />
            </div>
            <div className="detail-item">
              <label>유형</label>
              <TypeBadge type={issue.type} />
            </div>
            <div className="detail-item">
              <label>담당자</label>
              <span>{issue.assignedToName || "미지정"}</span>
            </div>
            <div className="detail-item">
              <label>등록자</label>
              <span>{issue.reportedByName}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>설명</h3>
          <div className="detail-description">
            <p>{issue.description}</p>
          </div>
        </div>

        <div className="detail-section">
          <h3>시간 정보</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>등록일</label>
              <span>{formatDate(issue.reportedAt)}</span>
            </div>
            {issue.resolvedAt && (
              <div className="detail-item">
                <label>해결일</label>
                <span>{formatDate(issue.resolvedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {issue.resolution && (
          <div className="detail-section">
            <h3>해결 내용</h3>
            <div className="detail-resolution">
              <p>{issue.resolution}</p>
            </div>
          </div>
        )}
      </div>

      {/* 해결 폼 모달 */}
      {showResolveForm && (
        <div className="resolve-modal">
          <div className="resolve-modal-content">
            <h3>이슈 해결</h3>
            <div className="form-group">
              <label htmlFor="resolution" className="form-label">
                해결 내용 <span className="required">*</span>
              </label>
              <textarea
                id="resolution"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="form-textarea"
                placeholder="이슈 해결 내용을 입력하세요"
                rows={4}
                required
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowResolveForm(false)}
                className="btn-secondary"
                disabled={resolveIssue.isPending}
              >
                취소
              </button>
              <button
                onClick={handleResolve}
                className="btn-success"
                disabled={!resolution.trim() || resolveIssue.isPending}
              >
                {resolveIssue.isPending ? "처리 중..." : "해결"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
