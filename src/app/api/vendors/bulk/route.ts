import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/vendors/bulk
 * Perform bulk operations on vendors
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, vendorIds } = body;

    if (!action || !vendorIds || !Array.isArray(vendorIds) || vendorIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid request. Action and vendorIds are required.' },
        { status: 400 }
      );
    }

    const ids = vendorIds.map((id: string | number) => parseInt(String(id)));

    let result;
    let message = '';

    switch (action) {
      case 'activate':
        result = await prisma.vendor.updateMany({
          where: { id: { in: ids } },
          data: { status: 'Active' },
        });
        message = `Successfully activated ${result.count} vendor(s)`;
        break;

      case 'deactivate':
        result = await prisma.vendor.updateMany({
          where: { id: { in: ids } },
          data: { status: 'Inactive' },
        });
        message = `Successfully deactivated ${result.count} vendor(s)`;
        break;

      case 'delete':
        // Soft delete - mark as inactive
        result = await prisma.vendor.updateMany({
          where: { id: { in: ids } },
          data: { status: 'Inactive' },
        });
        message = `Successfully deleted ${result.count} vendor(s)`;
        break;

      case 'hard-delete':
        // Hard delete - actually remove from database
        // Note: This should be used with caution
        result = await prisma.vendor.deleteMany({
          where: { id: { in: ids } },
        });
        message = `Successfully removed ${result.count} vendor(s) from database`;
        break;

      case 'export':
        // Fetch vendors for export
        const vendors = await prisma.vendor.findMany({
          where: { id: { in: ids } },
          orderBy: { vendorName: 'asc' },
        });

        return NextResponse.json({
          success: true,
          action: 'export',
          vendors,
          count: vendors.length,
        });

      default:
        return NextResponse.json(
          { success: false, error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      message,
      count: result.count,
    });
  } catch (error) {
    console.error('Error performing bulk operation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to perform bulk operation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/vendors/bulk
 * Send bulk email/message to vendors
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { vendorIds, subject, message, method } = body;

    if (!vendorIds || !Array.isArray(vendorIds) || vendorIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Vendor IDs are required' },
        { status: 400 }
      );
    }

    if (!subject || !message || !method) {
      return NextResponse.json(
        { success: false, error: 'Subject, message, and method are required' },
        { status: 400 }
      );
    }

    const ids = vendorIds.map((id: string | number) => parseInt(String(id)));

    // Fetch vendor contact information
    const vendors = await prisma.vendor.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        vendorName: true,
        email: true,
        phonePrimary: true,
        whatsapp: true,
        contactPerson: true,
      },
    });

    // In a real implementation, you would integrate with:
    // - Email service (SendGrid, AWS SES, etc.) for email
    // - SMS service (Twilio, etc.) for SMS
    // - WhatsApp Business API for WhatsApp
    
    // For now, we'll simulate the sending
    const results = {
      total: vendors.length,
      sent: 0,
      failed: 0,
      details: [] as any[],
    };

    vendors.forEach((vendor) => {
      let canSend = false;
      let failReason = '';

      switch (method) {
        case 'email':
          canSend = !!vendor.email;
          failReason = canSend ? '' : 'No email address';
          break;
        case 'sms':
          canSend = !!vendor.phonePrimary;
          failReason = canSend ? '' : 'No phone number';
          break;
        case 'whatsapp':
          canSend = !!vendor.whatsapp;
          failReason = canSend ? '' : 'No WhatsApp number';
          break;
      }

      if (canSend) {
        results.sent++;
        results.details.push({
          vendorId: vendor.id,
          vendorName: vendor.vendorName,
          status: 'sent',
          method,
        });
      } else {
        results.failed++;
        results.details.push({
          vendorId: vendor.id,
          vendorName: vendor.vendorName,
          status: 'failed',
          reason: failReason,
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: `Message sent to ${results.sent} vendor(s). ${results.failed} failed.`,
      results,
    });
  } catch (error) {
    console.error('Error sending bulk message:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send bulk message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
