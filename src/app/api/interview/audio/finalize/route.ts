import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, questionId, durationSeconds, wordCount, fillerWords } = body;

    return NextResponse.json({
      success: true,
      answerId: `ans-${Date.now()}`,
      durationSeconds: durationSeconds || 0,
      wordCount: wordCount || 0,
      fillerCount: fillerWords ? Object.values(fillerWords as Record<string, number>).reduce((a, b) => a + b, 0) : 0,
      status: 'finalized'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
