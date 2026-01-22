/**
 * Hata Sayfası
 * 
 * Kimlik doğrulama sırasında oluşan hataları gösterir
 */

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HataSayfasi({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const hataKodu = searchParams.error || 'UNKNOWN';
  
  // Hata mesajlarını Türkçeye çevir
  const hataMetinleri: Record<string, string> = {
    'OAuthSignin': 'OAuth oturum açma sırasında hata oluştu',
    'OAuthCallback': 'OAuth callback sırasında hata oluştu',
    'OAuthCreateAccount': 'Hesap oluşturma sırasında hata oluştu',
    'EmailCreateAccount': 'E-posta hesabı oluşturma sırasında hata oluştu',
    'Callback': 'Callback sırasında hata oluştu',
    'OAuthAccountNotLinked': 'E-posta başka bir sağlayıcıyla bağlı',
    'EmailSignInError': 'E-posta oturum açma sırasında hata oluştu',
    'CredentialsSignin': 'Kimlik bilgileri hatalı',
    'SessionCallback': 'Session callback sırasında hata oluştu',
    'JWTCallback': 'JWT callback sırasında hata oluştu',
    'UNKNOWN': 'Bilinmeyen bir hata oluştu',
  };

  const hataMetni = hataMetinleri[hataKodu] || hataMetinleri['UNKNOWN'];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Başlık */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            ⚠️ Hata Oluştu
          </h1>
          <p className="mt-2 text-muted-foreground">
            {hataMetni}
          </p>
        </div>

        {/* Hata Kartı */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-900 dark:bg-red-950">
          <p className="mb-4 text-sm text-red-800 dark:text-red-200">
            <strong>Hata Kodu:</strong> {hataKodu}
          </p>
          <p className="text-sm text-red-700 dark:text-red-300">
            Lütfen daha sonra tekrar deneyin. Sorun devam ederse, destek ekibimize başvurun.
          </p>
        </div>

        {/* Geri Dön Butonu */}
        <div className="flex flex-col gap-2">
          <Link href="/giris">
            <Button className="w-full">Giriş Sayfasına Dön</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
