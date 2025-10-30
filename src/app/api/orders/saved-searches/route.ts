import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/orders/saved-searches
 * Get all saved searches for orders module
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const createdBy = searchParams.get('createdBy');

    const where: any = {
      module: 'orders',
    };

    // If createdBy is provided, get user's searches + public searches
    if (createdBy) {
      where.OR = [
        { createdBy },
        { isPublic: true },
      ];
    }

    const savedSearches = await prisma.savedSearch.findMany({
      where,
      orderBy: [
        { usageCount: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({
      success: true,
      count: savedSearches.length,
      savedSearches,
    });
  } catch (error) {
    console.error('Error fetching saved searches:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch saved searches',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders/saved-searches
 * Create a new saved search
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, filters, createdBy, isPublic } = body;

    // Validation
    if (!name || !filters || !createdBy) {
      return NextResponse.json(
        { success: false, error: 'Name, filters, and createdBy are required' },
        { status: 400 }
      );
    }

    // Validate filters is valid JSON
    try {
      if (typeof filters === 'string') {
        JSON.parse(filters);
      }
    } catch {
      return NextResponse.json(
        { success: false, error: 'Filters must be valid JSON' },
        { status: 400 }
      );
    }

    const savedSearch = await prisma.savedSearch.create({
      data: {
        name,
        description: description || null,
        module: 'orders',
        filters: typeof filters === 'string' ? filters : JSON.stringify(filters),
        createdBy,
        isPublic: isPublic || false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Saved search created successfully',
      savedSearch,
    });
  } catch (error) {
    console.error('Error creating saved search:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create saved search',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
