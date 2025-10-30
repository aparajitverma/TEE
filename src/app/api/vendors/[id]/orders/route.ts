import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/vendors/[id]/orders
 * Get all orders from a specific vendor
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = parseInt(params.id);

    if (isNaN(vendorId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid vendor ID' },
        { status: 400 }
      );
    }

    // Verify vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true, vendorName: true, vendorCode: true },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Find all orders that have line items from this vendor
    const orders = await prisma.order.findMany({
      where: {
        lineItems: {
          some: {
            vendorId: vendorId,
          },
        },
      },
      include: {
        lineItems: {
          where: {
            vendorId: vendorId,
          },
        },
      },
      orderBy: {
        orderDate: 'desc',
      },
    });

    // Calculate totals for each order (only for items from this vendor)
    const ordersWithTotals = orders.map((order) => {
      const vendorItems = order.lineItems;
      const vendorTotal = vendorItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const vendorCost = vendorItems.reduce((sum, item) => sum + (item.vendorCost || 0), 0);
      const totalQuantity = vendorItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        id: order.id,
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        clientName: order.clientName,
        expectedDeliveryDate: order.expectedDeliveryDate,
        actualDeliveryDate: order.actualDeliveryDate,
        currency: order.currency,
        vendorTotal, // Total amount for items from this vendor
        vendorCost, // Cost from this vendor
        totalQuantity,
        itemCount: vendorItems.length,
        products: vendorItems.map((item) => ({
          productName: item.productName,
          productCode: item.productCode,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          vendorCost: item.vendorCost,
        })),
      };
    });

    // Calculate summary statistics
    const summary = {
      totalOrders: ordersWithTotals.length,
      totalValue: ordersWithTotals.reduce((sum, order) => sum + order.vendorTotal, 0),
      totalCost: ordersWithTotals.reduce((sum, order) => sum + order.vendorCost, 0),
      averageOrderValue:
        ordersWithTotals.length > 0
          ? ordersWithTotals.reduce((sum, order) => sum + order.vendorTotal, 0) /
            ordersWithTotals.length
          : 0,
      ordersByStatus: {
        inquiry: ordersWithTotals.filter((o) => o.orderStatus === 'Inquiry').length,
        quoted: ordersWithTotals.filter((o) => o.orderStatus === 'Quoted').length,
        confirmed: ordersWithTotals.filter((o) => o.orderStatus === 'Confirmed').length,
        processing: ordersWithTotals.filter((o) => o.orderStatus === 'Processing').length,
        shipped: ordersWithTotals.filter((o) => o.orderStatus === 'Shipped').length,
        delivered: ordersWithTotals.filter((o) => o.orderStatus === 'Delivered').length,
        cancelled: ordersWithTotals.filter((o) => o.orderStatus === 'Cancelled').length,
      },
      paymentStatus: {
        paid: ordersWithTotals.filter((o) => o.paymentStatus === 'Paid').length,
        partial: ordersWithTotals.filter((o) => o.paymentStatus === 'Partial').length,
        pending: ordersWithTotals.filter((o) => o.paymentStatus === 'Pending').length,
        overdue: ordersWithTotals.filter((o) => o.paymentStatus === 'Overdue').length,
      },
    };

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        name: vendor.vendorName,
        code: vendor.vendorCode,
      },
      summary,
      orders: ordersWithTotals,
    });
  } catch (error) {
    console.error('Error fetching vendor orders:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vendor orders',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
