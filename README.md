# AIDT 실시간 모니터링 서비스

기획자, 운영자를 위한 실시간 관제 및 분석 대시보드

## 주요 기능

### 1. 실시간 관제
- 핵심 지표 모니터링 (활성 사용자, 진행중 수업, 오류, AI 재시도율)
- 즉시 대응 필요한 알림
- 주간 트렌드 차트
- 시스템 상태 확인
- AI 인사이트 요약

### 2. UUID 검색
- 특정 사용자의 활동 로그 조회
- 사용자 정보 및 활동 타임라인
- 상세 행동 패턴 분석

### 3. 서비스 통계
#### 활용도 분석
- 과목별 사용자 현황 (수학/영어)
- 지역별 TOP 5 분석
- 접속 시간대 히트맵
- 브라우저/디바이스 환경 분석

#### 기능별 분석
- 교사/학생 기능 사용률 분석
- 문제 기능 식별 및 개선 권장
- AI 기능 집중 분석 (재시도율, 사용 트렌드)
- AI 사용량 급증/급감 추적

#### 사용자 여정
- 주요 사용자 플로우 시각화
- 강한/약한 연결 기능쌍 분석
- 페이지 전환율 모니터링
- 이탈 지점 식별

### 4. 오류 관리
- 금주 오류 현황 대시보드
- 기능별 오류 TOP 5
- 미해결 티켓 실시간 추적
- 오류 추이 차트
- 티켓 상세 정보 모달

### 5. 로깅 체크
- 현재 업데이트 중

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: CSS Modules

## 설치 및 실행

### 1. 의존성 설치
```bash
cd aidt-monitoring
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

개발 서버가 http://localhost:3000 에서 실행됩니다.

### 3. 프로덕션 빌드
```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 4. 프로덕션 미리보기
```bash
npm run preview
```

## 배포

### Vercel 배포 (권장)
1. Vercel 계정 생성 (https://vercel.com)
2. GitHub 저장소 연결
3. 자동 배포 설정

또는 CLI로 배포:
```bash
npm install -g vercel
vercel
```

### Netlify 배포
1. Netlify 계정 생성 (https://netlify.com)
2. GitHub 저장소 연결
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 일반 웹 서버 배포
```bash
npm run build
```
생성된 `dist` 폴더의 내용을 웹 서버에 업로드합니다.

## 프로젝트 구조

```
aidt-monitoring/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── Layout.tsx       # 메인 레이아웃 (사이드바, 네비게이션)
│   │   ├── Card.tsx         # 카드 컴포넌트
│   │   └── AIInsight.tsx    # AI 인사이트 컴포넌트
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Dashboard.tsx    # 실시간 관제
│   │   ├── UUIDSearch.tsx   # UUID 검색
│   │   ├── UsageAnalysis.tsx        # 활용도 분석
│   │   ├── FeatureAnalysis.tsx      # 기능별 분석
│   │   ├── UserJourney.tsx          # 사용자 여정
│   │   ├── ErrorManagement.tsx      # 오류 관리
│   │   └── LoggingCheck.tsx         # 로깅 체크
│   ├── App.tsx              # 메인 앱 컴포넌트
│   ├── main.tsx             # 앱 진입점
│   └── index.css            # 글로벌 스타일
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 주요 화면

### 실시간 관제 대시보드
- 4개 핵심 지표 카드
- 즉시 대응 필요 알림 (최대 3개)
- 주간 트렌드 차트 (접속자, 오류율, AI 사용량)
- 시스템 상태 요약

### UUID 검색
- UUID 검색 기능
- 사용자 정보 표시
- 시간순 활동 로그 타임라인

### 서비스 통계
- 과목별/지역별 분석
- 시간대별 히트맵
- 기능별 사용률/이탈률
- AI 기능 성과 분석

### 오류 관리
- 실시간 오류 모니터링
- 티켓 관리 시스템
- 오류 추이 분석

## 개발 가이드

### 새 페이지 추가하기
1. `src/pages/` 에 새 컴포넌트 생성
2. `src/App.tsx` 에 라우트 추가
3. `src/components/Layout.tsx` 에 네비게이션 링크 추가

### 스타일링
- CSS Modules 사용 (`.module.css`)
- 글로벌 CSS 변수는 `src/index.css` 에 정의

### 컴포넌트 재사용
- Card, MetricCard: 정보 표시
- AIInsight: AI 인사이트 섹션

## 라이선스

MIT License

## 문의

프로젝트 관련 문의사항은 이슈를 통해 남겨주세요.
