import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/vendors/[id]/payments
 * Get all payments for a specific vendor
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = parseInt(params.id);

    if (isNaN(vendorId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid vendor ID' },
        { status: 400 }
      );
    }

    // Verify vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { 
        id: true, 
        vendorName: true, 
        vendorCode: true,
        outstandingAmount: true,
      },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Fetch all payments for this vendor
    // @ts-ignore - VendorPayment model exists in schema but Prisma client needs regeneration
    const payments = await prisma.vendorPayment.findMany({
      where: { vendorId },
      orderBy: { paymentDate: 'desc' },
    });

    // Calculate summary statistics
    const summary = {
      totalPayments: payments.length,
      totalPaid: payments.reduce((sum: number, p: any) => sum + p.amount, 0),
      currentOutstanding: vendor.outstandingAmount,
      lastPaymentDate: payments.length > 0 ? payments[0].paymentDate : null,
      paymentsByMethod: payments.reduce((acc: Record<string, number>, p: any) => {
        acc[p.paymentMethod] = (acc[p.paymentMethod] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      paymentsByStatus: {
        completed: payments.filter((p: any) => p.paymentStatus === 'Completed').length,
        pending: payments.filter((p: any) => p.paymentStatus === 'Pending').length,
        failed: payments.filter((p: any) => p.paymentStatus === 'Failed').length,
        cancelled: payments.filter((p: any) => p.paymentStatus === 'Cancelled').length,
      },
    };

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        name: vendor.vendorName,
        code: vendor.vendorCode,
        outstandingAmount: vendor.outstandingAmount,
      },
      summary,
      payments,
    });
  } catch (error) {
    console.error('Error fetching vendor payments:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vendor payments',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vendors/[id]/payments
 * Add a new payment for a vendor
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = parseInt(params.id);

    if (isNaN(vendorId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid vendor ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      paymentDate,
      amount,
      currency,
      paymentMethod,
      referenceNumber,
      invoiceNumber,
      orderId,
      orderNumber,
      notes,
      recordedBy,
    } = body;

    // Validate required fields
    if (!paymentDate || !amount || !paymentMethod || !recordedBy) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true, outstandingAmount: true },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Calculate balance after payment
    const balanceAfter = vendor.outstandingAmount - amount;

    // Create payment record
    // @ts-ignore - VendorPayment model exists in schema but Prisma client needs regeneration
    const payment = await prisma.vendorPayment.create({
      data: {
        vendorId,
        paymentDate: new Date(paymentDate),
        amount: parseFloat(amount),
        currency: currency || 'USD',
        paymentMethod,
        referenceNumber,
        invoiceNumber,
        orderId: orderId ? parseInt(orderId) : null,
        orderNumber,
        notes,
        balanceAfter,
        paymentStatus: 'Completed',
        recordedBy,
      },
    });

    // Update vendor's outstanding amount
    await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        outstandingAmount: balanceAfter,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment recorded successfully',
      payment,
      balanceAfter,
    });
  } catch (error) {
    console.error('Error creating vendor payment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create payment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
