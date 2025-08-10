package com.mes.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = {"com.mes.adapter.out.persistence.entity"})
@EnableJpaRepositories(basePackages = {"com.mes.adapter.out.persistence.repository"})
public class JpaConfig {
    // JPA Entity 및 Repository 스캔 설정
}