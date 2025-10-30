import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single payment received
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payment = await prisma.paymentReceived.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ payment });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
      { status: 500 }
    );
  }
}

// PUT update payment received
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Calculate amount in INR if not provided
    if (!body.amountInInr && body.amount && body.exchangeRate) {
      body.amountInInr = body.amount * body.exchangeRate;
    }

    // Convert date string to Date object
    if (body.paymentDate) {
      body.paymentDate = new Date(body.paymentDate);
    }

    const payment = await prisma.paymentReceived.update({
      where: { id: parseInt(params.id) },
      data: body,
    });

    return NextResponse.json({ payment });
  } catch (error: any) {
    console.error('Error updating payment:', error);
    return NextResponse.json(
      { error: 'Failed to update payment', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE payment received
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.paymentReceived.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    return NextResponse.json(
      { error: 'Failed to delete payment' },
      { status: 500 }
    );
  }
}
