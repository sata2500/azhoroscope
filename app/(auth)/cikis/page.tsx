/**
 * Çıkış Sayfası
 * 
 * Kullanıcı çıkış işlemini gerçekleştirir
 */

import { signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default function CikisSayfasi() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Başlık */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Çıkış Yapıyorsunuz
          </h1>
          <p className="mt-2 text-muted-foreground">
            Oturumunuz kapatılıyor...
          </p>
        </div>

        {/* Çıkış Kartı */}
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <Button type="submit" className="w-full" size="lg">
              Çıkış Yap
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Bizi ziyaret ettiğiniz için teşekkürler!
          </p>
        </div>
      </div>
    </main>
  );
}
