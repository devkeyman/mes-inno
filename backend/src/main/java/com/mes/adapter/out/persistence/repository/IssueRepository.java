package com.mes.adapter.out.persistence.repository;

import com.mes.adapter.out.persistence.entity.Issue;
import com.mes.adapter.out.persistence.entity.enums.IssueStatus;
import com.mes.adapter.out.persistence.entity.enums.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    
    List<Issue> findByWorkOrderId(Long workOrderId);
    
    List<Issue> findByStatus(IssueStatus status);
    
    List<Issue> findByPriority(Priority priority);
    
    List<Issue> findByReporterId(Long reporterId);
    
    @Query("SELECT i FROM Issue i WHERE i.workOrder.id = :workOrderId AND i.status = :status")
    List<Issue> findByWorkOrderIdAndStatus(@Param("workOrderId") Long workOrderId, 
                                           @Param("status") IssueStatus status);
    
    @Query("SELECT i FROM Issue i WHERE i.status = :status AND i.priority = :priority")
    List<Issue> findByStatusAndPriority(@Param("status") IssueStatus status, 
                                        @Param("priority") Priority priority);
    
    @Query("SELECT i FROM Issue i WHERE i.createdAt BETWEEN :startDate AND :endDate")
    List<Issue> findByDateRange(@Param("startDate") LocalDateTime startDate, 
                                @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(i) FROM Issue i WHERE i.workOrder.id = :workOrderId AND i.status != :resolvedStatus")
    long countOpenIssuesByWorkOrderId(@Param("workOrderId") Long workOrderId, 
                                      @Param("resolvedStatus") IssueStatus resolvedStatus);
    
    @Query("SELECT i FROM Issue i WHERE i.status = :openStatus ORDER BY i.priority DESC, i.createdAt ASC")
    List<Issue> findOpenIssuesOrderedByPriority(@Param("openStatus") IssueStatus openStatus);
}