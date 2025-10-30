import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/orders/alerts/overdue
 * Returns orders that are overdue (past expected delivery date but not delivered)
 */
export async function GET(request: Request) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    // Find orders that are overdue
    const orders = await prisma.order.findMany({
      where: {
        AND: [
          {
            expectedDeliveryDate: {
              lt: today,
            },
          },
          {
            orderStatus: {
              in: ['Confirmed', 'Processing', 'Shipped'],
            },
          },
          {
            actualDeliveryDate: null, // Not yet delivered
          },
        ],
      },
      orderBy: {
        expectedDeliveryDate: 'asc',
      },
      include: {
        lineItems: true,
      },
    });

    // Calculate days overdue for each order
    const ordersWithOverdueDays = orders.map((order) => {
      const daysOverdue = Math.ceil(
        (today.getTime() - new Date(order.expectedDeliveryDate!).getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        ...order,
        daysOverdue,
        alertLevel: daysOverdue > 14 ? 'critical' : daysOverdue > 7 ? 'urgent' : 'warning',
      };
    });

    return NextResponse.json({
      success: true,
      count: ordersWithOverdueDays.length,
      alerts: ordersWithOverdueDays,
    });
  } catch (error) {
    console.error('Error fetching overdue order alerts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch overdue order alerts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
