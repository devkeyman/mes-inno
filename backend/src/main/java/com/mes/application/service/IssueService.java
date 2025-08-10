package com.mes.application.service;

import com.mes.application.port.in.IssueUseCase;
import com.mes.application.port.out.IssuePort;
import com.mes.application.port.out.WorkOrderPort;
import com.mes.domain.model.Issue;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class IssueService implements IssueUseCase {
    
    private final IssuePort issuePort;
    private final WorkOrderPort workOrderPort;
    
    public IssueService(IssuePort issuePort, WorkOrderPort workOrderPort) {
        this.issuePort = issuePort;
        this.workOrderPort = workOrderPort;
    }
    
    @Override
    public Issue createIssue(CreateIssueCommand command) {
        // Verify work order exists
        workOrderPort.findById(command.getWorkOrderId())
            .orElseThrow(() -> new IllegalArgumentException("WorkOrder not found with id: " + command.getWorkOrderId()));
        
        Issue issue = new Issue();
        issue.setWorkOrderId(command.getWorkOrderId());
        issue.setTitle(command.getTitle());
        issue.setDescription(command.getDescription());
        issue.setPriority(command.getPriority() != null ? command.getPriority() : "MEDIUM");
        issue.setStatus("OPEN");
        issue.setReporterId(command.getReporterId());
        issue.setCreatedAt(LocalDateTime.now());
        
        return issuePort.save(issue);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Issue> findById(Long id) {
        return issuePort.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Issue> findAll() {
        return issuePort.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Issue> findByWorkOrderId(Long workOrderId) {
        return issuePort.findByWorkOrderId(workOrderId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Issue> findByStatus(String status) {
        return issuePort.findByStatus(status);
    }
    
    @Override
    public Issue updateIssue(Long id, UpdateIssueCommand command) {
        Issue issue = issuePort.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Issue not found with id: " + id));
        
        if (command.getTitle() != null) {
            issue.setTitle(command.getTitle());
        }
        if (command.getDescription() != null) {
            issue.setDescription(command.getDescription());
        }
        if (command.getPriority() != null) {
            issue.setPriority(command.getPriority());
        }
        if (command.getStatus() != null) {
            issue.setStatus(command.getStatus());
        }
        
        return issuePort.save(issue);
    }
    
    @Override
    public void deleteIssue(Long id) {
        if (!issuePort.findById(id).isPresent()) {
            throw new IllegalArgumentException("Issue not found with id: " + id);
        }
        issuePort.deleteById(id);
    }
    
    @Override
    public void resolveIssue(Long id) {
        Issue issue = issuePort.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Issue not found with id: " + id));
        
        issue.resolve();
        issuePort.save(issue);
    }
    
    @Override
    public void closeIssue(Long id) {
        Issue issue = issuePort.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Issue not found with id: " + id));
        
        issue.close();
        issuePort.save(issue);
    }
}