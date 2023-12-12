import executeDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export type TLoginData = {
  userId: string;
  password: string;
};

export type TUserData = {
  id: number;
  name: string;
  fk_organization_id: number;
} & TLoginData;

// TODO: 에러 핸들링
export async function POST(req: NextRequest) {
  const body = await req.json();
  const findUserQuery = `select * from users where userId = '${body.userId}'`;

  try {
    const userData: TUserData[] = await executeDB(findUserQuery);

    if (!userData.length) {
      throw new Error("일치하는 계정정보가 없습니다.");
    }
    const userPassword = userData[0].password;
    if (userPassword !== body.password) {
      // 입력한 비밀번호가 틀렸을 경우
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    const users = JSON.stringify(userData[0]);

    return new NextResponse(users, {
      status: 200,
    });
  } catch (error) {
    console.log("api error:::", error);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
