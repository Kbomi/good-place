# 점심먹자 프로젝트

1. 회사 동료들과 점심메뉴 고르기 힘드시죠?
2. 회사 근처에 어떤 점심 맛집이 있는지 잘 모르시겠죠?
3. 오늘 먹고 싶은 메뉴를 같이 먹을 회사 동료를 찾고 싶으시죠?

점심먹자 프로젝트에 이 고민을 위한 기능을 구현했습니다.

## 로컬 백엔드 세팅

prisma migrate

```bash
npx prisma migrate dev --name init
```

prisma db push

```bash
npx prisma db push
```

시드 데이터 추가

```bash
npx prisma db seed
```

prisma studio를 열어서 확인할 수 있습니다.

```bash
npx prisma studio
```

## 프론트 실행

```bash
npm run dev
```

로컬: [http://localhost:1004](http://localhost:1004)
