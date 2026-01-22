# Vercel Deploy Rehberi

Bu dokümanda AZ-Horoscope projesinin Vercel'de deploy edilmesi için gerekli adımlar açıklanmaktadır.

## Ön Koşullar

1. **Vercel Hesabı:** https://vercel.com adresinden bir hesap oluşturun
2. **GitHub Entegrasyonu:** Vercel'i GitHub hesabınızla bağlayın
3. **Ortam Değişkenleri:** Aşağıdaki değişkenleri hazırlayın

## Ortam Değişkenleri (Environment Variables)

Vercel dashboard'da aşağıdaki ortam değişkenlerini ayarlamanız gerekir:

### Zorunlu Değişkenler

```
NEXTAUTH_SECRET=<openssl rand -base64 32 komutu ile oluşturulan 32 karakterlik rastgele anahtar>
NEXTAUTH_URL=https://azhoroscope.com (veya Vercel tarafından atanan domain)
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
GOOGLE_CLIENT_ID=<Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Google OAuth Client Secret>
GEMINI_API_KEY=<Google Gemini API anahtarı>
```

### Opsiyonel Değişkenler

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<e-posta adresi>
SMTP_PASS=<uygulama şifresi>
```

## Adım 1: Google OAuth Credentials Oluşturma

1. https://console.cloud.google.com adresine gidin
2. Yeni bir proje oluşturun
3. "OAuth 2.0 Client IDs" oluşturun
4. Authorized redirect URIs'e aşağıdakileri ekleyin:
   - `http://localhost:3000/api/auth/callback/google` (geliştirme)
   - `https://azhoroscope.com/api/auth/callback/google` (üretim)
   - `https://<vercel-domain>/api/auth/callback/google` (Vercel)

## Adım 2: Gemini API Key Oluşturma

1. https://aistudio.google.com adresine gidin
2. "Get API Key" butonuna tıklayın
3. Yeni API key oluşturun

## Adım 3: Veritabanı Kurulumu

### Seçenek 1: Neon PostgreSQL (Önerilen)

1. https://neon.tech adresine gidin
2. Ücretsiz hesap oluşturun
3. Yeni bir project oluşturun
4. Connection string'i kopyalayın
5. `DATABASE_URL` olarak Vercel'de ayarlayın

### Seçenek 2: Supabase

1. https://supabase.com adresine gidin
2. Ücretsiz project oluşturun
3. Connection string'i kopyalayın
4. `DATABASE_URL` olarak Vercel'de ayarlayın

## Adım 4: Vercel'de Deploy Etme

### Yöntem 1: Vercel Dashboard

1. https://vercel.com/dashboard adresine gidin
2. "Add New..." → "Project" seçin
3. GitHub repository'yi seçin
4. Project ayarlarını yapılandırın:
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Environment Variables'ı ekleyin
6. "Deploy" butonuna tıklayın

### Yöntem 2: Vercel CLI

```bash
# Vercel CLI'yi yükleyin
npm install -g vercel

# Proje dizinine gidin
cd azhoroscope

# Deploy edin
vercel

# Üretim ortamına deploy edin
vercel --prod
```

## Adım 5: Domain Ayarlaması

1. Vercel dashboard'da proje ayarlarına gidin
2. "Domains" seçeneğine tıklayın
3. `azhoroscope.com` domain'ini ekleyin
4. DNS ayarlarını yapılandırın (Vercel tarafından sağlanan nameservers'ı kullanın)

## Adım 6: Veritabanı Migration

Deploy sonrası veritabanı migration'ını çalıştırın:

```bash
# Lokal ortamda
npx prisma migrate deploy

# Vercel'de (Build aşamasında otomatik çalışır)
# Eğer manuel olarak çalıştırmak istiyorsanız:
vercel env pull # Ortam değişkenlerini çek
npx prisma migrate deploy
```

## Sorun Giderme

### Build Hatası: "DATABASE_URL is not set"

**Çözüm:** Vercel dashboard'da `DATABASE_URL` environment variable'ını ayarladığınızdan emin olun.

### Build Hatası: "NEXTAUTH_SECRET is not set"

**Çözüm:** Vercel dashboard'da `NEXTAUTH_SECRET` environment variable'ını ayarladığınızdan emin olun.

### OAuth Callback Hatası

**Çözüm:** Google Console'da authorized redirect URI'leri doğru şekilde ayarladığınızdan emin olun.

### Veritabanı Bağlantı Hatası

**Çözüm:** 
1. `DATABASE_URL` format'ını kontrol edin
2. Veritabanı sunucusu IP whitelist'ine Vercel IP'lerini ekleyin
3. Veritabanı credentials'ı doğru şekilde ayarladığınızdan emin olun

## Monitoring ve Logging

1. Vercel dashboard'da "Logs" seçeneğine tıklayın
2. Build ve runtime logs'ları görüntüleyin
3. Hataları tespit edin ve çözün

## Güvenlik Kontrol Listesi

- [ ] `NEXTAUTH_SECRET` güvenli ve rastgele bir değer
- [ ] Tüm API anahtarları `.env` dosyasında (git'e commit edilmemiş)
- [ ] CORS ayarları doğru şekilde yapılandırılmış
- [ ] HTTPS zorunlu kılınmış
- [ ] Rate limiting ayarlanmış
- [ ] Database backups yapılandırılmış

## Sonraki Adımlar

1. Üretim ortamında tüm özellikleri test edin
2. Monitoring ve alerting ayarlayın
3. Otomatik backup'ları yapılandırın
4. SSL sertifikası doğrulayın

## Yardımcı Linkler

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NextAuth.js Docs](https://authjs.dev/)
- [Prisma Docs](https://www.prisma.io/docs/)
