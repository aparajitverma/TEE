import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all payments made (expenses)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const paymentMethod = searchParams.get('paymentMethod');
    const vendorId = searchParams.get('vendorId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const taxDeductible = searchParams.get('taxDeductible');

    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { expenseNumber: { contains: search, mode: 'insensitive' } },
        { payeeName: { contains: search, mode: 'insensitive' } },
        { referenceNumber: { contains: search, mode: 'insensitive' } },
        { invoiceNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Status filter
    if (status && status !== 'all') {
      where.status = status;
    }

    // Category filter
    if (category && category !== 'all') {
      where.expenseCategory = category;
    }

    // Payment method filter
    if (paymentMethod && paymentMethod !== 'all') {
      where.paymentMethod = paymentMethod;
    }

    // Vendor filter
    if (vendorId) {
      where.vendorId = parseInt(vendorId);
    }

    // Tax deductible filter
    if (taxDeductible === 'true') {
      where.taxDeductible = true;
    } else if (taxDeductible === 'false') {
      where.taxDeductible = false;
    }

    // Date range filter
    if (startDate || endDate) {
      where.expenseDate = {};
      if (startDate) {
        where.expenseDate.gte = new Date(startDate);
      }
      if (endDate) {
        where.expenseDate.lte = new Date(endDate);
      }
    }

    const expenses = await prisma.paymentMade.findMany({
      where,
      orderBy: { expenseDate: 'desc' },
    });

    // Calculate totals
    const total = expenses.reduce((sum, expense) => sum + expense.amountInInr, 0);
    const taxDeductibleTotal = expenses
      .filter(e => e.taxDeductible)
      .reduce((sum, expense) => sum + expense.amountInInr, 0);

    return NextResponse.json({ 
      expenses, 
      count: expenses.length, 
      total,
      taxDeductibleTotal 
    });
  } catch (error) {
    console.error('Error fetching payments made:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments made' },
      { status: 500 }
    );
  }
}

// POST create new payment made (expense)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate expense number if not provided
    if (!body.expenseNumber) {
      const year = new Date().getFullYear();
      const lastExpense = await prisma.paymentMade.findFirst({
        where: {
          expenseNumber: {
            startsWith: `PAY-OUT-${year}-`,
          },
        },
        orderBy: { id: 'desc' },
      });

      let nextNumber = 1;
      if (lastExpense) {
        const lastNumber = parseInt(lastExpense.expenseNumber.split('-').pop() || '0');
        nextNumber = lastNumber + 1;
      }

      body.expenseNumber = `PAY-OUT-${year}-${String(nextNumber).padStart(3, '0')}`;
    }

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

    const expense = await prisma.paymentMade.create({
      data: body,
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating payment made:', error);
    return NextResponse.json(
      { error: 'Failed to create payment made', details: error.message },
      { status: 500 }
    );
  }
}
