# AI AJAN PROTOKOLÜ & PROJE ANAYASASI

**ÖNEMLİ UYARI:** Bu belge, bu repoda (depoda) çalışan HERHANGİ BİR Yapay Zeka Ajanı (Antigravity, Gemini, Manus, Cursor, Windsurf vb.) için ZORUNLU kuralları tanımlar. Kod yazmaya başlamadan önce bu kuralları okumak ve uygulamakla yükümlüsün.

## 1. TEMEL FELSEFE: ÖNCE ARAŞTIR, SONRA KODLA

* **Güncellik Kontrolü (Knowledge Cutoff Check):** Herhangi bir kod yazmadan önce, kullanılacak teknolojinin (Örn: Next.js 16, React 19, Prisma) **en son kararlı sürümünü** ve "best practice" yöntemlerini internette araştır.
* **Eski Yöntem Yasağı:** Deprecated (kullanımdan kalkmış) yöntemleri asla kullanma. (Örn: Next.js'de `Pages Router` yerine `App Router` zorunludur).
* **Planlama:** Kod editörüne dokunmadan önce, araştırmana dayalı adım adım bir uygulama planı oluştur ve `.ai-workspace/plans/` altına kaydet.

## 2. ORTAK HAFIZA & DOSYA YAPISI (TEK DOĞRULUK KAYNAĞI)

* **Çalışma Alanı (.ai-workspace):** Tüm planlar, araştırmalar ve analizler kök dizindeki `.ai-workspace/` klasöründe tutulmalıdır.
    * `/research`: Teknik araştırmalar ve benchmark raporları.
    * `/plans`: Aktif görev planları ve yapılacaklar listeleri.
    * `/architecture`: Sistem mimarisi ve veritabanı şemaları.
    * `/archive`: Tamamlanmış ve geçerliliğini yitirmiş belgeler.
* **Kontrol Etmeden Başlama:** Bir göreve başlamadan önce MUTLAKA bu klasörleri tara. Başka bir ajanın başlattığı bir iş var mı? Mevcut mimari nedir? Öğrenmeden kod yazma.
* **Teknoloji Konsolidasyonu:** Projeye gereksiz kütüphane ekleme. Eğer mevcut teknoloji yığınında (stack) o işi yapan bir araç varsa, onu kullan.

## 3. DOĞRUSAL VE ATOMİK GELİŞTİRME

* **Tek Odak (Single Focus):** Asla aynı anda birden fazla özellik (feature) üzerinde çalışma.
* **Modül Kilidi:** Başladığın bir modülü (Örn: Auth Sistemi) **%100 tamamlamadan**, test etmeden ve hatasız çalıştığını onaylamadan diğer modüle geçme.
* **Döngü:** `Araştır -> Planla -> Kodla -> Test Et -> Hata Gider -> Onayla`. Bu zinciri kırma.
* **Stabilite:** `main` dalı her zaman derlenebilir ve çalıştırılabilir olmalıdır. Deneysel kodlar projeyi bozmamalıdır.

## 4. BAĞLAM VE İLETİŞİM

* **Türkçe Zorunluluğu:** Proje dili, kod yorumları, dokümantasyon ve commit mesajları dahil olmak üzere **TÜRKÇE** olmalıdır.
* **Halüsinasyon Yasağı:** Bir sürümden veya syntax'tan emin değilsen tahmin yürütme. Dur, internette araştır veya kullanıcıya sor.
* **Hata Analizi (Deep Debugging):** Hata çıktığında ezbere çözüm uygulama. Hatayı araştır, kök nedenini (root cause) bul ve kalıcı çözüm uygula.

---

**Son Güncelleme:** 22 Ocak 2026
**Geliştirici:** Salih TANRISEVEN
**E-posta:** salihtanriseven25@gmail.com
