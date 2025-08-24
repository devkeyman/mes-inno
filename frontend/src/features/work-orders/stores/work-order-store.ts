import { create } from "zustand";
import { WorkOrder, WorkOrderFilters } from "@/entities/work-order";

interface WorkOrderStore {
  selectedWorkOrder: WorkOrder | null;
  filters: WorkOrderFilters;
  isFormOpen: boolean;
  editingWorkOrder: WorkOrder | null;
  
  setSelectedWorkOrder: (workOrder: WorkOrder | null) => void;
  setFilters: (filters: WorkOrderFilters) => void;
  updateFilter: (key: keyof WorkOrderFilters, value: any) => void;
  clearFilters: () => void;
  openForm: (workOrder?: WorkOrder) => void;
  closeForm: () => void;
}

export const useWorkOrderStore = create<WorkOrderStore>((set) => ({
  selectedWorkOrder: null,
  filters: {},
  isFormOpen: false,
  editingWorkOrder: null,

  setSelectedWorkOrder: (workOrder) => set({ selectedWorkOrder: workOrder }),
  
  setFilters: (filters) => set({ filters }),
  
  updateFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value || undefined,
      },
    })),
  
  clearFilters: () => set({ filters: {} }),
  
  openForm: (workOrder) =>
    set({
      isFormOpen: true,
      editingWorkOrder: workOrder || null,
    }),
  
  closeForm: () =>
    set({
      isFormOpen: false,
      editingWorkOrder: null,
    }),
}));