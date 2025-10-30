import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all bank accounts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: any = {};

    // Status filter
    if (status && status !== 'all') {
      where.status = status;
    }

    const accounts = await prisma.bankAccount.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Calculate total balance
    const totalBalance = accounts
      .filter(acc => acc.status === 'Active')
      .reduce((sum, acc) => sum + acc.currentBalance, 0);

    return NextResponse.json({ accounts, count: accounts.length, totalBalance });
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bank accounts' },
      { status: 500 }
    );
  }
}

// POST create new bank account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Set current balance to opening balance initially
    if (!body.currentBalance && body.openingBalance) {
      body.currentBalance = body.openingBalance;
    }

    const account = await prisma.bankAccount.create({
      data: body,
    });

    return NextResponse.json({ account }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating bank account:', error);
    return NextResponse.json(
      { error: 'Failed to create bank account', details: error.message },
      { status: 500 }
    );
  }
}
