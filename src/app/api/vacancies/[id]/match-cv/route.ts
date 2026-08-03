import { NextResponse } from 'next/server';
import { matchCvWithVacancy } from '@/lib/vacancy/cv-matcher';
import { parseVacancyText } from '@/lib/vacancy/parser';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vacancyText, cvSkills, cvExperienceYears } = body;

    const parsedVacancy = parseVacancyText(vacancyText || '');
    const cvDetails = {
      skills: cvSkills || ['React', 'Next.js', 'TypeScript', 'SQL', 'Git', 'MySQL'],
      education: 'Bachelor Degree',
      experienceYears: cvExperienceYears || 2
    };

    const matchReport = matchCvWithVacancy(parsedVacancy, cvDetails);

    return NextResponse.json({
      success: true,
      matchReport
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
