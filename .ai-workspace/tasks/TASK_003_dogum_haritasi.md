# Görev: Doğum Haritası Hesaplama (TASK_003)

**Oluşturma Tarihi:** 23 Ocak 2026
**Durum:** Planlama Aşamasında
**Öncelik:** Yüksek
**Bağımlılıklar:** TASK_002 (API Altyapısı - dolaylı)

## 1. Amaç

Kullanıcının doğum tarihi, saati ve yeri bilgilerini alarak; gezegen konumlarını (Sign, Degree), ev girişlerini (House Cusps) ve yükselen burcu (Ascendant) hesaplayan bir API geliştirmek.

## 2. Teknik Gereksinimler

- **Kütüphane:** `swisseph` (Node.js wrapper for Swiss Ephemeris) veya `astronomy-engine` (Pure JS Fallback).
  - _Tercih:_ `swisseph` (Sektör standardı doğruluk).
- **Girdi:**
  - Tarih (YYYY-MM-DD)
  - Saat (HH:mm)
  - Enlem/Boylam (Latitude/Longitude)
  - (Opsiyonel) House System (Default: Placidus)
- **Çıktı:**
  - Gezegenler: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron, Lilith, North Node.
  - Veriler: Burç, Derece, Retro Durumu.
  - Evler: 1-12. Ev giriş çizgileri (Cusps).
  - Açılar: Ascendant (ASC), Midheaven (MC).

## 3. Kabul Kriterleri (DoD)

- [ ] `/api/horoscope/chart` endpoint'i POST isteklerini kabul etmeli.
- [ ] Geçerli verilerle test edildiğinde doğru (astro.com veya astro-seek ile uyumlu) sonuçlar dönmeli.
- [ ] Hatalı tarih/konum verilerinde anlamlı hata mesajı dönmeli.
- [ ] TypeScript tipleri tam ve eksiksiz olmalı.

## 4. Adımlar

1.  `npm install swisseph` (veya alternatif) kurulumu. (Ephemeris dosyalarının yönetimi dikkate alınmalı).
2.  `lib/astrology/` altında hesaplama motorunun oluşturulması.
3.  API Route implementasyonu.
4.  Test senaryolarının yazılması.
