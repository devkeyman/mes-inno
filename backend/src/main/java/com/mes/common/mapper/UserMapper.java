package com.mes.common.mapper;

import com.mes.adapter.out.persistence.entity.Role;
import com.mes.domain.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public User toDomain(com.mes.adapter.out.persistence.entity.User entity) {
        if (entity == null) {
            return null;
        }
        
        User domain = new User();
        domain.setId(entity.getId());
        domain.setEmail(entity.getEmail());
        domain.setName(entity.getName());
        domain.setRole(entity.getRole() != null ? entity.getRole().name() : null);
        domain.setPassword(entity.getPassword());
        domain.setIsActive(entity.getIsActive());
        domain.setCreatedAt(entity.getCreatedAt());
        domain.setUpdatedAt(entity.getUpdatedAt());
        
        return domain;
    }
    
    public com.mes.adapter.out.persistence.entity.User toEntity(User domain) {
        if (domain == null) {
            return null;
        }
        
        com.mes.adapter.out.persistence.entity.User entity = new com.mes.adapter.out.persistence.entity.User();
        entity.setId(domain.getId());
        entity.setEmail(domain.getEmail());
        entity.setName(domain.getName());
        entity.setRole(domain.getRole() != null ? Role.valueOf(domain.getRole()) : Role.WORKER);
        entity.setPassword(domain.getPassword());
        entity.setIsActive(domain.getIsActive());
        entity.setCreatedAt(domain.getCreatedAt());
        entity.setUpdatedAt(domain.getUpdatedAt());
        
        return entity;
    }
}