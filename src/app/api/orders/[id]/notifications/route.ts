import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { emailService } from '@/lib/email-service';

const prisma = new PrismaClient();

/**
 * POST /api/orders/[id]/notifications
 * Send email notification for an order
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { notificationType, customData } = body;

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    if (!notificationType) {
      return NextResponse.json(
        { success: false, error: 'Notification type is required' },
        { status: 400 }
      );
    }

    // Fetch order with line items
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        lineItems: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    if (!order.clientEmail) {
      return NextResponse.json(
        { success: false, error: 'Order has no client email address' },
        { status: 400 }
      );
    }

    // Prepare email data
    const emailData = {
      orderNumber: order.orderNumber,
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      totalAmount: order.totalAmount,
      currency: order.currency,
      orderDate: order.orderDate.toISOString(),
      expectedDeliveryDate: order.expectedDeliveryDate?.toISOString(),
      trackingNumber: order.trackingNumber || undefined,
      products: order.lineItems.map((item) => ({
        name: item.productName,
        quantity: item.quantity,
        price: item.totalPrice,
      })),
    };

    let emailSent = false;
    let emailType = '';

    // Send appropriate notification based on type
    switch (notificationType) {
      case 'new-inquiry':
        emailSent = await emailService.sendNewInquiryNotification(emailData);
        emailType = 'New Inquiry';
        break;

      case 'quote-sent':
        emailSent = await emailService.sendQuoteSentNotification(emailData);
        emailType = 'Quote Sent';
        break;

      case 'order-confirmed':
        emailSent = await emailService.sendOrderConfirmationNotification(emailData);
        emailType = 'Order Confirmation';
        break;

      case 'payment-received':
        emailSent = await emailService.sendPaymentReceivedNotification({
          ...emailData,
          amountReceived: customData?.amountReceived || order.advanceAmount || 0,
        });
        emailType = 'Payment Received';
        break;

      case 'order-shipped':
        emailSent = await emailService.sendOrderShippedNotification(emailData);
        emailType = 'Order Shipped';
        break;

      case 'order-delivered':
        emailSent = await emailService.sendOrderDeliveredNotification(emailData);
        emailType = 'Order Delivered';
        break;

      case 'follow-up':
        emailSent = await emailService.sendFollowUpReminder(emailData);
        emailType = 'Follow-up Reminder';
        break;

      case 'payment-reminder':
        emailSent = await emailService.sendPaymentReminder({
          ...emailData,
          balanceAmount: order.balanceAmount || 0,
        });
        emailType = 'Payment Reminder';
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid notification type' },
          { status: 400 }
        );
    }

    // Log the communication
    if (emailSent) {
      await prisma.orderCommunication.create({
        data: {
          orderId: order.id,
          communicationType: 'Email',
          direction: 'Outbound',
          subject: `${emailType} - ${order.orderNumber}`,
          summary: `${emailType} email sent to client`,
          emailTemplate: notificationType,
          sentTo: order.clientEmail,
          loggedBy: 'System',
        },
      });
    }

    return NextResponse.json({
      success: emailSent,
      message: emailSent
        ? `${emailType} notification sent successfully`
        : `Failed to send ${emailType} notification`,
      notificationType,
      sentTo: order.clientEmail,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send notification',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
