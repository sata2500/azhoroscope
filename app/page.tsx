import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

/**
 * Ana Sayfa Bileşeni
 * Kullanıcıların ilk karşılaştığı sayfa
 */
export default function AnaSayfa() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {/* Tema Değiştirici */}
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      {/* Ana İçerik */}
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          AZ-Horoscope
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Yapay Zeka Destekli Astroloji Platformu
        </p>

        {/* Durum Kartı */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">🚀 Proje Kurulumu</h2>
          <p className="text-muted-foreground">
            Faz 1: Altyapı ve Temel Kurulum aşamasındayız.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Next.js 16
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              React 19
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              TypeScript
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Tailwind CSS
            </span>
          </div>

          {/* Test Butonları */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button>Varsayılan Buton</Button>
            <Button variant="secondary">İkincil Buton</Button>
            <Button variant="outline">Çerçeveli Buton</Button>
            <Button variant="ghost">Hayalet Buton</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
