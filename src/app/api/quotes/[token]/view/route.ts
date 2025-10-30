import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Track quote view via unique token
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const { searchParams } = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'Unknown';

    // Find order by quote token (you would need to add this field to Order model)
    // For now, we'll decode the token to get order ID
    // In production, use proper token generation and storage
    
    const orderId = parseInt(Buffer.from(token, 'base64').toString('utf-8').split('-')[1] || '0');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Invalid quote token' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }

    // Log the view
    await prisma.orderActivityLog.create({
      data: {
        orderId: orderId,
        actionType: 'Quote Viewed',
        description: `Quote viewed via link`,
        performedBy: 'Client',
        timestamp: new Date(),
        metadata: JSON.stringify({
          userAgent,
          ipAddress: ipAddress.split(',')[0].trim(),
          token,
        }),
      },
    });

    // Redirect to the quote preview
    return NextResponse.redirect(
      new URL(`/api/orders/${orderId}/generate-quote?validityDays=30`, request.url)
    );

  } catch (error: any) {
    console.error('Error tracking quote view:', error);
    return NextResponse.json(
      { error: 'Failed to track quote view', details: error.message },
      { status: 500 }
    );
  }
}

// Utility function to generate quote tracking token
export function generateQuoteToken(orderId: number): string {
  const timestamp = Date.now();
  const data = `quote-${orderId}-${timestamp}`;
  return Buffer.from(data).toString('base64');
}
