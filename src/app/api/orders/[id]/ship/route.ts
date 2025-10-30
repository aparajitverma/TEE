import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Mark order as shipped (auto-updates status to Shipped)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const orderId = parseInt(params.id);
    const { 
      trackingNumber, 
      shippingLine, 
      containerNumber,
      blNumber,
      awbNumber,
      actualDepartureDate,
      estimatedArrivalDate,
      shippedBy 
    } = body;

    // Fetch order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const oldStatus = order.orderStatus;

    // Update order with shipping details and change status to Shipped
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus: 'Shipped',
        trackingNumber: trackingNumber || order.trackingNumber,
        shippingLine: shippingLine || order.shippingLine,
        containerNumber: containerNumber || order.containerNumber,
        blNumber: blNumber || order.blNumber,
        awbNumber: awbNumber || order.awbNumber,
        actualDepartureDate: actualDepartureDate ? new Date(actualDepartureDate) : order.actualDepartureDate,
        estimatedArrivalDate: estimatedArrivalDate ? new Date(estimatedArrivalDate) : order.estimatedArrivalDate,
      },
    });

    // Log status change
    await prisma.orderActivityLog.create({
      data: {
        orderId: orderId,
        actionType: 'Status Changed',
        description: `Order status auto-updated from ${oldStatus} to Shipped`,
        fieldName: 'orderStatus',
        oldValue: oldStatus,
        newValue: 'Shipped',
        performedBy: 'System',
        timestamp: new Date(),
      },
    });

    // Log shipping activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: orderId,
        actionType: 'Order Shipped',
        description: `Order shipped${trackingNumber ? ` with tracking number: ${trackingNumber}` : ''}`,
        performedBy: shippedBy || 'Admin',
        timestamp: new Date(),
        metadata: JSON.stringify({
          trackingNumber,
          shippingLine,
          containerNumber,
          blNumber,
          awbNumber,
        }),
      },
    });

    // Log communication (shipping notification)
    await prisma.orderCommunication.create({
      data: {
        orderId: orderId,
        communicationType: 'Email',
        direction: 'Outbound',
        dateTime: new Date(),
        subject: `Your Order ${order.orderNumber} Has Been Shipped`,
        summary: 'Shipping notification sent to client',
        emailTemplate: 'Shipping Notification',
        sentTo: order.clientEmail || '',
        loggedBy: shippedBy || 'Admin',
      },
    });

    // TODO: Send actual shipping notification email to client
    // This would integrate with your email service

    return NextResponse.json({ 
      message: 'Order marked as shipped successfully',
      order: updatedOrder,
      statusChanged: oldStatus !== 'Shipped'
    });
  } catch (error: any) {
    console.error('Error marking order as shipped:', error);
    return NextResponse.json(
      { error: 'Failed to mark order as shipped', details: error.message },
      { status: 500 }
    );
  }
}
