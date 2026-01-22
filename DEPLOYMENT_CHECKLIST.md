# Vercel Deployment Kontrol Listesi

Bu dokümanda Vercel'de deployment öncesi ve sonrası yapılması gereken tüm kontroller listelenmiştir.

## Pre-Deployment Kontrolleri

### Kod Kalitesi
- [x] TypeScript type checking başarılı (`npm run type-check`)
- [x] Build işlemi başarılı (`npm run build`)
- [x] Tüm sayfalar render ediliyor
- [x] Middleware doğru şekilde yapılandırılmış
- [x] ESLint konfigürasyonu ayarlanmış

### Dosya Yapısı
- [x] `app/` klasörü doğru şekilde organize edilmiş
- [x] `components/` klasörü yapılandırılmış
- [x] `lib/` klasörü yardımcı fonksiyonları içeriyor
- [x] `prisma/` klasörü şema ve migration'ları içeriyor
- [x] `.env.example` dosyası mevcut
- [x] `.gitignore` dosyası doğru şekilde yapılandırılmış

### Konfigürasyonlar
- [x] `next.config.js` doğru şekilde ayarlanmış
- [x] `tsconfig.json` TypeScript ayarlarını içeriyor
- [x] `package.json` tüm bağımlılıkları listeliyor
- [x] `vercel.json` deployment konfigürasyonunu içeriyor
- [x] `prisma/schema.prisma` veritabanı şemasını tanımlıyor

