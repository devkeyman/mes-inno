package com.mes.common.mapper;

import com.mes.adapter.out.persistence.entity.User;
import com.mes.adapter.out.persistence.entity.WorkLog;
import com.mes.adapter.out.persistence.entity.WorkOrder;
import com.mes.adapter.out.persistence.entity.enums.LogAction;
import com.mes.common.dto.worklog.WorkLogDto;
import org.springframework.stereotype.Component;

@Component
public class WorkLogMapper {
    
    public com.mes.domain.model.WorkLog toDomain(WorkLog entity) {
        if (entity == null) {
            return null;
        }
        
        com.mes.domain.model.WorkLog domain = new com.mes.domain.model.WorkLog();
        domain.setId(entity.getId());
        domain.setWorkOrderId(entity.getWorkOrder() != null ? entity.getWorkOrder().getId() : null);
        domain.setWorkerId(entity.getWorker() != null ? entity.getWorker().getId() : null);
        domain.setAction(entity.getAction() != null ? entity.getAction().name() : null);
        domain.setNotes(entity.getNotes());
        domain.setProgress(entity.getProgress());
        domain.setCreatedAt(entity.getCreatedAt());
        
        return domain;
    }
    
    public WorkLog toEntity(com.mes.domain.model.WorkLog domain) {
        if (domain == null) {
            return null;
        }
        
        WorkLog entity = new WorkLog();
        entity.setId(domain.getId());
        
        if (domain.getWorkOrderId() != null) {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(domain.getWorkOrderId());
            entity.setWorkOrder(workOrder);
        }
        
        if (domain.getWorkerId() != null) {
            User worker = new User();
            worker.setId(domain.getWorkerId());
            entity.setWorker(worker);
        }
        
        entity.setAction(domain.getAction() != null ? LogAction.valueOf(domain.getAction()) : null);
        entity.setNotes(domain.getNotes());
        entity.setProgress(domain.getProgress());
        entity.setCreatedAt(domain.getCreatedAt());
        
        return entity;
    }
    
    public WorkLogDto toDto(WorkLog entity) {
        if (entity == null) {
            return null;
        }
        
        WorkLogDto dto = new WorkLogDto();
        dto.setId(entity.getId());
        dto.setWorkOrderId(entity.getWorkOrder() != null ? entity.getWorkOrder().getId() : null);
        dto.setWorkOrderNumber(entity.getWorkOrder() != null ? entity.getWorkOrder().getOrderNumber() : null);
        dto.setWorkerId(entity.getWorker() != null ? entity.getWorker().getId() : null);
        dto.setWorkerName(entity.getWorker() != null ? entity.getWorker().getName() : null);
        dto.setAction(entity.getAction() != null ? entity.getAction().name() : null);
        dto.setNotes(entity.getNotes());
        dto.setProgress(entity.getProgress());
        dto.setCreatedAt(entity.getCreatedAt());
        
        return dto;
    }
}