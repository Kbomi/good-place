import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./_components/theme";

// import { getServerSession } from "next-auth";
// import AuthProvider from "@/context/SessionProvider";
// import Authroization from "@/context/Authorization";

const notoSansKr = Noto_Sans_KR({
  preload: false,
  weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

export const metadata: Metadata = {
  title: "점심먹자",
  description: "직장인들의 점심 고민 같이 공유해요.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <ThemeProvider theme={theme}>
        <body className={`${notoSansKr.className}`}>
          {/* <AuthProvider>
            <Authroization>
              {children}
              <div id="modal"></div>
            </Authroization>
          </AuthProvider> */}
          {children}
          <div id="modal"></div>
        </body>
      </ThemeProvider>
    </html>
  );
}
