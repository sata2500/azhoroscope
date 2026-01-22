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

  // Oturum stratejisi
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
        token.rol = (user as { rol?: string }).rol;
      }
      return token;
    },

    /**
     * Session callback - session'a kullanıcı bilgilerini ekler
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.rol = token.rol;
      }
      return session;
    },

    /**
     * Authorized callback - route koruması için
     */
    authorized({ auth, request: { nextUrl } }) {
      const girisYapildi = !!auth?.user;
      const korunmusRotalar = ['/dashboard', '/profil', '/ayarlar'];
      const adminRotalari = ['/admin'];

      const korunmusRota = korunmusRotalar.some((rota) =>
        nextUrl.pathname.startsWith(rota)
      );
      const adminRotasi = adminRotalari.some((rota) =>
        nextUrl.pathname.startsWith(rota)
      );

      // Admin rotaları için admin rolü kontrolü
      if (adminRotasi) {
        return girisYapildi && (auth?.user as { rol?: string })?.rol === 'ADMIN';
      }

      // Korunan rotalar için giriş kontrolü
      if (korunmusRota) {
        return girisYapildi;
      }

      return true;
    },
  },

  // Güvenlik ayarları
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
});
