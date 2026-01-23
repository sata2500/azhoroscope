import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db';

/**
 * NextAuth v5 Yapılandırması
 * 
 * Google OAuth ile kimlik doğrulama sağlar.
 * Prisma adapter ile kullanıcı bilgileri veritabanında saklanır.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Prisma adapter - veritabanı entegrasyonu
  adapter: PrismaAdapter(prisma),

  // Kimlik doğrulama sağlayıcıları
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Türkçe arayüz için
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  // Oturum stratejisi - database oturumları için jwt kullanılmaz
  session: {
    strategy: 'jwt',
  },

  // Özel sayfalar
  pages: {
    signIn: '/giris',
    signOut: '/cikis',
    error: '/hata',
    newUser: '/hosgeldiniz',
  },

  // Callback fonksiyonları
  callbacks: {
    /**
     * JWT callback - token'a kullanıcı bilgilerini ekler
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // role alanını user'dan al
        token.role = (user as { role?: string }).role;
      }
      return token;
    },

    /**
     * Session callback - session'a kullanıcı bilgilerini ekler
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | undefined;
      }
      return session;
    },

    /**
     * Authorized callback - middleware route koruması için
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ['/dashboard', '/profil', '/ayarlar'];
      const adminRoutes = ['/admin'];

      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      const isAdminRoute = adminRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      // Admin rotaları için admin rolü kontrolü
      if (isAdminRoute) {
        return isLoggedIn && (auth?.user as { role?: string })?.role === 'ADMIN';
      }

      // Korunan rotalar için giriş kontrolü
      if (isProtectedRoute) {
        return isLoggedIn;
      }

      return true;
    },
  },

  // Güvenlik ayarları
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
});
