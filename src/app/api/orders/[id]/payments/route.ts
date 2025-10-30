import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Add payment to order
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { amount, paymentMethod, referenceNumber, receivedBy, notes } = body;

    // Create payment record
    const payment = await prisma.paymentHistory.create({
      data: {
        orderId: parseInt(params.id),
        paymentDate: new Date(),
        amount: parseFloat(amount),
        paymentMethod,
        referenceNumber: referenceNumber || null,
        receivedBy: receivedBy || null,
        notes: notes || null,
      },
    });

    // Get all payments for this order to calculate total paid
    const allPayments = await prisma.paymentHistory.findMany({
      where: { orderId: parseInt(params.id) },
    });

    const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

    // Get order to check total amount
    const order = await prisma.order.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update payment status
    let paymentStatus = 'Pending';
    if (totalPaid >= order.totalAmount) {
      paymentStatus = 'Paid';
    } else if (totalPaid > 0) {
      paymentStatus = 'Partial';
    }

    // Auto-update order status based on payment
    let orderStatus = order.orderStatus;
    const oldStatus = order.orderStatus;
    
    // If payment received and order is still in Quoted status, move to Confirmed
    if (totalPaid > 0 && order.orderStatus === 'Quoted') {
      orderStatus = 'Confirmed';
    }

    await prisma.order.update({
      where: { id: parseInt(params.id) },
      data: { 
        paymentStatus,
        orderStatus,
      },
    });

    // Log payment activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: parseInt(params.id),
        actionType: 'Payment Received',
        description: `Payment of ${amount} received via ${paymentMethod}`,
        fieldName: 'paymentStatus',
        oldValue: order.paymentStatus,
        newValue: paymentStatus,
        performedBy: receivedBy || 'Admin',
        timestamp: new Date(),
      },
    });

    // Log status change if it occurred
    if (orderStatus !== oldStatus) {
      await prisma.orderActivityLog.create({
        data: {
          orderId: parseInt(params.id),
          actionType: 'Status Changed',
          description: `Order status auto-updated from ${oldStatus} to ${orderStatus} due to payment received`,
          fieldName: 'orderStatus',
          oldValue: oldStatus,
          newValue: orderStatus,
          performedBy: 'System',
          timestamp: new Date(),
        },
      });
    }

    return NextResponse.json({ payment, totalPaid, paymentStatus, orderStatus });
  } catch (error: any) {
    console.error('Error adding payment:', error);
    return NextResponse.json(
      { error: 'Failed to add payment', details: error.message },
      { status: 500 }
    );
  }
}
