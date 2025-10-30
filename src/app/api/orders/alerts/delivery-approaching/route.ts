import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/orders/alerts/delivery-approaching
 * Returns orders with delivery dates approaching within the specified days threshold
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const daysThreshold = parseInt(searchParams.get('days') || '7', 10); // Default 7 days

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + daysThreshold);

    // Find orders with expected delivery date approaching
    const orders = await prisma.order.findMany({
      where: {
        AND: [
          {
            expectedDeliveryDate: {
              gte: today,
              lte: futureDate,
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

    // Calculate days remaining for each order
    const ordersWithDaysRemaining = orders.map((order) => {
      const daysRemaining = Math.ceil(
        (new Date(order.expectedDeliveryDate!).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        ...order,
        daysRemaining,
        alertLevel: daysRemaining <= 2 ? 'urgent' : daysRemaining <= 5 ? 'warning' : 'info',
      };
    });

    return NextResponse.json({
      success: true,
      count: ordersWithDaysRemaining.length,
      daysThreshold,
      alerts: ordersWithDaysRemaining,
    });
  } catch (error) {
    console.error('Error fetching delivery approaching alerts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch delivery approaching alerts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
