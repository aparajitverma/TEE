import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/orders/alerts/documents-pending
 * Returns orders with missing or pending documents based on order status
 */
export async function GET(request: Request) {
  try {
    // Find orders that should have documents but are missing them
    const orders = await prisma.order.findMany({
      where: {
        orderStatus: {
          in: ['Confirmed', 'Processing', 'Shipped', 'Delivered'],
        },
      },
      include: {
        lineItems: true,
      },
    });

    // Check which documents are missing based on order status
    const ordersWithMissingDocuments = orders
      .map((order) => {
        const missingDocuments: string[] = [];
        const requiredDocuments: { [key: string]: string } = {};

        // Documents required based on order status
        if (['Confirmed', 'Processing', 'Shipped', 'Delivered'].includes(order.orderStatus)) {
          requiredDocuments['Proforma Invoice'] = 'proformaInvoiceUrl';
        }

        if (['Processing', 'Shipped', 'Delivered'].includes(order.orderStatus)) {
          requiredDocuments['Commercial Invoice'] = 'commercialInvoiceUrl';
          requiredDocuments['Packing List'] = 'packingListUrl';
        }

        if (['Shipped', 'Delivered'].includes(order.orderStatus)) {
          if (order.shippingMethod === 'Sea Freight' || order.shippingMethod === 'Sea') {
            requiredDocuments['Bill of Lading'] = 'billOfLadingUrl';
          }
          if (order.shippingMethod === 'Air Freight' || order.shippingMethod === 'Air') {
            requiredDocuments['Air Waybill'] = 'awbNumber';
          }
        }

        // For export orders, additional documents are required
        if (order.orderType === 'Export') {
          if (['Processing', 'Shipped', 'Delivered'].includes(order.orderStatus)) {
            requiredDocuments['Certificate of Origin'] = 'certificateOfOriginUrl';
          }
        }

        // Check which documents are missing
        Object.entries(requiredDocuments).forEach(([docName, fieldName]) => {
          const fieldValue = order[fieldName as keyof typeof order];
          if (!fieldValue || fieldValue === '') {
            missingDocuments.push(docName);
          }
        });

        if (missingDocuments.length > 0) {
          return {
            orderId: order.id,
            orderNumber: order.orderNumber,
            clientName: order.clientName,
            orderStatus: order.orderStatus,
            orderType: order.orderType,
            orderDate: order.orderDate,
            expectedDeliveryDate: order.expectedDeliveryDate,
            totalAmount: order.totalAmount,
            currency: order.currency,
            missingDocuments,
            missingCount: missingDocuments.length,
            alertLevel:
              missingDocuments.length >= 3
                ? 'critical'
                : missingDocuments.length >= 2
                ? 'urgent'
                : 'warning',
          };
        }

        return null;
      })
      .filter((order) => order !== null);

    // Sort by missing document count (descending) and then by order date
    ordersWithMissingDocuments.sort((a, b) => {
      if (b!.missingCount !== a!.missingCount) {
        return b!.missingCount - a!.missingCount;
      }
      return new Date(a!.orderDate).getTime() - new Date(b!.orderDate).getTime();
    });

    return NextResponse.json({
      success: true,
      count: ordersWithMissingDocuments.length,
      alerts: ordersWithMissingDocuments,
    });
  } catch (error) {
    console.error('Error fetching document pending alerts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch document pending alerts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
