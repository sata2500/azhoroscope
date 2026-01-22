import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS sınıflarını birleştirmek için yardımcı fonksiyon
 * clsx ve tailwind-merge kullanarak çakışan sınıfları düzgün birleştirir
 *
 * @param inputs - Birleştirilecek CSS sınıfları
 * @returns Birleştirilmiş CSS sınıf string'i
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // => koşula göre
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Tarih formatlama yardımcı fonksiyonu
 * Türkçe tarih formatı kullanır
 *
 * @param date - Formatlanacak tarih
 * @param options - Intl.DateTimeFormat seçenekleri
 * @returns Formatlanmış tarih string'i
 */
export function formatTarih(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
): string {
  const tarih = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', options).format(tarih);
}

/**
 * Bekleme fonksiyonu
 * Async/await ile kullanılabilir
 *
 * @param ms - Bekleme süresi (milisaniye)
 */
export function bekle(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Güvenli JSON parse
 * Hata durumunda varsayılan değer döndürür
 *
 * @param json - Parse edilecek JSON string
 * @param fallback - Hata durumunda döndürülecek değer
 */
export function guvenliJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
