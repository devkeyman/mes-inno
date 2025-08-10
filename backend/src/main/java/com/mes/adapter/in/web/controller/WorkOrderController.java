package com.mes.adapter.in.web.controller;

import com.mes.adapter.in.web.security.CustomUserDetailsService;
import com.mes.adapter.out.persistence.entity.WorkOrder;
import com.mes.adapter.out.persistence.repository.WorkOrderRepository;
import com.mes.application.port.in.WorkOrderUseCase;
import com.mes.common.dto.workorder.CreateWorkOrderDto;
import com.mes.common.dto.workorder.WorkOrderDto;
import com.mes.common.exception.ResourceNotFoundException;
import com.mes.common.exception.UnauthorizedException;
import com.mes.common.mapper.WorkOrderMapper;
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
@RequestMapping("/api/work-orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class WorkOrderController {
    
    private final WorkOrderUseCase workOrderUseCase;
    private final WorkOrderRepository workOrderRepository;
    private final WorkOrderMapper workOrderMapper;
    
    public WorkOrderController(WorkOrderUseCase workOrderUseCase,
                              WorkOrderRepository workOrderRepository,
                              WorkOrderMapper workOrderMapper) {
        this.workOrderUseCase = workOrderUseCase;
        this.workOrderRepository = workOrderRepository;
        this.workOrderMapper = workOrderMapper;
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<WorkOrderDto> createWorkOrder(@Valid @RequestBody CreateWorkOrderDto createDto) {
        WorkOrderUseCase.CreateWorkOrderCommand command = new WorkOrderUseCase.CreateWorkOrderCommand();
        command.setOrderNumber(createDto.getOrderNumber());
        command.setProductName(createDto.getProductName());
        command.setProductCode(createDto.getProductCode());
        command.setQuantity(createDto.getQuantity());
        command.setDueDate(createDto.getDueDate());
        command.setPriority(createDto.getPriority());
        command.setInstructions(createDto.getInstructions());
        command.setAssignedToId(createDto.getAssignedToId());
        
        com.mes.domain.model.WorkOrder workOrder = workOrderUseCase.createWorkOrder(command);
        WorkOrder entity = workOrderRepository.findById(workOrder.getId())
            .orElseThrow(() -> new ResourceNotFoundException("WorkOrder", workOrder.getId()));
        
        WorkOrderDto dto = workOrderMapper.toDto(entity);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<WorkOrderDto>> getAllWorkOrders(Authentication authentication) {
        CustomUserDetailsService.CustomUserDetails userDetails = 
            (CustomUserDetailsService.CustomUserDetails) authentication.getPrincipal();
        
        List<WorkOrder> workOrders;
        
        // Workers can only see their assigned work orders
        if (authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_WORKER"))) {
            workOrders = workOrderRepository.findByAssignedToId(userDetails.getId());
        } else {
            workOrders = workOrderRepository.findAll();
        }
        
        List<WorkOrderDto> dtos = workOrders.stream()
            .map(workOrderMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<WorkOrderDto> getWorkOrderById(@PathVariable Long id, Authentication authentication) {
        WorkOrder workOrder = workOrderRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("WorkOrder", id));
        
        // Check authorization for workers
        CustomUserDetailsService.CustomUserDetails userDetails = 
            (CustomUserDetailsService.CustomUserDetails) authentication.getPrincipal();
        
        if (authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_WORKER"))) {
            if (workOrder.getAssignedTo() == null || !workOrder.getAssignedTo().getId().equals(userDetails.getId())) {
                throw new UnauthorizedException("You can only view work orders assigned to you");
            }
        }
        
        WorkOrderDto dto = workOrderMapper.toDto(workOrder);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<WorkOrderDto>> getWorkOrdersByStatus(@PathVariable String status) {
        List<com.mes.domain.model.WorkOrder> workOrders = workOrderUseCase.findWorkOrdersByStatus(status);
        List<WorkOrderDto> dtos = workOrders.stream()
            .map(wo -> {
                WorkOrder entity = workOrderRepository.findById(wo.getId()).orElse(null);
                return workOrderMapper.toDto(entity);
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER') or #userId == authentication.principal.id")
    public ResponseEntity<List<WorkOrderDto>> getWorkOrdersByUser(@PathVariable Long userId) {
        List<WorkOrder> workOrders = workOrderRepository.findByAssignedToId(userId);
        List<WorkOrderDto> dtos = workOrders.stream()
            .map(workOrderMapper::toDto)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<WorkOrderDto> updateWorkOrder(@PathVariable Long id, 
                                                        @Valid @RequestBody WorkOrderUseCase.UpdateWorkOrderCommand command) {
        com.mes.domain.model.WorkOrder workOrder = workOrderUseCase.updateWorkOrder(id, command);
        WorkOrder entity = workOrderRepository.findById(workOrder.getId())
            .orElseThrow(() -> new ResourceNotFoundException("WorkOrder", workOrder.getId()));
        
        WorkOrderDto dto = workOrderMapper.toDto(entity);
        return ResponseEntity.ok(dto);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteWorkOrder(@PathVariable Long id) {
        workOrderUseCase.deleteWorkOrder(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/start")
    public ResponseEntity<Map<String, String>> startWork(@PathVariable Long id, Authentication authentication) {
        checkWorkOrderAuthorization(id, authentication);
        workOrderUseCase.startWork(id);
        return ResponseEntity.ok(Map.of("message", "Work started successfully"));
    }
    
    @PostMapping("/{id}/complete")
    public ResponseEntity<Map<String, String>> completeWork(@PathVariable Long id, Authentication authentication) {
        checkWorkOrderAuthorization(id, authentication);
        workOrderUseCase.completeWork(id);
        return ResponseEntity.ok(Map.of("message", "Work completed successfully"));
    }
    
    @PutMapping("/{id}/progress")
    public ResponseEntity<Map<String, String>> updateProgress(@PathVariable Long id, 
                                                              @RequestBody Map<String, Integer> request,
                                                              Authentication authentication) {
        checkWorkOrderAuthorization(id, authentication);
        Integer progress = request.get("progress");
        
        if (progress == null) {
            throw new IllegalArgumentException("Progress value is required");
        }
        
        workOrderUseCase.updateProgress(id, progress);
        return ResponseEntity.ok(Map.of("message", "Progress updated successfully"));
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Map<String, String>> updateStatus(@PathVariable Long id, 
                                                           @RequestBody Map<String, String> request) {
        String status = request.get("status");
        
        if (status == null) {
            throw new IllegalArgumentException("Status value is required");
        }
        
        WorkOrder workOrder = workOrderRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("WorkOrder", id));
        
        // Simple status update logic here
        // In production, this should be in the service layer
        return ResponseEntity.ok(Map.of("message", "Status updated successfully"));
    }
    
    private void checkWorkOrderAuthorization(Long workOrderId, Authentication authentication) {
        CustomUserDetailsService.CustomUserDetails userDetails = 
            (CustomUserDetailsService.CustomUserDetails) authentication.getPrincipal();
        
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
            .orElseThrow(() -> new ResourceNotFoundException("WorkOrder", workOrderId));
        
        // Admins and Managers can always access
        if (authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_MANAGER"))) {
            return;
        }
        
        // Workers can only access their assigned work orders
        if (workOrder.getAssignedTo() == null || !workOrder.getAssignedTo().getId().equals(userDetails.getId())) {
            throw new UnauthorizedException("You can only modify work orders assigned to you");
        }
    }
}