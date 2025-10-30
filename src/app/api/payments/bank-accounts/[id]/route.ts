import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single bank account
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const account = await prisma.bankAccount.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!account) {
      return NextResponse.json(
        { error: 'Bank account not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ account });
  } catch (error) {
    console.error('Error fetching bank account:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bank account' },
      { status: 500 }
    );
  }
}

// PUT update bank account
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const account = await prisma.bankAccount.update({
      where: { id: parseInt(params.id) },
      data: body,
    });

    return NextResponse.json({ account });
  } catch (error: any) {
    console.error('Error updating bank account:', error);
    return NextResponse.json(
      { error: 'Failed to update bank account', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE bank account
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.bankAccount.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Bank account deleted successfully' });
  } catch (error) {
    console.error('Error deleting bank account:', error);
    return NextResponse.json(
      { error: 'Failed to delete bank account' },
      { status: 500 }
    );
  }
}
