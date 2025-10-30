import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/vendors/[id]/notes
 * Get all notes for a specific vendor
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

    // Fetch all notes for this vendor
    // @ts-ignore - VendorNote model exists in schema but Prisma client needs regeneration
    const notes = await prisma.vendorNote.findMany({
      where: { vendorId },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        name: vendor.vendorName,
        code: vendor.vendorCode,
      },
      notes,
      totalNotes: notes.length,
      pinnedNotes: notes.filter((n: any) => n.isPinned).length,
    });
  } catch (error) {
    console.error('Error fetching vendor notes:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vendor notes',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vendors/[id]/notes
 * Add a new note for a vendor
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
    const { noteText, createdBy, isPinned, isImportant } = body;

    // Validate required fields
    if (!noteText || !createdBy) {
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

    // Create note
    // @ts-ignore - VendorNote model exists in schema but Prisma client needs regeneration
    const note = await prisma.vendorNote.create({
      data: {
        vendorId,
        noteText,
        createdBy,
        isPinned: isPinned || false,
        isImportant: isImportant || false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Note added successfully',
      note,
    });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create note',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
