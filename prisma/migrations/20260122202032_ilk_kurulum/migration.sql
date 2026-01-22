-- CreateTable
CREATE TABLE "kullanicilar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "emailDogrulandi" DATETIME,
    "ad" TEXT,
    "soyad" TEXT,
    "resim" TEXT,
    "dogumTarihi" DATETIME,
    "dogumSaati" TEXT,
    "dogumYeri" TEXT,
    "burc" TEXT,
    "rol" TEXT NOT NULL DEFAULT 'KULLANICI',
    "olusturmaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellemeTarihi" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "hesaplar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kullaniciId" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "saglayici" TEXT NOT NULL,
    "saglayiciHesapId" TEXT NOT NULL,
    "yenilemeToken" TEXT,
    "erisimToken" TEXT,
    "tokenSonlanma" INTEGER,
    "tokenTipi" TEXT,
    "kapsam" TEXT,
    "idToken" TEXT,
    "oturumDurumu" TEXT,
    CONSTRAINT "hesaplar_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "kullanicilar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "oturumlar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "oturumToken" TEXT NOT NULL,
    "kullaniciId" TEXT NOT NULL,
    "sonlanmaTarihi" DATETIME NOT NULL,
    CONSTRAINT "oturumlar_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "kullanicilar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dogrulama_tokenleri" (
    "tanimlayici" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "sonlanmaTarihi" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "dogum_haritalari" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kullaniciId" TEXT NOT NULL,
    "gunes" REAL,
    "ay" REAL,
    "merkur" REAL,
    "venus" REAL,
    "mars" REAL,
    "jupiter" REAL,
    "saturn" REAL,
    "uranus" REAL,
    "neptun" REAL,
    "pluton" REAL,
    "yukselenBurc" TEXT,
    "yukselenDerece" REAL,
    "hesaplamaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellemeTarihi" DATETIME NOT NULL,
    CONSTRAINT "dogum_haritalari_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "kullanicilar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gunluk_yorumlar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kullaniciId" TEXT,
    "tarih" DATETIME NOT NULL,
    "burc" TEXT NOT NULL,
    "yorumTipi" TEXT NOT NULL DEFAULT 'GUNLUK',
    "yorum" TEXT NOT NULL,
    "aiModeli" TEXT,
    "promptId" TEXT,
    "olusturmaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "gunluk_yorumlar_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "kullanicilar" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gunlukler" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kullaniciId" TEXT NOT NULL,
    "tarih" DATETIME NOT NULL,
    "ruhHali" TEXT,
    "notlar" TEXT,
    "olusturmaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellemeTarihi" DATETIME NOT NULL,
    CONSTRAINT "gunlukler_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "kullanicilar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ai_ayarlari" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ozellikAdi" TEXT NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'gemini-1.5-flash',
    "temperature" REAL NOT NULL DEFAULT 0.7,
    "maxTokens" INTEGER NOT NULL DEFAULT 1024,
    "prompt" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "olusturmaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellemeTarihi" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "sistem_loglari" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seviye" TEXT NOT NULL DEFAULT 'INFO',
    "kategori" TEXT NOT NULL,
    "mesaj" TEXT NOT NULL,
    "detaylar" TEXT,
    "kullaniciId" TEXT,
    "olusturmaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "kullanicilar_email_key" ON "kullanicilar"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hesaplar_saglayici_saglayiciHesapId_key" ON "hesaplar"("saglayici", "saglayiciHesapId");

-- CreateIndex
CREATE UNIQUE INDEX "oturumlar_oturumToken_key" ON "oturumlar"("oturumToken");

-- CreateIndex
CREATE UNIQUE INDEX "dogrulama_tokenleri_token_key" ON "dogrulama_tokenleri"("token");

-- CreateIndex
CREATE UNIQUE INDEX "dogrulama_tokenleri_tanimlayici_token_key" ON "dogrulama_tokenleri"("tanimlayici", "token");

-- CreateIndex
CREATE UNIQUE INDEX "dogum_haritalari_kullaniciId_key" ON "dogum_haritalari"("kullaniciId");

-- CreateIndex
CREATE INDEX "gunluk_yorumlar_tarih_burc_idx" ON "gunluk_yorumlar"("tarih", "burc");

-- CreateIndex
CREATE INDEX "gunlukler_kullaniciId_tarih_idx" ON "gunlukler"("kullaniciId", "tarih");

-- CreateIndex
CREATE UNIQUE INDEX "ai_ayarlari_ozellikAdi_key" ON "ai_ayarlari"("ozellikAdi");

-- CreateIndex
CREATE INDEX "sistem_loglari_seviye_olusturmaTarihi_idx" ON "sistem_loglari"("seviye", "olusturmaTarihi");
