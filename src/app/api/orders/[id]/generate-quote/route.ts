import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateQuoteHTML, calculateValidityDate } from '@/lib/quote-generator';

// POST - Generate quote PDF/HTML for order
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const orderId = parseInt(params.id);
    const { validityDays, format = 'html', sendEmail = false } = body;

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

    // Calculate validity date
    const quoteDate = new Date();
    const validUntil = calculateValidityDate(validityDays);

    // Prepare quote data
    const quoteData = {
      orderNumber: order.orderNumber,
      quoteDate: quoteDate.toISOString(),
      validUntil: validUntil.toISOString(),
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
      })),
      subtotal: order.subtotal,
      taxAmount: order.taxAmount,
      shippingCost: order.shippingCost,
      discountAmount: order.discountAmount,
      totalAmount: order.totalAmount,
      notes: order.notes,
      incoterm: order.incoterm,
      portOfLoading: order.portOfLoading,
      portOfDischarge: order.portOfDischarge,
    };

    // Generate HTML
    const quoteHTML = generateQuoteHTML(quoteData);

    // Update order with quote date if not already set
    if (!order.quoteDate) {
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          quoteDate: quoteDate,
        },
      });
    }

    // Log activity
    await prisma.orderActivityLog.create({
      data: {
        orderId: orderId,
        actionType: 'Quote Generated',
        description: `Quote generated for order ${order.orderNumber}`,
        performedBy: body.generatedBy || 'Admin',
        timestamp: new Date(),
        metadata: JSON.stringify({
          validUntil: validUntil.toISOString(),
          format,
        }),
      },
    });

    // If sending email, also send it
    if (sendEmail && order.clientEmail) {
      // TODO: Implement email sending
      // This would integrate with your email service (SendGrid, AWS SES, etc.)
      
      // Log communication
      await prisma.orderCommunication.create({
        data: {
          orderId: orderId,
          communicationType: 'Email',
          direction: 'Outbound',
          dateTime: new Date(),
          subject: `Quotation - ${order.orderNumber}`,
          summary: 'Quote sent to client',
          emailTemplate: 'Quote',
          sentTo: order.clientEmail,
          loggedBy: body.generatedBy || 'Admin',
        },
      });
    }

    // Return based on format
    if (format === 'html') {
      return new NextResponse(quoteHTML, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `inline; filename="quote-${order.orderNumber}.html"`,
        },
      });
    }

    // For PDF format, you would need to convert HTML to PDF
    // This requires additional libraries like puppeteer, jsPDF, etc.
    // For now, return HTML with instructions
    return NextResponse.json({
      message: 'Quote generated successfully',
      html: quoteHTML,
      validUntil: validUntil.toISOString(),
      note: 'To generate PDF, use a library like puppeteer or jsPDF on the client side',
    });

  } catch (error: any) {
    console.error('Error generating quote:', error);
    return NextResponse.json(
      { error: 'Failed to generate quote', details: error.message },
      { status: 500 }
    );
  }
}

// GET - Preview quote (returns HTML)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);
    const { searchParams } = new URL(request.url);
    const validityDays = parseInt(searchParams.get('validityDays') || '30');

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

    // Calculate validity date
    const quoteDate = order.quoteDate || new Date();
    const validUntil = calculateValidityDate(validityDays);

    // Prepare quote data
    const quoteData = {
      orderNumber: order.orderNumber,
      quoteDate: quoteDate.toISOString(),
      validUntil: validUntil.toISOString(),
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
      })),
      subtotal: order.subtotal,
      taxAmount: order.taxAmount,
      shippingCost: order.shippingCost,
      discountAmount: order.discountAmount,
      totalAmount: order.totalAmount,
      notes: order.notes,
      incoterm: order.incoterm,
      portOfLoading: order.portOfLoading,
      portOfDischarge: order.portOfDischarge,
    };

    // Generate HTML
    const quoteHTML = generateQuoteHTML(quoteData);

    return new NextResponse(quoteHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error: any) {
    console.error('Error previewing quote:', error);
    return NextResponse.json(
      { error: 'Failed to preview quote', details: error.message },
      { status: 500 }
    );
  }
}
