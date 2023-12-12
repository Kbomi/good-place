import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        userId: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log("auth route credentials::", credentials);
        // console.log("auth route req::", req);

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          options
        );
        // console.log("response:", response);
        const user = await response.json();
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // TODO: 타입 정의
    async jwt({
      user,
      token,
      account,
    }: {
      user: any;
      token: any;
      account: any;
    }) {
      console.log("callback jwt user::", user);
      console.log("callback jwt token::", token);
      console.log("callback jwt account::", account);
      if (user) {
        token.user = {
          userId: user.userId,
          name: user.name,
          fk_organization_id: user.fk_organization_id,
        };
      }
      console.log("return token:", token);
      return token;
    },
    async session({ token, session }: { token: any; session: any }) {
      console.log("callback session token::", token);
      console.log("callback session session::", session);
      session.user = token.user;
      console.log("return session:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
