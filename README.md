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
│   │   └── YOL_HARITASI.md     # Ana Yol Haritası (v1.0 - v10.0)
│   ├── tasks/                   # Görevler
│   │   ├── TASK_001_v1_auth_sistemi.md
│   │   └── ...
│   ├── research/                # Teknik Araştırmalar
│   ├── architecture/            # Sistem Tasarımları
│   │   └── SISTEM_MİMARİSİ.md  # Mimari Döküman
│   ├── archive/                 # Geçmiş Belgeler
│   ├── TASK_MANAGEMENT.md       # Görev Yönetim Sistemi
│   ├── TASK_TRACKER.md          # Görev Takip Tablosu
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
- **Veritabanı Yönetimi:** Yedekleme, geri yükleme
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

## 🚀 AI Ajanlar İçin Başlangıç

### 1. Protokolleri Oku

1. `.ai/AI_MANIFESTO.md` - Proje kuralları
2. `.ai-workspace/plans/YOL_HARITASI.md` - Yol haritası
3. `.ai-workspace/architecture/SISTEM_MİMARİSİ.md` - Sistem mimarisi

### 2. Görev Yönetim Sistemini Anla

1. `.ai-workspace/TASK_MANAGEMENT.md` - Görev yönetim sistemi
2. `.ai-workspace/TASK_TRACKER.md` - Görev takip tablosu
3. `.ai-workspace/tasks/TASK_XXX.md` - Spesifik görev

### 3. Görev Seç ve Başla

1. `.ai-workspace/TASK_TRACKER.md` dosyasında "BAŞLANMADI" durumundaki bir görev bul
2. İlgili `.ai-workspace/tasks/TASK_XXX.md` dosyasını aç
3. Görev dosyasında "Atanan Ajan" kısmına adını yaz
4. Durumu "DEVAM EDIYOR" olarak değiştir
5. Yapılacakları takip ederek çalış
6. Tamamlandığında durumu "TAMAMLANDI" olarak işaretle

### 4. Yarım Kalan Görev Devam Ettirme

1. Görev dosyasını aç
2. "Notlar" bölümünü oku
3. Nerede kaldığını anla
4. Atanan Ajan kısmını güncelle
5. Devam et

---

## 📂 Görev Dosya Yapısı

Her görev için `.ai-workspace/tasks/` klasöründe bir dosya vardır:

```
TASK_XXX_vY_kisa_aciklama.md
├── Görev Özeti
├── Hedefler
├── Yapılacaklar (checklist)
├── Bağımlılıklar
├── Dosyalar
├── Detaylı Adımlar
├── Test Edilecek Durumlar
├── Notlar
├── Tamamlama Kriteri
└── Sonraki Görev
```

---

## 🔄 Görev Durumları

| Durum | Açıklama |
| :--- | :--- |
| **BAŞLANMADI** | Henüz başlanmamış |
| **DEVAM EDIYOR** | Aktif olarak çalışılıyor |
| **BEKLEME** | Başka görevin tamamlanmasını bekliyor |
| **TAMAMLANDI** | Tamamlanmış, test edilmiş |
| **ARŞİVLENDİ** | Eski görev, referans için saklanıyor |

---

## 💡 İyi Uygulamalar

1. **Detaylı Notlar:** Sonraki ajan için açık ve detaylı notlar yaz
2. **Kod Yorumları:** Karmaşık kısımlara Türkçe yorum ekle
3. **Hata Logları:** Karşılaştığın hataları ve çözümlerini yaz
4. **Commit Mesajları:** Anlaşılır ve detaylı commit mesajları
5. **Bağımlılıkları Güncelle:** Yeni bağımlılıklar eklediysen belirt

---

## 🚀 Geliştiriciler İçin Başlangıç

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
