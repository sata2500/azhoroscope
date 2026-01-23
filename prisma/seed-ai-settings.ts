import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAiSettings() {
  console.log('🌱 AI Settings seed başlatılıyor...');

  // daily_reading için AI ayarları
  const dailyReading = await prisma.aiSettings.upsert({
    where: { featureName: 'daily_reading' },
    create: {
      featureName: 'daily_reading',
      model: 'gemini-2.0-flash-exp',
      temperature: 0.8,
      maxTokens: 1024,
      prompt: `Sen profesyonel bir astrologsun. {zodiacSign} burcu için {date} tarihine özel günlük bir yorum yaz.

Yorum şu konuları içermeli:
- Genel ruh hali ve enerji durumu
- Aşk ve ilişkiler  
- Kariyer ve iş hayatı
- Sağlık ve wellness
- Günün şanslı rengi ve sayısı

Ton: Samimi, pozitif, motive edici ve gerçekçi
Uzunluk: 200-250 kelime
Dil: Türkçe
Format: Düz metin (HTML tag yok)

Önemli: Genel ifadeler yerine, burç karakteristiğine özgü spesifik tavsiyeler ver.

Yorum:`,
      active: true,
    },
    update: {},
  });

  console.log('✅ daily_reading ayarları:', dailyReading.id);

  console.log('🎉 AI Settings seed tamamlandı!');
}

seedAiSettings()
  .catch((error) => {
    console.error('❌ Seed hatası:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
