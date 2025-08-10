package com.mes.adapter.out.persistence;

import com.mes.adapter.out.persistence.entity.Role;
import com.mes.adapter.out.persistence.repository.UserRepository;
import com.mes.application.port.out.UserPort;
import com.mes.common.mapper.UserMapper;
import com.mes.domain.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class UserPersistenceAdapter implements UserPort {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    public UserPersistenceAdapter(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }
    
    @Override
    public User save(User user) {
        com.mes.adapter.out.persistence.entity.User entity = userMapper.toEntity(user);
        com.mes.adapter.out.persistence.entity.User saved = userRepository.save(entity);
        return userMapper.toDomain(saved);
    }
    
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id)
            .map(userMapper::toDomain);
    }
    
    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email)
            .map(userMapper::toDomain);
    }
    
    @Override
    public List<User> findAll() {
        return userRepository.findAll().stream()
            .map(userMapper::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}