### Güvenlik
- [x] API anahtarları `.env` dosyasında (git'e commit edilmemiş)
- [x] `NEXTAUTH_SECRET` rastgele ve güvenli
- [x] Hassas bilgiler environment variable'larda
- [x] `.gitignore` `.env.local` dosyasını içeriyor

### Git
- [x] Tüm değişiklikler commit edilmiş
- [x] Commit mesajları açık ve detaylı
- [x] GitHub'a push yapılmış
- [x] Git history temiz ve anlamlı

## Deployment Adımları

### 1. Vercel Hesabı Kurulumu
- [ ] Vercel hesabı oluşturuldu (https://vercel.com)
- [ ] GitHub ile entegre edildi
- [ ] azhoroscope repository'si bağlandı

### 2. Ortam Değişkenleri Ayarlaması
- [ ] `NEXTAUTH_SECRET` ayarlandı
- [ ] `NEXTAUTH_URL` ayarlandı (örn: https://azhoroscope.com)
- [ ] `DATABASE_URL` ayarlandı
- [ ] `GOOGLE_CLIENT_ID` ayarlandı
- [ ] `GOOGLE_CLIENT_SECRET` ayarlandı
- [ ] `GEMINI_API_KEY` ayarlandı

### 3. Veritabanı Kurulumu
- [ ] Neon veya Supabase hesabı oluşturuldu
- [ ] PostgreSQL veritabanı oluşturuldu
- [ ] Connection string alındı
- [ ] `DATABASE_URL` olarak Vercel'de ayarlandı

### 4. Google OAuth Kurulumu
- [ ] Google Cloud Console'da proje oluşturuldu
- [ ] OAuth 2.0 Client ID oluşturuldu
- [ ] Authorized redirect URI'ler eklendi:
  - [ ] `http://localhost:3000/api/auth/callback/google`
  - [ ] `https://azhoroscope.com/api/auth/callback/google`
  - [ ] `https://<vercel-domain>/api/auth/callback/google`
- [ ] Client ID ve Secret alındı

### 5. Gemini API Kurulumu
- [ ] Google AI Studio'da API key oluşturuldu
- [ ] API key Vercel'de ayarlandı

### 6. Domain Ayarlaması
- [ ] azhoroscope.com domain'i Vercel'e eklendi
- [ ] DNS ayarları yapılandırıldı
- [ ] SSL sertifikası oluşturuldu

## Post-Deployment Kontrolleri

### Fonksiyonalite Testleri
- [ ] Ana sayfa yükleniyor
- [ ] Giriş sayfası yükleniyor
- [ ] Google ile giriş yapılabiliyor
- [ ] Dashboard sayfası yükleniyor
- [ ] Çıkış yapılabiliyor
- [ ] Hata sayfası doğru şekilde gösteriliyor
- [ ] Hoş geldiniz sayfası yükleniyor

### Güvenlik Testleri
- [ ] HTTPS zorunlu kılınmış
- [ ] Korunan sayfalar giriş gerektiriyor
- [ ] Admin sayfaları admin rolü gerektiriyor
- [ ] Session'lar doğru şekilde yönetiliyor
- [ ] CORS ayarları doğru

### Performans Testleri
- [ ] Sayfa yükleme süresi < 2 saniye
- [ ] API yanıt süresi < 500ms
- [ ] Lighthouse skoru > 90
- [ ] Core Web Vitals iyileştirilmiş

### Veritabanı Testleri
- [ ] Veritabanı bağlantısı çalışıyor
- [ ] Prisma migrations başarılı
- [ ] Kullanıcı verileri kaydediliyor
- [ ] Sorgulamalar hızlı çalışıyor

### Monitoring Testleri
- [ ] Vercel logs erişilebiliyor
- [ ] Error tracking ayarlanmış
- [ ] Analytics etkinleştirilmiş
- [ ] Alerting konfigüre edilmiş

## Sık Karşılaşılan Sorunlar ve Çözümleri

### Build Hatası: "DATABASE_URL is not set"
```
Çözüm: Vercel dashboard → Settings → Environment Variables
       DATABASE_URL'i kontrol edin
```

### Build Hatası: "NEXTAUTH_SECRET is not set"
```
Çözüm: Vercel dashboard → Settings → Environment Variables
       NEXTAUTH_SECRET'i kontrol edin
```

### OAuth Callback Hatası
```
Çözüm: Google Cloud Console → OAuth 2.0 Client ID
       Authorized redirect URI'leri kontrol edin
```

### Veritabanı Bağlantı Hatası
```
Çözüm: 
1. DATABASE_URL format'ını kontrol edin
2. Veritabanı sunucusu IP whitelist'ine Vercel IP'lerini ekleyin
3. Veritabanı credentials'ı doğru şekilde ayarladığınızdan emin olun
```

### Prisma Migration Hatası
```
Çözüm: 
1. Lokal ortamda migration'ı test edin
2. Veritabanı bağlantısını doğrulayın
3. Migration dosyalarını kontrol edin
```

## Rollback Prosedürü

Eğer deployment başarısız olursa:

1. Vercel dashboard'da önceki deployment'ı seçin
2. "Rollback" butonuna tıklayın
3. Sorunun nedenini belirleyin
4. Düzeltmeleri yapın
5. Tekrar deploy edin

## Monitoring ve Maintenance

### Günlük Kontroller
- [ ] Vercel logs'ları kontrol edin
- [ ] Error rates'i izleyin
- [ ] Performance metrics'leri kontrol edin

### Haftalık Kontroller
- [ ] Veritabanı backups'ını doğrulayın
- [ ] Security updates'leri kontrol edin
- [ ] Usage statistics'leri gözden geçirin

### Aylık Kontroller
- [ ] Tüm sistem bileşenlerini test edin
- [ ] Disaster recovery planını test edin
- [ ] Güvenlik audit'i yapın

## İletişim ve Destek

- **Vercel Support:** https://vercel.com/support
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **NextAuth.js Docs:** https://authjs.dev

## Son Kontrol

- [ ] Tüm kontroller tamamlandı
- [ ] Deployment başarılı
- [ ] Üretim ortamında tüm özellikler çalışıyor
- [ ] Monitoring aktif
- [ ] Backup'lar yapılandırılmış
- [ ] Dokumentasyon güncel

**Deployment Tarihi:** _______________  
**Sorumlu Kişi:** Salih TANRISEVEN  
**Onay:** _______________
