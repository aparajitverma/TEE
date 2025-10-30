import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * DELETE /api/vendors/[id]/documents/[documentId]
 * Delete a vendor document (soft delete)
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; documentId: string } }
) {
  try {
    const vendorId = parseInt(params.id);
    const documentId = parseInt(params.documentId);

    if (isNaN(vendorId) || isNaN(documentId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    // Verify document exists and belongs to vendor
    // @ts-ignore - VendorDocument model exists in schema but Prisma client needs regeneration
    const document = await prisma.vendorDocument.findFirst({
      where: {
        id: documentId,
        vendorId: vendorId,
      },
    });

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    // Soft delete - mark as inactive
    // @ts-ignore - VendorDocument model exists in schema but Prisma client needs regeneration
    await prisma.vendorDocument.update({
      where: { id: documentId },
      data: { isActive: false },
    });

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete document',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
