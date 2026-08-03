import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, positionId, hasPermission } = body;

    return NextResponse.json({
      success: true,
      sessionId: sessionId || `session-${Date.now()}`,
      status: 'active',
      micAllowed: !!hasPermission,
      createdAt: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
