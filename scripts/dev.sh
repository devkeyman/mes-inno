#!/bin/bash
echo "🚀 개발 서버 실행 중..."

# 백그라운드에서 Spring Boot 실행
echo "🌸 Spring Boot 서버 시작..."
cd backend
mvn spring-boot:run &
SPRING_PID=$!

# 잠시 대기
sleep 5

# React 개발 서버 실행
echo "⚛️ React 개발 서버 시작..."
cd ../frontend
npm run dev &
REACT_PID=$!

echo ""
echo "✅ 개발 서버 실행 완료!"
echo "🌐 React: http://localhost:5173"
echo "🌐 Spring Boot: http://localhost:8080"
echo ""
echo "종료하려면 Ctrl+C를 누르세요"

# 스크립트 종료 시 모든 프로세스 종료
trap "kill $SPRING_PID $REACT_PID" EXIT
wait
