# TASK_001: Auth Sistemi (Google OAuth)

**Versiyon:** v1.0  
**Durum:** BAŞLANMADI  
**Atanan Ajan:** TBD  
**Başlangıç Tarihi:** -  
**Tamamlanma Tarihi:** -

---

## Görev Özeti

Kullanıcıların Google hesabıyla giriş yapabilmesi için NextAuth v5 entegrasyonunu yapacağız.

---

## Hedefler

1. NextAuth v5 kurulumu ve konfigürasyonu
2. Google OAuth provider entegrasyonu
3. Kullanıcı session yönetimi
4. Giriş/çıkış sayfaları
5. Prisma ile kullanıcı veritabanı entegrasyonu

---

## Yapılacaklar

- [ ] NextAuth v5 paketini yükle
- [ ] Google OAuth credentials oluştur
- [ ] lib/auth.ts dosyasını oluştur
- [ ] Prisma schema'ya User modeli ekle
- [ ] Veritabanı migration'ını çalıştır
- [ ] Giriş/çıkış sayfalarını oluştur
- [ ] Middleware'i konfigüre et
- [ ] Test et
- [ ] Commit et

---

## Bağımlılıklar

- Veritabanı kurulumu (Vercel: Neon, Self-Hosted: SQLite)
- Prisma ORM kurulumu

---

## Dosyalar

- lib/auth.ts - NextAuth konfigürasyonu
- app/(auth)/login/page.tsx - Giriş sayfası
- app/(auth)/logout/page.tsx - Çıkış sayfası
- app/middleware.ts - Route protection
- prisma/schema.prisma - User modeli

---

## Adımlar

1. NextAuth v5 ve Prisma paketlerini yükle
2. Google OAuth credentials oluştur (console.cloud.google.com)
3. lib/auth.ts dosyasında NextAuth'u konfigüre et
4. Prisma schema'ya User modeli ekle
5. Migration'ı çalıştır
6. Giriş/çıkış sayfalarını oluştur
7. Middleware ekle
8. Test et (login/logout akışı)
9. Commit et

---

## Test Edilecek Durumlar

- [ ] Google ile giriş yapılabiliyor
- [ ] Session oluşturuluyor
- [ ] Veritabanına kullanıcı kaydediliyor
- [ ] Çıkış yapılabiliyor
- [ ] Protected routes çalışıyor

---

## Notlar

- NextAuth v5 (Auth.js) kullan
- Türkçe yorum ekle
- Hata mesajları Türkçe olsun
- .env dosyasında credentials sakla

---

## Tamamlama Kriteri

- [ ] Kod yazıldı ve test edildi
- [ ] Tüm hata durumları işlendi
- [ ] Commit mesajı açık ve detaylı
- [ ] Sonraki görev (TASK_002) başlatılabilir

---

## Sonraki Görev

TASK_002: Günlük Yorum API

---

Oluşturan: Manus AI  
Oluşturma Tarihi: 22 Ocak 2026
