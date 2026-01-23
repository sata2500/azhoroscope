# Araştırma Raporu: Astroloji Motoru Seçimi (Swisseph vs Astronomy-Engine)

**Tarih:** 23 Ocak 2026
**Konu:** Proje için en uygun hesaplama motorunun belirlenmesi.

## 1. Karşılaştırma Tablosu

| Özellik                   | Swiss Ephemeris (`swisseph`)    | Astronomy Engine (`astronomy-engine`)         |
| :------------------------ | :------------------------------ | :-------------------------------------------- |
| **Hassasiyet**            | **Çok Yüksek** (0.001 arcsec)   | **Yüksek** (1 arcmin ~ 0.01 derece)           |
| **Kaynak Veri**           | NASA JPL DE431 (Standart)       | VSOP87 (Truncated) & NASA JPL                 |
| **Hız**                   | Hızlı (C++)                     | Çok Hızlı (Pure JS)                           |
| **Platform**              | Native Module (Node.js/C++)     | Pure JavaScript (Browser/Node/Edge)           |
| **Kurulum**               | Zor (Binary derleme gerekli)    | Kolay (`npm install`)                         |
| **Vercel/Edge**           | **Desteklenmez** (çoğu durumda) | **Tam Destek**                                |
| **Astroloji Özellikleri** | Yerleşik (Evler, Açılar, vb.)   | Sınırlı (Temel Astronomi, manuel hesap lazım) |

## 2. Hassasiyet Analizi

### Swiss Ephemeris

- Profesyonel astroloji yazılımlarının (Solar Fire, Astro.com, Astro-Seek) endüstri standardıdır.
- Efemeris dosyaları (100MB+) gerektirebilir, ancak Moshier fallback ile dosyasız da oldukça hassastır.
- **Node.js Entegrasyonu:** `swisseph` paketi C++ binding kullanır. Bu durum, yerel geliştirme ortamında (Linux/Mac/Win) çalışırken, **Vercel Edge Functions** veya **Serverless (Lambda)** ortamlarında "binary uyumsuzluğu" nedeniyle sık sık hata verir (gyp hataları, glibc sürüm farkları).

### Astronomy Engine

- Astronomik hesaplamalar için optimize edilmiştir.
- Astrolojik "Ev Sistemleri" (Placidus, Koch vb.) yerleşik değildir. Bu algoritmaların elle yazılması gerekir.
- Hassasiyeti "amatör kullanım" için yeterlidir (1 arc-minute sapma, bir doğum haritası yorumu için ihmal edilebilir düzeydedir).
- **Avantajı:** Saf JavaScript olduğu için her yerde (Browser, Edge, Server) sorunsuz çalışır.

## 3. Öneri ve Strateji

### Kısa Vadeli (MVP) Çözüm: `astronomy-engine`

- **Neden:** Şu an "çalışan" ve "deploy edilebilir" bir sisteme ihtiyacımız var. `swisseph` ile yaşanan build sorunları projenin GitHub/Canlı ortamına çıkışını engelliyor.
- **Eksiklik:** Placidus ev sistemi şu an yok (Equal House kullanıyoruz).
- **Aksiyon:** MVP için bu kütüphane ile devam edip canlıya çıkalım.

### Uzun Vadeli (Profesyonel) Çözüm: Harici Mikroservis veya `swisseph` (Docker)

- Eğer `swisseph` hassasiyetine kesinlikle ihtiyaç duyulursa (örneğin rektifikasyon veya bilimsel analiz için), Next.js uygulamasının içine gömmek yerine;
  - Ayrı bir **Node.js/Express servisi** olarak Docker container içinde çalıştırılabilir.
  - Veya **Python (Kerykeion)** tabanlı bir mikroservis kurulabilir.
- Bu sayede Vercel'in kısıtlamalarından kurtulunur.

## 4. Sonuç

Şu an için **Astronomy Engine** ile ilerleyip, Ev Sistemi hesaplamalarını (Placidus) matematiksel olarak port etmek en mantıklı yoldur. Eğer bu çok zorlarsa, sadece hesaplama işini yapan ayrı bir basit API (örneğin Fly.io veya Railway üzerinde) kurabiliriz.
