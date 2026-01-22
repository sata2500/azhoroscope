# AZ-Horoscope v2: Teknoloji Araştırması Bulguları

**Tarih:** 22 Ocak 2026  
**Araştırılan Konular:** Deployment, Hosting, Astroloji Kütüphaneleri, AI Modelleri

---

## 1. Deployment & Hosting Platformları

### Karşılaştırılan Platformlar

| Platform | Başlangıç Fiyatı | Özellikler | Uygunluk |
|----------|------------------|-----------|---------|
| **Railway** | $5/month + usage | Git push deploy, Templates, Databases | MVP için iyi, ama kullanım maliyeti belirsiz |
| **Render** | Free tier (limited) | Managed services, PostgreSQL, SSL | Production-ready, ama free tier soğuk başlama |
| **Fly.io** | Free tier | Edge computing, Global distribution | Latency önemliyse iyi, ama karmaşık |
| **Vercel** | Free tier | Next.js optimize, Serverless | Frontend için mükemmel, backend sınırlı |
| **Cloudflare Pages** | Free tier | Next.js support, Workers integration | Yeni ve güçlü, full-stack desteği var |
| **Cloudflare Workers** | Free tier | Serverless, Global edge | Full-stack Next.js desteği (OpenNext adapter) |
| **Elestio** | $14/month (fixed) | Managed hosting, CI/CD, SSH access | Öngörülebilir maliyet, kontrol sahibi |

### Öneriler

**MVP için En İyi:** **Railway** veya **Render**
- Hızlı deployment
- Git-based workflow
- Managed databases
- Öngörülebilir pricing (Render daha iyi)

**Self-Hosted İçin:** **Elestio** veya **Fly.io**
- Elestio: Sabit fiyat, SSH erişim, managed
- Fly.io: Edge computing, global distribution

**Cloudflare Seçeneği:** **Cloudflare Workers + Pages**
- OpenNext adapter ile full-stack Next.js
- Automatic SSL
- Global CDN
- Free tier yeterli MVP için
- Cloudflare Tunnel ile port açmaya gerek yok

---

## 2. Cloudflare Çözümü (Önerilen)

