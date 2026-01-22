# AZ-Horoscope: Yapay Zeka Destekli Astroloji Platformu

> **⚠️ AI AJANLARI İÇİN UYARI:**
> Bu kod tabanı üzerinde çalışan bir LLM veya AI Ajanı iseniz, kod veya plan üretmeden önce **MUTLAKA** `.ai/AI_MANIFESTO.md` dosyasındaki protokolleri okumalı ve harfiyen uygulamalısınız. Kurallara uymayan çıktılar reddedilecektir.

AZ-Horoscope, gerçek astronomik verilerle çalışan, profesyonel ve AI destekli bir astroloji platformudur. Kullanıcılara kişiselleştirilmiş içgörüler sunmak için astrolojinin kadim bilgeliğini modern teknolojinin gücüyle birleştirir.

---

## 📋 Proje Yapısı

```
azhoroscope/
├── .ai/                          # AI Yönetim Merkezi
│   └── AI_MANIFESTO.md          # Proje Kuralları (ZORUNLU OKU)
├── .ai-workspace/               # Ortak Çalışma Alanı
│   ├── plans/                   # Geliştirme Planları
│   │   ├── YOL_HARITASI.md     # Ana Yol Haritası (v1.0 - v10.0)
│   │   └── PROJE_BASLANGIÇ.md  # Başlangıç Planı
│   ├── research/                # Teknik Araştırmalar
│   ├── architecture/            # Sistem Tasarımları
│   │   └── SISTEM_MİMARİSİ.md  # Mimari Döküman
│   ├── archive/                 # Geçmiş Belgeler
│   └── SCRATCHPAD.md           # Hızlı Notlar
└── README.md                    # Bu Dosya
```

---

## 🎯 Yol Haritası Özeti

| Versiyon | Ana Özellik |
| :--- | :--- |
| **v1.0** | MVP - Burç yorumları, Doğum haritası, Admin paneli |
| **v2.0** | Palmistry, Face Analysis |
| **v3.0** | Kişisel günlük, Uyumluluk, Email bildirimleri |
| **v4.0** | PDF export, Premium üyelik |
| **v5.0** | Tarihsel analiz (Transit, Progression) |
| **v6.0** | Sosyal özellikler, Komunite |
| **v7.0** | Mobil uygulama (iOS, Android) |
| **v8.0** | API & İntegrasyonlar |
| **v9.0** | İleri AI özellikleri |
| **v10.0** | Kurumsal özellikler |

**Detaylı yol haritası:** `.ai-workspace/plans/YOL_HARITASI.md`

---

## 🎛️ Admin Panel Özellikleri

- **AI Model Seçimi:** Her özellik için ayrı Gemini modeli seçebilme
- **Prompt Yönetimi:** AI'ya verilecek talimatları yazabilme
- **API Key Yönetimi:** Güvenli API anahtarı saklama
- **Model Parametreleri:** Temperature, max_tokens vb. ayarlama
- **Kullanıcı Yönetimi:** Kullanıcı listesi, roller
- **İstatistikler:** Kullanım ve performans raporları

---

## 🛠️ Teknoloji Yığını

| Kategori | Teknoloji |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Dil** | TypeScript |
| **UI** | shadcn/ui + Tailwind CSS |
| **Veritabanı (Vercel)** | Neon (PostgreSQL) |
| **Veritabanı (Self-Hosted)** | SQLite |
| **ORM** | Prisma |
| **Auth** | NextAuth v5 |
| **AI** | Google Gemini API |
| **Astroloji** | Swiss Ephemeris / Kerykeion |

---

## 🚀 Başlangıç

### AI Ajanlar İçin

1. `.ai/AI_MANIFESTO.md` dosyasını oku
2. `.ai-workspace/plans/YOL_HARITASI.md` dosyasını oku
3. `.ai-workspace/architecture/SISTEM_MİMARİSİ.md` dosyasını oku
4. Mevcut planları kontrol et
5. Araştır → Planla → Kodla → Test Et

### Geliştiriciler İçin

1. Repoyu klonla: `git clone https://github.com/sata2500/azhoroscope.git`
2. Bağımlılıkları yükle: `npm install`
3. `.env.example` dosyasını `.env` olarak kopyala
4. Geliştirme sunucusunu başlat: `npm run dev`

---

## 📄 Lisans

MIT License

---

**Proje Sahibi:** Salih TANRISEVEN  
**E-posta:** salihtanriseven25@gmail.com  
**Domain:** azhoroscope.com  
**Başlangıç Tarihi:** 22 Ocak 2026
