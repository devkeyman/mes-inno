# Smart Factory MES (Manufacturing Execution System)

스마트 팩토리를 위한 제조 실행 시스템(MES) - 생산 관리, 작업 지시, 품질 이슈 추적을 위한 통합 플랫폼

## 📋 프로젝트 개요

Smart Factory MES는 제조 현장의 생산 활동을 실시간으로 모니터링하고 관리하는 웹 기반 시스템입니다. 작업 지시서 관리, 생산 진행 상황 추적, 품질 이슈 관리 등의 기능을 제공하여 제조 현장의 효율성을 극대화합니다.

### 주요 기능

- **사용자 인증 및 권한 관리**: JWT 기반 인증, 역할별 접근 제어 (관리자/매니저/작업자)
- **작업 지시서 관리**: 작업 생성, 할당, 진행 상황 추적, 완료 처리
- **생산 모니터링**: 실시간 생산 현황 대시보드, 생산 통계 및 리포트
- **품질 이슈 관리**: 이슈 보고, 추적, 해결 프로세스 관리
- **작업 로그**: 모든 작업 활동 기록 및 추적

## 🚀 기술 스택

### Backend
- **Framework**: Spring Boot 3.5.4
- **Language**: Java 17
- **Database**: MySQL
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven
- **Architecture**: Hexagonal Architecture (Port & Adapter Pattern)

### Frontend
- **Framework**: React 19.1.1 + TypeScript 5.9.2
- **Build Tool**: Vite 7.1.0
- **Routing**: React Router DOM 7.8.0
- **State Management**: Zustand 5.0.7
- **API Client**: Axios 1.11.0 + React Query 5.84.2
- **UI Icons**: Lucide React
- **Architecture**: Feature-Sliced Design

## 📁 프로젝트 구조

```
smart-factory-mes/
├── backend/                    # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mes/
│   │   │   │   ├── adapter/       # 어댑터 레이어 (Web, Persistence)
│   │   │   │   ├── application/   # 애플리케이션 레이어 (UseCase, Service)
│   │   │   │   ├── domain/        # 도메인 레이어 (Model, Service)
│   │   │   │   ├── config/        # 설정 클래스
│   │   │   │   └── common/        # 공통 컴포넌트 (DTO, Exception, Mapper)
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── static/        # 빌드된 프론트엔드 파일
│   │   └── test/
│   └── pom.xml
│
├── frontend/                   # React 프론트엔드
│   ├── src/
│   │   ├── app/               # 앱 설정 (라우터, 레이아웃)
│   │   ├── entities/          # 비즈니스 엔티티
│   │   ├── features/          # 기능 모듈
│   │   ├── pages/             # 페이지 컴포넌트
│   │   ├── shared/            # 공유 컴포넌트 및 유틸리티
│   │   └── widgets/           # UI 위젯
│   ├── package.json
│   └── vite.config.ts
│
├── scripts/                    # 유틸리티 스크립트
└── docs/                       # 프로젝트 문서

```

## 🛠️ 설치 및 실행

### 사전 요구사항

- Java 17 이상
- Node.js 18 이상
- MySQL 8.0 이상
- Maven 3.6 이상

### Backend 설정

1. 데이터베이스 설정
```bash
# MySQL 데이터베이스 생성
mysql -u root -p
CREATE DATABASE mes_db;
```

2. application.yml 설정
```yaml
# backend/src/main/resources/application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mes_db
    username: your_username
    password: your_password
```

3. 백엔드 실행
```bash
cd backend
./mvnw spring-boot:run
```

백엔드 서버가 http://localhost:8080 에서 실행됩니다.

### Frontend 설정

1. 의존성 설치
```bash
cd frontend
npm install
```

2. 환경 변수 설정
```bash
# .env 파일 생성
cp env.example .env
# API 엔드포인트 설정
VITE_API_URL=http://localhost:8080/api
```

3. 개발 서버 실행
```bash
npm run dev
```

프론트엔드가 http://localhost:5173 에서 실행됩니다.

## 🔨 빌드 및 배포

### 전체 빌드 (Frontend + Backend)
```bash
# 루트 디렉토리에서
./scripts/build.sh
```

### 개별 빌드

**Frontend 빌드**
```bash
cd frontend
npm run build
```

**Backend 빌드**
```bash
cd backend
./mvnw clean package
```

### Docker 배포 (선택사항)
```bash
docker-compose up -d
```

## 📝 API 문서

API 명세는 [API_SPECIFICATION.md](./backend/API_SPECIFICATION.md) 파일을 참조하세요.

주요 엔드포인트:
- `/api/auth/*` - 인증 관련
- `/api/users/*` - 사용자 관리
- `/api/work-orders/*` - 작업 지시서 관리
- `/api/issues/*` - 이슈 관리
- `/api/dashboard/*` - 대시보드 통계

## 👤 사용자 권한

시스템은 3가지 사용자 역할을 지원합니다:

| 역할 | 권한 |
|------|------|
| **ADMIN** | 시스템 전체 관리, 사용자 관리, 모든 데이터 접근 |
| **MANAGER** | 작업 지시서 관리, 이슈 할당, 보고서 조회 |
| **WORKER** | 할당된 작업 수행, 이슈 보고, 작업 로그 작성 |

### 테스트 계정
- Admin: `admin@mes.com` / `admin123`
- Manager: `manager@mes.com` / `manager123`
- Worker: `worker@mes.com` / `worker123`

## 🔧 개발 가이드

### 코드 스타일
- Backend: Java 코딩 컨벤션 준수
- Frontend: ESLint + TypeScript 규칙 적용

### 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 빌드 업무 수정
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트 관련 문의사항은 이슈 트래커를 통해 등록해 주세요.