### Avantajları
- ✅ **Otomatik SSL/TLS** - Let's Encrypt entegrasyonu
- ✅ **Cloudflare Tunnel** - Port açmaya gerek yok, DDoS koruması
- ✅ **Global CDN** - Hızlı yükleme
- ✅ **Free tier** - MVP için yeterli
- ✅ **OpenNext adapter** - Full-stack Next.js desteği
- ✅ **Automatic deployment** - Git push = otomatik deploy
- ✅ **Workers** - Serverless backend
- ✅ **D1 Database** - SQLite (Cloudflare'nin)
- ✅ **KV Store** - Redis alternatifi

### Kurulum
```bash
npm create cloudflare@latest -- my-app --framework=next
npm run deploy
```

### Maliyet
- **Free tier:** 100,000 requests/day, 50ms CPU time
- **Pro:** $20/month (unlimited requests)
- **Business:** Custom pricing

---

## 3. Astroloji Kütüphaneleri

### Kerykeion (Önerilen)
**Dil:** Python  
**Lisans:** GPLv3  
**Durum:** Production-ready (v5.6.3)

**Özellikler:**
- Doğum haritası hesaplamaları
- Ev sistemleri (Placidus, Koch, vb.)
- Açı (aspekt) hesaplamaları
- SVG chart generation
- Synastry, Transit, Composite charts
- AI/LLM entegrasyonu için JSON export
- Sidereal modes (Ayanamsa)
- Lunar nodes (Rahu & Ketu)

**Kullanım:**
```python
from kerykeion import AstrologicalSubjectFactory

subject = AstrologicalSubjectFactory.from_birth_data(
    name="John Lennon",
    year=1940, month=10, day=9,
    hour=18, minute=30,
    lng=-2.9833, lat=53.4,
    tz_str="Europe/London",
    online=False
)

print(subject.sun.sign)  # Libra
print(subject.moon.element)  # Air
```

**Avantajları:**
- ✅ Open source
- ✅ Python native
- ✅ Comprehensive
- ✅ AI-friendly (JSON support)
- ✅ Active development
- ✅ SVG charts

**Dezavantajları:**
- ❌ Python-only (Node.js için binding gerekli)
- ❌ Ağır (full ephemeris data)

### Alternatifler

**Astronomy Engine** (C/C++)
- Lightweight
- Accurate
- Bindings available
- Ama less comprehensive

**Swiss Ephemeris** (C)
- Industry standard
- Very accurate
- Ama low-level API

---

## 4. AI Modelleri Karşılaştırması

### Astroloji Analizi İçin

| Model | Fiyat | Hız | Doğruluk | Görüntü | Önerisi |
|-------|-------|-----|----------|---------|---------|
| **Gemini 2.5 Flash** | $0.075/1M tokens | Çok hızlı | İyi | ✅ | MVP için ideal |
| **Gemini 2.0 Pro** | $3/1M tokens | Orta | Çok iyi | ✅ | Premium için |
| **Claude 3.5 Sonnet** | $3/1M tokens | Orta | Çok iyi | ✅ | Alternatif |
| **GPT-4o** | $5/1M tokens | Orta | Mükemmel | ✅ | Pahalı |

### Önerilen Strateji

**MVP (v0-v1):**
- Gemini 2.5 Flash (hızlı, ucuz)
- Admin panelden seçilebilir

**Premium (v2):**
- Gemini 2.0 Pro (daha detaylı)
- Fallback: Gemini 2.5 Flash

**Gelecek:**
- Claude, OpenAI seçeneği ekle
- Admin panelden dinamik seçim

### Maliyet Tahmini

**Aylık (1000 analiz):**
- Palmistry: ~$0.075 (Gemini 2.5 Flash)
- Face Analysis: ~$0.075
- Daily Horoscope: ~$0.05
- **Toplam:** ~$150/ay (güvenli tahmin)

---

## 5. Database Seçenekleri

### Cloudflare D1 (Önerilen)
- SQLite-based
- Free tier yeterli
- Automatic backups
- Global replication

### Alternatifler

**Neon (PostgreSQL)**
- Free tier: 3 projects
- Generous free tier
- Serverless PostgreSQL

**Supabase (PostgreSQL)**
- Free tier: 2 projects
- Real-time subscriptions
- Built-in auth

**PlanetScale (MySQL)**
- Free tier: 1 database
- Serverless MySQL
- Branching

---

## 6. Caching & Real-time

### Redis Alternatifi: Cloudflare KV
- Free tier: 100,000 ops/day
- Global distribution
- Simple API
- Yeterli MVP için

---

## 7. Önerilen Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript 5.4+**
- **Tailwind CSS 4**
- **shadcn/ui**

### Backend
- **Next.js API Routes**
- **Cloudflare Workers** (opsiyonel)

### Database
- **Cloudflare D1** (SQLite)
- **Prisma ORM**

### AI
- **Google Gemini 2.5 Flash** (default)
- **Admin panelden seçilebilir**

### Astroloji
- **Kerykeion** (Python, doğum haritası)
- **Node.js binding** (API aracılığıyla)

### Deployment
- **Cloudflare Pages** (frontend)
- **Cloudflare Workers** (backend)
- **Cloudflare Tunnel** (custom domain, no port)
- **Automatic SSL** (Let's Encrypt)
- **GitHub Actions** (CI/CD)

### Monitoring
- **Sentry** (error tracking)
- **Cloudflare Analytics** (performance)

---

## 8. Deployment Flow

```
GitHub Push
    ↓
GitHub Actions (test, build)
    ↓
Cloudflare Pages (deploy)
    ↓
Automatic SSL (Let's Encrypt)
    ↓
Cloudflare Tunnel (public)
    ↓
Custom Domain (azhoroscope.com)
```

---

## 9. Self-Hosted Alternatif

Eğer self-hosted istiyorsanız:

**Seçenek 1: Docker + Railway/Render**
- Docker container
- Railway/Render'da deploy
- Managed database
- Automatic SSL

**Seçenek 2: Elestio**
- Managed hosting
- SSH access
- Fixed pricing
- Automatic backups

**Seçenek 3: VPS + Caddy**
- DigitalOcean/Linode VPS
- Caddy reverse proxy
- PostgreSQL
- Manual management

---

## 10. Sonuç & Öneriler

### MVP için (v0-v1)
✅ **Cloudflare Pages + Workers**
- Otomatik SSL
- Cloudflare Tunnel (port açmaya gerek yok)
- Free tier yeterli
- Hızlı deployment
- Global CDN

### Production (v2+)
✅ **Render** (opsiyonel upgrade)
- Managed PostgreSQL
- Automatic backups
- Scaling
- Ama Cloudflare da yeterli

### Self-Hosted
✅ **Elestio** (sabit fiyat, managed)
- Veya **Railway** (flexible)

### AI Modelleri
✅ **Gemini 2.5 Flash** (default)
- Admin panelden seçilebilir
- Fallback: Gemini 2.0 Pro

### Astroloji
✅ **Kerykeion** (Python)
- API aracılığıyla Node.js'den kullan
- Comprehensive
- Open source

---

## Kaynaklar

1. [Elestio vs Railway vs Render vs Fly.io](https://blog.elest.io/elestio-vs-railway-vs-render-vs-fly-io-which-platform-actually-fits-your-needs/)
2. [Cloudflare Workers Next.js](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
3. [Kerykeion - Python Astrology Library](https://pypi.org/project/kerykeion/)
4. [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
5. [Railway vs Render vs Fly.io Comparison](https://medium.com/ai-disruption/railway-vs-fly-io-vs-render-which-cloud-gives-you-the-best-roi-2e3305399e5b)

---

**Hazırlayan:** Manus AI  
**Tarih:** 22 Ocak 2026  
**Durum:** Araştırma Tamamlandı
