package com.mes.adapter.out.persistence;

import com.mes.adapter.out.persistence.entity.enums.WorkStatus;
import com.mes.adapter.out.persistence.repository.WorkOrderRepository;
import com.mes.application.port.out.WorkOrderPort;
import com.mes.common.mapper.WorkOrderMapper;
import com.mes.domain.model.WorkOrder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class WorkOrderPersistenceAdapter implements WorkOrderPort {
    
    private final WorkOrderRepository workOrderRepository;
    private final WorkOrderMapper workOrderMapper;
    
    public WorkOrderPersistenceAdapter(WorkOrderRepository workOrderRepository, 
                                       WorkOrderMapper workOrderMapper) {
        this.workOrderRepository = workOrderRepository;
        this.workOrderMapper = workOrderMapper;
    }
    
    @Override
    public WorkOrder save(WorkOrder workOrder) {
        com.mes.adapter.out.persistence.entity.WorkOrder entity = workOrderMapper.toEntity(workOrder);
        com.mes.adapter.out.persistence.entity.WorkOrder saved = workOrderRepository.save(entity);
        return workOrderMapper.toDomain(saved);
    }
    
    @Override
    public Optional<WorkOrder> findById(Long id) {
        return workOrderRepository.findById(id)
            .map(workOrderMapper::toDomain);
    }
    
    @Override
    public List<WorkOrder> findAll() {
        return workOrderRepository.findAll().stream()
            .map(workOrderMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<WorkOrder> findByStatus(String status) {
        WorkStatus workStatus = WorkStatus.valueOf(status);
        return workOrderRepository.findByStatus(workStatus).stream()
            .map(workOrderMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<WorkOrder> findByAssignedToId(Long userId) {
        return workOrderRepository.findByAssignedToId(userId).stream()
            .map(workOrderMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public void deleteById(Long id) {
        workOrderRepository.deleteById(id);
    }
    
    @Override
    public boolean existsByOrderNumber(String orderNumber) {
        return workOrderRepository.existsByOrderNumber(orderNumber);
    }
}