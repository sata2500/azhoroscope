# AZ-Horoscope Proje Başlangıç Planı

**Tarih:** 22 Ocak 2026  
**Durum:** Başlangıç  
**Sorumlu:** Salih TANRISEVEN

## Proje Özeti

AZ-Horoscope, yapay zeka destekli, profesyonel bir astroloji platformudur. Gerçek astronomik verilerle çalışarak kullanıcılara kişiselleştirilmiş burç yorumları, doğum haritası analizi ve gelecek tahminleri sunmaktadır.

## Teknoloji Yığını

| Bileşen | Teknoloji | Versiyon |
|---------|-----------|---------|
| Framework | Next.js | En Son Stabil-Uyumlu |
| Dil | TypeScript | En Son Stabil-Uyumlu |
| UI | shadcn/ui + Tailwind CSS | En Son Stabil-Uyumlu |
| Veritabanı | PostgreSQL | En Son Stabil-Uyumlu |
| ORM | Prisma | En Son Stabil-Uyumlu |
| Kimlik Doğrulama | NextAuth v5 (Auth.js) | En Son Stabil-Uyumlu |
| AI Modeli | Gemini  | Tüm Sürümler |
| Astroloji | Swiss Ephemeris | En Son Stabil-Uyumlu |

## Geliştirme Aşamaları

### Faz 1: Altyapı ve Temel Kurulum (Hafta 1-2)
- [ ] Next.js 16 + TypeScript projesini kur
- [ ] Tailwind CSS ve shadcn/ui entegrasyonu
- [ ] PostgreSQL + Prisma ORM kurulumu
- [ ] NextAuth v5 kimlik doğrulama sistemi
- [ ] Temel proje yapısı (app router)

### Faz 2: Kullanıcı Yönetimi (Hafta 3)
- [ ] Kullanıcı kayıt ve giriş sayfaları
- [ ] E-posta doğrulama
- [ ] Profil yönetimi
- [ ] Doğum tarihi ve saat bilgisi kaydı

### Faz 3: Astroloji Motoru (Hafta 4-5)
- [ ] Swiss Ephemeris entegrasyonu
- [ ] Doğum haritası hesaplama
- [ ] Gezegen konumları analizi
- [ ] Burç ve ev hesaplamaları

### Faz 4: AI Entegrasyonu (Hafta 6)
- [ ] Google Gemini API entegrasyonu
- [ ] Günlük burç yorumları üretimi
- [ ] Kişiselleştirilmiş içgörüler
- [ ] Haftalık/aylık tahminler

### Faz 5: Kullanıcı Arayüzü (Hafta 7-8)
- [ ] Dashboard tasarımı
- [ ] Burç yorumları sayfası
- [ ] Doğum haritası görselleştirmesi
- [ ] Dark/Light mod desteği

### Faz 6: Ek Özellikler (Hafta 9-10)
- [ ] Kişisel günlük sistemi
- [ ] E-posta bildirimleri
- [ ] Yönetim paneli
- [ ] Analitik ve raporlama

### Faz 7: Test ve Yayın (Hafta 11-12)
- [ ] Birim testleri (Unit Tests)
- [ ] Entegrasyon testleri
- [ ] Performans optimizasyonu
- [ ] Üretim ortamına dağıtım

## Proje Kuralları

Bu proje **AI Ajan Protokolü** ile yönetilmektedir. Tüm geliştirme çalışmaları şu kurallara uymalıdır:

1. **Araştır Sonra Kodla:** Kod yazmadan önce en güncel best practices araştırılmalıdır.
2. **Türkçe Zorunluluğu:** Tüm kod, yorumlar ve dokümantasyon Türkçe olmalıdır.
3. **Dosya Yapısı:** Tüm planlar `.ai-workspace/` klasöründe tutulmalıdır.
4. **Atomik Geliştirme:** Bir modül %100 tamamlanmadan diğerine geçilmemelidir.
5. **Stabilite:** `main` dalı her zaman çalışır durumda olmalıdır.

## Sonraki Adımlar

1. Proje yapısı kuruldu ✓
2. Git repo oluşturulacak
3. İlk commit yapılacak
4. Faz 1 planlaması detaylandırılacak
