import { NextResponse } from 'next/server';
import { parseVacancyText, cleanVacancyText } from '@/lib/vacancy/parser';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rawText } = body;

    if (!rawText) {
      return NextResponse.json({ success: false, error: 'Raw vacancy text is required' }, { status: 400 });
    }

    const cleanedText = cleanVacancyText(rawText);
    const parsed = parseVacancyText(cleanedText);

    return NextResponse.json({
      success: true,
      cleanedText,
      parsed
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
