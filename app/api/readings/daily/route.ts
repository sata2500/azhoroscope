import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateDailyHoroscope } from '@/lib/gemini';
import type { ZodiacSign } from '@/types/gemini';
import { ALL_ZODIAC_SIGNS, ZODIAC_NAMES_TR } from '@/types/gemini';

/**
 * GET /api/readings/daily
 * 
 * Günlük burç yorumlarını getir
 * 
 * Query params:
 * - date: YYYY-MM-DD formatında tarih (opsiyonel, default: bugün)
 * - sign: Burç adı (opsiyonel, yoksa tüm burçlar)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    const signParam = searchParams.get('sign');

    // Tarih kontrolü
    const date = dateParam || new Date().toISOString().split('T')[0];
    
    // Burç kontrolü
    if (signParam && !ALL_ZODIAC_SIGNS.includes(signParam as ZodiacSign)) {
      return NextResponse.json(
        { error: 'Geçersiz burç adı' },
        { status: 400 }
      );
    }

    // Veritabanından yorumları çek
    const whereClause = {
      date: new Date(date),
      readingType: 'DAILY' as const,
      ...(signParam && { zodiacSign: signParam }),
    };

    const readings = await prisma.dailyReading.findMany({
      where: whereClause,
      orderBy: { zodiacSign: 'asc' },
    });

    // Response formatla
    const formattedReadings = readings.map((reading) => ({
      id: reading.id,
      date: reading.date.toISOString().split('T')[0],
      zodiacSign: reading.zodiacSign,
      zodiacNameTr: ZODIAC_NAMES_TR[reading.zodiacSign as ZodiacSign],
      readingType: reading.readingType,
      content: reading.content,
      aiModel: reading.aiModel || 'unknown',
      createdAt: reading.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      date,
      count: formattedReadings.length,
      readings: formattedReadings,
    });
  } catch (error) {
    console.error('GET /api/readings/daily hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Yorumlar getirilemedi' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/readings/daily
 * 
 * Günlük burç yorumları üret
 * 
 * Body:
 * - date: YYYY-MM-DD formatında tarih (opsiyonel, default: bugün)
 * - signs: Burç adları array (opsiyonel, default: tüm burçlar)
 * - force: Var olan yorumları yeniden üret (opsiyonel, default: false)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date: dateParam, signs, force = false } = body;

    // Tarih kontrolü
    const date = dateParam || new Date().toISOString().split('T')[0];
    const dateObj = new Date(date);

    // Burçları belirle
    const targetSigns: ZodiacSign[] = signs && Array.isArray(signs)
      ? signs.filter((s: string) => ALL_ZODIAC_SIGNS.includes(s as ZodiacSign))
      : ALL_ZODIAC_SIGNS;

    if (targetSigns.length === 0) {
      return NextResponse.json(
        { error: 'Geçerli burç bulunamadı' },
        { status: 400 }
      );
    }

    const results = [];
    const errors = [];

    for (const sign of targetSigns) {
      try {
        // Mevcut yorum var mı kontrol et
        if (!force) {
          const existing = await prisma.dailyReading.findFirst({
            where: {
              date: dateObj,
              zodiacSign: sign,
              readingType: 'DAILY',
            },
          });

          if (existing) {
            results.push({
              zodiacSign: sign,
              status: 'cached',
              reading: {
                id: existing.id,
                content: existing.content,
              },
            });
            continue;
          }
        }

        // Gemini ile yorum üret
        const content = await generateDailyHoroscope(sign, date);

        // Veritabanına kaydet
        const reading = await prisma.dailyReading.create({
          data: {
            date: dateObj,
            zodiacSign: sign,
            readingType: 'DAILY',
            content,
            aiModel: 'gemini-2.0-flash-exp', // TODO: AI settings'den al
          },
        });

        results.push({
          zodiacSign: sign,
          status: 'generated',
          reading: {
            id: reading.id,
            content: reading.content,
          },
        });
      } catch (error) {
        console.error(`${sign} için yorum üretme hatası:`, error);
        errors.push({
          zodiacSign: sign,
          error: error instanceof Error ? error.message : 'Bilinmeyen hata',
        });
      }
    }

    return NextResponse.json({
      success: true,
      date,
      generated: results.filter((r) => r.status === 'generated').length,
      cached: results.filter((r) => r.status === 'cached').length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('POST /api/readings/daily hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Yorumlar üretilemedi' },
      { status: 500 }
    );
  }
}
