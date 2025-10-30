import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/orders/saved-searches/[id]
 * Get a specific saved search and increment usage count
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const savedSearch = await prisma.savedSearch.findUnique({
      where: { id },
    });

    if (!savedSearch) {
      return NextResponse.json(
        { success: false, error: 'Saved search not found' },
        { status: 404 }
      );
    }

    // Increment usage count
    await prisma.savedSearch.update({
      where: { id },
      data: {
        usageCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      savedSearch,
    });
  } catch (error) {
    console.error('Error fetching saved search:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch saved search',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/orders/saved-searches/[id]
 * Update a saved search
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, description, filters, isPublic } = body;

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (filters !== undefined) {
      updateData.filters = typeof filters === 'string' ? filters : JSON.stringify(filters);
    }
    if (isPublic !== undefined) updateData.isPublic = isPublic;

    const savedSearch = await prisma.savedSearch.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Saved search updated successfully',
      savedSearch,
    });
  } catch (error) {
    console.error('Error updating saved search:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update saved search',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/orders/saved-searches/[id]
 * Delete a saved search
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    await prisma.savedSearch.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Saved search deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting saved search:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete saved search',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
