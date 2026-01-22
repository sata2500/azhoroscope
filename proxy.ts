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
     * Aşağıdaki rotalar hariç tüm rotalarda çalışır:
     * - api (API rotaları)
     * - _next/static (statik dosyalar)
     * - _next/image (resim optimizasyonu)
     * - favicon.ico (favicon)
     * - public klasörü
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
