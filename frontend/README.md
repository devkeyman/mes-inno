# Smart Factory MES - Frontend

스마트 팩토리 제조 실행 시스템(MES)의 프론트엔드 애플리케이션입니다.

## 🚀 주요 기능

- **대시보드**: 생산 현황 및 통계 정보 제공
- **생산 관리**: 작업 지시서 생성, 수정, 삭제 및 상태 관리
- **이슈 관리**: 생산 이슈 등록, 추적 및 해결
- **사용자 인증**: 로그인/로그아웃 및 권한 관리
- **실시간 모니터링**: 생산 현황 실시간 추적

## 🛠 기술 스택

- **React 19** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구 및 개발 서버
- **React Router** - 클라이언트 사이드 라우팅
- **TanStack Query** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리
- **Axios** - HTTP 클라이언트

## 📁 프로젝트 구조

```
src/
├── app/                    # 애플리케이션 레이어
│   ├── index.tsx          # 앱 진입점
│   ├── layout.tsx         # 레이아웃 컴포넌트
│   ├── router.tsx         # 라우팅 설정
│   └── styles/            # 전역 스타일
├── pages/                 # 페이지 레이어
│   ├── dashboard/         # 대시보드 페이지
│   ├── production/        # 생산 관리 페이지
│   ├── issues/            # 이슈 관리 페이지
│   └── auth/              # 인증 페이지
├── widgets/               # 위젯 레이어
│   ├── dashboard/         # 대시보드 위젯
│   ├── production/        # 생산 관리 위젯
│   └── issues/            # 이슈 관리 위젯
├── features/              # 기능 레이어
│   ├── auth/              # 인증 기능
│   ├── dashboard/         # 대시보드 기능
│   ├── production/        # 생산 관리 기능
│   └── issues/            # 이슈 관리 기능
├── entities/              # 엔티티 레이어
│   ├── user/              # 사용자 엔티티
│   ├── production/        # 생산 엔티티
│   └── issues/            # 이슈 엔티티
└── shared/                # 공유 레이어
    ├── api/               # API 클라이언트
    ├── components/        # 공통 컴포넌트
    ├── config/            # 설정
    ├── stores/            # 상태 관리
    └── types/             # 공통 타입
```

## 🏗 아키텍처

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처 패턴을 따릅니다:

- **app**: 애플리케이션 설정, 라우팅, 프로바이더
- **pages**: 위젯을 조합하는 페이지 컴포넌트
- **widgets**: 기능을 조합하는 복잡한 UI 블록
- **features**: 비즈니스 로직 및 사용자 상호작용
- **entities**: 도메인 엔티티 및 로직
- **shared**: 재사용 가능한 유틸리티, UI 컴포넌트, 타입

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 타입 체크
npm run type-check

# 린트 검사
npm run lint
```

### 환경 변수

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 👥 테스트 계정

개발 환경에서 사용할 수 있는 테스트 계정:

- **관리자**: admin@mes.com / password123
- **작업자**: worker@mes.com / password123

## 📝 개발 가이드라인

1. **타입 안전성**: 모든 컴포넌트와 함수에 TypeScript 타입을 명시
2. **컴포넌트 구조**: 기능별로 모듈화하고 재사용 가능하게 설계
3. **상태 관리**: TanStack Query로 서버 상태, Zustand로 클라이언트 상태 관리
4. **에러 처리**: 적절한 에러 바운더리와 사용자 친화적 에러 메시지 제공
5. **성능 최적화**: React.memo, useMemo, useCallback 적절히 사용

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
