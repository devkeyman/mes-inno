package com.mes.application.service;

import com.mes.application.port.in.WorkLogUseCase;
import com.mes.application.port.out.WorkLogPort;
import com.mes.application.port.out.WorkOrderPort;
import com.mes.domain.model.WorkLog;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class WorkLogService implements WorkLogUseCase {
    
    private final WorkLogPort workLogPort;
    private final WorkOrderPort workOrderPort;
    
    public WorkLogService(WorkLogPort workLogPort, WorkOrderPort workOrderPort) {
        this.workLogPort = workLogPort;
        this.workOrderPort = workOrderPort;
    }
    
    @Override
    public WorkLog createWorkLog(CreateWorkLogCommand command) {
        // Verify work order exists
        workOrderPort.findById(command.getWorkOrderId())
            .orElseThrow(() -> new IllegalArgumentException("WorkOrder not found with id: " + command.getWorkOrderId()));
        
        WorkLog workLog = new WorkLog();
        workLog.setWorkOrderId(command.getWorkOrderId());
        workLog.setWorkerId(command.getWorkerId());
        workLog.setAction(command.getAction());
        workLog.setNotes(command.getNotes());
        workLog.setProgress(command.getProgress());
        workLog.setCreatedAt(LocalDateTime.now());
        
        return workLogPort.save(workLog);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<WorkLog> findByWorkOrderId(Long workOrderId) {
        return workLogPort.findByWorkOrderId(workOrderId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<WorkLog> findByWorkerId(Long workerId) {
        return workLogPort.findByWorkerId(workerId);
    }
}