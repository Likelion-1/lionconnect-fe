# React landing page design

_Automatically synced with your [v0.dev](https://v0.dev) deployments_

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/marksenees-projects/v0-react-landing-page-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/Ym8X1qMwipV)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/marksenees-projects/v0-react-landing-page-design](https://vercel.com/marksenees-projects/v0-react-landing-page-design)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/Ym8X1qMwipV](https://v0.dev/chat/projects/Ym8X1qMwipV)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## 카카오 OAuth2 설정

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Kakao OAuth2 Configuration
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_kakao_client_id_here
KAKAO_CLIENT_SECRET=your_kakao_client_secret_here

# Redirect URIs
NEXT_PUBLIC_KAKAO_REDIRECT_URI_DEV=http://localhost:3000/auth/kakao/callback
NEXT_PUBLIC_KAKAO_REDIRECT_URI_PROD=https://lion-connect.vercel.app/auth/kakao/callback

# Backend API URLs
NEXT_PUBLIC_API_BASE_URL=https://lionconnect-backend.onrender.com
NEXT_PUBLIC_API_BASE_URL_PROD=https://lionconnect-backend.onrender.com
```

**⚠️ 보안 주의사항:**

- `KAKAO_CLIENT_SECRET`은 절대 GitHub에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있어 자동으로 무시됩니다
- 프로덕션 환경에서는 환경 변수를 서버 설정에서 관리하세요

### 2. 백엔드 API 구현

백엔드에서 다음 엔드포인트를 구현해야 합니다:

```
POST /auth/login
```

요청 본문:

```json
{
  "email": "사용자_이메일",
  "password": "사용자_비밀번호"
}
```

응답:

```json
{
  "access_token": "JWT_토큰",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "test",
    "user_type": "student",
    "company_name": null,
    "created_at": "2025-08-08T02:15:20.362039",
    "updated_at": "2025-08-08T02:15:20.362047"
  }
}
```

### 3. 사용법

1. 헤더의 "로그인/회원가입" 버튼 클릭
2. 이메일과 비밀번호 입력
3. 로그인 완료 후 자동으로 홈페이지로 이동
