import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const organizationData = [
  {
    name: "패션조직",
    businessNumber: "123-45-6789",
  },
  {
    name: "블록체인조직",
    businessNumber: "003-53-3456",
  },
  {
    name: "에이전시조직",
    businessNumber: "225-21-7843",
  },
];

const userData = [
  {
    email: "kimys@test.co.kr",
    userId: "kimys",
    name: "김영수",
    organizationId: 1,
  },
  {
    email: "kimys2@test.co.kr",
    userId: "kimys2",
    name: "김영숙",
    organizationId: 1,
  },
  {
    email: "leejs@test.co.kr",
    userId: "leejs",
    name: "이정숙",
    organizationId: 2,
  },
  {
    email: "parksc@test.co.kr",
    userId: "parksc",
    name: "박상철",
    organizationId: 3,
  },
];

async function addSeedData() {
  try {
    // 조직 추가
    await prisma.organization.createMany({
      data: organizationData,
    });

    // 사용자 추가
    await prisma.user.createMany({
      data: userData,
    });

    console.log("시드 데이터 추가 완료!!!");
  } catch (error) {
    console.error("시드 데이터 추가 중 에러 발생:", error);
    process.exit(1);
  } finally {
    // Prisma Client 연결 종료
    await prisma.$disconnect();
  }
}

// 함수 호출
addSeedData();
