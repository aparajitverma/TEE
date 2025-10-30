import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/vendors/[id]/documents
 * Get all documents for a specific vendor
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = parseInt(params.id);

    if (isNaN(vendorId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid vendor ID' },
        { status: 400 }
      );
    }

    // Verify vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true, vendorName: true, vendorCode: true },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Fetch all documents for this vendor
    // @ts-ignore - VendorDocument model exists in schema but Prisma client needs regeneration
    const documents = await prisma.vendorDocument.findMany({
      where: { 
        vendorId,
        isActive: true,
      },
      orderBy: { uploadDate: 'desc' },
    });

    // Calculate summary statistics
    const summary = {
      totalDocuments: documents.length,
      totalSize: documents.reduce((sum: number, d: any) => sum + d.fileSize, 0),
      documentsByType: documents.reduce((acc: Record<string, number>, d: any) => {
        acc[d.documentType] = (acc[d.documentType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recentUploads: documents.slice(0, 5),
    };

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        name: vendor.vendorName,
        code: vendor.vendorCode,
      },
      summary,
      documents,
    });
  } catch (error) {
    console.error('Error fetching vendor documents:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vendor documents',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vendors/[id]/documents
 * Upload a new document for a vendor
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = parseInt(params.id);

    if (isNaN(vendorId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid vendor ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      documentName,
      documentType,
      fileUrl,
      fileName,
      fileSize,
      mimeType,
      expiryDate,
      description,
      uploadedBy,
      tags,
    } = body;

    // Validate required fields
    if (!documentName || !documentType || !fileUrl || !fileName || !uploadedBy) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Create document record
    // @ts-ignore - VendorDocument model exists in schema but Prisma client needs regeneration
    const document = await prisma.vendorDocument.create({
      data: {
        vendorId,
        documentName,
        documentType,
        fileUrl,
        fileName,
        fileSize: parseInt(fileSize) || 0,
        mimeType: mimeType || 'application/octet-stream',
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        description,
        uploadedBy,
        tags: tags ? JSON.stringify(tags) : null,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully',
      document,
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload document',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
