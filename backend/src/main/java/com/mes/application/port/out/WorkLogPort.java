package com.mes.application.port.out;

import com.mes.domain.model.WorkLog;
import java.util.List;

public interface WorkLogPort {
    WorkLog save(WorkLog workLog);
    List<WorkLog> findByWorkOrderId(Long workOrderId);
    List<WorkLog> findByWorkerId(Long workerId);
}