package com.mes.adapter.out.persistence.repository;

import com.mes.adapter.out.persistence.entity.WorkOrder;
import com.mes.adapter.out.persistence.entity.enums.WorkStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {
    
    Optional<WorkOrder> findByOrderNumber(String orderNumber);
    
    List<WorkOrder> findByStatus(WorkStatus status);
    
    List<WorkOrder> findByAssignedToId(Long userId);
    
    List<WorkOrder> findByDueDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT w FROM WorkOrder w WHERE w.assignedTo.id = :userId AND w.status = :status")
    List<WorkOrder> findByAssignedToIdAndStatus(@Param("userId") Long userId, @Param("status") WorkStatus status);
    
    @Query("SELECT w FROM WorkOrder w WHERE w.dueDate < :now AND w.status != :completedStatus")
    List<WorkOrder> findOverdueWorkOrders(@Param("now") LocalDateTime now, @Param("completedStatus") WorkStatus completedStatus);
    
    boolean existsByOrderNumber(String orderNumber);
    
    @Query("SELECT COUNT(w) FROM WorkOrder w WHERE w.status = :status")
    long countByStatus(@Param("status") WorkStatus status);
    
    List<WorkOrder> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
}