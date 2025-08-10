-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'WORKER',
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 작업지시서 테이블
CREATE TABLE IF NOT EXISTS work_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_code VARCHAR(100),
    quantity INT NOT NULL,
    due_date TIMESTAMP NOT NULL,
    priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    instructions TEXT,
    progress INT DEFAULT 0,
    assigned_to_id BIGINT,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_work_orders_status (status),
    INDEX idx_work_orders_due_date (due_date),
    INDEX idx_work_orders_assigned_to (assigned_to_id)
);

-- 작업 로그 테이블
CREATE TABLE IF NOT EXISTS work_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    work_order_id BIGINT NOT NULL,
    worker_id BIGINT NOT NULL,
    action VARCHAR(50) NOT NULL,
    notes TEXT,
    progress INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (work_order_id) REFERENCES work_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_work_logs_work_order (work_order_id),
    INDEX idx_work_logs_worker (worker_id)
);

-- 이슈 테이블
CREATE TABLE IF NOT EXISTS issues (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    work_order_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    reported_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (work_order_id) REFERENCES work_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_issues_work_order (work_order_id),
    INDEX idx_issues_status (status),
    INDEX idx_issues_reported_by (reported_by)
);

-- 초기 관리자 계정 생성 (비밀번호는 애플리케이션에서 암호화 필요)
INSERT INTO users (email, name, role, password, is_active) 
VALUES ('admin@mes.com', '관리자', 'ADMIN', 'admin123', TRUE)
ON DUPLICATE KEY UPDATE id=id;