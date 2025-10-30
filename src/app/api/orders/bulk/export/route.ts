import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/orders/bulk/export
 * Export multiple orders to CSV or JSON format
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderIds, format = 'csv', includeLineItems = true } = body;

    // Validation
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order IDs array is required' },
        { status: 400 }
      );
    }

    if (!['csv', 'json'].includes(format)) {
      return NextResponse.json(
        { success: false, error: 'Format must be either "csv" or "json"' },
        { status: 400 }
      );
    }

    // Fetch orders
    const orders = await prisma.order.findMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      include: {
        lineItems: includeLineItems,
      },
      orderBy: {
        orderDate: 'desc',
      },
    });

    if (orders.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No orders found with the provided IDs' },
        { status: 404 }
      );
    }

    if (format === 'json') {
      // Return JSON format
      return NextResponse.json({
        success: true,
        format: 'json',
        count: orders.length,
        exportDate: new Date().toISOString(),
        data: orders,
      });
    } else {
      // Generate CSV
      const csvHeaders = [
        'Order Number',
        'Order Date',
        'Client Name',
        'Client Email',
        'Order Type',
        'Order Status',
        'Priority',
        'Subtotal',
        'Tax Amount',
        'Shipping Cost',
        'Total Amount',
        'Currency',
        'Payment Status',
        'Payment Terms',
        'Expected Delivery Date',
        'Actual Delivery Date',
        'Incoterm',
        'Shipping Method',
        'Port of Loading',
        'Port of Discharge',
        'Tracking Number',
        'Assigned To',
        'Source',
        'Created At',
      ];

      const csvRows = orders.map((order) => [
        order.orderNumber,
        order.orderDate.toISOString().split('T')[0],
        order.clientName,
        order.clientEmail || '',
        order.orderType,
        order.orderStatus,
        order.priority,
        order.subtotal,
        order.taxAmount,
        order.shippingCost,
        order.totalAmount,
        order.currency,
        order.paymentStatus,
        order.paymentTerms || '',
        order.expectedDeliveryDate?.toISOString().split('T')[0] || '',
        order.actualDeliveryDate?.toISOString().split('T')[0] || '',
        order.incoterm || '',
        order.shippingMethod || '',
        order.portOfLoading || '',
        order.portOfDischarge || '',
        order.trackingNumber || '',
        order.assignedTo || '',
        order.source || '',
        order.createdAt.toISOString(),
      ]);

      // Escape CSV values
      const escapeCsvValue = (value: any): string => {
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      };

      const csvContent = [
        csvHeaders.map(escapeCsvValue).join(','),
        ...csvRows.map((row) => row.map(escapeCsvValue).join(',')),
      ].join('\n');

      // Return CSV with appropriate headers
      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="orders_export_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }
  } catch (error) {
    console.error('Error in bulk export:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to export orders',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
