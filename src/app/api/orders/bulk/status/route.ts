import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/orders/bulk/status
 * Update status for multiple orders at once
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderIds, newStatus, updatedBy } = body;

    // Validation
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order IDs array is required' },
        { status: 400 }
      );
    }

    if (!newStatus) {
      return NextResponse.json(
        { success: false, error: 'New status is required' },
        { status: 400 }
      );
    }

    const validStatuses = ['Inquiry', 'Quoted', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Get current orders to log changes
    const currentOrders = await prisma.order.findMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      select: {
        id: true,
        orderNumber: true,
        orderStatus: true,
      },
    });

    if (currentOrders.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No orders found with the provided IDs' },
        { status: 404 }
      );
    }

    // Update orders
    const updateResult = await prisma.order.updateMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      data: {
        orderStatus: newStatus,
        updatedBy: updatedBy || 'System',
        updatedAt: new Date(),
      },
    });

    // Create activity logs for each order
    const activityLogs = currentOrders.map((order) => ({
      orderId: order.id,
      actionType: 'Status Changed',
      description: `Order status bulk updated from ${order.orderStatus} to ${newStatus}`,
      fieldName: 'orderStatus',
      oldValue: order.orderStatus,
      newValue: newStatus,
      performedBy: updatedBy || 'System',
      timestamp: new Date(),
    }));

    await prisma.orderActivityLog.createMany({
      data: activityLogs,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${updateResult.count} order(s)`,
      updatedCount: updateResult.count,
      newStatus,
      orderNumbers: currentOrders.map((o) => o.orderNumber),
    });
  } catch (error) {
    console.error('Error in bulk status update:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update order statuses',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
