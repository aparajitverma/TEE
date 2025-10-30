import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ImportError {
  row: number;
  field: string;
  value: any;
  error: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ImportError[];
}

/**
 * POST /api/vendors/import
 * Import vendors from CSV data
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { csvData, validateOnly = false } = body;

    if (!csvData || !Array.isArray(csvData)) {
      return NextResponse.json(
        { success: false, error: 'Invalid CSV data format' },
        { status: 400 }
      );
    }

    const errors: ImportError[] = [];
    const validVendors: any[] = [];
    const validVendorTypes = ['Farmer', 'Processor', 'Wholesaler', 'Service Provider'];
    const validStatuses = ['Active', 'Inactive', 'Blacklisted'];

    // Validate each row
    csvData.forEach((row: any, index: number) => {
      const rowNumber = index + 2; // +2 because row 1 is headers and array is 0-indexed
      const rowErrors: ImportError[] = [];

      // Required field validation
      if (!row.vendorCode || row.vendorCode.trim() === '') {
        rowErrors.push({
          row: rowNumber,
          field: 'Vendor Code',
          value: row.vendorCode,
          error: 'Vendor Code is required',
        });
      }

      if (!row.vendorName || row.vendorName.trim() === '') {
        rowErrors.push({
          row: rowNumber,
          field: 'Vendor Name',
          value: row.vendorName,
          error: 'Vendor Name is required',
        });
      }

      if (!row.vendorType || row.vendorType.trim() === '') {
        rowErrors.push({
          row: rowNumber,
          field: 'Vendor Type',
          value: row.vendorType,
          error: 'Vendor Type is required',
        });
      } else if (!validVendorTypes.includes(row.vendorType)) {
        rowErrors.push({
          row: rowNumber,
          field: 'Vendor Type',
          value: row.vendorType,
          error: `Invalid Vendor Type. Must be one of: ${validVendorTypes.join(', ')}`,
        });
      }

      if (!row.contactPerson || row.contactPerson.trim() === '') {
        rowErrors.push({
          row: rowNumber,
          field: 'Contact Person',
          value: row.contactPerson,
          error: 'Contact Person is required',
        });
      }

      if (!row.phonePrimary || row.phonePrimary.trim() === '') {
        rowErrors.push({
          row: rowNumber,
          field: 'Phone Primary',
          value: row.phonePrimary,
          error: 'Primary Phone is required',
        });
      }

      // Optional field validation
      if (row.status && !validStatuses.includes(row.status)) {
        rowErrors.push({
          row: rowNumber,
          field: 'Status',
          value: row.status,
          error: `Invalid Status. Must be one of: ${validStatuses.join(', ')}`,
        });
      }

      // Email validation
      if (row.email && row.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(row.email)) {
          rowErrors.push({
            row: rowNumber,
            field: 'Email',
            value: row.email,
            error: 'Invalid email format',
          });
        }
      }

      // GSTIN validation (if provided)
      if (row.gstin && row.gstin.trim() !== '') {
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstinRegex.test(row.gstin)) {
          rowErrors.push({
            row: rowNumber,
            field: 'GSTIN',
            value: row.gstin,
            error: 'Invalid GSTIN format',
          });
        }
      }

      // Numeric field validation
      if (row.creditLimit && isNaN(parseFloat(row.creditLimit))) {
        rowErrors.push({
          row: rowNumber,
          field: 'Credit Limit',
          value: row.creditLimit,
          error: 'Credit Limit must be a number',
        });
      }

      if (row.leadTimeDays && isNaN(parseInt(row.leadTimeDays))) {
        rowErrors.push({
          row: rowNumber,
          field: 'Lead Time Days',
          value: row.leadTimeDays,
          error: 'Lead Time Days must be a number',
        });
      }

      if (row.rating && (isNaN(parseFloat(row.rating)) || parseFloat(row.rating) < 0 || parseFloat(row.rating) > 5)) {
        rowErrors.push({
          row: rowNumber,
          field: 'Rating',
          value: row.rating,
          error: 'Rating must be a number between 0 and 5',
        });
      }

      if (rowErrors.length > 0) {
        errors.push(...rowErrors);
      } else {
        validVendors.push({
          vendorCode: row.vendorCode.trim(),
          vendorName: row.vendorName.trim(),
          vendorType: row.vendorType.trim(),
          status: row.status?.trim() || 'Active',
          contactPerson: row.contactPerson.trim(),
          phonePrimary: row.phonePrimary.trim(),
          phoneSecondary: row.phoneSecondary?.trim() || null,
          email: row.email?.trim() || null,
          whatsapp: row.whatsapp?.trim() || null,
          addressLine1: row.addressLine1?.trim() || null,
          addressLine2: row.addressLine2?.trim() || null,
          city: row.city?.trim() || null,
          state: row.state?.trim() || null,
          pincode: row.pincode?.trim() || null,
          country: row.country?.trim() || 'India',
          gstin: row.gstin?.trim() || null,
          pan: row.pan?.trim() || null,
          bankName: row.bankName?.trim() || null,
          bankAccountNumber: row.bankAccountNumber?.trim() || null,
          bankIfsc: row.bankIfsc?.trim() || null,
          paymentTerms: row.paymentTerms?.trim() || null,
          creditLimit: row.creditLimit ? parseFloat(row.creditLimit) : 0,
          productsSupplied: row.productsSupplied?.trim() || null,
          monthlyCapacity: row.monthlyCapacity?.trim() || null,
          leadTimeDays: row.leadTimeDays ? parseInt(row.leadTimeDays) : 0,
          rating: row.rating ? parseFloat(row.rating) : 0,
        });
      }
    });

    // If validation only, return results
    if (validateOnly) {
      return NextResponse.json({
        success: true,
        validationOnly: true,
        totalRows: csvData.length,
        validRows: validVendors.length,
        errorRows: errors.length,
        errors,
      });
    }

    // If there are errors, don't import
    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        totalRows: csvData.length,
        validRows: validVendors.length,
        errorRows: errors.length,
        errors,
      });
    }

    // Check for duplicate vendor codes in database
    const existingVendors = await prisma.vendor.findMany({
      where: {
        vendorCode: {
          in: validVendors.map((v) => v.vendorCode),
        },
      },
      select: { vendorCode: true },
    });

    const existingCodes = new Set(existingVendors.map((v) => v.vendorCode));
    const duplicates: string[] = [];

    validVendors.forEach((vendor, index) => {
      if (existingCodes.has(vendor.vendorCode)) {
        duplicates.push(vendor.vendorCode);
        errors.push({
          row: index + 2,
          field: 'Vendor Code',
          value: vendor.vendorCode,
          error: 'Vendor Code already exists in database',
        });
      }
    });

    if (duplicates.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Duplicate vendor codes found',
        totalRows: csvData.length,
        validRows: validVendors.length - duplicates.length,
        errorRows: errors.length,
        errors,
        duplicates,
      });
    }

    // Import vendors
    const imported = await prisma.vendor.createMany({
      data: validVendors,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${imported.count} vendors`,
      totalRows: csvData.length,
      importedRows: imported.count,
      errors: [],
    });
  } catch (error) {
    console.error('Error importing vendors:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to import vendors',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
