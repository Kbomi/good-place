// TODO: 로그인 여부에 따라 페지 리다이렉트 처리

// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// const withAuthList = ["/", "/restaurant/:path*", "/meet"];
// const withOutAuthList = ["/login"];

// const withAuth = async (req: NextRequest, token: boolean) => {
//   const url = req.nextUrl.clone();
//   const { pathname } = req.nextUrl;

//   if (!token) {
//     //토큰값이 falsy한 사용자가 withAuth페이지에 진입하려하면,
//     //미들웨어에서 req객체 중에 NextUrl 안에 담긴 pathname을 쿼리스트링을 붙여서 로그인페이지로 리다이렉트 시킴
//     url.pathname = "/login";
//     //로그인하면 이전페이지로 이동하기 위해서 쿼리스트링사용하여 붙여줌.
//     url.search = `callbackUrl=${pathname}`;

//     return NextResponse.redirect(url);
//   }
// };

// const withOutAuth = async (
//   req: NextRequest,
//   token: boolean,
//   to: string | null
// ) => {
//   const url = req.nextUrl.clone();
//   const { pathname } = req.nextUrl;

//   if (token) {
//     url.pathname = to ?? "";
//     url.search = "";

//     return NextResponse.redirect(url);
//   }
// };

// export const config = {
//   matcher: [...withAuthList, ...withOutAuthList],
// };

// export async function middleware(req: NextRequest) {
//   const auth = req.cookies.get("Authroization")?.value || "";

//   const requestHeaders = new Headers(req.headers);
//   requestHeaders.set("Authroization", auth);

//   const token = await getToken({ req });
//   const { searchParams } = req.nextUrl;
//   const callbackUrl = searchParams.get("callbackUrl");
//   const pathname = req.nextUrl.pathname;

//   const isWithAuth = withAuthList.includes(pathname);
//   const isWithOutAuth = withOutAuthList.includes(pathname);

//   if (isWithAuth) return withAuth(req, !!token);
//   if (isWithOutAuth) return withOutAuth(req, !!token, callbackUrl);
// }
