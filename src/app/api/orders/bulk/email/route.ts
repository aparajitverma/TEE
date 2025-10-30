import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/orders/bulk/email
 * Send bulk emails to multiple order clients
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderIds, emailTemplate, subject, customMessage, sentBy } = body;

    // Validation
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order IDs array is required' },
        { status: 400 }
      );
    }

    if (!emailTemplate && !subject) {
      return NextResponse.json(
        { success: false, error: 'Either emailTemplate or subject is required' },
        { status: 400 }
      );
    }

    // Fetch orders with client information
    const orders = await prisma.order.findMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      select: {
        id: true,
        orderNumber: true,
        clientName: true,
        clientEmail: true,
        orderStatus: true,
        totalAmount: true,
        currency: true,
      },
    });

    if (orders.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No orders found with the provided IDs' },
        { status: 404 }
      );
    }

    // Filter orders with valid email addresses
    const ordersWithEmail = orders.filter((order) => order.clientEmail && order.clientEmail.trim() !== '');

    if (ordersWithEmail.length === 0) {
      return NextResponse.json(
        { success: false, error: 'None of the selected orders have valid client email addresses' },
        { status: 400 }
      );
    }

    // Email templates
    const templates: { [key: string]: { subject: string; getBody: (order: any) => string } } = {
      'order-confirmation': {
        subject: 'Order Confirmation - {orderNumber}',
        getBody: (order) => `
Dear ${order.clientName},

Thank you for your order! This email confirms that we have received your order ${order.orderNumber}.

Order Details:
- Order Number: ${order.orderNumber}
- Total Amount: ${order.currency} ${order.totalAmount}
- Status: ${order.orderStatus}

We will keep you updated on the progress of your order.

${customMessage || ''}

Best regards,
The Export Express Team
        `.trim(),
      },
      'shipping-notification': {
        subject: 'Your Order Has Been Shipped - {orderNumber}',
        getBody: (order) => `
Dear ${order.clientName},

Great news! Your order ${order.orderNumber} has been shipped.

Order Details:
- Order Number: ${order.orderNumber}
- Total Amount: ${order.currency} ${order.totalAmount}

${customMessage || ''}

Best regards,
The Export Express Team
        `.trim(),
      },
      'payment-reminder': {
        subject: 'Payment Reminder - {orderNumber}',
        getBody: (order) => `
Dear ${order.clientName},

This is a friendly reminder regarding the payment for order ${order.orderNumber}.

Order Details:
- Order Number: ${order.orderNumber}
- Total Amount: ${order.currency} ${order.totalAmount}
- Status: ${order.orderStatus}

${customMessage || 'Please process the payment at your earliest convenience.'}

Best regards,
The Export Express Team
        `.trim(),
      },
      'follow-up': {
        subject: 'Follow-up on Your Order - {orderNumber}',
        getBody: (order) => `
Dear ${order.clientName},

We wanted to follow up regarding your order ${order.orderNumber}.

${customMessage || 'Please let us know if you have any questions or concerns.'}

Best regards,
The Export Express Team
        `.trim(),
      },
    };

    // Prepare email data
    const emailsToSend = ordersWithEmail.map((order) => {
      let emailSubject = subject;
      let emailBody = customMessage || '';

      if (emailTemplate && templates[emailTemplate]) {
        const template = templates[emailTemplate];
        emailSubject = template.subject.replace('{orderNumber}', order.orderNumber);
        emailBody = template.getBody(order);
      }

      return {
        orderId: order.id,
        orderNumber: order.orderNumber,
        to: order.clientEmail,
        subject: emailSubject,
        body: emailBody,
      };
    });

    // In a real implementation, you would integrate with an email service (SendGrid, AWS SES, etc.)
    // For now, we'll log the communications and return success

    // Create communication logs for each email
    const communicationLogs = emailsToSend.map((email) => ({
      orderId: email.orderId,
      communicationType: 'Email',
      direction: 'Outbound',
      dateTime: new Date(),
      subject: email.subject,
      summary: `Bulk email sent: ${emailTemplate || 'Custom'}`,
      fullContent: email.body,
      emailTemplate: emailTemplate || 'Custom',
      sentTo: email.to,
      loggedBy: sentBy || 'System',
    }));

    await prisma.orderCommunication.createMany({
      data: communicationLogs,
    });

    // TODO: Integrate with actual email service
    // Example:
    // await sendBulkEmails(emailsToSend);

    return NextResponse.json({
      success: true,
      message: `Bulk email prepared for ${emailsToSend.length} order(s)`,
      emailsSent: emailsToSend.length,
      skippedOrders: orders.length - ordersWithEmail.length,
      emails: emailsToSend.map((e) => ({
        orderNumber: e.orderNumber,
        to: e.to,
        subject: e.subject,
      })),
      note: 'Email service integration pending. Communications have been logged.',
    });
  } catch (error) {
    console.error('Error in bulk email:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send bulk emails',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
