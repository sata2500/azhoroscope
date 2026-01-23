import { GoogleGenAI } from '@google/genai';
import { prisma } from '@/lib/db';
import type { ZodiacSign, GeminiSettings } from '@/types/gemini';
import { ZODIAC_NAMES_TR as zodiacNamesTr } from '@/types/gemini';

/**
 * Gemini AI Client Singleton
 * 
 * Google GenAI SDK kullanarak Gemini API'ye erişim sağlar.
 * API key environment variable'dan otomatik yüklenir.
 */
class GeminiClient {
  private static instance: GoogleGenAI | null = null;

  /**
   * Gemini client instance'ını döndür (singleton pattern)
   */
  static getInstance(): GoogleGenAI {
    if (!this.instance) {
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error(
          'GEMINI_API_KEY environment variable bulunamadı. ' +
          'Lütfen .env dosyasında GEMINI_API_KEY tanımlayın.'
        );
      }

      this.instance = new GoogleGenAI({ apiKey });
    }

    return this.instance;
  }
}

/**
 * AI ayarlarını veritabanından çek
 * 
 * @param featureName - Özellik adı (örn: 'daily_reading')
 * @returns AI ayarları veya null
 */
export async function getAiSettings(
  featureName: string
): Promise<GeminiSettings | null> {
  const settings = await prisma.aiSettings.findUnique({
    where: { featureName },
  });

  if (!settings || !settings.active) {
    return null;
  }

  return {
    model: settings.model,
    temperature: settings.temperature,
    maxTokens: settings.maxTokens,
    prompt: settings.prompt || undefined,
  };
}

/**
 * Günlük burç yorumu prompt'u oluştur
 * 
 * @param zodiacSign - Burç adı (İngilizce)
 * @param date - Tarih (YYYY-MM-DD)
 * @param customPrompt - Özel prompt (opsiyonel)
 * @returns Gemini'ye gönderilecek prompt
 */
function buildDailyHoroscopePrompt(
  zodiacSign: ZodiacSign,
  date: string,
  customPrompt?: string
): string {
  const zodiacNameTr = zodiacNamesTr[zodiacSign];
  const formattedDate = new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (customPrompt) {
    // Custom prompt varsa, placeholder'ları değiştir
    return customPrompt
      .replace('{zodiacSign}', zodiacNameTr)
      .replace('{zodiacSignEn}', zodiacSign)
      .replace('{date}', formattedDate)
      .replace('{dateIso}', date);
  }

  // Default prompt
  return `Sen profesyonel bir astrologsun. ${zodiacNameTr} burcu için ${formattedDate} tarihine özel günlük bir yorum yaz.

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

Önemli: Genel ifadeler yerine, burç karakteristiğine özgü spesifik tavsiyeler ver. Çok abartılı veya belirsiz ifadelerden kaçın.

Yorum:`;
}

/**
 * Gemini AI ile günlük burç yorumu üret
 * 
 * @param zodiacSign - Burç adı
 * @param date - Tarih (YYYY-MM-DD)
 * @returns Üretilen yorum metni
 */
export async function generateDailyHoroscope(
  zodiacSign: ZodiacSign,
  date: string
): Promise<string> {
  try {
    // AI ayarlarını çek
    const settings = await getAiSettings('daily_reading');
    
    if (!settings) {
      throw new Error('daily_reading için AI ayarları bulunamadı veya devre dışı');
    }

    // Gemini client'ı al
    const genAI = GeminiClient.getInstance();

    // Prompt oluştur
    const prompt = buildDailyHoroscopePrompt(
      zodiacSign,
      date,
      settings.prompt
    );

    // Gemini'den yanıt al - v1.38.0 SDK yapısı
    const result = await genAI.models.generateContent({
      model: settings.model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: settings.temperature,
        maxOutputTokens: settings.maxTokens,
      },
    });

    const response = result;
    
    // Response text extraction - güvenli yöntem
    let text = '';
    if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            text = candidate.content.parts[0].text || '';
        }
    }
    
    // Eğer text property/getter varsa
    if (!text && response.text) {
        text = response.text;
    }
    if (!text || text.trim().length === 0) {
      throw new Error('Gemini API boş yanıt döndü');
    }

    return text.trim();
  } catch (error) {
    console.error('Gemini AI hatası:', error);
    
    // Fallback: Generic mesaj
    const zodiacNameTr = zodiacNamesTr[zodiacSign];
    return `${zodiacNameTr} burcu için günlük yorum şu anda oluşturulamıyor. Lütfen daha sonra tekrar deneyin.`;
  }
}

/**
 * AI ayarlarını oluştur veya güncelle
 * 
 * @param featureName - Özellik adı
 * @param settings - Yeni ayarlar
 * @returns Güncellenmiş ayarlar
 */
export async function upsertAiSettings(
  featureName: string,
  settings: Partial<GeminiSettings> & { active?: boolean }
) {
  return await prisma.aiSettings.upsert({
    where: { featureName },
    create: {
      featureName,
      model: settings.model || 'gemini-2.0-flash-exp',
      temperature: settings.temperature ?? 0.7,
      maxTokens: settings.maxTokens ?? 1024,
      prompt: settings.prompt,
      active: settings.active ?? true,
    },
    update: settings,
  });
}
