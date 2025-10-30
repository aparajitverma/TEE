import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple encryption helper (in production, use proper encryption library)
function simpleEncrypt(text: string): string {
  // This is a placeholder - in production use crypto library with proper key management
  return Buffer.from(text).toString('base64');
}

function simpleDecrypt(encrypted: string): string {
  // This is a placeholder - in production use crypto library with proper key management
  return Buffer.from(encrypted, 'base64').toString('utf-8');
}

// GET all unofficial expenses (requires authentication)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    // Simple password check (in production, use proper authentication)
    if (password !== process.env.UNOFFICIAL_EXPENSES_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const category = searchParams.get('category');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const relatedOrderId = searchParams.get('relatedOrderId');

    const where: any = {};

    // Category filter
    if (category && category !== 'all') {
      where.category = category;
    }

    // Related order filter
    if (relatedOrderId) {
      where.relatedOrderId = parseInt(relatedOrderId);
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

    const expenses = await prisma.unofficialExpense.findMany({
      where,
      orderBy: { expenseDate: 'desc' },
    });

    // Decrypt sensitive fields
    const decryptedExpenses = expenses.map(expense => ({
      ...expense,
      purpose: simpleDecrypt(expense.purpose),
      recipientCode: simpleDecrypt(expense.recipientCode),
      location: expense.location ? simpleDecrypt(expense.location) : null,
      notes: expense.notes ? simpleDecrypt(expense.notes) : null,
    }));

    // Update last accessed
    await Promise.all(
      expenses.map(expense =>
        prisma.unofficialExpense.update({
          where: { id: expense.id },
          data: { lastAccessed: new Date() },
        })
      )
    );

    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amountInInr, 0);

    return NextResponse.json({ 
      expenses: decryptedExpenses, 
      count: expenses.length, 
      total 
    });
  } catch (error) {
    console.error('Error fetching unofficial expenses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch unofficial expenses' },
      { status: 500 }
    );
  }
}

// POST create new unofficial expense
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check password
    if (body.password !== process.env.UNOFFICIAL_EXPENSES_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    // Remove password from body
    delete body.password;

    // Generate expense code if not provided
    if (!body.expenseCode) {
      const lastExpense = await prisma.unofficialExpense.findFirst({
        orderBy: { id: 'desc' },
      });

      let nextNumber = 1;
      if (lastExpense) {
        const lastNumber = parseInt(lastExpense.expenseCode.split('-').pop() || '0');
        nextNumber = lastNumber + 1;
      }

      body.expenseCode = `UE-${String(nextNumber).padStart(3, '0')}`;
    }

    // Encrypt sensitive fields
    if (body.purpose) {
      body.purpose = simpleEncrypt(body.purpose);
    }
    if (body.recipientCode) {
      body.recipientCode = simpleEncrypt(body.recipientCode);
    }
    if (body.location) {
      body.location = simpleEncrypt(body.location);
    }
    if (body.notes) {
      body.notes = simpleEncrypt(body.notes);
    }

    // Calculate amount in INR if not provided
    if (!body.amountInInr && body.amount) {
      if (body.currency === 'INR') {
        body.amountInInr = body.amount;
      }
    }

    // Convert date string to Date object
    if (body.expenseDate) {
      body.expenseDate = new Date(body.expenseDate);
    }

    // Initialize access log
    body.accessLog = simpleEncrypt(JSON.stringify([{
      action: 'created',
      timestamp: new Date().toISOString(),
    }]));

    const expense = await prisma.unofficialExpense.create({
      data: body,
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating unofficial expense:', error);
    return NextResponse.json(
      { error: 'Failed to create unofficial expense', details: error.message },
      { status: 500 }
    );
  }
}
