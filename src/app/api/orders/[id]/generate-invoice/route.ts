import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateInvoiceHTML, generateInvoiceNumber, calculateDueDate } from '@/lib/invoice-generator';

// POST - Generate invoice (proforma or commercial)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const orderId = parseInt(params.id);
    const { invoiceType = 'proforma', format = 'html', sendEmail = false } = body;

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

    // Count existing invoices of this type to generate invoice number
    const invoiceCount = await prisma.order.count({
      where: {
        OR: [
          { proformaInvoiceUrl: { not: null } },
          { commercialInvoiceUrl: { not: null } }
        ]
      }
    });

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber(invoiceType, invoiceCount);
    const invoiceDate = new Date();
    const dueDate = calculateDueDate(invoiceDate, order.paymentTerms);

    // Calculate tax rate if tax amount exists
    const taxRate = order.taxAmount > 0 && order.subtotal > 0 
      ? (order.taxAmount / order.subtotal) * 100 
      : undefined;

    // Prepare invoice data
    const invoiceData = {
      invoiceNumber,
      invoiceType,
      invoiceDate: invoiceDate.toISOString(),
      dueDate: dueDate?.toISOString(),
      orderNumber: order.orderNumber,
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      clientPhone: order.clientPhone,
      billingAddress: order.billingAddress,
      shippingAddress: order.shippingAddress,
      currency: order.currency,
      paymentTerms: order.paymentTerms,
      lineItems: order.lineItems.map(item => ({
        productName: item.productName,
        productCode: item.productCode,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        specifications: item.specifications,
        hsCode: null, // You can add this to your line items model if needed
      })),
      subtotal: order.subtotal,
      taxAmount: order.taxAmount,
      taxRate,
      shippingCost: order.shippingCost,
      discountAmount: order.discountAmount,
      totalAmount: order.totalAmount,
      notes: order.notes,
      incoterm: order.incoterm,
      portOfLoading: order.portOfLoading,
      portOfDischarge: order.portOfDischarge,
      shippingMethod: order.shippingMethod,
      numberOfPackages: order.numberOfPackages,
      grossWeight: order.grossWeight,
      netWeight: order.netWeight,
      weightUnit: order.weightUnit,
    };

    // Generate HTML
    const invoiceHTML = generateInvoiceHTML(invoiceData);

    // Update order with invoice URL (in production, you'd save the PDF to storage)
    const updateData: any = {};
    if (invoiceType === 'proforma') {
      updateData.proformaInvoiceUrl = `invoice-${invoiceNumber}.html`;
    } else {
      updateData.commercialInvoiceUrl = `invoice-${invoiceNumber}.html`;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    // Log activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: orderId,
        actionType: 'Invoice Generated',
        description: `${invoiceType === 'proforma' ? 'Proforma' : 'Commercial'} invoice ${invoiceNumber} generated`,
        performedBy: body.generatedBy || 'Admin',
        timestamp: new Date(),
        metadata: JSON.stringify({
          invoiceNumber,
          invoiceType,
          format,
        }),
      },
    });

    // If sending email, log communication
    if (sendEmail && order.clientEmail) {
      await prisma.orderCommunication.create({
        data: {
          orderId: orderId,
          communicationType: 'Email',
          direction: 'Outbound',
          dateTime: new Date(),
          subject: `${invoiceType === 'proforma' ? 'Proforma' : 'Commercial'} Invoice - ${invoiceNumber}`,
          summary: 'Invoice sent to client',
          emailTemplate: invoiceType === 'proforma' ? 'Proforma Invoice' : 'Commercial Invoice',
          sentTo: order.clientEmail,
          loggedBy: body.generatedBy || 'Admin',
        },
      });
    }

    // Return based on format
    if (format === 'html') {
      return new NextResponse(invoiceHTML, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `inline; filename="invoice-${invoiceNumber}.html"`,
        },
      });
    }

    return NextResponse.json({
      message: 'Invoice generated successfully',
      invoiceNumber,
      html: invoiceHTML,
      note: 'To generate PDF, use a library like puppeteer or jsPDF on the client side',
    });

  } catch (error: any) {
    console.error('Error generating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to generate invoice', details: error.message },
      { status: 500 }
    );
  }
}

// GET - Preview invoice
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);
    const { searchParams } = new URL(request.url);
    const invoiceType = (searchParams.get('type') || 'proforma') as 'proforma' | 'commercial';

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

    // Count existing invoices to generate preview number
    const invoiceCount = await prisma.order.count({
      where: {
        OR: [
          { proformaInvoiceUrl: { not: null } },
          { commercialInvoiceUrl: { not: null } }
        ]
      }
    });

    const invoiceNumber = generateInvoiceNumber(invoiceType, invoiceCount);
    const invoiceDate = new Date();
    const dueDate = calculateDueDate(invoiceDate, order.paymentTerms);

    const taxRate = order.taxAmount > 0 && order.subtotal > 0 
      ? (order.taxAmount / order.subtotal) * 100 
      : undefined;

    const invoiceData = {
      invoiceNumber,
      invoiceType,
      invoiceDate: invoiceDate.toISOString(),
      dueDate: dueDate?.toISOString(),
      orderNumber: order.orderNumber,
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      clientPhone: order.clientPhone,
      billingAddress: order.billingAddress,
      shippingAddress: order.shippingAddress,
      currency: order.currency,
      paymentTerms: order.paymentTerms,
      lineItems: order.lineItems.map(item => ({
        productName: item.productName,
        productCode: item.productCode,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        specifications: item.specifications,
        hsCode: null,
      })),
      subtotal: order.subtotal,
      taxAmount: order.taxAmount,
      taxRate,
      shippingCost: order.shippingCost,
      discountAmount: order.discountAmount,
      totalAmount: order.totalAmount,
      notes: order.notes,
      incoterm: order.incoterm,
      portOfLoading: order.portOfLoading,
      portOfDischarge: order.portOfDischarge,
      shippingMethod: order.shippingMethod,
      numberOfPackages: order.numberOfPackages,
      grossWeight: order.grossWeight,
      netWeight: order.netWeight,
      weightUnit: order.weightUnit,
    };

    const invoiceHTML = generateInvoiceHTML(invoiceData);

    return new NextResponse(invoiceHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error: any) {
    console.error('Error previewing invoice:', error);
    return NextResponse.json(
      { error: 'Failed to preview invoice', details: error.message },
      { status: 500 }
    );
  }
}
