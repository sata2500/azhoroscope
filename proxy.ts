/**
 * Next.js Middleware
 * 
 * NextAuth v5 ile route koruması sağlar.
 * Korunan sayfalara erişim kontrolü yapar.
 */
import { auth } from '@/lib/auth';

export default auth;

/**
 * Middleware'in çalışacağı rotalar
 * API rotaları ve statik dosyalar hariç tutulur
 */
export const config = {
  matcher: [
    /*
     * Aşağıdakiler HARİÇ tüm rotalar:
     * - API routes (internal auth routes hariç)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public klasöründeki dosyalar (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    '/((?!api/(?!auth)|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
