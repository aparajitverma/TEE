import { NextRequest, NextResponse } from 'next/server';

// Track email link clicks
export async function GET(
  request: NextRequest,
  context?: { params: { id: string } }
) {
  const params = context?.params || { id: '' };
  const trackingId = params.id;
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  try {
    // Log the click event
    // In production, store this in a database
    console.log('Email link clicked:', trackingId, {
      targetUrl,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    });

    // Redirect to the target URL
    if (targetUrl) {
      return NextResponse.redirect(targetUrl);
    } else {
      return NextResponse.json({ error: 'No target URL provided' }, { status: 400 });
    }
  } catch (error) {
    console.error('Click tracking error:', error);
    // Redirect anyway if possible
    if (targetUrl) {
      return NextResponse.redirect(targetUrl);
    }
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
