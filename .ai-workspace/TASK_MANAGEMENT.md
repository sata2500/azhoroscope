# GÖREV YÖNETİM SİSTEMİ

**Amaç:** AI Ajanların çalışmalarını organize etmesi, yarım kalan işleri devam ettirmesi ve tamamlaması için basit ve etkili bir yapı.

---

## 📋 Görev Durumları

```
BAŞLANMADI → DEVAM EDIYOR → BEKLEME → TAMAMLANDI → ARŞİVLENDİ
```

| Durum | Açıklama |
| :--- | :--- |
| **BAŞLANMADI** | Henüz başlanmamış görev |
| **DEVAM EDIYOR** | Aktif olarak çalışılıyor |
| **BEKLEME** | Başka bir görevin tamamlanmasını bekliyor |
| **TAMAMLANDI** | Tamamlanmış, test edilmiş |
| **ARŞİVLENDİ** | Eski görev, referans için saklanıyor |

---

## 📁 Görev Dosya Yapısı

Her görev için `.ai-workspace/tasks/` klasöründe bir dosya oluşturulur:

```
.ai-workspace/tasks/
├── TASK_001_v1_auth_sistemi.md
├── TASK_002_v1_gunluk_yorum_api.md
├── TASK_003_v1_dogum_haritasi.md
├── TASK_004_v2_palmistry.md
└── ...
```

---

## 📝 Görev Dosyası Şablonu

```markdown
# TASK_XXX: [Görev Adı]

**Versiyon:** v1.0  
**Durum:** BAŞLANMADI / DEVAM EDIYOR / BEKLEME / TAMAMLANDI  
**Atanan Ajan:** [Ajan Adı veya TBD]  
**Başlangıç Tarihi:** [Tarih]  
**Tamamlanma Tarihi:** [Tarih]

---

## 📌 Görev Özeti

[Görevin ne olduğu, neden gerekli olduğu]

---

## 🎯 Hedefler

1. [Hedef 1]
2. [Hedef 2]
3. [Hedef 3]

---

## 📋 Yapılacaklar

- [ ] [Alt görev 1]
- [ ] [Alt görev 2]
- [ ] [Alt görev 3]

---

## 🔗 Bağımlılıklar

- TASK_XXX (Tamamlanması gerekli)
- TASK_YYY (Referans)

---

## 📂 Dosyalar

- `app/auth/...` - Auth bileşenleri
- `lib/auth.ts` - Auth konfigürasyonu
- `prisma/schema.prisma` - Veritabanı şeması

---

## 📝 Notlar

[Önemli notlar, karşılaşılan sorunlar, çözümler]

---

## ✅ Tamamlama Kriteri

- [ ] Kod yazıldı
- [ ] Test edildi
- [ ] Hata yok
- [ ] Commit yapıldı
- [ ] PR açıldı (varsa)

---

## 🔄 Sonraki Görev

TASK_XXX
```

---

## 🚀 Görev Oluşturma Adımları

1. **Görev Numarası:** Sıradaki numarayı kullan (TASK_001, TASK_002, vb.)
2. **Görev Adı:** `TASK_XXX_vY_kisa_aciklama.md` formatında
3. **Şablonu Doldur:** Yukarıdaki şablonu kullan
4. **Bağımlılıkları Belirt:** Hangi görevlerin tamamlanması gerekli?
5. **Yapılacakları Listele:** Detaylı alt görevler
6. **Commit Et:** `git add` ve `git commit`

---

## 📊 Görev Takip Tablosu

Bu tablo `.ai-workspace/TASK_TRACKER.md` dosyasında tutulur:

| Görev | Versiyon | Durum | Ajan | Başlangıç | Tamamlama |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TASK_001 | v1.0 | TAMAMLANDI | Ajan-1 | 22.01 | 24.01 |
| TASK_002 | v1.0 | DEVAM EDIYOR | Ajan-2 | 24.01 | - |
| TASK_003 | v1.0 | BEKLEME | - | - | - |

---

## 🔄 Yarım Kalan Görev Devam Ettirme

Bir ajan yarım kalan bir görevi devam ettirmek istiyorsa:

1. **Görev Dosyasını Oku:** `.ai-workspace/tasks/TASK_XXX.md`
2. **Durumu Kontrol Et:** Nerede kalmış?
3. **Notları Oku:** Hangi sorunlar yaşanmış?
4. **Atanan Ajanı Değiştir:** Dosyada kendi adını yaz
5. **Durumu Güncelle:** `DEVAM EDIYOR` olarak işaretle
6. **Devam Et:** Yapılacaklar listesinden devam et
7. **Commit Et:** `git commit -m "refactor: TASK_XXX devam edildi (Ajan-X)"`

---

## 💡 İyi Uygulamalar

1. **Detaylı Notlar:** Sonraki ajan için açık ve detaylı notlar yaz
2. **Kod Yorumları:** Karmaşık kısımlara Türkçe yorum ekle
3. **Hata Logları:** Karşılaştığın hataları ve çözümlerini yaz
4. **Commit Mesajları:** Anlaşılır ve detaylı commit mesajları
5. **Bağımlılıkları Güncelle:** Yeni bağımlılıklar eklediysen belirt

---

## 🔍 Görev Arama

Belirli bir görev hakkında bilgi almak için:

```bash
cd /home/ubuntu/azhoroscope
grep -r "TASK_XXX" .ai-workspace/
```

---

## 📞 Sorular

Bir görev hakkında soru varsa:
1. Görev dosyasındaki "Notlar" bölümünü oku
2. Bağımlılıkları kontrol et
3. Önceki ajanın commit mesajlarını oku
4. Hala anlamadıysan, yeni bir not ekle

---

**Son Güncelleme:** 22 Ocak 2026  
**Sistem Sahibi:** Salih TANRISEVEN
