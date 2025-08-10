import React, { useState } from "react";
import { IssuesGrid } from "@/widgets/issues/issues-grid";
import { IssueForm } from "@/widgets/issues/issue-form";
import { IssueDetail } from "@/widgets/issues/issue-detail";
import {
  useCreateIssue,
  useUpdateIssue,
} from "@/features/issues/hooks/use-issues";
import {
  Issue,
  CreateIssueRequest,
  UpdateIssueRequest,
} from "@/entities/issues";

type ViewMode = "list" | "create" | "edit" | "detail";

const IssuesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const createIssue = useCreateIssue();
  const updateIssue = useUpdateIssue();

  const handleCreate = () => {
    setSelectedIssue(null);
    setViewMode("create");
  };

  const handleEdit = (issue: Issue) => {
    setSelectedIssue(issue);
    setViewMode("edit");
  };

  const handleView = (issue: Issue) => {
    setSelectedIssue(issue);
    setViewMode("detail");
  };

  const handleCancel = () => {
    setViewMode("list");
    setSelectedIssue(null);
  };

  const handleSubmit = (data: CreateIssueRequest | UpdateIssueRequest) => {
    if (viewMode === "create") {
      createIssue.mutate(data as CreateIssueRequest, {
        onSuccess: () => {
          setViewMode("list");
        },
      });
    } else if (viewMode === "edit" && selectedIssue) {
      updateIssue.mutate(
        { id: selectedIssue.id, data: data as UpdateIssueRequest },
        {
          onSuccess: () => {
            setViewMode("list");
            setSelectedIssue(null);
          },
        }
      );
    }
  };

  const isLoading = createIssue.isPending || updateIssue.isPending;

  return (
    <div className="issues-page">
      <header className="page-header">
        <h1>이슈 관리</h1>
        <p>생산 이슈 및 개선 사항 관리</p>
      </header>

      <main className="page-content">
        {viewMode === "list" && (
          <>
            <div className="issues-controls">
              <button className="btn-primary" onClick={handleCreate}>
                새 이슈 등록
              </button>
            </div>

            <IssuesGrid onEdit={handleEdit} onView={handleView} />
          </>
        )}

        {viewMode === "create" && (
          <IssueForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}

        {viewMode === "edit" && selectedIssue && (
          <IssueForm
            issue={selectedIssue}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}

        {viewMode === "detail" && selectedIssue && (
          <IssueDetail
            issue={selectedIssue}
            onEdit={() => handleEdit(selectedIssue)}
            onClose={handleCancel}
          />
        )}
      </main>
    </div>
  );
};

export default IssuesPage;
