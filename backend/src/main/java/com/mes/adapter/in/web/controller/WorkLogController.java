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
    
    @GetMapping("/worker/{workerId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER') or #workerId == authentication.principal.id")
    public ResponseEntity<List<WorkLogDto>> getWorkLogsByWorker(@PathVariable Long workerId) {
        List<WorkLog> workLogs = workLogRepository.findByWorkerId(workerId);
        List<WorkLogDto> dtos = workLogs.stream()
            .map(workLogMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/my-logs")
    public ResponseEntity<List<WorkLogDto>> getMyWorkLogs(Authentication authentication) {
        CustomUserDetailsService.CustomUserDetails userDetails = 
            (CustomUserDetailsService.CustomUserDetails) authentication.getPrincipal();
        
        List<WorkLog> workLogs = workLogRepository.findByWorkerId(userDetails.getId());
        List<WorkLogDto> dtos = workLogs.stream()
            .map(workLogMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
}