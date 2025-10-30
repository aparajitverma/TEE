import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Create inquiry from website form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate inquiry/order number
    const count = await prisma.order.count();
    const orderNumber = `INQ-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    // Create order with Inquiry status
    const inquiry = await prisma.order.create({
      data: {
        orderNumber,
        orderType: body.orderType || 'Export',
        orderStatus: 'Inquiry',
        priority: body.priority || 'Medium',
        clientName: body.clientName,
        clientEmail: body.clientEmail || null,
        clientPhone: body.clientPhone || null,
        billingAddress: body.billingAddress || null,
        shippingAddress: body.shippingAddress || null,
        orderDate: new Date(),
        inquiryDate: new Date(),
        expectedDeliveryDate: body.expectedDeliveryDate ? new Date(body.expectedDeliveryDate) : null,
        subtotal: 0,
        taxAmount: 0,
        shippingCost: 0,
        discountAmount: 0,
        totalAmount: 0,
        currency: body.currency || 'USD',
        paymentTerms: body.paymentTerms || null,
        paymentStatus: 'Pending',
        notes: body.notes || null,
        source: body.source || 'Website',
        specialInstructions: body.specialInstructions || null,
        // Create line items if products are provided
        lineItems: body.products && body.products.length > 0 ? {
          create: body.products.map((product: any) => ({
            productId: product.productId || null,
            productName: product.productName,
            productCode: product.productCode || null,
            quantity: parseFloat(product.quantity) || 0,
            unit: product.unit || 'kg',
            unitPrice: 0, // Price to be quoted later
            totalPrice: 0,
            specifications: product.specifications || null,
          })),
        } : undefined,
      },
      include: { lineItems: true },
    });

    // Log activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: inquiry.id,
        actionType: 'Inquiry Created',
        description: `Inquiry received from ${body.source || 'Website'}`,
        performedBy: 'System',
        timestamp: new Date(),
      },
    });

    // In a real application, you might want to:
    // 1. Send email notification to admin
    // 2. Send confirmation email to customer
    // 3. Create a notification in the system

    return NextResponse.json({ 
      inquiry,
      message: 'Inquiry created successfully. We will contact you soon.' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to create inquiry', details: error },
      { status: 500 }
    );
  }
}

// GET - Fetch all inquiries (optional, for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: any = {};
    
    // Filter by inquiry status
    if (status) {
      where.orderStatus = status;
    } else {
      // Default to showing only inquiries
      where.orderStatus = 'Inquiry';
    }

    const inquiries = await prisma.order.findMany({
      where,
      include: { lineItems: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
