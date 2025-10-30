import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Send quote to client (auto-updates status to Quoted)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const orderId = parseInt(params.id);
    const { recipientEmail, emailTemplate, sentBy } = body;

    // Fetch order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { lineItems: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const oldStatus = order.orderStatus;

    // Auto-update status to Quoted if currently Inquiry
    let newStatus = order.orderStatus;
    if (order.orderStatus === 'Inquiry') {
      newStatus = 'Quoted';
      
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          orderStatus: newStatus,
          quoteDate: new Date(),
        },
      });
    }

    // Log communication
    await prisma.orderCommunication.create({
      data: {
        orderId: orderId,
        communicationType: 'Email',
        direction: 'Outbound',
        dateTime: new Date(),
        subject: `Quote for Order ${order.orderNumber}`,
        summary: 'Quote sent to client',
        emailTemplate: emailTemplate || 'Quote',
        sentTo: recipientEmail || order.clientEmail || '',
        loggedBy: sentBy || 'Admin',
      },
    });

    // Log status change if it occurred
    if (newStatus !== oldStatus) {
      await prisma.orderActivityLog.create({
        data: {
          orderId: orderId,
          actionType: 'Status Changed',
          description: `Order status auto-updated from ${oldStatus} to ${newStatus} when quote was sent`,
          fieldName: 'orderStatus',
          oldValue: oldStatus,
          newValue: newStatus,
          performedBy: 'System',
          timestamp: new Date(),
        },
      });
    }

    // Log quote sent activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: orderId,
        actionType: 'Quote Sent',
        description: `Quote sent to ${recipientEmail || order.clientEmail}`,
        performedBy: sentBy || 'Admin',
        timestamp: new Date(),
      },
    });

    // TODO: Implement actual email sending logic here
    // This would integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we're just logging the action

    return NextResponse.json({ 
      message: 'Quote sent successfully',
      orderStatus: newStatus,
      statusChanged: newStatus !== oldStatus
    });
  } catch (error: any) {
    console.error('Error sending quote:', error);
    return NextResponse.json(
      { error: 'Failed to send quote', details: error.message },
      { status: 500 }
    );
  }
}
