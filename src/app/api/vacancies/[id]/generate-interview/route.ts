import { NextResponse } from 'next/server';
import { parseVacancyText } from '@/lib/vacancy/parser';
import { generateVacancyQuestions } from '@/lib/vacancy/question-generator';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vacancyText } = body;

    const parsedVacancy = parseVacancyText(vacancyText || '');
    const generatedQuestions = generateVacancyQuestions(parsedVacancy);

    return NextResponse.json({
      success: true,
      generatedQuestions
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
