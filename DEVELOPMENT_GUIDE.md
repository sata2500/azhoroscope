# AZ-Horoscope Geliştirme Rehberi

Bu dokümanda projeyi lokal ortamda geliştirmek için gerekli tüm bilgiler yer almaktadır.

## Sistem Gereksinimleri

- **Node.js:** v22.0.0 veya üzeri
- **npm:** v10.0.0 veya üzeri
- **Git:** Son sürüm
- **Kod Editörü:** VS Code, Cursor veya Windsurf önerilir

## Başlangıç

### 1. Projeyi Klonlama

```bash
git clone https://github.com/sata2500/azhoroscope.git
cd azhoroscope
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlama

`.env.example` dosyasını `.env.local` olarak kopyalayın ve değişkenleri doldurun:

```bash
cp .env.example .env.local
```

Gerekli değişkenler:

- **DATABASE_URL:** SQLite için `file:./dev.db` (geliştirme)
- **NEXTAUTH_SECRET:** `openssl rand -base64 32` komutu ile oluşturun
- **NEXTAUTH_URL:** `http://localhost:3000`
- **GOOGLE_CLIENT_ID:** Google OAuth Client ID
- **GOOGLE_CLIENT_SECRET:** Google OAuth Client Secret
- **GEMINI_API_KEY:** Google Gemini API anahtarı

### 4. Veritabanı Kurulumu

```bash
# Prisma Client'ı oluştur
npm run db:generate

# Veritabanı migration'ını çalıştır
npm run db:push

# Prisma Studio'yu aç (isteğe bağlı)
npm run db:studio
```

### 5. Geliştirme Sunucusunu Başlatma

```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine gidin.

## Proje Yapısı

```
azhoroscope/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Kimlik doğrulama sayfaları
│   │   ├── giris/               # Giriş sayfası
│   │   ├── cikis/               # Çıkış sayfası
│   │   ├── hata/                # Hata sayfası
│   │   └── hosgeldiniz/         # Hoş geldiniz sayfası
│   ├── dashboard/               # Kullanıcı dashboard
│   ├── api/                     # API routes
│   ├── layout.tsx               # Ana layout
│   └── page.tsx                 # Ana sayfa
├── components/                   # React bileşenleri
│   ├── ui/                      # shadcn/ui bileşenleri
│   ├── layout/                  # Layout bileşenleri
│   └── features/                # Özellik bileşenleri
├── lib/                         # Yardımcı fonksiyonlar
│   ├── auth.ts                 # NextAuth konfigürasyonu
│   ├── db.ts                   # Prisma Client
│   └── utils.ts                # Genel yardımcılar
├── prisma/                      # Veritabanı
│   ├── schema.prisma           # Veritabanı şeması
│   └── migrations/             # Migration'lar
├── public/                      # Statik dosyalar
├── styles/                      # Global stiller
├── types/                       # TypeScript tipleri
└── .ai-workspace/              # AI çalışma alanı
```

## Geliştirme Komutları

### Build ve Test

```bash
# TypeScript type checking
npm run type-check

# Production build
npm run build

# Production sunucusunu başlat
npm start

# ESLint çalıştır
npm run lint
```

### Veritabanı

```bash
# Prisma Client'ı yeniden oluştur
npm run db:generate

# Veritabanı şemasını güncelle
npm run db:push

# Yeni migration oluştur
npm run db:migrate

# Prisma Studio'yu aç
npm run db:studio
```

## Kod Yazma Kuralları

### TypeScript

- Tüm dosyalarda TypeScript kullanın (`.ts`, `.tsx`)
- Tip tanımları açık olmalıdır
- `any` tipini mümkün olduğunca kaçının

```typescript
// İyi
const getUserName = (userId: string): string => {
  return users[userId]?.name || 'Bilinmiyor';
};

// Kötü
const getUserName = (userId: any) => {
  return users[userId].name;
};
```

### React Bileşenleri

- Fonksiyonel bileşenleri tercih edin
- Hook'ları doğru şekilde kullanın
- Bileşen adlarını PascalCase ile yazın

```typescript
// İyi
export function UserCard({ user }: { user: User }) {
  return (
    <div className="p-4 border rounded">
      <h2>{user.name}</h2>
    </div>
  );
}

// Kötü
export const userCard = (props) => {
  return <div>{props.user.name}</div>;
};
```

### Stil Yazma

- Tailwind CSS kullanın
- Inline stiller yerine class'ları tercih edin
- Responsive tasarım için Tailwind breakpoint'lerini kullanın

```typescript
// İyi
<div className="p-4 md:p-8 lg:p-12">
  <h1 className="text-2xl md:text-4xl font-bold">Başlık</h1>
</div>

// Kötü
<div style={{ padding: '1rem' }}>
  <h1 style={{ fontSize: '2rem' }}>Başlık</h1>
