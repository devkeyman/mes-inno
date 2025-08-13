# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-01-13

### Added
- Tailwind CSS v3.4.0 및 PostCSS 설정 추가
- shadcn/ui 컴포넌트 라이브러리 도입
  - Button, Card, Badge, Table, Input, Label, Select, Textarea, Sheet 컴포넌트
- 모바일 반응형 네비게이션 (햄버거 메뉴)
- 페이지별 실시간 통계 표시 (대시보드, 생산관리, 이슈관리)
- CLAUDE.md 파일로 AI 개발 가이드라인 제공

### Changed
- 전체 UI를 Tailwind CSS utility classes로 리팩토링
- Navigation 사이드바 디자인 현대화
  - 흰색 배경에 회색 테두리
  - 활성 메뉴 파란색 하이라이트
  - 사용자 프로필 섹션 개선
- 모든 페이지 헤더 스타일 통일
  - 카드 형태의 헤더
  - 실시간 통계 배지
- 컴포넌트 디자인 개선
  - 카드 기반 레이아웃
  - 호버 효과 및 트랜지션
  - 일관된 그림자 효과

### Removed
- 기존 CSS 파일 제거 (1,900줄 이상)
  - src/app/styles/index.css
  - src/app/styles/App 2.css

### Fixed
- PostCSS 호환성 문제 해결 (Tailwind CSS v3로 다운그레이드)

## [1.0.0] - 2025-01-12

### Added
- Feature-Sliced Design (FSD) 아키텍처 구조
- 사용자 인증 시스템 (JWT 기반)
  - 로그인/로그아웃 기능
  - 자동 토큰 갱신
  - Protected Route 구현
- 대시보드 페이지
  - 통계 카드
  - 생산 현황 모니터링
  - 최근 활동 내역
- 생산 관리 페이지
  - 작업 지시서 CRUD
  - 작업 진행률 추적
  - 상태별 필터링
- 이슈 관리 페이지
  - 이슈 등록/수정/삭제
  - 우선순위 및 타입별 분류
  - 상태 관리 (Open, In Progress, Resolved, Closed)

### Technical Stack
- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.0
- **State Management**: 
  - Zustand 5.0.7 (Client State)
  - TanStack React Query 5.84.2 (Server State)
- **Routing**: React Router DOM 7.8.0
- **HTTP Client**: Axios 1.11.0
- **UI Icons**: Lucide React 0.539.0

### Project Structure
```
src/
├── app/          # Application setup
├── pages/        # Page components
├── widgets/      # Complex UI blocks
├── features/     # Business logic
├── entities/     # Domain models
└── shared/       # Reusable utilities
```

## Version History

- **1.1.0** - UI/UX 전면 개편 (Tailwind CSS + shadcn/ui)
- **1.0.0** - 초기 릴리즈 (MES 시스템 기본 기능)