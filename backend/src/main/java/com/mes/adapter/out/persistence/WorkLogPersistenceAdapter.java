package com.mes.adapter.out.persistence;

import com.mes.adapter.out.persistence.repository.WorkLogRepository;
import com.mes.application.port.out.WorkLogPort;
import com.mes.common.mapper.WorkLogMapper;
import com.mes.domain.model.WorkLog;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class WorkLogPersistenceAdapter implements WorkLogPort {
    
    private final WorkLogRepository workLogRepository;
    private final WorkLogMapper workLogMapper;
    
    public WorkLogPersistenceAdapter(WorkLogRepository workLogRepository, 
                                     WorkLogMapper workLogMapper) {
        this.workLogRepository = workLogRepository;
        this.workLogMapper = workLogMapper;
    }
    
    @Override
    public WorkLog save(WorkLog workLog) {
        com.mes.adapter.out.persistence.entity.WorkLog entity = workLogMapper.toEntity(workLog);
        com.mes.adapter.out.persistence.entity.WorkLog saved = workLogRepository.save(entity);
        return workLogMapper.toDomain(saved);
    }
    
    @Override
    public List<WorkLog> findByWorkOrderId(Long workOrderId) {
        return workLogRepository.findByWorkOrderIdOrderByCreatedAtDesc(workOrderId).stream()
            .map(workLogMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<WorkLog> findByWorkerId(Long workerId) {
        return workLogRepository.findByWorkerId(workerId).stream()
            .map(workLogMapper::toDomain)
            .collect(Collectors.toList());
    }
}