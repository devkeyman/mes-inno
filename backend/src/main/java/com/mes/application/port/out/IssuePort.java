package com.mes.application.port.out;

import com.mes.domain.model.Issue;
import java.util.List;
import java.util.Optional;

public interface IssuePort {
    Issue save(Issue issue);
    Optional<Issue> findById(Long id);
    List<Issue> findAll();
    List<Issue> findByWorkOrderId(Long workOrderId);
    List<Issue> findByStatus(String status);
    List<Issue> findByReporterId(Long reporterId);
    void deleteById(Long id);
}