# Smart Factory MES v4.0

종이패키지 제조업을 위한 스마트 팩토리 MES (Manufacturing Execution System) 시스템입니다.

## 🚀 주요 기능

- 📊 **실시간 대시보드**: 생산 현황을 실시간으로 모니터링
- 🏭 **생산관리**: 작업지시서 관리 및 생산 진행 상황 추적
- 📦 **자재관리**: 원자재 및 부자재 재고 관리
- 🎯 **품질관리**: 품질 검사 및 불량률 관리
- ⚙️ **설비관리**: 생산 설비 상태 모니터링
- 👥 **사용자관리**: 시스템 사용자 권한 관리

## 🛠️ 기술 스택

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Form Validation**: Zod

## 📋 시스템 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Git

## 🔧 설치 및 실행 가이드

### Windows

1. **Node.js 설치**

   - [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전 다운로드
   - 설치 프로그램 실행 및 기본 설정으로 설치

2. **Git 설치**

   - [Git 공식 웹사이트](https://git-scm.com/)에서 Windows 버전 다운로드
   - 설치 프로그램 실행 및 기본 설정으로 설치

3. **프로젝트 클론**

   ```bash
   git clone https://github.com/your-username/smart-factory-mes.git
   cd smart-factory-mes
   ```

4. **의존성 설치**

   ```bash
   npm install
   ```

5. **개발 서버 실행**

   ```bash
   npm run dev
   ```

6. **브라우저에서 접속**
   - 웹 브라우저를 열고 `http://localhost:3000` 접속

### macOS

1. **Homebrew 설치** (이미 설치되어 있다면 건너뛰기)

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Node.js 설치**

   ```bash
   brew install node
   ```

3. **Git 설치** (이미 설치되어 있다면 건너뛰기)

   ```bash
   brew install git
   ```

4. **프로젝트 클론**

   ```bash
   git clone https://github.com/your-username/smart-factory-mes.git
   cd smart-factory-mes
   ```

5. **의존성 설치**

   ```bash
   npm install
   ```

6. **개발 서버 실행**

   ```bash
   npm run dev
   ```

7. **브라우저에서 접속**
   - 웹 브라우저를 열고 `http://localhost:3000` 접속

## 📁 프로젝트 구조

```
src/
├── app/                # Next.js App Router
│   ├── layout.tsx     # 루트 레이아웃
│   ├── page.tsx       # 대시보드
│   ├── production/    # 생산관리
│   ├── materials/     # 자재관리
│   ├── quality/       # 품질관리
│   ├── equipment/     # 설비관리
│   └── users/         # 사용자관리
├── components/        # React 컴포넌트
│   ├── common/       # 공통 컴포넌트
│   ├── dashboard/    # 대시보드 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트
│   └── ui/           # UI 컴포넌트
├── lib/              # 유틸리티 함수
└── types/            # TypeScript 타입 정의
```

## 🎨 주요 특징

- ✅ **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원
- ✅ **다크 모드**: 라이트/다크 테마 토글
- ✅ **실시간 업데이트**: 생산 데이터 실시간 동기화
- ✅ **권한 기반 접근**: 사용자 역할별 기능 제한
- ✅ **타입 안정성**: TypeScript로 타입 안전성 보장
- ✅ **모듈화**: 컴포넌트 기반 모듈 구조

## 🔐 보안

- 사용자 인증 및 권한 관리
- 역할 기반 접근 제어 (RBAC)
- 세션 관리

## 📝 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

## 🤝 기여

버그 리포트나 기능 제안은 GitHub Issues를 통해 제출해 주세요.

---

**Smart Factory MES v4.0** - 스마트한 제조업의 미래를 만들어갑니다.
