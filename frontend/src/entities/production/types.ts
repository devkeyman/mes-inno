// Work Order Types
export interface WorkOrder {
  id: number;
  orderNumber: string;
  productName: string;
  productCode: string;
  quantity: number;
  dueDate: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  instructions: string;
  description: string;
  progress: number;
  assignedToId: number;
  assignedToName: string;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type WorkOrderStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type WorkOrderPriority = "LOW" | "NORMAL" | "MEDIUM" | "HIGH" | "URGENT";

// Work Order Request Types
export interface CreateWorkOrderRequest {
  orderNumber: string;
  productName: string;
  productCode: string;
  quantity: number;
  dueDate: string;
  priority: WorkOrderPriority;
  instructions: string;
  description: string;
  assignedToId: number;
  assignedTo: string;
}

export interface UpdateWorkOrderRequest {
  quantity?: number;
  priority?: WorkOrderPriority;
  status?: WorkOrderStatus;
  progress?: number;
  assignedToId?: number;
}

export interface CompleteWorkRequest {
  actualQuantity: number;
  notes: string;
}

export interface UpdateProgressRequest {
  progress: number;
}

// Work Log Types
export interface WorkLog {
  id: number;
  workOrderId: number;
  workOrderNumber: string;
  userId: number;
  userName: string;
  action: WorkLogAction;
  description: string;
  beforeStatus: WorkOrderStatus;
  afterStatus: WorkOrderStatus;
  quantityProduced: number;
  loggedAt: string;
}

export type WorkLogAction = "CREATE" | "UPDATE" | "START" | "PAUSE" | "RESUME" | "COMPLETE" | "CANCEL";

export interface CreateWorkLogRequest {
  workOrderId: number;
  action: WorkLogAction;
  description: string;
  quantityProduced?: number;
}
