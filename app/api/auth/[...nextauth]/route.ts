
import { prisma } from "@/constants/client";
import NextAuth, { Session } from "next-auth"
import Google from "next-auth/providers/google"


interface CustomSession extends Session {
    user: {
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }


const handler = NextAuth({
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === "google") {
          if (!user.email) {
            return false;
          }
          
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
  
          if (!existingUser) {
            // Create new user if doesn't exist
            await prisma.user.create({
              data: {
                email: user.email,
              },
            });
          }
  
          // Create or update the account
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            create: {
              userId: (existingUser?.id || (await prisma.user.findUnique({ where: { email: user.email } }))!.id),
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
            update: {
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          });
        }
        return true;
      },
      async session({ session }) {
        if (session.user?.email) {
          const user = await prisma.user.findUnique({
            where: { email: session.user.email },
          });
          if (user) {
            const customUser = session.user as CustomSession['user'];
            customUser.id = user.id.toString();
            session.user = customUser;
          }
        }
        return session;
      },
    },
    pages: {
      signIn: "/signin",
    },
    session: {
      strategy: "jwt",
    },
  });
  
  export { handler as GET, handler as POST };