package com.mes.application.port.in;

import com.mes.domain.model.WorkLog;
import java.util.List;

public interface WorkLogUseCase {
    WorkLog createWorkLog(CreateWorkLogCommand command);
    List<WorkLog> findByWorkOrderId(Long workOrderId);
    List<WorkLog> findByWorkerId(Long workerId);
    
    class CreateWorkLogCommand {
        private Long workOrderId;
        private Long workerId;
        private String action;
        private String notes;
        private Integer progress;
        
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
    }
}