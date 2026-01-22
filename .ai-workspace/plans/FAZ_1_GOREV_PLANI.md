# Faz 1: Altyapı ve Temel Kurulum Görev Planı

**Sorumlu Ajan:** Manus
**Tarih:** 22 Ocak 2026

Bu plan, AZ-Horoscope projesinin ilk fazı olan "Altyapı ve Temel Kurulum" için yapılacak teknik araştırmaları ve adımları detaylandırmaktadır. Bu plan, `.ai/AI_MANIFESTO.md` belgesindeki "Önce Araştır, Sonra Kodla" prensibine uygun olarak hazırlanmıştır.

---

## 1. Teknik Araştırma ve Sürüm Sabitleme

**Amaç:** Projede kullanılacak temel teknolojilerin birbirleriyle uyumlu, kararlı (stable) sürümlerini belirlemek ve `.ai-workspace/architecture/TECH_STACK.md` dosyasını bu bilgilerle güncellemektir.

- **[x] Araştırma 1: Next.js 16 ve React 19 Uyumu**
  - **Bulgular:** Next.js 16, React 19 ve React Compiler desteği ile stabil olarak gelmektedir. Bu ikili birlikte sorunsuz çalışmaktadır.
  - **Karar:** `next@16` ve `react@19` kullanılacaktır.

- **[x] Araştırma 2: Prisma ve Next.js 16 Uyumu**
  - **Bulgular:** Prisma (özellikle sürüm 7 ve sonrası), Next.js 16'nın App Router, Server Actions ve Edge Middleware gibi özellikleriyle tam uyumludur. Vercel üzerinde dağıtım yaparken bazı ek konfigürasyonlar gerekebilir, ancak bu durumlar belgelenmiştir.
  - **Karar:** En güncel stabil `prisma` sürümü kullanılacaktır.

- **[x] Araştırma 3: Tailwind CSS & shadcn/ui Kurulumu**
  - **Bulgular:** Her iki araç da Next.js 16 ile tam uyumludur. `shadcn/ui` CLI aracı, kurulumu otomatize etmektedir.
  - **Karar:** Standart kurulum prosedürleri izlenecektir.

- **[x] Araştırma 4: NextAuth v5 (Auth.js) Entegrasyonu**
  - **Bulgular:** NextAuth v5, Next.js Middleware ve App Router ile çalışmak üzere yeniden tasarlanmıştır. Prisma Adapter ile veritabanı entegrasyonu sorunsuzdur.
  - **Karar:** `next-auth@5` kullanılacaktır.

---

## 2. Uygulama Adımları (İş Listesi)

**Öncelikli Not:** Her adım, "Modül Kilidi" kuralına göre, bir önceki %100 tamamlandıktan sonra başlatılacaktır. Her adım kendi içinde atomik bir commit ile sonuçlanacaktır.

1.  **Adım: Geliştirme Ortamını Yapılandırma**
    -   `[ ]` Git kullanıcı adı (`Salih TANRISEVEN`) ve e-posta (`salihtanriseven25@gmail.com`) yapılandırılacak.
    -   `[ ]` `.ai-workspace/architecture/TECH_STACK.md` dosyası, araştırma sonuçlarına göre doldurulacak ve commit edilecek.

2.  **Adım: Proje Yapısını Oluşturma**
    -   `[ ]` `package.json` dosyasındaki `next`, `react` ve `typescript` sürümleri sabitlenecek.
    -   `[ ]` `app/layout.tsx` ve `app/page.tsx` dosyaları oluşturularak temel "Merhaba Dünya" uygulaması ayağa kaldırılacak.
    -   `[ ]` `SISTEM_MİMARİSİ.md` dosyasında belirtilen klasör yapısı (`components`, `lib`, `styles`, `types` vb.) oluşturulacak.

3.  **Adım: Stil ve UI Kütüphaneleri Kurulumu**
    -   `[ ]` Tailwind CSS kurulumu ve yapılandırması yapılacak.
    -   `[ ]` `shadcn/ui` CLI ile kurulum yapılacak ve temel bir `Button` bileşeni test amaçlı eklenecek.

4.  **Adım: Veritabanı ve ORM Entegrasyonu**
    -   `[ ]` Prisma CLI yüklenecek.
    -   `[ ]` `prisma init` komutu ile `prisma/schema.prisma` dosyası oluşturulacak.
    -   `[ ]` `.env` dosyasına veritabanı bağlantı bilgisi (geçici olarak SQLite) eklenecek.
    -   `[ ]` `schema.prisma` dosyasına `SISTEM_MİMARİSİ.md`'de tanımlanan başlangıç şeması (Kullanıcı, DoğumHaritasi vb.) eklenecek.
    -   `[ ]` İlk veritabanı migrasyonu oluşturulacak ve çalıştırılacak.

5.  **Adım: Kimlik Doğrulama (Authentication) Kurulumu**
    -   `[ ]` `next-auth` paketi yüklenecek.
    -   `[ ]` `TASK_001_v1_auth_sistemi.md` dosyasındaki adımlar takip edilerek Google OAuth entegrasyonu için temel yapı (`lib/auth.ts`, `middleware.ts`) kurulacak. (Credentials olmadan, sadece dosya yapısı)

6.  **Adım: Faz 1 Tamamlama**
    -   `[ ]` Tüm değişiklikler `main` branch'e commit edilecek.
    -   `[ ]` `TASK_TRACKER.md` dosyası güncellenerek Faz 1'in durumu belirtilecek.
    -   `[ ]` Kullanıcıya nihai durum raporu sunulacak.
