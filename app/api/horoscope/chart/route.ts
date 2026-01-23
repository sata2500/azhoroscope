
import { NextResponse } from 'next/server';
import { calculateChart } from '@/lib/astrology/engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, lat, lon } = body;

    // Basic Validation
    if (!date || !time || lat === undefined || lon === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: date, time, lat, lon' },
        { status: 400 }
      );
    }

    // Validate Date format
    const dt = new Date(`${date}T${time}:00Z`);
    if (isNaN(dt.getTime())) {
         return NextResponse.json(
        { error: 'Invalid date or time format' },
        { status: 400 }
      );
    }

    const chart = await calculateChart(date, time, Number(lat), Number(lon));

    return NextResponse.json(chart);
  } catch (error) {
    console.error('Error calculating chart:', error);
    return NextResponse.json(
      { error: 'Failed to calculate chart' },
      { status: 500 }
    );
  }
}
