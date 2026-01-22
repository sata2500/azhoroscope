/**
 * Hoş Geldiniz Sayfası
 * 
 * Yeni kullanıcılar için karşılama sayfası
 */

import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HosgelinizSayfasi() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Başlık */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            🌟 Hoş Geldiniz!
          </h1>
          <p className="mt-2 text-muted-foreground">
            AZ-Horoscope ailesine katıldığınız için teşekkürler
          </p>
        </div>

        {/* Hoş Geldiniz Kartı */}
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Merhaba <strong>{session?.user?.name}</strong>!
            </p>
            <p className="text-sm text-muted-foreground">
              Hesabınız başarıyla oluşturuldu. Şimdi astroloji yolculuğunuza başlayabilirsiniz.
            </p>

            {/* Sonraki Adımlar */}
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold">Sonraki Adımlar:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Profil bilgilerinizi tamamlayın</li>
                <li>✓ Doğum tarihinizi ekleyin</li>
                <li>✓ Doğum haritanızı oluşturun</li>
                <li>✓ Günlük burç yorumlarınızı okuyun</li>
              </ul>
            </div>
          </div>

          {/* Devam Et Butonu */}
          <Link href="/dashboard" className="mt-6 block">
            <Button className="w-full">Dashboard'a Git</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
