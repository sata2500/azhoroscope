import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

/**
 * NextAuth Tip Genişletmeleri
 * 
 * Kullanıcı ve oturum nesnelerine özel alanlar ekler.
 */

declare module 'next-auth' {
  /**
   * Session.user nesnesine eklenen özel alanlar
   */
  interface Session {
    user: {
      id: string;
      rol?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /**
   * JWT token'a eklenen özel alanlar
   */
  interface JWT extends DefaultJWT {
    id?: string;
    rol?: string;
  }
}
