package com.mes.adapter.in.web.controller;

import com.mes.adapter.out.persistence.entity.Issue;
import com.mes.adapter.out.persistence.entity.User;
import com.mes.adapter.out.persistence.entity.WorkLog;
import com.mes.adapter.out.persistence.entity.WorkOrder;
import com.mes.adapter.out.persistence.entity.enums.IssueStatus;
import com.mes.adapter.out.persistence.entity.enums.Priority;
import com.mes.adapter.out.persistence.entity.enums.WorkStatus;
import com.mes.adapter.out.persistence.repository.IssueRepository;
import com.mes.adapter.out.persistence.repository.UserRepository;
import com.mes.adapter.out.persistence.repository.WorkLogRepository;
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
    private final WorkLogRepository workLogRepository;
    
    public DashboardController(WorkOrderRepository workOrderRepository,
                              IssueRepository issueRepository,
                              UserRepository userRepository,
                              WorkLogRepository workLogRepository) {
        this.workOrderRepository = workOrderRepository;
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.workLogRepository = workLogRepository;
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
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Work Order Statistics
        List<WorkOrder> allWorkOrders = workOrderRepository.findAll();
        stats.put("totalWorkOrders", allWorkOrders.size());
        stats.put("pendingWorkOrders", workOrderRepository.countByStatus(WorkStatus.PENDING));
        stats.put("inProgressWorkOrders", workOrderRepository.countByStatus(WorkStatus.IN_PROGRESS));
        stats.put("completedWorkOrders", workOrderRepository.countByStatus(WorkStatus.COMPLETED));
        
        // Issue Statistics  
        List<Issue> allIssues = issueRepository.findAll();
        stats.put("totalIssues", allIssues.size());
        stats.put("openIssues", allIssues.stream()
            .filter(i -> i.getStatus() == IssueStatus.OPEN || i.getStatus() == IssueStatus.IN_PROGRESS)
            .count());
        stats.put("resolvedIssues", allIssues.stream()
            .filter(i -> i.getStatus() == IssueStatus.RESOLVED || i.getStatus() == IssueStatus.CLOSED)
            .count());
        
        // Today's Statistics
        LocalDateTime todayStart = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime todayEnd = todayStart.plusDays(1);
        
        List<WorkOrder> todayOrders = workOrderRepository.findByCreatedAtBetween(todayStart, todayEnd);
        stats.put("todayWorkOrders", todayOrders.size());
        
        long todayCompleted = todayOrders.stream()
            .filter(wo -> wo.getStatus() == WorkStatus.COMPLETED)
            .count();
        stats.put("todayCompletedOrders", todayCompleted);
        
        // Performance Metrics
        double completionRate = allWorkOrders.isEmpty() ? 0 : 
            (workOrderRepository.countByStatus(WorkStatus.COMPLETED) * 100.0) / allWorkOrders.size();
        stats.put("averageCompletionRate", Math.round(completionRate * 10) / 10.0);
        
        // On-time delivery rate
        List<WorkOrder> completedOrders = allWorkOrders.stream()
            .filter(wo -> wo.getStatus() == WorkStatus.COMPLETED)
            .toList();
        
        long onTimeCount = completedOrders.stream()
            .filter(wo -> wo.getCompletedAt() != null && wo.getDueDate() != null 
                && wo.getCompletedAt().isBefore(wo.getDueDate()))
            .count();
        
        double onTimeRate = completedOrders.isEmpty() ? 0 : (onTimeCount * 100.0) / completedOrders.size();
        stats.put("onTimeDeliveryRate", Math.round(onTimeRate * 10) / 10.0);
        
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/recent-work-orders")
    public ResponseEntity<List<Map<String, Object>>> getRecentWorkOrders(
            @RequestParam(defaultValue = "10") int limit) {
        
        List<WorkOrder> recentOrders = workOrderRepository.findAll().stream()
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(limit)
            .toList();
        
        List<Map<String, Object>> result = recentOrders.stream()
            .map(wo -> {
                Map<String, Object> orderMap = new HashMap<>();
                orderMap.put("id", wo.getId());
                orderMap.put("orderNumber", wo.getOrderNumber());
                orderMap.put("productName", wo.getProductName());
                orderMap.put("quantity", wo.getQuantity());
                orderMap.put("status", wo.getStatus().toString());
                orderMap.put("priority", wo.getPriority().toString());
                orderMap.put("progress", wo.getProgress());
                orderMap.put("dueDate", wo.getDueDate());
                orderMap.put("createdAt", wo.getCreatedAt());
                return orderMap;
            })
            .toList();
        
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/recent-issues")
    public ResponseEntity<List<Map<String, Object>>> getRecentIssues(
            @RequestParam(defaultValue = "10") int limit) {
        
        List<Issue> recentIssues = issueRepository.findAll().stream()
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(limit)
            .toList();
        
        List<Map<String, Object>> result = recentIssues.stream()
            .map(issue -> {
                Map<String, Object> issueMap = new HashMap<>();
                issueMap.put("id", issue.getId());
                issueMap.put("title", issue.getTitle());
                issueMap.put("description", issue.getDescription());
                issueMap.put("status", issue.getStatus().toString());
                issueMap.put("priority", issue.getPriority().toString());
                issueMap.put("type", issue.getType());
                issueMap.put("workOrderId", issue.getWorkOrder() != null ? issue.getWorkOrder().getId() : null);
                issueMap.put("reportedBy", issue.getReporter() != null ? issue.getReporter().getName() : null);
                issueMap.put("createdAt", issue.getCreatedAt());
                return issueMap;
            })
            .toList();
        
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/recent-activities")
    public ResponseEntity<List<Map<String, Object>>> getRecentActivities(
            @RequestParam(defaultValue = "20") int limit) {
        
        List<Map<String, Object>> activities = new java.util.ArrayList<>();
        
        // Get recent work logs
        List<WorkLog> recentLogs = workLogRepository.findAll().stream()
            .sorted((a, b) -> b.getLoggedAt().compareTo(a.getLoggedAt()))
            .limit(limit / 2)
            .toList();
        
        for (WorkLog log : recentLogs) {
            Map<String, Object> activity = new HashMap<>();
            activity.put("id", log.getId());
            activity.put("type", "WORK_LOG");
            activity.put("action", log.getAction().toString());
            activity.put("description", String.format("작업 로그: %s - %s", 
                log.getWorkOrder() != null ? log.getWorkOrder().getOrderNumber() : "N/A",
                log.getDescription()));
            activity.put("userId", log.getUser() != null ? log.getUser().getId() : null);
            activity.put("userName", log.getUser() != null ? log.getUser().getName() : null);
            activity.put("timestamp", log.getLoggedAt());
            activities.add(activity);
        }
        
        // Get recent work order creations
        List<WorkOrder> recentOrders = workOrderRepository.findAll().stream()
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(limit / 2)
            .toList();
        
        for (WorkOrder order : recentOrders) {
            Map<String, Object> activity = new HashMap<>();
            activity.put("id", order.getId());
            activity.put("type", "WORK_ORDER");
            activity.put("action", "CREATED");
            activity.put("description", String.format("작업 지시서 %s 생성됨", order.getOrderNumber()));
            activity.put("userId", null);
            activity.put("userName", "시스템");
            activity.put("timestamp", order.getCreatedAt());
            activities.add(activity);
        }
        
        // Sort all activities by timestamp
        activities.sort((a, b) -> {
            LocalDateTime timeA = (LocalDateTime) a.get("timestamp");
            LocalDateTime timeB = (LocalDateTime) b.get("timestamp");
            return timeB.compareTo(timeA);
        });
        
        return ResponseEntity.ok(activities.stream().limit(limit).toList());
    }
    
    @GetMapping("/production-summary")
    public ResponseEntity<Map<String, Object>> getProductionSummary(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        LocalDateTime start = startDate != null ? LocalDateTime.parse(startDate + "T00:00:00") 
            : LocalDateTime.now().minusMonths(1);
        LocalDateTime end = endDate != null ? LocalDateTime.parse(endDate + "T23:59:59") 
            : LocalDateTime.now();
        
        List<WorkOrder> periodOrders = workOrderRepository.findByCreatedAtBetween(start, end);
        
        Map<String, Object> summary = new HashMap<>();
        
        // Total quantities
        int totalOrdered = periodOrders.stream()
            .mapToInt(WorkOrder::getQuantity)
            .sum();
        summary.put("totalQuantityOrdered", totalOrdered);
        
        int totalProduced = periodOrders.stream()
            .filter(wo -> wo.getStatus() == WorkStatus.COMPLETED)
            .mapToInt(wo -> wo.getActualQuantity() != null ? wo.getActualQuantity() : wo.getQuantity())
            .sum();
        summary.put("totalQuantityProduced", totalProduced);
        
        double productionRate = totalOrdered == 0 ? 0 : (totalProduced * 100.0) / totalOrdered;
        summary.put("productionRate", Math.round(productionRate * 100) / 100.0);
        
        // By product
        Map<String, Map<String, Object>> byProduct = new HashMap<>();
        periodOrders.stream()
            .collect(java.util.stream.Collectors.groupingBy(WorkOrder::getProductName))
            .forEach((productName, orders) -> {
                Map<String, Object> productStats = new HashMap<>();
                int ordered = orders.stream().mapToInt(WorkOrder::getQuantity).sum();
                int produced = orders.stream()
                    .filter(wo -> wo.getStatus() == WorkStatus.COMPLETED)
                    .mapToInt(wo -> wo.getActualQuantity() != null ? wo.getActualQuantity() : wo.getQuantity())
                    .sum();
                double rate = ordered == 0 ? 0 : (produced * 100.0) / ordered;
                
                productStats.put("productName", productName);
                productStats.put("ordered", ordered);
                productStats.put("produced", produced);
                productStats.put("rate", Math.round(rate * 100) / 100.0);
                byProduct.put(productName, productStats);
            });
        summary.put("byProduct", new java.util.ArrayList<>(byProduct.values()));
        
        // By date
        List<Map<String, Object>> byDate = new java.util.ArrayList<>();
        LocalDateTime current = start.toLocalDate().atStartOfDay();
        while (current.isBefore(end)) {
            LocalDateTime dayEnd = current.plusDays(1);
            List<WorkOrder> dayOrders = periodOrders.stream()
                .filter(wo -> wo.getCreatedAt().isAfter(current) && wo.getCreatedAt().isBefore(dayEnd))
                .toList();
            
            if (!dayOrders.isEmpty()) {
                Map<String, Object> dayStats = new HashMap<>();
                dayStats.put("date", current.toLocalDate().toString());
                dayStats.put("ordered", dayOrders.stream().mapToInt(WorkOrder::getQuantity).sum());
                dayStats.put("produced", dayOrders.stream()
                    .filter(wo -> wo.getStatus() == WorkStatus.COMPLETED)
                    .mapToInt(wo -> wo.getActualQuantity() != null ? wo.getActualQuantity() : wo.getQuantity())
                    .sum());
                byDate.add(dayStats);
            }
            current = dayEnd;
        }
        summary.put("byDate", byDate);
        
        return ResponseEntity.ok(summary);
    }
}