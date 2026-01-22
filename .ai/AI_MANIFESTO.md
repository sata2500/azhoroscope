# AI AJAN PROTOKOLÜ & PROJE ANAYASASI

**ÖNEMLİ UYARI:** Bu belge, bu repoda çalışan HERHANGİ BİR Yapay Zeka Ajanı (Antigravity, Gemini, Manus, Cursor, Windsurf vb.) için ZORUNLU kuralları tanımlar. Kod yazmaya başlamadan önce bu kuralları okumak ve uygulamakla yükümlüsün.

## 1. TEMEL STRATEJİ: STABİLİTE > YENİLİK

* **Stabilite Önceliği:** Amacımız "teknoloji demosu" yapmak değil, çalışan bir ürün ortaya koymaktır. Aksi belirtilmedikçe **LTS (Long Term Support)** veya kendini kanıtlamış **Stable** sürümleri kullan.
* **Bleeding Edge Yasağı:** "Alpha", "Beta", "Canary", "Experimental" veya "Release Candidate (RC)" etiketli sürümleri ASLA kullanma.
* **Uyumluluk Kontrolü (Compatibility Matrix):** Bir teknolojiyi seçmeden önce, projedeki diğer kritik bileşenlerle (Örn: Next.js + Prisma + Turbopack) uyumunu araştır. "En yeni sürüm" her zaman "en iyi sürüm" değildir.

## 2. ORTAK HAFIZA & DOSYA YAPISI (TEK DOĞRULUK KAYNAĞI)

* **Çalışma Alanı (.ai-workspace):** Tüm planlar, araştırmalar ve analizler kök dizindeki `.ai-workspace/` klasöründe tutulmalıdır.
    * `/research`: Teknik araştırmalar ve benchmark raporları.
    * `/plans`: Aktif görev planları ve yapılacaklar listeleri.
    * `/architecture`: Sistem mimarisi, teknoloji yığını (Tech Stack) ve veritabanı şemaları.
    * `/archive`: Tamamlanmış ve geçerliliğini yitirmiş belgeler.
* **Kontrol Etmeden Başlama:** Bir göreve başlamadan önce MUTLAKA bu klasörleri tara. Başka bir ajanın başlattığı bir iş var mı? Öğrenmeden kod yazma.

## 3. DOĞRUSAL VE ATOMİK GELİŞTİRME

* **Tek Odak (Single Focus):** Asla aynı anda birden fazla özellik üzerinde çalışma.
* **Modül Kilidi:** Başladığın bir modülü **%100 tamamlamadan**, test etmeden ve hatasız çalıştığını onaylamadan diğer modüle geçme.
* **Döngü:** `Araştır -> Planla -> Kodla -> Test Et -> Hata Gider -> Onayla`. Bu zinciri kırma.

## 4. KÖRDÜĞÜM PROTOKOLÜ (DEADLOCK PROTOCOL)

* **3 Hata Kuralı:** Eğer bir entegrasyon hatasını çözmek için yaptığın 3 farklı deneme başarısız olursa; DUR.
* **Geri Çekil (Rollback):** Daha fazla yama yapmaya çalışma. Sorunlu teknolojiyi daha kararlı bir sürüme düşür veya daha basit bir yönteme geç.
* **Raporla:** Kullanıcıya durumu bildir ve "Güvenli Mod" çözümünü öner.

## 5. BAĞLAM VE İLETİŞİM

* **Türkçe Zorunluluğu:** Proje dili, kod yorumları, dokümantasyon ve commit mesajları dahil olmak üzere **TÜRKÇE** olmalıdır.
* **Halüsinasyon Yasağı:** Bir sürümden veya syntax'tan emin değilsen tahmin yürütme. Dur, internette araştır veya kullanıcıya sor.
