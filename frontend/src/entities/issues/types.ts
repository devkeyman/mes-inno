// Issue Types
export interface Issue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
  status: IssueStatus;
  workOrderId: number;
  workOrderNumber: string;
  reportedById: number;
  reportedByName: string;
  assignedToId: number | null;
  assignedToName: string | null;
  resolution: string | null;
  reportedAt: string;
  resolvedAt: string | null;
}

export type IssueType =
  | "QUALITY"
  | "EQUIPMENT"
  | "MATERIAL"
  | "PROCESS"
  | "SAFETY"
  | "OTHER";
export type IssuePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type IssueStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

// Issue Request Types
export interface CreateIssueRequest {
  title: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
  workOrderId: number;
}

export interface UpdateIssueRequest {
  status?: IssueStatus;
  priority?: IssuePriority;
  assignedToId?: number;
  resolution?: string;
}

export interface ResolveIssueRequest {
  resolution: string;
}
