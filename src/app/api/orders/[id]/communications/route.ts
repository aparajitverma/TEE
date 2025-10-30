import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Add communication log to order
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      communicationType,
      direction,
      subject,
      summary,
      fullContent,
      attachments,
      emailTemplate,
      sentTo,
      loggedBy,
    } = body;

    const communication = await prisma.orderCommunication.create({
      data: {
        orderId: parseInt(params.id),
        communicationType,
        direction,
        dateTime: new Date(),
        subject: subject || null,
        summary: summary || null,
        fullContent: fullContent || null,
        attachments: attachments || null,
        emailTemplate: emailTemplate || null,
        sentTo: sentTo || null,
        loggedBy: loggedBy || null,
      },
    });

    return NextResponse.json({ communication });
  } catch (error: any) {
    console.error('Error adding communication:', error);
    return NextResponse.json(
      { error: 'Failed to add communication', details: error.message },
      { status: 500 }
    );
  }
}
