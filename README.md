# NestJS - TossPayments Seller Example

## 토스 페이먼트 셀러 등록 예제

실행 전, `.env` 파일에 토스 페이먼트 관련 키를 등록해야 합니다.

`TOSS_PAYMENTS_SECRET_KEY=시크릿키`   
`TOSS_PAYMENTS_ENCRYPTION_KEY=보안키`

![alt text](<images/toss-keys.png>)


---

## 실행 방법

1. 패키지 설치
```sh
pnpm install --frozen-lockfile
```

2. 환경 변수 설정  
`TOSS_PAYMENTS_SECRET_KEY=시크릿키`   
`TOSS_PAYMENTS_ENCRYPTION_KEY=보안키`


3. 테스트 실행
```sh
pnpm run start:debug
```
