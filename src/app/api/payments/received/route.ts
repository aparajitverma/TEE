import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all payments received
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const paymentMethod = searchParams.get('paymentMethod');
    const clientId = searchParams.get('clientId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { paymentNumber: { contains: search, mode: 'insensitive' } },
        { clientName: { contains: search, mode: 'insensitive' } },
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { referenceNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Status filter
    if (status && status !== 'all') {
      where.status = status;
    }

    // Payment method filter
    if (paymentMethod && paymentMethod !== 'all') {
      where.paymentMethod = paymentMethod;
    }

    // Client filter
    if (clientId) {
      where.clientId = parseInt(clientId);
    }

    // Date range filter
    if (startDate || endDate) {
      where.paymentDate = {};
      if (startDate) {
        where.paymentDate.gte = new Date(startDate);
      }
      if (endDate) {
        where.paymentDate.lte = new Date(endDate);
      }
    }

    const payments = await prisma.paymentReceived.findMany({
      where,
      orderBy: { paymentDate: 'desc' },
    });

    // Calculate total
    const total = payments.reduce((sum, payment) => sum + payment.amountInInr, 0);

    return NextResponse.json({ payments, count: payments.length, total });
  } catch (error) {
    console.error('Error fetching payments received:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments received' },
      { status: 500 }
    );
  }
}

// POST create new payment received
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate payment number if not provided
    if (!body.paymentNumber) {
      const year = new Date().getFullYear();
      const lastPayment = await prisma.paymentReceived.findFirst({
        where: {
          paymentNumber: {
            startsWith: `PAY-IN-${year}-`,
          },
        },
        orderBy: { id: 'desc' },
      });

      let nextNumber = 1;
      if (lastPayment) {
        const lastNumber = parseInt(lastPayment.paymentNumber.split('-').pop() || '0');
        nextNumber = lastNumber + 1;
      }

      body.paymentNumber = `PAY-IN-${year}-${String(nextNumber).padStart(3, '0')}`;
    }

    // Calculate amount in INR if not provided
    if (!body.amountInInr && body.amount && body.exchangeRate) {
      body.amountInInr = body.amount * body.exchangeRate;
    }

    // Convert date string to Date object
    if (body.paymentDate) {
      body.paymentDate = new Date(body.paymentDate);
    }

    const payment = await prisma.paymentReceived.create({
      data: body,
    });

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating payment received:', error);
    return NextResponse.json(
      { error: 'Failed to create payment received', details: error.message },
      { status: 500 }
    );
  }
}
