package com.mes.common.mapper;

import com.mes.adapter.out.persistence.entity.User;
import com.mes.adapter.out.persistence.entity.WorkOrder;
import com.mes.adapter.out.persistence.entity.enums.Priority;
import com.mes.adapter.out.persistence.entity.enums.WorkStatus;
import com.mes.common.dto.workorder.WorkOrderDto;
import org.springframework.stereotype.Component;

@Component
public class WorkOrderMapper {
    
    public com.mes.domain.model.WorkOrder toDomain(WorkOrder entity) {
        if (entity == null) {
            return null;
        }
        
        com.mes.domain.model.WorkOrder domain = new com.mes.domain.model.WorkOrder();
        domain.setId(entity.getId());
        domain.setOrderNumber(entity.getOrderNumber());
        domain.setProductName(entity.getProductName());
        domain.setProductCode(entity.getProductCode());
        domain.setQuantity(entity.getQuantity());
        domain.setDueDate(entity.getDueDate());
        domain.setPriority(entity.getPriority() != null ? entity.getPriority().name() : null);
        domain.setStatus(entity.getStatus() != null ? entity.getStatus().name() : null);
        domain.setInstructions(entity.getInstructions());
        domain.setProgress(entity.getProgress());
        domain.setAssignedToId(entity.getAssignedTo() != null ? entity.getAssignedTo().getId() : null);
        domain.setStartedAt(entity.getStartedAt());
        domain.setCompletedAt(entity.getCompletedAt());
        domain.setCreatedAt(entity.getCreatedAt());
        domain.setUpdatedAt(entity.getUpdatedAt());
        
        return domain;
    }
    
    public WorkOrder toEntity(com.mes.domain.model.WorkOrder domain) {
        if (domain == null) {
            return null;
        }
        
        WorkOrder entity = new WorkOrder();
        entity.setId(domain.getId());
        entity.setOrderNumber(domain.getOrderNumber());
        entity.setProductName(domain.getProductName());
        entity.setProductCode(domain.getProductCode());
        entity.setQuantity(domain.getQuantity());
        entity.setDueDate(domain.getDueDate());
        entity.setPriority(domain.getPriority() != null ? Priority.valueOf(domain.getPriority()) : Priority.MEDIUM);
        entity.setStatus(domain.getStatus() != null ? WorkStatus.valueOf(domain.getStatus()) : WorkStatus.PENDING);
        entity.setInstructions(domain.getInstructions());
        entity.setProgress(domain.getProgress());
        
        if (domain.getAssignedToId() != null) {
            User assignedUser = new User();
            assignedUser.setId(domain.getAssignedToId());
            entity.setAssignedTo(assignedUser);
        }
        
        entity.setStartedAt(domain.getStartedAt());
        entity.setCompletedAt(domain.getCompletedAt());
        entity.setCreatedAt(domain.getCreatedAt());
        entity.setUpdatedAt(domain.getUpdatedAt());
        
        return entity;
    }
    
    public WorkOrderDto toDto(WorkOrder entity) {
        if (entity == null) {
            return null;
        }
        
        WorkOrderDto dto = new WorkOrderDto();
        dto.setId(entity.getId());
        dto.setOrderNumber(entity.getOrderNumber());
        dto.setProductName(entity.getProductName());
        dto.setProductCode(entity.getProductCode());
        dto.setQuantity(entity.getQuantity());
        dto.setDueDate(entity.getDueDate());
        dto.setPriority(entity.getPriority() != null ? entity.getPriority().name() : null);
        dto.setStatus(entity.getStatus() != null ? entity.getStatus().name() : null);
        dto.setInstructions(entity.getInstructions());
        dto.setProgress(entity.getProgress());
        
        if (entity.getAssignedTo() != null) {
            dto.setAssignedToId(entity.getAssignedTo().getId());
            dto.setAssignedToName(entity.getAssignedTo().getName());
        }
        
        dto.setStartedAt(entity.getStartedAt());
        dto.setCompletedAt(entity.getCompletedAt());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        
        return dto;
    }
}