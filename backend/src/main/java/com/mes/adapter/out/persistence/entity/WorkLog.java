package com.mes.adapter.out.persistence.entity;

import com.mes.adapter.out.persistence.entity.enums.LogAction;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_logs")
public class WorkLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_order_id", nullable = false)
    private WorkOrder workOrder;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id", nullable = false)
    private User worker;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LogAction action;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    private Integer progress;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public WorkOrder getWorkOrder() { return workOrder; }
    public void setWorkOrder(WorkOrder workOrder) { this.workOrder = workOrder; }
    
    public User getWorker() { return worker; }
    public void setWorker(User worker) { this.worker = worker; }
    
    public LogAction getAction() { return action; }
    public void setAction(LogAction action) { this.action = action; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}