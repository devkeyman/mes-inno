package com.mes.application.service;

import com.mes.application.port.in.WorkOrderUseCase;
import com.mes.application.port.out.WorkOrderPort;
import com.mes.domain.model.WorkOrder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WorkOrderService implements WorkOrderUseCase {
    
    private final WorkOrderPort workOrderPort;
    
    public WorkOrderService(WorkOrderPort workOrderPort) {
        this.workOrderPort = workOrderPort;
    }
    
    @Override
    public WorkOrder createWorkOrder(CreateWorkOrderCommand command) {
        if (workOrderPort.existsByOrderNumber(command.getOrderNumber())) {
            throw new IllegalArgumentException("Order number already exists: " + command.getOrderNumber());
        }
        
        WorkOrder workOrder = new WorkOrder();
        workOrder.setOrderNumber(command.getOrderNumber());
        workOrder.setProductName(command.getProductName());
        workOrder.setProductCode(command.getProductCode());
        workOrder.setQuantity(command.getQuantity());
        workOrder.setDueDate(command.getDueDate());
        workOrder.setPriority(command.getPriority() != null ? command.getPriority() : "MEDIUM");
        workOrder.setInstructions(command.getInstructions());
        workOrder.setAssignedToId(command.getAssignedToId());
        workOrder.setStatus("PENDING");
        workOrder.setProgress(0);
        workOrder.setCreatedAt(LocalDateTime.now());
        workOrder.setUpdatedAt(LocalDateTime.now());
        
        return workOrderPort.save(workOrder);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<WorkOrder> findWorkOrderById(Long id) {
        return workOrderPort.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<WorkOrder> findAllWorkOrders() {
        return workOrderPort.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<WorkOrder> findWorkOrdersByStatus(String status) {
        return workOrderPort.findByStatus(status);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<WorkOrder> findWorkOrdersByAssignee(Long userId) {
        return workOrderPort.findByAssignedToId(userId);
    }
    
    @Override
    public WorkOrder updateWorkOrder(Long id, UpdateWorkOrderCommand command) {
        WorkOrder workOrder = workOrderPort.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("WorkOrder not found with id: " + id));
        
        if (command.getProductName() != null) {
            workOrder.setProductName(command.getProductName());
        }
        if (command.getQuantity() != null) {
            workOrder.setQuantity(command.getQuantity());
        }
        if (command.getDueDate() != null) {
            workOrder.setDueDate(command.getDueDate());
        }
        if (command.getPriority() != null) {
            workOrder.setPriority(command.getPriority());
        }
        if (command.getInstructions() != null) {
            workOrder.setInstructions(command.getInstructions());
        }
        if (command.getAssignedToId() != null) {
            workOrder.setAssignedToId(command.getAssignedToId());
        }
        workOrder.setUpdatedAt(LocalDateTime.now());
        
        return workOrderPort.save(workOrder);
    }
    
    @Override
    public void deleteWorkOrder(Long id) {
        if (!workOrderPort.findById(id).isPresent()) {
            throw new IllegalArgumentException("WorkOrder not found with id: " + id);
        }
        workOrderPort.deleteById(id);
    }
    
    @Override
    public void startWork(Long workOrderId) {
        WorkOrder workOrder = workOrderPort.findById(workOrderId)
            .orElseThrow(() -> new IllegalArgumentException("WorkOrder not found with id: " + workOrderId));
        
        workOrder.startWork();
        workOrder.setUpdatedAt(LocalDateTime.now());
        workOrderPort.save(workOrder);
    }
    
    @Override
    public void completeWork(Long workOrderId) {
        WorkOrder workOrder = workOrderPort.findById(workOrderId)
            .orElseThrow(() -> new IllegalArgumentException("WorkOrder not found with id: " + workOrderId));
        
        workOrder.completeWork();
        workOrder.setUpdatedAt(LocalDateTime.now());
        workOrderPort.save(workOrder);
    }
    
    @Override
    public void updateProgress(Long workOrderId, Integer progress) {
        WorkOrder workOrder = workOrderPort.findById(workOrderId)
            .orElseThrow(() -> new IllegalArgumentException("WorkOrder not found with id: " + workOrderId));
        
        workOrder.updateProgress(progress);
        workOrder.setUpdatedAt(LocalDateTime.now());
        workOrderPort.save(workOrder);
    }
}