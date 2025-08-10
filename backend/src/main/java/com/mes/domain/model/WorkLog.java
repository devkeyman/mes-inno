package com.mes.domain.model;

import java.time.LocalDateTime;

public class WorkLog {
    private Long id;
    private Long workOrderId;
    private Long workerId;
    private String action;
    private String notes;
    private Integer progress;
    private LocalDateTime createdAt;
    
    public WorkLog() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getWorkOrderId() { return workOrderId; }
    public void setWorkOrderId(Long workOrderId) { this.workOrderId = workOrderId; }
    
    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}