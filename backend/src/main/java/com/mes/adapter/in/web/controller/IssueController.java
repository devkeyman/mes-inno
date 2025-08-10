package com.mes.adapter.in.web.controller;

import com.mes.adapter.in.web.security.CustomUserDetailsService;
import com.mes.adapter.out.persistence.entity.Issue;
import com.mes.adapter.out.persistence.repository.IssueRepository;
import com.mes.application.port.in.IssueUseCase;
import com.mes.common.dto.issue.CreateIssueDto;
import com.mes.common.dto.issue.IssueDto;
import com.mes.common.dto.issue.ResolveIssueDto;
import com.mes.common.dto.issue.UpdateIssueDto;
import com.mes.common.exception.ResourceNotFoundException;
import com.mes.common.mapper.IssueMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class IssueController {
    
    private final IssueUseCase issueUseCase;
    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;
    
    public IssueController(IssueUseCase issueUseCase,
                          IssueRepository issueRepository,
                          IssueMapper issueMapper) {
        this.issueUseCase = issueUseCase;
        this.issueRepository = issueRepository;
        this.issueMapper = issueMapper;
    }
    
    @PostMapping
    public ResponseEntity<IssueDto> createIssue(@Valid @RequestBody CreateIssueDto createDto,
                                                Authentication authentication) {
        CustomUserDetailsService.CustomUserDetails userDetails = 
            (CustomUserDetailsService.CustomUserDetails) authentication.getPrincipal();
        
        IssueUseCase.CreateIssueCommand command = new IssueUseCase.CreateIssueCommand();
        command.setWorkOrderId(createDto.getWorkOrderId());
        command.setTitle(createDto.getTitle());
        command.setDescription(createDto.getDescription());
        command.setPriority(createDto.getPriority());
        command.setReporterId(userDetails.getId());
        
        com.mes.domain.model.Issue issue = issueUseCase.createIssue(command);
        Issue entity = issueRepository.findById(issue.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Issue", issue.getId()));
        
        IssueDto dto = issueMapper.toDto(entity);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<IssueDto>> getAllIssues(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long reportedBy) {
        
        List<Issue> issues = issueRepository.findAll();
        
        // Apply filters
        if (status != null) {
            issues = issues.stream()
                .filter(issue -> issue.getStatus() != null && issue.getStatus().toString().equals(status))
                .collect(Collectors.toList());
        }
        
        if (priority != null) {
            issues = issues.stream()
                .filter(issue -> issue.getPriority() != null && issue.getPriority().toString().equals(priority))
                .collect(Collectors.toList());
        }
        
        if (type != null) {
            issues = issues.stream()
                .filter(issue -> issue.getType() != null && issue.getType().equals(type))
                .collect(Collectors.toList());
        }
        
        if (reportedBy != null) {
            issues = issues.stream()
                .filter(issue -> issue.getReporter() != null && issue.getReporter().getId().equals(reportedBy))
                .collect(Collectors.toList());
        }
        
        List<IssueDto> dtos = issues.stream()
            .map(issueMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<IssueDto> getIssueById(@PathVariable Long id) {
        Issue issue = issueRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Issue", id));
        
        IssueDto dto = issueMapper.toDto(issue);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping("/work-order/{workOrderId}")
    public ResponseEntity<List<IssueDto>> getIssuesByWorkOrder(@PathVariable Long workOrderId) {
        List<Issue> issues = issueRepository.findByWorkOrderId(workOrderId);
        List<IssueDto> dtos = issues.stream()
            .map(issueMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<IssueDto>> getIssuesByStatus(@PathVariable String status) {
        List<com.mes.domain.model.Issue> issues = issueUseCase.findByStatus(status);
        List<IssueDto> dtos = issues.stream()
            .map(i -> {
                Issue entity = issueRepository.findById(i.getId()).orElse(null);
                return issueMapper.toDto(entity);
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/my-issues")
    public ResponseEntity<List<IssueDto>> getMyIssues(Authentication authentication) {
        CustomUserDetailsService.CustomUserDetails userDetails = 
            (CustomUserDetailsService.CustomUserDetails) authentication.getPrincipal();
        
        List<Issue> issues = issueRepository.findByReporterId(userDetails.getId());
        List<IssueDto> dtos = issues.stream()
            .map(issueMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER') or @issueRepository.findById(#id).orElse(null)?.reporter?.id == authentication.principal.id")
    public ResponseEntity<IssueDto> updateIssue(@PathVariable Long id,
                                                @Valid @RequestBody UpdateIssueDto updateDto) {
        IssueUseCase.UpdateIssueCommand command = new IssueUseCase.UpdateIssueCommand();
        command.setTitle(updateDto.getTitle());
        command.setDescription(updateDto.getDescription());
        command.setPriority(updateDto.getPriority());
        command.setStatus(updateDto.getStatus());
        
        com.mes.domain.model.Issue issue = issueUseCase.updateIssue(id, command);
        Issue entity = issueRepository.findById(issue.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Issue", issue.getId()));
        
        IssueDto dto = issueMapper.toDto(entity);
        return ResponseEntity.ok(dto);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        issueUseCase.deleteIssue(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/resolve")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Map<String, String>> resolveIssue(@PathVariable Long id,
                                                           @RequestBody ResolveIssueDto resolveDto) {
        // Update issue with resolution
        Issue issue = issueRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Issue", id));
        
        if (resolveDto.getResolution() != null) {
            issue.setResolution(resolveDto.getResolution());
            issueRepository.save(issue);
        }
        
        issueUseCase.resolveIssue(id);
        
        Map<String, String> response = new java.util.HashMap<>();
        response.put("message", "Issue resolved successfully");
        response.put("resolution", resolveDto.getResolution());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/{id}/close")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Map<String, String>> closeIssue(@PathVariable Long id) {
        issueUseCase.closeIssue(id);
        return ResponseEntity.ok(Map.of("message", "Issue closed successfully"));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, String>> updateIssueStatus(@PathVariable Long id,
                                                                 @RequestBody Map<String, String> request) {
        String status = request.get("status");
        
        if (status == null) {
            throw new IllegalArgumentException("Status value is required");
        }
        
        IssueUseCase.UpdateIssueCommand command = new IssueUseCase.UpdateIssueCommand();
        command.setStatus(status);
        
        issueUseCase.updateIssue(id, command);
        return ResponseEntity.ok(Map.of("message", "Issue status updated successfully"));
    }
}