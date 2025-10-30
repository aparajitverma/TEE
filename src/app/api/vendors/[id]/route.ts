import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';
import { decryptVendorSensitiveData, encryptVendorSensitiveData } from '@/lib/encryption';
import { logVendorUpdated, logVendorDeleted } from '@/lib/audit-log';

// GET single vendor by ID
export const GET = withPermission(PERMISSIONS.VENDOR_VIEW, async (
  request: NextRequest,
  user,
  context?: { params: { id: string } }
) => {
  const params = context?.params || { id: '' };
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Decrypt sensitive data
    const decryptedVendor = await decryptVendorSensitiveData(vendor);

    // Parse JSON fields
    const vendorData = {
      ...decryptedVendor,
      productsSupplied: decryptedVendor.productsSupplied 
        ? JSON.parse(decryptedVendor.productsSupplied) 
        : [],
      certifications: decryptedVendor.certifications 
        ? JSON.parse(decryptedVendor.certifications) 
        : [],
      documents: decryptedVendor.documents 
        ? JSON.parse(decryptedVendor.documents) 
        : [],
    };

    return NextResponse.json({ vendor: vendorData });
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendor' },
      { status: 500 }
    );
  }
});

// PUT update vendor
export const PUT = withPermission(PERMISSIONS.VENDOR_EDIT, async (
  request: NextRequest,
  user,
  context?: { params: { id: string } }
) => {
  const params = context?.params || { id: '' };
  try {
    const vendorId = parseInt(params.id);

    // Get old data for audit log
    const oldVendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!oldVendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Convert JSON fields to strings
    if (body.productsSupplied && Array.isArray(body.productsSupplied)) {
      body.productsSupplied = JSON.stringify(body.productsSupplied);
    }
    if (body.certifications && Array.isArray(body.certifications)) {
      body.certifications = JSON.stringify(body.certifications);
    }
    if (body.documents && Array.isArray(body.documents)) {
      body.documents = JSON.stringify(body.documents);
    }

    // Encrypt sensitive data
    const encryptedData = await encryptVendorSensitiveData(body);

    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: encryptedData,
    });

    // Create audit log
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;
    await logVendorUpdated(vendorId, oldVendor, vendor, user.email, ipAddress, userAgent);

    return NextResponse.json({ vendor });
  } catch (error: any) {
    console.error('Error updating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to update vendor', details: error.message },
      { status: 500 }
    );
  }
});

// DELETE vendor
export const DELETE = withPermission(PERMISSIONS.VENDOR_DELETE, async (
  request: NextRequest,
  user,
  context?: { params: { id: string } }
) => {
  const params = context?.params || { id: '' };
  try {
    const vendorId = parseInt(params.id);

    // Get vendor data for audit log
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Create audit log before deletion
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;
    await logVendorDeleted(vendorId, vendor, user.email, ipAddress, userAgent);

    await prisma.vendor.delete({
      where: { id: vendorId },
    });

    return NextResponse.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json(
      { error: 'Failed to delete vendor' },
      { status: 500 }
    );
  }
});
