package com.mes.application.port.in;

import com.mes.domain.model.WorkOrder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WorkOrderUseCase {
    WorkOrder createWorkOrder(CreateWorkOrderCommand command);
    Optional<WorkOrder> findWorkOrderById(Long id);
    List<WorkOrder> findAllWorkOrders();
    List<WorkOrder> findWorkOrdersByStatus(String status);
    List<WorkOrder> findWorkOrdersByAssignee(Long userId);
    WorkOrder updateWorkOrder(Long id, UpdateWorkOrderCommand command);
    void deleteWorkOrder(Long id);
    void startWork(Long workOrderId);
    void completeWork(Long workOrderId);
    void updateProgress(Long workOrderId, Integer progress);
    
    class CreateWorkOrderCommand {
        private String orderNumber;
        private String productName;
        private String productCode;
        private Integer quantity;
        private LocalDateTime dueDate;
        private String priority;
        private String instructions;
        private Long assignedToId;
        
        public String getOrderNumber() { return orderNumber; }
        public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
        
        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }
        
        public String getProductCode() { return productCode; }
        public void setProductCode(String productCode) { this.productCode = productCode; }
        
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        
        public LocalDateTime getDueDate() { return dueDate; }
        public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
        
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        
        public String getInstructions() { return instructions; }
        public void setInstructions(String instructions) { this.instructions = instructions; }
        
        public Long getAssignedToId() { return assignedToId; }
        public void setAssignedToId(Long assignedToId) { this.assignedToId = assignedToId; }
    }
    
    class UpdateWorkOrderCommand {
        private String productName;
        private Integer quantity;
        private LocalDateTime dueDate;
        private String priority;
        private String instructions;
        private Long assignedToId;
        
        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }
        
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        
        public LocalDateTime getDueDate() { return dueDate; }
        public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
        
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        
        public String getInstructions() { return instructions; }
        public void setInstructions(String instructions) { this.instructions = instructions; }
        
        public Long getAssignedToId() { return assignedToId; }
        public void setAssignedToId(Long assignedToId) { this.assignedToId = assignedToId; }
    }
}