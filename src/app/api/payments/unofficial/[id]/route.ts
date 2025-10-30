import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple encryption helper (in production, use proper encryption library)
function simpleEncrypt(text: string): string {
  return Buffer.from(text).toString('base64');
}

function simpleDecrypt(encrypted: string): string {
  return Buffer.from(encrypted, 'base64').toString('utf-8');
}

// GET single unofficial expense
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    if (password !== process.env.UNOFFICIAL_EXPENSES_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const expense = await prisma.unofficialExpense.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!expense) {
      return NextResponse.json(
        { error: 'Expense not found' },
        { status: 404 }
      );
    }

    // Decrypt sensitive fields
    const decryptedExpense = {
      ...expense,
      purpose: simpleDecrypt(expense.purpose),
      recipientCode: simpleDecrypt(expense.recipientCode),
      location: expense.location ? simpleDecrypt(expense.location) : null,
      notes: expense.notes ? simpleDecrypt(expense.notes) : null,
    };

    // Update last accessed
    await prisma.unofficialExpense.update({
      where: { id: expense.id },
      data: { lastAccessed: new Date() },
    });

    return NextResponse.json({ expense: decryptedExpense });
  } catch (error) {
    console.error('Error fetching unofficial expense:', error);
    return NextResponse.json(
      { error: 'Failed to fetch unofficial expense' },
      { status: 500 }
    );
  }
}

// PUT update unofficial expense
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (body.password !== process.env.UNOFFICIAL_EXPENSES_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    delete body.password;

    // Encrypt sensitive fields if provided
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

    if (body.expenseDate) {
      body.expenseDate = new Date(body.expenseDate);
    }

    const expense = await prisma.unofficialExpense.update({
      where: { id: parseInt(params.id) },
      data: body,
    });

    return NextResponse.json({ expense });
  } catch (error: any) {
    console.error('Error updating unofficial expense:', error);
    return NextResponse.json(
      { error: 'Failed to update unofficial expense', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE unofficial expense
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    if (password !== process.env.UNOFFICIAL_EXPENSES_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    await prisma.unofficialExpense.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Unofficial expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting unofficial expense:', error);
    return NextResponse.json(
      { error: 'Failed to delete unofficial expense' },
      { status: 500 }
    );
  }
}
