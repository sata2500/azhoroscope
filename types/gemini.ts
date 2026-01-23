/**
 * Burç İsimleri - TypeScript Type Definitions
 */

export type ZodiacSign =
  | 'aries'       // Koç
  | 'taurus'      // Boğa
  | 'gemini'      // İkizler
  | 'cancer'      // Yengeç
  | 'leo'         // Aslan
  | 'virgo'       // Başak
  | 'libra'       // Terazi
  | 'scorpio'     // Akrep
  | 'sagittarius' // Yay
  | 'capricorn'   // Oğlak
  | 'aquarius'    // Kova
  | 'pisces';     // Balık

/**
 * Burç Türkçe İsimleri
 */
export const ZODIAC_NAMES_TR: Record<ZodiacSign, string> = {
  aries: 'Koç',
  taurus: 'Boğa',
  gemini: 'İkizler',
  cancer: 'Yengeç',
  leo: 'Aslan',
  virgo: 'Başak',
  libra: 'Terazi',
  scorpio: 'Akrep',
  sagittarius: 'Yay',
  capricorn: 'Oğlak',
  aquarius: 'Kova',
  pisces: 'Balık',
};

/**
 * Tüm burçların listesi
 */
export const ALL_ZODIAC_SIGNS: ZodiacSign[] = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

/**
 * Burç yorumu isteği
 */
export interface HoroscopeRequest {
  date: string; // YYYY-MM-DD formatında
  zodiacSign: ZodiacSign;
  readingType?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}

/**
 * Burç yorumu yanıtı
 */
export interface HoroscopeResponse {
  id: string;
  date: string;
  zodiacSign: string;
  zodiacNameTr: string;
  readingType: string;
  content: string;
  aiModel: string;
  createdAt: string;
}

/**
 * Gemini API ayarları
 */
export interface GeminiSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  prompt?: string;
}
