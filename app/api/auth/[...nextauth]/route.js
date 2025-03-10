import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON?.stringify({ email, password }),
          }
        );
        const user = await response?.json();

        if (response?.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          scope: "openid email profile",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        try {
          const decodedToken = jwtDecode(account?.id_token);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/login/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user?.email,
                first_name: decodedToken?.given_name,
                last_name: decodedToken?.family_name,
              }),
            }
          );

          const data = await response?.json();

          if (response?.ok && data) {
            return {
              ...token,
              ...user,
              data,
            };
          }

          throw new Error("An error occured! Please try again.");
        } catch (error) {
          const { response } = error;
          if (response?.status === 401) {
            throw new Error("Unauthorized");
          }

          throw new Error("An error occured! Please try again.");
        }
      } else if (account?.provider === "credentials") {
        return {
          ...token,
          ...user,
        };
      }

      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
        accessToken: token.accessToken,
        idToken: token.idToken,
      };
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
