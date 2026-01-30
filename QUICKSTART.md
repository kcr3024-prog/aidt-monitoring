# AIDT 모니터링 빠른 시작 가이드

## 🚀 빠른 시작 (3단계)

### 1단계: 프로젝트 이동
```bash
cd C:\Users\user\Desktop\AIDT\aidt-monitoring
```

### 2단계: 의존성 설치
```bash
npm install
```

### 3단계: 개발 서버 실행
```bash
npm run dev
```

브라우저가 자동으로 열리며 http://localhost:3000 에서 확인할 수 있습니다.

## 📦 배포하기

### 방법 1: Vercel (가장 쉬움, 권장)
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포 (첫 실행 시 로그인 필요)
vercel
```

### 방법 2: Netlify
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 빌드
npm run build

# 배포
netlify deploy --prod
```

### 방법 3: 수동 배포
```bash
# 빌드
npm run build

# dist 폴더를 웹 서버에 업로드
```

## 🎯 주요 기능 확인

1. **실시간 관제** - 메인 대시보드에서 핵심 지표 확인
2. **UUID 검색** - 사용자 활동 로그 조회
3. **서비스 통계** - 활용도, 기능별, 사용자 여정 분석
4. **오류 관리** - 실시간 오류 모니터링 및 티켓 관리

## 📝 다음 단계

1. 실제 API 연동 (현재는 더미 데이터 사용)
2. 인증/권한 시스템 추가
3. 데이터 필터링 기능 강화
4. 리포트 PDF 내보내기 기능

## 🛠️ 문제 해결

### 포트 3000이 이미 사용중인 경우
`vite.config.ts` 파일을 열어 포트 번호를 변경하세요:
```typescript
server: {
  port: 3001, // 다른 포트로 변경
  open: true
}
```

### 빌드 오류 발생 시
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

## 📞 지원

문제가 발생하면 이슈를 생성해주세요.
