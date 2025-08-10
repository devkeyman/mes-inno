package com.mes.application.port.in;

import com.mes.domain.model.Issue;
import java.util.List;
import java.util.Optional;

public interface IssueUseCase {
    Issue createIssue(CreateIssueCommand command);
    Optional<Issue> findById(Long id);
    List<Issue> findAll();
    List<Issue> findByWorkOrderId(Long workOrderId);
    List<Issue> findByStatus(String status);
    Issue updateIssue(Long id, UpdateIssueCommand command);
    void deleteIssue(Long id);
    void resolveIssue(Long id);
    void closeIssue(Long id);
    
    class CreateIssueCommand {
        private Long workOrderId;
        private String title;
        private String description;
        private String priority;
        private Long reporterId;
        
        public Long getWorkOrderId() { return workOrderId; }
        public void setWorkOrderId(Long workOrderId) { this.workOrderId = workOrderId; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        
        public Long getReporterId() { return reporterId; }
        public void setReporterId(Long reporterId) { this.reporterId = reporterId; }
    }
    
    class UpdateIssueCommand {
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
}