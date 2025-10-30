import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePackingListHTML, generatePackingListNumber } from '@/lib/packing-list-generator';

// POST - Generate packing list
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const orderId = parseInt(params.id);
    const { format = 'html', sendEmail = false, recipients = [] } = body;

    // Fetch order with line items
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { lineItems: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Count existing packing lists to generate number
    const packingListCount = await prisma.order.count({
      where: {
        packingListUrl: { not: null }
      }
    });

    // Generate packing list number
    const packingListNumber = generatePackingListNumber(packingListCount);
    const packingListDate = new Date();

    // Prepare packing list data
    const packingListData = {
      packingListNumber,
      packingListDate: packingListDate.toISOString(),
      orderNumber: order.orderNumber,
      invoiceNumber: order.proformaInvoiceUrl ? `PI-${order.orderNumber}` : undefined,
      clientName: order.clientName,
      clientAddress: order.billingAddress,
      shippingAddress: order.shippingAddress,
      items: order.lineItems.map((item, index) => ({
        productName: item.productName,
        productCode: item.productCode,
        quantity: item.quantity,
        unit: item.unit,
        specifications: item.specifications,
        hsCode: null, // You can add this to your line items model if needed
        packageNumber: Math.floor(index / 5) + 1, // Simple distribution: 5 items per package
      })),
      totalPackages: order.numberOfPackages || Math.ceil(order.lineItems.length / 5),
      totalGrossWeight: order.grossWeight || 0,
      totalNetWeight: order.netWeight || 0,
      weightUnit: order.weightUnit || 'kg',
      portOfLoading: order.portOfLoading,
      portOfDischarge: order.portOfDischarge,
      shippingMethod: order.shippingMethod,
      containerNumber: order.containerNumber,
      sealNumber: null, // You can add this field if needed
      notes: order.notes,
    };

    // Generate HTML
    const packingListHTML = generatePackingListHTML(packingListData);

    // Update order with packing list URL
    await prisma.order.update({
      where: { id: orderId },
      data: {
        packingListUrl: `packing-list-${packingListNumber}.html`,
      },
    });

    // Log activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: orderId,
        actionType: 'Packing List Generated',
        description: `Packing list ${packingListNumber} generated`,
        performedBy: body.generatedBy || 'Admin',
        timestamp: new Date(),
        metadata: JSON.stringify({
          packingListNumber,
          format,
        }),
      },
    });

    // If sending email, log communications
    if (sendEmail && recipients.length > 0) {
      for (const recipient of recipients) {
        await prisma.orderCommunication.create({
          data: {
            orderId: orderId,
            communicationType: 'Email',
            direction: 'Outbound',
            dateTime: new Date(),
            subject: `Packing List - ${packingListNumber}`,
            summary: `Packing list sent to ${recipient}`,
            emailTemplate: 'Packing List',
            sentTo: recipient,
            loggedBy: body.generatedBy || 'Admin',
          },
        });
      }
    }

    // Return based on format
    if (format === 'html') {
      return new NextResponse(packingListHTML, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `inline; filename="packing-list-${packingListNumber}.html"`,
        },
      });
    }

    return NextResponse.json({
      message: 'Packing list generated successfully',
      packingListNumber,
      html: packingListHTML,
      note: 'To generate PDF, use a library like puppeteer or jsPDF on the client side',
    });

  } catch (error: any) {
    console.error('Error generating packing list:', error);
    return NextResponse.json(
      { error: 'Failed to generate packing list', details: error.message },
      { status: 500 }
    );
  }
}

// GET - Preview packing list
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);

    // Fetch order with line items
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { lineItems: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Count existing packing lists to generate preview number
    const packingListCount = await prisma.order.count({
      where: {
        packingListUrl: { not: null }
      }
    });

    const packingListNumber = generatePackingListNumber(packingListCount);
    const packingListDate = new Date();

    const packingListData = {
      packingListNumber,
      packingListDate: packingListDate.toISOString(),
      orderNumber: order.orderNumber,
      invoiceNumber: order.proformaInvoiceUrl ? `PI-${order.orderNumber}` : undefined,
      clientName: order.clientName,
      clientAddress: order.billingAddress,
      shippingAddress: order.shippingAddress,
      items: order.lineItems.map((item, index) => ({
        productName: item.productName,
        productCode: item.productCode,
        quantity: item.quantity,
        unit: item.unit,
        specifications: item.specifications,
        hsCode: null,
        packageNumber: Math.floor(index / 5) + 1,
      })),
      totalPackages: order.numberOfPackages || Math.ceil(order.lineItems.length / 5),
      totalGrossWeight: order.grossWeight || 0,
      totalNetWeight: order.netWeight || 0,
      weightUnit: order.weightUnit || 'kg',
      portOfLoading: order.portOfLoading,
      portOfDischarge: order.portOfDischarge,
      shippingMethod: order.shippingMethod,
      containerNumber: order.containerNumber,
      sealNumber: null,
      notes: order.notes,
    };

    const packingListHTML = generatePackingListHTML(packingListData);

    return new NextResponse(packingListHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error: any) {
    console.error('Error previewing packing list:', error);
    return NextResponse.json(
      { error: 'Failed to preview packing list', details: error.message },
      { status: 500 }
    );
  }
}
