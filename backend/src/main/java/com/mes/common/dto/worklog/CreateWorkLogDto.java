package com.mes.common.dto.worklog;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public class CreateWorkLogDto {
    
    @NotNull(message = "Work order ID is required")
    private Long workOrderId;
    
    @NotBlank(message = "Action is required")
    private String action;
    
    private String notes;
    
    @Min(value = 0, message = "Progress must be at least 0")
    @Max(value = 100, message = "Progress must not exceed 100")
    private Integer progress;
    
    public Long getWorkOrderId() { return workOrderId; }
    public void setWorkOrderId(Long workOrderId) { this.workOrderId = workOrderId; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
}