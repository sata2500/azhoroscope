# Gemini API Entegrasyonu - Araştırma Raporu

**Tarih:** 23 Ocak 2026  
**Araştırmacı:** Manus AI  
**Amaç:** TASK_002 için en güncel Gemini API entegrasyonu

---

## 🎯 Bulgular Özeti

### Önerilen SDK

**@google/genai** (Google GenAI SDK)

- **Durum:** GA (General Availability) - Mayıs 2025'ten beri
- **Önceki SDK:** `@google/generativeai` (deprecated, 30 Kasım 2025'ten sonra aktif desteği yok)
- **Kurulum:** `npm install @google/genai`
- **Gereksinim:** Node.js 20+

### Model Seçenekleri (Ocak 2026)

| Model Alias            | Gerçek Model                    | Kullanım Senaryosu            |
| ---------------------- | ------------------------------- | ----------------------------- |
| `gemini-flash-latest`  | `gemini-3-flash-preview`        | Hızlı yanıt, düşük maliyet    |
| `gemini-pro-latest`    | `gemini-3-pro-preview`          | Yüksek kalite, detaylı analiz |
| `gemini-2.0-flash-exp` | Gemini 2.0 Flash (Experimental) | En yeni özellikler            |

**Önerimiz:** `gemini-2.0-flash-exp` - Burç yorumları için hız ve kalite dengesi

---

## 📋 Best Practices

### 1. API Key Güvenliği ✅

- **Client-side'da ASLA API key kullanma** (kritik!)
- Server-side (API routes) kullanımı zorunlu
- Environment variable: `GEMINI_API_KEY`
- .env dosyasında sakla, git'e commit etme

### 2. Dosya Limitleri (Ocak 2026 Güncellemesi)

- Input dosya boyutu: 20MB → **100MB** (artırıldı)
- Bizim için şu an irrelevant (sadece text üretiyoruz)

### 3. Node.js Sürümü

- **Minimum:** Node.js 20
- Projemiz: Node.js 22 (package.json'da) ✅

---

## 🔧 Uygulama Stratejisi

### Prisma Schema

Mevcut `AiSettings` modeli:

```prisma
model AiSettings {
  id          String @id @default(cuid())
  featureName String @unique
  model       String  @default("gemini-1.5-flash")  // ⚠️ Güncellenecek
  temperature Float   @default(0.7)
  maxTokens   Int     @default(1024)
  prompt      String?
  active      Boolean @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Gerekli Değişiklik:** Default model'i `gemini-2.0-flash-exp` olarak güncelle

### API Yapısı

```
/api/readings/daily
  - POST: Günlük yorum üret (12 burç için)
  - GET: Günlük yorumları getir

/api/readings/weekly
  - POST: Haftalık yorum üret
  - GET: Haftalık yorumları getir

/api/settings/ai
  - GET: AI ayarlarını getir
  - PUT: AI ayarlarını güncelle
```

---

## 📦 Paket Kurulumu

```bash
npm install @google/genai
```

**Not:** `@google/generativeai` KULLANMA (deprecated)

---

## 💡 Prompt Stratejisi

### Günlük Burç Yorumu Template

```typescript
const dailyHoroscopePrompt = `Sen profesyonel bir astrolog musun. ${zodiacSign} burcu için ${date} tarihine özel günlük bir yorum yaz.

Yorum şu konuları içermeli:
- Genel ruh hali ve enerji
- Aşk ve ilişkiler
- Kariyer ve finans
- Sağlık ve wellness

Ton: Samimi, pozitif, motive edici
Uzunluk: 150-200 kelime
Dil: Türkçe

Yorum:`;
```

---

## ✅ Karar Matrisi

| Kriter           | @google/genai | @google/generativeai (eski) |
| ---------------- | ------------- | --------------------------- |
| Aktif Destek     | ✅ GA         | ❌ Deprecated               |
| Gemini 2.0+      | ✅ Evet       | ❌ Hayır                    |
| Node.js 20+      | ✅ Uyumlu     | ⚠️ Eski sürümler            |
| Production Ready | ✅ Evet       | ❌ Maintenance mode         |

**KARAR:** `@google/genai` kullanılacak

---

## 📚 Kaynaklar

- [Google GenAI SDK Documentation](https://google.dev)
- [NPM Package: @google/genai](https://npmjs.com/package/@google/genai)
- [Gemini 2.0 Release Notes](https://google.dev)
- [Node.js SDK Best Practices](https://google.dev)

---

**Sonraki Adım:** Implementation plan oluştur ve kodlamaya başla
