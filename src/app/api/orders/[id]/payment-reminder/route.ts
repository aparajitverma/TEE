import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Send payment reminder
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const orderId = parseInt(params.id);
    const { reminderType = 'gentle', customMessage } = body;

    // Fetch order with payment history
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { paymentHistory: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Calculate outstanding amount
    const totalPaid = order.paymentHistory.reduce((sum, p) => sum + p.amount, 0);
    const outstanding = order.totalAmount - totalPaid;

    if (outstanding <= 0) {
      return NextResponse.json(
        { error: 'No outstanding payment. Order is fully paid.' },
        { status: 400 }
      );
    }

    // Determine reminder message based on type
    let subject = '';
    let message = '';

    switch (reminderType) {
      case 'gentle':
        subject = `Payment Reminder - Order ${order.orderNumber}`;
        message = `Dear ${order.clientName},\n\nThis is a gentle reminder regarding the outstanding payment for order ${order.orderNumber}.\n\nOrder Total: ${order.currency} ${order.totalAmount.toFixed(2)}\nAmount Paid: ${order.currency} ${totalPaid.toFixed(2)}\nOutstanding: ${order.currency} ${outstanding.toFixed(2)}\n\nPayment Terms: ${order.paymentTerms || 'As per agreement'}\n\nPlease process the payment at your earliest convenience. If you have already made the payment, please disregard this reminder.\n\nThank you for your business!`;
        break;
      
      case 'urgent':
        subject = `URGENT: Payment Reminder - Order ${order.orderNumber}`;
        message = `Dear ${order.clientName},\n\nThis is an urgent reminder regarding the overdue payment for order ${order.orderNumber}.\n\nOrder Total: ${order.currency} ${order.totalAmount.toFixed(2)}\nAmount Paid: ${order.currency} ${totalPaid.toFixed(2)}\nOutstanding: ${order.currency} ${outstanding.toFixed(2)}\n\nPayment Terms: ${order.paymentTerms || 'As per agreement'}\n\nImmediate payment is required to avoid any delays in processing or shipment. Please contact us if you have any questions or concerns.\n\nThank you for your prompt attention to this matter.`;
        break;
      
      case 'final':
        subject = `FINAL NOTICE: Payment Required - Order ${order.orderNumber}`;
        message = `Dear ${order.clientName},\n\nThis is a FINAL NOTICE regarding the outstanding payment for order ${order.orderNumber}.\n\nOrder Total: ${order.currency} ${order.totalAmount.toFixed(2)}\nAmount Paid: ${order.currency} ${totalPaid.toFixed(2)}\nOutstanding: ${order.currency} ${outstanding.toFixed(2)}\n\nPayment Terms: ${order.paymentTerms || 'As per agreement'}\n\nPayment must be received within 48 hours to avoid order cancellation and potential legal action. Please treat this as a matter of urgency.\n\nIf payment has been made, please provide proof of payment immediately.`;
        break;
      
      case 'custom':
        subject = `Payment Reminder - Order ${order.orderNumber}`;
        message = customMessage || `Payment reminder for order ${order.orderNumber}. Outstanding amount: ${order.currency} ${outstanding.toFixed(2)}`;
        break;
      
      default:
        subject = `Payment Reminder - Order ${order.orderNumber}`;
        message = `Payment reminder for order ${order.orderNumber}`;
    }

    // Log communication
    await prisma.orderCommunication.create({
      data: {
        orderId: orderId,
        communicationType: 'Email',
        direction: 'Outbound',
        dateTime: new Date(),
        subject: subject,
        summary: `Payment reminder sent (${reminderType})`,
        fullContent: message,
        emailTemplate: 'Payment Reminder',
        sentTo: order.clientEmail || '',
        loggedBy: body.sentBy || 'Admin',
      },
    });

    // Log activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: orderId,
        actionType: 'Payment Reminder Sent',
        description: `${reminderType.charAt(0).toUpperCase() + reminderType.slice(1)} payment reminder sent to client`,
        performedBy: body.sentBy || 'Admin',
        timestamp: new Date(),
        metadata: JSON.stringify({
          reminderType,
          outstanding,
          totalPaid,
        }),
      },
    });

    // TODO: Implement actual email sending
    // This would integrate with your email service (SendGrid, AWS SES, etc.)

    return NextResponse.json({
      message: 'Payment reminder sent successfully',
      reminderType,
      outstanding,
      subject,
      preview: message.substring(0, 200) + '...',
    });

  } catch (error: any) {
    console.error('Error sending payment reminder:', error);
    return NextResponse.json(
      { error: 'Failed to send payment reminder', details: error.message },
      { status: 500 }
    );
  }
}
