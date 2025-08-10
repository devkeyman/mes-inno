package com.mes.adapter.in.web.controller;

import com.mes.adapter.out.persistence.entity.Issue;
import com.mes.adapter.out.persistence.entity.User;
import com.mes.adapter.out.persistence.entity.WorkOrder;
import com.mes.adapter.out.persistence.entity.enums.IssueStatus;
import com.mes.adapter.out.persistence.entity.enums.Priority;
import com.mes.adapter.out.persistence.entity.enums.WorkStatus;
import com.mes.adapter.out.persistence.repository.IssueRepository;
import com.mes.adapter.out.persistence.repository.UserRepository;
import com.mes.adapter.out.persistence.repository.WorkOrderRepository;
import com.mes.common.dto.dashboard.DashboardSummaryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class DashboardController {
    
    private final WorkOrderRepository workOrderRepository;
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    
    public DashboardController(WorkOrderRepository workOrderRepository,
                              IssueRepository issueRepository,
                              UserRepository userRepository) {
        this.workOrderRepository = workOrderRepository;
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
    }
    
    @GetMapping("/summary")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<DashboardSummaryDto> getDashboardSummary() {
        DashboardSummaryDto summary = new DashboardSummaryDto();
        
        // Work Orders Statistics
        List<WorkOrder> allWorkOrders = workOrderRepository.findAll();
        summary.setTotalWorkOrders((long) allWorkOrders.size());
        summary.setPendingWorkOrders(workOrderRepository.countByStatus(WorkStatus.PENDING));
        summary.setInProgressWorkOrders(workOrderRepository.countByStatus(WorkStatus.IN_PROGRESS));
        summary.setCompletedWorkOrders(workOrderRepository.countByStatus(WorkStatus.COMPLETED));
        
        // Calculate average progress
        double avgProgress = allWorkOrders.stream()
            .mapToInt(WorkOrder::getProgress)
            .average()
            .orElse(0.0);
        summary.setAverageProgress(avgProgress);
        
        // Work Orders by Status
        Map<String, Long> workOrdersByStatus = new HashMap<>();
        for (WorkStatus status : WorkStatus.values()) {
            workOrdersByStatus.put(status.name(), workOrderRepository.countByStatus(status));
        }
        summary.setWorkOrdersByStatus(workOrdersByStatus);
        
        // Work Orders by Priority
        Map<String, Long> workOrdersByPriority = new HashMap<>();
        for (Priority priority : Priority.values()) {
            long count = allWorkOrders.stream()
                .filter(wo -> wo.getPriority() == priority)
                .count();
            workOrdersByPriority.put(priority.name(), count);
        }
        summary.setWorkOrdersByPriority(workOrdersByPriority);
        
        // Issues Statistics
        List<Issue> allIssues = issueRepository.findAll();
        summary.setTotalIssues((long) allIssues.size());
        
        long openIssues = allIssues.stream()
            .filter(i -> i.getStatus() == IssueStatus.OPEN || i.getStatus() == IssueStatus.IN_PROGRESS)
            .count();
        summary.setOpenIssues(openIssues);
        
        long resolvedIssues = allIssues.stream()
            .filter(i -> i.getStatus() == IssueStatus.RESOLVED || i.getStatus() == IssueStatus.CLOSED)
            .count();
        summary.setResolvedIssues(resolvedIssues);
        
        // Issues by Priority
        Map<String, Long> issuesByPriority = new HashMap<>();
        for (Priority priority : Priority.values()) {
            long count = allIssues.stream()
                .filter(i -> i.getPriority() == priority)
                .count();
            issuesByPriority.put(priority.name(), count);
        }
        summary.setIssuesByPriority(issuesByPriority);
        
        // Users Statistics
        List<User> allUsers = userRepository.findAll();
        summary.setTotalUsers((long) allUsers.size());
        
        long activeUsers = allUsers.stream()
            .filter(User::getIsActive)
            .count();
        summary.setActiveUsers(activeUsers);
        
        return ResponseEntity.ok(summary);
    }
    
    @GetMapping("/statistics/work-orders")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Map<String, Object>> getWorkOrderStatistics(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        Map<String, Object> statistics = new HashMap<>();
        
        LocalDateTime start = startDate != null ? LocalDateTime.parse(startDate) : LocalDateTime.now().minusMonths(1);
        LocalDateTime end = endDate != null ? LocalDateTime.parse(endDate) : LocalDateTime.now();
        
        List<WorkOrder> workOrders = workOrderRepository.findByDueDateBetween(start, end);
        
        // Basic counts
        statistics.put("total", workOrders.size());
        statistics.put("completed", workOrders.stream().filter(wo -> wo.getStatus() == WorkStatus.COMPLETED).count());
        statistics.put("inProgress", workOrders.stream().filter(wo -> wo.getStatus() == WorkStatus.IN_PROGRESS).count());
        statistics.put("pending", workOrders.stream().filter(wo -> wo.getStatus() == WorkStatus.PENDING).count());
        
        // Completion rate
        long completed = (long) workOrders.stream().filter(wo -> wo.getStatus() == WorkStatus.COMPLETED).count();
        double completionRate = workOrders.isEmpty() ? 0 : (completed * 100.0) / workOrders.size();
        statistics.put("completionRate", completionRate);
        
        // Overdue work orders
        List<WorkOrder> overdueOrders = workOrderRepository.findOverdueWorkOrders(LocalDateTime.now(), WorkStatus.COMPLETED);
        statistics.put("overdueCount", overdueOrders.size());
        
        return ResponseEntity.ok(statistics);
    }
    
    @GetMapping("/statistics/productivity")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Map<String, Object>> getProductivityStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        
        List<WorkOrder> allWorkOrders = workOrderRepository.findAll();
        List<User> allUsers = userRepository.findAll();
        
        // Work orders per user
        Map<String, Long> workOrdersPerUser = new HashMap<>();
        for (User user : allUsers) {
            long count = workOrderRepository.findByAssignedToId(user.getId()).size();
            workOrdersPerUser.put(user.getName(), count);
        }
        statistics.put("workOrdersPerUser", workOrdersPerUser);
        
        // Average completion time (in days)
        double avgCompletionTime = allWorkOrders.stream()
            .filter(wo -> wo.getStatus() == WorkStatus.COMPLETED && wo.getStartedAt() != null && wo.getCompletedAt() != null)
            .mapToLong(wo -> java.time.Duration.between(wo.getStartedAt(), wo.getCompletedAt()).toDays())
            .average()
            .orElse(0.0);
        statistics.put("averageCompletionTimeDays", avgCompletionTime);
        
        // Total quantity produced
        int totalQuantity = allWorkOrders.stream()
            .filter(wo -> wo.getStatus() == WorkStatus.COMPLETED)
            .mapToInt(WorkOrder::getQuantity)
            .sum();
        statistics.put("totalQuantityProduced", totalQuantity);
        
        return ResponseEntity.ok(statistics);
    }
}