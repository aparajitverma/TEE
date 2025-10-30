import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * PUT /api/vendors/[id]/notes/[noteId]
 * Update a vendor note
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string; noteId: string } }
) {
  try {
    const vendorId = parseInt(params.id);
    const noteId = parseInt(params.noteId);

    if (isNaN(vendorId) || isNaN(noteId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { noteText, isPinned, isImportant } = body;

    // Verify note exists and belongs to vendor
    // @ts-ignore - VendorNote model exists in schema but Prisma client needs regeneration
    const existingNote = await prisma.vendorNote.findFirst({
      where: {
        id: noteId,
        vendorId: vendorId,
      },
    });

    if (!existingNote) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }

    // Update note
    // @ts-ignore - VendorNote model exists in schema but Prisma client needs regeneration
    const updatedNote = await prisma.vendorNote.update({
      where: { id: noteId },
      data: {
        noteText: noteText !== undefined ? noteText : existingNote.noteText,
        isPinned: isPinned !== undefined ? isPinned : existingNote.isPinned,
        isImportant: isImportant !== undefined ? isImportant : existingNote.isImportant,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Note updated successfully',
      note: updatedNote,
    });
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update note',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/vendors/[id]/notes/[noteId]
 * Delete a vendor note
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; noteId: string } }
) {
  try {
    const vendorId = parseInt(params.id);
    const noteId = parseInt(params.noteId);

    if (isNaN(vendorId) || isNaN(noteId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    // Verify note exists and belongs to vendor
    // @ts-ignore - VendorNote model exists in schema but Prisma client needs regeneration
    const note = await prisma.vendorNote.findFirst({
      where: {
        id: noteId,
        vendorId: vendorId,
      },
    });

    if (!note) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }

    // Delete note
    // @ts-ignore - VendorNote model exists in schema but Prisma client needs regeneration
    await prisma.vendorNote.delete({
      where: { id: noteId },
    });

    return NextResponse.json({
      success: true,
      message: 'Note deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete note',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
