package com.mes.adapter.out.persistence.repository;

import com.mes.adapter.out.persistence.entity.WorkLog;
import com.mes.adapter.out.persistence.entity.enums.LogAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkLogRepository extends JpaRepository<WorkLog, Long> {
    
    List<WorkLog> findByWorkOrderId(Long workOrderId);
    
    List<WorkLog> findByWorkerId(Long workerId);
    
    List<WorkLog> findByAction(LogAction action);
    
    @Query("SELECT w FROM WorkLog w WHERE w.workOrder.id = :workOrderId ORDER BY w.createdAt DESC")
    List<WorkLog> findByWorkOrderIdOrderByCreatedAtDesc(@Param("workOrderId") Long workOrderId);
    
    @Query("SELECT w FROM WorkLog w WHERE w.worker.id = :workerId AND w.createdAt BETWEEN :startDate AND :endDate")
    List<WorkLog> findByWorkerIdAndDateRange(@Param("workerId") Long workerId, 
                                             @Param("startDate") LocalDateTime startDate, 
                                             @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT w FROM WorkLog w WHERE w.workOrder.id = :workOrderId AND w.action = :action")
    List<WorkLog> findByWorkOrderIdAndAction(@Param("workOrderId") Long workOrderId, 
                                             @Param("action") LogAction action);
}