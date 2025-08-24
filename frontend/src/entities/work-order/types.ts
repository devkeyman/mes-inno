export type WorkOrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type WorkOrderPriority = 'LOW' | 'NORMAL' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface WorkOrder {
  id: number;
  orderNumber: string;
  title: string;
  description: string;
  productName: string;
  productCode: string;
  quantity: number;
  unit: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assignedTo: string;
  assignedToId: number;
  startDate: string;
  endDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  completionRate: number;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkOrderRequest {
  title: string;
  description: string;
  productName: string;
  productCode: string;
  quantity: number;
  unit: string;
  priority: WorkOrderPriority;
  assignedToId: number;
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface UpdateWorkOrderRequest {
  title?: string;
  description?: string;
  productName?: string;
  productCode?: string;
  quantity?: number;
  unit?: string;
  status?: WorkOrderStatus;
  priority?: WorkOrderPriority;
  assignedToId?: number;
  startDate?: string;
  endDate?: string;
  actualStartDate?: string;
  actualEndDate?: string;
  completionRate?: number;
  notes?: string;
}

export interface WorkOrderFilters {
  status?: WorkOrderStatus;
  priority?: WorkOrderPriority;
  assignedToId?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface WorkOrderPageParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  filters?: WorkOrderFilters;
}

export interface WorkOrderPageResponse {
  data: WorkOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}