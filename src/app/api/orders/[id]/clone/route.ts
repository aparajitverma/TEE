import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Clone an order
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);

    // Fetch the original order with line items
    const originalOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { lineItems: true },
    });

    if (!originalOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Generate new order number
    const count = await prisma.order.count();
    const newOrderNumber = `ORD-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    // Create cloned order
    const clonedOrder = await prisma.order.create({
      data: {
        orderNumber: newOrderNumber,
        orderType: originalOrder.orderType,
        orderStatus: 'Inquiry', // Reset to Inquiry status
        priority: originalOrder.priority,
        clientId: originalOrder.clientId,
        clientName: originalOrder.clientName,
        clientEmail: originalOrder.clientEmail,
        clientPhone: originalOrder.clientPhone,
        billingAddress: originalOrder.billingAddress,
        shippingAddress: originalOrder.shippingAddress,
        orderDate: new Date(),
        expectedDeliveryDate: originalOrder.expectedDeliveryDate,
        subtotal: originalOrder.subtotal,
        taxAmount: originalOrder.taxAmount,
        shippingCost: originalOrder.shippingCost,
        discountAmount: originalOrder.discountAmount,
        totalAmount: originalOrder.totalAmount,
        currency: originalOrder.currency,
        paymentTerms: originalOrder.paymentTerms,
        paymentStatus: 'Pending', // Reset payment status
        incoterm: originalOrder.incoterm,
        shippingMethod: originalOrder.shippingMethod,
        portOfLoading: originalOrder.portOfLoading,
        portOfDischarge: originalOrder.portOfDischarge,
        numberOfPackages: originalOrder.numberOfPackages,
        packageType: originalOrder.packageType,
        grossWeight: originalOrder.grossWeight,
        netWeight: originalOrder.netWeight,
        weightUnit: originalOrder.weightUnit,
        specialInstructions: originalOrder.specialInstructions,
        notes: originalOrder.notes ? `Cloned from ${originalOrder.orderNumber}\n\n${originalOrder.notes}` : `Cloned from ${originalOrder.orderNumber}`,
        // Clone line items
        lineItems: {
          create: originalOrder.lineItems.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productCode: item.productCode,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            specifications: item.specifications,
            vendorId: item.vendorId,
            vendorCost: item.vendorCost,
            margin: item.margin,
          })),
        },
      },
      include: { lineItems: true },
    });

    // Log activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: clonedOrder.id,
        actionType: 'Order Cloned',
        description: `Order cloned from ${originalOrder.orderNumber}`,
        performedBy: 'Admin',
        timestamp: new Date(),
      },
    });

    return NextResponse.json({ order: clonedOrder }, { status: 201 });
  } catch (error) {
    console.error('Error cloning order:', error);
    return NextResponse.json(
      { error: 'Failed to clone order', details: error },
      { status: 500 }
    );
  }
}
