import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');

    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { orderNumber: { contains: search } },
        { clientName: { contains: search } },
        { clientEmail: { contains: search } },
      ];
    }

    // Status filter
    if (status && status !== 'all') {
      where.orderStatus = status;
    }

    // Payment status filter
    if (paymentStatus && paymentStatus !== 'all') {
      where.paymentStatus = paymentStatus;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        lineItems: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders, count: orders.length });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate order number if not provided
    if (!body.orderNumber) {
      const lastOrder = await prisma.order.findFirst({
        orderBy: { id: 'desc' },
      });
      const nextId = (lastOrder?.id || 0) + 1;
      const year = new Date().getFullYear();
      body.orderNumber = `ORD-${year}-${String(nextId).padStart(3, '0')}`;
    }

    // Extract line items from body
    const { lineItems, ...orderData } = body;

    // Create order with line items
    const order = await prisma.order.create({
      data: {
        ...orderData,
        lineItems: {
          create: lineItems || [],
        },
      },
      include: {
        lineItems: true,
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}
