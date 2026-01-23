import { auth } from '@/lib/auth';

/**
 * NextAuth v5 Middleware
 * 
 * Protected ve admin rotalarını korur.
 * auth.ts dosyasındaki authorized callback'i kullanır.
 * 
 * @see https://nextjs.authjs.dev/guides/middleware
 */
export default auth;

/**
 * Middleware'in çalışacağı rotalar
 * 
 * Matcher pattern ile korunacak ve herkese açık rotalar belirlenir.
 */
export const config = {
  matcher: [
    /*
     * Aşağıdakiler HARİÇ tüm rotalar:
     * - API routes (internal auth routes hariç)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public klasöründeki dosyalar
     */
    '/((?!api/(?!auth)|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
