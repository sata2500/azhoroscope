# AZ-Horoscope Sistem Mimarisi

**Tarih:** 22 Ocak 2026  
**Versiyon:** 1.0

## Genel Mimari

```
┌─────────────────────────────────────────────────────────────┐
│                    Kullanıcı Arayüzü (UI)                   │
│         Next.js 16 (App Router) + React 19 + TypeScript     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Katmanı                              │
│         Next.js API Routes (Route Handlers)                 │
│  - Kimlik Doğrulama (NextAuth v5)                          │
│  - Astroloji Hesaplamaları                                  │
│  - AI Entegrasyonu (Gemini)                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Veri Katmanı                             │
│  Vercel: PostgreSQL (Neon) + Prisma ORM                    │
│  Self-Hosted: SQLite + Prisma ORM                          │
│  - Kullanıcı Verileri                                       │
│  - Doğum Haritası Bilgileri                                │
│  - Günlük Yorumlar                                          │
│  - Sistem Logları                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Harici Servisler                         │
│  - Google Gemini API (AI Yorumlar)                         │
│  - Swiss Ephemeris (Astroloji Hesaplamaları)               │
│  - SMTP Servisi (E-posta Bildirimleri)                     │
└─────────────────────────────────────────────────────────────┘
```

## Klasör Yapısı

```
azhoroscope/
├── .ai/                          # AI Yönetim Merkezi
│   └── AI_MANIFESTO.md          # Proje Kuralları
├── .ai-workspace/               # Ortak Çalışma Alanı
│   ├── plans/                   # Geliştirme Planları
│   ├── research/                # Teknik Araştırmalar
│   ├── architecture/            # Sistem Tasarımları
│   ├── archive/                 # Geçmiş Belgeler
│   └── SCRATCHPAD.md           # Hızlı Notlar
├── app/                         # Next.js App Router
│   ├── layout.tsx              # Ana Layout
│   ├── page.tsx                # Ana Sayfa
│   ├── (auth)/                 # Kimlik Doğrulama Sayfaları
│   ├── dashboard/              # Kullanıcı Dashboard
│   ├── horoscope/              # Burç Yorumları
│   └── api/                    # API Routes
├── components/                  # Reusable Bileşenler
│   ├── ui/                     # shadcn/ui Bileşenleri
│   ├── layout/                 # Layout Bileşenleri
│   └── features/               # Özellik Bileşenleri
├── lib/                        # Yardımcı Fonksiyonlar
│   ├── auth.ts                # NextAuth Konfigürasyonu
│   ├── db.ts                  # Prisma Client
│   └── utils.ts               # Genel Yardımcılar
├── prisma/                     # Veritabanı Şeması
│   └── schema.prisma          # Prisma Modelleri
├── public/                     # Statik Dosyalar
├── styles/                     # Global Stiller
├── types/                      # TypeScript Tipleri
├── .env.example               # Ortam Değişkenleri Örneği
├── .cursorrules              # Cursor/Windsurf Kuralları
├── .gitignore                # Git İgnore Dosyası
├── next.config.js            # Next.js Konfigürasyonu
├── package.json              # Proje Bağımlılıkları
├── tsconfig.json             # TypeScript Konfigürasyonu
└── README.md                 # Proje Dokümantasyonu
```

## Veritabanı Şeması (Başlangıç)

```prisma
model Kullanıcı {
  id                String    @id @default(cuid())
  email             String    @unique
  ad                String
  soyad             String
  dogumTarihi       DateTime
  dogumSaati        String?
  dogumYeri         String?
  olusturmaTarihi   DateTime  @default(now())
  guncellemeTarihi  DateTime  @updatedAt
  
  doğumHaritasi     DoğumHaritasi?
  gunlukYorumlar    GunlukYorum[]
  gunluk            Gunluk[]
}

model DoğumHaritasi {
  id                String    @id @default(cuid())
  kullaniciId       String    @unique
  kullanici         Kullanıcı @relation(fields: [kullaniciId], references: [id])
  
  // Gezegen Konumları
  gunes             Float
  ay                Float
  merkur            Float
  venus             Float
  mars              Float
  // ... diğer gezegenler
  
  olusturmaTarihi   DateTime  @default(now())
}

model GunlukYorum {
  id                String    @id @default(cuid())
  kullaniciId       String
  kullanici         Kullanıcı @relation(fields: [kullaniciId], references: [id])
  
  tarih             DateTime
  burc              String
  yorum             String
  olusturmaTarihi   DateTime  @default(now())
}

model Gunluk {
  id                String    @id @default(cuid())
  kullaniciId       String
  kullanici         Kullanıcı @relation(fields: [kullaniciId], references: [id])
  
  tarih             DateTime
  ruhHali           String
  notlar            String
  olusturmaTarihi   DateTime  @default(now())
}
```

## Teknoloji Seçimleri ve Gerekçeleri

| Teknoloji | Seçim Nedeni |
|-----------|-------------|
| **Next.js 16** | Modern, performant, SSR/SSG desteği, API routes |
| **TypeScript** | Tip güvenliği, geliştirme hızı, hata tespiti |
| **Tailwind CSS** | Hızlı UI geliştirme, responsive tasarım |
| **shadcn/ui** | Accessible, customizable, Radix UI tabanlı |
| **PostgreSQL** | Güçlü, ACID uyumlu, JSON desteği |
| **Prisma** | Type-safe ORM, migration yönetimi |
| **NextAuth v5** | Güvenli, modern, Next.js entegrasyonu |
| **Google Gemini** | Güçlü AI modeli, uygun fiyat |
| **Swiss Ephemeris** | Hassas astroloji hesaplamaları |

## Güvenlik Hususları

1. **Kimlik Doğrulama:** NextAuth v5 ile güvenli session yönetimi
2. **Şifreleme:** Hassas veriler şifreli tutulmalıdır
3. **API Güvenliği:** Rate limiting ve CORS konfigürasyonu
4. **Çevre Değişkenleri:** Tüm API anahtarları `.env` dosyasında tutulmalıdır
5. **SQL Injection:** Prisma ORM ile otomatik korunma

## Performans Hedefleri

- **Sayfa Yükleme Süresi:** < 2 saniye
- **API Yanıt Süresi:** < 500ms
- **Veritabanı Sorgusu:** < 100ms
- **Lighthouse Skoru:** > 90

## Sonraki Adımlar

1. Prisma şeması detaylandırılacak
2. API endpoints tasarlanacak
3. UI bileşenleri tanımlanacak
4. Test stratejisi oluşturulacak
