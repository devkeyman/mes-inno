package com.mes.adapter.out.persistence;

import com.mes.adapter.out.persistence.entity.enums.IssueStatus;
import com.mes.adapter.out.persistence.repository.IssueRepository;
import com.mes.application.port.out.IssuePort;
import com.mes.common.mapper.IssueMapper;
import com.mes.domain.model.Issue;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class IssuePersistenceAdapter implements IssuePort {
    
    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;
    
    public IssuePersistenceAdapter(IssueRepository issueRepository, IssueMapper issueMapper) {
        this.issueRepository = issueRepository;
        this.issueMapper = issueMapper;
    }
    
    @Override
    public Issue save(Issue issue) {
        com.mes.adapter.out.persistence.entity.Issue entity = issueMapper.toEntity(issue);
        com.mes.adapter.out.persistence.entity.Issue saved = issueRepository.save(entity);
        return issueMapper.toDomain(saved);
    }
    
    @Override
    public Optional<Issue> findById(Long id) {
        return issueRepository.findById(id)
            .map(issueMapper::toDomain);
    }
    
    @Override
    public List<Issue> findAll() {
        return issueRepository.findAll().stream()
            .map(issueMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<Issue> findByWorkOrderId(Long workOrderId) {
        return issueRepository.findByWorkOrderId(workOrderId).stream()
            .map(issueMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<Issue> findByStatus(String status) {
        IssueStatus issueStatus = IssueStatus.valueOf(status);
        return issueRepository.findByStatus(issueStatus).stream()
            .map(issueMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<Issue> findByReporterId(Long reporterId) {
        return issueRepository.findByReporterId(reporterId).stream()
            .map(issueMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public void deleteById(Long id) {
        issueRepository.deleteById(id);
    }
}