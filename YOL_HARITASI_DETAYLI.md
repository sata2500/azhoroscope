# AZ-Horoscope: Kapsamlı ve Detaylı Yol Haritası (v0 → v3)

**Hazırlayan:** Manus AI  
**Tarih:** 22 Ocak 2026  
**Durum:** Onay Bekliyor  
**Yaklaşım:** MVP-First, Sunucusuz Mimari, Yönetilen Hizmetler

---

## 📋 İçindekiler

1. [Felsefe ve Strateji](#felsefe-ve-strateji)
2. [Teknoloji Seçimleri](#teknoloji-seçimleri)
3. [Versiyon Yol Haritası](#versiyon-yol-haritası)
4. [Detaylı Implementasyon Planı](#detaylı-implementasyon-planı)
5. [Timeline ve Milestone'lar](#timeline-ve-milestones)
6. [Maliyet Analizi](#maliyet-analizi)
7. [Başarı Kriterleri](#başarı-kriterleri)

---

## 🎯 Felsefe ve Strateji

### Neden Sunucusuz?

Geleneksel yaklaşımlar (Docker, Kubernetes, VPS) yönetim yükü getirir. **Cloudflare Pages + Workers** gibi modern sunucusuz platformlar, bu yükü ortadan kaldırarak bize sadece ürün geliştirmeye odaklanma imkanı verir.

**Avantajları:**
- ✅ Otomatik SSL/TLS (Let's Encrypt)
- ✅ Global CDN (hızlı yükleme)
- ✅ Otomatik scaling (trafiğe göre)
- ✅ Cloudflare Tunnel (port açmaya gerek yok)
- ✅ Ücretsiz tier (MVP için yeterli)
- ✅ Sıfır altyapı yönetimi

### Neden Kerykeion?

Astroloji hesaplamaları için **Swiss Ephemeris** standart olsa da, **Kerykeion** Python kütüphanesi şunları sunuyor:
- ✅ Açık kaynak ve aktif geliştirme
- ✅ Kapsamlı özellikler (doğum haritası, transit, sinastri)
- ✅ JSON çıktısı (AI entegrasyonu kolay)
- ✅ SVG chart generation
- ✅ LLM/AI-friendly API

### Neden Dinamik AI Yönetimi?

Admin panelinden AI modellerini seçebilme özellikleri şunları sağlar:
- ✅ Maliyet optimizasyonu (hızlı model vs detaylı model)
- ✅ Esneklik (gelecekte OpenAI, Claude eklemek kolay)
- ✅ Deneme-yanılma (hangi model daha iyi sonuç veriyor?)
- ✅ Fallback mekanizması (bir model başarısız olursa diğerine geç)

---

## 🛠️ Teknoloji Seçimleri

### Frontend & Backend

| Teknoloji | Versiyon | Amaç |
| :--- | :--- | :--- |
| **Next.js** | 16+ | Full-stack framework (SSR, SSG, API Routes) |
| **TypeScript** | 5.4+ | Tip güvenliği ve geliştirici deneyimi |
| **Tailwind CSS** | 4+ | Hızlı ve tutarlı UI |
| **shadcn/ui** | Latest | Hazır bileşen kütüphanesi |
| **Prisma ORM** | 6+ | Veritabanı abstraksiyon katmanı |

### Deployment & Hosting

| Hizmet | Kullanım | Neden |
| :--- | :--- | :--- |
| **Cloudflare Pages** | Frontend deployment | Otomatik build, global CDN, free SSL |
| **Cloudflare Workers** | Serverless backend | Python/Node.js fonksiyonları, edge computing |
| **Cloudflare D1** | Veritabanı | SQLite, serverless, Cloudflare ekosistemi |
| **Cloudflare KV** | Cache/Session | Redis alternatifi, global distribution |
| **Cloudflare Tunnel** | Güvenli erişim | Port açmaya gerek yok, DDoS koruması |

### AI & Astroloji

| Teknoloji | Kullanım | Dinamik Yönetim |
| :--- | :--- | :--- |
| **Google Gemini API** | AI analiz | ✅ Admin panelinden seçilebilir |
| **Kerykeion (Python)** | Doğum haritası | ✅ Farklı house systems seçilebilir |
| **Cloudflare Workers** | Python runtime | ✅ Kerykeion'u serverless olarak çalıştır |

### Kimlik Doğrulama & Güvenlik

| Hizmet | Amaç |
| :--- | :--- |
| **NextAuth v5** | OAuth 2.0 (Google, GitHub vb.) |
| **Cloudflare WAF** | Web uygulaması güvenlik duvarı |
| **Rate Limiting** | API abuse'dan korunma |

---

## 📦 Versiyon Yol Haritası

### **v0: Temel Altyapı (1-2 Hafta)**

**Hedef:** Sağlam bir geliştirme ortamı oluşturmak.

**Özellikler:**
- Next.js 16+ projesi oluşturma
- Cloudflare Pages entegrasyonu
- Prisma + Cloudflare D1 bağlantısı
- NextAuth v5 kurulumu (Google OAuth)
- GitHub Actions CI/CD pipeline
- Cloudflare Tunnel ile test yayını
- Temel UI framework (Tailwind + shadcn/ui)

**Deliverables:**
- `azhoroscope.com` domain'de çalışan boş bir site
- Kullanıcı giriş sistemi
- Veritabanı migration'ları
- CI/CD pipeline

**Tahmini Maliyet:** $0 (ücretsiz tier)

---

### **v1: MVP Lansmanı (4-6 Hafta)**

**Hedef:** İlk kullanıcıları kazanmak ve temel astroloji özelliklerini sunmak.

**Özellikler:**

#### 1. Admin Paneli - AI Model Yönetimi (Kritik)
```
/admin/ai-settings
├── Model Seçimi
│   ├── Günlük Yorum Modeli
│   │   ├── Gemini 2.5 Flash (varsayılan)
│   │   ├── Gemini 2.0 Pro
│   │   └── Gemini 3 (gelecekte)
│   ├── Palmistry Modeli
│   ├── Face Analysis Modeli
│   └── Doğum Haritası Analiz Modeli
├── Model Parametreleri
│   ├── Temperature (0.0 - 1.0)
│   ├── Max Tokens (100 - 4000)
│   ├── Top P (0.0 - 1.0)
│   └── Top K (0 - 100)
├── API Key Yönetimi
│   ├── Google API Key giriş
│   ├── Bağlantı testi
│   └── Key rotasyonu
└── Kullanım İstatistikleri
    ├── Günlük/Aylık kullanım
    ├── Model başına maliyet
    └── Trend grafiği
```

#### 2. Günlük Burç Yorumları
```
GET /api/horoscope/daily/{zodiacSign}
Response:
{
  "sign": "Aries",
  "date": "2026-01-22",
  "overall": "...",
  "love": "...",
  "career": "...",
  "health": "...",
  "lucky": { "number": 7, "color": "red" },
  "model": "gemini-2.5-flash",
  "generatedAt": "2026-01-22T10:00:00Z"
}
```

#### 3. Doğum Haritası Oluşturma
```
POST /api/birth-chart
{
  "name": "John Doe",
  "birthDate": "1990-07-15",
  "birthTime": "10:30",
  "birthLocation": "Istanbul",
  "latitude": 41.0082,
  "longitude": 28.9784
}

Response:
{
  "id": "chart_123",
  "sunSign": "Cancer",
  "moonSign": "Pisces",
  "ascendant": "Leo",
  "planets": {...},
  "houses": {...},
  "aspects": {...}
}
```

#### 4. Doğum Haritası Analiz (AI ile)
```
GET /api/birth-chart/{chartId}/analysis
Response:
{
  "summary": "Duygu yoğun bir kişi...",
  "sunAnalysis": "...",
  "moonAnalysis": "...",
  "ascendantAnalysis": "...",
  "strengths": ["..."],
  "challenges": ["..."],
  "model": "gemini-2.5-flash"
}
```

**Deliverables:**
- Çalışan admin paneli
- Günlük yorum API'si
- Doğum haritası hesaplama
- Doğum haritası analiz
- Temel UI sayfaları

**Tahmini Maliyet:** $50-100/ay (Gemini API kullanımı)

---

### **v2: Görsel Analiz ve Premium Özellikler (6-8 Hafta)**

**Hedef:** Kullanıcı bağlılığını artırmak ve yenilikçi özellikler sunmak.

**Özellikler:**

#### 1. Palmistry (El Okuma)
```
POST /api/analysis/palmistry
Content-Type: multipart/form-data
{
  "image": <file>,
  "hand": "right" // or "left"
}

Response:
{
  "id": "palm_123",
  "handShape": "square",
  "lifeLineAnalysis": "...",
  "heartLineAnalysis": "...",
  "headLineAnalysis": "...",
  "fateLineAnalysis": "...",
  "personality": "...",
  "lifePath": "...",
  "career": "...",
  "relationships": "...",
  "health": "...",
  "financial": "...",
  "confidenceScore": 0.85,
  "model": "gemini-2.5-flash"
}
```

#### 2. Face Analysis (Yüz Analizi)
```
POST /api/analysis/face
Content-Type: multipart/form-data
{
  "image": <file>
}

Response:
{
  "id": "face_123",
  "faceShape": "oval",
  "personalityType": "ENFP",
  "temperament": "...",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "relationshipStyle": "...",
  "careerSuggestions": ["..."],
  "overallProfile": "...",
  "confidenceScore": 0.82,
  "model": "gemini-2.5-flash"
}
```

#### 3. Kişisel Günlük
```
POST /api/diary
{
  "date": "2026-01-22",
  "mood": "happy",
  "entry": "Bugün harika bir gün geçirdim...",
  "tags": ["love", "career", "health"]
}

GET /api/diary?month=2026-01
GET /api/diary/{id}/ai-analysis
```

#### 4. Uyumluluk Analizi
```
POST /api/compatibility
{
  "person1ChartId": "chart_123",
  "person2ChartId": "chart_456"
}

Response:
{
  "overallScore": 85,
  "sunCompatibility": 90,
  "moonCompatibility": 80,
  "venusCompatibility": 85,
  "analysis": "...",
  "recommendations": ["..."]
}
```

#### 5. Email Bildirimleri
```
Admin Panel → Email Settings
├── Daily Horoscope Email
├── Weekly Digest
├── Monthly Report
└── Special Events (Full Moon, New Moon vb.)
```

**Deliverables:**
- Palmistry API ve UI
- Face Analysis API ve UI
- Kişisel günlük sistemi
- Uyumluluk analizi
- Email notification sistemi

**Tahmini Maliyet:** $100-150/ay (daha fazla Gemini API kullanımı)

---

### **v3: Platform Genişlemesi (6-8 Hafta)**

**Hedef:** Ölçeklenebilir bir platform haline getirmek.

**Özellikler:**

#### 1. Tarihsel Analiz
```
GET /api/birth-chart/{chartId}/transits?year=2026
GET /api/birth-chart/{chartId}/progressions
GET /api/birth-chart/{chartId}/solar-return?year=2026
```

#### 2. PDF Export
```
GET /api/export/birth-chart/{chartId}/pdf
GET /api/export/palmistry/{readingId}/pdf
GET /api/export/face-analysis/{readingId}/pdf
```

#### 3. Sosyal Paylaşma
- Twitter/X paylaşımı
- Facebook paylaşımı
- WhatsApp paylaşımı
- Shareable link'ler

#### 4. Premium Üyelik
```
- Premium AI modelleri (Gemini Pro)
- Sınırsız analiz
- Özel raporlar
- Öncelikli destek
```

#### 5. API Marketplace
- Third-party entegrasyonları
- Webhook desteği
- API documentation

#### 6. Mobil Uygulama (React Native)
- iOS ve Android
- Offline mod
- Push notifications

**Deliverables:**
- Tarihsel analiz sistemi
- PDF export
- Sosyal paylaşma
- Premium üyelik
- Mobil uygulama

**Tahmini Maliyet:** $200-300/ay

---

## 📅 Detaylı Implementasyon Planı

### **v0: Hafta 1-2**

**Hafta 1:**
- [ ] GitHub repo kurulumu (`azhoroscope`)
- [ ] Next.js 16 projesi oluşturma
- [ ] Cloudflare Pages entegrasyonu
- [ ] Prisma + D1 bağlantısı
- [ ] Temel veritabanı şeması

**Hafta 2:**
- [ ] NextAuth v5 kurulumu
- [ ] Google OAuth entegrasyonu
- [ ] Temel UI framework
- [ ] GitHub Actions CI/CD
- [ ] Test yayını

---

### **v1: Hafta 3-8**

**Hafta 3: Admin Paneli**
- [ ] Model seçimi UI
- [ ] API key yönetimi
- [ ] Parametre ayarlama
- [ ] Kullanım istatistikleri

**Hafta 4: Günlük Yorum**
- [ ] Gemini API entegrasyonu
- [ ] Prompt templates
- [ ] Caching sistemi
- [ ] API endpoint'leri

**Hafta 5-6: Doğum Haritası**
- [ ] Kerykeion entegrasyonu
- [ ] Python serverless fonksiyonu
- [ ] Hesaplama API'si
- [ ] Veritabanı depolaması

**Hafta 7-8: Doğum Haritası Analiz**
- [ ] AI analiz endpoint'i
- [ ] UI sayfaları
- [ ] Rapor gösterimi
- [ ] Testing ve optimization

---

### **v2: Hafta 9-16**

**Hafta 9-10: Palmistry**
- [ ] Image upload sistemi
- [ ] Gemini Vision API
- [ ] Analiz endpoint'i
- [ ] UI sayfaları

**Hafta 11-12: Face Analysis**
- [ ] Image upload sistemi
- [ ] Gemini Vision API
- [ ] Analiz endpoint'i
- [ ] UI sayfaları

**Hafta 13-14: Kişisel Günlük**
- [ ] CRUD API'leri
- [ ] UI sayfaları
- [ ] AI analiz

**Hafta 15-16: Uyumluluk & Email**
- [ ] Uyumluluk analiz
- [ ] Email sistemi
- [ ] Testing

---

### **v3: Hafta 17-24**

**Hafta 17-18: Tarihsel Analiz**
- [ ] Transit hesaplamaları
- [ ] API endpoint'leri
- [ ] UI

**Hafta 19-20: PDF & Sosyal**
- [ ] PDF export
- [ ] Sosyal paylaşma

**Hafta 21-22: Premium & Marketplace**
- [ ] Premium üyelik
- [ ] API marketplace

**Hafta 23-24: Mobil Uygulama**
- [ ] React Native kurulumu
- [ ] Temel özellikler
- [ ] App Store/Play Store

---

## 💰 Maliyet Analizi

### Aylık Maliyetler

| Hizmet | v0 | v1 | v2 | v3 |
| :--- | :--- | :--- | :--- | :--- |
| **Cloudflare** | $0 | $0 | $0 | $0 |
| **Gemini API** | $0 | $50-100 | $100-150 | $150-200 |
| **Veritabanı** | $0 | $0 | $0 | $0 |
| **Email** | $0 | $0 | $10-20 | $20-30 |
| **Monitoring** | $0 | $0 | $0 | $20-30 |
| **TOPLAM** | **$0** | **$50-100** | **$110-170** | **$190-260** |

### Başlangıç Maliyetleri

- Domain: $12/yıl (zaten var)
- SSL: $0 (Cloudflare)
- Hosting: $0 (Cloudflare)
- **TOPLAM:** $0

---

## ✅ Başarı Kriterleri

### v0
- [ ] Sağlam altyapı
- [ ] Otomatik deployment
- [ ] Güvenli auth sistemi
- [ ] 0 downtime

### v1
- [ ] 100+ aktif kullanıcı
- [ ] Admin paneli çalışıyor
- [ ] Günlük yorum API stabil
- [ ] Doğum haritası hesaplaması doğru
- [ ] < 2 saniye yanıt süresi

### v2
- [ ] 1000+ aktif kullanıcı
- [ ] Palmistry & Face Analysis çalışıyor
- [ ] Kullanıcı bağlılığı > %30
- [ ] Premium üyelik başladı

### v3
- [ ] 10,000+ aktif kullanıcı
- [ ] Mobil uygulama indirildi
- [ ] API marketplace aktif
- [ ] Aylık gelir > $1000

---

## 📊 Özet

| Metrik | Değer |
| :--- | :--- |
| **Toplam Süre** | 24 hafta (~6 ay) |
| **Takım Boyutu** | 3-5 AI Ajanı |
| **Başlangıç Maliyeti** | $0 |
| **Aylık Maliyet (v1)** | $50-100 |
| **Aylık Maliyet (v3)** | $190-260 |
| **Deployment Süresi** | < 5 dakika |
| **Uptime Hedefi** | > 99.9% |

---

## 🚀 Başlama Adımları

1. **v0 başlat** (Hafta 1-2)
2. **v1 lansmanı** (Hafta 3-8)
3. **Kullanıcı geri bildirimi topla**
4. **v2 geliştir** (Hafta 9-16)
5. **v3 ölçeklendirmesi** (Hafta 17-24)

---

**Hazırlayan:** Manus AI  
**Tarih:** 22 Ocak 2026  
**Durum:** Onay Bekliyor
