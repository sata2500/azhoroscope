# TEKNOLOJİ UYUMLULUK MATRİSİ (TECH STACK)

**Durum:** TAMAMLANDI
**Son Güncelleme:** 22 Ocak 2026
**Araştırmacı:** Manus AI

Bu dosya, projeye başlamadan önce yapılan teknik araştırmalar sonucunda doldurulmuştur. Hedef; birbirleriyle %100 uyumlu, kararlı sürümlerin seçilmesidir.

---

## Temel Teknoloji Yığını

| Bileşen | Seçilen Sürüm | Neden Bu Sürüm? | Uyumluluk Notları |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js 16.x | React Compiler desteği stabil, App Router olgunlaşmış | React 19 ile tam uyumlu |
| **UI Library** | React 19.x | Next.js 16 ile birlikte gelen stabil sürüm | Server Components desteği |
| **Language** | TypeScript 5.x | Next.js 16 ile tam uyumlu | Strict mode aktif |
| **Database** | PostgreSQL (Neon) / SQLite | Vercel için Neon, self-hosted için SQLite | Prisma ile tam uyumlu |
| **ORM** | Prisma (latest stable) | Next.js 16 App Router ve Edge desteği | Server Actions ile uyumlu |
| **Styling** | Tailwind CSS 3.x | Next.js 16 ve Turbopack ile uyumlu | JIT compiler aktif |
| **UI Components** | shadcn/ui (latest) | Radix UI tabanlı, erişilebilir, özelleştirilebilir | Tailwind ile entegre |
| **Auth** | NextAuth v5 (Auth.js) | Next.js 16 Middleware ve App Router desteği | Prisma Adapter mevcut |
| **Theme** | next-themes 0.4.x | Next.js 16 ve React 19 ile uyumlu | System preference desteği |
| **AI Model** | Google Gemini API | Güçlü, uygun maliyetli, Türkçe desteği | REST API entegrasyonu |
| **Astrology** | Swiss Ephemeris | Endüstri standardı, hassas hesaplamalar | Node.js binding mevcut |

---

## Sürüm Sabitleme Kararları

### Next.js 16 ve React 19

Next.js 16, React Compiler desteğini stabil olarak sunmaktadır. React 19 ile birlikte Server Components, Server Actions ve Streaming gibi özellikler tam olarak desteklenmektedir. Bu ikili, projenin temelini oluşturacaktır.

### Prisma ORM

Prisma, Next.js 16'nın App Router, Server Actions ve Edge Middleware özellikleriyle tam uyumludur. Vercel üzerinde dağıtım yaparken `output: 'standalone'` konfigürasyonu önerilmektedir.

### next-themes

`next-themes` kütüphanesi (v0.4.x), Next.js 16 ve React 19 ile uyumlu olarak çalışmaktadır. GitHub issue'larında belirtilen bazı hydration sorunları, doğru kullanım pattern'leri ile çözülebilmektedir. Kütüphane, sistem tercihini otomatik algılama ve sekmeler arası senkronizasyon gibi özellikler sunmaktadır.

### shadcn/ui

shadcn/ui, Radix UI primitifleri üzerine inşa edilmiş, erişilebilir ve özelleştirilebilir bir bileşen kütüphanesidir. Tailwind CSS ile tam entegre çalışmakta ve Next.js 16 ile sorunsuz kullanılabilmektedir.

---

## Paket Yöneticisi

| Araç | Versiyon | Açıklama |
| :--- | :--- | :--- |
| **Node.js** | 22.x LTS | Next.js 16 için minimum gereksinim |
| **pnpm** | 9.x | Hızlı, disk verimli paket yöneticisi |

---

## Kaynaklar

1. [Next.js 16 Blog](https://nextjs.org/blog/next-16)
2. [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
3. [Prisma with Next.js Guide](https://www.prisma.io/docs/guides/nextjs)
4. [next-themes GitHub](https://github.com/pacocoursey/next-themes)
5. [shadcn/ui Documentation](https://ui.shadcn.com)

---

**Onay Durumu:** 🟢 Onaylandı
