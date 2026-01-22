/**
 * Dashboard Ana Sayfası
 * 
 * Kullanıcının giriş yaptıktan sonra gördüğü ana sayfa
 */

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  // Oturum bilgisini al
  const session = await auth();

  // Oturum yoksa giriş sayfasına yönlendir
  if (!session?.user) {
    redirect('/giris');
  }

  return (
    <div className="space-y-8">
      {/* Hoş Geldiniz Kartı */}
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h2 className="mb-2 text-2xl font-bold">
          Hoş Geldiniz, {session.user.name}!
        </h2>
        <p className="text-muted-foreground">
          AZ-Horoscope platformuna hoş geldiniz. Burç yorumlarınızı görmek için aşağıdaki seçeneklerden birini seçin.
        </p>
      </div>

      {/* Özellikler Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Günlük Burç Yorumu */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">📅 Günlük Burç Yorumu</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Bugünün burç yorumunuzu öğrenin
          </p>
          <Button className="w-full">Yorumu Gör</Button>
        </div>

        {/* Doğum Haritası */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">🌟 Doğum Haritası</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Kişisel doğum haritanızı görüntüleyin
          </p>
          <Button className="w-full">Haritayı Gör</Button>
        </div>

        {/* Haftalık Yorum */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">📊 Haftalık Yorum</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Bu haftanın burç tahmini
          </p>
          <Button className="w-full">Tahmini Gör</Button>
        </div>
      </div>

      {/* Profil Bilgileri */}
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">👤 Profil Bilgileri</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>E-posta:</strong> {session.user.email}
          </p>
          <p>
            <strong>Ad:</strong> {session.user.name || 'Belirtilmemiş'}
          </p>
        </div>
      </div>
    </div>
  );
}
