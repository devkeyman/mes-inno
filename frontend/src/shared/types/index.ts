// Dashboard Types
export interface DashboardStats {
  totalWorkOrders: number;
  pendingWorkOrders: number;
  inProgressWorkOrders: number;
  completedWorkOrders: number;
  totalIssues: number;
  openIssues: number;
  resolvedIssues: number;
  todayWorkOrders: number;
  todayCompletedOrders: number;
  averageCompletionRate: number;
  onTimeDeliveryRate: number;
}

export interface ProductionSummary {
  totalQuantityOrdered: number;
  totalQuantityProduced: number;
  productionRate: number;
  byProduct: ProductSummary[];
  byDate: DateSummary[];
}

export interface ProductSummary {
  productName: string;
  ordered: number;
  produced: number;
  rate: number;
}

export interface DateSummary {
  date: string;
  ordered: number;
  produced: number;
}

export interface RecentActivity {
  id: number;
  type: "WORK_ORDER" | "ISSUE" | "USER";
  action: string;
  description: string;
  userId: number;
  userName: string;
  timestamp: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error Response Type
export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
  errors?: Record<string, string>;
}

// Query Parameters
export interface WorkOrderQueryParams {
  status?: string;
  priority?: string;
  assignedTo?: number;
}

export interface WorkLogQueryParams {
  workOrderId?: number;
  userId?: number;
  action?: string;
  startDate?: string;
  endDate?: string;
}

export interface IssueQueryParams {
  status?: string;
  priority?: string;
  type?: string;
  reportedBy?: number;
}

export interface DashboardQueryParams {
  limit?: number;
  startDate?: string;
  endDate?: string;
}
