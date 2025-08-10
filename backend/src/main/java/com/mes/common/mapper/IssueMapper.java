package com.mes.common.mapper;

import com.mes.adapter.out.persistence.entity.Issue;
import com.mes.adapter.out.persistence.entity.User;
import com.mes.adapter.out.persistence.entity.WorkOrder;
import com.mes.adapter.out.persistence.entity.enums.IssueStatus;
import com.mes.adapter.out.persistence.entity.enums.Priority;
import com.mes.common.dto.issue.IssueDto;
import org.springframework.stereotype.Component;

@Component
public class IssueMapper {
    
    public com.mes.domain.model.Issue toDomain(Issue entity) {
        if (entity == null) {
            return null;
        }
        
        com.mes.domain.model.Issue domain = new com.mes.domain.model.Issue();
        domain.setId(entity.getId());
        domain.setWorkOrderId(entity.getWorkOrder() != null ? entity.getWorkOrder().getId() : null);
        domain.setTitle(entity.getTitle());
        domain.setDescription(entity.getDescription());
        domain.setPriority(entity.getPriority() != null ? entity.getPriority().name() : null);
        domain.setStatus(entity.getStatus() != null ? entity.getStatus().name() : null);
        domain.setReporterId(entity.getReporter() != null ? entity.getReporter().getId() : null);
        domain.setCreatedAt(entity.getCreatedAt());
        domain.setResolvedAt(entity.getResolvedAt());
        
        return domain;
    }
    
    public Issue toEntity(com.mes.domain.model.Issue domain) {
        if (domain == null) {
            return null;
        }
        
        Issue entity = new Issue();
        entity.setId(domain.getId());
        
        if (domain.getWorkOrderId() != null) {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(domain.getWorkOrderId());
            entity.setWorkOrder(workOrder);
        }
        
        entity.setTitle(domain.getTitle());
        entity.setDescription(domain.getDescription());
        entity.setPriority(domain.getPriority() != null ? Priority.valueOf(domain.getPriority()) : Priority.MEDIUM);
        entity.setStatus(domain.getStatus() != null ? IssueStatus.valueOf(domain.getStatus()) : IssueStatus.OPEN);
        
        if (domain.getReporterId() != null) {
            User reporter = new User();
            reporter.setId(domain.getReporterId());
            entity.setReporter(reporter);
        }
        
        entity.setCreatedAt(domain.getCreatedAt());
        entity.setResolvedAt(domain.getResolvedAt());
        
        return entity;
    }
    
    public IssueDto toDto(Issue entity) {
        if (entity == null) {
            return null;
        }
        
        IssueDto dto = new IssueDto();
        dto.setId(entity.getId());
        dto.setWorkOrderId(entity.getWorkOrder() != null ? entity.getWorkOrder().getId() : null);
        dto.setWorkOrderNumber(entity.getWorkOrder() != null ? entity.getWorkOrder().getOrderNumber() : null);
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setPriority(entity.getPriority() != null ? entity.getPriority().name() : null);
        dto.setStatus(entity.getStatus() != null ? entity.getStatus().name() : null);
        dto.setReporterId(entity.getReporter() != null ? entity.getReporter().getId() : null);
        dto.setReporterName(entity.getReporter() != null ? entity.getReporter().getName() : null);
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setResolvedAt(entity.getResolvedAt());
        
        return dto;
    }
}