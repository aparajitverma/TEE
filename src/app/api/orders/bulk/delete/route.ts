import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * DELETE /api/orders/bulk/delete
 * Delete multiple orders at once (with confirmation)
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { orderIds, confirmation, deletedBy } = body;

    // Validation
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order IDs array is required' },
        { status: 400 }
      );
    }

    // Require explicit confirmation
    if (confirmation !== 'DELETE_CONFIRMED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Deletion requires explicit confirmation',
          message: 'Please set confirmation to "DELETE_CONFIRMED" to proceed',
        },
        { status: 400 }
      );
    }

    // Get order details before deletion for logging
    const ordersToDelete = await prisma.order.findMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      select: {
        id: true,
        orderNumber: true,
        clientName: true,
        orderStatus: true,
        totalAmount: true,
        currency: true,
      },
    });

    if (ordersToDelete.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No orders found with the provided IDs' },
        { status: 404 }
      );
    }

    // Check for orders that shouldn't be deleted (e.g., delivered orders)
    const protectedStatuses = ['Delivered', 'Shipped'];
    const protectedOrders = ordersToDelete.filter((order) =>
      protectedStatuses.includes(order.orderStatus)
    );

    if (protectedOrders.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Some orders cannot be deleted',
          message: `Orders with status "Delivered" or "Shipped" cannot be deleted for audit purposes`,
          protectedOrders: protectedOrders.map((o) => ({
            orderNumber: o.orderNumber,
            status: o.orderStatus,
          })),
        },
        { status: 400 }
      );
    }

    // Delete orders (cascade will handle related records)
    const deleteResult = await prisma.order.deleteMany({
      where: {
        id: {
          in: orderIds,
        },
      },
    });

    // Log the deletion (you might want to keep a separate audit log table)
    console.log('Bulk deletion performed:', {
      deletedBy: deletedBy || 'Unknown',
      timestamp: new Date().toISOString(),
      deletedOrders: ordersToDelete.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        clientName: o.clientName,
        status: o.orderStatus,
        amount: `${o.currency} ${o.totalAmount}`,
      })),
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deleteResult.count} order(s)`,
      deletedCount: deleteResult.count,
      deletedOrders: ordersToDelete.map((o) => ({
        orderNumber: o.orderNumber,
        clientName: o.clientName,
        status: o.orderStatus,
      })),
    });
  } catch (error) {
    console.error('Error in bulk delete:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete orders',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders/bulk/delete
 * Alternative endpoint using POST for better compatibility
 */
export async function POST(request: Request) {
  return DELETE(request);
}
