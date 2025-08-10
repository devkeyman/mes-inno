#!/bin/bash
echo "🚀 환경 설정 시작..."

# MySQL 설치 (Mac)
if ! command -v mysql &> /dev/null; then
    echo "📦 MySQL 설치 중..."
    brew install mysql
    brew services start mysql
else
    echo "✅ MySQL 이미 설치됨"
fi

# 데이터베이스 생성
echo "🗄️ 데이터베이스 설정 중..."
mysql -u root << 'SQL'
CREATE DATABASE IF NOT EXISTS mes_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON mes_db.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
SQL

echo "✅ 환경 설정 완료!"
