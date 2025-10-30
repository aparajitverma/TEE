import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single order by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        lineItems: true,
        paymentHistory: {
          orderBy: {
            paymentDate: 'desc',
          },
        },
        communications: {
          orderBy: {
            dateTime: 'desc',
          },
        },
        activityLogs: {
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PUT update order
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { lineItems, ...orderData } = body;
    const orderId = parseInt(params.id);

    // Fetch current order to compare changes
    const currentOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!currentOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Status progression validation (prevent backward status changes)
    const statusOrder = ['Inquiry', 'Quoted', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const allowBackwardChange = body.allowBackwardStatusChange === true;
    
    if (orderData.orderStatus && orderData.orderStatus !== currentOrder.orderStatus) {
      const currentIndex = statusOrder.indexOf(currentOrder.orderStatus);
      const newIndex = statusOrder.indexOf(orderData.orderStatus);
      
      // Allow Cancelled from any status
      if (orderData.orderStatus !== 'Cancelled' && newIndex < currentIndex && !allowBackwardChange) {
        return NextResponse.json(
          { 
            error: 'Cannot move order to a previous status',
            message: 'Status can only progress forward. Use override if necessary.',
            currentStatus: currentOrder.orderStatus,
            attemptedStatus: orderData.orderStatus
          },
          { status: 400 }
        );
      }
    }

    // Update order and line items
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...orderData,
        updatedAt: new Date(),
        lineItems: lineItems ? {
          deleteMany: {},
          create: lineItems,
        } : undefined,
      },
      include: {
        lineItems: true,
      },
    });

    // Log status change if status was updated
    if (orderData.orderStatus && orderData.orderStatus !== currentOrder.orderStatus) {
      await prisma.orderActivityLog.create({
        data: {
          orderId: orderId,
          actionType: 'Status Changed',
          description: `Order status changed from ${currentOrder.orderStatus} to ${orderData.orderStatus}`,
          fieldName: 'orderStatus',
          oldValue: currentOrder.orderStatus,
          newValue: orderData.orderStatus,
          performedBy: body.updatedBy || 'Admin',
          timestamp: new Date(),
        },
      });

      // TODO: Send notification email/SMS based on status change
      // This would be implemented with your notification service
    }

    // Log other significant changes
    const significantFields = ['priority', 'paymentStatus', 'totalAmount'];
    for (const field of significantFields) {
      if (orderData[field] && orderData[field] !== (currentOrder as any)[field]) {
        await prisma.orderActivityLog.create({
          data: {
            orderId: orderId,
            actionType: 'Field Updated',
            description: `${field} updated`,
            fieldName: field,
            oldValue: String((currentOrder as any)[field]),
            newValue: String(orderData[field]),
            performedBy: body.updatedBy || 'Admin',
            timestamp: new Date(),
          },
        });
      }
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE order
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.order.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}
