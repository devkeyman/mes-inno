package com.mes.common.dto.issue;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateIssueDto {
    
    @NotNull(message = "Work order ID is required")
    private Long workOrderId;
    
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    private String priority = "MEDIUM";
    
    public Long getWorkOrderId() { return workOrderId; }
    public void setWorkOrderId(Long workOrderId) { this.workOrderId = workOrderId; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}