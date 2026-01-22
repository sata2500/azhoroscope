# AZ-Horoscope: Yapay Zeka Destekli Astroloji Platformu

> **⚠️ AI AJANLARI İÇİN UYARI:**
> Bu kod tabanı üzerinde çalışan bir LLM veya AI Ajanı iseniz, kod veya plan üretmeden önce **MUTLAKA** `.ai/AI_MANIFESTO.md` dosyasındaki protokolleri okumalı ve harfiyen uygulamalısınız. Kurallara uymayan çıktılar reddedilecektir.

AZ-Horoscope, gerçek astronomik verilerle çalışan, profesyonel ve AI destekli bir astroloji platformudur. Kullanıcılara kişiselleştirilmiş içgörüler sunmak için astrolojinin kadim bilgeliğini modern teknolojinin gücüyle birleştirir.

## ✨ Özellikler

* **AI Destekli Günlük Burç Yorumları:** Google Gemini 2.5 Flash tarafından üretilen kişiselleştirilmiş okumalar.
* **Doğum Haritası Analizi:** Swiss Ephemeris kullanarak profesyonel doğum haritası hesaplamaları.
* **Kişisel Günlük:** Ruh halinizi takip edin ve gezegen transitleriyle korelasyonları keşfedin.
* **Haftalık/Aylık Tahminler:** Geleceği planlayın.
* **E-posta Bildirimleri:** Günlük yorumunuz doğrudan gelen kutunuzda.
* **Yönetim Paneli:** Kullanıcıları yönetin ve sistem istatistiklerini görüntüleyin.
* **Modern UI/UX:** Dark/Light mod desteği ile responsive tasarım.

## 🛠️ Teknoloji Yığını (Tech Stack)

| Kategori | Teknoloji | Notlar |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 | App Router Mimarisi |
| **Dil** | TypeScript | Strict Mode |
| **UI Kütüphanesi** | shadcn/ui | Radix UI tabanlı |
| **Stil** | Tailwind CSS | v4 (veya en güncel stabil) |
| **Veritabanı** | PostgreSQL | Neon Tech |
| **ORM** | Prisma | |
| **Kimlik Doğrulama** | NextAuth v5 | (Auth.js) |
| **AI Modeli** | Google Gemini 2.5 Flash | |
| **Astroloji Motoru** | Swiss Ephemeris | Hassas hesaplama |

## 🚀 Başlangıç

Bu proje **"AI Ajan Protokolü"** ile yönetilmektedir. Geliştirme süreci `.ai-workspace` klasöründeki planlara göre ilerler.

### Gereksinimler

* Node.js: v22.x veya üzeri
* npm: v10.x veya üzeri
* PostgreSQL veritabanı

### Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/sata2500/azhoroscope.git
   cd azhoroscope
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Çevresel Değişkenleri Ayarlayın (.env):
   `.env.example` dosyasını kopyalayıp `.env` olarak adlandırın ve gerekli API anahtarlarını girin.

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## 🤝 Katkıda Bulunma

Lütfen `.ai/AI_MANIFESTO.md` dosyasındaki kurallara uyunuz. Her özellik (feature) geliştirmesi için `.ai-workspace/plans` altında bir plan oluşturulmalıdır.

## 📄 Lisans

MIT License.

---

**Proje Sahibi:** Salih TANRISEVEN  
**E-posta:** salihtanriseven25@gmail.com  
**Domain:** azhoroscope.com  
**Başlangıç Tarihi:** 22 Ocak 2026
