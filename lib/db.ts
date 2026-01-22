import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton
 * 
 * Next.js geliştirme ortamında hot-reload nedeniyle
 * birden fazla PrismaClient örneği oluşmasını önler.
 * 
 * Prisma 7'de SQLite için özel bir adaptör gerekmez, 
 * ancak DATABASE_URL'in doğru şekilde yüklendiğinden emin olunmalıdır.
 * 
 * @see https://www.prisma.io/docs/guides/nextjs
 */

// Global tip tanımı
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma client örneği
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

// Geliştirme ortamında global'e ata
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Veritabanı bağlantısını kapat
 */
export async function veritabaniBaglantisinKapat() {
  await prisma.$disconnect();
}

export default prisma;
