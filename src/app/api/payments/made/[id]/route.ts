import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single payment made
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const expense = await prisma.paymentMade.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!expense) {
      return NextResponse.json(
        { error: 'Expense not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ expense });
  } catch (error) {
    console.error('Error fetching expense:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expense' },
      { status: 500 }
    );
  }
}

// PUT update payment made
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Calculate amount in INR if not provided
    if (!body.amountInInr && body.amount) {
      if (body.currency === 'INR') {
        body.amountInInr = body.amount;
      } else if (body.exchangeRate) {
        body.amountInInr = body.amount * body.exchangeRate;
      }
    }

    // Convert date string to Date object
    if (body.expenseDate) {
      body.expenseDate = new Date(body.expenseDate);
    }

    const expense = await prisma.paymentMade.update({
      where: { id: parseInt(params.id) },
      data: body,
    });

    return NextResponse.json({ expense });
  } catch (error: any) {
    console.error('Error updating expense:', error);
    return NextResponse.json(
      { error: 'Failed to update expense', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE payment made
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.paymentMade.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json(
      { error: 'Failed to delete expense' },
      { status: 500 }
    );
  }
}
