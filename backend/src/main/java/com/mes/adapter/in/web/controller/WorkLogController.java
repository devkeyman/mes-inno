package com.mes.adapter.in.web.controller;

import com.mes.adapter.in.web.security.CustomUserDetailsService;
import com.mes.adapter.out.persistence.entity.WorkLog;
import com.mes.adapter.out.persistence.repository.WorkLogRepository;
import com.mes.application.port.in.WorkLogUseCase;
import com.mes.common.dto.worklog.CreateWorkLogDto;
import com.mes.common.dto.worklog.WorkLogDto;
import com.mes.common.mapper.WorkLogMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/work-logs")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class WorkLogController {
    
    private final WorkLogUseCase workLogUseCase;
    private final WorkLogRepository workLogRepository;
    private final WorkLogMapper workLogMapper;
    
    public WorkLogController(WorkLogUseCase workLogUseCase,
                            WorkLogRepository workLogRepository,
                            WorkLogMapper workLogMapper) {
        this.workLogUseCase = workLogUseCase;
        this.workLogRepository = workLogRepository;
        this.workLogMapper = workLogMapper;
    }
    
    @GetMapping
    public ResponseEntity<List<WorkLogDto>> getAllWorkLogs(
            @RequestParam(required = false) Long workOrderId,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        List<WorkLog> workLogs = workLogRepository.findAll();
        
        // Apply filters
        if (workOrderId != null) {
            workLogs = workLogs.stream()
                .filter(log -> log.getWorkOrder() != null && log.getWorkOrder().getId().equals(workOrderId))
                .collect(Collectors.toList());
        }
        
        if (userId != null) {
            workLogs = workLogs.stream()
                .filter(log -> log.getUser() != null && log.getUser().getId().equals(userId))
                .collect(Collectors.toList());
        }
        
        if (action != null) {
            workLogs = workLogs.stream()
                .filter(log -> log.getAction() != null && log.getAction().toString().equals(action))
                .collect(Collectors.toList());
        }
        
        if (startDate != null) {
            LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
            workLogs = workLogs.stream()
                .filter(log -> log.getLoggedAt() != null && log.getLoggedAt().isAfter(start))
                .collect(Collectors.toList());
        }
        
        if (endDate != null) {
            LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");
            workLogs = workLogs.stream()
                .filter(log -> log.getLoggedAt() != null && log.getLoggedAt().isBefore(end))
                .collect(Collectors.toList());
        }
        
        List<WorkLogDto> dtos = workLogs.stream()
            .map(workLogMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<WorkLogDto> getWorkLogById(@PathVariable Long id) {
        WorkLog workLog = workLogRepository.findById(id)
            .orElseThrow(() -> new com.mes.common.exception.ResourceNotFoundException("WorkLog", id));
        
        WorkLogDto dto = workLogMapper.toDto(workLog);
        return ResponseEntity.ok(dto);
    }
    
    @PostMapping
    public ResponseEntity<WorkLogDto> createWorkLog(@Valid @RequestBody CreateWorkLogDto createDto,
                                                    Authentication authentication) {
        CustomUserDetailsService.CustomUserDetails userDetails = 
            (CustomUserDetailsService.CustomUserDetails) authentication.getPrincipal();
        
        WorkLogUseCase.CreateWorkLogCommand command = new WorkLogUseCase.CreateWorkLogCommand();
        command.setWorkOrderId(createDto.getWorkOrderId());
        command.setWorkerId(userDetails.getId());
        command.setAction(createDto.getAction());
        command.setNotes(createDto.getNotes());
        command.setProgress(createDto.getProgress());
        
        com.mes.domain.model.WorkLog workLog = workLogUseCase.createWorkLog(command);
        
        // Fetch the entity to get full details
        List<WorkLog> logs = workLogRepository.findByWorkOrderIdOrderByCreatedAtDesc(workLog.getWorkOrderId());
        WorkLog savedEntity = logs.stream()
            .filter(log -> log.getId().equals(workLog.getId()))
            .findFirst()
            .orElse(null);
        
        WorkLogDto dto = workLogMapper.toDto(savedEntity);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
    
    @GetMapping("/work-order/{workOrderId}")
    public ResponseEntity<List<WorkLogDto>> getWorkLogsByWorkOrder(@PathVariable Long workOrderId) {
        List<WorkLog> workLogs = workLogRepository.findByWorkOrderIdOrderByCreatedAtDesc(workOrderId);
        List<WorkLogDto> dtos = workLogs.stream()
            .map(workLogMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    
}