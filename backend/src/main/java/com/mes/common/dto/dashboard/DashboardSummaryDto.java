package com.mes.common.dto.dashboard;

import java.util.Map;

public class DashboardSummaryDto {
    private Long totalWorkOrders;
    private Long pendingWorkOrders;
    private Long inProgressWorkOrders;
    private Long completedWorkOrders;
    private Long totalIssues;
    private Long openIssues;
    private Long resolvedIssues;
    private Long totalUsers;
    private Long activeUsers;
    private Double averageProgress;
    private Map<String, Long> workOrdersByStatus;
    private Map<String, Long> issuesByPriority;
    private Map<String, Long> workOrdersByPriority;
    
    public Long getTotalWorkOrders() { return totalWorkOrders; }
    public void setTotalWorkOrders(Long totalWorkOrders) { this.totalWorkOrders = totalWorkOrders; }
    
    public Long getPendingWorkOrders() { return pendingWorkOrders; }
    public void setPendingWorkOrders(Long pendingWorkOrders) { this.pendingWorkOrders = pendingWorkOrders; }
    
    public Long getInProgressWorkOrders() { return inProgressWorkOrders; }
    public void setInProgressWorkOrders(Long inProgressWorkOrders) { this.inProgressWorkOrders = inProgressWorkOrders; }
    
    public Long getCompletedWorkOrders() { return completedWorkOrders; }
    public void setCompletedWorkOrders(Long completedWorkOrders) { this.completedWorkOrders = completedWorkOrders; }
    
    public Long getTotalIssues() { return totalIssues; }
    public void setTotalIssues(Long totalIssues) { this.totalIssues = totalIssues; }
    
    public Long getOpenIssues() { return openIssues; }
    public void setOpenIssues(Long openIssues) { this.openIssues = openIssues; }
    
    public Long getResolvedIssues() { return resolvedIssues; }
    public void setResolvedIssues(Long resolvedIssues) { this.resolvedIssues = resolvedIssues; }
    
    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
    
    public Long getActiveUsers() { return activeUsers; }
    public void setActiveUsers(Long activeUsers) { this.activeUsers = activeUsers; }
    
    public Double getAverageProgress() { return averageProgress; }
    public void setAverageProgress(Double averageProgress) { this.averageProgress = averageProgress; }
    
    public Map<String, Long> getWorkOrdersByStatus() { return workOrdersByStatus; }
    public void setWorkOrdersByStatus(Map<String, Long> workOrdersByStatus) { this.workOrdersByStatus = workOrdersByStatus; }
    
    public Map<String, Long> getIssuesByPriority() { return issuesByPriority; }
    public void setIssuesByPriority(Map<String, Long> issuesByPriority) { this.issuesByPriority = issuesByPriority; }
    
    public Map<String, Long> getWorkOrdersByPriority() { return workOrdersByPriority; }
    public void setWorkOrdersByPriority(Map<String, Long> workOrdersByPriority) { this.workOrdersByPriority = workOrdersByPriority; }
}