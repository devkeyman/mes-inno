package com.mes.application.port.out;

import com.mes.domain.model.User;
import java.util.List;
import java.util.Optional;

public interface UserPort {
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    List<User> findAll();
    void deleteById(Long id);
    boolean existsByEmail(String email);
}