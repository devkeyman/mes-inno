package com.mes.common.dto.issue;

import jakarta.validation.constraints.Size;

public class UpdateIssueDto {
    
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;
    
    private String description;
    
    private String priority;
    
    private String status;
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}