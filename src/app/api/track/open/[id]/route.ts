import { NextRequest, NextResponse } from 'next/server';

// Track email opens
export async function GET(
  request: NextRequest,
  context?: { params: { id: string } }
) {
  const params = context?.params || { id: '' };
  const trackingId = params.id;

  try {
    // Log the email open event
    // In production, store this in a database
    console.log('Email opened:', trackingId, {
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    });

    // Return a 1x1 transparent pixel
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );

    return new NextResponse(pixel, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Email tracking error:', error);
    // Still return pixel even if logging fails
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );
    return new NextResponse(pixel, {
      headers: { 'Content-Type': 'image/gif' },
    });
  }
}