</div>
```

### Türkçe Yorum ve Dokümantasyon

- Tüm yorumları Türkçe yazın
- Karmaşık fonksiyonları açıklayın
- JSDoc kullanarak fonksiyonları dokümante edin

```typescript
/**
 * Kullanıcının burç bilgisini alır
 * 
 * @param userId - Kullanıcı ID'si
 * @returns Kullanıcının burç bilgisi
 * @throws Kullanıcı bulunamazsa hata fırlatır
 */
function getUserHoroscope(userId: string): Horoscope {
  // Kullanıcıyı veritabanından al
  const user = database.getUser(userId);
  
  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }
  
  return calculateHoroscope(user.birthDate);
}
```

## Git Workflow

### Branch Stratejisi

- `main` - Üretim branch'i
- `develop` - Geliştirme branch'i
- `feature/*` - Yeni özellikler
- `bugfix/*` - Hata düzeltmeleri
- `hotfix/*` - Acil düzeltmeler

### Commit Mesajları

Commit mesajlarını aşağıdaki formatta yazın:

```
<type>: <açıklama>

<detaylı açıklama (isteğe bağlı)>

<footer (isteğe bağlı)>
```

Tipleri:

- `feat:` - Yeni özellik
- `fix:` - Hata düzeltmesi
- `docs:` - Dokümantasyon
- `style:` - Kod stili (formatting, missing semicolons, etc)
- `refactor:` - Kod refactoring
- `perf:` - Performans iyileştirmesi
- `test:` - Test ekleme veya düzeltme
- `chore:` - Bağımlılık güncelleme, build konfigürasyonu vb.

Örnekler:

```
feat: Günlük burç yorumu API'sı eklendi

- Gemini API entegrasyonu yapıldı
- Tüm 12 burç için yorum oluşturuluyor
- Veritabanına yorumlar kaydediliyor

Closes #123
```

```
fix: Dashboard sayfa yükleme hatası düzeltildi

Middleware'de oturum kontrolü eksikti
```

## Testing

### Unit Tests

```bash
# Test'leri çalıştır
npm test

# Coverage raporu oluştur
npm test -- --coverage
```

### E2E Tests

```bash
# Playwright E2E test'lerini çalıştır
npm run test:e2e
```

## Debugging

### VS Code Debugger

`.vscode/launch.json` dosyasını oluşturun:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Browser DevTools

- F12 tuşu ile DevTools'u açın
- Network tab'ında API çağrılarını izleyin
- Console tab'ında hataları kontrol edin

### Prisma Studio

Veritabanını görsel olarak incelemek için:

```bash
npm run db:studio
```

## Performans Optimizasyonu

### Image Optimization

```typescript
import Image from 'next/image';

// İyi
<Image
  src="/horoscope.jpg"
  alt="Burç Yorumu"
  width={400}
  height={300}
  priority
/>

// Kötü
<img src="/horoscope.jpg" alt="Burç Yorumu" />
```

### Code Splitting

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Yükleniyor...</div>,
});
```

### Caching

```typescript
// ISR (Incremental Static Regeneration)
export const revalidate = 3600; // 1 saat

// Dynamic rendering
export const dynamic = 'force-dynamic';
```

## Sık Sorulan Sorular

### Veritabanı migrasyonlarını nasıl oluştururum?

```bash
npm run db:migrate
```

Prisma otomatik olarak migration dosyasını oluşturacaktır.

### Yeni bir bileşen nasıl oluştururum?

1. `components/` klasöründe yeni dosya oluşturun
2. Bileşeni TypeScript ile yazın
3. `index.ts` dosyasından export edin

### API endpoint'i nasıl oluştururum?

1. `app/api/` klasöründe yeni klasör oluşturun
2. `route.ts` dosyası oluşturun
3. `GET`, `POST` vb. fonksiyonları tanımlayın

```typescript
// app/api/horoscope/route.ts
export async function GET(request: Request) {
  return Response.json({ message: 'Burç yorumu' });
}
```

### Ortam değişkenlerini nasıl kullanırım?

```typescript
// Sunucu tarafında
const apiKey = process.env.GEMINI_API_KEY;

// İstemci tarafında (NEXT_PUBLIC_ ile başlayan)
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
```

## Kaynaklar

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [React Dokümantasyonu](https://react.dev)
- [TypeScript Dokümantasyonu](https://www.typescriptlang.org/docs)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com/docs)
- [Prisma Dokümantasyonu](https://www.prisma.io/docs)
- [NextAuth.js Dokümantasyonu](https://authjs.dev)

## Yardım ve Destek

Sorularınız için:

1. Proje README'sini kontrol edin
2. `.ai-workspace/` klasöründeki dokümantasyonu okuyun
3. GitHub Issues'de arayın
4. Yeni bir issue oluşturun

---

**Son Güncelleme:** 22 Ocak 2026  
**Geliştirici:** Salih TANRISEVEN
