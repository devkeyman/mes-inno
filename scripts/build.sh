#!/bin/bash

# 스크립트 시작 메시지
echo "🔨 MES 프로토타입 빌드 시작..."

# 에러 발생 시 스크립트 중단
set -e

# 1단계: React 빌드
echo "📦 React 빌드 중..."
cd frontend
npm run build
echo "✅ React 빌드 완료!"

# 2단계: 기존 파일 정리
echo "🗑️ 기존 static 파일 정리 중..."
cd ..
rm -rf backend/src/main/resources/static/*
echo "✅ 기존 파일 정리 완료!"

# 3단계: 파일 복사
echo "📁 빌드 파일 복사 중..."
cp -r frontend/dist/* backend/src/main/resources/static/
echo "✅ 파일 복사 완료!"

# 4단계: Spring Boot 빌드
echo "🔨 Spring Boot 빌드 중..."
cd backend
mvn clean package -DskipTests
echo "✅ Spring Boot 빌드 완료!"

# 완료 메시지
echo ""
echo "🎉 모든 빌드가 완료되었습니다!"
echo "JAR 파일 위치: backend/target/"
ls -la target/*.jar

