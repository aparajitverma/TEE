import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/vendors/export
 * Export selected vendors to CSV
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vendorIds, format = 'csv' } = body;

    // Build where clause
    const whereClause: any = {};
    if (vendorIds && vendorIds.length > 0) {
      whereClause.id = { in: vendorIds.map((id: string) => parseInt(id)) };
    }

    // Fetch vendors
    const vendors = await prisma.vendor.findMany({
      where: whereClause,
      orderBy: { vendorName: 'asc' },
    });

    if (format === 'csv') {
      // CSV Headers
      const headers = [
        'ID',
        'Vendor Code',
        'Vendor Name',
        'Vendor Type',
        'Status',
        'Contact Person',
        'Phone Primary',
        'Phone Secondary',
        'Email',
        'WhatsApp',
        'Address Line 1',
        'Address Line 2',
        'City',
        'State',
        'Pincode',
        'Country',
        'GSTIN',
        'PAN',
        'Bank Name',
        'Bank Account Number',
        'Bank IFSC',
        'Payment Terms',
        'Credit Limit',
        'Products Supplied',
        'Monthly Capacity',
        'Lead Time Days',
        'Total Orders',
        'Total Value',
        'Outstanding Amount',
        'Rating',
      ];

      // CSV Rows
      const rows = vendors.map((vendor) => [
        vendor.id,
        vendor.vendorCode,
        `"${vendor.vendorName}"`,
        vendor.vendorType,
        vendor.status,
        `"${vendor.contactPerson}"`,
        vendor.phonePrimary,
        vendor.phoneSecondary || '',
        vendor.email || '',
        vendor.whatsapp || '',
        `"${vendor.addressLine1 || ''}"`,
        `"${vendor.addressLine2 || ''}"`,
        vendor.city || '',
        vendor.state || '',
        vendor.pincode || '',
        vendor.country || '',
        vendor.gstin || '',
        vendor.pan || '',
        vendor.bankName || '',
        vendor.bankAccountNumber || '',
        vendor.bankIfsc || '',
        vendor.paymentTerms || '',
        vendor.creditLimit || 0,
        `"${vendor.productsSupplied || ''}"`,
        vendor.monthlyCapacity || '',
        vendor.leadTimeDays || 0,
        vendor.totalOrders,
        vendor.totalValue,
        vendor.outstandingAmount,
        vendor.rating || 0,
      ]);

      const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="vendors-export-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    } else {
      // JSON format
      return NextResponse.json({
        success: true,
        vendors,
        count: vendors.length,
      });
    }
  } catch (error) {
    console.error('Error exporting vendors:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to export vendors',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/vendors/export
 * Download CSV import template
 */
export async function GET() {
  try {
    const headers = [
      'Vendor Code*',
      'Vendor Name*',
      'Vendor Type*',
      'Status',
      'Contact Person*',
      'Phone Primary*',
      'Phone Secondary',
      'Email',
      'WhatsApp',
      'Address Line 1',
      'Address Line 2',
      'City',
      'State',
      'Pincode',
      'Country',
      'GSTIN',
      'PAN',
      'Bank Name',
      'Bank Account Number',
      'Bank IFSC',
      'Payment Terms',
      'Credit Limit',
      'Products Supplied',
      'Monthly Capacity',
      'Lead Time Days',
      'Rating',
    ];

    const sampleRow = [
      'VEN-001',
      'ABC Suppliers',
      'Wholesaler',
      'Active',
      'John Doe',
      '+91-9876543210',
      '+91-9876543211',
      'john@abcsuppliers.com',
      '+91-9876543210',
      '123 Main Street',
      'Near City Center',
      'Mumbai',
      'Maharashtra',
      '400001',
      'India',
      '27AABCU9603R1ZM',
      'AABCU9603R',
      'HDFC Bank',
      '50100123456789',
      'HDFC0001234',
      'Net 30',
      '100000',
      'Spices, Herbs',
      '1000 kg',
      '7',
      '4.5',
    ];

    const csv = [
      headers.join(','),
      '# Sample row (delete this line before importing):',
      sampleRow.map((val) => `"${val}"`).join(','),
      '# Fields marked with * are required',
      '# Vendor Type: Farmer, Processor, Wholesaler, Service Provider',
      '# Status: Active, Inactive, Blacklisted',
    ].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="vendor-import-template.csv"',
      },
    });
  } catch (error) {
    console.error('Error generating template:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate template',
      },
      { status: 500 }
    );
  }
}
