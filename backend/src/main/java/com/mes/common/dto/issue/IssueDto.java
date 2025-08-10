package com.mes.common.dto.issue;

import java.time.LocalDateTime;

public class IssueDto {
    private Long id;
    private Long workOrderId;
    private String workOrderNumber;
    private String title;
    private String description;
    private String priority;
    private String status;
    private Long reporterId;
    private String reporterName;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getWorkOrderId() { return workOrderId; }
    public void setWorkOrderId(Long workOrderId) { this.workOrderId = workOrderId; }
    
    public String getWorkOrderNumber() { return workOrderNumber; }
    public void setWorkOrderNumber(String workOrderNumber) { this.workOrderNumber = workOrderNumber; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Long getReporterId() { return reporterId; }
    public void setReporterId(Long reporterId) { this.reporterId = reporterId; }
    
    public String getReporterName() { return reporterName; }
    public void setReporterName(String reporterName) { this.reporterName = reporterName; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}