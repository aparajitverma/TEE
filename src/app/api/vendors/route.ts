import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';
import { encryptVendorSensitiveData } from '@/lib/encryption';
import { logVendorCreated } from '@/lib/audit-log';

// GET all vendors
export const GET = withPermission(PERMISSIONS.VENDOR_VIEW, async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { vendorName: { contains: search, mode: 'insensitive' } },
        { vendorCode: { contains: search, mode: 'insensitive' } },
        { contactPerson: { contains: search, mode: 'insensitive' } },
        { phonePrimary: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Type filter
    if (type && type !== 'all') {
      where.vendorType = type;
    }

    // Status filter
    if (status && status !== 'all') {
      where.status = status;
    }

    const vendors = await prisma.vendor.findMany({
      where,
      orderBy: { dateAdded: 'desc' },
    });

    return NextResponse.json({ vendors, count: vendors.length });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    );
  }
});

// POST create new vendor
export const POST = withPermission(PERMISSIONS.VENDOR_CREATE, async (request: NextRequest, user) => {
  try {
    const body = await request.json();

    // Generate vendor code if not provided
    if (!body.vendorCode) {
      const lastVendor = await prisma.vendor.findFirst({
        orderBy: { id: 'desc' },
      });
      const nextId = (lastVendor?.id || 0) + 1;
      body.vendorCode = `VEN-${String(nextId).padStart(3, '0')}`;
    }

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

    const vendor = await prisma.vendor.create({
      data: encryptedData,
    });

    // Create audit log
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;
    await logVendorCreated(vendor.id, vendor, user.email, ipAddress, userAgent);

    return NextResponse.json({ vendor }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to create vendor', details: error.message },
      { status: 500 }
    );
  }
});
