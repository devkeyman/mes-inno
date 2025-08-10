package com.mes.common.dto.worklog;

import java.time.LocalDateTime;

public class WorkLogDto {
    private Long id;
    private Long workOrderId;
    private String workOrderNumber;
    private Long workerId;
    private String workerName;
    private String action;
    private String notes;
    private Integer progress;
    private LocalDateTime createdAt;
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getWorkOrderId() { return workOrderId; }
    public void setWorkOrderId(Long workOrderId) { this.workOrderId = workOrderId; }
    
    public String getWorkOrderNumber() { return workOrderNumber; }
    public void setWorkOrderNumber(String workOrderNumber) { this.workOrderNumber = workOrderNumber; }
    
    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }
    
    public String getWorkerName() { return workerName; }
    public void setWorkerName(String workerName) { this.workerName = workerName; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}