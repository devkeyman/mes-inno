package com.mes.domain.model;

import java.time.LocalDateTime;

public class Issue {
    private Long id;
    private Long workOrderId;
    private String title;
    private String description;
    private String priority;
    private String status;
    private Long reporterId;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    
    public Issue() {
        this.priority = "MEDIUM";
        this.status = "OPEN";
        this.createdAt = LocalDateTime.now();
    }
    
    public void resolve() {
        if (!"OPEN".equals(this.status) && !"IN_PROGRESS".equals(this.status)) {
            throw new IllegalStateException("Can only resolve open or in-progress issues");
        }
        this.status = "RESOLVED";
        this.resolvedAt = LocalDateTime.now();
    }
    
    public void close() {
        if (!"RESOLVED".equals(this.status)) {
            throw new IllegalStateException("Can only close resolved issues");
        }
        this.status = "CLOSED";
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getWorkOrderId() { return workOrderId; }
    public void setWorkOrderId(Long workOrderId) { this.workOrderId = workOrderId; }
    
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
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}