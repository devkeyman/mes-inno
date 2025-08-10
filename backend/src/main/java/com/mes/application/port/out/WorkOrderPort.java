package com.mes.application.port.out;

import com.mes.domain.model.WorkOrder;
import java.util.List;
import java.util.Optional;

public interface WorkOrderPort {
    WorkOrder save(WorkOrder workOrder);
    Optional<WorkOrder> findById(Long id);
    List<WorkOrder> findAll();
    List<WorkOrder> findByStatus(String status);
    List<WorkOrder> findByAssignedToId(Long userId);
    void deleteById(Long id);
    boolean existsByOrderNumber(String orderNumber);
}